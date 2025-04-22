import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import styles from './MilkProduction.module.css'; // Certifique-se de importar o arquivo de estilos

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MilkProduction = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Produção de Leite",
        data: [300, 400, 350, 500, 600],
        fill: false,
        borderColor: "#007BFF",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className={styles.milkProductionContainer}>
      <div className={styles.buttonsContainer}>
        <button className={styles.button}>Botão 1</button>
        <button className={styles.button}>Botão 2</button>
        <button className={styles.button}>Botão 3</button>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.graphContainer}>
          <h4>Gráfico de Produção</h4>
          <Line data={data} />
        </div>

        <div className={styles.cardContainer}>
          <h3 className={styles.milkProductionTitle}>Produção de Leite</h3>
          <div className={styles.milkProductionInfo}>
            <p className={styles.milkProductionValue}>1000L</p>
            <p className={styles.milkProductionSubtitle}>Meta atingida</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilkProduction;
