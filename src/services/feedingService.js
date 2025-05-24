import { apiFetch } from "@/config/ApiConnection";

export async function getAllFeedings() {
  try {
    const data = await apiFetch("/feedings");
    console.log(`✅ getAllFeedings: ${data.length} alimentações encontradas`);
    return data;
  } catch (error) {
    console.error("❌ Erro no getAllFeedings:", error);
    return [];
  }
}
 
export async function getFeedingById(id) {
  try {
    const data = await apiFetch(`/feeding/${id}`);
    console.log(`✅ getFeedingById: alimentação ${id} encontrada`);
    return data;
  } catch (error) {
    console.error(`❌ Erro no getFeedingById: ${id}`, error);
    return null;
  }
}

export async function createFeeding(feedingData) {
  try {
    const data = await apiFetch("/feeding", {
      method: "POST",
      body: JSON.stringify(feedingData),
      headers: { "Content-Type": "application/json" },
    });
    console.log("✅ createFeeding: alimentação criada");
    return data;
  } catch (error) {
    console.error("❌ Erro no createFeeding:", error);
    return null;
  }
}

export async function updateFeeding(id, feedingData) {
  try {
    const data = await apiFetch(`/feeding/${id}`, {
      method: "PUT",
      body: JSON.stringify(feedingData),
      headers: { "Content-Type": "application/json" },
    });
    console.log(`✅ updateFeeding: alimentação ${id} atualizada`);
    return data;
  } catch (error) {
    console.error(`❌ Erro no updateFeeding: ${id}`, error);
    return null;
  }
}

export async function deleteFeeding(id) {
  try {
    await apiFetch(`/feeding/${id}`, { method: "DELETE" });
    console.log(`✅ deleteFeeding: alimentação ${id} deletada`);
    return true;
  } catch (error) {
    console.error(`❌ Erro no deleteFeeding: ${id}`, error);
    return false;
  }
}
