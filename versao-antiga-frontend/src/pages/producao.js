import Layout from "@/layout/Layout.js";
import styles from "@/styles/Producao.module.css";

export default function Producao() {
  return (
    <div class={styles.container}>
      {/* Indicadores da Produçaõ */}
      <div className={styles.indicators}>
        <div>
          <h1 className={styles.title}>Controle de Produção</h1>
          <p className={styles.description}>
            Monitoramento da Produção de Leite de Búfalas
          </p>
        </div>
        <div className={styles.indicatorContainer}>
          <div className={styles.indicatorCard}>
            <h2 className={styles.indicatorTitle}>Total Produzido</h2>
            <p className={styles.indicatorValue}>9.075 L</p>
            <p className={styles.indicatorTitle}><span className={styles.variacaoPositiva}>+ 5.2%</span> 
            vs. período anterior</p>
          </div>
          <div className={styles.indicatorCard}>
            <h2 className={styles.indicatorTitle}>Total Retirado </h2>
            <p className={styles.indicatorValue}>9.075 L</p>
            <p className={styles.indicatorTitle}>
              <span className={styles.variacaoPositiva}>+ 4.8% </span>
               vs. período anterior</p>
          </div>
          <div className={styles.indicatorCard}>
            <h2 className={styles.indicatorTitle}>Taxa de Aprovação</h2>
            <p className={styles.indicatorValue}>98.7%</p>
            <p className={styles.indicatorTitle}>
              <span className={styles.variacaoPositiva}>+1.5% </span> vs.
              período anterior
            </p>
          </div>
          <div className={styles.indicatorCard}>
            <h2 className={styles.indicatorTitle}>Volume Rejeitado</h2>
            <p className={styles.indicatorValue}>120 L</p>
            <p className={styles.indicatorTitle}>
              <span className={styles.variacaoNegativa}>- 2.3%</span>
               vs. período anterior
            </p>
          </div>
        </div>
      </div>

      <div className={styles.containerTable}>
        <div>
          <table className={styles.tabela}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>Data da Coleta</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.trPar}>
                <td className={styles.td}>14/11/2023</td>
                <td className={styles.td}>
                  <span className={`${styles.status} ${styles.aprovado}`}>
                    Aprovado
                  </span>
                </td>
                <td className={styles.td}>
                  <button className={styles.btnDetalhes}>Ver detalhes</button>
                </td>
              </tr>

              <tr className={styles.trPar}>
                <td className={styles.td}>05/11/2023</td>
                <td className={styles.td}>
                  <span className={`${styles.status} ${styles.reprovado}`}>
                    Reprovado
                  </span>
                </td>
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

Producao.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
