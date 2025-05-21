import styles from "@/components/Equipe/FilterTable/FilterTable.module.css";

export default function FilterTable() {
  return (
    <div class={styles.filtrosContainer}>
      <div className={styles.filtroGroup}>
        <label className={styles.filtroLabel}>Buscar por Nome</label>

        <input
          type="text"
          class={styles.filtroInput}
          placeholder="Digite o nome"
        />
      </div>

      <div className={styles.filtroGroup}>
        <label className={styles.filtroLabel}>Cargo</label>
        <select class={styles.filtroSelect}>
          <option>Cargo</option>
          <option>Veterinário</option>
          <option>Gerente de Produção</option>
          <option>Auxiliar de Produção</option>
        </select>
      </div>


      <button class={styles.filtroBtn}>Cadastrar Funcionário</button>
    </div>
  );
}
