import { useEffect } from "react";
import { fetchFeedingStats } from "@/utils/feedingUtil";
import { fetchLactationStats } from "@/utils/lactationUtil";
import { fetchLotStats } from "@/utils/lotUtil";
import { fetchProductionStats } from "@/utils/productionUtil";
import { fetchPropertyStats } from "@/utils/propertyUtil";
import { fetchReproductionStats } from "@/utils/reproductionUtil"; // ✅ novo util de reprodução
import { fetchUserStats } from "@/utils/userUtil";               // ✅ util de usuário

export default function Teste() {
  useEffect(() => {
    const loadStats = async () => {
      await fetchFeedingStats();       // já faz console.log
      await fetchLactationStats();     // já faz console.log
      await fetchLotStats();           // já faz console.log
      await fetchProductionStats();    // já faz console.log
      await fetchPropertyStats();      // já faz console.log
      await fetchReproductionStats();  // já faz console.log
      await fetchUserStats();          // já faz console.log
    };

    loadStats();
  }, []);

  return null; // só console, nada renderizado
}
