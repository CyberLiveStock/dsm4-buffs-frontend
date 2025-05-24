import { getAllLots } from '@/services/lotService';


export async function fetchLotStats() {
    try {
      const lots = await getAllLots();  
  
      console.log("Array lots recebido:", lots);
  
      if (!Array.isArray(lots) || lots.length === 0) {
        console.log("⚠️ Array lots vazio ou inválido");
        return;
      }
  
      let totalArea = 0;
      let totalComportas = 0;
      const lotsByStatus = {};
      const lotsByFarm = {};
  
      lots.forEach(lot => {
        totalArea += lot.tamanhoArea || 0;
        totalComportas += lot.qtdComporta || 0;
  
        lotsByStatus[lot.status] = (lotsByStatus[lot.status] || 0) + 1;
  
        if (lot.fazenda) {
          if (Array.isArray(lot.fazenda)) {
            lot.fazenda.forEach(farmId => {
              lotsByFarm[farmId] = (lotsByFarm[farmId] || 0) + 1;
            });
          } else {
            lotsByFarm[lot.fazenda] = (lotsByFarm[lot.fazenda] || 0) + 1;
          }
        }
      });
  
      const totalLots = lots.length;
      const avgComportas = totalLots ? totalComportas / totalLots : 0;
  
      console.log("📊 Estatísticas de Lotes:");
      console.log("🏷 Total de lotes:", totalLots);
      console.log("📐 Área total (m²):", totalArea);
      console.log("🚪 Total comportas:", totalComportas);
      console.log("📈 Média comportas por lote:", avgComportas.toFixed(2));
      console.log("📋 Lotes por status:", lotsByStatus);
      console.log("🚜 Lotes por fazenda:", lotsByFarm);
  
      return {
        totalLots,
        totalArea,
        totalComportas,
        avgComportas,
        lotsByStatus,
        lotsByFarm,
        lots,
      };
    } catch (error) {
      console.error("❌ Erro ao buscar estatísticas de lotes:", error);
      return {
        totalLots: 0,
        totalArea: 0,
        totalComportas: 0,
        avgComportas: 0,
        lotsByStatus: {},
        lotsByFarm: {},
        lots: [],
      };
    }
  }
  