import Layout from "@/layout/Layout.js";
import styles from "@/styles/ControleReproducao.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function ControleReproducao() {
  return (
    <div className={styles.container}>
      <div className={styles.indicators}>
        <div>
          <h1 className={styles.title}>Gestão de Reprodução</h1>
          <p className={styles.description}>
            Monitore o status reprodutivo do seu rebanho e otimize o desempenho
            reprodutivo.
          </p>
        </div>
        <div className={styles.indicatorContainer}>
          <div className={styles.indicatorCard}>
            <h2 className={styles.indicatorTitle}>Total de Búfalas</h2>
            <p className={styles.indicatorSubtitle}>
              Monitoramento reprodutivo ativo
            </p>
            <p className={styles.indicatorValue}>10</p>
          </div>

          <div className={styles.indicatorCard}>
            <h2 className={styles.indicatorTitle}>Análise Financeira</h2>
            <p className={styles.indicatorSubtitle}>
              Búfalas com impacto financeiro negativo
            </p>

            <div className={styles.cardFooter}>
              <div className={styles.alertInfo}>
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className={styles.iconAlert}
                  title="Essas búfalas não estão lactando nem entrando no cio."
                />
                <p className={styles.alertText}>
                  <strong>4 búfalas</strong>
                </p>
              </div>
              <span className={styles.financePercent}>57.1%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ControleReproducao.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
