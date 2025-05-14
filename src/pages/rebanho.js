import Layout from "@/layout/Layout.js";
// import styles from "@/styles/Home.module.css";
import styles from "@/styles/Rebanho.module.css";

export default function Rebanho() {
  return (
    <div className={styles.container}>
      <div className={styles.containerTable}>
        <div>
          <h1 className={styles.title}>Registro de Búfalos</h1>
          <p className={styles.description}>
            {" "}
            {/*Fazer o contador de bufalos */}
            Lista completa do rebanho com 7 búfalos(as).
          </p>
        </div>
        <div>
 <table className={styles.tabela}>
      <thead className={styles.thead}>
        <tr>
          <th className={styles.th}>TAG</th>
          <th className={styles.th}>Nome</th>
          <th className={styles.th}>Peso(kg)</th>
          <th className={styles.th}>Raça</th>
          <th className={styles.th}>Sexo</th>
          <th className={styles.th}>Status</th>
          <th className={styles.th}>Última Atualização</th>
          <th className={styles.th}>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr className={styles.trPar}>
          <td className={styles.td}>BF001</td>
          <td className={styles.td}>Aurora</td>
          <td className={styles.td}>650</td>
          <td className={styles.td}>Murrah</td>
          <td className={styles.td}>Fêmea</td>
          <td className={styles.td}>14/11/2023</td>
          <td className={styles.td}><span className={`${styles.status} ${styles.ativo}`}>Ativo</span></td>
          <td className={styles.td}><button className={styles.btnDetalhes}>Ver detalhes</button></td>
        </tr>

          <tr className={styles.trPar}>
          <td className={styles.td}>BF002</td>
          <td className={styles.td}>Mel</td>
          <td className={styles.td}>480</td>
          <td className={styles.td}>Mediterrâneo</td>
          <td className={styles.td}>Fêmea</td>
          <td className={styles.td}>05/11/2023</td>
          <td className={styles.td}><span className={`${styles.status} ${styles.inativo}`}>Inativo</span></td>
          <td className={styles.td}><button className={styles.btnDetalhes}>Ver detalhes</button></td>
        </tr>
        {/* Repita os outros <tr> aqui */}
      </tbody>
    </table>
        </div>
      </div>
      {/* <h1 className={styles.title}>Bem-vindo à page Rebanho</h1>
      <div className={styles.content}>
        <p className={styles.paragraph}>
          Este é um exemplo de conteúdo.
        </p>
      </div> */}
    </div>
  );
}

Rebanho.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
