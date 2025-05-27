import { getAllLactations } from "@/services/lactationService"

// Buscar e processar estatísticas de lactação
export async function fetchLactationStats() {
  try {
    const lactationResponse = await getAllLactations()
    console.log("📊 Dados de lactação recebidos:", lactationResponse)

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
      if (Array.isArray(lactation.metrica)) {
        lactation.metrica.forEach(({ quantidade = 0 }) => {
          producaoTotal += quantidade
        })
      }
    })

    const mediaProducao = totalAnimais > 0 ? producaoTotal / totalAnimais : 0

    return { lactations, totalAnimais, producaoTotal, mediaProducao, animaisAtivos }
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

// Estatísticas de produção baseadas em métricas das lactações
export function calcularEstatisticasProducao(lactations) {
  if (!lactations || lactations.length === 0) {
    return { producaoDiaria: 0, producaoSemanal: 0, producaoMensal: 0, producaoAnual: 0 }
  }

  const agora = Date.now()
  const umDia = 24 * 60 * 60 * 1000
  const umAno = 365 * umDia

  let producaoDiaria = 0, producaoSemanal = 0, producaoMensal = 0, producaoAnual = 0

  lactations.forEach(({ metrica }) => {
    if (Array.isArray(metrica)) {
      metrica.forEach(({ dataMedida, quantidade = 0 }) => {
        const data = new Date(dataMedida).getTime()
        const diff = agora - data

        if (diff <= umDia) producaoDiaria += quantidade
        if (diff <= 7 * umDia) producaoSemanal += quantidade
        if (diff <= 30 * umDia) producaoMensal += quantidade
        if (diff <= umAno) producaoAnual += quantidade
      })
    }
  })

  return { producaoDiaria, producaoSemanal, producaoMensal, producaoAnual }
}

// Médias e variações para uma lactação
export function calcularMediasEVariacoes(lactation) {
  if (!lactation || !Array.isArray(lactation.metrica)) {
    return { mediaDiaria: 0, mediaSemanal: 0, variacao: 0, ultimaOrdenha: null }
  }

  const hoje = Date.now()
  const umDia = 24 * 60 * 60 * 1000
  const seteDias = 7 * umDia
  const quatorzeDias = 14 * umDia

  const metricasOrdenadas = [...lactation.metrica].sort(
    (a, b) => new Date(b.dataMedida) - new Date(a.dataMedida)
  )
  const ultimaOrdenha = metricasOrdenadas[0] || null

  const metricasUltimos7Dias = lactation.metrica.filter(({ dataMedida }) => {
    return new Date(dataMedida).getTime() >= hoje - seteDias
  })

  const metricas7DiasAnteriores = lactation.metrica.filter(({ dataMedida }) => {
    const time = new Date(dataMedida).getTime()
    return time >= hoje - quatorzeDias && time < hoje - seteDias
  })

  const totalUltimos7Dias = metricasUltimos7Dias.reduce((acc, m) => acc + (m.quantidade || 0), 0)
  const total7DiasAnteriores = metricas7DiasAnteriores.reduce((acc, m) => acc + (m.quantidade || 0), 0)

  const mediaDiaria = metricasUltimos7Dias.length > 0 ? totalUltimos7Dias / metricasUltimos7Dias.length : 0
  const mediaSemanal = totalUltimos7Dias
  const mediaAnterior = metricas7DiasAnteriores.length > 0 ? total7DiasAnteriores / metricas7DiasAnteriores.length : 0

  let variacao = 0
  if (mediaAnterior > 0) {
    variacao = ((mediaDiaria - mediaAnterior) / mediaAnterior) * 100
  } else if (mediaDiaria > 0) {
    variacao = 100
  }

  return { mediaDiaria, mediaSemanal, variacao, ultimaOrdenha }
}

// Status colorido baseado no status da lactação
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

// Processar dados para gráficos
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

// Buscar búfalas com queda maior que 2%
export function fetchBuffalasComQueda(lactations) {
  if (!lactations || lactations.length === 0) {
    return { bufalasComQueda: [], totalBufalas: 0, percentualQueda: 0, quedaMedia: 0 }
  }

  const bufalasComQueda = lactations.filter((lactation) => calcularMediasEVariacoes(lactation).variacao < -2)

  const totalBufalas = lactations.length
  const percentualQueda = totalBufalas > 0 ? ((bufalasComQueda.length / totalBufalas) * 100).toFixed(1) : 0

  const quedaMedia = bufalasComQueda.length > 0
    ? (bufalasComQueda.reduce((acc, lactation) => acc + Math.abs(calcularMediasEVariacoes(lactation).variacao), 0) / bufalasComQueda.length).toFixed(1)
    : 0

  return { bufalasComQueda, totalBufalas, percentualQueda, quedaMedia }
}

// Dados vazios para gráficos
function generateEmptyWeeklyData() {
  const dias = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]
  return dias.map(dia => ({ name: dia, uv: 0 }))
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
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
  return meses.map(mes => ({ name: mes, uv: 0 }))
}

// Processar semanal
function processWeeklyLactation(lactations) {
  const dias = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]
  const data = dias.map(dia => ({ name: dia, uv: 0, count: 0 }))

  lactations.forEach(({ metrica }) => {
    if (Array.isArray(metrica)) {
      metrica.forEach(({ dataMedida, quantidade = 0 }) => {
        if (!dataMedida) return
        const diaSemana = new Date(dataMedida).getDay()
        const index = diaSemana === 0 ? 6 : diaSemana - 1
        if (index >= 0 && index < 7) {
          data[index].uv += quantidade
          data[index].count++
        }
      })
    }
  })

  return data.map(({ count, uv, name }) => ({ name, uv: count > 0 ? Math.round(uv / count) : 0 }))
}

// Processar mensal (4 semanas)
function processMonthlyLactation(lactations) {
  const data = [
    { name: "Semana 1", uv: 0, count: 0 },
    { name: "Semana 2", uv: 0, count: 0 },
    { name: "Semana 3", uv: 0, count: 0 },
    { name: "Semana 4", uv: 0, count: 0 },
  ]

  lactations.forEach(({ metrica }) => {
    if (Array.isArray(metrica)) {
      metrica.forEach(({ dataMedida, quantidade = 0 }) => {
        if (!dataMedida) return
        const dia = new Date(dataMedida).getDate()
        const semana = Math.min(3, Math.floor((dia - 1) / 7))
        data[semana].uv += quantidade
        data[semana].count++
      })
    }
  })

  return data.map(({ count, uv, name }) => ({ name, uv: count > 0 ? Math.round(uv / count) : 0 }))
}

// Processar anual (12 meses)
function processYearlyLactation(lactations) {
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
  const data = meses.map(mes => ({ name: mes, uv: 0, count: 0 }))

  lactations.forEach(({ metrica }) => {
    if (Array.isArray(metrica)) {
      metrica.forEach(({ dataMedida, quantidade = 0 }) => {
        if (!dataMedida) return
        const mes = new Date(dataMedida).getMonth()
        data[mes].uv += quantidade
        data[mes].count++
      })
    }
  })

  return data.map(({ count, uv, name }) => ({ name, uv: count > 0 ? Math.round(uv / count) : 0 }))
}
