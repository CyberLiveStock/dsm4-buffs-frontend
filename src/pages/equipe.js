import FilterTable from "@/components/Equipe/FilterTable/FilterTable";
import Layout from "@/layout/Layout.js";
import styles from "@/styles/Equipe.module.css";

export default function Equipe() {
  return (
    <div class={styles.container}>
      {/* Indicador do gerenciamento dos funcionários */}
      <div className={styles.indicators}>
        <div>
          <h1 className={styles.title}>Gerenciamento de Funcionários</h1>
          <p className={styles.description}>
            Cadastre e gerencie o acesso dos funcionários ao sistema.
          </p>
        </div>
      </div>

      {/*Tabela e filtros para controle de funcionários*/}
      <div className={styles.containerTable}>
        <FilterTable />
        <div>
          <table className={styles.tabela}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>Nome</th>
                <th className={styles.th}>E-mail</th>
                <th className={styles.th}>Cargo(s)</th>
                <th className={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.trPar}>
                <td className={styles.td}>Vinicius Souza</td>
                <td className={styles.td}>vinicius_souza@buffs.com</td>
                <td className={styles.td}>Veterinário</td>
                <td className={styles.td}>
                  <button className={styles.btnDetalhes}>Ver detalhes</button>
                </td>
              </tr>

              <tr className={styles.trPar}>
                <td className={styles.td}>João Lima</td>
                <td className={styles.td}>joaolima@buffs.com</td>
                <td className={styles.td}>Gerente de Produção</td>
                <td className={styles.td}>
                  <button className={styles.btnDetalhes}>Ver detalhes</button>
                </td>
              </tr>

              <tr className={styles.trPar}>
                <td className={styles.td}>Paulo Cesar Candiani</td>
                <td className={styles.td}>paulocesar@buffs.com</td>
                <td className={styles.td}>Auxiliar de Produção</td>
                <td className={styles.td}>
                  <button className={styles.btnDetalhes}>Ver detalhes</button>
                </td>
              </tr>

              {/* Repita os outros <tr> aqui */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

Equipe.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
