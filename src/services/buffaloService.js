import API_CONNECTION_URL from "@/config/ApiConnection.js"

export async function getAllBuffalos() {
  try {
    const response = await fetch(`${API_CONNECTION_URL}/buffalos`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar búfalos: ${response.statusText}`);
    }
    const data = await response.json();
    const buffaloArray = Array.isArray(data) ? data : data.buffalos;
    console.log(`✅ getAllBuffalos: ${buffaloArray.length} búfalos encontrados`);
    return buffaloArray;
  } catch (error) {
    console.error("❌ Erro no getAllBuffalos:", error);
    return [];
  }
}