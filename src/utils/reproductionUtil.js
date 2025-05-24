import { getAllReproductions } from "@/services/reproductionService";

export async function fetchReproductionStats() {
  try {
    const reproductions = await getAllReproductions();

    if (!reproductions.length) {
      console.log("⚠️ Nenhuma reprodução encontrada");
      return {};
    }

    // Total de reproduções
    const totalReproductions = reproductions.length;

    // Contagem por status (ex: Prenha, Finalizada)
    const countByStatus = reproductions.reduce((acc, rep) => {
      const key = rep.status || "Indefinido";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    // Contagem por tipo de inseminação (ex: Artificial, Monta Natural)
    const countByTipoInseminacao = reproductions.reduce((acc, rep) => {
      const key = rep.tipoInseminacao || "Indefinido";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    // Datas de inseminação (ordenadas)
    const datasInseminacao = reproductions
      .map((rep) => rep.dataInseminacao)
      .filter(Boolean)
      .sort();

    const stats = {
      totalReproductions,
      countByStatus,
      countByTipoInseminacao,
      datasInseminacao,
    };

    console.log("📊 Estatísticas de Reprodução:", stats);
    return stats;
  } catch (error) {
    console.error("❌ Erro ao buscar estatísticas de reprodução:", error);
    return {};
  }
}
