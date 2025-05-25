import { apiFetch } from "@/config/ApiConnection";

export async function getAllLactations() {
  try {
    const data = await apiFetch("/lactations");
    const lactations = data.lactations || [];
    console.log(`✅ getAllLactations: ${lactations.length} lactações encontradas`);
    return { lactations };
  } catch (error) {
    console.error("❌ Erro no getAllLactations:", error);
    return { lactations: [] };
  }
}

export async function getLactationById(id) {
  try {
    const data = await apiFetch(`/lactation/${id}`);
    console.log(`✅ getLactationById: lactação ${id} encontrada`);
    return data;
  } catch (error) {
    console.error(`❌ Erro no getLactationById: ${id}`, error);
    return null;
  }
}

export async function createLactation(lactationData) {
  try {
    const data = await apiFetch("/lactation", {
      method: "POST",
      body: JSON.stringify(lactationData),
      headers: { "Content-Type": "application/json" },
    });
    console.log("✅ createLactation: lactação criada");
    return data;
  } catch (error) {
    console.error("❌ Erro no createLactation:", error);
    return null;
  }
}

export async function updateLactation(id, lactationData) {
  try {
    const data = await apiFetch(`/lactation/${id}`, {
      method: "PUT",
      body: JSON.stringify(lactationData),
      headers: { "Content-Type": "application/json" },
    });
    console.log(`✅ updateLactation: lactação ${id} atualizada`);
    return data;
  } catch (error) {
    console.error(`❌ Erro no updateLactation: ${id}`, error);
    return null;
  }
}

export async function deleteLactation(id) {
  try {
    await apiFetch(`/lactation/${id}`, { method: "DELETE" });
    console.log(`✅ deleteLactation: lactação ${id} deletada`);
    return true;
  } catch (error) {
    console.error(`❌ Erro no deleteLactation: ${id}`, error);
    return false;
  }
}
