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

    console.log(
      `🐃 Ativos: ${totalActive} (F: ${femaleCount}, M: ${maleCount})`
    );
    console.log(
      `🚫 Descartados: ${totalDiscarded} (F: ${discardedFemales}, M: ${discardedMales})`
    );

    return {
      active: {
        total: totalActive,
        females: femaleCount,
        males: maleCount,
      },
      discarded: {
        total: totalDiscarded,
        females: discardedFemales,
        males: discardedMales,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar búfalos:", error);
    return {
      active: {
        total: 0,
        females: 0,
        males: 0,
      },
      discarded: {
        total: 0,
        females: 0,
        males: 0,
      },
    };
  }
}
