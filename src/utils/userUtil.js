import { getAllUsers } from "@/services/userService";

export async function fetchUserStats() {
  const users = await getAllUsers(); // espera que retorne só o array

  if (!users || users.length === 0) {
    console.warn("⚠️ Nenhum usuário encontrado");
    return [];
  }

  console.log(`👥 Total de usuários: ${users.length}`);

  const cargosCount = users.reduce((acc, user) => {
    const cargo = user.cargo || "Indefinido";
    acc[cargo] = (acc[cargo] || 0) + 1;
    return acc;
  }, {});

  console.log("📊 Usuários por cargo:");
  Object.entries(cargosCount).forEach(([cargo, count]) => {
    console.log(`- ${cargo}: ${count}`);
  });

  return users; // retorna os usuários para usar fora
}
