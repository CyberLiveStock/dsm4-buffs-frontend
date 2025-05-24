const API_CONNECTION_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, ""); // remove barra no final, se houver

if (!API_CONNECTION_URL) {
  console.error("❌ ERRO FATAL: NEXT_PUBLIC_API_URL não está definida no .env");
} else {
  console.log(`✅ API base configurada: ${API_CONNECTION_URL}`);
}

export async function apiFetch(path, options = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const fullUrl = `${API_CONNECTION_URL}${path.startsWith("/") ? path : `/${path}`}`;
  console.info("🌐 Requisição para:", fullUrl);

  try {
    const response = await fetch(fullUrl, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let message = "";

      switch (response.status) {
        case 401:
          message = "⚠️ Sessão expirada ou não autorizada. Faça login novamente.";
          alert(message);
          localStorage.removeItem("token");
          window.location.href = "/auth/login";
          return null;

        case 404:
          message = "🔎 Erro 404: Recurso não encontrado.";
          break;

        default:
          message = `❌ Erro ${response.status}: ${errorText || "Erro desconhecido."}`;
          break;
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
      console.error("❌ Erro de conexão com a API:", fullUrl);
      return null;
    }

    alert(error.message || "❌ Erro desconhecido durante a requisição.");
    console.error("❌ Erro inesperado:", error);
    return null;
  }
}

export default API_CONNECTION_URL;
