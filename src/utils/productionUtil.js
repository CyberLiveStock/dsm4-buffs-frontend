import { getAllProductions } from "@/services/productionService"

export async function fetchProductionStats() {
  try {
    const productions = await getAllProductions()
    console.log("📊 Estatísticas de Produção:", productions)

    if (!Array.isArray(productions) || productions.length === 0) {
      console.warn("⚠️ Nenhuma produção encontrada")
      return {
        productions: [],
        totalProduzido: 0,
        totalRetirado: 0,
        totalRejeitado: 0,
        estoqueAtual: 0,
        taxaAprovacao: 0,
        totalColetas: 0,
      }
    }

    // Calcular estatísticas agregadas
    const totalProduzido = productions.reduce((acc, p) => acc + (p.totalProduzido || 0), 0)
    const totalRetirado = productions.reduce((acc, p) => acc + (p.totalRetirado || 0), 0)
    const totalRejeitado = productions.reduce((acc, p) => acc + (p.totalRejeitado || 0), 0)
    const estoqueAtual = productions.reduce((acc, p) => acc + (p.estoqueAtual || 0), 0)

    // Calcular taxa de aprovação baseada nas coletas
    let coletasAprovadas = 0
    let totalColetas = 0

    productions.forEach((production) => {
      if (production.coletas && Array.isArray(production.coletas)) {
        production.coletas.forEach((coleta) => {
          totalColetas++
          if (coleta.resultado === "Positivo") {
            coletasAprovadas++
          }
        })
      }
    })

    const taxaAprovacao = totalColetas > 0 ? (coletasAprovadas / totalColetas) * 100 : 0

    console.log("📈 Estatísticas calculadas:", {
      totalProduzido,
      totalRetirado,
      totalRejeitado,
      estoqueAtual,
      taxaAprovacao,
      totalColetas,
    })

    return {
      productions,
      totalProduzido,
      totalRetirado,
      totalRejeitado,
      estoqueAtual,
      taxaAprovacao,
      totalColetas,
    }
  } catch (error) {
    console.error("❌ Erro ao buscar estatísticas de produção:", error)
    return {
      productions: [],
      totalProduzido: 0,
      totalRetirado: 0,
      totalRejeitado: 0,
      estoqueAtual: 0,
      taxaAprovacao: 0,
      totalColetas: 0,
    }
  }
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value || 0)
}

export function formatDate(dateString) {
  if (!dateString) return "Não informado"
  return new Date(dateString).toLocaleDateString("pt-BR")
}

export function getStatusColor(resultado) {
  switch (resultado) {
    case "Positivo":
      return "bg-[#9DFFBE] text-black"
    case "Negativo":
      return "bg-[#FF9D9F] text-black"
    default:
      return "bg-[#f59e0b] text-black"
  }
}

export function getStatusText(resultado) {
  switch (resultado) {
    case "Positivo":
      return "Aprovado"
    case "Negativo":
      return "Reprovado"
    default:
      return "Pendente"
  }
}
