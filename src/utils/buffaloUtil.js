import { getAllBuffalos } from "@/services/buffaloService.js";
import { fetchUserStats } from "@/utils/userUtil.js";

export async function fetchBuffaloStats() {
  try {
    const [buffalos, usuarios] = await Promise.all([
      getAllBuffalos(),
      fetchUserStats(),
    ]);

    const mapaUsuarios = {};
    if (Array.isArray(usuarios)) {
      usuarios.forEach((u) => {
        mapaUsuarios[u._id] = u.nome;
      });
    }

    const activeBuffalos = [];
    const discardedBuffalos = [];

    buffalos.forEach((b) => {
      const lastActivity = b.atividade?.[b.atividade.length - 1];
      const isDiscarded = lastActivity?.status === "Descartado";

      // Substitui o array funcionarioResponsavel pelo array com nome(s)
      ["zootecnico", "sanitario"].forEach((tipo) => {
        const registros = b.historico?.[tipo];
        if (Array.isArray(registros)) {
          registros.forEach((registro) => {
            const id = registro.funcionarioResponsavel?.[0];
            registro.funcionarioResponsavel = [mapaUsuarios[id] || "Desconhecido"];
          });
        }
      });

      if (isDiscarded) {
        discardedBuffalos.push(b);
      } else {
        activeBuffalos.push(b);
      }
    });

    const totalActive = activeBuffalos.length;
    const totalDiscarded = discardedBuffalos.length;

    const femaleCount = activeBuffalos.filter((b) => b.sexo === "Fêmea").length;
    const maleCount = activeBuffalos.filter((b) => b.sexo === "Macho").length;

    const discardedFemales = discardedBuffalos.filter(
      (b) => b.sexo === "Fêmea"
    ).length;
    const discardedMales = discardedBuffalos.filter(
      (b) => b.sexo === "Macho"
    ).length;

    const stageCounts = {
      Novilhas: 0,
      Vacas: 0,
      Touros: 0,
      Bezerros: 0,
    };

    activeBuffalos.forEach((b) => {
      switch (b.maturidade) {
        case "Novilha":
          stageCounts.Novilhas++;
          break;
        case "Vaca":
          stageCounts.Vacas++;
          break;
        case "Touro":
          stageCounts.Touros++;
          break;
        case "Bezerro":
          stageCounts.Bezerros++;
          break;
        default:
          break;
      }
    });

    const breedCounts = {};
    activeBuffalos.forEach((b) => {
      const breed = b.raca || "Desconhecida";
      breedCounts[breed] = (breedCounts[breed] || 0) + 1;
    });

    return {
      active: {
        total: totalActive,
        females: femaleCount,
        males: maleCount,
        buffalos: activeBuffalos,
      },
      discarded: {
        total: totalDiscarded,
        females: discardedFemales,
        males: discardedMales,
      },
      stageCounts,
      breedCounts,
    };
  } catch (error) {
    console.error("Erro ao buscar búfalos:", error);
    return {
      active: {
        total: 0,
        females: 0,
        males: 0,
        buffalos: [],
      },
      discarded: {
        total: 0,
        females: 0,
        males: 0,
      },
      stageCounts: {
        Novilhas: 0,
        Vacas: 0,
        Touros: 0,
        Bezerros: 0,
      },
      breedCounts: {},
    };
  }
}
