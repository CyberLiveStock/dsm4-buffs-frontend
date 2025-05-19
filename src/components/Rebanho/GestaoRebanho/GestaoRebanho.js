import styles from "./GestaoRebanho.module.css";

export default function GestaoRebanho() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gestão do rebanho</h1>
        <p className={styles.subtitle}>
          Gerencie seu rebanho de búfalos, registre informações zootecnicas e
          sanitárias.
        </p>
      </div>

      <div className={styles.grid}>
        {/* Maturidade do rebanho */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Maturidade do rebanho</h2>
            <p className={styles.cardSubtitle}>Distribuição por estágio</p>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.itemGroup}>
              <div>
                <div className={styles.item}>
                  <span className={styles.itemLabel}>Novilhas</span>
                  <span className={styles.itemValue}>5</span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className={styles.item}>
                  <span className={styles.itemLabel}>Vacas</span>
                  <span className={styles.itemValue}>3</span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: "40%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className={styles.item}>
                  <span className={styles.itemLabel}>Touros</span>
                  <span className={styles.itemValue}>2</span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: "25%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className={styles.item}>
                  <span className={styles.itemLabel}>Bezerros</span>
                  <span className={styles.itemValue}>1</span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: "15%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sexo */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Sexo</h2>
            <p className={styles.cardSubtitle}>Distribuição por sexo</p>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.sexGrid}>
              <div className={styles.sexItem}>
                <div className={styles.sexValue}>4</div>
                <div className={styles.sexLabel}>Fêmeas</div>
                <div className={styles.sexPercent}>57% do rebanho</div>
              </div>
              <div className={styles.sexItem}>
                <div className={styles.sexValue}>3</div>
                <div className={styles.sexLabel}>Machos</div>
                <div className={styles.sexPercent}>43% do rebanho</div>
              </div>
            </div>
          </div>
        </div>

        {/* Raças */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Raças</h2>
            <p className={styles.cardSubtitle}>Distribuição do rebanho</p>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.itemGroup}>
              <div>
                <div className={styles.item}>
                  <span className={styles.itemLabel}>Murrah</span>
                  <span className={styles.itemValue}>3</span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className={styles.item}>
                  <span className={styles.itemLabel}>Mediterrâneo</span>
                  <span className={styles.itemValue}>2</span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: "35%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className={styles.item}>
                  <span className={styles.itemLabel}>Jafabadi</span>
                  <span className={styles.itemValue}>1</span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: "20%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className={styles.item}>
                  <span className={styles.itemLabel}>Carabao</span>
                  <span className={styles.itemValue}>1</span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: "20%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
