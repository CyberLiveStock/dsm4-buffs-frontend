
"use client"

import Layout from "@/layout/Layout"
import { useState, useEffect } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function Lactacao() {
  const [modalAberto, setModalAberto] = useState(false)

  return (
      <div className="p-6 flex flex-col items-center gap-8">
        {/* Indicadores de produção diária, semanal, mensal e anual */}
        <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
      <h2 className="text-sm font-medium text-gray-500">Produção Diária</h2>
      <p className="text-2xl font-bold text-gray-800">245 L</p>
      <p className="text-sm font-medium text-green-700">+12% em relação a ontem</p>
    </div>

    <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
      <h2 className="text-sm font-medium text-gray-500">Produção Semanal</h2>
      <p className="text-2xl font-bold text-gray-800">1.680 L</p>
      <p className="text-sm font-medium text-green-700">+5% em relação à semana anterior</p>
    </div>

    <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
      <h2 className="text-sm font-medium text-gray-500">Produção Mensal</h2>
      <p className="text-2xl font-bold text-gray-800">7.245 L</p>
      <p className="text-sm font-medium text-green-700">+8% em relação ao mês anterior</p>
    </div>

    <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
      <h2 className="text-sm font-medium text-gray-500">Produção Anual</h2>
      <p className="text-2xl font-bold text-gray-800">86.420 L</p>
      <p className="text-sm font-medium text-green-700">+15% em relação ao ano anterior</p>
    </div>
  </div>
</div>


        {/* Gráfico da Lactação mensal, semanal e anual */}
        <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
          <div className="flex flex-wrap justify-between gap-5">
            <div className="bg-[#f9f9f9] p-4 rounded-lg border border-[#eeeeee] flex justify-center items-center min-h-[300px] flex-grow w-full md:w-[calc(60%-10px)]">
              <MilkProduction />
            </div>
            <div className="bg-[#f9f9f9] p-4 rounded-lg border border-[#eeeeee] flex justify-center items-center min-h-[300px] flex-grow w-full md:w-[calc(40%-10px)]">
              <ProducaoQueda setModalAberto={setModalAberto} />
            </div>
          </div>
        </div>

        {/* Tabela com informações sobre a média e ordenha */}
        <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
          {/* Barra de pesquisa e filtros */}
          <div className="flex flex-wrap gap-4 items-end mb-4">
            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-black text-sm">Buscar por Tag</label>
              <input
                type="text"
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm w-[501px] max-w-full text-black"
                placeholder="Digite a tag"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-black text-sm">Status de lactação</label>
              <select className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-black w-[200px] max-w-full">
                <option>Status de lactação</option>
                <option>Ativa</option>
                <option>Em queda</option>
                <option>Secando</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-black text-sm">Localização</label>
              <select className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-black w-[200px] max-w-full">
                <option>Piquete</option>
                <option>Piquete 1</option>
                <option>Piquete 2</option>
              </select>
            </div>

            <button className="py-2 px-3.5 border-2 border-[#D9DBDB] rounded-lg cursor-pointer font-bold text-black w-[198px] max-w-full mt-6">
              Limpar filtros
            </button>
          </div>

          {/* Tabela */}
          <div className="overflow-x-auto w-full">
            <table className="w-full border-collapse min-w-[650px] bg-white rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-[#f0f0f0]">
                <tr>
                  <th className="p-3 text-center font-medium text-gray-800 text-base">TAG</th>
                  <th className="p-3 text-center font-medium text-gray-800 text-base">Nome</th>
                  <th className="p-3 text-center font-medium text-gray-800 text-base">Média diária(7d)</th>
                  <th className="p-3 text-center font-medium text-gray-800 text-base">Média Semanal</th>
                  <th className="p-3 text-center font-medium text-gray-800 text-base">Última Ordenha</th>
                  <th className="p-3 text-center font-medium text-gray-800 text-base">Variação</th>
                  <th className="p-3 text-center font-medium text-gray-800 text-base w-48">Status</th>

                  <th className="p-3 text-center font-medium text-gray-800 text-base">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#fafafa]">
                  <td className="p-3 text-center text-base text-black">BF001</td>
                  <td className="p-3 text-center text-base text-black">Aurora</td>
                  <td className="p-3 text-center text-base text-black">9.50 L</td>
                  <td className="p-3 text-center text-base text-black">66.50 L</td>
                  <td className="p-3 text-center text-base text-black">14/11/2023</td>
                  <td className="p-3 text-center text-base text-black">3.20 %</td>
                  <td className="p-3 text-center text-base text-black ">
                    <span className="bg-[#9DFFBE] text-black px-2.5 py-1.5 rounded-full text-sm font-bold inline-block w-28">
                      Ativo
                    </span>
                  </td>
                  <td className="p-3 text-center text-base">
                    <button className="bg-[#FFCF78] border-none text-black py-2 px-3.5 rounded-lg cursor-pointer text-sm font-bold hover:bg-[#f39c12] transition-colors">
                      Ver detalhes
                    </button>
                  </td>
                </tr>

                <tr className="bg-white">
                  <td className="p-3 text-center text-black ">BF002</td>
                  <td className="p-3 text-center text-black ">Beleza</td>
                  <td className="p-3 text-center text-black ">7.60 L</td>
                  <td className="p-3 text-center text-black ">52.50 L</td>
                  <td className="p-3 text-center text-black ">11/11/2023</td>
                  <td className="p-3 text-center text-black ">5.80 %</td>
                  <td className="p-3 text-center text-black ">
                    <span className="bg-[#d81a1a98] text-white px-2.5 py-1.5 rounded-full text-sm font-bold inline-block w-28">
                      Em queda
                    </span>
                  </td>
                  <td className="p-3 text-center text-base">
                    <button className="bg-[#FFCF78] border-none text-black py-2 px-3.5 rounded-lg cursor-pointer text-sm font-bold hover:bg-[#f39c12] transition-colors">
                      Ver detalhes
                    </button>
                  </td>
                </tr>

                <tr className="bg-[#fafafa]">
                  <td className="p-3 text-center text-black">BF003</td>
                  <td className="p-3 text-center text-black">Beleza</td>
                  <td className="p-3 text-center text-black">7.60 L</td>
                  <td className="p-3 text-center text-black">52.50 L</td>
                  <td className="p-3 text-center text-black">11/11/2023</td>
                  <td className="p-3 text-center text-black">5.80 %</td>
                  <td className="p-3 text-center text-black">
                    <span className="bg-[#ffcc0084] text-black px-2.5 py-1.5 rounded-full text-sm font-bold inline-block w-28">
                      Secando
                    </span>
                  </td>
                  <td className="p-3 text-center text-black">
                    <button className="bg-[#FFCF78] border-none text-black py-2 px-3.5 rounded-lg cursor-pointer text-sm font-bold hover:bg-[#f39c12] transition-colors">
                      Ver detalhes
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal de Produção em Queda */}
        <ProducaoQuedaModal isOpen={modalAberto} onClose={() => setModalAberto(false)} />
      </div>
  )
}

// MilkProduction Component
function MilkProduction() {
  const [isClient, setIsClient] = useState(false)
  const [activeButton, setActiveButton] = useState(1)

  const weeklyData = [
    { name: "Segunda", uv: 4000 },
    { name: "Terça", uv: 3100 },
    { name: "Quarta", uv: 2200 },
    { name: "Quinta", uv: 2780 },
    { name: "Sexta", uv: 1890 },
    { name: "Sábado", uv: 2390 },
    { name: "Domingo", uv: 3490 },
  ]

  const monthlyData = [
    { name: "Semana 1", uv: 16000 },
    { name: "Semana 2", uv: 14500 },
    { name: "Semana 3", uv: 12800 },
    { name: "Semana 4", uv: 17000 },
  ]

  const yearlyData = [
    { name: "Jan", uv: 60000 },
    { name: "Fev", uv: 50000 },
    { name: "Mar", uv: 45000 },
    { name: "Abr", uv: 53000 },
    { name: "Mai", uv: 60000 },
    { name: "Jun", uv: 70000 },
    { name: "Jul", uv: 65000 },
    { name: "Ago", uv: 67000 },
    { name: "Set", uv: 72000 },
    { name: "Out", uv: 69000 },
    { name: "Nov", uv: 71000 },
    { name: "Dez", uv: 74000 },
  ]

  const getDataForPeriod = () => {
    if (activeButton === 1) {
      return { data: weeklyData, title: "Média Semanal", value: "1000L" }
    } else if (activeButton === 2) {
      return { data: monthlyData, title: "Média Mensal", value: "15000L" }
    } else {
      return { data: yearlyData, title: "Média Anual", value: "60000L" }
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
            <p className="text-sm text-black">Meta atingida</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ProducaoQueda Component
function ProducaoQueda({ setModalAberto }) {
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-[#e0e0e0]">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Búfalas com produção em queda</h2>

        <div className="flex justify-between mb-5">
          <div className="flex flex-col">
            <span className="text-sm text-black mb-1">Total identificado</span>
            <h3 className="text-2xl font-bold text-[#f59e0b] m-0">12 Búfalas</h3>
            <span className="text-sm text-black mt-1">14% do rebanho</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-black mb-1">Queda média</span>
            <h3 className="text-2xl font-bold text-[#ef4444] m-0">8.5%</h3>
          </div>
        </div>

        <div className="bg-[#fff8f0] border border-[#f59e0b] rounded-lg p-4 mb-5">
          <h4 className="text-base font-semibold text-[#f59e0b] m-0 mb-2">Atenção requerida</h4>
          <p className="text-sm text-gray-800 m-0 leading-relaxed">
            12 búfalas apresentam queda na produção nos últimos 7 dias. Verifique a alimentação e possíveis problemas de
            saúde.
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

// ProducaoQuedaModal Component
function ProducaoQuedaModal({ isOpen, onClose }) {
  // Dados das búfalas com queda na produção
  const bufalasComQueda = [
    {
      tag: "BF005",
      nome: "Amélia",
      variacao: "5.50 %",
      ultimaOrdenha: "05/04/2024",
    },
    {
      tag: "BF006",
      nome: "Mimosa",
      variacao: "6.0 %",
      ultimaOrdenha: "30/04/2024",
    },
    {
      tag: "BF009",
      nome: "Claudia",
      variacao: "2.80 %",
      ultimaOrdenha: "10/04/2024",
    },
    {
      tag: "BF012",
      nome: "Linda",
      variacao: "10.50 %",
      ultimaOrdenha: "14/04/2024",
    },
    {
      tag: "BF045",
      nome: "Mila",
      variacao: "4.80 %",
      ultimaOrdenha: "02/04/2024",
    },
    {
      tag: "BF056",
      nome: "Augusta",
      variacao: "3.84 %",
      ultimaOrdenha: "14/04/2024",
    },
  ]

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

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-lg w-[90%] max-w-[800px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-0">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4 font-semibold text-gray-800 border-b border-gray-200">TAG</th>
                <th className="text-left p-4 font-semibold text-gray-800 border-b border-gray-200">NOME</th>
                <th className="text-left p-4 font-semibold text-gray-800 border-b border-gray-200">Variação</th>
                <th className="text-left p-4 font-semibold text-gray-800 border-b border-gray-200">Última ordenha</th>
              </tr>
            </thead>
            <tbody>
              {bufalasComQueda.map((bufala) => (
                <tr key={bufala.tag}>
                  <td className="p-4 border-b border-gray-200 text-gray-800">{bufala.tag}</td>
                  <td className="p-4 border-b border-gray-200 text-gray-800">{bufala.nome}</td>
                  <td className="p-4 border-b border-gray-200">
                    <span className="text-[#ef4444] flex items-center before:content-[''] before:inline-block before:w-0 before:h-0 before:border-l-[5px] before:border-r-[5px] before:border-t-[8px] before:border-t-[#ef4444] before:border-l-transparent before:border-r-transparent before:mr-1 before:rotate-[225deg]">
                      {bufala.variacao}
                    </span>
                  </td>
                  <td className="p-4 border-b border-gray-200 text-gray-800">{bufala.ultimaOrdenha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 flex justify-end bg-[#f9f9f9]">
          <button
            className="py-2 px-6 bg-[#fff8f0] text-[#f59e0b] border-none rounded font-medium cursor-pointer transition-colors hover:bg-[#f59e0b] hover:text-white"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}


Lactacao.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};