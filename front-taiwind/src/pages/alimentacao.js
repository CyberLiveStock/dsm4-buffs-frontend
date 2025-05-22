"use client"

import { useState } from "react"
import Layout from "@/layout/Layout"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

export default function Alimentacao() {
  const [activeTab, setActiveTab] = useState("alimentos")
  const [showAddFoodModal, setShowAddFoodModal] = useState(false)
  const [showEditFoodModal, setShowEditFoodModal] = useState(false)
  const [showAddAssignmentModal, setShowAddAssignmentModal] = useState(false)
  const [showEditAssignmentModal, setShowEditAssignmentModal] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [deleteType, setDeleteType] = useState("")

  // Dados para o gráfico de pizza
  const foodDistributionData = [
    { name: "Produzido na Fazenda", value: 65 },
    { name: "Fornecido por Terceiros", value: 35 },
  ]

  const COLORS = ["#f59e0b", "#3b82f6"]

  // Dados para a tabela de alimentos
  const alimentos = [
    {
      id: 1,
      nome: "Silagem de Milho",
      origem: "Produzido na Fazenda",
      beneficio: "Alto valor energético",
      estoque: "2.500 kg",
      frequencia: "Diária",
      horarios: "08:00, 16:00",
      custoUnitario: "R$ 0,45/kg",
      status: "Ativo",
    },
    {
      id: 2,
      nome: "Feno de Alfafa",
      origem: "Fornecido por Terceiros",
      beneficio: "Rico em proteínas",
      estoque: "1.200 kg",
      frequencia: "Diária",
      horarios: "08:00, 16:00",
      custoUnitario: "R$ 1,20/kg",
      status: "Ativo",
    },
    {
      id: 3,
      nome: "Ração Concentrada",
      origem: "Fornecido por Terceiros",
      beneficio: "Suplementação nutricional",
      estoque: "800 kg",
      frequencia: "Diária",
      horarios: "08:00, 16:00",
      custoUnitario: "R$ 2,10/kg",
      status: "Ativo",
    },
    {
      id: 4,
      nome: "Capim Napier",
      origem: "Produzido na Fazenda",
      beneficio: "Fibra digestível",
      estoque: "3.500 kg",
      frequencia: "Diária",
      horarios: "08:00, 16:00",
      custoUnitario: "R$ 0,30/kg",
      status: "Inativo",
    },
  ]

  // Dados para a tabela de atribuições
  const atribuicoes = [
    {
      id: 1,
      alimento: "Silagem de Milho",
      atribuidoA: "Búfalas em Lactação",
      frequencia: "2x ao dia",
      periodo: "Todo o ano",
      notas: "Fornecer 15kg por animal",
    },
    {
      id: 2,
      alimento: "Feno de Alfafa",
      atribuidoA: "Bezerros",
      frequencia: "3x ao dia",
      periodo: "Primeiros 6 meses",
      notas: "Fornecer 2kg por animal",
    },
    {
      id: 3,
      alimento: "Ração Concentrada",
      atribuidoA: "Búfalas Gestantes",
      frequencia: "1x ao dia",
      periodo: "Último trimestre",
      notas: "Fornecer 3kg por animal",
    },
    {
      id: 4,
      alimento: "Capim Napier",
      atribuidoA: "Todo o Rebanho",
      frequencia: "À vontade",
      periodo: "Estação chuvosa",
      notas: "Disponibilizar nos piquetes",
    },
  ]

  const handleDelete = (id, type) => {
    setItemToDelete(id)
    setDeleteType(type)
    setShowDeleteConfirmation(true)
  }

  const confirmDelete = () => {
    // Lógica para deletar o item
    console.log(`Deletando ${deleteType} com ID: ${itemToDelete}`)
    setShowDeleteConfirmation(false)
  }

  const handleEdit = (type, id) => {
    if (type === "alimento") {
      setShowEditFoodModal(true)
    } else {
      setShowEditAssignmentModal(true)
    }
  }

  return (
    <div className="w-full bg-[#f5f5f5] p-5 flex flex-col items-center gap-5 box-border">
      {/* Seção 1: Gráfico de Distribuição de Alimentos */}
      <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Alimentação do Rebanho</h1>
          <p className="text-base text-gray-700 mb-4">Gestão e monitoramento da alimentação dos búfalos</p>
        </div>

        <div className="bg-[#f8fcfa] p-4 rounded-lg border border-[#eeeeee] flex flex-col items-center min-h-[300px]">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Distribuição de Alimentos por Origem</h2>
          <div className="w-full h-[300px] flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={foodDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {foodDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Seção 2: Abas de Alimentos e Atribuições */}
      <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
        {/* Abas */}
        <div className="flex border-b border-gray-200 mb-4">
          <button
            className={`py-2 px-4 font-medium text-base ${
              activeTab === "alimentos"
                ? "text-[#f2b84d] border-b-2 border-[#f2b84d]"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("alimentos")}
          >
            Alimentos
          </button>
          <button
            className={`py-2 px-4 font-medium text-base ${
              activeTab === "atribuicoes"
                ? "text-[#f2b84d] border-b-2 border-[#f2b84d]"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("atribuicoes")}
          >
            Atribuições
          </button>
        </div>

        {/* Conteúdo da Aba Alimentos */}
        {activeTab === "alimentos" && (
          <div>
            <div className="flex flex-wrap gap-4 items-end mb-4">
              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Buscar alimentos</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm w-[501px] max-w-full"
                  placeholder="Buscar alimentos..."
                />
              </div>

              <button
                onClick={() => setShowAddFoodModal(true)}
                className="py-2 px-3.5 bg-[#28a745] border-2 border-[#28a745] rounded-lg cursor-pointer font-bold text-white flex items-center gap-2"
              >
                <span>+</span> Adicionar Alimento
              </button>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full border-collapse min-w-[650px] bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-[#f0f0f0]">
                  <tr>
                    <th className="p-3 text-left font-medium text-gray-800 text-base">Nome do Alimento</th>
                    <th className="p-3 text-left font-medium text-gray-800 text-base">Origem</th>
                    <th className="p-3 text-left font-medium text-gray-800 text-base">Benefício</th>
                    <th className="p-3 text-left font-medium text-gray-800 text-base">Estoque</th>
                    <th className="p-3 text-left font-medium text-gray-800 text-base">Frequência</th>
                    <th className="p-3 text-left font-medium text-gray-800 text-base">Horários</th>
                    <th className="p-3 text-left font-medium text-gray-800 text-base">Custo Unitário</th>
                    <th className="p-3 text-left font-medium text-gray-800 text-base">Status</th>
                    <th className="p-3 text-left font-medium text-gray-800 text-base">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {alimentos.map((alimento, index) => (
                    <tr key={alimento.id} className={index % 2 === 0 ? "bg-[#fafafa]" : "bg-white"}>
                      <td className="p-3 text-gray-800 text-base">{alimento.nome}</td>
                      <td className="p-3 text-gray-800 text-base">{alimento.origem}</td>
                      <td className="p-3 text-gray-800 text-base">{alimento.beneficio}</td>
                      <td className="p-3 text-gray-800 text-base">{alimento.estoque}</td>
                      <td className="p-3 text-gray-800 text-base">{alimento.frequencia}</td>
                      <td className="p-3 text-gray-800 text-base">{alimento.horarios}</td>
                      <td className="p-3 text-gray-800 text-base">{alimento.custoUnitario}</td>
                      <td className="p-3 text-base">
                        <span
                          className={`px-2.5 py-1.5 rounded-full text-sm font-bold inline-block ${
                            alimento.status === "Ativo" ? "bg-[#9DFFBE] text-black" : "bg-[#FF9D9F] text-black"
                          }`}
                        >
                          {alimento.status}
                        </span>
                      </td>
                      <td className="p-3 text-base">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit("alimento", alimento.id)}
                            className="bg-[#3b82f6] border-none text-white py-1 px-2 rounded-lg cursor-pointer text-sm font-medium hover:bg-blue-700 transition-colors"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(alimento.id, "alimento")}
                            className="bg-[#ef4444] border-none text-white py-1 px-2 rounded-lg cursor-pointer text-sm font-medium hover:bg-red-700 transition-colors"
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Conteúdo da Aba Atribuições */}
        {activeTab === "atribuicoes" && (
          <div>
            <div className="flex flex-wrap gap-4 items-end mb-4">
              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Filtrar atribuições</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm w-[501px] max-w-full"
                  placeholder="Filtrar atribuições..."
                />
              </div>

              <button
                onClick={() => setShowAddAssignmentModal(true)}
                className="py-2 px-3.5 bg-[#28a745] border-2 border-[#28a745] rounded-lg cursor-pointer font-bold text-white flex items-center gap-2"
              >
                <span>+</span> Nova Atribuição
              </button>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full border-collapse min-w-[650px] bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-[#f0f0f0]">
                  <tr>
                    <th className="p-3 text-left font-medium text-gray-800 text-base">Alimento</th>
                    <th className="p-3 text-left font-medium text-gray-800 text-base">Atribuído a</th>
                    <th className="p-3 text-left font-medium text-gray-800 text-base">Frequência</th>
                    <th className="p-3 text-left font-medium text-gray-800 text-base">Período</th>
                    <th className="p-3 text-left font-medium text-gray-800 text-base">Notas</th>
                    <th className="p-3 text-left font-medium text-gray-800 text-base">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {atribuicoes.map((atribuicao, index) => (
                    <tr key={atribuicao.id} className={index % 2 === 0 ? "bg-[#fafafa]" : "bg-white"}>
                      <td className="p-3 text-gray-800 text-base">{atribuicao.alimento}</td>
                      <td className="p-3 text-gray-800 text-base">{atribuicao.atribuidoA}</td>
                      <td className="p-3 text-gray-800 text-base">{atribuicao.frequencia}</td>
                      <td className="p-3 text-gray-800 text-base">{atribuicao.periodo}</td>
                      <td className="p-3 text-gray-800 text-base">{atribuicao.notas}</td>
                      <td className="p-3 text-base">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit("atribuicao", atribuicao.id)}
                            className="bg-[#3b82f6] border-none text-white py-1 px-2 rounded-lg cursor-pointer text-sm font-medium hover:bg-blue-700 transition-colors"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(atribuicao.id, "atribuicao")}
                            className="bg-[#ef4444] border-none text-white py-1 px-2 rounded-lg cursor-pointer text-sm font-medium hover:bg-red-700 transition-colors"
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-[400px] flex flex-col gap-3 relative">
            <h2 className="text-xl font-bold mb-2 text-gray-800">Confirmar Exclusão</h2>
            <p className="text-gray-700">
              Tem certeza que deseja excluir este {deleteType === "alimento" ? "alimento" : "atribuição"}? Esta ação não
              pode ser desfeita.
            </p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Cancelar
              </button>
              <button className="py-2 px-4 bg-[#ef4444] text-white rounded-lg font-medium" onClick={confirmDelete}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Adicionar Alimento */}
      {showAddFoodModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-[600px] flex flex-col gap-3 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-3 text-2xl bg-transparent border-none cursor-pointer text-gray-700"
              onClick={() => setShowAddFoodModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2 text-gray-800">Adicionar Novo Alimento</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Nome do Alimento</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  placeholder="Nome do alimento"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Origem</label>
                <select className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700">
                  <option value="">Selecione a origem</option>
                  <option value="Produzido na Fazenda">Produzido na Fazenda</option>
                  <option value="Fornecido por Terceiros">Fornecido por Terceiros</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Benefício</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  placeholder="Benefício do alimento"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Estoque</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  placeholder="Quantidade em estoque"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Frequência</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  placeholder="Frequência de uso"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Horários</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  placeholder="Horários de fornecimento"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Custo Unitário</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  placeholder="Custo por unidade"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Status</label>
                <select className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700">
                  <option value="">Selecione o status</option>
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium"
                onClick={() => setShowAddFoodModal(false)}
              >
                Cancelar
              </button>
              <button className="py-2 px-4 bg-[#f2b84d] text-black rounded-lg font-medium hover:bg-[#f39c12] transition-colors">
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Editar Alimento */}
      {showEditFoodModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-[600px] flex flex-col gap-3 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-3 text-2xl bg-transparent border-none cursor-pointer text-gray-700"
              onClick={() => setShowEditFoodModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2 text-gray-800">Editar Alimento</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Nome do Alimento</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  defaultValue="Silagem de Milho"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Origem</label>
                <select
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700"
                  defaultValue="Produzido na Fazenda"
                >
                  <option value="Produzido na Fazenda">Produzido na Fazenda</option>
                  <option value="Fornecido por Terceiros">Fornecido por Terceiros</option>
                </select>
              </div>

              {/* Outros campos preenchidos com valores padrão */}
              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Benefício</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  defaultValue="Alto valor energético"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Estoque</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  defaultValue="2.500 kg"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Frequência</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  defaultValue="Diária"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Horários</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  defaultValue="08:00, 16:00"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Custo Unitário</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  defaultValue="R$ 0,45/kg"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Status</label>
                <select
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700"
                  defaultValue="Ativo"
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium"
                onClick={() => setShowEditFoodModal(false)}
              >
                Cancelar
              </button>
              <button className="py-2 px-4 bg-[#f2b84d] text-black rounded-lg font-medium hover:bg-[#f39c12] transition-colors">
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Adicionar Atribuição */}
      {showAddAssignmentModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-[600px] flex flex-col gap-3 relative">
            <button
              className="absolute top-2 right-3 text-2xl bg-transparent border-none cursor-pointer text-gray-700"
              onClick={() => setShowAddAssignmentModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2 text-gray-800">Nova Atribuição</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Alimento</label>
                <select className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700">
                  <option value="">Selecione o alimento</option>
                  {alimentos.map((alimento) => (
                    <option key={alimento.id} value={alimento.nome}>
                      {alimento.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Atribuído a</label>
                <select className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700">
                  <option value="">Selecione o grupo</option>
                  <option value="Búfalas em Lactação">Búfalas em Lactação</option>
                  <option value="Bezerros">Bezerros</option>
                  <option value="Búfalas Gestantes">Búfalas Gestantes</option>
                  <option value="Todo o Rebanho">Todo o Rebanho</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Frequência</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  placeholder="Frequência de fornecimento"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Período</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  placeholder="Período de fornecimento"
                />
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Notas</label>
                <textarea
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm min-h-[80px]"
                  placeholder="Observações adicionais"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium"
                onClick={() => setShowAddAssignmentModal(false)}
              >
                Cancelar
              </button>
              <button className="py-2 px-4 bg-[#f2b84d] text-black rounded-lg font-medium hover:bg-[#f39c12] transition-colors">
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Editar Atribuição */}
      {showEditAssignmentModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-[600px] flex flex-col gap-3 relative">
            <button
              className="absolute top-2 right-3 text-2xl bg-transparent border-none cursor-pointer text-gray-700"
              onClick={() => setShowEditAssignmentModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2 text-gray-800">Editar Atribuição</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Alimento</label>
                <select
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700"
                  defaultValue="Silagem de Milho"
                >
                  {alimentos.map((alimento) => (
                    <option key={alimento.id} value={alimento.nome}>
                      {alimento.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Atribuído a</label>
                <select
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700"
                  defaultValue="Búfalas em Lactação"
                >
                  <option value="Búfalas em Lactação">Búfalas em Lactação</option>
                  <option value="Bezerros">Bezerros</option>
                  <option value="Búfalas Gestantes">Búfalas Gestantes</option>
                  <option value="Todo o Rebanho">Todo o Rebanho</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Frequência</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  defaultValue="2x ao dia"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Período</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  defaultValue="Todo o ano"
                />
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Notas</label>
                <textarea
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm min-h-[80px]"
                  defaultValue="Fornecer 15kg por animal"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium"
                onClick={() => setShowEditAssignmentModal(false)}
              >
                Cancelar
              </button>
              <button className="py-2 px-4 bg-[#f2b84d] text-black rounded-lg font-medium hover:bg-[#f39c12] transition-colors">
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Add the getLayout function
Alimentacao.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
