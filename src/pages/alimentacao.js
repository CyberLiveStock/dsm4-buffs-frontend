"use client";

import { useState, useEffect } from "react";
import Layout from "@/layout/Layout";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import {
  getAllFeedings,
  createFeeding,
  updateFeeding,
  deleteFeeding,
} from "@/services/feedingService";
import { fetchFeedingStats } from "@/utils/feedingUtil";

export default function Alimentacao() {
  const [activeTab, setActiveTab] = useState("alimentos");
  const [showAddFoodModal, setShowAddFoodModal] = useState(false);
  const [showEditFoodModal, setShowEditFoodModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Estados para dados da API
  const [feedings, setFeedings] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedFeeding, setSelectedFeeding] = useState(null);

  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("todos");

  const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#ef4444", "#8b5cf6"];

  // Carregar dados da API
  useEffect(() => {
    loadFeedingData();
  }, []);

  const loadFeedingData = async () => {
    try {
      setLoading(true);

      // Carregar dados das alimentações
      const feedingsData = await getAllFeedings();
      console.log("📦 Dados recebidos da API:", feedingsData);

      // Garantir que feedingsData seja sempre um array
      let feedingsArray = [];
      if (Array.isArray(feedingsData)) {
        feedingsArray = feedingsData;
      } else if (feedingsData && Array.isArray(feedingsData.feedings)) {
        feedingsArray = feedingsData.feedings;
      } else if (feedingsData && typeof feedingsData === "object") {
        // Se for um objeto único, transformar em array
        feedingsArray = [feedingsData];
      }

      setFeedings(feedingsArray);

      const statsData = await fetchFeedingStats();
      setStats(statsData);

      console.log("✅ Alimentações carregadas:", feedingsArray.length);
    } catch (error) {
      console.error("❌ Erro ao carregar dados de alimentação:", error);
      setFeedings([]); // Garantir que seja array vazio em caso de erro
      setStats({});
    } finally {
      setLoading(false);
    }
  };

  const chartData = Object.entries(stats.tipoCounts || {}).map(
    ([tipo, count]) => ({
      name: tipo || "Não informado",
      value: count,
    })
  );

  const filteredFeedings = Array.isArray(feedings)
    ? feedings.filter((feeding) => {
        const matchesSearch =
          feeding.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          false;
        const matchesType =
          typeFilter === "todos" || feeding.tpAlimentacao === typeFilter;
        return matchesSearch && matchesType;
      })
    : [];

  const uniqueTypes = Array.isArray(feedings)
    ? [...new Set(feedings.map((f) => f.tpAlimentacao).filter(Boolean))]
    : [];

  const handleDelete = (feeding) => {
    setItemToDelete(feeding);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      const success = await deleteFeeding(itemToDelete._id);
      if (success) {
        await loadFeedingData();
        setShowDeleteConfirmation(false);
        setItemToDelete(null);
        console.log("✅ Alimentação deletada com sucesso");
      } else {
        alert("Erro ao deletar alimentação");
      }
    } catch (error) {
      console.error("❌ Erro ao deletar:", error);
      alert("Erro ao deletar alimentação");
    }
  };

  const handleEdit = (feeding) => {
    setSelectedFeeding(feeding);
    setShowEditFoodModal(true);
  };

  const handleSaveNew = async (formData) => {
    try {
      console.log("📤 Dados do formulário recebidos:", formData);

      if (
        !formData.nome ||
        !formData.tpAlimentacao ||
        !formData.unidadeMedida ||
        !formData.grupoDestinado
      ) {
        alert("Por favor, preencha todos os campos obrigatórios");
        return;
      }

      if (!formData.quantidade || Number(formData.quantidade) <= 0) {
        alert("Quantidade deve ser maior que zero");
        return;
      }

      const result = await createFeeding(formData);
      console.log("📥 Resultado da criação:", result);

      if (result && result.success) {
        await loadFeedingData();
        setShowAddFoodModal(false);
        console.log("✅ Alimentação criada com sucesso");
        alert("Alimentação criada com sucesso!");
      } else {
        console.error("❌ Falha na criação:", result);
        alert(
          `Erro ao criar alimentação: ${result?.message || "Erro desconhecido"}`
        );
      }
    } catch (error) {
      console.error("❌ Erro ao criar alimentação:", error);
      alert(`Erro ao criar alimentação: ${error.message || "Erro de conexão"}`);
    }
  };

  const handleSaveEdit = async (formData) => {
    try {
      const success = await updateFeeding(selectedFeeding._id, formData);
      if (success) {
        await loadFeedingData();
        setShowEditFoodModal(false);
        setSelectedFeeding(null);
        console.log("✅ Alimentação atualizada com sucesso");
      } else {
        alert("Erro ao atualizar alimentação");
      }
    } catch (error) {
      console.error("❌ Erro ao atualizar:", error);
      alert("Erro ao atualizar alimentação");
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFCF78] mx-auto mb-4"></div>
          <p className="text-black">Carregando dados de alimentação...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f5f5f5] p-5 flex flex-col items-center gap-5 box-border">
      <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Alimentação do Rebanho
          </h1>
          <p className="text-base text-gray-600 mb-4">
            Gestão de {Array.isArray(feedings) ? feedings.length : 0}{" "}
            alimentações cadastradas
          </p>
        </div>

        <div className="bg-[#f8fcfa] p-4 rounded-lg border border-[#eeeeee] flex flex-col items-center min-h-[300px]">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Distribuição por Tipo de Alimentação
          </h2>
          <div className="w-full h-[300px] flex justify-center items-center">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} alimentações`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-gray-500">
                <p>Nenhum dado disponível para exibir</p>
                <p className="text-sm">
                  Cadastre alimentações para visualizar o gráfico
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-[#f8fcfa] p-4 rounded-lg border border-[#e0e0e0]">
            <h3 className="text-lg font-semibold text-gray-800">
              Total de Alimentações
            </h3>
            <p className="text-2xl font-bold text-[#f59e0b]">
              {Array.isArray(feedings) ? feedings.length : 0}
            </p>
          </div>
          <div className="bg-[#f8fcfa] p-4 rounded-lg border border-[#e0e0e0]">
            <h3 className="text-lg font-semibold text-gray-800">
              Média de Quantidade
            </h3>
            <p className="text-2xl font-bold text-[#3b82f6]">
              {stats.mediaQuantidade ? stats.mediaQuantidade.toFixed(1) : 0}
            </p>
          </div>
          <div className="bg-[#f8fcfa] p-4 rounded-lg border border-[#e0e0e0]">
            <h3 className="text-lg font-semibold text-gray-800">
              Tipos Diferentes
            </h3>
            <p className="text-2xl font-bold text-[#10b981]">
              {Object.keys(stats.tipoCounts || {}).length}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800">
          Alimentações Cadastradas
        </h2>

        <div className="flex flex-wrap gap-4 items-end mb-4">
          <div className="flex flex-col">
            <label className="font-semibold mb-1.5 text-gray-700 text-sm">
              Buscar alimentações
            </label>
            <input
              type="text"
              className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm w-[300px] max-w-full"
              placeholder="Buscar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1.5 text-gray-700 text-sm">
              Filtrar por tipo
            </label>
            <select
              className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700 min-w-[150px]"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="todos">Todos os tipos</option>
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowAddFoodModal(true)}
            className="py-2 px-3.5 bg-[#28a745] border-2 border-[#28a745] rounded-lg cursor-pointer font-bold text-white flex items-center gap-2"
          >
            <span>+</span> Adicionar Alimentação
          </button>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse min-w-[650px] bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-[#f0f0f0]">
              <tr>
                <th className="p-3 text-left font-medium text-gray-800 text-base">
                  Nome
                </th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">
                  Tipo
                </th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">
                  Quantidade
                </th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">
                  Unidade
                </th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">
                  Grupo Destinado
                </th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">
                  Frequência
                </th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">
                  Descrição
                </th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedings.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-gray-500">
                    {!Array.isArray(feedings) || feedings.length === 0
                      ? "Nenhuma alimentação cadastrada"
                      : "Nenhuma alimentação encontrada com os filtros aplicados"}
                  </td>
                </tr>
              ) : (
                filteredFeedings.map((feeding, index) => (
                  <tr
                    key={feeding._id || index}
                    className={index % 2 === 0 ? "bg-[#fafafa]" : "bg-white"}
                  >
                    <td className="p-3 text-gray-800 text-base">
                      {feeding.nome || "Não informado"}
                    </td>
                    <td className="p-3 text-gray-800 text-base">
                      {feeding.tpAlimentacao || "Não informado"}
                    </td>
                    <td className="p-3 text-gray-800 text-base">
                      {feeding.quantidade || 0}
                    </td>
                    <td className="p-3 text-gray-800 text-base">
                      {feeding.unidadeMedida || "Não informado"}
                    </td>
                    <td className="p-3 text-gray-800 text-base">
                      {feeding.grupoDestinado || "Não informado"}
                    </td>
                    <td className="p-3 text-gray-800 text-base">
                      {feeding.frequencia || 0}x
                    </td>
                    <td className="p-3 text-gray-800 text-base">
                      <div
                        className="max-w-[200px] truncate"
                        title={feeding.desc}
                      >
                        {feeding.desc || "Sem descrição"}
                      </div>
                    </td>
                    <td className="p-3 text-base">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(feeding)}
                          className="bg-[#3b82f6] border-none text-white py-1 px-2 rounded-lg cursor-pointer text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(feeding)}
                          className="bg-[#ef4444] border-none text-white py-1 px-2 rounded-lg cursor-pointer text-sm font-medium hover:bg-red-700 transition-colors"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {Array.isArray(feedings) &&
          filteredFeedings.length !== feedings.length && (
            <div className="text-sm text-gray-600 mt-2">
              Mostrando {filteredFeedings.length} de {feedings.length}{" "}
              alimentações
            </div>
          )}
      </div>

      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-[400px] flex flex-col gap-3 relative">
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              Confirmar Exclusão
            </h2>
            <p className="text-gray-700">
              Tem certeza que deseja excluir a alimentação &quot;
              {itemToDelete?.nome}&quot;? Esta ação não pode ser desfeita.
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
                onClick={confirmDelete}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      <AddFeedingModal
        isOpen={showAddFoodModal}
        onClose={() => setShowAddFoodModal(false)}
        onSave={handleSaveNew}
      />

      <EditFeedingModal
        isOpen={showEditFoodModal}
        onClose={() => {
          setShowEditFoodModal(false);
          setSelectedFeeding(null);
        }}
        onSave={handleSaveEdit}
        feeding={selectedFeeding}
      />
    </div>
  );
}

function AddFeedingModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    nome: "",
    tpAlimentacao: "",
    quantidade: "",
    unidadeMedida: "",
    grupoDestinado: "",
    frequencia: "",
    desc: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação básica
    if (!formData.nome.trim()) {
      alert("Nome da alimentação é obrigatório");
      return;
    }

    if (!formData.tpAlimentacao) {
      alert("Tipo de alimentação é obrigatório");
      return;
    }

    if (!formData.quantidade || Number(formData.quantidade) <= 0) {
      alert("Quantidade deve ser maior que zero");
      return;
    }

    if (!formData.unidadeMedida) {
      alert("Unidade de medida é obrigatória");
      return;
    }

    if (!formData.grupoDestinado) {
      alert("Grupo destinado é obrigatório");
      return;
    }

    setIsSubmitting(true);

    try {
      const dataToSend = {
        nome: formData.nome.trim(),
        tpAlimentacao: formData.tpAlimentacao,
        quantidade: Number(formData.quantidade),
        unidadeMedida: formData.unidadeMedida,
        grupoDestinado: formData.grupoDestinado,
        frequencia: Number(formData.frequencia) || 1,
        desc: formData.desc.trim() || "",
      };

      console.log("📋 Dados preparados para envio:", dataToSend);

      await onSave(dataToSend);

      // Limpar formulário apenas se salvou com sucesso
      setFormData({
        nome: "",
        tpAlimentacao: "",
        quantidade: "",
        unidadeMedida: "",
        grupoDestinado: "",
        frequencia: "",
        desc: "",
      });
    } catch (error) {
      console.error("❌ Erro no submit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        nome: "",
        tpAlimentacao: "",
        quantidade: "",
        unidadeMedida: "",
        grupoDestinado: "",
        frequencia: "",
        desc: "",
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-[600px] flex flex-col gap-3 relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-2 right-3 text-2xl bg-transparent border-none cursor-pointer text-gray-700 disabled:opacity-50"
          onClick={handleClose}
          disabled={isSubmitting}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-2 text-gray-800">
          Adicionar Nova Alimentação
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Nome da Alimentação <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                placeholder="Ex: Ração Premium"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Tipo de Alimentação <span className="text-red-500">*</span>
              </label>
              <select
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700"
                value={formData.tpAlimentacao}
                onChange={(e) =>
                  setFormData({ ...formData, tpAlimentacao: e.target.value })
                }
                required
                disabled={isSubmitting}
              >
                <option value="">Selecione o tipo</option>
                <option value="Sólido">Sólido</option>
                <option value="Líquido">Líquido</option>
                <option value="Pastoso">Pastoso</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Quantidade <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                placeholder="Ex: 5"
                value={formData.quantidade}
                onChange={(e) =>
                  setFormData({ ...formData, quantidade: e.target.value })
                }
                required
                min="0.1"
                step="0.1"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Unidade de Medida <span className="text-red-500">*</span>
              </label>
              <select
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700"
                value={formData.unidadeMedida}
                onChange={(e) =>
                  setFormData({ ...formData, unidadeMedida: e.target.value })
                }
                required
                disabled={isSubmitting}
              >
                <option value="">Selecione a unidade</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="L">L</option>
                <option value="mL">mL</option>
                <option value="ton">ton</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Grupo Destinado <span className="text-red-500">*</span>
              </label>
              <select
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700"
                value={formData.grupoDestinado}
                onChange={(e) =>
                  setFormData({ ...formData, grupoDestinado: e.target.value })
                }
                required
                disabled={isSubmitting}
              >
                <option value="">Selecione o grupo</option>
                <option value="Em lactação">Em lactação</option>
                <option value="Secagem">Secagem</option>
                <option value="Seca">Seca</option>
                <option value="Pré-parto">Pré-parto</option>
                <option value="Bezerros">Bezerros</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Frequência (por dia)
              </label>
              <input
                type="number"
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                placeholder="Ex: 3 (padrão: 1)"
                value={formData.frequencia}
                onChange={(e) =>
                  setFormData({ ...formData, frequencia: e.target.value })
                }
                min="1"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Descrição
              </label>
              <textarea
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm min-h-[80px]"
                placeholder="Ex: Alimentação diária para suporte à futura lactação"
                value={formData.desc}
                onChange={(e) =>
                  setFormData({ ...formData, desc: e.target.value })
                }
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium disabled:opacity-50"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-[#f2b84d] text-black rounded-lg font-medium hover:bg-[#f39c12] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
              )}
              {isSubmitting ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EditFeedingModal({ isOpen, onClose, onSave, feeding }) {
  const [formData, setFormData] = useState({
    nome: "",
    tpAlimentacao: "",
    quantidade: "",
    unidadeMedida: "",
    grupoDestinado: "",
    frequencia: "",
    desc: "",
  });

  useEffect(() => {
    if (feeding) {
      setFormData({
        nome: feeding.nome || "",
        tpAlimentacao: feeding.tpAlimentacao || "",
        quantidade: feeding.quantidade || "",
        unidadeMedida: feeding.unidadeMedida || "",
        grupoDestinado: feeding.grupoDestinado || "",
        frequencia: feeding.frequencia || "",
        desc: feeding.desc || "",
      });
    }
  }, [feeding]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      quantidade: Number(formData.quantidade) || 0,
      frequencia: Number(formData.frequencia) || 0,
    });
  };

  if (!isOpen || !feeding) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-[600px] flex flex-col gap-3 relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-2 right-3 text-2xl bg-transparent border-none cursor-pointer text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-2 text-gray-800">
          Editar Alimentação
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Nome da Alimentação
              </label>
              <input
                type="text"
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Tipo de Alimentação
              </label>
              <select
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700"
                value={formData.tpAlimentacao}
                onChange={(e) =>
                  setFormData({ ...formData, tpAlimentacao: e.target.value })
                }
                required
              >
                <option value="">Selecione o tipo</option>
                <option value="Sólido">Sólido</option>
                <option value="Líquido">Líquido</option>
                <option value="Pastoso">Pastoso</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Quantidade
              </label>
              <input
                type="number"
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                value={formData.quantidade}
                onChange={(e) =>
                  setFormData({ ...formData, quantidade: e.target.value })
                }
                required
                min="0"
                step="0.1"
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
                required
              >
                <option value="">Selecione a unidade</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="L">L</option>
                <option value="mL">mL</option>
                <option value="ton">ton</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Grupo Destinado
              </label>
              <select
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700"
                value={formData.grupoDestinado}
                onChange={(e) =>
                  setFormData({ ...formData, grupoDestinado: e.target.value })
                }
                required
              >
                <option value="">Selecione o grupo</option>
                <option value="Em lactação">Em lactação</option>
                <option value="Secagem">Secagem</option>
                <option value="Seca">Seca</option>
                <option value="Pré-parto">Pré-parto</option>
                <option value="Bezerros">Bezerros</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Frequência (por dia)
              </label>
              <input
                type="number"
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                value={formData.frequencia}
                onChange={(e) =>
                  setFormData({ ...formData, frequencia: e.target.value })
                }
                required
                min="1"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Descrição
              </label>
              <textarea
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm min-h-[80px]"
                value={formData.desc}
                onChange={(e) =>
                  setFormData({ ...formData, desc: e.target.value })
                }
              />
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

// Add the getLayout function
Alimentacao.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
