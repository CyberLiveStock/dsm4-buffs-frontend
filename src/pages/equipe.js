import Layout from "@/layout/Layout.js";
import styles from "@/styles/Equipe.module.css";

export default function Equipe() {
  return (
    <div class={styles.container}>
      {/* Indicador do gerenciamento dos funcionários */}
      <div className={styles.indicators}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Gerenciamento de Funcionários</h1>
            <p className={styles.description}>
              Cadastre e gerencie o acesso dos funcionários ao sistema.
            </p>
          </div>

          <button className={styles.botaoCadastrar}>
            Cadastrar Funcionário
          </button>
        </div>
      </div>

      {/*Tabela e filtros para controle de funcionários*/}
    </div>
  );
}

Equipe.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
