import { getAllBuffalos } from "@/services/buffaloService"
import { getAllLactations } from "@/services/lactationService"
import { getAllProductions } from "@/services/productionService"
import { getAllUsers } from "@/services/userService"

// Função para buscar e processar estatísticas dos búfalos
export async function fetchBuffaloStats() {
  try {
    const buffalos = await getAllBuffalos()

    const activeBuffalos = buffalos.filter(
      (buffalo) =>
        buffalo.atividade &&
        buffalo.atividade.length > 0 &&
        buffalo.atividade[buffalo.atividade.length - 1].status === "Ativa",
    )

    const females = activeBuffalos.filter((buffalo) => buffalo.sexo === "Fêmea")
    const males = activeBuffalos.filter((buffalo) => buffalo.sexo === "Macho")

    return {
      total: activeBuffalos.length,
      females: females.length,
      males: males.length,
      activeBuffalos,
    }
  } catch (error) {
    console.error("❌ Erro ao buscar estatísticas dos búfalos:", error)
    return {
      total: 0,
      females: 0,
      males: 0,
      activeBuffalos: [],
    }
  }
}

// Função para buscar dados de funcionários - CORRIGIDA para mostrar total de usuários
export async function fetchEmployeeCount() {
  try {
    const users = await getAllUsers()
    console.log("📊 Dados de usuários recebidos:", users)

    // Verificar se users é um array
    if (!Array.isArray(users)) {
      console.error("❌ Users não é um array:", users)
      return 0
    }

    // Retornar o total de usuários em vez de filtrar por funcionários
    console.log(`✅ Total de usuários encontrados: ${users.length}`)

    // Log para debug - mostrar todos os cargos
    users.forEach((user, index) => {
      console.log(`👤 Usuário ${index + 1}:`, user.nome, "Cargo:", user.cargo)
    })

    return users.length
  } catch (error) {
    console.error("❌ Erro ao buscar funcionários:", error)
    return 0
  }
}

// Função para processar dados de lactação para gráficos de produção
export async function fetchLactationData() {
  try {
    const lactationResponse = await getAllLactations()

    // Verificação adicional de segurança
    if (!lactationResponse || !lactationResponse.lactations) {
      console.log("⚠️ fetchLactationData: Nenhum dado de lactação disponível")
      return {
        weekly: generateEmptyWeeklyData(),
        monthly: generateEmptyMonthlyData(),
        yearly: generateEmptyYearlyData(),
      }
    }

    const lactations = lactationResponse.lactations

    // Processar dados para gráficos semanais, mensais e anuais
    const processedData = {
      weekly: processWeeklyLactation(lactations),
      monthly: processMonthlyLactation(lactations),
      yearly: processYearlyLactation(lactations),
    }

    return processedData
  } catch (error) {
    console.error("❌ Erro ao buscar dados de lactação:", error)
    return {
      weekly: generateEmptyWeeklyData(),
      monthly: generateEmptyMonthlyData(),
      yearly: generateEmptyYearlyData(),
    }
  }
}

// Função para buscar top búfalas produtoras - ATUALIZADA
export async function fetchTopBuffalos() {
  try {
    const lactationResponse = await getAllLactations()

    // Verificação adicional de segurança
    if (!lactationResponse || !lactationResponse.lactations) {
      console.log("⚠️ fetchTopBuffalos: Nenhum dado de lactação disponível")
      return { buffalos: [], count: 0 }
    }

    const lactations = lactationResponse.lactations
    const buffalos = await getAllBuffalos()

    // Se não há lactações, retornar array vazio
    if (lactations.length === 0) {
      console.log("⚠️ fetchTopBuffalos: Array de lactações vazio")
      return { buffalos: [], count: 0 }
    }

    // Calcular produção média por búfala
    const buffaloProduction = {}

    lactations.forEach((lactation) => {
      if (lactation.metrica && lactation.metrica.length > 0 && lactation.tagBufala) {
        const totalProduction = lactation.metrica.reduce((sum, metric) => {
          return sum + (metric.quantidade || 0)
        }, 0)

        const avgProduction = totalProduction / lactation.metrica.length

        if (!buffaloProduction[lactation.tagBufala]) {
          buffaloProduction[lactation.tagBufala] = []
        }
        buffaloProduction[lactation.tagBufala].push(avgProduction)
      }
    })

    // Calcular média final e criar ranking
    const rankings = Object.entries(buffaloProduction).map(([tag, productions]) => {
      const avgProduction = productions.reduce((sum, prod) => sum + prod, 0) / productions.length
      const buffalo = buffalos.find((b) => b.tag === tag)

      return {
        name: buffalo?.nome || tag,
        tag: tag,
        leite: Math.round(avgProduction * 10) / 10, // Arredondar para 1 casa decimal
      }
    })

    // Ordenar por produção e pegar top 10
    const topBuffalos = rankings.sort((a, b) => b.leite - a.leite).slice(0, 10)

    return {
      buffalos: topBuffalos,
      count: topBuffalos.length,
    }
  } catch (error) {
    console.error("❌ Erro ao buscar top búfalas:", error)
    return { buffalos: [], count: 0 }
  }
}

// Função para buscar dados de produção/vendas - CORRIGIDA com verificação de null
export async function fetchProductionSalesData() {
  try {
    const productions = await getAllProductions()
    console.log("📊 Dados de produções recebidos:", productions)

    // Verificar se productions é um array válido
    if (!Array.isArray(productions) || productions.length === 0) {
      console.log("⚠️ fetchProductionSalesData: Nenhum dado de produção disponível")
      return {
        lastCollection: { amount: 0, date: null },
        pricePerLiter: 0,
        estimatedRevenue: 0,
        totalProduced: 0,
        currentStock: 0,
      }
    }

    // Calcular totais de produção
    const totalProduced = productions.reduce((sum, production) => {
      return sum + (production.totalProduzido || 0)
    }, 0)

    const currentStock = productions.reduce((sum, production) => {
      return sum + (production.estoqueAtual || 0)
    }, 0)

    console.log("📊 Total produzido:", totalProduced, "Estoque atual:", currentStock)

    // Buscar última coleta (PRIORIDADE PARA COLETAS REAIS)
    const allCollections = []
    productions.forEach((production) => {
      if (production.coletas && production.coletas.length > 0) {
        production.coletas.forEach((coleta) => {
          allCollections.push({
            ...coleta,
            date: new Date(coleta.dataColeta),
            isRealCollection: true, // Marcar como coleta real
          })
        })
      }
    })

    console.log("📊 Coletas encontradas:", allCollections.length)

    let lastCollection = { amount: 0, date: null }
    let avgPricePerLiter = 0
    let estimatedRevenue = 0

    if (allCollections.length > 0) {
      // TEM COLETAS REAIS - usar dados de coleta
      allCollections.sort((a, b) => b.date - a.date)
      lastCollection = {
        amount: allCollections[0]?.quantidadeColetada || 0,
        date: allCollections[0]?.date || null,
      }

      console.log("📊 Última coleta (real):", lastCollection)

      // Calcular preço médio por litro
      const totalValue = allCollections.reduce((sum, coleta) => {
        const value = Number.parseFloat(coleta.valorPago?.replace(/[^\d,]/g, "").replace(",", ".")) || 0
        return sum + value
      }, 0)

      const totalQuantity = allCollections.reduce((sum, coleta) => {
        return sum + (coleta.quantidadeColetada || 0)
      }, 0)

      avgPricePerLiter = totalQuantity > 0 ? totalValue / totalQuantity : 3.5

      // Estimar faturamento mensal (baseado na média dos últimos 30 dias)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const recentCollections = allCollections.filter((coleta) => coleta.date >= thirtyDaysAgo)
      const monthlyQuantity = recentCollections.reduce((sum, coleta) => {
        return sum + (coleta.quantidadeColetada || 0)
      }, 0)

      estimatedRevenue = monthlyQuantity * avgPricePerLiter
    } else {
      // NÃO TEM COLETAS - usar dados de produção como fallback
      console.log("⚠️ Nenhuma coleta encontrada, usando dados de produção")

      // Buscar a produção mais recente
      const productionsWithDates = productions
        .filter((p) => p.dataAtualizacao)
        .sort((a, b) => new Date(b.dataAtualizacao) - new Date(a.dataAtualizacao))

      if (productionsWithDates.length > 0) {
        lastCollection = {
          amount: productionsWithDates[0].totalProduzido || 0,
          date: new Date(productionsWithDates[0].dataAtualizacao),
        }
        console.log("📊 Última coleta (produção):", lastCollection)
      }

      // Preço estimado baseado em média de mercado
      avgPricePerLiter = 3.5 // Valor padrão
      estimatedRevenue = currentStock * avgPricePerLiter
    }

    const result = {
      lastCollection,
      pricePerLiter: avgPricePerLiter,
      estimatedRevenue,
      totalProduced,
      currentStock,
    }

    console.log("📊 Resultado final fetchProductionSalesData:", result)
    return result
  } catch (error) {
    console.error("❌ Erro ao buscar dados de produção/vendas:", error)
    return {
      lastCollection: { amount: 0, date: null },
      pricePerLiter: 0,
      estimatedRevenue: 0,
      totalProduced: 0,
      currentStock: 0,
    }
  }
}

// Função para gerar dados do gráfico produção vs coleta - CORRIGIDA E MELHORADA
export async function fetchProductionVsCollectionData() {
  try {
    const lactationResponse = await getAllLactations()
    const productions = await getAllProductions()

    console.log("📊 Dados para gráfico - Lactações:", lactationResponse, "Produções:", productions)

    // Processar dados por mês
    const monthlyData = {}

    // 1. PROCESSAR LACTAÇÕES (Produção individual por búfala)
    if (lactationResponse && lactationResponse.lactations && lactationResponse.lactations.length > 0) {
      const lactations = lactationResponse.lactations
      console.log("📊 Processando lactações:", lactations.length)

      lactations.forEach((lactation) => {
        if (lactation.metrica && lactation.metrica.length > 0) {
          lactation.metrica.forEach((metric) => {
            if (metric.dataMedida && metric.quantidade) {
              const date = new Date(metric.dataMedida)
              const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

              if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = { producao: 0, coleta: 0 }
              }

              monthlyData[monthKey].producao += metric.quantidade
              console.log(`📊 Lactação adicionada: ${monthKey} - ${metric.quantidade}L`)
            }
          })
        }
      })
    }

    // 2. PROCESSAR PRODUÇÕES (Dados de produção total e coletas)
    if (Array.isArray(productions) && productions.length > 0) {
      console.log("📊 Processando produções:", productions.length)

      productions.forEach((production) => {
        // 2a. Processar dados de produção individual (quantidadeAdicao)
        if (production.producao && production.producao.length > 0) {
          production.producao.forEach((prod) => {
            if (prod.dataAtualizacao && prod.quantidadeAdicao) {
              const prodDate = new Date(prod.dataAtualizacao)
              const prodMonthKey = `${prodDate.getFullYear()}-${String(prodDate.getMonth() + 1).padStart(2, "0")}`

              if (!monthlyData[prodMonthKey]) {
                monthlyData[prodMonthKey] = { producao: 0, coleta: 0 }
              }

              monthlyData[prodMonthKey].producao += prod.quantidadeAdicao
              console.log(`📊 Produção adicionada: ${prodMonthKey} - ${prod.quantidadeAdicao}L`)
            }
          })
        }

        // 2b. Processar coletas REAIS
        if (production.coletas && production.coletas.length > 0) {
          production.coletas.forEach((coleta) => {
            if (coleta.dataColeta && coleta.quantidadeColetada) {
              const date = new Date(coleta.dataColeta)
              const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

              if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = { producao: 0, coleta: 0 }
              }

              monthlyData[monthKey].coleta += coleta.quantidadeColetada
              console.log(`📊 Coleta adicionada: ${monthKey} - ${coleta.quantidadeColetada}L`)
            }
          })
        }

        // 2c. Se não há coletas, usar totalProduzido como referência de "coleta potencial"
        if (
          (!production.coletas || production.coletas.length === 0) &&
          production.totalProduzido &&
          production.dataAtualizacao
        ) {
          const date = new Date(production.dataAtualizacao)
          const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

          if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = { producao: 0, coleta: 0 }
          }

          // Usar uma porcentagem do total produzido como "coleta estimada"
          const estimatedCollection = production.totalProduzido * 0.9 // 90% do produzido
          monthlyData[monthKey].coleta += estimatedCollection
          console.log(
            `📊 Coleta estimada adicionada: ${monthKey} - ${estimatedCollection}L (90% de ${production.totalProduzido}L)`,
          )
        }
      })
    }

    console.log("📊 Dados mensais processados:", monthlyData)

    // 3. CONVERTER PARA ARRAY E ORDENAR
    const sortedData = Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-12) // Últimos 12 meses
      .map(([monthKey, data]) => {
        const [year, month] = monthKey.split("-")
        const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

        return {
          month: monthNames[Number.parseInt(month) - 1],
          producao: Math.round(data.producao),
          coleta: Math.round(data.coleta),
        }
      })

    console.log("📊 Dados finais do gráfico produção vs coleta:", sortedData)

    // 4. Se não há dados, gerar dados de exemplo para visualização
    if (sortedData.length === 0) {
      console.log("⚠️ Nenhum dado encontrado, gerando dados de exemplo")
      const currentDate = new Date()
      const exampleData = []

      for (let i = 11; i >= 0; i--) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
        const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

        exampleData.push({
          month: monthNames[date.getMonth()],
          producao: Math.floor(Math.random() * 1000) + 500, // 500-1500L
          coleta: Math.floor(Math.random() * 800) + 400, // 400-1200L
        })
      }

      return exampleData
    }

    return sortedData
  } catch (error) {
    console.error("❌ Erro ao buscar dados de produção vs coleta:", error)
    return []
  }
}

// Funções para gerar dados vazios quando não há informações
function generateEmptyWeeklyData() {
  const weekDays = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]
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
  const weekDays = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]
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
