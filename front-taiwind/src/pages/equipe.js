"use client"
import Layout from "@/layout/Layout"

export default function Equipe() {
  return (
    <div className="w-full h-screen bg-[#f5f5f5] p-5 flex flex-col items-center gap-5 box-border">

      {/* Indicador do gerenciamento dos funcionários */}
      <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-black mb-2">Gerenciamento de Funcionários</h1>
          <p className="text-base text-black mb-4">Cadastre e gerencie o acesso dos funcionários ao sistema.</p>
        </div>
      </div>

      {/*Tabela e filtros para controle de funcionários*/}
      <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
        <FilterTable />
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse min-w-[650px] bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-[#f0f0f0]">
              <tr>
                <th className="p-3 text-center font-medium text-black text-base">Nome</th>
                <th className="p-3 text-center font-medium text-black text-base">E-mail</th>
                <th className="p-3 text-center font-medium text-black text-base">Cargo(s)</th>
                <th className="p-3 text-center font-medium text-black text-base">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#fafafa]">
                <td className="p-3 text-center text-black text-base">Vinicius Souza</td>
                <td className="p-3 text-center text-black text-base">vinicius_souza@buffs.com</td>
                <td className="p-3 text-center text-black text-base">Veterinário</td>
                <td className="p-3 text-center text-base">
                  <button className="bg-[#FFCF78] border-none text-black py-2 px-3.5 rounded-lg cursor-pointer text-sm font-bold hover:bg-[#f39c12] transition-colors">
                    Ver detalhes
                  </button>
                </td>
              </tr>

              <tr className="bg-white">
                <td className="p-3 text-center text-black text-base">João Lima</td>
                <td className="p-3 text-center text-black text-base">joaolima@buffs.com</td>
                <td className="p-3 text-center text-black text-base">Gerente de Produção</td>
                <td className="p-3 text-center text-base">
                  <button className="bg-[#FFCF78] border-none text-black py-2 px-3.5 rounded-lg cursor-pointer text-sm font-bold hover:bg-[#f39c12] transition-colors">
                    Ver detalhes
                  </button>
                </td>
              </tr>

              <tr className="bg-[#fafafa]">
                <td className="p-3 text-center text-black text-base">Paulo Cesar Candiani</td>
                <td className="p-3 text-center text-black text-base">paulocesar@buffs.com</td>
                <td className="p-3 text-center text-black text-base">Auxiliar de Produção</td>
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

// FilterTable Component
function FilterTable() {
  return (
    <div className="flex gap-2.5 flex-wrap items-center">
      <div className="flex flex-col">
        <label className="font-semibold mb-1.5 text-black text-sm">Buscar por Nome</label>
        <input
          type="text"
          className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm w-[601px] max-w-full text-black"
          placeholder="Digite o nome"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-1.5 text-black text-sm">Cargo</label>
        <select className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-black w-[254px] max-w-full">
          <option>Cargo</option>
          <option>Veterinário</option>
          <option>Gerente de Produção</option>
          <option>Auxiliar de Produção</option>
        </select>
      </div>

      <button className="mt-6 py-2 px-3.5 bg-[#28a745] border-2 border-[#28a745] rounded-lg cursor-pointer font-bold text-white w-[256px] max-w-full hover:bg-[#218838] transition-colors">
        Cadastrar Funcionário
      </button>
    </div>
  )
}

Equipe.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
