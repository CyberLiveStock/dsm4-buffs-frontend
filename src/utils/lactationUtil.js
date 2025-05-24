import { getAllLactations } from "@/services/lactationService";

export async function fetchLactationStats() {
  try {
    const response = await getAllLactations();
    const lactations = response.lactations || [];

    let totalProduzido = 0;
    const producaoPorBufala = {};
    const metricasPorBufala = {};

    lactations.forEach((lact) => {
      const tag = lact.tagBufala;
      const metricas = lact.metrica || [];

      metricasPorBufala[tag] = metricas.length;

      metricas.forEach((m) => {
        totalProduzido += m.quantidade;
        producaoPorBufala[tag] = (producaoPorBufala[tag] || 0) + m.quantidade;
      });
    });

    const totalBufalas = lactations.length;
    const mediaPorBufala = totalBufalas > 0 ? totalProduzido / totalBufalas : 0;

    console.log("🧪 Estatísticas de Lactações:");
    console.log("🐃 Total de búfalas:", totalBufalas);
    console.log("🍼 Produção total de leite (L):", totalProduzido.toFixed(2));
    console.log("📊 Produção por búfala:", producaoPorBufala);
    console.log("📈 Média por búfala (L):", mediaPorBufala.toFixed(2));
    console.log("🔢 Métricas por búfala:", metricasPorBufala);

    return {
      totalBufalas,
      totalProduzido,
      producaoPorBufala,
      mediaPorBufala,
      metricasPorBufala,
      lactations, 
    };
  } catch (error) {
    console.error("❌ Erro ao buscar estatísticas de lactações:", error);
    return {
      totalBufalas: 0,
      totalProduzido: 0,
      producaoPorBufala: {},
      mediaPorBufala: 0,
      metricasPorBufala: {},
      lactations: [],
    };
  }
}
