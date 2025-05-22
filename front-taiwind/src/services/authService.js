import { apiFetch } from "@/config/ApiConnection";

/**
 * @param {string} email 
 * @param {string} password 
 * @returns {{ success: boolean, data?: any, error?: string }} 
 */
export async function login(email, password) {
  try {
    const response = await apiFetch("/auth/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    console.log("✅ Login bem-sucedido:", response);
    return { success: true, data: response };
  } catch (error) {
    console.error("❌ Erro no login:", error.message);
    return { success: false, error: error.message };
  }
}
