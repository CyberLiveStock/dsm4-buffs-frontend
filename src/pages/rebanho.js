"use client";

import { useState } from "react";
import Layout from "@/layout/Layout";
import React, { useEffect } from "react";
import { fetchBuffaloStats } from "@/utils/buffaloUtil";
import { FaVenus, FaMars } from "react-icons/fa";

export default function Rebanho() {
  // 1. Estados básicos de UI
  // Estado para controlar se o modal de detalhes está aberto ou não
  const [modalAberto, setModalAberto] = useState(false);

  // Estado para armazenar o búfalo que foi selecionado para ver detalhes
  const [bufaloSelecionado, setBufaloSelecionado] = React.useState(null);

  // Estado para controlar qual aba está ativa na interface (exemplo: "zootecnico")
  const [abaAtiva, setAbaAtiva] = useState("zootecnico");

  // 2. Estados de dados
  // Contagem de búfalos por estágio de maturidade, inicializa tudo com zero
  const [stageCounts, setStageCounts] = useState({
    Novilhas: 0,
    Vacas: 0,
    Touros: 0,
    Bezerros: 0,
  });

  // Estatísticas gerais do rebanho divididas entre ativos e descartados
  const [stats, setStats] = useState({
    active: {
      total: 0,
      females: 0,
      males: 0,
      buffalos: [], // lista completa dos búfalos ativos
    },
    discarded: {
      total: 0,
      females: 0,
      males: 0,
    },
  });

  // Contagem de búfalos por raça (objeto com chave = raça, valor = quantidade)
  const [breedCounts, setBreedCounts] = useState({});

  // Lista completa dos búfalos ativos, com todos os dados detalhados
  const [buffalos, setBuffalos] = useState([]);

  // 3. Constantes fixas
  // Definição dos estágios de maturidade e suas cores para visualização
  const maturidades = [
    { label: "Novilhas", cor: "#f59e0b" },
    { label: "Vacas", cor: "#f59e0b" },
    { label: "Touros", cor: "#f59e0b" },
    { label: "Bezerros", cor: "#f59e0b" },
  ];

  // Define quantos itens (búfalos) mostrar por página
  const itensPorPagina = 5;

  // 4. Hook que executa uma função assíncrona assim que o componente monta
  useEffect(() => {
    async function loadStats() {
      try {
        // Chama API para buscar as estatísticas dos búfalos
        const dados = await fetchBuffaloStats();

        // Atualiza contagem por estágio, ou zera se API não retornar dados
        setStageCounts(
          dados.stageCounts || {
            Novilhas: 0,
            Vacas: 0,
            Touros: 0,
            Bezerros: 0,
          }
        );

        // Atualiza estatísticas gerais (ativos e descartados), com fallback vazio
        setStats(
          dados || {
            active: { total: 0, females: 0, males: 0, buffalos: [] },
            discarded: { total: 0, females: 0, males: 0 },
          }
        );

        // Atualiza contagem por raça, ou objeto vazio
        setBreedCounts(dados.breedCounts || {});

        // Atualiza lista completa de búfalos ativos
        setBuffalos(dados.active?.buffalos || []);
      } catch (error) {
        // Em caso de erro na API, loga e zera todos os estados para evitar bugs
        console.error("Erro ao carregar dados dos búfalos:", error);
        setStageCounts({
          Novilhas: 0,
          Vacas: 0,
          Touros: 0,
          Bezerros: 0,
        });
        setStats({
          active: { total: 0, females: 0, males: 0, buffalos: [] },
          discarded: { total: 0, females: 0, males: 0 },
        });
        setBreedCounts({});
        setBuffalos([]);
      }
    }
    loadStats();
  }, []); // Array vazio garante que roda só uma vez na montagem

  // 5. Cálculos derivados e paginação
  // Soma o total de búfalos nos estágios, para estatísticas gerais
  const total = Object.values(stageCounts).reduce((a, b) => a + b, 0);

  // Pega total de fêmeas e machos ativos, ou zero caso não existam dados
  const females = stats.active?.females || 0;
  const males = stats.active?.males || 0;

  // Total de búfalos por sexo, evita divisão por zero somando 1 quando zero
  const totalSexos = females + males || 1;

  // Soma total de búfalos por raça
  const totalBreeds = Object.values(breedCounts).reduce((a, b) => a + b, 0);

  // Estado para controlar a página atual na paginação da lista de búfalos
  const [paginaAtual, setPaginaAtual] = useState(1);

  // Calcula índice inicial do slice para pegar os búfalos da página atual
  const inicio = (paginaAtual - 1) * itensPorPagina;

  // Calcula índice final para o slice da página atual
  const fim = inicio + itensPorPagina;

  // Fatia o array de búfalos para mostrar só os da página atual
  const buffalosPaginados = buffalos.slice(inicio, fim);

  // Calcula total de páginas baseado na quantidade total e itens por página
  const totalPaginas = Math.ceil(buffalos.length / itensPorPagina);

  return (
    <div className="p-6 flex flex-col items-center gap-8">
      {/* Gestão do rebanho section */}
      <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
        <div className="mb-4">
          <h1 className="text-2xl font-bold m-0 leading-tight text-black">
            Gestão do rebanho
          </h1>
          <p className="mt-1 text-base text-black">
            Gerencie seu rebanho de búfalos, registre informações zootecnicas e
            sanitárias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Maturidade do rebanho */}
          <div className="bg-white rounded-lg shadow border border-[#e0e0e0] h-full">
            <div className="p-4 pb-2">
              <h2 className="text-lg font-medium m-0 text-black">
                Maturidade do rebanho
              </h2>
              <p className="text-sm text-black mt-1">
                Distribuição por estágio
              </p>
            </div>
            <div className="p-4">
              <div className="flex flex-col gap-4">
                {maturidades.map(({ label, cor }) => {
                  const count = stageCounts[label] || 0;
                  const percent = total > 0 ? (count / total) * 100 : 0;

                  return (
                    <div key={label}>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-black">{label}</span>
                        <span className="font-medium text-black">{count}</span>
                      </div>
                      <div className="w-full h-2.5 bg-black-100 rounded-full mt-2">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${percent}%`,
                            backgroundColor: cor,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sexo */}
          <div className="bg-white rounded-lg shadow border border-[#e0e0e0] h-full">
            <div className="p-4 pb-2">
              <h2 className="text-lg font-medium m-0 text-black">Sexo</h2>
              <p className="text-sm text-black mt-1">Distribuição por sexo</p>
            </div>
            <div className="p-4">
              <div className="flex flex-col gap-4">
                {/* Fêmeas */}
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-black flex items-center">
                      <FaVenus className="text-[#f59e0b] mr-1" size={14} />
                      Fêmeas
                    </span>
                    <span className="font-medium text-black">{females}</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full mt-2">
                    <div
                      className="h-full bg-[#f59e0b] rounded-full"
                      style={{
                        width: `${((females / totalSexos) * 100).toFixed(0)}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Machos */}
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-black flex items-center">
                      <FaMars className="text-[#f59e0b] mr-1" size={14} />
                      Machos
                    </span>
                    <span className="font-medium text-black">{males}</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full mt-2">
                    <div
                      className="h-full bg-[#f59e0b] rounded-full"
                      style={{
                        width: `${((males / totalSexos) * 100).toFixed(0)}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Total */}
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-black">Total</span>
                    <span className="font-medium text-black">{totalSexos}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Raças */}
          <div className="bg-white rounded-lg shadow border border-[#e0e0e0] h-full">
            <div className="p-4 pb-2">
              <h2 className="text-lg font-medium m-0 text-black">Raças</h2>
              <p className="text-sm text-black mt-1">Distribuição do rebanho</p>
            </div>
            <div className="p-4">
              <div className="flex flex-col gap-4">
                {Object.entries(breedCounts).map(([breed, count]) => {
                  const widthPercent =
                    ((count / totalBreeds) * 100).toFixed(0) + "%";
                  return (
                    <div key={breed}>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-black">{breed}</span>
                        <span className="font-medium text-black">{count}</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full mt-2">
                        <div
                          className="h-full bg-[#f59e0b] rounded-full"
                          style={{ width: widthPercent }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buffalo Records section */}
      <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-black">Registro de Búfalos</h1>
          <p className="text-black">
            Lista completa do rebanho com {buffalos.length} búfalo
            {buffalos.length !== 1 ? "s" : ""}(as).
          </p>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse min-w-[650px] bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-[#f0f0f0]">
              <tr>
                <th className="p-3 text-center font-medium text-black text-base">
                  TAG
                </th>
                <th className="p-3 text-center font-medium text-black text-base">
                  Nome
                </th>
                <th className="p-3 text-center font-medium text-black text-base">
                  Peso (kg)
                </th>
                <th className="p-3 text-center font-medium text-black text-base">
                  Raça
                </th>
                <th className="p-3 text-center font-medium text-black text-base">
                  Sexo
                </th>
                <th className="p-3 text-center font-medium text-black text-base">
                  Última Atualização
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
              {buffalosPaginados.length > 0 ? (
                buffalosPaginados.map((b, idx) => {
                  const lastActivity = b.atividade?.[b.atividade.length - 1];
                  const status = lastActivity?.status || "Desconhecido";
                  const isActive = status === "Ativa";

                  const lastUpdateDate = lastActivity?.dataAtualizacao
                    ? new Date(lastActivity.dataAtualizacao).toLocaleDateString(
                        "pt-BR"
                      )
                    : "—";

                  const peso = b.zootecnico?.[0]?.peso ?? "—";

                  return (
                    <tr
                      key={b._id || idx}
                      className={idx % 2 === 0 ? "bg-[#fafafa]" : "bg-white"}
                    >
                      <td className="p-3 text-center text-black text-base">
                        {b.tag || "—"}
                      </td>
                      <td className="p-3 text-center text-black text-base">
                        {b.nome || "—"}
                      </td>
                      <td className="p-3 text-center text-black text-base">
                        {peso}
                      </td>
                      <td className="p-3 text-center text-black text-base">
                        {b.raca || "Desconhecida"}
                      </td>
                      <td className="p-3 text-center text-black text-base">
                        {b.sexo || "—"}
                      </td>
                      <td className="p-3 text-center text-black text-base">
                        {lastUpdateDate}
                      </td>
                      <td className="p-3 text-center text-black text-base">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {isActive ? "Ativo" : "Inativo"}
                        </span>
                      </td>
                      <td className="p-3 text-center text-base">
                        <button
                          onClick={() => {
                            setBufaloSelecionado({
                              tag: b.tag || "—",
                              nome: b.nome || "—",
                              raca: b.raca || "Desconhecida",
                              sexo: b.sexo || "—",
                              maturidade: b.maturidade || "—",
                              peso: b.zootecnico?.[0]?.peso ?? "—",
                              status:
                                lastActivity?.status === "Ativa"
                                  ? "Ativo"
                                  : "Inativo",
                              ultimaAtualizacao: lastActivity?.dataAtualizacao
                                ? new Date(
                                    lastActivity.dataAtualizacao
                                  ).toLocaleDateString("pt-BR")
                                : "—",
                              localizacao: b.localizacao || "—",
                              historico: {
                                zootecnico: b.zootecnico || [],
                                sanitario: b.sanitario || [],
                              },
                            });
                            setModalAberto(true);
                          }}
                          className="bg-[#FFCF78] border-none text-black py-2 px-3.5 rounded-lg cursor-pointer text-sm font-bold hover:bg-[#f39c12] transition-colors"
                        >
                          Ver detalhes
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-gray-500">
                    Nenhum búfalo encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Controles de paginação */}
          <div className="flex justify-center mt-4 gap-2">
            <button
              onClick={() => setPaginaAtual((p) => Math.max(p - 1, 1))}
              disabled={paginaAtual === 1}
              className="px-3 py-1 bg-yellow-500 rounded disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold hover:bg-yellow-600 transition-colors"
            >
              Anterior
            </button>
            <span className="px-3 py-1 text-black font-semibold">
              Página {paginaAtual} de {totalPaginas}
            </span>
            <button
              onClick={() =>
                setPaginaAtual((p) => Math.min(p + 1, totalPaginas))
              }
              disabled={paginaAtual === totalPaginas}
              className="px-3 py-1 bg-yellow-500 rounded disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold hover:bg-yellow-600 transition-colors"
            >
              Próximo
            </button>
          </div>
        </div>
      </div>

      {/* Doenças Recorrentes section */}
      <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Doenças recorrentes */}
          <div className="bg-white rounded-lg shadow border border-[#e0e0e0] p-5">
            <h2 className="text-xl font-semibold text-black m-0">
              Doenças recorrentes
            </h2>
            <p className="text-sm text-black mt-1 mb-6">
              Doenças recorrentes registradas
            </p>

            <div className="flex flex-col gap-4">
              {[
                { nome: "Brucelose", percentual: 14.2 },
                { nome: "Mastite", percentual: 11.8 },
                { nome: "Febre Aftosa", percentual: 9.5 },
                { nome: "Tuberculose", percentual: 7.3 },
                { nome: "Dermatite", percentual: 6.1 },
              ].map((doenca, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-black">
                      {doenca.nome}
                    </span>
                    <span className="text-sm font-medium text-black">
                      {doenca.percentual.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full h-6 bg-black-100 rounded overflow-hidden">
                    <div
                      className="h-full bg-[#f59e0b] rounded flex items-center justify-end pr-2"
                      style={{ width: `${doenca.percentual}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Doenças recorrentes por nível de maturidade */}
          <div className="bg-white rounded-lg shadow border border-[#e0e0e0] p-5">
            <h2 className="text-xl font-semibold text-black m-0">
              Doenças recorrentes por nível de maturidade
            </h2>
            <p className="text-sm text-black mt-1 mb-6">
              Doenças recorrentes registradas
            </p>

            <div className="flex flex-col gap-4">
              {[
                { categoria: "Bezerros", percentual: 45.0 },
                { categoria: "Novilhos", percentual: 20.0 },
                { categoria: "Adultos", percentual: 30.0 },
                { categoria: "Idosos", percentual: 5.0 },
              ].map((item, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-black">
                      {item.categoria}
                    </span>
                    <span className="text-sm font-medium text-black">
                      {item.percentual.toFixed(2)}%
                    </span>
                  </div>
                  <div className="w-full h-6 bg-black-100 rounded overflow-hidden">
                    <div
                      className="h-full bg-[#f59e0b] rounded flex items-center justify-end pr-2"
                      style={{ width: `${item.percentual}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999] p-4">
          <div className="bg-[#f8fbf7] rounded-lg p-5 w-full max-w-[900px] shadow-xl text-black max-h-[90vh] overflow-auto">
            <h2 className="text-xl font-bold mb-1">
              Prontuário: <span>{bufaloSelecionado.nome}</span> (
              {bufaloSelecionado.tag})
            </h2>
            <p className="text-sm mb-4">
              Informações detalhadas e histórico animal
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              {/* Informações gerais */}
              <div className="bg-white p-4 rounded-xl shadow border border-[#e0e0e0] w-full md:w-[280px] text-black">
                <h3 className="text-base font-semibold mb-3 pb-1 border-b border-black-100">
                  Informações gerais
                </h3>
                <p className="text-left text-[0.85rem] mb-2 leading-relaxed">
                  <strong className="text-black">TAG:</strong>{" "}
                  {bufaloSelecionado.tag}
                </p>
                <p className="text-left text-[0.85rem] mb-2 leading-relaxed">
                  <strong className="text-black">Nome:</strong>{" "}
                  {bufaloSelecionado.nome}
                </p>
                <p className="text-left text-[0.85rem] mb-2 leading-relaxed">
                  <strong className="text-black">Raça:</strong>{" "}
                  {bufaloSelecionado.raca}
                </p>
                <p className="text-left text-[0.85rem] mb-2 leading-relaxed">
                  <strong className="text-black">Sexo:</strong>{" "}
                  {bufaloSelecionado.sexo}
                </p>
                <p className="text-left text-[0.85rem] mb-2 leading-relaxed">
                  <strong className="text-black">Maturidade:</strong>{" "}
                  {bufaloSelecionado.maturidade}
                </p>
                <p className="text-left text-[0.85rem] mb-2 leading-relaxed">
                  <strong className="text-black">Peso atual:</strong>{" "}
                  {bufaloSelecionado.peso} kg
                </p>
                <p className="text-left text-[0.85rem] mb-2 leading-relaxed">
                  <strong className="text-black">Status:</strong>{" "}
                  <span className="text-green-600 font-semibold">
                    {bufaloSelecionado.status}
                  </span>
                </p>
                <p className="text-left text-[0.85rem] mb-2 leading-relaxed">
                  <strong className="text-black">Última Atualização:</strong>{" "}
                  {bufaloSelecionado.ultimaAtualizacao}
                </p>
                <p className="text-left text-[0.85rem] mb-2 leading-relaxed">
                  <strong className="text-black">Localização:</strong>{" "}
                  {bufaloSelecionado.localizacao}
                </p>
              </div>

              {/* Histórico de registros */}
              <div className="bg-white rounded-lg p-4 flex-1 shadow border border-[#e0e0e0] text-black">
                <div className="flex justify-between items-center mb-3 border-b border-black-100 pb-1">
                  <h3 className="text-base font-semibold">
                    Históricos de Registros
                  </h3>
                  <div className="flex gap-2">
                    <button
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                        abaAtiva === "zootecnico"
                          ? "bg-[#f2b84d] text-[#5c4b35]"
                          : "bg-black-100 text-black hover:bg-black-200"
                      }`}
                      onClick={() => setAbaAtiva("zootecnico")}
                    >
                      Zootécnico
                    </button>
                    <button
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                        abaAtiva === "sanitario"
                          ? "bg-[#f2b84d] text-[#5c4b35]"
                          : "bg-black-100 text-black hover:bg-black-200"
                      }`}
                      onClick={() => setAbaAtiva("sanitario")}
                    >
                      Sanitário
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto">
                  {(bufaloSelecionado.historico[abaAtiva]?.length ?? 0) ===
                    0 && <p className="p-2">Nenhum registro encontrado.</p>}

                  {bufaloSelecionado.historico[abaAtiva]?.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white p-3 rounded-lg border border-black-200 shadow-sm text-left text-black"
                    >
                      <div className="flex justify-between items-center mb-1.5 text-[0.8rem] border-b border-black-100 pb-1.5">
                        <span>
                          {abaAtiva === "zootecnico"
                            ? new Date(item.dataAtualizacao).toLocaleDateString(
                                "pt-BR"
                              )
                            : new Date(item.dataAplicacao).toLocaleDateString(
                                "pt-BR"
                              )}
                        </span>
                        <strong>
                          {/* (aqui precisa puxar o nome do funcionario responsavel no lugar do id dele, precisa puxar um service users para isso) */}
                          aqui deve puxar o nome do func:{" "}
                          {item.funcionarioResponsavel?.[0] || "—"}
                        </strong>
                      </div>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        {abaAtiva === "zootecnico" ? (
                          <>
                            <p className="text-[0.85rem]">
                              <strong>Peso:</strong> {item.peso} kg
                            </p>
                            <p className="text-[0.85rem]">
                              <strong>Condição corporal:</strong>{" "}
                              {item.condicaoCorporal}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-[0.85rem]">
                              <strong>Medicamento:</strong>{" "}
                              {item.medicacaoAplicada}
                            </p>
                            <p className="text-[0.85rem]">
                              <strong>Dosagem:</strong> {item.dosagem}{" "}
                              {item.unidadeMedidaDosagem}
                            </p>
                            <p className="text-[0.85rem]">
                              <strong>Doença:</strong> {item.doencaCombatida}
                            </p>
                            <p className="text-[0.85rem]">
                              <strong>Data de Retorno:</strong>{" "}
                              {new Date(item.dataRetorno).toLocaleDateString(
                                "pt-BR"
                              )}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-right mt-4">
              <button
                className="bg-[#fae7d6] text-[#5c4b35] px-4 py-2 rounded-md text-sm font-bold cursor-pointer hover:bg-[#f2b84d] transition-colors"
                onClick={() => setModalAberto(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Rebanho.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
