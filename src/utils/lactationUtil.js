import { getAllLactations } from "@/services/lactationService"

export async function fetchLactationStats() {
  try {
    const response = await getAllLactations()
    const lactations = response.lactations || []

    let totalProduzido = 0
    const producaoPorBufala = {}
    const metricasPorBufala = {}

    lactations.forEach((lact) => {
      const tag = lact.tagBufala
      const metricas = lact.metrica || []

      metricasPorBufala[tag] = metricas.length

      metricas.forEach((m) => {
        totalProduzido += m.quantidade
        producaoPorBufala[tag] = (producaoPorBufala[tag] || 0) + m.quantidade
      })
    })

    const totalBufalas = lactations.length
    const mediaPorBufala = totalBufalas > 0 ? totalProduzido / totalBufalas : 0

    console.log("🧪 Estatísticas de Lactações:")
    console.log("🐃 Total de búfalas:", totalBufalas)
    console.log("🍼 Produção total de leite (L):", totalProduzido.toFixed(2))
    console.log("📊 Produção por búfala:", producaoPorBufala)
    console.log("📈 Média por búfala (L):", mediaPorBufala.toFixed(2))
    console.log("🔢 Métricas por búfala:", metricasPorBufala)

    return {
      totalBufalas,
      totalProduzido,
      producaoPorBufala,
      mediaPorBufala,
      metricasPorBufala,
      lactations,
    }
  } catch (error) {
    console.error("❌ Erro ao buscar estatísticas de lactações:", error)
    return {
      totalBufalas: 0,
      totalProduzido: 0,
      producaoPorBufala: {},
      mediaPorBufala: 0,
      metricasPorBufala: {},
      lactations: [],
    }
  }
}

export function getStatusColor(status) {
  const colorMap = {
    "Em andamento": "bg-[#9DFFBE] text-black",
    Ativo: "bg-[#9DFFBE] text-black",
    "Em queda": "bg-[#d81a1a98] text-white",
    Secando: "bg-[#ffcc0084] text-black",
    Finalizado: "bg-gray-100 text-gray-800",
  }

  return colorMap[status] || "bg-gray-100 text-gray-800"
}

export function formatStatus(status) {
  const statusMap = {
    "Em andamento": "Ativo",
    Ativo: "Ativo",
    "Em queda": "Em queda",
    Secando: "Secando",
    Finalizado: "Finalizado",
  }

  return statusMap[status] || status
}

export function calcularEstatisticasProducao(lactations) {
  const hoje = new Date()
  const ontem = new Date(hoje)
  ontem.setDate(hoje.getDate() - 1)

  const semanaAtual = new Date(hoje)
  semanaAtual.setDate(hoje.getDate() - 7)

  const mesAtual = new Date(hoje)
  mesAtual.setMonth(hoje.getMonth() - 1)

  const anoAtual = new Date(hoje)
  anoAtual.setFullYear(hoje.getFullYear() - 1)

  let producaoDiaria = 0
  let producaoSemanal = 0
  let producaoMensal = 0
  let producaoAnual = 0

  lactations.forEach((lactation) => {
    lactation.metrica?.forEach((metrica) => {
      const dataMetrica = new Date(metrica.dataMedida)

      if (dataMetrica.toDateString() === hoje.toDateString()) {
        producaoDiaria += metrica.quantidade
      }

      if (dataMetrica >= semanaAtual) {
        producaoSemanal += metrica.quantidade
      }

      if (dataMetrica >= mesAtual) {
        producaoMensal += metrica.quantidade
      }

      if (dataMetrica >= anoAtual) {
        producaoAnual += metrica.quantidade
      }
    })
  })

  return {
    producaoDiaria,
    producaoSemanal,
    producaoMensal,
    producaoAnual,
  }
}

export function calcularMediasEVariacoes(lactation) {
  if (!lactation.metrica || lactation.metrica.length === 0) {
    return {
      mediaDiaria: 0,
      mediaSemanal: 0,
      ultimaOrdenha: null,
      variacao: 0,
    }
  }

  const metricas = lactation.metrica.sort((a, b) => new Date(b.dataMedida) - new Date(a.dataMedida))
  const ultimaMetrica = metricas[0]

  // Calcular média dos últimos 7 dias
  const seteDiasAtras = new Date()
  seteDiasAtras.setDate(seteDiasAtras.getDate() - 7)

  const metricasUltimos7Dias = metricas.filter((m) => new Date(m.dataMedida) >= seteDiasAtras)

  const mediaDiaria =
    metricasUltimos7Dias.length > 0
      ? metricasUltimos7Dias.reduce((sum, m) => sum + m.quantidade, 0) / metricasUltimos7Dias.length
      : 0

  const mediaSemanal = mediaDiaria * 7

  // Calcular variação (comparar últimas duas medições)
  let variacao = 0
  if (metricas.length >= 2) {
    const atual = metricas[0].quantidade
    const anterior = metricas[1].quantidade
    variacao = anterior > 0 ? ((atual - anterior) / anterior) * 100 : 0
  }

  return {
    mediaDiaria,
    mediaSemanal,
    ultimaOrdenha: ultimaMetrica,
    variacao,
  }
}
