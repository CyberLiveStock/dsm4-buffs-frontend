// utils/fetchFeedingStats.js

import { getAllFeedings } from "@/services/feedingService";

export async function fetchFeedingStats() {
  try {
    const response = await getAllFeedings();
    const feedings = response.feedings || []; // <- Garantindo que seja um array

    const total = feedings.length;

    const tipoCounts = {};
    const grupoCounts = {};
    let totalQuantidade = 0;

    feedings.forEach((f) => {
      // Tipo de alimentação (ex: "Sólido", "Líquido")
      tipoCounts[f.tpAlimentacao] = (tipoCounts[f.tpAlimentacao] || 0) + 1;

      // Grupo destinado (ex: "Secagem", "Engorda", etc.)
      grupoCounts[f.grupoDestinado] = (grupoCounts[f.grupoDestinado] || 0) + 1;

      // Soma total da quantidade
      totalQuantidade += f.quantidade;
    });

    const mediaQuantidade = total > 0 ? totalQuantidade / total : 0;

    console.log("📦 Estatísticas de Alimentações:");
    console.log("🔢 Total:", total);
    console.log("📊 Por tipo:", tipoCounts);
    console.log("📈 Por grupo:", grupoCounts);
    console.log("⚖️ Média de quantidade:", mediaQuantidade.toFixed(2));

    return {
      total,
      tipoCounts,
      grupoCounts,
      mediaQuantidade,
      feedings, 
    };
  } catch (error) {
    console.error("❌ Erro ao buscar estatísticas de alimentações:", error);
    return {
      total: 0,
      tipoCounts: {},
      grupoCounts: {},
      mediaQuantidade: 0,
      feedings: [],
    };
  }
}
