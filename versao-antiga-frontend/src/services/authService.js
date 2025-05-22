// src/services/authService.js
import { apiFetch } from "@/config/ApiConnection";

/**
 * @param {string} email 
 * @param {string} password 
 * @returns {object|null} 
 */
export async function login(email, password) {
  try {
    const response = await apiFetch("/auth/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    console.log("✅ Login bem-sucedido:", response);
    return response;
  } catch (error) {
    console.error("❌ Erro no login:", error);
    return null;
  }
}
