"use client"
import Layout from "@/layout/Layout"

export default function Producao() {
  return (
    <div className="w-full bg-white p-5 flex flex-col items-center gap-5 box-border">
      {/* Indicadores da Produção */}
      <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
  <div>
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Controle de Produção</h1>
    <p className="text-base text-gray-700 mb-4">Monitoramento da Produção de Leite de Búfalas</p>
  </div>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
      <h2 className="text-sm font-medium text-gray-500">Total Produzido</h2>
      <p className="text-2xl font-bold text-gray-800">9.075 L</p>
      <p className="text-sm font-medium text-green-700">+5.2% vs. período anterior</p>
    </div>

    <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
      <h2 className="text-sm font-medium text-gray-500">Total Retirado</h2>
      <p className="text-2xl font-bold text-gray-800">9.075 L</p>
      <p className="text-sm font-medium text-green-700">+4.8% vs. período anterior</p>
    </div>

    <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
      <h2 className="text-sm font-medium text-gray-500">Taxa de Aprovação</h2>
      <p className="text-2xl font-bold text-gray-800">98.7%</p>
      <p className="text-sm font-medium text-green-700">+1.5% vs. período anterior</p>
    </div>

    <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
      <h2 className="text-sm font-medium text-gray-500">Volume Rejeitado</h2>
      <p className="text-2xl font-bold text-gray-800">120 L</p>
      <p className="text-sm font-medium text-red-600">-2.3% vs. período anterior</p>
    </div>
  </div>
</div>


      {/* Tabela de Coletas */}
      <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse min-w-[650px] bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-[#f0f0f0]">
              <tr>
                <th className="p-3 text-center font-medium text-gray-800 text-base">Data da Coleta</th>
                <th className="p-3 text-center font-medium text-gray-800 text-base">Status</th>
                <th className="p-3 text-center font-medium text-gray-800 text-base">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#fafafa]">
                <td className="p-3 text-center text-gray-800 text-base">14/11/2023</td>
                <td className="p-3 text-center text-base">
                  <span className="bg-[#9DFFBE] text-black px-2.5 py-1.5 rounded-full text-sm font-bold inline-block w-20">
                    Aprovado
                  </span>
                </td>
                <td className="p-3 text-center text-base">
                  <button className="bg-[#FFCF78] border-none text-black py-2 px-3.5 rounded-lg cursor-pointer text-sm font-bold hover:bg-[#f39c12] transition-colors">
                    Ver detalhes
                  </button>
                </td>
              </tr>

              <tr className="bg-white">
                <td className="p-3 text-center text-gray-800 text-base">05/11/2023</td>
                <td className="p-3 text-center text-base">
                  <span className="bg-[#FF9D9F] text-black px-2.5 py-1.5 rounded-full text-sm font-bold inline-block w-20">
                    Reprovado
                  </span>
                </td>
                <td className="p-3 text-center text-base">
                  <button className="bg-[#FFCF78] border-none text-black py-2 px-3.5 rounded-lg cursor-pointer text-sm font-bold hover:bg-[#f39c12] transition-colors">
                    Ver detalhes
                  </button>
                </td>
              </tr>

              <tr className="bg-[#fafafa]">
                <td className="p-3 text-center text-gray-800 text-base">28/10/2023</td>
                <td className="p-3 text-center text-base">
                  <span className="bg-[#9DFFBE] text-black px-2.5 py-1.5 rounded-full text-sm font-bold inline-block w-20">
                    Aprovado
                  </span>
                </td>
                <td className="p-3 text-center text-base">
                  <button className="bg-[#FFCF78] border-none text-black py-2 px-3.5 rounded-lg cursor-pointer text-sm font-bold hover:bg-[#f39c12] transition-colors">
                    Ver detalhes
                  </button>
                </td>
              </tr>

              <tr className="bg-white">
                <td className="p-3 text-center text-gray-800 text-base">21/10/2023</td>
                <td className="p-3 text-center text-base">
                  <span className="bg-[#9DFFBE] text-black px-2.5 py-1.5 rounded-full text-sm font-bold inline-block w-20">
                    Aprovado
                  </span>
                </td>
                <td className="p-3 text-center text-base">
                  <button className="bg-[#FFCF78] border-none text-black py-2 px-3.5 rounded-lg cursor-pointer text-sm font-bold hover:bg-[#f39c12] transition-colors">
                    Ver detalhes
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

Producao.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
