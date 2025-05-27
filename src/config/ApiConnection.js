const API_CONNECTION_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, ""); // remove barra no final

if (!API_CONNECTION_URL) {
  console.error("❌ ERRO FATAL: NEXT_PUBLIC_API_URL não está definida no .env");
  throw new Error("NEXT_PUBLIC_API_URL não está definida. Verifique o arquivo .env.local");
} else {
  console.log(`✅ API base configurada: ${API_CONNECTION_URL}`);
}

export async function apiFetch(path, options = {}) {
  try {
    if (!API_CONNECTION_URL) {
      throw new Error("❌ API URL não configurada.");
    }

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const fullUrl = `${API_CONNECTION_URL}${path.startsWith("/") ? path : `/${path}`}`;
    console.info("🌐 Requisição para:", fullUrl);

    const response = await fetch(fullUrl, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let message = `❌ Erro ${response.status}: ${errorText || "Erro desconhecido."}`;

      if (response.status === 401) {
        message = "⚠️ Sessão expirada ou não autorizada. Faça login novamente.";
        alert(message);
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          window.location.href = "/auth/login";
        }
        return null;
      }

      if (response.status === 404) {
        message = "🔎 Erro 404: Recurso não encontrado.";
      }

      alert(message);
      console.error("📛 Detalhes do erro:", {
        status: response.status,
        body: errorText,
        url: fullUrl,
      });

      return null;
    }

    const contentType = response.headers.get("Content-Type") || "";
    if (contentType.includes("application/json")) {
      const json = await response.json();
      console.log("✅ Resposta recebida:", json);
      return json;
    }

    console.warn("⚠️ Conteúdo não JSON retornado.");
    return {};
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      alert("🚫 Falha de conexão: Verifique a URL da API ou sua internet.");
      console.error("❌ Erro de conexão com a API:", path);
    } else {
      alert(error.message || "❌ Erro desconhecido durante a requisição.");
      console.error("❌ Erro inesperado:", error);
    }

    return null;
  }
}

export default API_CONNECTION_URL;
