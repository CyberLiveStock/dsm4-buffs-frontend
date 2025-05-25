"use client";

import { useState, useEffect } from "react";
import Layout from "@/layout/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import {
  fetchReproductionStats,
  getReproductionsWithVetNames,
  formatReproductionStatus,
  getStatusColor,
} from "@/utils/reproductionUtil";

export default function ControleReproducao() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("lactando");
  const [showProntuarioModal, setShowProntuarioModal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [reproductions, setReproductions] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filteredReproductions, setFilteredReproductions] = useState([]);

  // Carregar dados da API
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [reproductionsData, statsData] = await Promise.all([
          getReproductionsWithVetNames(),
          fetchReproductionStats(),
        ]);

        setReproductions(reproductionsData);
        setFilteredReproductions(reproductionsData);
        setStats(statsData);
      } catch (error) {
        console.error("❌ Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Calcular período de gestação baseado no status
  const calcularPeriodoGestacao = (animal) => {
    if (!animal.dataInseminacao || !animal.dataStatus) {
      return "Não aplicável";
    }

    const dataInicio = new Date(animal.dataInseminacao);
    const dataFim = new Date(animal.dataStatus);
    const diasDiferenca = Math.floor(
      (dataFim - dataInicio) / (1000 * 60 * 60 * 24)
    );

    if (diasDiferenca < 0) {
      return "Dados inconsistentes";
    }

    return `${diasDiferenca} dias`;
  };

  const totalBufalas = stats.totalReproductions || 0;
  const statusCounts = stats.countByStatus || {};

  const bufalasProblematicas =
    (statusCounts["Finalizado"] || 0) + (statusCounts["Em secagem"] || 0);
  const percentualProblematicas =
    totalBufalas > 0
      ? ((bufalasProblematicas / totalBufalas) * 100).toFixed(1)
      : 0;

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFCF78] mx-auto mb-4"></div>
          <p className="text-black">Carregando dados de reprodução...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col items-center gap-8">
      <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-black">
            Gestão de Reprodução
          </h1>
          <p className="text-black">
            Monitore o status reprodutivo do seu rebanho e otimize o desempenho
            reprodutivo.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
            <h2 className="text-sm font-medium text-black">Total de Búfalas</h2>
            <p className="text-xs text-black">
              Monitoramento reprodutivo ativo
            </p>
            <p className="text-2xl font-bold text-black mt-2">{totalBufalas}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
            <h2 className="text-sm font-medium text-black">
              Análise Financeira
            </h2>
            <p className="text-xs text-black">
              Búfalas com impacto financeiro negativo
            </p>

            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="text-amber-500"
                  title="Essas búfalas não estão lactando nem entrando no cio."
                />
                <p className="text-sm text-red-600">
                  <strong>{bufalasProblematicas} búfalas</strong>
                </p>
              </div>
              <span className="text-lg font-bold text-red-600">
                {percentualProblematicas}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
        <FilterTable
          reproductions={reproductions}
          onFilter={setFilteredReproductions}
        />
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse min-w-[650px] bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-[#f0f0f0]">
              <tr>
                <th className="p-3 text-center font-medium text-black text-base">
                  TAG
                </th>
                <th className="p-3 text-center font-medium text-black text-base">
                  Vet Responsável
                </th>
                <th className="p-3 text-center font-medium text-black text-base">
                  Data do Status
                </th>
                <th className="p-3 text-center font-medium text-black text-base">
                  Tipo de Inseminação
                </th>
                <th className="p-3 text-center font-medium text-black text-base">
                  Status
                </th>
                <th className="p-3 text-center font-medium text-black text-base">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredReproductions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    Nenhuma reprodução encontrada
                  </td>
                </tr>
              ) : (
                filteredReproductions.map((reproduction, index) => (
                  <tr
                    key={reproduction._id || index}
                    className={index % 2 === 0 ? "bg-[#fafafa]" : "bg-white"}
                  >
                    <td className="p-3 text-center text-black text-base font-medium">
                      {reproduction.tagBufala}
                    </td>
                    <td className="p-3 text-center text-black text-base">
                      {reproduction.vetResponsavelNomes
                        ? reproduction.vetResponsavelNomes.join(", ")
                        : "Não informado"}
                    </td>
                    <td className="p-3 text-center text-black text-base">
                      {reproduction.dataStatus
                        ? new Date(reproduction.dataStatus).toLocaleDateString(
                            "pt-BR"
                          )
                        : "Não informado"}
                    </td>
                    <td className="p-3 text-center text-black text-base">
                      {reproduction.tipoInseminacao || "Não informado"}
                    </td>
                    <td className="p-3 text-center text-black text-base">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          reproduction.status
                        )}`}
                      >
                        {formatReproductionStatus(reproduction.status)}
                      </span>
                    </td>
                    <td className="p-3 text-center text-base">
                      <button
                        onClick={() => {
                          setSelectedAnimal(reproduction);
                          setShowProntuarioModal(true);
                        }}
                        className="bg-[#FFCF78] border-none text-black py-2 px-3.5 rounded-lg cursor-pointer text-sm font-bold hover:bg-[#f39c12] transition-colors"
                      >
                        Ver detalhes
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
        <StatusReprodutivo statusCounts={statusCounts} />
      </div>

      {showProntuarioModal && selectedAnimal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[9999] p-4">
          <div className="bg-white rounded-xl w-full max-w-[1000px] h-[85vh] relative shadow-2xl flex flex-col">
            <div className="bg-gradient-to-r from-[#FFCF78] to-[#f39c12] p-4 flex justify-between items-center rounded-t-xl">
              <div>
                <h2 className="text-xl font-bold text-black">
                  Prontuário Reprodutivo
                </h2>
                <p className="text-black/80 text-sm">
                  TAG: {selectedAnimal.tagBufala}
                </p>
              </div>
              <button
                className="text-2xl bg-white/20 hover:bg-white/30 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 text-black"
                onClick={() => setShowProntuarioModal(false)}
              >
                &times;
              </button>
            </div>

            <div className="flex-1 p-4 space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[40%]">
                <div className="lg:col-span-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 border border-gray-200">
                  <h3 className="text-lg font-semibold text-black mb-3 flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Informações Gerais
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-gray-600">
                        TAG da Búfala
                      </label>
                      <div className="bg-white p-2 rounded border border-gray-200 text-black font-semibold">
                        {selectedAnimal.tagBufala}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-gray-600">
                        Veterinário Responsável
                      </label>
                      <div className="bg-white p-2 rounded border border-gray-200 text-black text-sm">
                        {selectedAnimal.vetResponsavelNomes
                          ? selectedAnimal.vetResponsavelNomes.join(", ")
                          : "Não informado"}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-gray-600">
                        Data do Status
                      </label>
                      <div className="bg-white p-2 rounded border border-gray-200 text-black text-sm">
                        {selectedAnimal.dataStatus
                          ? new Date(
                              selectedAnimal.dataStatus
                            ).toLocaleDateString("pt-BR")
                          : "Não informado"}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-gray-600">
                        Tipo de Inseminação
                      </label>
                      <div className="bg-white p-2 rounded border border-gray-200 text-black text-sm">
                        {selectedAnimal.tipoInseminacao || "Não informado"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
                  <h3 className="text-lg font-semibold text-black mb-3 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Status Atual
                  </h3>
                  <div className="text-center">
                    <div className="mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${getStatusColor(
                          selectedAnimal.status
                        )}`}
                      >
                        {formatReproductionStatus(selectedAnimal.status)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Atualizado em:
                      <br />
                      <span className="font-medium text-black text-sm">
                        {selectedAnimal.dataStatus
                          ? new Date(
                              selectedAnimal.dataStatus
                            ).toLocaleDateString("pt-BR")
                          : "Não informado"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 border border-green-200 h-[30%]">
                <h3 className="text-lg font-semibold text-black mb-3 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Dados Reprodutivos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-600">
                      Data da Inseminação
                    </label>
                    <div className="bg-white p-2 rounded border border-gray-200 text-black font-medium text-sm">
                      {selectedAnimal.dataInseminacao
                        ? new Date(
                            selectedAnimal.dataInseminacao
                          ).toLocaleDateString("pt-BR")
                        : "Não informado"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-600">
                      TAG do Pai
                    </label>
                    <div className="bg-white p-2 rounded border border-gray-200 text-black font-medium text-sm">
                      {selectedAnimal.tagPai || "Não informado"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-600">
                      TAG do Nascido
                    </label>
                    <div className="bg-white p-2 rounded border border-gray-200 text-black font-medium text-sm">
                      {selectedAnimal.tagNascido || "Não aplicável"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-3 border border-amber-200 h-[25%]">
                <h3 className="text-lg font-semibold text-black mb-3 flex items-center">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                  Histórico e Período
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-600">
                      Período do Status
                    </label>
                    <div className="bg-white p-2 rounded border border-gray-200 text-black font-medium text-sm">
                      {calcularPeriodoGestacao(selectedAnimal)}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-600">
                      Observações
                    </label>
                    <textarea
                      className="w-full bg-white p-2 rounded border border-gray-200 text-black h-16 resize-none text-xs"
                      placeholder="Adicione observações..."
                      defaultValue={
                        selectedAnimal.status === "Lactando"
                          ? "Animal em período de lactação normal. Produção de leite dentro dos parâmetros esperados."
                          : selectedAnimal.status === "Prenha"
                          ? "Prenhez confirmada por ultrassom. Acompanhamento mensal recomendado."
                          : selectedAnimal.status === "No cio"
                          ? "Animal apresentando sinais de cio. Recomendada nova inseminação."
                          : "Animal em período de secagem. Preparação para próximo ciclo reprodutivo."
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-t border-gray-200 p-3 rounded-b-xl">
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-1 shadow-md hover:shadow-lg text-sm">
                  <span>📄</span>
                  <span>Relatório</span>
                </button>
                <button
                  className="bg-[#FFCF78] hover:bg-[#f39c12] text-black px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-1 shadow-md hover:shadow-lg text-sm"
                  onClick={() => setShowProntuarioModal(false)}
                >
                  <span>✖️</span>
                  <span>Fechar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterTable({ reproductions, onFilter }) {
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    tag: "",
    vet: "",
    tipoInseminacao: "",
    status: "",
    dataInicial: "",
    dataFinal: "",
  });

  // Extrair valores únicos para os filtros
  const uniqueVets = [
    ...new Set(reproductions.flatMap((r) => r.vetResponsavelNomes || [])),
  ];
  const uniqueTipos = [
    ...new Set(reproductions.map((r) => r.tipoInseminacao).filter(Boolean)),
  ];
  const uniqueStatus = [
    ...new Set(reproductions.map((r) => r.status).filter(Boolean)),
  ];

  // Aplicar filtros
  useEffect(() => {
    let filtered = reproductions;

    if (filters.tag) {
      filtered = filtered.filter((r) =>
        r.tagBufala?.toLowerCase().includes(filters.tag.toLowerCase())
      );
    }

    if (filters.vet) {
      filtered = filtered.filter((r) =>
        r.vetResponsavelNomes?.some((vet) => vet.includes(filters.vet))
      );
    }

    if (filters.tipoInseminacao) {
      filtered = filtered.filter(
        (r) => r.tipoInseminacao === filters.tipoInseminacao
      );
    }

    if (filters.status) {
      filtered = filtered.filter((r) => r.status === filters.status);
    }

    if (filters.dataInicial && filters.dataFinal) {
      filtered = filtered.filter((r) => {
        if (!r.dataStatus) return false;
        const dataStatus = new Date(r.dataStatus);
        const dataInicial = new Date(filters.dataInicial);
        const dataFinal = new Date(filters.dataFinal);
        return dataStatus >= dataInicial && dataStatus <= dataFinal;
      });
    }

    onFilter(filtered);
  }, [filters, reproductions, onFilter]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyDateFilter = () => {
    setShowModal(false);
  };

  const clearFilters = () => {
    setFilters({
      tag: "",
      vet: "",
      tipoInseminacao: "",
      status: "",
      dataInicial: "",
      dataFinal: "",
    });
  };

  return (
    <div className="flex flex-wrap gap-4 items-end mb-4">
      <div className="flex flex-col">
        <label className="font-semibold mb-1.5 text-black text-sm">
          Buscar por Tag
        </label>
        <input
          type="text"
          value={filters.tag}
          onChange={(e) => handleFilterChange("tag", e.target.value)}
          className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm w-[301px] max-w-full text-black"
          placeholder="Digite a tag"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-1.5 text-black text-sm">
          Filtrar por Vet
        </label>
        <select
          value={filters.vet}
          onChange={(e) => handleFilterChange("vet", e.target.value)}
          className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-black w-[197px] max-w-full"
        >
          <option value="">Todos os veterinários</option>
          {uniqueVets.map((vet) => (
            <option key={vet} value={vet}>
              {vet}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-1.5 text-black text-sm">
          Tipo de Inseminação
        </label>
        <select
          value={filters.tipoInseminacao}
          onChange={(e) =>
            handleFilterChange("tipoInseminacao", e.target.value)
          }
          className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-black w-[197px] max-w-full"
        >
          <option value="">Todos os tipos</option>
          {uniqueTipos.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-1.5 text-black text-sm">
          Status
        </label>
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-black w-[197px] max-w-full"
        >
          <option value="">Todos os status</option>
          {uniqueStatus.map((status) => (
            <option key={status} value={status}>
              {formatReproductionStatus(status)}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="py-2 px-3.5 border-2 border-[#D9DBDB] rounded-lg cursor-pointer font-bold text-black w-[198px] max-w-full hover:bg-gray-50 transition-colors"
      >
        Filtrar por período
      </button>

      <button
        onClick={clearFilters}
        className="py-2 px-3.5 bg-red-500 text-white rounded-lg cursor-pointer font-bold hover:bg-red-600 transition-colors"
      >
        Limpar Filtros
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
            <h2 className="text-xl font-bold mb-2 text-black">
              Filtrar por período
            </h2>
            <label className="font-medium text-black">Data Inicial:</label>
            <input
              type="date"
              value={filters.dataInicial}
              onChange={(e) =>
                handleFilterChange("dataInicial", e.target.value)
              }
              className="p-2 text-base border border-gray-300 rounded text-black"
            />
            <label className="font-medium text-black">Data Final:</label>
            <input
              type="date"
              value={filters.dataFinal}
              onChange={(e) => handleFilterChange("dataFinal", e.target.value)}
              className="p-2 text-base border border-gray-300 rounded text-black"
            />
            <button
              onClick={applyDateFilter}
              className="mt-2 py-2.5 px-4 text-base bg-[#FFCF78] text-black border-none rounded cursor-pointer hover:bg-[#f39c12] transition-colors"
            >
              Aplicar Filtro
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusReprodutivo({ statusCounts }) {
  const statusData = Object.entries(statusCounts).map(([status, count]) => ({
    status: formatReproductionStatus(status),
    valor: count,
  }));

  if (statusData.length === 0) {
    return (
      <div className="w-full">
        <div className="bg-white rounded-lg p-6 mb-6 border border-[#e0e0e0]">
          <h2 className="text-xl font-semibold text-black m-0">
            Distribuição por Status reprodutivo
          </h2>
          <p className="text-sm text-black mt-1 mb-6">
            Análise detalhada do status das búfalas
          </p>
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-gray-500">Nenhum dado disponível</p>
          </div>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...statusData.map((item) => item.valor)) * 1.2 || 1;

  const yAxisValues = [
    0,
    maxValue / 4,
    maxValue / 2,
    (maxValue * 3) / 4,
    maxValue,
  ];

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg p-6 mb-6 border border-[#e0e0e0]">
        <h2 className="text-xl font-semibold text-black m-0">
          Distribuição por Status reprodutivo
        </h2>
        <p className="text-sm text-black mt-1 mb-6">
          Análise detalhada do status das búfalas
        </p>

        <div className="h-[300px] relative pl-10 pb-10 box-border">
          <div className="absolute left-0 top-0 bottom-10 w-10 flex flex-col justify-between items-end pr-2.5">
            {yAxisValues.reverse().map((value, index) => (
              <div key={index} className="text-xs text-black">
                {value.toFixed(0)}
              </div>
            ))}
          </div>

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
                  {item.valor}
                </div>
              </div>
            ))}
          </div>

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
  );
}

ControleReproducao.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
