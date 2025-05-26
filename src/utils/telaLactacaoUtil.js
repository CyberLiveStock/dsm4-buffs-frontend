import { getAllLactations } from "@/services/lactationService"

// Função para buscar e processar estatísticas de lactação
export async function fetchLactationStats() {
  try {
    const lactationResponse = await getAllLactations()
    console.log("📊 Dados de lactação recebidos:", lactationResponse)

    // Verificar se lactationResponse existe e tem a propriedade lactations
    if (!lactationResponse || !lactationResponse.lactations) {
      console.log("⚠️ fetchLactationStats: Nenhum dado de lactação disponível")
      return {
        lactations: [],
        totalAnimais: 0,
        producaoTotal: 0,
        mediaProducao: 0,
        animaisAtivos: 0,
      }
    }

    const lactations = lactationResponse.lactations
    console.log(`✅ ${lactations.length} lactações encontradas`)

    const totalAnimais = lactations.length
    let producaoTotal = 0
    let animaisAtivos = 0

    lactations.forEach((lactation) => {
      if (lactation.status === "Em andamento" || lactation.status === "Ativa") {
        animaisAtivos++
      }

      if (lactation.metrica && Array.isArray(lactation.metrica)) {
        lactation.metrica.forEach((metrica) => {
          producaoTotal += metrica.quantidade || 0
        })
      }
    })

    const mediaProducao = totalAnimais > 0 ? producaoTotal / totalAnimais : 0

    return {
      lactations,
      totalAnimais,
      producaoTotal,
      mediaProducao,
      animaisAtivos,
    }
  } catch (error) {
    console.error("❌ Erro ao buscar estatísticas de lactação:", error)
    return {
      lactations: [],
      totalAnimais: 0,
      producaoTotal: 0,
      mediaProducao: 0,
      animaisAtivos: 0,
    }
  }
}

// Função para calcular estatísticas de produção baseado nos dados de lactação
export function calcularEstatisticasProducao(lactations) {
  if (!lactations || lactations.length === 0) {
    return {
      producaoDiaria: 0,
      producaoSemanal: 0,
      producaoMensal: 0,
      producaoAnual: 0,
    }
  }

  const hoje = new Date()
  const umDiaAtras = new Date(hoje.getTime() - 24 * 60 * 60 * 1000)
  const umaSemanAtras = new Date(hoje.getTime() - 7 * 24 * 60 * 60 * 1000)
  const umMesAtras = new Date(hoje.getTime() - 30 * 24 * 60 * 60 * 1000)
  const umAnoAtras = new Date(hoje.getTime() - 365 * 24 * 60 * 60 * 1000)

  let producaoDiaria = 0
  let producaoSemanal = 0
  let producaoMensal = 0
  let producaoAnual = 0

  lactations.forEach((lactation) => {
    if (lactation.metrica && Array.isArray(lactation.metrica)) {
      lactation.metrica.forEach((metrica) => {
        const dataMetrica = new Date(metrica.dataMedida)
        const quantidade = metrica.quantidade || 0

        // Produção diária (últimas 24h)
        if (dataMetrica >= umDiaAtras) {
          producaoDiaria += quantidade
        }

        // Produção semanal (últimos 7 dias)
        if (dataMetrica >= umaSemanAtras) {
          producaoSemanal += quantidade
        }

        // Produção mensal (últimos 30 dias)
        if (dataMetrica >= umMesAtras) {
          producaoMensal += quantidade
        }

        // Produção anual (últimos 365 dias)
        if (dataMetrica >= umAnoAtras) {
          producaoAnual += quantidade
        }
      })
    }
  })

  return {
    producaoDiaria,
    producaoSemanal,
    producaoMensal,
    producaoAnual,
  }
}

// Função para calcular médias e variações para uma lactação específica
export function calcularMediasEVariacoes(lactation) {
  if (!lactation || !lactation.metrica || !Array.isArray(lactation.metrica)) {
    return {
      mediaDiaria: 0,
      mediaSemanal: 0,
      variacao: 0,
      ultimaOrdenha: null,
    }
  }

  const hoje = new Date()
  const seteDiasAtras = new Date(hoje.getTime() - 7 * 24 * 60 * 60 * 1000)
  const quatorzeDiasAtras = new Date(hoje.getTime() - 14 * 24 * 60 * 60 * 1000)

  // Ordenar métricas por data (mais recente primeiro)
  const metricasOrdenadas = [...lactation.metrica].sort((a, b) => new Date(b.dataMedida) - new Date(a.dataMedida))

  // Última ordenha
  const ultimaOrdenha = metricasOrdenadas.length > 0 ? metricasOrdenadas[0] : null

  // Métricas dos últimos 7 dias
  const metricasUltimos7Dias = lactation.metrica.filter((metrica) => {
    const dataMetrica = new Date(metrica.dataMedida)
    return dataMetrica >= seteDiasAtras
  })

  // Métricas dos 7 dias anteriores (para comparação)
  const metricas7DiasAnteriores = lactation.metrica.filter((metrica) => {
    const dataMetrica = new Date(metrica.dataMedida)
    return dataMetrica >= quatorzeDiasAtras && dataMetrica < seteDiasAtras
  })

  // Calcular médias
  const totalUltimos7Dias = metricasUltimos7Dias.reduce((sum, metrica) => sum + (metrica.quantidade || 0), 0)
  const total7DiasAnteriores = metricas7DiasAnteriores.reduce((sum, metrica) => sum + (metrica.quantidade || 0), 0)

  const mediaDiaria = metricasUltimos7Dias.length > 0 ? totalUltimos7Dias / metricasUltimos7Dias.length : 0
  const mediaSemanal = totalUltimos7Dias
  const mediaAnterior = metricas7DiasAnteriores.length > 0 ? total7DiasAnteriores / metricas7DiasAnteriores.length : 0

  // Calcular variação percentual
  let variacao = 0
  if (mediaAnterior > 0) {
    variacao = ((mediaDiaria - mediaAnterior) / mediaAnterior) * 100
  } else if (mediaDiaria > 0) {
    variacao = 100 // Se não havia produção anterior e agora há, é 100% de aumento
  }

  return {
    mediaDiaria,
    mediaSemanal,
    variacao,
    ultimaOrdenha,
  }
}

// Função para retornar a cor do status baseado no valor
export function getStatusColor(status) {
  const statusColors = {
    "Em andamento": "bg-green-100 text-green-800",
    Ativa: "bg-green-100 text-green-800",
    Finalizada: "bg-gray-100 text-gray-800",
    Pausada: "bg-yellow-100 text-yellow-800",
    Interrompida: "bg-red-100 text-red-800",
    Seca: "bg-blue-100 text-blue-800",
  }

  return statusColors[status] || "bg-gray-100 text-gray-800"
}

// Função para formatar o status para exibição
export function formatStatus(status) {
  const statusMap = {
    "Em andamento": "Em Andamento",
    Ativa: "Ativa",
    Finalizada: "Finalizada",
    Pausada: "Pausada",
    Interrompida: "Interrompida",
    Seca: "Seca",
  }

  return statusMap[status] || status
}

// Função para processar dados de lactação para gráficos
export function processLactationDataForCharts(lactations) {
  if (!lactations || lactations.length === 0) {
    return {
      weekly: generateEmptyWeeklyData(),
      monthly: generateEmptyMonthlyData(),
      yearly: generateEmptyYearlyData(),
    }
  }

  return {
    weekly: processWeeklyLactation(lactations),
    monthly: processMonthlyLactation(lactations),
    yearly: processYearlyLactation(lactations),
  }
}

// Função para buscar búfalas com queda na produção
export function fetchBuffalasComQueda(lactations) {
  if (!lactations || lactations.length === 0) {
    return {
      bufalasComQueda: [],
      totalBufalas: 0,
      percentualQueda: 0,
      quedaMedia: 0,
    }
  }

  const bufalasComQueda = lactations.filter((lactation) => {
    const medias = calcularMediasEVariacoes(lactation)
    return medias.variacao < -2 // Queda maior que 2%
  })

  const totalBufalas = lactations.length
  const percentualQueda = totalBufalas > 0 ? ((bufalasComQueda.length / totalBufalas) * 100).toFixed(1) : 0

  const quedaMedia =
    bufalasComQueda.length > 0
      ? (
          bufalasComQueda.reduce((sum, lactation) => {
            const medias = calcularMediasEVariacoes(lactation)
            return sum + Math.abs(medias.variacao)
          }, 0) / bufalasComQueda.length
        ).toFixed(1)
      : 0

  return {
    bufalasComQueda,
    totalBufalas,
    percentualQueda,
    quedaMedia,
  }
}

// Funções auxiliares para gerar dados vazios
function generateEmptyWeeklyData() {
  const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]
  return weekDays.map((day) => ({ name: day, uv: 0 }))
}

function generateEmptyMonthlyData() {
  return [
    { name: "Semana 1", uv: 0 },
    { name: "Semana 2", uv: 0 },
    { name: "Semana 3", uv: 0 },
    { name: "Semana 4", uv: 0 },
  ]
}

function generateEmptyYearlyData() {
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
  return months.map((month) => ({ name: month, uv: 0 }))
}

// Funções auxiliares para processar dados de lactação
function processWeeklyLactation(lactations) {
  const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]
  const weeklyData = weekDays.map((day) => ({ name: day, uv: 0, count: 0 }))

  lactations.forEach((lactation) => {
    if (lactation.metrica) {
      lactation.metrica.forEach((metric) => {
        if (metric.dataMedida) {
          const date = new Date(metric.dataMedida)
          const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1 // Ajustar domingo

          if (dayIndex >= 0 && dayIndex < 7) {
            weeklyData[dayIndex].uv += metric.quantidade || 0
            weeklyData[dayIndex].count += 1
          }
        }
      })
    }
  })

  // Calcular média
  return weeklyData.map((day) => ({
    ...day,
    uv: day.count > 0 ? Math.round(day.uv / day.count) : 0,
  }))
}

function processMonthlyLactation(lactations) {
  const monthlyData = [
    { name: "Semana 1", uv: 0, count: 0 },
    { name: "Semana 2", uv: 0, count: 0 },
    { name: "Semana 3", uv: 0, count: 0 },
    { name: "Semana 4", uv: 0, count: 0 },
  ]

  lactations.forEach((lactation) => {
    if (lactation.metrica) {
      lactation.metrica.forEach((metric) => {
        if (metric.dataMedida) {
          const date = new Date(metric.dataMedida)
          const weekOfMonth = Math.ceil(date.getDate() / 7) - 1

          if (weekOfMonth >= 0 && weekOfMonth < 4) {
            monthlyData[weekOfMonth].uv += metric.quantidade || 0
            monthlyData[weekOfMonth].count += 1
          }
        }
      })
    }
  })

  return monthlyData.map((week) => ({
    ...week,
    uv: week.count > 0 ? Math.round(week.uv / week.count) : 0,
  }))
}

function processYearlyLactation(lactations) {
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
  const yearlyData = months.map((month) => ({ name: month, uv: 0, count: 0 }))

  lactations.forEach((lactation) => {
    if (lactation.metrica) {
      lactation.metrica.forEach((metric) => {
        if (metric.dataMedida) {
          const date = new Date(metric.dataMedida)
          const monthIndex = date.getMonth()

          yearlyData[monthIndex].uv += metric.quantidade || 0
          yearlyData[monthIndex].count += 1
        }
      })
    }
  })

  return yearlyData.map((month) => ({
    ...month,
    uv: month.count > 0 ? Math.round(month.uv / month.count) : 0,
  }))
}
