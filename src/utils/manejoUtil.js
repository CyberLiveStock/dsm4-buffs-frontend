import { getAllLots } from "@/services/lotService";
import { getAllBuffalos } from "@/services/buffaloService";
import { getAllProperties } from "@/services/propertyService";

export async function fetchManejoStats() {
  try {
    const [lots, buffalos, properties] = await Promise.all([
      getAllLots(),
      getAllBuffalos(),
      getAllProperties(),
    ]);

    // Estatísticas dos lotes (piquetes)
    const totalLotes = lots.length;
    const lotesAtivos = lots.filter((lot) => lot.status === "Em uso").length;
    const lotesInativos = lots.filter((lot) => lot.status !== "Em uso").length;

    // Capacidade total dos lotes
    const capacidadeTotal = lots.reduce(
      (sum, lot) => sum + (lot.qtdComporta || 0),
      0
    );
    const areaTotal = lots.reduce(
      (sum, lot) => sum + (lot.tamanhoArea || 0),
      0
    );

    // Estatísticas dos búfalos
    const totalBuffalos = buffalos.length;
    const buffalosPorLocalizacao = buffalos.reduce((acc, buffalo) => {
      const loc = buffalo.localizacao || "Não informado";
      acc[loc] = (acc[loc] || 0) + 1;
      return acc;
    }, {});

    // Búfalos por sexo
    const machos = buffalos.filter((b) => b.sexo === "Macho").length;
    const femeas = buffalos.filter((b) => b.sexo === "Fêmea").length;

    // Búfalos por maturidade
    const buffalosPorMaturidade = buffalos.reduce((acc, buffalo) => {
      const mat = buffalo.maturidade || "Não informado";
      acc[mat] = (acc[mat] || 0) + 1;
      return acc;
    }, {});

    // Estatísticas das propriedades
    const totalPropriedades = properties.length;
    const propriedadesPorFinalidade = properties.reduce((acc, prop) => {
      const fin = prop.finalidade || "Não informado";
      acc[fin] = (acc[fin] || 0) + 1;
      return acc;
    }, {});

    console.log("📊 Estatísticas de Manejo:");
    console.log("🏠 Lotes:", {
      totalLotes,
      lotesAtivos,
      lotesInativos,
      capacidadeTotal,
      areaTotal,
    });
    console.log("🐃 Búfalos:", {
      totalBuffalos,
      machos,
      femeas,
      buffalosPorMaturidade,
    });
    console.log("🏢 Propriedades:", {
      totalPropriedades,
      propriedadesPorFinalidade,
    });

    return {
      lotes: {
        total: totalLotes,
        ativos: lotesAtivos,
        inativos: lotesInativos,
        capacidadeTotal,
        areaTotal,
        dados: lots,
      },
      buffalos: {
        total: totalBuffalos,
        machos,
        femeas,
        porLocalizacao: buffalosPorLocalizacao,
        porMaturidade: buffalosPorMaturidade,
        dados: buffalos,
      },
      propriedades: {
        total: totalPropriedades,
        porFinalidade: propriedadesPorFinalidade,
        dados: properties,
      },
    };
  } catch (error) {
    console.error("❌ Erro ao buscar estatísticas de manejo:", error);
    return {
      lotes: {
        total: 0,
        ativos: 0,
        inativos: 0,
        capacidadeTotal: 0,
        areaTotal: 0,
        dados: [],
      },
      buffalos: {
        total: 0,
        machos: 0,
        femeas: 0,
        porLocalizacao: {},
        porMaturidade: {},
        dados: [],
      },
      propriedades: { total: 0, porFinalidade: {}, dados: [] },
    };
  }
}

export function getStatusColor(status) {
  const colorMap = {
    "Em uso": "bg-[#9DFFBE] text-black",
    Ativo: "bg-[#9DFFBE] text-black",
    Inativo: "bg-[#FF9D9F] text-black",
    Disponível: "bg-[#9DFFBE] text-black",
    Manutenção: "bg-[#ffcc0084] text-black",
  };

  return colorMap[status] || "bg-gray-100 text-gray-800";
}

export function formatStatus(status) {
  const statusMap = {
    "Em uso": "Ativo",
    Ativo: "Ativo",
    Inativo: "Inativo",
    Disponível: "Disponível",
    Manutenção: "Manutenção",
  };

  return statusMap[status] || status;
}

// Função para calcular ocupação de um lote
export function calcularOcupacao(lote, buffalos) {
  if (!lote || !buffalos) return 0;

  // Contar búfalos que estão neste lote (baseado na localização)
  const buffalosNoLote = buffalos.filter((buffalo) => {
    // Assumindo que a localização do búfalo pode referenciar o nome do lote
    return (
      buffalo.localizacao === lote.nomeLote || buffalo.grupo === lote.nomeLote
    );
  });

  return buffalosNoLote.length;
}

// Função para obter búfalos de um lote específico
export function getBuffalosDoLote(lote, buffalos) {
  if (!lote || !buffalos) return [];

  return buffalos.filter((buffalo) => {
    return (
      buffalo.localizacao === lote.nomeLote || buffalo.grupo === lote.nomeLote
    );
  });
}

// Função para calcular idade aproximada baseada na maturidade
export function calcularIdadeAproximada(maturidade) {
  const idadeMap = {
    Bezerro: "6 meses - 1 ano",
    Novilha: "1 - 3 anos",
    Vaca: "3+ anos",
    Touro: "2+ anos",
  };

  return idadeMap[maturidade] || "Não informado";
}

// Função para obter peso aproximado do último registro zootécnico
export function obterPesoAtual(buffalo) {
  if (!buffalo.zootecnico || buffalo.zootecnico.length === 0) {
    return "Não informado";
  }

  // Pegar o registro mais recente
  const ultimoRegistro = buffalo.zootecnico[buffalo.zootecnico.length - 1];
  return ultimoRegistro.peso ? `${ultimoRegistro.peso} kg` : "Não informado";
}
