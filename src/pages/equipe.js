"use client"

import { useState, useEffect } from "react"
import Layout from "@/layout/Layout"
import { createUser, updateUser, deleteUser } from "@/services/userService"
import { fetchUserStats } from "@/utils/userUtil"

export default function Equipe() {
  // Estados para controlar modais
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [showEditUserModal, setShowEditUserModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [userToDelete, setUserToDelete] = useState(null)

  // Estados para dados da API
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState("")
  const [cargoFilter, setCargoFilter] = useState("todos")

  // Carregar dados da API
  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      setLoading(true)
      const usersData = await fetchUserStats()
      console.log("📦 Dados de usuários carregados:", usersData)
      setUsers(Array.isArray(usersData) ? usersData : [])
    } catch (error) {
      console.error("❌ Erro ao carregar dados de usuários:", error)
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  // Filtrar usuários
  const filteredUsers = Array.isArray(users)
    ? users.filter((user) => {
        const matchesSearch = user.nome?.toLowerCase().includes(searchTerm.toLowerCase()) || false
        const matchesCargo = cargoFilter === "todos" || user.cargo === cargoFilter
        return matchesSearch && matchesCargo
      })
    : []

  // Obter cargos únicos para o filtro
  const uniqueCargos = Array.isArray(users) ? [...new Set(users.map((u) => u.cargo).filter(Boolean))] : []

  const handleViewDetails = (user) => {
    setSelectedUser(user)
    setShowDetailsModal(true)
  }

  const handleEdit = (user) => {
    setSelectedUser(user)
    setShowEditUserModal(true)
  }

  const handleDelete = (user) => {
    setUserToDelete(user)
    setShowDeleteConfirmation(true)
  }

  const confirmDelete = async () => {
    try {
      const success = await deleteUser(userToDelete._id)
      if (success) {
        await loadUserData()
        setShowDeleteConfirmation(false)
        setUserToDelete(null)
        console.log("✅ Usuário deletado com sucesso")
        alert("Usuário removido com sucesso!")
      } else {
        alert("Erro ao remover usuário")
      }
    } catch (error) {
      console.error("❌ Erro ao deletar:", error)
      alert("Erro ao remover usuário")
    }
  }

  const handleSaveNew = async (formData) => {
    try {
      console.log("📤 Dados do novo usuário:", formData)

      const result = await createUser(formData)
      if (result) {
        await loadUserData()
        setShowAddUserModal(false)
        console.log("✅ Usuário criado com sucesso")
        alert("Usuário cadastrado com sucesso!")
      } else {
        alert("Erro ao cadastrar usuário")
      }
    } catch (error) {
      console.error("❌ Erro ao criar usuário:", error)
      alert("Erro ao cadastrar usuário")
    }
  }

  const handleSaveEdit = async (formData) => {
    try {
      const success = await updateUser(selectedUser._id, formData)
      if (success) {
        await loadUserData()
        setShowEditUserModal(false)
        setSelectedUser(null)
        console.log("✅ Usuário atualizado com sucesso")
        alert("Usuário atualizado com sucesso!")
      } else {
        alert("Erro ao atualizar usuário")
      }
    } catch (error) {
      console.error("❌ Erro ao atualizar:", error)
      alert("Erro ao atualizar usuário")
    }
  }

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFCF78] mx-auto mb-4"></div>
          <p className="text-black">Carregando dados da equipe...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-[#f5f5f5] p-5 flex flex-col items-center gap-5 box-border">
      {/* Indicador do gerenciamento dos funcionários */}
      <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Gerenciamento de Funcionários</h1>
          <p className="text-base text-gray-700 mb-4">
            Cadastre e gerencie o acesso dos funcionários ao sistema. Total: {Array.isArray(users) ? users.length : 0}{" "}
            funcionários
          </p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#f8fcfa] p-4 rounded-lg border border-[#e0e0e0]">
            <h3 className="text-lg font-semibold text-gray-800">Total de Funcionários</h3>
            <p className="text-2xl font-bold text-[#f59e0b]">{Array.isArray(users) ? users.length : 0}</p>
          </div>
          <div className="bg-[#f8fcfa] p-4 rounded-lg border border-[#e0e0e0]">
            <h3 className="text-lg font-semibold text-gray-800">Cargos Diferentes</h3>
            <p className="text-2xl font-bold text-[#3b82f6]">{uniqueCargos.length}</p>
          </div>
          <div className="bg-[#f8fcfa] p-4 rounded-lg border border-[#e0e0e0]">
            <h3 className="text-lg font-semibold text-gray-800">Usuários Ativos</h3>
            <p className="text-2xl font-bold text-[#10b981]">
              {Array.isArray(users) ? users.filter((u) => u.status !== "Inativo").length : 0}
            </p>
          </div>
        </div>
      </div>

      {/* Tabela e filtros para controle de funcionários */}
      <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800">Funcionários Cadastrados</h2>

        {/* Filtros */}
        <div className="flex gap-4 flex-wrap items-end">
          <div className="flex flex-col">
            <label className="font-semibold mb-1.5 text-gray-700 text-sm">Buscar por Nome</label>
            <input
              type="text"
              className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm w-[300px] max-w-full"
              placeholder="Digite o nome"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1.5 text-gray-700 text-sm">Cargo</label>
            <select
              className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700 min-w-[200px]"
              value={cargoFilter}
              onChange={(e) => setCargoFilter(e.target.value)}
            >
              <option value="todos">Todos os cargos</option>
              {uniqueCargos.map((cargo) => (
                <option key={cargo} value={cargo}>
                  {cargo}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowAddUserModal(true)}
            className="py-2 px-3.5 bg-[#28a745] border-2 border-[#28a745] rounded-lg cursor-pointer font-bold text-white hover:bg-[#218838] transition-colors"
          >
            Cadastrar Funcionário
          </button>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse min-w-[650px] bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-[#f0f0f0]">
              <tr>
                <th className="p-3 text-left font-medium text-gray-800 text-base">Nome</th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">E-mail</th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">Cargo</th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">Telefone</th>
                <th className="p-3 text-left font-medium text-gray-800 text-base">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    {!Array.isArray(users) || users.length === 0
                      ? "Nenhum funcionário cadastrado"
                      : "Nenhum funcionário encontrado com os filtros aplicados"}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr key={user._id || index} className={index % 2 === 0 ? "bg-[#fafafa]" : "bg-white"}>
                    <td className="p-3 text-gray-800 text-base">{user.nome || "Não informado"}</td>
                    <td className="p-3 text-gray-800 text-base">{user.email || "Não informado"}</td>
                    <td className="p-3 text-gray-800 text-base">{user.cargo || "Não informado"}</td>
                    <td className="p-3 text-gray-800 text-base">{user.telefone || "Não informado"}</td>
                    <td className="p-3 text-base">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewDetails(user)}
                          className="bg-[#FFCF78] border-none text-black py-1 px-2 rounded-lg cursor-pointer text-sm font-medium hover:bg-[#f39c12] transition-colors"
                        >
                          Ver detalhes
                        </button>
                        <button
                          onClick={() => handleEdit(user)}
                          className="bg-[#3b82f6] border-none text-white py-1 px-2 rounded-lg cursor-pointer text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          className="bg-[#ef4444] border-none text-white py-1 px-2 rounded-lg cursor-pointer text-sm font-medium hover:bg-red-700 transition-colors"
                        >
                          Remover
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Informações de filtro */}
        {Array.isArray(users) && filteredUsers.length !== users.length && (
          <div className="text-sm text-gray-600 mt-2">
            Mostrando {filteredUsers.length} de {users.length} funcionários
          </div>
        )}
      </div>

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-[400px] flex flex-col gap-3 relative">
            <h2 className="text-xl font-bold mb-2 text-gray-800">Confirmar Remoção</h2>
            <p className="text-gray-700">
           Tem certeza que deseja remover o funcionário &quot;{userToDelete?.nome}&quot;? Esta ação não pode ser desfeita.

            </p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Cancelar
              </button>
              <button className="py-2 px-4 bg-[#ef4444] text-white rounded-lg font-medium" onClick={confirmDelete}>
                Remover
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Adicionar Funcionário */}
      <AddUserModal isOpen={showAddUserModal} onClose={() => setShowAddUserModal(false)} onSave={handleSaveNew} />

      {/* Modal para Editar Funcionário */}
      <EditUserModal
        isOpen={showEditUserModal}
        onClose={() => {
          setShowEditUserModal(false)
          setSelectedUser(null)
        }}
        onSave={handleSaveEdit}
        user={selectedUser}
      />

      {/* Modal para Ver Detalhes */}
      <UserDetailsModal
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false)
          setSelectedUser(null)
        }}
        user={selectedUser}
        onEdit={() => {
          setShowDetailsModal(false)
          setShowEditUserModal(true)
        }}
      />
    </div>
  )
}

// Componente Modal para Adicionar Funcionário
function AddUserModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    cargo: "",
    telefone: "",
    status: "Ativo",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validação básica
    if (!formData.nome.trim()) {
      alert("Nome é obrigatório")
      return
    }

    if (!formData.email.trim()) {
      alert("E-mail é obrigatório")
      return
    }

    if (!formData.senha.trim()) {
      alert("Senha é obrigatória")
      return
    }

    if (!formData.cargo) {
      alert("Cargo é obrigatório")
      return
    }

    setIsSubmitting(true)

    try {
      const dataToSend = {
        nome: formData.nome.trim(),
        email: formData.email.trim(),
        senha: formData.senha,
        cargo: formData.cargo,
        telefone: formData.telefone.trim() || "",
        status: formData.status,
      }

      await onSave(dataToSend)

      // Limpar formulário
      setFormData({
        nome: "",
        email: "",
        senha: "",
        cargo: "",
        telefone: "",
        status: "Ativo",
      })
    } catch (error) {
      console.error("❌ Erro no submit:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        nome: "",
        email: "",
        senha: "",
        cargo: "",
        telefone: "",
        status: "Ativo",
      })
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-[600px] flex flex-col gap-3 relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-2 right-3 text-2xl bg-transparent border-none cursor-pointer text-gray-700 disabled:opacity-50"
          onClick={handleClose}
          disabled={isSubmitting}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-2 text-gray-800">Cadastrar Novo Funcionário</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Nome Completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                placeholder="Ex: João Silva"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                E-mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                placeholder="Ex: joao@buffs.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Senha <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                placeholder="Senha de acesso"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">
                Cargo <span className="text-red-500">*</span>
              </label>
              <select
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700"
                value={formData.cargo}
                onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                required
                disabled={isSubmitting}
              >
                <option value="">Selecione o cargo</option>
                <option value="Veterinário">Veterinário</option>
                <option value="Gerente de Produção">Gerente de Produção</option>
                <option value="Auxiliar de Produção">Auxiliar de Produção</option>
                <option value="Administrador">Administrador</option>
                <option value="Técnico">Técnico</option>
                <option value="Funcionário">Funcionário</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">Telefone</label>
              <input
                type="tel"
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                placeholder="Ex: (11) 99999-9999"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">Status</label>
              <select
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                disabled={isSubmitting}
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium disabled:opacity-50"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-[#28a745] text-white rounded-lg font-medium hover:bg-[#218838] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Componente Modal para Editar Funcionário
function EditUserModal({ isOpen, onClose, onSave, user }) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cargo: "",
    telefone: "",
    status: "Ativo",
  })

  useEffect(() => {
    if (user) {
      setFormData({
        nome: user.nome || "",
        email: user.email || "",
        cargo: user.cargo || "",
        telefone: user.telefone || "",
        status: user.status || "Ativo",
      })
    }
  }, [user])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  if (!isOpen || !user) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-[600px] flex flex-col gap-3 relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-2 right-3 text-2xl bg-transparent border-none cursor-pointer text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-2 text-gray-800">Editar Funcionário</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">Nome Completo</label>
              <input
                type="text"
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">E-mail</label>
              <input
                type="email"
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">Cargo</label>
              <select
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700"
                value={formData.cargo}
                onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                required
              >
                <option value="">Selecione o cargo</option>
                <option value="Veterinário">Veterinário</option>
                <option value="Gerente de Produção">Gerente de Produção</option>
                <option value="Auxiliar de Produção">Auxiliar de Produção</option>
                <option value="Administrador">Administrador</option>
                <option value="Técnico">Técnico</option>
                <option value="Funcionário">Funcionário</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">Telefone</label>
              <input
                type="tel"
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="font-semibold mb-1.5 text-gray-700 text-sm">Status</label>
              <select
                className="py-2 px-3 border-2 border-[#D9DBDB] rounded-lg text-sm text-gray-700"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-[#3b82f6] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Componente Modal para Ver Detalhes
function UserDetailsModal({ isOpen, onClose, user, onEdit }) {
  if (!isOpen || !user) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-[500px] flex flex-col gap-4 relative">
        <button
          className="absolute top-2 right-3 text-2xl bg-transparent border-none cursor-pointer text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-2 text-gray-800">Detalhes do Funcionário</h2>

        <div className="space-y-4">
          <div>
            <label className="font-semibold text-gray-700 text-sm block mb-1">Nome Completo</label>
            <p className="text-gray-800 bg-gray-50 p-2 rounded border">{user.nome || "Não informado"}</p>
          </div>

          <div>
            <label className="font-semibold text-gray-700 text-sm block mb-1">E-mail</label>
            <p className="text-gray-800 bg-gray-50 p-2 rounded border">{user.email || "Não informado"}</p>
          </div>

          <div>
            <label className="font-semibold text-gray-700 text-sm block mb-1">Cargo</label>
            <p className="text-gray-800 bg-gray-50 p-2 rounded border">{user.cargo || "Não informado"}</p>
          </div>

          <div>
            <label className="font-semibold text-gray-700 text-sm block mb-1">Telefone</label>
            <p className="text-gray-800 bg-gray-50 p-2 rounded border">{user.telefone || "Não informado"}</p>
          </div>

          <div>
            <label className="font-semibold text-gray-700 text-sm block mb-1">Status</label>
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-bold inline-block ${
                user.status === "Ativo"
                  ? "bg-[#9DFFBE] text-black"
                  : user.status === "Inativo"
                    ? "bg-[#ffcccb] text-black"
                    : "bg-[#f59e0b] text-black"
              }`}
            >
              {user.status || "Ativo"}
            </span>
          </div>

          {user.dataNascimento && (
            <div>
              <label className="font-semibold text-gray-700 text-sm block mb-1">Data de Nascimento</label>
              <p className="text-gray-800 bg-gray-50 p-2 rounded border">
                {new Date(user.dataNascimento).toLocaleDateString("pt-BR")}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium" onClick={onClose}>
            Fechar
          </button>
          <button
            className="py-2 px-4 bg-[#3b82f6] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            onClick={onEdit}
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  )
}

Equipe.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
