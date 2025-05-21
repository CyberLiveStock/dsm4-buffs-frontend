// src/services/buffaloService.js
import { apiFetch } from "@/config/ApiConnection";

export async function getAllBuffalos() {
  try {
    const data = await apiFetch("/buffalos");
    const buffaloArray = Array.isArray(data) ? data : data.buffalos;
    console.log(`✅ getAllBuffalos: ${buffaloArray.length} búfalos encontrados`);
    return buffaloArray;
  } catch (error) {
    console.error("❌ Erro no getAllBuffalos:", error);
    return [];
  }
}
