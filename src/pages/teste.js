import { useEffect } from "react";
import { getAllLactations } from "@/services/lactationService";

export default function LactationConsole() {
  useEffect(() => {
    async function loadLactations() {
      const response = await getAllLactations();
      console.log("📊 Lactações recebidas:", response);
    }
    loadLactations();
  }, []);

  return null; // Não renderiza nada na tela
}
