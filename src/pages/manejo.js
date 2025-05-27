"use client";

import { useState, useEffect } from "react";
import Layout from "@/layout/Layout";
import {
  fetchManejoStats,
  getStatusColor,
  formatStatus,
  calcularOcupacao,
  getBuffalosDoLote,
  obterPesoAtual,
} from "@/utils/manejoUtil";
import { createLot, updateLot } from "@/services/lotService";

export default function Manejo() {
  // Estados para controlar a exibição dos modais
  const [showNewPiqueteModal, setShowNewPiqueteModal] = useState(false);
  const [showEditPiqueteModal, setShowEditPiqueteModal] = useState(false);
  const [showBuffaloListModal, setShowBuffaloListModal] = useState(false);
  const [showAssignBuffaloModal, setShowAssignBuffaloModal] = useState(false);
  const [showNewCycleModal, setShowNewCycleModal] = useState(false);
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showAllPiquetesModal, setShowAllPiquetesModal] = useState(false); // Novo estado
  const [selectedPiquete, setSelectedPiquete] = useState(null);
  const [deleteType, setDeleteType] = useState("");

  // Estados para dados da API
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [lotes, setLotes] = useState([]);
  const [buffalos, setBuffalos] = useState([]);
  const [propriedades, setPropriedades] = useState([]);

  // Carregar dados da API
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const statsData = await fetchManejoStats();
        setStats(statsData);
        setLotes(statsData.lotes.dados);
        setBuffalos(statsData.buffalos.dados);
        setPropriedades(statsData.propriedades.dados);
      } catch (error) {
        console.error("❌ Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Limitar a 5 piquetes para exibição inicial
  const lotesLimitados = lotes.slice(0, 5);
  const temMaisLotes = lotes.length > 5;

  // Dados mockados para os ciclos (mantendo pois não há API específica)
  const ciclos = [
    {
      id: 1,
      nome: "Ciclo de Lactação 2023/1",
      periodo: "01/01/2023 - 30/06/2023",
      grupo: "Búfalas Lactantes A",
      status: "Em andamento",
      piquete: lotes[0]?.nomeLote || "Lote A",
    },
    {
      id: 2,
      nome: "Ciclo de Gestação 2023/1",
      periodo: "01/02/2023 - 01/11/2023",
      grupo: "Búfalas Gestantes",
      status: "Em andamento",
      piquete: lotes[1]?.nomeLote || "Lote B",
    },
  ];

  // Função para abrir o modal de visualização de búfalos
  const handleViewBuffalos = (lote) => {
    setSelectedPiquete(lote);
    setShowBuffaloListModal(true);
  };

  // Função para abrir o modal de edição de piquete
  const handleEditPiquete = (lote) => {
    setSelectedPiquete(lote);
    setShowEditPiqueteModal(true);
  };

  // Função para confirmar exclusão
  const handleDelete = (id, type) => {
    setDeleteType(type);
    setShowDeleteConfirmation(true);
  };

  // Função para salvar novo lote
  const handleSaveNewLote = async (formData) => {
    try {
      const newLote = await createLot(formData);
      if (newLote) {
        // Recarregar dados
        const statsData = await fetchManejoStats();
        setStats(statsData);
        setLotes(statsData.lotes.dados);
        setShowNewPiqueteModal(false);
      } else {
        throw new Error("Falha ao criar lote");
      }
    } catch (error) {
      console.error("❌ Erro ao criar lote:", error);
      alert("Erro ao criar lote. Tente novamente.");
    }
  };

  // Função para salvar edição de lote
  const handleSaveEditLote = async (formData) => {
    try {
      // Garante que fazenda é string (ID)
      if (Array.isArray(formData.fazenda)) {
        formData.fazenda = formData.fazenda[0];
      }

      const updatedLote = await updateLot(selectedPiquete._id, formData);

      if (updatedLote) {
        const statsData = await fetchManejoStats();
        setStats(statsData);
        setLotes([...statsData.lotes.dados]); // força re-render
        setShowEditPiqueteModal(false);
        setSelectedPiquete(null);
      } else {
        throw new Error("Falha ao atualizar lote");
      }
    } catch (error) {
      console.error("❌ Erro ao atualizar lote:", error);
      alert("Erro ao atualizar lote. Tente novamente.");
    }
  };

  // Componente para renderizar card de piquete
  const PiqueteCard = ({ lote }) => {
    const ocupacao = calcularOcupacao(lote, buffalos);
    return (
      <div
        key={lote._id}
        className="bg-[#f8fcfa] rounded-lg p-4 border border-[#e0e0e0] shadow-sm flex flex-col"
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {lote.nomeLote}
          </h3>
          <span
            className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(
              lote.status
            )}`}
          >
            {formatStatus(lote.status)}
          </span>
        </div>
        <div className="flex-grow">
          <p className="text-sm text-gray-700 mb-1">
            <span className="font-medium">Capacidade:</span>{" "}
            {lote.qtdComporta || 0} búfalos
          </p>
          <p className="text-sm text-gray-700 mb-1">
            <span className="font-medium">Ocupação atual:</span> {ocupacao}{" "}
            búfalos
          </p>
          <p className="text-sm text-gray-700 mb-1">
            <span className="font-medium">Área:</span> {lote.tamanhoArea || 0}{" "}
            {lote.unidadeMedida || "m²"}
          </p>
        </div>
        <div className="flex justify-between mt-4 pt-2 border-t border-gray-200">
          <button
            onClick={() => handleViewBuffalos(lote)}
            className="text-[#3b82f6] text-sm font-medium hover:underline"
          >
            Ver búfalos
          </button>
          <button
            onClick={() => handleEditPiquete(lote)}
            className="text-[#f59e0b] text-sm font-medium hover:underline"
          >
            Editar
          </button>
          
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFCF78] mx-auto mb-4"></div>
          <p className="text-black">Carregando dados de manejo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f5f5f5] p-5 flex flex-col items-center gap-5 box-border">
      {/* Seção: Visão Geral de Piquetes */}
      <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Manejo do Rebanho
            </h1>
            <p className="text-base text-gray-600">
              Gestão de {stats.lotes?.total || 0} lotes,{" "}
              {stats.buffalos?.total || 0} búfalos e{" "}
              {stats.propriedades?.total || 0} propriedades
            </p>
          </div>
          <button
            onClick={() => setShowNewPiqueteModal(true)}
            className="py-2 px-3.5 bg-[#28a745] border-2 border-[#28a745] rounded-lg cursor-pointer font-bold text-white flex items-center gap-2"
          >
            <span>+</span> Criar Novo Lote
          </button>
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Visão Geral de Lotes (Piquetes)
          </h2>
          {temMaisLotes && (
            <button
              onClick={() => setShowAllPiquetesModal(true)}
              className="py-2 px-3.5 bg-[#3b82f6] border-none rounded-lg cursor-pointer font-medium text-white flex items-center gap-2"
            >
              Ver Todos ({lotes.length})
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-2">
          {lotesLimitados.map((lote) => (
            <PiqueteCard key={lote._id} lote={lote} />
          ))}
        </div>

        {temMaisLotes && (
          <div className="text-center mt-4">
            <p className="text-gray-600 text-sm">
              Mostrando 5 de {lotes.length} lotes.{" "}
              <button
                onClick={() => setShowAllPiquetesModal(true)}
                className="text-[#3b82f6] font-medium hover:underline"
              >
                Clique aqui para ver todos
              </button>
            </p>
          </div>
        )}
      </div>

      {/* Seção: Ciclos e Grupos */}
      {/* <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
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
                <th className="p-3 text-left font-medium text-gray-800 text-base">Lote</th>
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
      </div> */}

      {/* Modal: Ver Todos os Piquetes */}
      <AllPiquetesModal
        isOpen={showAllPiquetesModal}
        onClose={() => setShowAllPiquetesModal(false)}
        lotes={lotes}
        buffalos={buffalos}
        onViewBuffalos={handleViewBuffalos}
        onEditPiquete={handleEditPiquete}
        onDelete={handleDelete}
        PiqueteCard={PiqueteCard}
      />

      {/* Modal: Criar Novo Lote */}
      <NewLoteModal
        isOpen={showNewPiqueteModal}
        onClose={() => setShowNewPiqueteModal(false)}
        onSave={handleSaveNewLote}
        propriedades={propriedades}
      />

      {/* Modal: Editar Lote */}
      <EditLoteModal
        isOpen={showEditPiqueteModal}
        onClose={() => setShowEditPiqueteModal(false)}
        onSave={handleSaveEditLote}
        lote={selectedPiquete}
        propriedades={propriedades}
      />

      {/* Modal: Visualizar Búfalos no Lote */}
      <BuffaloListModal
        isOpen={showBuffaloListModal}
        onClose={() => setShowBuffaloListModal(false)}
        lote={selectedPiquete}
        buffalos={getBuffalosDoLote(selectedPiquete, buffalos)}
        onAssignBuffalos={() => {
          setShowBuffaloListModal(false);
          setShowAssignBuffaloModal(true);
        }}
      />

      {/* Modal: Atribuir Búfalos ao Lote */}
      <AssignBuffaloModal
        isOpen={showAssignBuffaloModal}
        onClose={() => setShowAssignBuffaloModal(false)}
        lote={selectedPiquete}
        buffalos={buffalos}
        onBack={() => {
          setShowAssignBuffaloModal(false);
          setShowBuffaloListModal(true);
        }}
      />

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
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              Definir Novo Ciclo
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                  Nome do Ciclo
                </label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  placeholder="Nome do ciclo"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                  Grupo
                </label>
                <select className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700">
                  <option value="">Selecione o grupo</option>
                  <option value="Búfalas Lactantes A">
                    Búfalas Lactantes A
                  </option>
                  <option value="Búfalas Gestantes">Búfalas Gestantes</option>
                  <option value="Bezerros">Bezerros</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                  Data de Início
                </label>
                <input
                  type="date"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                  Data de Término
                </label>
                <input
                  type="date"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                  Lote Vinculado
                </label>
                <select className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700">
                  <option value="">Selecione o lote</option>
                  {lotes.map((lote) => (
                    <option key={lote._id} value={lote.nomeLote}>
                      {lote.nomeLote}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                  Status
                </label>
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
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              Criar Novo Grupo
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                  Nome do Grupo
                </label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  placeholder="Nome do grupo"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                  Objetivo
                </label>
                <input
                  type="text"
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                  placeholder="Objetivo do grupo"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                  Lote Associado
                </label>
                <select className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700">
                  <option value="">Selecione o lote</option>
                  {lotes.map((lote) => (
                    <option key={lote._id} value={lote.nomeLote}>
                      {lote.nomeLote}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                  Descrição
                </label>
                <textarea
                  className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm min-h-[80px]"
                  placeholder="Descrição do grupo"
                ></textarea>
              </div>
            </div>

            <div className="mt-4">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm block">
                Selecionar Búfalos
              </label>
              <div className="border-2 border-[#D9DBDB] rounded-lg p-3 max-h-[200px] overflow-y-auto">
                {buffalos.map((buffalo) => (
                  <div key={buffalo._id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`buffalo-${buffalo._id}`}
                      className="mr-2 w-4 h-4"
                    />
                    <label
                      htmlFor={`buffalo-${buffalo._id}`}
                      className="text-sm text-gray-800"
                    >
                      {buffalo.tag} - {buffalo.nome || "Sem nome"} (
                      {buffalo.sexo})
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

      {/* Modal de Confirmação de Exclusão/Desativação */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-[400px] flex flex-col gap-3 relative">
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              Confirmar Ação
            </h2>
            <p className="text-gray-700">
              Tem certeza que deseja{" "}
              {deleteType === "lote"
                ? "alterar o status deste lote"
                : "alterar o status deste centro de ordenha"}
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
  );
}

// Componente Modal para Ver Todos os Piquetes
function AllPiquetesModal({
  isOpen,
  onClose,
  lotes,
  buffalos,
  onViewBuffalos,
  onEditPiquete,
  onDelete,
  PiqueteCard,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  if (!isOpen) return null;

  // Filtrar lotes baseado na busca e status
  const lotesFiltrados = lotes.filter((lote) => {
    const matchesSearch = lote.nomeLote
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "todos" || lote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999]">
      <div className="bg-white p-6 rounded-lg w-[95%] max-w-[1400px] flex flex-col gap-4 relative max-h-[90vh] overflow-hidden">
        <button
          className="absolute top-2 right-3 text-2xl bg-transparent border-none cursor-pointer text-gray-700 z-10"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Todos os Piquetes ({lotes.length})
          </h2>
        </div>

        {/* Filtros */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar por nome do lote..."
              className="w-full py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="min-w-[200px]">
            <select
              className="w-full py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="todos">Todos os Status</option>
              <option value="Em uso">Em uso</option>
              <option value="Disponível">Disponível</option>
              <option value="Manutenção">Manutenção</option>
            </select>
          </div>
        </div>

        {/* Grid de Piquetes */}
        <div className="flex-1 overflow-y-auto">
          {lotesFiltrados.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Nenhum lote encontrado com os filtros aplicados.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {lotesFiltrados.map((lote) => (
                <PiqueteCard key={lote._id} lote={lote} />
              ))}
            </div>
          )}
        </div>

        {/* Rodapé */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            Mostrando {lotesFiltrados.length} de {lotes.length} lotes
          </p>
          <button
            className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

// Componente Modal para Criar Novo Lote
function NewLoteModal({ isOpen, onClose, onSave, propriedades }) {
  const [formData, setFormData] = useState({
    nomeLote: "",
    tamanhoArea: "",
    unidadeMedida: "m²",
    qtdComporta: "",
    status: "Em uso",
    fazenda: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      tamanhoArea: Number.parseInt(formData.tamanhoArea) || 0,
      qtdComporta: Number.parseInt(formData.qtdComporta) || 0,
    });
    setFormData({
      nomeLote: "",
      tamanhoArea: "",
      unidadeMedida: "m²",
      qtdComporta: "",
      status: "Em uso",
      fazenda: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[99999]">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-[600px] flex flex-col gap-3 relative">
        <button
          className="absolute top-2 right-3 text-2xl bg-transparent border-none cursor-pointer text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-2 text-gray-800">
          Criar Novo Lote
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nome do lote */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Nome do Lote
              </label>
              <input
                type="text"
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                value={formData.nomeLote}
                onChange={(e) =>
                  setFormData({ ...formData, nomeLote: e.target.value })
                }
                required
              />
            </div>

            {/* Capacidade */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Capacidade Máxima
              </label>
              <input
                type="number"
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                value={formData.qtdComporta}
                onChange={(e) =>
                  setFormData({ ...formData, qtdComporta: e.target.value })
                }
                required
              />
            </div>

            {/* Área */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Tamanho da Área
              </label>
              <input
                type="number"
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                value={formData.tamanhoArea}
                onChange={(e) =>
                  setFormData({ ...formData, tamanhoArea: e.target.value })
                }
                required
              />
            </div>

            {/* Unidade */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Unidade de Medida
              </label>
              <select
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700"
                value={formData.unidadeMedida}
                onChange={(e) =>
                  setFormData({ ...formData, unidadeMedida: e.target.value })
                }
              >
                <option value="m²">m²</option>
                <option value="hectares">hectares</option>
                <option value="alqueires">alqueires</option>
              </select>
            </div>

            {/* Fazenda */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Propriedade
              </label>
              <select
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700"
                value={formData.fazenda}
                onChange={(e) =>
                  setFormData({ ...formData, fazenda: e.target.value })
                }
                required
              >
                <option value="">Selecione a propriedade</option>
                {propriedades.map((prop) => (
                  <option key={prop._id} value={prop._id}>
                    {prop.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Status
              </label>
              <select
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="Em uso">Em uso</option>
                <option value="Disponível">Disponível</option>
                <option value="Manutenção">Manutenção</option>
              </select>
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-[#f2b84d] text-black rounded-lg font-medium hover:bg-[#f39c12] transition-colors"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Componente Modal para Editar Lote
function EditLoteModal({ isOpen, onClose, onSave, lote, propriedades }) {
  const [formData, setFormData] = useState({
    nomeLote: "",
    tamanhoArea: "",
    unidadeMedida: "m²",
    qtdComporta: "",
    status: "Em uso",
    fazenda: "",
  });

  useEffect(() => {
    if (lote) {
      setFormData({
        nomeLote: lote.nomeLote || "",
        tamanhoArea: lote.tamanhoArea || "",
        unidadeMedida: lote.unidadeMedida || "m²",
        qtdComporta: lote.qtdComporta || "",
        status: lote.status || "Em uso",
        fazenda: lote.fazenda || "",
      });
    }
  }, [lote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      tamanhoArea: Number.parseInt(formData.tamanhoArea) || 0,
      qtdComporta: Number.parseInt(formData.qtdComporta) || 0,
    });
  };

  if (!isOpen || !lote) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[99999]">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-[600px] flex flex-col gap-3 relative">
        <button
          className="absolute top-2 right-3 text-2xl bg-transparent border-none cursor-pointer text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-2 text-gray-800">Editar Lote</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Nome do Lote
              </label>
              <input
                type="text"
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                value={formData.nomeLote}
                onChange={(e) =>
                  setFormData({ ...formData, nomeLote: e.target.value })
                }
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Capacidade Máxima
              </label>
              <input
                type="number"
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                value={formData.qtdComporta}
                onChange={(e) =>
                  setFormData({ ...formData, qtdComporta: e.target.value })
                }
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Tamanho da Área
              </label>
              <input
                type="number"
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                value={formData.tamanhoArea}
                onChange={(e) =>
                  setFormData({ ...formData, tamanhoArea: e.target.value })
                }
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Unidade de Medida
              </label>
              <select
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700"
                value={formData.unidadeMedida}
                onChange={(e) =>
                  setFormData({ ...formData, unidadeMedida: e.target.value })
                }
              >
                <option value="m²">m²</option>
                <option value="hectares">hectares</option>
                <option value="alqueires">alqueires</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Propriedade
              </label>
              <select
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700"
                value={formData.fazenda}
                onChange={(e) =>
                  setFormData({ ...formData, fazenda: e.target.value })
                }
                required
              >
                <option value="">Selecione a propriedade</option>
                {propriedades.map((prop) => (
                  <option key={prop._id} value={prop._id}>
                    {prop.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Status
              </label>
              <select
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="Em uso">Em uso</option>
                <option value="Disponível">Disponível</option>
                <option value="Manutenção">Manutenção</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-[#f2b84d] text-black rounded-lg font-medium hover:bg-[#f39c12] transition-colors"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Componente Modal para Visualizar Búfalos no Lote
function BuffaloListModal({
  isOpen,
  onClose,
  lote,
  buffalos,
  onAssignBuffalos,
}) {
  if (!isOpen || !lote) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999]">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-[800px] flex flex-col gap-3 relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-2 right-3 text-2xl bg-transparent border-none cursor-pointer text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-2 text-gray-800">
          Búfalos no {lote.nomeLote} ({buffalos.length}/{lote.qtdComporta})
        </h2>

        <div className="flex justify-end mb-4">
          <button
            onClick={onAssignBuffalos}
            className="py-2 px-3.5 bg-[#3b82f6] border-none rounded-lg cursor-pointer font-medium text-white"
          >
            Atribuir Búfalos
          </button>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse min-w-[650px] bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-[#f0f0f0]">
              <tr>
                <th className="p-3 text-left font-medium text-gray-800 text-base">
                  TAG
                </th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">
                  Nome
                </th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">
                  Sexo
                </th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">
                  Maturidade
                </th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">
                  Peso
                </th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {buffalos.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    Nenhum búfalo encontrado neste lote
                  </td>
                </tr>
              ) : (
                buffalos.map((buffalo, index) => (
                  <tr
                    key={buffalo._id}
                    className={index % 2 === 0 ? "bg-[#fafafa]" : "bg-white"}
                  >
                    <td className="p-3 text-gray-800 text-base">
                      {buffalo.tag}
                    </td>
                    <td className="p-3 text-gray-800 text-base">
                      {buffalo.nome || "Sem nome"}
                    </td>
                    <td className="p-3 text-gray-800 text-base">
                      {buffalo.sexo}
                    </td>
                    <td className="p-3 text-gray-800 text-base">
                      {buffalo.maturidade}
                    </td>
                    <td className="p-3 text-gray-800 text-base">
                      {obterPesoAtual(buffalo)}
                    </td>
                    <td className="p-3 text-base">
                      <button className="text-[#ef4444] text-sm font-medium hover:underline">
                        Remover
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

// Componente Modal para Atribuir Búfalos ao Lote
function AssignBuffaloModal({ isOpen, onClose, lote, buffalos, onBack }) {
  const [selectedBuffalos, setSelectedBuffalos] = useState([]);

  const handleBuffaloSelect = (buffaloId) => {
    setSelectedBuffalos((prev) =>
      prev.includes(buffaloId)
        ? prev.filter((id) => id !== buffaloId)
        : [...prev, buffaloId]
    );
  };

  const handleSelectAll = () => {
    if (selectedBuffalos.length === buffalos.length) {
      setSelectedBuffalos([]);
    } else {
      setSelectedBuffalos(buffalos.map((b) => b._id));
    }
  };

  if (!isOpen || !lote) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-[800px] flex flex-col gap-3 relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-2 right-3 text-2xl bg-transparent border-none cursor-pointer text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-2 text-gray-800">
          Atribuir Búfalos ao {lote.nomeLote}
        </h2>
        <p className="text-gray-700 mb-4">
          Selecione os búfalos que deseja atribuir a este lote. Capacidade
          disponível: {lote.qtdComporta - calcularOcupacao(lote, buffalos)}{" "}
          búfalos.
        </p>

        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse min-w-[650px] bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-[#f0f0f0]">
              <tr>
                <th className="p-3 text-left font-medium text-gray-800 text-base w-16">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={
                      selectedBuffalos.length === buffalos.length &&
                      buffalos.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">
                  TAG
                </th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">
                  Nome
                </th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">
                  Sexo
                </th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">
                  Maturidade
                </th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">
                  Peso
                </th>
              </tr>
            </thead>
            <tbody>
              {buffalos.map((buffalo, index) => (
                <tr
                  key={buffalo._id}
                  className={index % 2 === 0 ? "bg-[#fafafa]" : "bg-white"}
                >
                  <td className="p-3 text-gray-800 text-base">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={selectedBuffalos.includes(buffalo._id)}
                      onChange={() => handleBuffaloSelect(buffalo._id)}
                    />
                  </td>
                  <td className="p-3 text-gray-800 text-base">{buffalo.tag}</td>
                  <td className="p-3 text-gray-800 text-base">
                    {buffalo.nome || "Sem nome"}
                  </td>
                  <td className="p-3 text-gray-800 text-base">
                    {buffalo.sexo}
                  </td>
                  <td className="p-3 text-gray-800 text-base">
                    {buffalo.maturidade}
                  </td>
                  <td className="p-3 text-gray-800 text-base">
                    {obterPesoAtual(buffalo)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="py-2 px-4 bg-[#3b82f6] text-white rounded-lg font-medium hover:bg-[#2563eb] transition-colors"
            onClick={onBack}
          >
            Voltar
          </button>
          <button
            className="py-2 px-4 bg-[#f2b84d] text-black rounded-lg font-medium hover:bg-[#f39c12] transition-colors"
            onClick={() => {
              // Aqui você implementaria a lógica para atribuir os búfalos selecionados
              console.log("Búfalos selecionados:", selectedBuffalos);
              onBack();
            }}
          >
            Atribuir Selecionados ({selectedBuffalos.length})
          </button>
        </div>
      </div>
    </div>
  );
}

Manejo.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
