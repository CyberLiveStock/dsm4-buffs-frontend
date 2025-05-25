import { apiFetch } from "@/config/ApiConnection"

export async function getAllFeedings() {
  try {
    const data = await apiFetch("/feedings")
    console.log(`✅ getAllFeedings: ${data.length} alimentações encontradas`)
    return data
  } catch (error) {
    console.error("❌ Erro no getAllFeedings:", error)
    return []
  }
}

export async function getFeedingById(id) {
  try {
    const data = await apiFetch(`/feeding/${id}`)
    console.log(`✅ getFeedingById: alimentação ${id} encontrada`)
    return data
  } catch (error) {
    console.error(`❌ Erro no getFeedingById: ${id}`, error)
    return null
  }
}

export async function createFeeding(feedingData) {
  try {
    // Log completo do payload antes do envio
    console.log("📦 Payload original recebido:", feedingData)

    // Verificações corretas para a API de alimentação
    if (
      !feedingData.nome ||
      !feedingData.tpAlimentacao ||
      typeof feedingData.quantidade !== "number" ||
      !feedingData.unidadeMedida ||
      !feedingData.grupoDestinado
    ) {
      console.warn("⚠️ Payload inválido. Campos obrigatórios:", {
        nome: feedingData.nome,
        tpAlimentacao: feedingData.tpAlimentacao,
        quantidade: feedingData.quantidade,
        unidadeMedida: feedingData.unidadeMedida,
        grupoDestinado: feedingData.grupoDestinado,
      })
      return { success: false, message: "Campos obrigatórios não preenchidos" }
    }

    // Garantir que a estrutura está exatamente como a API espera
    const payload = {
      nome: String(feedingData.nome).trim(),
      tpAlimentacao: String(feedingData.tpAlimentacao),
      quantidade: Number(feedingData.quantidade),
      unidadeMedida: String(feedingData.unidadeMedida),
      grupoDestinado: String(feedingData.grupoDestinado),
      frequencia: Number(feedingData.frequencia) || 1,
      desc: String(feedingData.desc || "").trim(),
    }

    console.log("📤 Payload final enviado para /feeding:", payload)

    // Usar apiFetch que já tem o token configurado
    const data = await apiFetch("/feeding", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    })

    console.log("✅ createFeeding: alimentação criada com sucesso", data)
    return { success: true, data }
  } catch (error) {
    console.error("❌ Erro no createFeeding:", error)
    return { success: false, message: error.message || "Erro ao criar alimentação" }
  }
}

export async function updateFeeding(id, feedingData) {
  try {
    // Garantir que a estrutura está correta para update também
    const payload = {
      nome: String(feedingData.nome).trim(),
      tpAlimentacao: String(feedingData.tpAlimentacao),
      quantidade: Number(feedingData.quantidade),
      unidadeMedida: String(feedingData.unidadeMedida),
      grupoDestinado: String(feedingData.grupoDestinado),
      frequencia: Number(feedingData.frequencia) || 1,
      desc: String(feedingData.desc || "").trim(),
    }

    console.log(`📤 Payload para update ${id}:`, payload)

    const data = await apiFetch(`/feeding/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    })
    console.log(`✅ updateFeeding: alimentação ${id} atualizada`)
    return data
  } catch (error) {
    console.error(`❌ Erro no updateFeeding: ${id}`, error)
    return null
  }
}

export async function deleteFeeding(id) {
  try {
    await apiFetch(`/feeding/${id}`, { method: "DELETE" })
    console.log(`✅ deleteFeeding: alimentação ${id} deletada`)
    return true
  } catch (error) {
    console.error(`❌ Erro no deleteFeeding: ${id}`, error)
    return false
  }
}
