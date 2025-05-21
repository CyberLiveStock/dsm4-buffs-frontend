"use client"

import { useState } from "react"
import Layout from "@/layout/Layout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"

export default function ControleReproducao() {
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState("lactando")

  return (
      <div className="p-6 flex flex-col items-center gap-8">
        {/* Indicadores da gestão da Reprodução */}
        <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-black">Gestão de Reprodução</h1>
            <p className="text-black">
              Monitore o status reprodutivo do seu rebanho e otimize o desempenho reprodutivo.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
              <h2 className="text-sm font-medium text-black">Total de Búfalas</h2>
              <p className="text-xs text-black">Monitoramento reprodutivo ativo</p>
              <p className="text-2xl font-bold text-black mt-2">10</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
              <h2 className="text-sm font-medium text-black">Análise Financeira</h2>
              <p className="text-xs text-black">Búfalas com impacto financeiro negativo</p>

              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className="text-amber-500"
                    title="Essas búfalas não estão lactando nem entrando no cio."
                  />
                  <p className="text-sm text-red-600">
                    <strong>4 búfalas</strong>
                  </p>
                </div>
                <span className="text-lg font-bold text-red-600">57.1%</span>

              </div>
            </div>
          </div>
        </div>

        {/* Tabela de Registro Reprodutivo */}
        <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
          <FilterTable />
          <div className="overflow-x-auto w-full">
            <table className="w-full border-collapse min-w-[650px]">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left font-medium text-black border-b">TAG</th>
                  <th className="p-3 text-left font-medium text-black border-b">Vet Responsável</th>
                  <th className="p-3 text-left font-medium text-black border-b">Última identificação</th>
                  <th className="p-3 text-left font-medium text-black border-b">Tipo de Inseminação</th>
                  <th className="p-3 text-left font-medium text-black border-b">Status Prenhez</th>
                  <th className="p-3 text-left font-medium text-black border-b">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50">
                  <td className="p-3 border-b text-black">BF001</td>
                  <td className="p-3 border-b text-black">Dr. Carlos Mendes</td>
                  <td className="p-3 border-b text-black">09/12/2023</td>
                  <td className="p-3 border-b text-black">Artificial</td>
                  <td className="p-3 border-b text-black">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      Lactando
                    </span>
                  </td>
                  <td className="p-3 border-b">
                    <button className="bg-[#fae7d6] text-[#5c4b35] px-3 py-1 rounded-md text-sm font-medium hover:bg-[#f2b84d] transition-colors">
                      Ver detalhes
                    </button>
                  </td>
                </tr>

                <tr className="bg-white">
                  <td className="p-3 border-b text-black">BF002</td>
                  <td className="p-3 border-b text-black">Dr. Maria Silva</td>
                  <td className="p-3 border-b text-black">19/11/2023</td>
                  <td className="p-3 border-b text-black">IATF</td>
                  <td className="p-3 border-b text-black">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Prenhez Confirmada
                    </span>
                  </td>
                  <td className="p-3 border-b">
                    <button className="bg-[#fae7d6] text-[#5c4b35] px-3 py-1 rounded-md text-sm font-medium hover:bg-[#f2b84d] transition-colors">
                      Ver detalhes
                    </button>
                  </td>
                </tr>

                <tr className="bg-gray-50">
                  <td className="p-3 border-b text-black">BF003</td>
                  <td className="p-3 border-b text-black">Dr. João Lima</td>
                  <td className="p-3 border-b text-black">14/12/2023</td>
                  <td className="p-3 border-b text-black">Monta Natural</td>
                  <td className="p-3 border-b text-black">
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
                      No cio
                    </span>
                  </td>
                  <td className="p-3 border-b">
                    <button className="bg-[#fae7d6] text-[#5c4b35] px-3 py-1 rounded-md text-sm font-medium hover:bg-[#f2b84d] transition-colors">
                      Ver detalhes
                    </button>
                  </td>
                </tr>

                <tr className="bg-white">
                  <td className="p-3 border-b text-black">BF004</td>
                  <td className="p-3 border-b text-black">Dr. Ana Pereira</td>
                  <td className="p-3 border-b text-black">29/11/2023</td>
                  <td className="p-3 border-b text-black">Artificial</td>
                  <td className="p-3 border-b text-black">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                      Em secagem
                    </span>
                  </td>
                  <td className="p-3 border-b">
                    <button className="bg-[#fae7d6] text-[#5c4b35] px-3 py-1 rounded-md text-sm font-medium hover:bg-[#f2b84d] transition-colors">
                      Ver detalhes
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Status Reprodutivo */}
        <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
          <StatusReprodutivo />
        </div>
      </div>
  )
}

// FilterTable Component
function FilterTable() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="flex flex-wrap gap-4 items-end mb-4">
      <div className="flex flex-col">
        <label className="font-semibold mb-1.5 text-black text-sm">Buscar por Tag</label>
        <input
          type="text"
          className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm w-[301px] max-w-full text-black"
          placeholder="Digite a tag"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-1.5 text-black text-sm">Filtrar por Vet</label>
        <select className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-black w-[197px] max-w-full">
          <option>Filtrar por Vet</option>
          <option>Dr. Carlos Mendes</option>
          <option>Dr. Maria Silva</option>
          <option>Dr. João Lima</option>
          <option>Dr. Ana Pereira</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-1.5 text-black text-sm">Tipo de Inseminação</label>
        <select className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-black w-[197px] max-w-full">
          <option>Tipo de Inseminação</option>
          <option>Artificial</option>
          <option>IATF</option>
          <option>Monta Natural</option>
          <option>Transferência de Embrião</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-1.5 text-black text-sm">Status</label>
        <select className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-black w-[197px] max-w-full">
          <option>Status</option>
          <option>Lactando</option>
          <option>Prenhez Confirmada</option>
          <option>Em Secagem</option>
          <option>No cio</option>
        </select>
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="py-2 px-3.5 border-2 border-[#D9DBDB] rounded-lg cursor-pointer font-bold text-black w-[198px] max-w-full"
      >
        Filtrar por período
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-[400px] flex flex-col gap-3 relative">
            <button
              className="absolute top-2 right-3 text-2xl bg-transparent border-none cursor-pointer text-black"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2 text-black">Filtrar por período</h2>
            <label className="font-medium text-black">Data Inicial:</label>
            <input type="date" className="p-2 text-base border border-gray-300 rounded text-black" />
            <label className="font-medium text-black">Data Final:</label>
            <input type="date" className="p-2 text-base border border-gray-300 rounded text-black" />
            <button className="mt-2 py-2.5 px-4 text-base bg-[#FFCF78] text-black border-none rounded cursor-pointer hover:bg-[#f39c12] transition-colors">
              Aplicar Filtro
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// StatusReprodutivo Component
function StatusReprodutivo() {
  // Dados do status reprodutivo
  const statusData = [
    { status: "No cio", valor: 1.5 },
    { status: "Prenhez confirmada", valor: 1.5 },
    { status: "Lactando", valor: 0.5 },
    { status: "Em secagem", valor: 1.5 },
  ]

  // Valor máximo para escala do eixo Y
  const maxValue = Math.max(...statusData.map((item) => item.valor)) * 1.2

  // Valores do eixo Y
  const yAxisValues = [0, maxValue / 4, maxValue / 2, (maxValue * 3) / 4, maxValue]

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg p-6 mb-6 border border-[#e0e0e0]">
        <h2 className="text-xl font-semibold text-black m-0">Distribuição por Status reprodutivo</h2>
        <p className="text-sm text-black mt-1 mb-6">Análise detalhada do status das búfalas</p>

        <div className="h-[300px] relative pl-10 pb-10 box-border">
          {/* Eixo Y */}
          <div className="absolute left-0 top-0 bottom-10 w-10 flex flex-col justify-between items-end pr-2.5">
            {yAxisValues.reverse().map((value, index) => (
              <div key={index} className="text-xs text-black">
                {value.toFixed(1)}
              </div>
            ))}
          </div>

          {/* Gráfico de barras */}
          <div className="h-full flex items-end justify-around">
            {statusData.map((item, index) => (
              <div
                key={index}
                className={`w-20 rounded-t-md relative transition-all duration-300 ease-in-out ${
                  index === 0
                    ? "bg-[#f59e0b]"
                    : index === 1
                      ? "bg-[#f59e0b] opacity-90"
                      : index === 2
                        ? "bg-[#f59e0b] opacity-80"
                        : "bg-[#f59e0b] opacity-70"
                }`}
                style={{
                  height: `${(item.valor / maxValue) * 100}%`,
                }}
              >
                <div className="absolute -top-5 left-0 right-0 text-center text-xs font-medium">
                  {item.valor.toFixed(1)}
                </div>
              </div>
            ))}
          </div>

          {/* Eixo X */}
          <div className="absolute left-10 right-0 bottom-0 h-10 flex justify-around">
            {statusData.map((item, index) => (
              <div key={index} className="text-xs text-black text-center w-20">
                {item.status}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


ControleReproducao.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };