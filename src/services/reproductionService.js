import { apiFetch } from "@/config/ApiConnection";

export async function getAllReproductions() {
  try {
    const response = await apiFetch("/reproductions");
    const data = response.reproductions || [];
    console.log(`✅ getAllReproductions: ${data.length} reproduções encontradas`);
    return data;
  } catch (error) {
    console.error("❌ Erro no getAllReproductions:", error);
    return [];
  }
}

export async function getReproductionById(id) {
  try {
    const data = await apiFetch(`/reproduction/${id}`);
    console.log(`✅ getReproductionById: reprodução ${id} encontrada`);
    return data;
  } catch (error) {
    console.error(`❌ Erro no getReproductionById: ${id}`, error);
    return null;
  }
}

export async function createReproduction(reproductionData) {
  try {
    const data = await apiFetch("/reproduction", {
      method: "POST",
      body: JSON.stringify(reproductionData),
      headers: { "Content-Type": "application/json" },
    });
    console.log("✅ createReproduction: reprodução criada");
    return data;
  } catch (error) {
    console.error("❌ Erro no createReproduction:", error);
    return null;
  }
}

export async function updateReproduction(id, reproductionData) {
  try {
    const data = await apiFetch(`/reproduction/${id}`, {
      method: "PUT",
      body: JSON.stringify(reproductionData),
      headers: { "Content-Type": "application/json" },
    });
    console.log(`✅ updateReproduction: reprodução ${id} atualizada`);
    return data;
  } catch (error) {
    console.error(`❌ Erro no updateReproduction: ${id}`, error);
    return null;
  }
}

export async function deleteReproduction(id) {
  try {
    await apiFetch(`/reproduction/${id}`, { method: "DELETE" });
    console.log(`✅ deleteReproduction: reprodução ${id} deletada`);
    return true;
  } catch (error) {
    console.error(`❌ Erro no deleteReproduction: ${id}`, error);
    return false;
  }
}
