import styles from "./DoencasRecorrentes.module.css";

export default function DoencasRecorrentes() {
  // Dados das doenças recorrentes
  const doencasGerais = [
    { nome: "Brucelose", percentual: 14.2 },
    { nome: "Mastite", percentual: 11.8 },
    { nome: "Febre Aftosa", percentual: 9.5 },
    { nome: "Tuberculose", percentual: 7.3 },
    { nome: "Dermatite", percentual: 6.1 },
  ];

  // Dados das doenças por maturidade
  const doencasPorMaturidade = [
    { categoria: "Bezerros", percentual: 45.0 }, // Diarreia, pneumonia, etc.
    { categoria: "Novilhos", percentual: 20.0 }, // Dermatite, parasitoses
    { categoria: "Adultos", percentual: 30.0 }, // Mastite, brucelose, febre aftosa
    { categoria: "Idosos", percentual: 5.0 }, // Tuberculose, debilidade geral
  ];
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {/* Doenças recorrentes */}
        <div className={styles.card}>
          <h2 className={styles.title}>Doenças recorrentes</h2>
          <p className={styles.subtitle}>Doenças recorrentes registradas</p>

          <div className={styles.diseaseList}>
            {doencasGerais.map((doenca, index) => (
              <div key={index} className={styles.diseaseItem}>
                <div className={styles.diseaseHeader}>
                  <span className={styles.diseaseName}>{doenca.nome}</span>
                  <span className={styles.diseasePercentage}>
                    {doenca.percentual.toFixed(1)}%
                  </span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${doenca.percentual}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Doenças recorrentes por nível de maturidade */}
        <div className={styles.card}>
          <h2 className={styles.title}>
            Doenças recorrentes por nível de maturidade
          </h2>
          <p className={styles.subtitle}>Doenças recorrentes registradas</p>

          <div className={styles.diseaseList}>
            {doencasPorMaturidade.map((item, index) => (
              <div key={index} className={styles.diseaseItem}>
                <div className={styles.diseaseHeader}>
                  <span className={styles.diseaseName}>{item.categoria}</span>
                  <span className={styles.diseasePercentage}>
                    {item.percentual.toFixed(2)}%
                  </span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${item.percentual}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
