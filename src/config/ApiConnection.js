const API_CONNECTION_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_CONNECTION_URL) {
  console.error("❌ ERRO: NEXT_PUBLIC_API_URL não está definida no .env");
} else {
  console.log(`✅ API conectada com: ${API_CONNECTION_URL}`);
}

export default API_CONNECTION_URL;
