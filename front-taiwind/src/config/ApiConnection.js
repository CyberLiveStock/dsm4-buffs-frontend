const API_CONNECTION_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_CONNECTION_URL) {
  console.error("❌ ERRO: NEXT_PUBLIC_API_URL não está definida no .env");
} else {
  console.log(`✅ API conectada com: ${API_CONNECTION_URL}`);
}

// Função de requisição padrão, preparada para JWT no futuro
export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const fullUrl = `${API_CONNECTION_URL}${path}`;
  console.log("🔍 Requisição para:", fullUrl); // Debug da URL final

  try {
    const response = await fetch(fullUrl, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();

      if (response.status === 401) {
        throw new Error("Erro 401: Não autorizado. Verifique suas credenciais.");
      } else if (response.status === 404) {
        throw new Error("Erro 404: Recurso não encontrado.");
      } else {
        throw new Error(`Erro ${response.status}: ${errorText || "Erro desconhecido."}`);
      }
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("❌ Não foi possível conectar à API. Verifique a URL ou a conexão.");
    }

    // Outro tipo de erro
    throw error;
  }
}

export default API_CONNECTION_URL;
