import { getAllProductions } from "@/services/productionService";

export async function fetchProductionStats() {
  try {
    const productions = await getAllProductions();
    console.log("📊 Estatísticas de Produção:", productions);

    const totalProduzido = productions.reduce((acc, p) => acc + (p.totalProduzido || 0), 0);
    console.log("🔥 Total Produzido:", totalProduzido);

    return productions;
  } catch (error) {
    console.error("❌ Erro ao buscar estatísticas de produção:", error);
    return [];
  }
}
