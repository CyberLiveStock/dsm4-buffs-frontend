import { apiFetch } from "@/config/ApiConnection";

export async function getAllUsers() {
  try {
    const data = await apiFetch("/users");
    console.log(`✅ getAllUsers: ${data.length} usuários encontrados`);
    return data;
  } catch (error) {
    console.error("❌ Erro no getAllUsers:", error);
    return [];
  }
}

export async function getUserById(id) {
  try {
    const data = await apiFetch(`/user/${id}`);
    console.log(`✅ getUserById: usuário ${id} encontrado`);
    return data;
  } catch (error) {
    console.error(`❌ Erro no getUserById: ${id}`, error);
    return null;
  }
}

export async function createUser(userData) {
  try {
    const data = await apiFetch("/user", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });
    console.log(`✅ createUser: usuário criado`);
    return data;
  } catch (error) {
    console.error("❌ Erro no createUser:", error);
    return null;
  }
}

export async function updateUser(id, userData) {
  try {
    const data = await apiFetch(`/user/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });
    console.log(`✅ updateUser: usuário ${id} atualizado`);
    return data;
  } catch (error) {
    console.error(`❌ Erro no updateUser: ${id}`, error);
    return null;
  }
}

export async function deleteUser(id) {
  try {
    await apiFetch(`/user/${id}`, { method: "DELETE" });
    console.log(`✅ deleteUser: usuário ${id} deletado`);
    return true;
  } catch (error) {
    console.error(`❌ Erro no deleteUser: ${id}`, error);
    return false;
  }
}
