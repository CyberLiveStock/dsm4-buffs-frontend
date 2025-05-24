import { apiFetch } from "@/config/ApiConnection";

export async function getAllProductions() {
  try {
    const data = await apiFetch("/productions");
    const productions = data.productions || [];
    console.log(`✅ getAllProductions: ${productions.length} produções encontradas`);
    return productions;
  } catch (error) {
    console.error("❌ Erro no getAllProductions:", error);
    return [];
  }
}

export async function getProductionById(id) {
  try {
    const data = await apiFetch(`/production/${id}`);
    console.log(`✅ getProductionById: produção ${id} encontrada`);
    return data;
  } catch (error) {
    console.error(`❌ Erro no getProductionById: ${id}`, error);
    return null;
  }
}

export async function createProduction(productionData) {
  try {
    const data = await apiFetch("/production", {
      method: "POST",
      body: JSON.stringify(productionData),
      headers: { "Content-Type": "application/json" },
    });
    console.log("✅ createProduction: produção criada");
    return data;
  } catch (error) {
    console.error("❌ Erro no createProduction:", error);
    return null;
  }
}

export async function updateProduction(id, productionData) {
  try {
    const data = await apiFetch(`/production/${id}`, {
      method: "PUT",
      body: JSON.stringify(productionData),
      headers: { "Content-Type": "application/json" },
    });
    console.log(`✅ updateProduction: produção ${id} atualizada`);
    return data;
  } catch (error) {
    console.error(`❌ Erro no updateProduction: ${id}`, error);
    return null;
  }
}

export async function deleteProduction(id) {
  try {
    await apiFetch(`/production/${id}`, { method: "DELETE" });
    console.log(`✅ deleteProduction: produção ${id} deletada`);
    return true;
  } catch (error) {
    console.error(`❌ Erro no deleteProduction: ${id}`, error);
    return false;
  }
}
