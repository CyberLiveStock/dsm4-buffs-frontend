"use client"

import Layout from "@/layout/Layout"
import { useState, useEffect } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import {
  fetchLactationStats,
  getStatusColor,
  formatStatus,
  calcularEstatisticasProducao,
  calcularMediasEVariacoes,
  processLactationDataForCharts,
  fetchBuffalasComQueda,
} from "@/utils/telaLactacaoUtil"

export default function Lactacao() {
  const [modalAberto, setModalAberto] = useState(false)
  const [showProntuarioModal, setShowProntuarioModal] = useState(false)
  const [selectedLactation, setSelectedLactation] = useState(null)
  const [lactations, setLactations] = useState([])
  const [filteredLactations, setFilteredLactations] = useState([])
  const [stats, setStats] = useState({})
  const [chartData, setChartData] = useState({
    weekly: [],
    monthly: [],
    yearly: [],
  })
  const [quedaData, setQuedaData] = useState({
    bufalasComQueda: [],
    totalBufalas: 0,
    percentualQueda: 0,
    quedaMedia: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        console.log("🔄 Carregando dados de lactação...")

        // Buscar dados de lactação
        const statsData = await fetchLactationStats()
        console.log("📊 Dados recebidos:", statsData)

        setLactations(statsData.lactations)
        setFilteredLactations(statsData.lactations)
        setStats(statsData)

        // Processar dados para gráficos
        const processedChartData = processLactationDataForCharts(statsData.lactations)
        setChartData(processedChartData)

        // Processar dados de queda
        const quedaInfo = fetchBuffalasComQueda(statsData.lactations)
        setQuedaData(quedaInfo)

        console.log(`✅ ${statsData.lactations.length} lactações carregadas com sucesso`)
      } catch (error) {
        console.error("❌ Erro ao carregar dados:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const estatisticasProducao = calcularEstatisticasProducao(lactations)


  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFCF78] mx-auto mb-4"></div>
          <p className="text-black">Carregando dados de lactação...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 flex flex-col items-center gap-8">
      {/* Cards de Estatísticas */}
      <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard de Lactação</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
            <h2 className="text-sm font-medium text-gray-500">Produção Diária</h2>
            <p className="text-2xl font-bold text-gray-800">{estatisticasProducao.producaoDiaria.toFixed(0)} L</p>
            <p className="text-sm font-medium text-green-700">Produção de hoje</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
            <h2 className="text-sm font-medium text-gray-500">Produção Semanal</h2>
            <p className="text-2xl font-bold text-gray-800">{estatisticasProducao.producaoSemanal.toFixed(0)} L</p>
            <p className="text-sm font-medium text-green-700">Últimos 7 dias</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
            <h2 className="text-sm font-medium text-gray-500">Produção Mensal</h2>
            <p className="text-2xl font-bold text-gray-800">{estatisticasProducao.producaoMensal.toFixed(0)} L</p>
            <p className="text-sm font-medium text-green-700">Últimos 30 dias</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
            <h2 className="text-sm font-medium text-gray-500">Produção Anual</h2>
            <p className="text-2xl font-bold text-gray-800">{estatisticasProducao.producaoAnual.toFixed(0)} L</p>
            <p className="text-sm font-medium text-green-700">Últimos 12 meses</p>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
        <h2 className="text-xl font-bold text-gray-800">Análise de Produção</h2>
        <div className="flex flex-wrap justify-between gap-5">
          <div className="bg-[#f9f9f9] p-4 rounded-lg border border-[#eeeeee] flex justify-center items-center min-h-[300px] flex-grow w-full md:w-[calc(60%-10px)]">
            <MilkProduction chartData={chartData} />
          </div>
          <div className="bg-[#f9f9f9] p-4 rounded-lg border border-[#eeeeee] flex justify-center items-center min-h-[300px] flex-grow w-full md:w-[calc(40%-10px)]">
            <ProducaoQueda quedaData={quedaData} setModalAberto={setModalAberto} />
          </div>
        </div>
      </div>

      {/* Tabela de Lactações */}
      <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
        <h2 className="text-xl font-bold text-gray-800">Controle Individual de Lactação</h2>
        <FilterTable lactations={lactations} onFilter={setFilteredLactations} />

        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse min-w-[650px] bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-[#f0f0f0]">
              <tr>
                <th className="p-3 text-center font-medium text-gray-800 text-base">TAG</th>
                <th className="p-3 text-center font-medium text-gray-800 text-base">Média diária(7d)</th>
                <th className="p-3 text-center font-medium text-gray-800 text-base">Média Semanal</th>
                <th className="p-3 text-center font-medium text-gray-800 text-base">Última Ordenha</th>
                <th className="p-3 text-center font-medium text-gray-800 text-base">Variação</th>
                <th className="p-3 text-center font-medium text-gray-800 text-base w-48">Status</th>
                <th className="p-3 text-center font-medium text-gray-800 text-base">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredLactations.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    {lactations.length === 0
                      ? "Nenhuma lactação encontrada na API"
                      : "Nenhuma lactação encontrada com os filtros aplicados"}
                  </td>
                </tr>
              ) : (
                filteredLactations.map((lactation, index) => {
                  const medias = calcularMediasEVariacoes(lactation)
                  return (
                    <tr
                      key={lactation._id || lactation.tagBufala || index}
                      className={index % 2 === 0 ? "bg-[#fafafa]" : "bg-white"}
                    >
                      <td className="p-3 text-center text-base text-black font-medium">{lactation.tagBufala}</td>
                      <td className="p-3 text-center text-base text-black">{medias.mediaDiaria.toFixed(2)} L</td>
                      <td className="p-3 text-center text-base text-black">{medias.mediaSemanal.toFixed(2)} L</td>
                      <td className="p-3 text-center text-base text-black">
                        {medias.ultimaOrdenha
                          ? new Date(medias.ultimaOrdenha.dataMedida).toLocaleDateString("pt-BR")
                          : "N/A"}
                      </td>
                      <td className="p-3 text-center text-base text-black">
                        <span className={medias.variacao >= 0 ? "text-green-600" : "text-red-600"}>
                          {medias.variacao >= 0 ? "+" : ""}
                          {medias.variacao.toFixed(1)}%
                        </span>
                      </td>
                      <td className="p-3 text-center text-base text-black">
                        <span
                          className={`px-2.5 py-1.5 rounded-full text-sm font-bold inline-block w-28 ${getStatusColor(lactation.status)}`}
                        >
                          {formatStatus(lactation.status)}
                        </span>
                      </td>
                      <td className="p-3 text-center text-base">
                        <button
                          onClick={() => {
                            setSelectedLactation(lactation)
                            setShowProntuarioModal(true)
                          }}
                          className="bg-[#FFCF78] border-none text-black py-2 px-3.5 rounded-lg cursor-pointer text-sm font-bold hover:bg-[#f39c12] transition-colors"
                        >
                          Ver detalhes
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modais */}
      <ProducaoQuedaModal lactations={lactations} isOpen={modalAberto} onClose={() => setModalAberto(false)} />

      {showProntuarioModal && selectedLactation && (
        <ProntuarioLactacaoModal
          lactation={selectedLactation}
          isOpen={showProntuarioModal}
          onClose={() => setShowProntuarioModal(false)}
        />
      )}
    </div>
  )
}

function FilterTable({ lactations, onFilter }) {
  const [filters, setFilters] = useState({
    tag: "",
    status: "",
  })

  // Extrair valores únicos para os filtros
  const uniqueStatus = [...new Set(lactations.map((l) => l.status).filter(Boolean))]

  // Aplicar filtros
  useEffect(() => {
    let filtered = lactations

    if (filters.tag) {
      filtered = filtered.filter((l) => l.tagBufala?.toLowerCase().includes(filters.tag.toLowerCase()))
    }

    if (filters.status) {
      filtered = filtered.filter((l) => l.status === filters.status)
    }

    onFilter(filtered)
  }, [filters, lactations, onFilter])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      tag: "",
      status: "",
    })
  }

  return (
    <div className="flex flex-wrap gap-4 items-end mb-4">
      <div className="flex flex-col">
        <label className="font-semibold mb-1.5 text-black text-sm">Buscar por Tag</label>
        <input
          type="text"
          value={filters.tag}
          onChange={(e) => handleFilterChange("tag", e.target.value)}
          className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm w-[501px] max-w-full text-black"
          placeholder="Digite a tag da búfala"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-1.5 text-black text-sm">Status de lactação</label>
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-black w-[200px] max-w-full"
        >
          <option value="">Todos os status</option>
          {uniqueStatus.map((status) => (
            <option key={status} value={status}>
              {formatStatus(status)}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={clearFilters}
        className="py-2 px-3.5 border-2 border-[#D9DBDB] rounded-lg cursor-pointer font-bold text-black w-[198px] max-w-full mt-6 hover:bg-gray-50 transition-colors"
      >
        Limpar filtros
      </button>
    </div>
  )
}

// MilkProduction Component
function MilkProduction({ chartData }) {
  const [isClient, setIsClient] = useState(false)
  const [activeButton, setActiveButton] = useState(1)

  const getDataForPeriod = () => {
    if (activeButton === 1) {
      const data = chartData.weekly
      const total = data.reduce((sum, item) => sum + item.uv, 0)
      return { data, title: "Produção Semanal", value: `${total.toFixed(0)}L` }
    } else if (activeButton === 2) {
      const data = chartData.monthly
      const total = data.reduce((sum, item) => sum + item.uv, 0)
      return { data, title: "Produção Mensal", value: `${total.toFixed(0)}L` }
    } else {
      const data = chartData.yearly
      const total = data.reduce((sum, item) => sum + item.uv, 0)
      return { data, title: "Produção Anual", value: `${total.toFixed(0)}L` }
    }
  }

  const { data, title, value } = getDataForPeriod()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId)
  }

  return (
    <div className="bg-[#f8fcfa] p-4 rounded-lg border border-[#e0e0e0] w-full">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Gráfico de Produção</h3>
      <div className="flex justify-between mb-4 bg-white rounded-md">
        <button
          className={`py-2 px-4 rounded-md w-1/3 transition-all duration-300 ${
            activeButton === 1 ? "bg-[#f2b84d] text-black" : "bg-white text-black hover:bg-[#f2b84d] hover:text-white"
          }`}
          onClick={() => handleButtonClick(1)}
        >
          Semana
        </button>
        <button
          className={`py-2 px-4 rounded-md w-1/3 transition-all duration-300 ${
            activeButton === 2 ? "bg-[#f2b84d] text-black" : "bg-white text-black hover:bg-[#f2b84d] hover:text-white"
          }`}
          onClick={() => handleButtonClick(2)}
        >
          Mês
        </button>
        <button
          className={`py-2 px-4 rounded-md w-1/3 transition-all duration-300 ${
            activeButton === 3 ? "bg-[#f2b84d] text-black" : "bg-white text-black hover:bg-[#f2b84d] hover:text-white"
          }`}
          onClick={() => handleButtonClick(3)}
        >
          Ano
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-around gap-4">
        <div className="flex-1 min-w-[300px] p-4 bg-white rounded-md border-2 border-gray-300 flex flex-col items-center justify-center">
          <h4 className="text-base font-medium mb-2 text-gray-800">Gráfico de Produção</h4>
          <div className="w-full h-[265px]">
            <ResponsiveContainer>
              <AreaChart key={activeButton} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={0} angle={-35} textAnchor="end" style={{ fontSize: 10 }} />
                <YAxis tickCount={6} tickFormatter={(value) => `${value}L`} style={{ fontSize: 10 }} />
                <Tooltip formatter={(value) => `${value}L`} />
                <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full md:w-[30%] p-4 bg-white rounded-md border-2 border-gray-300 flex flex-col items-center justify-center">
          <h3 className="text-base font-bold text-gray-800 mb-2">{title}</h3>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold text-blue-600 mb-1">{value}</p>
            <p className="text-sm text-black">Produção total</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProducaoQueda({ quedaData, setModalAberto }) {
  const { bufalasComQueda, totalBufalas, percentualQueda, quedaMedia } = quedaData

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-[#e0e0e0]">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Búfalas com produção em queda</h2>

        <div className="flex justify-between mb-5">
          <div className="flex flex-col">
            <span className="text-sm text-black mb-1">Total identificado</span>
            <h3 className="text-2xl font-bold text-[#f59e0b] m-0">{bufalasComQueda.length} Búfalas</h3>
            <span className="text-sm text-black mt-1">{percentualQueda}% do rebanho</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-black mb-1">Queda média</span>
            <h3 className="text-2xl font-bold text-[#ef4444] m-0">{quedaMedia}%</h3>
          </div>
        </div>

        <div className="bg-[#fff8f0] border border-[#f59e0b] rounded-lg p-4 mb-5">
          <h4 className="text-base font-semibold text-[#f59e0b] m-0 mb-2">Atenção requerida</h4>
          <p className="text-sm text-gray-800 m-0 leading-relaxed">
            {bufalasComQueda.length} búfalas apresentam queda na produção nos últimos 7 dias. Verifique a alimentação e
            possíveis problemas de saúde.
          </p>
        </div>

        <button
          className="w-full py-3 bg-white border border-[#f59e0b] rounded-lg text-[#f59e0b] text-base font-medium text-center cursor-pointer transition-colors hover:bg-[#f59e0b] hover:text-white"
          onClick={() => setModalAberto(true)}
        >
          Ver Búfalas com quedas
        </button>
      </div>
    </div>
  )
}

function ProducaoQuedaModal({ lactations, isOpen, onClose }) {
  const bufalasComQueda = lactations
    .map((lactation) => {
      const medias = calcularMediasEVariacoes(lactation)
      return {
        ...lactation,
        variacao: medias.variacao,
        ultimaOrdenha: medias.ultimaOrdenha,
      }
    })
    .filter((lactation) => lactation.variacao < -2)
    .sort((a, b) => a.variacao - b.variacao)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-lg w-[90%] max-w-[800px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 bg-[#f59e0b] text-white">
          <h2 className="text-xl font-bold">Búfalas com Queda na Produção</h2>
          <p className="text-sm opacity-90">Lista de animais que apresentam queda superior a 2%</p>
        </div>
        <div className="p-0">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4 font-semibold text-gray-800 border-b border-gray-200">TAG</th>
                <th className="text-left p-4 font-semibold text-gray-800 border-b border-gray-200">Variação</th>
                <th className="text-left p-4 font-semibold text-gray-800 border-b border-gray-200">Última ordenha</th>
                <th className="text-left p-4 font-semibold text-gray-800 border-b border-gray-200">Status</th>
              </tr>
            </thead>
            <tbody>
              {bufalasComQueda.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">
                    Nenhuma búfala com queda na produção encontrada
                  </td>
                </tr>
              ) : (
                bufalasComQueda.map((lactation, index) => (
                  <tr key={lactation._id || lactation.tagBufala || index}>
                    <td className="p-4 border-b border-gray-200 text-gray-800">{lactation.tagBufala}</td>
                    <td className="p-4 border-b border-gray-200">
                      <span className="text-[#ef4444] flex items-center before:content-[''] before:inline-block before:w-0 before:h-0 before:border-l-[5px] before:border-r-[5px] before:border-t-[8px] before:border-t-[#ef4444] before:border-l-transparent before:border-r-transparent before:mr-1 before:rotate-[225deg]">
                        {lactation.variacao.toFixed(1)}%
                      </span>
                    </td>
                    <td className="p-4 border-b border-gray-200 text-gray-800">
                      {lactation.ultimaOrdenha
                        ? new Date(lactation.ultimaOrdenha.dataMedida).toLocaleDateString("pt-BR")
                        : "N/A"}
                    </td>
                    <td className="p-4 border-b border-gray-200">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lactation.status)}`}
                      >
                        {formatStatus(lactation.status)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 flex justify-end bg-[#f9f9f9]">
          <button
            className="py-2 px-6 bg-[#FFCF78] hover:bg-[#f39c12] text-black border-none rounded font-medium cursor-pointer transition-colors"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

function ProntuarioLactacaoModal({ lactation, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("producao")

  // Previne o scroll do body quando o modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null

  const processProducaoData = () => {
    const hoje = new Date()
    const data = []

    for (let i = 29; i >= 0; i--) {
      const date = new Date(hoje)
      date.setDate(hoje.getDate() - i)

      let producaoDia = 0
      lactation.metrica?.forEach((metrica) => {
        const dataMetrica = new Date(metrica.dataMedida)
        if (dataMetrica.toDateString() === date.toDateString()) {
          producaoDia += metrica.quantidade
        }
      })

      data.push({
        day: date.getDate(),
        producao: producaoDia,
      })
    }

    return data
  }

  const producaoData = processProducaoData()
  const medias = calcularMediasEVariacoes(lactation)

  const metricasOrdenadas = lactation.metrica
    ? [...lactation.metrica].sort((a, b) => new Date(b.dataMedida) - new Date(a.dataMedida))
    : []

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[9999] p-4" onClick={onClose}>
      <div
        className="bg-white rounded-xl w-full max-w-[900px] h-[85vh] relative shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header do Modal */}
        <div className="bg-gradient-to-r from-[#FFCF78] to-[#f39c12] p-4 flex justify-between items-center rounded-t-xl">
          <div>
            <h2 className="text-xl font-bold text-black">Prontuário de lactação: {lactation.tagBufala}</h2>
            <p className="text-black/80 text-sm">Informações detalhadas sobre produção de leite da búfala.</p>
          </div>
          <button
            className="text-2xl bg-white/20 hover:bg-white/30 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 text-black"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "producao"
                ? "border-b-2 border-[#FFCF78] text-[#f39c12] bg-orange-50"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("producao")}
          >
            Produção Diária (30 d)
          </button>
          <button
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "historico"
                ? "border-b-2 border-[#FFCF78] text-[#f39c12] bg-orange-50"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("historico")}
          >
            Histórico
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          {activeTab === "producao" && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={producaoData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis tickFormatter={(value) => `${value}L`} />
                    <Tooltip formatter={(value) => [`${value}L`, "Produção"]} />
                    <Line type="monotone" dataKey="producao" stroke="#f39c12" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-black mb-2">Produção diária</h3>
                  <p className="text-3xl font-bold text-black">{medias.mediaDiaria.toFixed(2)} L</p>
                  <p className="text-sm text-green-600 mt-1">
                    {medias.variacao >= 0 ? "+" : ""}
                    {medias.variacao.toFixed(1)}% em relação à semana anterior
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-black mb-2">Última ordenha</h3>
                  <p className="text-3xl font-bold text-black">
                    {medias.ultimaOrdenha ? medias.ultimaOrdenha.quantidade.toFixed(2) : "0.00"} L
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Data:{" "}
                    {medias.ultimaOrdenha
                      ? new Date(medias.ultimaOrdenha.dataMedida).toLocaleDateString("pt-BR")
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "historico" && (
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <h3 className="text-lg font-semibold text-black p-4 border-b border-gray-200">
                  Registro das últimas ordenhas
                </h3>
                <div className="overflow-x-auto max-h-[300px]">
                  <table className="w-full">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Data</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Período</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Quantidade (L)</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Unidade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {metricasOrdenadas.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                            Nenhuma métrica encontrada
                          </td>
                        </tr>
                      ) : (
                        metricasOrdenadas.slice(0, 10).map((metrica, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-800">
                              {new Date(metrica.dataMedida).toLocaleDateString("pt-BR")}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-800">
                              {new Date(metrica.dataMedida).getHours() < 12 ? "Manhã" : "Tarde"}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-800">{metrica.quantidade.toFixed(2)} L</td>
                            <td className="px-4 py-3 text-sm text-gray-800">{metrica.unidadeMedida}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-black mb-3">Dieta Atual</h3>
                  <h4 className="font-medium text-black">Dieta Premium Lactação</h4>
                  <p className="text-sm text-gray-600 mb-3">Forragem de alta qualidade com suplementação proteica</p>
                  <div className="bg-blue-50 border border-blue-200 rounded p-3">
                    <h5 className="font-medium text-blue-800 mb-1">Nota nutricionista</h5>
                    <p className="text-sm text-blue-700">Manter dieta atual, búfala respondendo positivamente.</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-black mb-3">Suplementação</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Minerais balanceados
                    </li>
                    <li className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Proteína concentrada
                    </li>
                    <li className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Probióticos
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white border-t border-gray-200 p-3 rounded-b-xl">
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-1 shadow-md hover:shadow-lg text-sm">
              <span>📄</span>
              <span>Relatório</span>
            </button>
            <button
              className="bg-[#FFCF78] hover:bg-[#f39c12] text-black px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-1 shadow-md hover:shadow-lg text-sm"
              onClick={onClose}
            >
              <span>✖️</span>
              <span>Fechar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

Lactacao.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
