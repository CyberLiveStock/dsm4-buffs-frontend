"use client";

import { useState, useEffect } from "react";
import Layout from "@/layout/Layout";
import {
  createProduction,
  updateProduction,
  deleteProduction,
} from "@/services/productionService";
import {
  fetchProductionStats,
  formatCurrency,
  formatDate,
  getStatusColor,
  getStatusText,
} from "@/utils/productionUtil";

export default function Producao() {
  // Estados para controlar modais
  const [showAddColetaModal, setShowAddColetaModal] = useState(false);
  const [showEditColetaModal, setShowEditColetaModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedProduction, setSelectedProduction] = useState(null);
  const [selectedColeta, setSelectedColeta] = useState(null);
  const [productionToDelete, setProductionToDelete] = useState(null);

  // Estados para dados da API
  const [productions, setProductions] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  // Carregar dados da API
  useEffect(() => {
    loadProductionData();
  }, []);

  const loadProductionData = async () => {
    try {
      setLoading(true);
      const statsData = await fetchProductionStats();
      console.log("📦 Dados de produção carregados:", statsData);
      setProductions(statsData.productions || []);
      setStats(statsData);
    } catch (error) {
      console.error("❌ Erro ao carregar dados de produção:", error);
      setProductions([]);
      setStats({});
    } finally {
      setLoading(false);
    }
  };

  // Preparar dados das coletas para exibição na tabela
  const allColetas = [];
  productions.forEach((production) => {
    if (production.coletas && Array.isArray(production.coletas)) {
      production.coletas.forEach((coleta) => {
        allColetas.push({
          ...coleta,
          productionId: production._id,
          production: production,
        });
      });
    }
  });

  // Filtrar coletas
  const filteredColetas = allColetas.filter((coleta) => {
    const matchesSearch =
      coleta.empresaColeta?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false;
    const matchesStatus =
      statusFilter === "todos" || coleta.resultado === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Obter status únicos para o filtro
  const uniqueStatus = [
    ...new Set(allColetas.map((c) => c.resultado).filter(Boolean)),
  ];

  const handleViewDetails = (coleta) => {
    setSelectedColeta(coleta);
    setShowDetailsModal(true);
  };

  const handleEdit = (coleta) => {
    setSelectedColeta(coleta);
    setShowEditColetaModal(true);
  };

  const handleDelete = (production) => {
    setProductionToDelete(production);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      const success = await deleteProduction(productionToDelete._id);
      if (success) {
        await loadProductionData();
        setShowDeleteConfirmation(false);
        setProductionToDelete(null);
        console.log("✅ Produção deletada com sucesso");
        alert("Produção removida com sucesso!");
      } else {
        alert("Erro ao remover produção");
      }
    } catch (error) {
      console.error("❌ Erro ao deletar:", error);
      alert("Erro ao remover produção");
    }
  };

  const handleSaveNew = async (formData) => {
    try {
      console.log("📤 Dados da nova coleta:", formData);

      const result = await createProduction(formData);
      if (result) {
        await loadProductionData();
        setShowAddColetaModal(false);
        console.log("✅ Coleta criada com sucesso");
        alert("Coleta registrada com sucesso!");
      } else {
        alert("Erro ao registrar coleta");
      }
    } catch (error) {
      console.error("❌ Erro ao criar coleta:", error);
      alert("Erro ao registrar coleta");
    }
  };

  const handleSaveEdit = async (formData) => {
    try {
      const success = await updateProduction(
        selectedColeta.productionId,
        formData
      );
      if (success) {
        await loadProductionData();
        setShowEditColetaModal(false);
        setSelectedColeta(null);
        console.log("✅ Coleta atualizada com sucesso");
        alert("Coleta atualizada com sucesso!");
      } else {
        alert("Erro ao atualizar coleta");
      }
    } catch (error) {
      console.error("❌ Erro ao atualizar:", error);
      alert("Erro ao atualizar coleta");
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFCF78] mx-auto mb-4"></div>
          <p className="text-black">Carregando dados de produção...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f5f5f5] p-5 flex flex-col items-center gap-5 box-border">
      {/* Indicadores da Produção */}
      <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Controle de Produção
          </h1>
          <p className="text-gray-600">
            Monitoramento da Produção de Leite de Búfalas -{" "}
            {stats.totalColetas || 0} coletas registradas
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
            <h2 className="text-sm font-medium text-gray-500">
              Total Produzido
            </h2>
            <p className="text-2xl font-bold text-gray-800">
              {(stats.totalProduzido || 0).toFixed(1)} L
            </p>
            <p className="text-sm font-medium text-green-700">
              Produção acumulada
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
            <h2 className="text-sm font-medium text-gray-500">
              Total Retirado
            </h2>
            <p className="text-2xl font-bold text-gray-800">
              {(stats.totalRetirado || 0).toFixed(1)} L
            </p>
            <p className="text-sm font-medium text-green-700">
              Volume comercializado
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
            <h2 className="text-sm font-medium text-gray-500">
              Taxa de Aprovação
            </h2>
            <p className="text-2xl font-bold text-gray-800">
              {(stats.taxaAprovacao || 0).toFixed(1)}%
            </p>
            <p className="text-sm font-medium text-green-700">
              Qualidade do produto
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
            <h2 className="text-sm font-medium text-gray-500">
              Volume Rejeitado
            </h2>
            <p className="text-2xl font-bold text-gray-800">
              {(stats.totalRejeitado || 0).toFixed(1)} L
            </p>
            <p className="text-sm font-medium text-red-600">
              Perdas registradas
            </p>
          </div>
        </div>
      </div>

      {/* Tabela de Coletas */}
      <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800">
          Registro de Coletas
        </h2>

        {/* Filtros */}
        <div className="flex gap-4 flex-wrap items-end">
          <div className="flex flex-col">
            <label className="font-semibold mb-1.5 text-gray-700 text-sm">
              Buscar por Empresa
            </label>
            <input
              type="text"
              className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm w-[300px] max-w-full"
              placeholder="Digite o nome da empresa"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1.5 text-gray-700 text-sm">
              Status
            </label>
            <select
              className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700 min-w-[150px]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="todos">Todos os status</option>
              {uniqueStatus.map((status) => (
                <option key={status} value={status}>
                  {getStatusText(status)}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowAddColetaModal(true)}
            className="py-2 px-3.5 bg-[#28a745] border-2 border-[#28a745] rounded-lg cursor-pointer font-bold text-white hover:bg-[#218838] transition-colors"
          >
            Registrar Coleta
          </button>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse min-w-[650px] bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-[#f0f0f0]">
              <tr>
                <th className="p-3 text-left font-medium text-gray-800 text-base">
                  Data da Coleta
                </th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">
                  Empresa
                </th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">
                  Quantidade
                </th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">
                  Valor Pago
                </th>
                <th className="p-3 text-center font-medium text-gray-800 text-base">
                  Status
                </th>
                <th className="p-3 text-center font-medium text-gray-800 text-base">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredColetas.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    {allColetas.length === 0
                      ? "Nenhuma coleta registrada"
                      : "Nenhuma coleta encontrada com os filtros aplicados"}
                  </td>
                </tr>
              ) : (
                filteredColetas.map((coleta, index) => (
                  <tr
                    key={`${coleta.productionId}-${index}`}
                    className={index % 2 === 0 ? "bg-[#fafafa]" : "bg-white"}
                  >
                    <td className="p-3 text-gray-800 text-base">
                      {formatDate(coleta.dataColeta)}
                    </td>
                    <td className="p-3 text-gray-800 text-base">
                      {coleta.empresaColeta || "Não informado"}
                    </td>
                    <td className="p-3 text-gray-800 text-base">
                      {(coleta.quantidadeColetada || 0).toFixed(1)} L
                    </td>
                    <td className="p-3 text-gray-800 text-base">
                      {formatCurrency(
                        Number.parseFloat(
                          String(coleta.valorPago ?? "0").replace(",", ".")
                        )
                      )}
                    </td>
                    <td className="p-3 text-center text-base">
                      <span
                        className={`px-2.5 py-1.5 rounded-full text-sm font-bold inline-block w-20 ${getStatusColor(
                          coleta.resultado
                        )}`}
                      >
                        {getStatusText(coleta.resultado)}
                      </span>
                    </td>
                    <td className="p-3 text-center text-base">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleViewDetails(coleta)}
                          className="bg-[#FFCF78] border-none text-black py-1 px-2 rounded-lg cursor-pointer text-sm font-medium hover:bg-[#f39c12] transition-colors"
                        >
                          Ver detalhes
                        </button>
                        <button
                          onClick={() => handleEdit(coleta)}
                          className="bg-[#3b82f6] border-none text-white py-1 px-2 rounded-lg cursor-pointer text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(coleta.production)}
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

        {/* Informações de filtro */}
        {filteredColetas.length !== allColetas.length && (
          <div className="text-sm text-gray-600 mt-2">
            Mostrando {filteredColetas.length} de {allColetas.length} coletas
          </div>
        )}
      </div>

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999]">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-[400px] flex flex-col gap-3 relative">
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              Confirmar Exclusão
            </h2>
            <p className="text-gray-700">
              Tem certeza que deseja excluir esta produção? Esta ação não pode
              ser desfeita.
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

      {/* Modal para Adicionar Coleta */}
      <AddColetaModal
        isOpen={showAddColetaModal}
        onClose={() => setShowAddColetaModal(false)}
        onSave={handleSaveNew}
      />

      {/* Modal para Editar Coleta */}
      <EditColetaModal
        isOpen={showEditColetaModal}
        onClose={() => {
          setShowEditColetaModal(false);
          setSelectedColeta(null);
        }}
        onSave={handleSaveEdit}
        coleta={selectedColeta}
      />

      {/* Modal para Ver Detalhes */}
      <ColetaDetailsModal
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedColeta(null);
        }}
        coleta={selectedColeta}
        onEdit={() => {
          setShowDetailsModal(false);
          setShowEditColetaModal(true);
        }}
      />
    </div>
  );
}

// Componente Modal para Adicionar Coleta
function AddColetaModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    dataColeta: "",
    quantidadeColetada: "",
    empresaColeta: "",
    valorPago: "",
    resultado: "",
    desc: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação básica
    if (!formData.dataColeta) {
      alert("Data da coleta é obrigatória");
      return;
    }

    if (
      !formData.quantidadeColetada ||
      Number(formData.quantidadeColetada) <= 0
    ) {
      alert("Quantidade coletada deve ser maior que zero");
      return;
    }

    if (!formData.empresaColeta.trim()) {
      alert("Empresa de coleta é obrigatória");
      return;
    }

    if (!formData.resultado) {
      alert("Resultado da análise é obrigatório");
      return;
    }

    setIsSubmitting(true);

    try {
      const dataToSend = {
        coletas: {
          dataColeta: new Date(formData.dataColeta).toISOString(),
          quantidadeColetada: Number(formData.quantidadeColetada),
          empresaColeta: formData.empresaColeta?.trim() ?? "",
          valorPago: (formData.valorPago ?? "").toString().trim() || "0",
          resultado: formData.resultado,
          desc: formData.desc?.trim() ?? "",
        },
      };

      await onSave(dataToSend);

      // Limpar formulário
      setFormData({
        dataColeta: "",
        quantidadeColetada: "",
        empresaColeta: "",
        valorPago: "",
        resultado: "",
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
        dataColeta: "",
        quantidadeColetada: "",
        empresaColeta: "",
        valorPago: "",
        resultado: "",
        desc: "",
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999]">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-[600px] flex flex-col gap-3 relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-2 right-3 text-2xl bg-transparent border-none cursor-pointer text-gray-700 disabled:opacity-50"
          onClick={handleClose}
          disabled={isSubmitting}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-2 text-gray-800">
          Registrar Nova Coleta
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Data da Coleta <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                value={formData.dataColeta}
                onChange={(e) =>
                  setFormData({ ...formData, dataColeta: e.target.value })
                }
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Quantidade Coletada (L) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                placeholder="Ex: 1000"
                value={formData.quantidadeColetada}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantidadeColetada: e.target.value,
                  })
                }
                required
                min="0.1"
                step="0.1"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Empresa de Coleta <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                placeholder="Ex: Cesar Laticínio Ltda"
                value={formData.empresaColeta}
                onChange={(e) =>
                  setFormData({ ...formData, empresaColeta: e.target.value })
                }
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Valor Pago (R$)
              </label>
              <input
                type="text"
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                placeholder="Ex: 2.000,65"
                value={formData.valorPago}
                onChange={(e) =>
                  setFormData({ ...formData, valorPago: e.target.value })
                }
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Resultado da Análise <span className="text-red-500">*</span>
              </label>
              <select
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700"
                value={formData.resultado}
                onChange={(e) =>
                  setFormData({ ...formData, resultado: e.target.value })
                }
                required
                disabled={isSubmitting}
              >
                <option value="">Selecione o resultado</option>
                <option value="Positivo">Positivo (Aprovado)</option>
                <option value="Negativo">Negativo (Reprovado)</option>
              </select>
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Observações
              </label>
              <textarea
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm min-h-[80px]"
                placeholder="Ex: Teste deu positivo tranquilamente, indústria satisfeita com o resultado"
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
              className="py-2 px-4 bg-[#28a745] text-white rounded-lg font-medium hover:bg-[#218838] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              {isSubmitting ? "Registrando..." : "Registrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Componente Modal para Editar Coleta
function EditColetaModal({ isOpen, onClose, onSave, coleta }) {
  const [formData, setFormData] = useState({
    dataColeta: "",
    quantidadeColetada: "",
    empresaColeta: "",
    valorPago: "",
    resultado: "",
    desc: "",
  });

  useEffect(() => {
    if (coleta) {
      setFormData({
        dataColeta: coleta.dataColeta ? coleta.dataColeta.split("T")[0] : "",
        quantidadeColetada: coleta.quantidadeColetada || "",
        empresaColeta: coleta.empresaColeta || "",
        valorPago: coleta.valorPago || "",
        resultado: coleta.resultado || "",
        desc: coleta.desc || "",
      });
    }
  }, [coleta]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      coletas: {
        dataColeta: new Date(formData.dataColeta).toISOString(),
        quantidadeColetada: Number(formData.quantidadeColetada),
        empresaColeta: (formData.empresaColeta ?? "").toString().trim(),
        valorPago: (formData.valorPago ?? "").toString().trim() || "0",
        resultado: formData.resultado,
        desc: (formData.desc ?? "").toString().trim() || "",
      },
    };

    onSave(dataToSend);
  };

  if (!isOpen || !coleta) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999]">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-[600px] flex flex-col gap-3 relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-2 right-3 text-2xl bg-transparent border-none cursor-pointer text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-2 text-gray-800">Editar Coleta</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Data da Coleta
              </label>
              <input
                type="date"
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                value={formData.dataColeta}
                onChange={(e) =>
                  setFormData({ ...formData, dataColeta: e.target.value })
                }
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Quantidade Coletada (L)
              </label>
              <input
                type="number"
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                value={formData.quantidadeColetada}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantidadeColetada: e.target.value,
                  })
                }
                required
                min="0.1"
                step="0.1"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Empresa de Coleta
              </label>
              <input
                type="text"
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                value={formData.empresaColeta}
                onChange={(e) =>
                  setFormData({ ...formData, empresaColeta: e.target.value })
                }
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Valor Pago (R$)
              </label>
              <input
                type="text"
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                value={formData.valorPago}
                onChange={(e) =>
                  setFormData({ ...formData, valorPago: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Resultado da Análise
              </label>
              <select
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700"
                value={formData.resultado}
                onChange={(e) =>
                  setFormData({ ...formData, resultado: e.target.value })
                }
                required
              >
                <option value="">Selecione o resultado</option>
                <option value="Positivo">Positivo (Aprovado)</option>
                <option value="Negativo">Negativo (Reprovado)</option>
              </select>
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Observações
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
              className="py-2 px-4 bg-[#3b82f6] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Componente Modal para Ver Detalhes
function ColetaDetailsModal({ isOpen, onClose, coleta, onEdit }) {
  if (!isOpen || !coleta) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999]">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-[500px] flex flex-col gap-4 relative">
        <button
          className="absolute top-2 right-3 text-2xl bg-transparent border-none cursor-pointer text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-2 text-gray-800">
          Detalhes da Coleta
        </h2>

        <div className="space-y-4">
          <div>
            <label className="font-semibold text-gray-700 text-sm block mb-1">
              Data da Coleta
            </label>
            <p className="text-gray-800 bg-gray-50 p-2 rounded border">
              {formatDate(coleta.dataColeta)}
            </p>
          </div>

          <div>
            <label className="font-semibold text-gray-700 text-sm block mb-1">
              Empresa de Coleta
            </label>
            <p className="text-gray-800 bg-gray-50 p-2 rounded border">
              {coleta.empresaColeta || "Não informado"}
            </p>
          </div>

          <div>
            <label className="font-semibold text-gray-700 text-sm block mb-1">
              Quantidade Coletada
            </label>
            <p className="text-gray-800 bg-gray-50 p-2 rounded border">
              {(coleta.quantidadeColetada || 0).toFixed(1)} L
            </p>
          </div>

          <div>
            <label className="font-semibold text-gray-700 text-sm block mb-1">
              Valor Pago
            </label>
            <p className="text-gray-800 bg-gray-50 p-2 rounded border">
              {formatCurrency(
                typeof coleta.valorPago === "string"
                  ? Number.parseFloat(coleta.valorPago.replace(",", "."))
                  : Number(coleta.valorPago ?? 0)
              )}
            </p>
          </div>

          <div>
            <label className="font-semibold text-gray-700 text-sm block mb-1">
              Resultado da Análise
            </label>
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-bold inline-block ${getStatusColor(
                coleta.resultado
              )}`}
            >
              {getStatusText(coleta.resultado)}
            </span>
          </div>

          {coleta.desc && (
            <div>
              <label className="font-semibold text-gray-700 text-sm block mb-1">
                Observações
              </label>
              <p className="text-gray-800 bg-gray-50 p-2 rounded border">
                {coleta.desc}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium"
            onClick={onClose}
          >
            Fechar
          </button>
          <button
            className="py-2 px-4 bg-[#3b82f6] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            onClick={onEdit}
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}

Producao.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
