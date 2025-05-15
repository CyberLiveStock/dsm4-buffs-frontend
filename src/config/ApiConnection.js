

const API_CONNECTION_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_CONNECTION_URL) {
  console.error("❌ ERRO: NEXT_PUBLIC_API_URL não está definida no .env");
} else {
  console.log(`✅ API conectada com: ${API_CONNECTION_URL}`);
}

// Função de requisição padrão, preparada para JWT no futuro
export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token"); // pega o token se houver

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_CONNECTION_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro ${response.status}: ${errorText}`);
  }

  return response.json();
}

export default API_CONNECTION_URL;
