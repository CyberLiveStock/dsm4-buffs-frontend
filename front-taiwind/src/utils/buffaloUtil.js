import { getAllBuffalos } from "@/services/buffaloService.js";

export async function fetchBuffaloStats() {
  try {
    const buffalos = await getAllBuffalos();

    const activeBuffalos = [];
    const discardedBuffalos = [];

    buffalos.forEach((b) => {
      const lastActivity = b.atividade?.[b.atividade.length - 1];
      const isDiscarded = lastActivity?.status === "Descartado";

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

    // Contagem por maturidade, campo vindo da API
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

    // Contagem por raça (breed)
    const breedCounts = {};
    activeBuffalos.forEach((b) => {
      const breed = b.raca || "Desconhecida";
      if (!breedCounts[breed]) {
        breedCounts[breed] = 0;
      }
      breedCounts[breed]++;
    });

    console.log(
      `🐃 Ativos: ${totalActive} (F: ${femaleCount}, M: ${maleCount})`
    );
    console.log(
      `🚫 Descartados: ${totalDiscarded} (F: ${discardedFemales}, M: ${discardedMales})`
    );
    console.log("📊 Maturidade do rebanho:", stageCounts);
    console.log("🐂 Raças do rebanho:", breedCounts);
    console.log("📋 Dados completos dos búfalos ativos:", activeBuffalos);
    console.log(
      "📋 Dados completos dos búfalos descartados:",
      discardedBuffalos
    );

    return {
      active: {
        total: totalActive,
        females: femaleCount,
        males: maleCount,
        buffalos: activeBuffalos, // <-- Aqui, o array completo dos búfalos ativos
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
        buffalos: [], // array vazio para manter consistência
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
