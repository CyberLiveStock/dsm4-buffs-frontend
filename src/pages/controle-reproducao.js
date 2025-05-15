import Layout from "@/layout/Layout.js";
import styles from "@/styles/ControleReproducao.module.css";

export default function ControleReproducao() {
  return (
    <div className={styles.container}>
      <div className={styles.indicators}>
        <div>
          <h1 className={styles.title}>Gestão de Reprodução</h1>
          <p className={styles.description}>
            Monitore o status reprodutivo do seu rebanho e otimize o desempenho reprodutivo.
          </p>
        </div>
        <div className={styles.indicatorContainer}>
          <div className={styles.indicatorCard}>
            <h2 className={styles.indicatorTitle}>Total de Búfalos</h2>
            <p className={styles.indicatorValue}></p>{" "}
            {/* Exibe o número total de búfalos */}
          </div>
          <div className={styles.indicatorCard}>
            <h2 className={styles.indicatorTitle}>Total de Machos</h2>
            <p className={styles.indicatorValue}></p>{" "}
            {/* Exibe o número de machos */}
            <p className={styles.indicatorTitle}>
              ok
            </p>{" "}
            {/* Exibe a porcentagem de machos */}
          </div>
        </div>
      </div>
    </div>
  );
}

ControleReproducao.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
