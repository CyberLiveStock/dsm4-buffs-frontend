// src/services/buffaloService.js
import { apiFetch } from "@/config/ApiConnection";

export async function getAllBuffalos() {
  try {
    const data = await apiFetch("/buffalos");
    const buffaloArray = Array.isArray(data) ? data : data?.buffalos ?? [];
    console.log(
      `✅ getAllBuffalos: ${buffaloArray.length} búfalos encontrados`
    );
    return buffaloArray;
  } catch (error) {
    console.error("❌ Erro no getAllBuffalos:", error);
    return [];
  }
}

export async function getBuffaloById(id) {
  try {
    const data = await apiFetch(`/buffalo/${id}`);
    console.log(`✅ getBuffaloById: búfalo ${id} encontrado`);
    return data;
  } catch (error) {
    console.error(`❌ Erro no getBuffaloById: ${id}`, error);
    return null;
  }
}

export async function createBuffalo(buffaloData) {
  try {
    const data = await apiFetch("/buffalo", {
      method: "POST",
      body: JSON.stringify(buffaloData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(`✅ createBuffalo: búfalo criado com tag ${buffaloData.tag}`);
    return data;
  } catch (error) {
    console.error("❌ Erro no createBuffalo:", error);
    return null;
  }
}

export async function updateBuffalo(id, buffaloData) {
  try {
    const data = await apiFetch(`/buffalo/${id}`, {
      method: "PUT",
      body: JSON.stringify(buffaloData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(`✅ updateBuffalo: búfalo ${id} atualizado`);
    return data;
  } catch (error) {
    console.error(`❌ Erro no updateBuffalo: ${id}`, error);
    return null;
  }
}

export async function deleteBuffalo(id) {
  try {
    await apiFetch(`/buffalo/${id}`, {
      method: "DELETE",
    });
    console.log(`✅ deleteBuffalo: búfalo ${id} deletado`);
    return true;
  } catch (error) {
    console.error(`❌ Erro no deleteBuffalo: ${id}`, error);
    return false;
  }
}
