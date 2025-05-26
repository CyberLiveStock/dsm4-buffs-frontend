import { getAllReproductions } from "@/services/reproductionService"
import { getAllUsers } from "@/services/userService"

export async function fetchReproductionStats() {
  try {
    const reproductions = await getAllReproductions()

    if (!reproductions.length) {
      console.log("⚠️ Nenhuma reprodução encontrada")
      return {
        totalReproductions: 0,
        countByStatus: {},
        countByTipoInseminacao: {},
        datasInseminacao: [],
        reproducoesPorVet: {},
      }
    }

    // Total de reproduções
    const totalReproductions = reproductions.length

    // Contagem por status
    const countByStatus = reproductions.reduce((acc, rep) => {
      const key = rep.status || "Indefinido"
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})

    // Contagem por tipo de inseminação
    const countByTipoInseminacao = reproductions.reduce((acc, rep) => {
      const key = rep.tipoInseminacao || "Indefinido"
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})

    // Datas de inseminação (ordenadas)
    const datasInseminacao = reproductions
      .map((rep) => rep.dataInseminacao)
      .filter(Boolean)
      .sort()

    // Reproduções por veterinário
    const reproducoesPorVet = reproductions.reduce((acc, rep) => {
      if (rep.vetResponsavel && rep.vetResponsavel.length > 0) {
        rep.vetResponsavel.forEach((vetId) => {
          acc[vetId] = (acc[vetId] || 0) + 1
        })
      }
      return acc
    }, {})

    const stats = {
      totalReproductions,
      countByStatus,
      countByTipoInseminacao,
      datasInseminacao,
      reproducoesPorVet,
    }

    console.log("📊 Estatísticas de Reprodução:", stats)
    return stats
  } catch (error) {
    console.error("❌ Erro ao buscar estatísticas de reprodução:", error)
    return {
      totalReproductions: 0,
      countByStatus: {},
      countByTipoInseminacao: {},
      datasInseminacao: [],
      reproducoesPorVet: {},
    }
  }
}

export async function getReproductionsWithVetNames() {
  try {
    const [reproductions, users] = await Promise.all([getAllReproductions(), getAllUsers()])

    // Criar mapa de ID para nome do veterinário
    const vetMap = users.reduce((acc, user) => {
      if (user.cargo === "veterinario" || user.cargo === "Veterinário") {
        acc[user._id] = user.nome || user.name || "Veterinário"
      }
      return acc
    }, {})

    // Mapear reproduções com nomes dos veterinários
    const reproductionsWithVetNames = reproductions.map((reproduction) => ({
      ...reproduction,
      vetResponsavelNomes: reproduction.vetResponsavel
        ? reproduction.vetResponsavel.map((vetId) => vetMap[vetId] || "Veterinário não encontrado")
        : ["Não informado"],
    }))

    console.log("📋 Reproduções com nomes dos veterinários:", reproductionsWithVetNames)
    return reproductionsWithVetNames
  } catch (error) {
    console.error("❌ Erro ao buscar reproduções com nomes dos veterinários:", error)
    return []
  }
}

export function formatReproductionStatus(status) {
  const statusMap = {
    Finalizado: "Finalizado",
    Prenha: "Prenhez Confirmada",
    Lactando: "Lactando",
    "Em secagem": "Em Secagem",
    "No cio": "No Cio",
    Vazia: "Vazia",
  }

  return statusMap[status] || status
}

export function getStatusColor(status) {
  const colorMap = {
    Finalizado: "bg-gray-500 text-gray-800",
    Prenha: "bg-[#9DFFBE] text-black",
    Lactando: "bg-blue-100 text-blue-800",
    "Em secagem": "bg-purple-100 text-purple-800",
    "No cio": "bg-amber-100 text-amber-800",
    Vazia: "bg-[#d81a1a98] text-white",
  }

  return colorMap[status] || "bg-gray-100 text-gray-800"
}
