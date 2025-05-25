import { apiFetch } from "@/config/ApiConnection";

export async function getAllProperties() {
  try {
    const data = await apiFetch("/propertys"); 
    const properties = data.propertys || []; 
    console.log(`✅ getAllProperties: ${properties.length} propriedades encontradas`);
    return properties;
  } catch (error) {
    console.error("❌ Erro no getAllProperties:", error);
    return [];
  }
}

export async function getPropertyById(id) {
  try {
    const data = await apiFetch(`/property/${id}`);
    console.log(`✅ getPropertyById: propriedade ${id} encontrada`);
    return data;
  } catch (error) {
    console.error(`❌ Erro no getPropertyById: ${id}`, error);
    return null;
  }
}

export async function createProperty(propertyData) {
  try {
    const data = await apiFetch("/property", {
      method: "POST",
      body: JSON.stringify(propertyData),
      headers: { "Content-Type": "application/json" },
    });
    console.log(`✅ createProperty: propriedade criada`);
    return data;
  } catch (error) {
    console.error("❌ Erro no createProperty:", error);
    return null;
  }
}

export async function updateProperty(id, propertyData) {
  try {
    const data = await apiFetch(`/property/${id}`, {
      method: "PUT",
      body: JSON.stringify(propertyData),
      headers: { "Content-Type": "application/json" },
    });
    console.log(`✅ updateProperty: propriedade ${id} atualizada`);
    return data;
  } catch (error) {
    console.error(`❌ Erro no updateProperty: ${id}`, error);
    return null;
  }
}

export async function deleteProperty(id) {
  try {
    await apiFetch(`/property/${id}`, { method: "DELETE" });
    console.log(`✅ deleteProperty: propriedade ${id} deletada`);
    return true;
  } catch (error) {
    console.error(`❌ Erro no deleteProperty: ${id}`, error);
    return false;
  }
}
