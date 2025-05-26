import { apiFetch } from "@/config/ApiConnection"

export async function getAllProductions() {
  try {
    const response = await apiFetch("/productions")

    // Verificar se response existe e tem a propriedade productions
    if (!response) {
      console.log("⚠️ getAllProductions: API retornou null")
      return []
    }

    const data = response.productions || []
    console.log(`✅ getAllProductions: ${data.length} produções encontradas`)
    return data
  } catch (error) {
    console.error("❌ Erro no getAllProductions:", error)
    return []
  }
}

export async function getProductionById(id) {
  try {
    const data = await apiFetch(`/production/${id}`)
    console.log(`✅ getProductionById: produção ${id} encontrada`)
    return data
  } catch (error) {
    console.error(`❌ Erro no getProductionById: ${id}`, error)
    return null
  }
}

export async function createProduction(productionData) {
  try {
    console.log("📤 Dados para criação de produção:", productionData)

    // A API espera um array de coletas
    const payload = {
      coletas: Array.isArray(productionData.coletas) ? productionData.coletas : [productionData.coletas],
    }

    console.log("📤 Payload final para API:", payload)

    const data = await apiFetch("/production", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    })
    console.log("✅ createProduction: produção criada", data)
    return data
  } catch (error) {
    console.error("❌ Erro no createProduction:", error)
    return null
  }
}

export async function updateProduction(id, productionData) {
  try {
    console.log(`📤 Dados para atualização da produção ${id}:`, productionData)

    // A API espera um array de coletas
    const payload = {
      coletas: Array.isArray(productionData.coletas) ? productionData.coletas : [productionData.coletas],
    }

    console.log("📤 Payload final para update:", payload)

    const data = await apiFetch(`/production/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    })
    console.log(`✅ updateProduction: produção ${id} atualizada`)
    return data
  } catch (error) {
    console.error(`❌ Erro no updateProduction: ${id}`, error)
    return null
  }
}

export async function deleteProduction(id) {
  try {
    await apiFetch(`/production/${id}`, { method: "DELETE" })
    console.log(`✅ deleteProduction: produção ${id} deletada`)
    return true
  } catch (error) {
    console.error(`❌ Erro no deleteProduction: ${id}`, error)
    return false
  }
}
