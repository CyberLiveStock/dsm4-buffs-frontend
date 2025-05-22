"use client"

import { useState } from "react"
import Layout from "@/layout/Layout"

export default function Manejo() {
  // Estados para controlar a exibição dos modais
  const [showNewPiqueteModal, setShowNewPiqueteModal] = useState(false)
  const [showEditPiqueteModal, setShowEditPiqueteModal] = useState(false)
  const [showBuffaloListModal, setShowBuffaloListModal] = useState(false)
  const [showAssignBuffaloModal, setShowAssignBuffaloModal] = useState(false)
  const [showNewCycleModal, setShowNewCycleModal] = useState(false)
  const [showNewGroupModal, setShowNewGroupModal] = useState(false)
  const [showNewCenterModal, setShowNewCenterModal] = useState(false)
  const [showEditCenterModal, setShowEditCenterModal] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [selectedPiquete, setSelectedPiquete] = useState(null)
  const [selectedCenter, setSelectedCenter] = useState(null)
  const [deleteType, setDeleteType] = useState("")

  // Dados mockados para os piquetes
  const piquetes = [
    {
      id: 1,
      nome: "Piquete A",
      capacidade: 30,
      quantidade: 25,
      status: "Ativo",
      localizacao: "Setor Norte",
      observacoes: "Próximo ao rio, área de sombra natural",
    },
    {
      id: 2,
      nome: "Piquete B",
      capacidade: 25,
      quantidade: 20,
      status: "Ativo",
      localizacao: "Setor Leste",
      observacoes: "Área com bebedouros automáticos",
    },
    {
      id: 3,
      nome: "Piquete C",
      capacidade: 40,
      quantidade: 35,
      status: "Ativo",
      localizacao: "Setor Sul",
      observacoes: "Área de pastagem renovada",
    },
    {
      id: 4,
      nome: "Piquete D",
      capacidade: 20,
      quantidade: 0,
      status: "Inativo",
      localizacao: "Setor Oeste",
      observacoes: "Em manutenção para renovação de pastagem",
    },
  ]

  // Dados mockados para os búfalos
  const bufalos = [
    { id: 1, tag: "BF001", nome: "Aurora", sexo: "Fêmea", idade: "4 anos", peso: "650 kg" },
    { id: 2, tag: "BF002", nome: "Beleza", sexo: "Fêmea", idade: "3 anos", peso: "580 kg" },
    { id: 3, tag: "BF003", nome: "Trovão", sexo: "Macho", idade: "5 anos", peso: "820 kg" },
    { id: 4, tag: "BF004", nome: "Luna", sexo: "Fêmea", idade: "2 anos", peso: "520 kg" },
    { id: 5, tag: "BF005", nome: "Estrela", sexo: "Fêmea", idade: "3 anos", peso: "590 kg" },
  ]

  // Dados mockados para os ciclos
  const ciclos = [
    {
      id: 1,
      nome: "Ciclo de Lactação 2023/1",
      periodo: "01/01/2023 - 30/06/2023",
      grupo: "Búfalas Lactantes A",
      status: "Em andamento",
      piquete: "Piquete A",
    },
    {
      id: 2,
      nome: "Ciclo de Gestação 2023/1",
      periodo: "01/02/2023 - 01/11/2023",
      grupo: "Búfalas Gestantes",
      status: "Em andamento",
      piquete: "Piquete B",
    },
    {
      id: 3,
      nome: "Ciclo de Desmame 2023/1",
      periodo: "01/03/2023 - 01/06/2023",
      grupo: "Bezerros",
      status: "Concluído",
      piquete: "Piquete C",
    },
  ]

  // Dados mockados para os centros de ordenha
  const centrosOrdenha = [
    {
      id: 1,
      nome: "Centro de Ordenha Principal",
      capacidade: "50 búfalas/dia",
      status: "Ativo",
      equipamentos: "Ordenhadeira automática, tanque de resfriamento",
    },
    {
      id: 2,
      nome: "Centro de Ordenha Secundário",
      capacidade: "30 búfalas/dia",
      status: "Ativo",
      equipamentos: "Ordenhadeira semi-automática",
    },
    {
      id: 3,
      nome: "Centro de Ordenha Móvel",
      capacidade: "15 búfalas/dia",
      status: "Inativo",
      equipamentos: "Ordenhadeira portátil",
    },
  ]

  // Função para abrir o modal de visualização de búfalos
  const handleViewBuffalos = (piquete) => {
    setSelectedPiquete(piquete)
    setShowBuffaloListModal(true)
  }

  // Função para abrir o modal de edição de piquete
  const handleEditPiquete = (piquete) => {
    setSelectedPiquete(piquete)
    setShowEditPiqueteModal(true)
  }

  // Função para abrir o modal de edição de centro de ordenha
  const handleEditCenter = (center) => {
    setSelectedCenter(center)
    setShowEditCenterModal(true)
  }

  // Função para confirmar exclusão
  const handleDelete = (id, type) => {
    setDeleteType(type)
    setShowDeleteConfirmation(true)
  }

  return (
    <div className="w-full bg-[#f5f5f5] p-5 flex flex-col items-center gap-5 box-border">
      {/* Seção: Visão Geral de Piquetes */}
      <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Manejo do Rebanho</h1>
            <p className="text-base text-gray-700">Gestão de piquetes, ciclos e centros de ordenha</p>
          </div>
          <button
            onClick={() => setShowNewPiqueteModal(true)}
            className="py-2 px-3.5 bg-[#28a745] border-2 border-[#28a745] rounded-lg cursor-pointer font-bold text-white flex items-center gap-2"
          >
            <span>+</span> Criar Novo Piquete
          </button>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mt-2">Visão Geral de Piquetes</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          {piquetes.map((piquete) => (
            <div
              key={piquete.id}
              className="bg-[#f8fcfa] rounded-lg p-4 border border-[#e0e0e0] shadow-sm flex flex-col"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{piquete.nome}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-bold ${
                    piquete.status === "Ativo" ? "bg-[#9DFFBE] text-black" : "bg-[#FF9D9F] text-black"
                  }`}
                >
                  {piquete.status}
                </span>
              </div>
              <div className="flex-grow">
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Capacidade:</span> {piquete.capacidade} búfalos
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Ocupação atual:</span> {piquete.quantidade} búfalos
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Localização:</span> {piquete.localizacao}
                </p>
              </div>
              <div className="flex justify-between mt-4 pt-2 border-t border-gray-200">
                <button
                  onClick={() => handleViewBuffalos(piquete)}
                  className="text-[#3b82f6] text-sm font-medium hover:underline"
                >
                  Ver búfalos
                </button>
                <button
                  onClick={() => handleEditPiquete(piquete)}
                  className="text-[#f59e0b] text-sm font-medium hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(piquete.id, "piquete")}
                  className="text-[#ef4444] text-sm font-medium hover:underline"
                >
                  {piquete.status === "Ativo" ? "Desativar" : "Ativar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seção: Ciclos e Grupos */}
      <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-800">Ciclos e Grupos</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowNewCycleModal(true)}
              className="py-2 px-3.5 bg-[#f2b84d] border-none rounded-lg cursor-pointer font-bold text-black flex items-center gap-2"
            >
              Definir Novo Ciclo
            </button>
            <button
              onClick={() => setShowNewGroupModal(true)}
              className="py-2 px-3.5 bg-[#3b82f6] border-none rounded-lg cursor-pointer font-bold text-white flex items-center gap-2"
            >
              Criar Novo Grupo
            </button>
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse min-w-[650px] bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-[#f0f0f0]">
              <tr>
                <th className="p-3 text-left font-medium text-gray-800 text-base">Nome do Ciclo</th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">Período</th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">Grupo</th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">Piquete</th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">Status</th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">Ações</th>
              </tr>
            </thead>
            <tbody>
              {ciclos.map((ciclo, index) => (
                <tr key={ciclo.id} className={index % 2 === 0 ? "bg-[#fafafa]" : "bg-white"}>
                  <td className="p-3 text-gray-800 text-base">{ciclo.nome}</td>
                  <td className="p-3 text-gray-800 text-base">{ciclo.periodo}</td>
                  <td className="p-3 text-gray-800 text-base">{ciclo.grupo}</td>
                  <td className="p-3 text-gray-800 text-base">{ciclo.piquete}</td>
                  <td className="p-3 text-base">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold inline-block ${
                        ciclo.status === "Em andamento"
                          ? "bg-[#9DFFBE] text-black"
                          : ciclo.status === "Concluído"
                            ? "bg-[#3b82f6] text-white"
                            : "bg-[#f59e0b] text-black"
                      }`}
                    >
                      {ciclo.status}
                    </span>
                  </td>
                  <td className="p-3 text-base">
                    <div className="flex gap-2">
                      <button className="text-[#3b82f6] text-sm font-medium hover:underline">Editar</button>
                      <button className="text-[#ef4444] text-sm font-medium hover:underline">Encerrar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Seção: Centro de Ordenha */}
      <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-800">Centro de Ordenha</h2>
          <button
            onClick={() => setShowNewCenterModal(true)}
            className="py-2 px-3.5 bg-[#28a745] border-2 border-[#28a745] rounded-lg cursor-pointer font-bold text-white flex items-center gap-2"
          >
            <span>+</span> Cadastrar Novo Centro
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
          {centrosOrdenha.map((centro) => (
            <div
              key={centro.id}
              className="bg-[#f8fcfa] rounded-lg p-4 border border-[#e0e0e0] shadow-sm flex flex-col"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{centro.nome}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-bold ${
                    centro.status === "Ativo" ? "bg-[#9DFFBE] text-black" : "bg-[#FF9D9F] text-black"
                  }`}
                >
                  {centro.status}
                </span>
              </div>
              <div className="flex-grow">
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Capacidade:</span> {centro.capacidade}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Equipamentos:</span> {centro.equipamentos}
                </p>
              </div>
              <div className="flex justify-between mt-4 pt-2 border-t border-gray-200">
                <button className="text-[#3b82f6] text-sm font-medium hover:underline">Ver detalhes</button>
                <button
                  onClick={() => handleEditCenter(centro)}
                  className="text-[#f59e0b] text-sm font-medium hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(centro.id, "centro")}
                  className="text-[#ef4444] text-sm font-medium hover:underline"
                >
                  {centro.status === "Ativo" ? "Desativar" : "Ativar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Criar Novo Piquete */}
      {showNewPiqueteModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-[600px] flex flex-col gap-3 relative">
            <button
              className="absolute top-2 right-3 text-2xl bg-transparent border-none cursor-pointer text-gray-700"
              onClick={() => setShowNewPiqueteModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2 text-gray-800">Criar Novo Piquete</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Nome do Piquete</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  placeholder="Nome do piquete"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Capacidade Máxima</label>
                <input
                  type="number"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  placeholder="Número de búfalos"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Localização</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  placeholder="Localização do piquete"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Status</label>
                <select className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700">
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Observações</label>
                <textarea
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm min-h-[80px]"
                  placeholder="Observações sobre o piquete"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium"
                onClick={() => setShowNewPiqueteModal(false)}
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

      {/* Modal: Editar Piquete */}
      {showEditPiqueteModal && selectedPiquete && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-[600px] flex flex-col gap-3 relative">
            <button
              className="absolute top-2 right-3 text-2xl bg-transparent border-none cursor-pointer text-gray-700"
              onClick={() => setShowEditPiqueteModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2 text-gray-800">Editar Piquete</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Nome do Piquete</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  defaultValue={selectedPiquete.nome}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Capacidade Máxima</label>
                <input
                  type="number"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  defaultValue={selectedPiquete.capacidade}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Localização</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  defaultValue={selectedPiquete.localizacao}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Status</label>
                <select
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700"
                  defaultValue={selectedPiquete.status}
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Observações</label>
                <textarea
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm min-h-[80px]"
                  defaultValue={selectedPiquete.observacoes}
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium"
                onClick={() => setShowEditPiqueteModal(false)}
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

      {/* Modal: Visualizar Búfalos no Piquete */}
      {showBuffaloListModal && selectedPiquete && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-[800px] flex flex-col gap-3 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-3 text-2xl bg-transparent border-none cursor-pointer text-gray-700"
              onClick={() => setShowBuffaloListModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              Búfalos no {selectedPiquete.nome} ({selectedPiquete.quantidade}/{selectedPiquete.capacidade})
            </h2>

            <div className="flex justify-end mb-4">
              <button
                onClick={() => {
                  setShowBuffaloListModal(false)
                  setShowAssignBuffaloModal(true)
                }}
                className="py-2 px-3.5 bg-[#3b82f6] border-none rounded-lg cursor-pointer font-medium text-white"
              >
                Atribuir Búfalos
              </button>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full border-collapse min-w-[650px] bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-[#f0f0f0]">
                  <tr>
                    <th className="p-3 text-left font-medium text-gray-800 text-base">TAG</th>
                    <th className="p-3 text-left font-medium text-gray-800 text-base">Nome</th>
                    <th className="p-3 text-left font-medium text-gray-800 text-base">Sexo</th>
                    <th className="p-3 text-left font-medium text-gray-800 text-base">Idade</th>
                    <th className="p-3 text-left font-medium text-gray-800 text-base">Peso</th>
                    <th className="p-3 text-left font-medium text-gray-800 text-base">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {bufalos.slice(0, selectedPiquete.quantidade).map((bufalo, index) => (
                    <tr key={bufalo.id} className={index % 2 === 0 ? "bg-[#fafafa]" : "bg-white"}>
                      <td className="p-3 text-gray-800 text-base">{bufalo.tag}</td>
                      <td className="p-3 text-gray-800 text-base">{bufalo.nome}</td>
                      <td className="p-3 text-gray-800 text-base">{bufalo.sexo}</td>
                      <td className="p-3 text-gray-800 text-base">{bufalo.idade}</td>
                      <td className="p-3 text-gray-800 text-base">{bufalo.peso}</td>
                      <td className="p-3 text-base">
                        <button className="text-[#ef4444] text-sm font-medium hover:underline">Remover</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium"
                onClick={() => setShowBuffaloListModal(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Atribuir Búfalos ao Piquete */}
      {showAssignBuffaloModal && selectedPiquete && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-[800px] flex flex-col gap-3 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-3 text-2xl bg-transparent border-none cursor-pointer text-gray-700"
              onClick={() => setShowAssignBuffaloModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2 text-gray-800">Atribuir Búfalos ao {selectedPiquete.nome}</h2>
            <p className="text-gray-700 mb-4">
              Selecione os búfalos que deseja atribuir a este piquete. Capacidade disponível:{" "}
              {selectedPiquete.capacidade - selectedPiquete.quantidade} búfalos.
            </p>

            <div className="overflow-x-auto w-full">
              <table className="w-full border-collapse min-w-[650px] bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-[#f0f0f0]">
                  <tr>
                    <th className="p-3 text-left font-medium text-gray-800 text-base w-16">
                      <input type="checkbox" className="w-4 h-4" />
                    </th>
                    <th className="p-3 text-left font-medium text-gray-800 text-base">TAG</th>
                    <th className="p-3 text-left font-medium text-gray-800 text-base">Nome</th>
                    <th className="p-3 text-left font-medium text-gray-800 text-base">Sexo</th>
                    <th className="p-3 text-left font-medium text-gray-800 text-base">Idade</th>
                    <th className="p-3 text-left font-medium text-gray-800 text-base">Peso</th>
                  </tr>
                </thead>
                <tbody>
                  {bufalos.map((bufalo, index) => (
                    <tr key={bufalo.id} className={index % 2 === 0 ? "bg-[#fafafa]" : "bg-white"}>
                      <td className="p-3 text-gray-800 text-base">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>
                      <td className="p-3 text-gray-800 text-base">{bufalo.tag}</td>
                      <td className="p-3 text-gray-800 text-base">{bufalo.nome}</td>
                      <td className="p-3 text-gray-800 text-base">{bufalo.sexo}</td>
                      <td className="p-3 text-gray-800 text-base">{bufalo.idade}</td>
                      <td className="p-3 text-gray-800 text-base">{bufalo.peso}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium"
                onClick={() => setShowAssignBuffaloModal(false)}
              >
                Cancelar
              </button>
              <button
                className="py-2 px-4 bg-[#f2b84d] text-black rounded-lg font-medium hover:bg-[#f39c12] transition-colors"
                onClick={() => {
                  setShowAssignBuffaloModal(false)
                  setShowBuffaloListModal(true)
                }}
              >
                Atribuir Selecionados
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Definir Novo Ciclo */}
      {showNewCycleModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-[600px] flex flex-col gap-3 relative">
            <button
              className="absolute top-2 right-3 text-2xl bg-transparent border-none cursor-pointer text-gray-700"
              onClick={() => setShowNewCycleModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2 text-gray-800">Definir Novo Ciclo</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Nome do Ciclo</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  placeholder="Nome do ciclo"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Grupo</label>
                <select className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700">
                  <option value="">Selecione o grupo</option>
                  <option value="Búfalas Lactantes A">Búfalas Lactantes A</option>
                  <option value="Búfalas Gestantes">Búfalas Gestantes</option>
                  <option value="Bezerros">Bezerros</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Data de Início</label>
                <input type="date" className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm" />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Data de Término</label>
                <input type="date" className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm" />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Piquete Vinculado</label>
                <select className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700">
                  <option value="">Selecione o piquete</option>
                  {piquetes.map((piquete) => (
                    <option key={piquete.id} value={piquete.nome}>
                      {piquete.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Status</label>
                <select className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700">
                  <option value="Em andamento">Em andamento</option>
                  <option value="Planejado">Planejado</option>
                  <option value="Concluído">Concluído</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium"
                onClick={() => setShowNewCycleModal(false)}
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

      {/* Modal: Criar Novo Grupo */}
      {showNewGroupModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-[600px] flex flex-col gap-3 relative">
            <button
              className="absolute top-2 right-3 text-2xl bg-transparent border-none cursor-pointer text-gray-700"
              onClick={() => setShowNewGroupModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2 text-gray-800">Criar Novo Grupo</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Nome do Grupo</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  placeholder="Nome do grupo"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Objetivo</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  placeholder="Objetivo do grupo"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Piquete Associado</label>
                <select className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700">
                  <option value="">Selecione o piquete</option>
                  {piquetes.map((piquete) => (
                    <option key={piquete.id} value={piquete.nome}>
                      {piquete.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Descrição</label>
                <textarea
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm min-h-[80px]"
                  placeholder="Descrição do grupo"
                ></textarea>
              </div>
            </div>

            <div className="mt-4">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm block">Selecionar Búfalos</label>
              <div className="border-2 border-[#D9DBDB] rounded-lg p-3 max-h-[200px] overflow-y-auto">
                {bufalos.map((bufalo) => (
                  <div key={bufalo.id} className="flex items-center mb-2">
                    <input type="checkbox" id={`bufalo-${bufalo.id}`} className="mr-2 w-4 h-4" />
                    <label htmlFor={`bufalo-${bufalo.id}`} className="text-sm text-gray-800">
                      {bufalo.tag} - {bufalo.nome} ({bufalo.sexo})
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium"
                onClick={() => setShowNewGroupModal(false)}
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

      {/* Modal: Cadastrar Novo Centro de Ordenha */}
      {showNewCenterModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-[600px] flex flex-col gap-3 relative">
            <button
              className="absolute top-2 right-3 text-2xl bg-transparent border-none cursor-pointer text-gray-700"
              onClick={() => setShowNewCenterModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2 text-gray-800">Cadastrar Novo Centro de Ordenha</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Nome do Centro</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  placeholder="Nome do centro"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Capacidade Diária</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  placeholder="Capacidade diária"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Status</label>
                <select className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700">
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Equipamentos</label>
                <textarea
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm min-h-[80px]"
                  placeholder="Equipamentos disponíveis"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium"
                onClick={() => setShowNewCenterModal(false)}
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

      {/* Modal: Editar Centro de Ordenha */}
      {showEditCenterModal && selectedCenter && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-[600px] flex flex-col gap-3 relative">
            <button
              className="absolute top-2 right-3 text-2xl bg-transparent border-none cursor-pointer text-gray-700"
              onClick={() => setShowEditCenterModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2 text-gray-800">Editar Centro de Ordenha</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Nome do Centro</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  defaultValue={selectedCenter.nome}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Capacidade Diária</label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  defaultValue={selectedCenter.capacidade}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Status</label>
                <select
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700"
                  defaultValue={selectedCenter.status}
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">Equipamentos</label>
                <textarea
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm min-h-[80px]"
                  defaultValue={selectedCenter.equipamentos}
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium"
                onClick={() => setShowEditCenterModal(false)}
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

      {/* Modal de Confirmação de Exclusão/Desativação */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-[400px] flex flex-col gap-3 relative">
            <h2 className="text-xl font-bold mb-2 text-gray-800">Confirmar Ação</h2>
            <p className="text-gray-700">
              Tem certeza que deseja{" "}
              {deleteType === "piquete" ? "alterar o status deste piquete" : "alterar o status deste centro de ordenha"}
              ? Esta ação pode afetar os registros associados.
            </p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Cancelar
              </button>
              <button
                className="py-2 px-4 bg-[#ef4444] text-white rounded-lg font-medium"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

Manejo.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
