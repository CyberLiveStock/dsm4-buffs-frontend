import ProducaoQuedaModal from "../ProducaoQuedaModal/ProducaoQuedaModal"
import styles from "./ProducaoQueda.module.css"
import { useState } from "react"
export default function ProducaoQueda() {
  const [modalAberto, setModalAberto] = useState(false)

  return (
   <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Búfalas com produção em queda</h2>

        <div className={styles.metricsContainer}>
          <div className={styles.metricGroup}>
            <span className={styles.metricLabel}>Total identificado</span>
            <h3 className={`${styles.metricValue} ${styles.metricValueOrange}`}>12 Búfalas</h3>
            <span className={styles.metricSubtext}>14% do rebanho</span>
          </div>

          <div className={styles.metricGroup}>
            <span className={styles.metricLabel}>Queda média</span>
            <h3 className={`${styles.metricValue} ${styles.metricValueRed}`}>8.5%</h3>
          </div>
        </div>

        <div className={styles.alertBox}>
          <h4 className={styles.alertTitle}>Atenção requerida</h4>
          <p className={styles.alertText}>
            12 búfalas apresentam queda na produção nos últimos 7 dias. Verifique a alimentação e possíveis problemas de
            saúde.
          </p>
        </div>

        <button className={styles.button} onClick={() => setModalAberto(true)}>
          Ver Búfalas com quedas
        </button>

        <ProducaoQuedaModal isOpen={modalAberto} onClose={() => setModalAberto(false)} />
      </div>
    </div>
  )
}


