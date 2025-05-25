import { apiFetch } from "@/config/ApiConnection";

export async function getAllLots() {
  try {
    const response = await apiFetch("/lots");
    const lots = response.lots || [];  
    console.log(`✅ getAllLots: ${lots.length} lotes encontrados`);
    return lots;  
  } catch (error) {
    console.error("❌ Erro no getAllLots:", error);
    return [];
  }
}

export async function getLotById(id) {
  try {
    const data = await apiFetch(`/lot/${id}`);
    console.log(`✅ getLotById: lote ${id} encontrado`);
    return data;
  } catch (error) {
    console.error(`❌ Erro no getLotById: ${id}`, error);
    return null;
  }
}

export async function createLot(lotData) {
  try {
    const data = await apiFetch("/lot", {
      method: "POST",
      body: JSON.stringify(lotData),
      headers: { "Content-Type": "application/json" },
    });
    console.log(`✅ createLot: lote criado`);
    return data;
  } catch (error) {
    console.error("❌ Erro no createLot:", error);
    return null;
  }
}

export async function updateLot(id, lotData) {
  try {
    const data = await apiFetch(`/lot/${id}`, {
      method: "PUT",
      body: JSON.stringify(lotData),
      headers: { "Content-Type": "application/json" },
    });
    console.log(`✅ updateLot: lote ${id} atualizado`);
    return data;
  } catch (error) {
    console.error(`❌ Erro no updateLot: ${id}`, error);
    return null;
  }
}

export async function deleteLot(id) {
  try {
    await apiFetch(`/lot/${id}`, { method: "DELETE" });
    console.log(`✅ deleteLot: lote ${id} deletado`);
    return true;
  } catch (error) {
    console.error(`❌ Erro no deleteLot: ${id}`, error);
    return false;
  }
}
