import MilkProduction from "@/components/Home/MilkProduction/MilkProduction";
import Layout from "@/layout/Layout.js";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.message}>Olá, João Barreto!</h1>
        <p className={styles.subtitle}>
          Bem-vindo ao dashboard da sua fazenda de búfalos. Aqui está o resumo
          de hoje.
        </p>
      </div>

      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <h3>Total de búfalos</h3>
          <p className={styles.cardValue}>247</p>
          <p className={styles.cardInfo}>Machos: 186 (25% do rebanho)</p>
          <p className={styles.cardInfo}>Fêmeas: 186 (75% do rebanho)</p>
        </div>

        <div className={styles.card}>
          <h3>Machos</h3>
          <p className={styles.cardValue}>186</p>
          <p className={styles.cardInfo}>25% do rebanho</p>
        </div>

        <div className={styles.card}>
          <h3>Fêmeas</h3>
          <p className={styles.cardValue}>186</p>
          <p className={styles.cardInfo}>75% do rebanho</p>
        </div>

        <div className={styles.card}>
          <h3>Funcionários</h3>
          <p className={styles.cardValue}>15</p>
          <p className={styles.cardInfo}>Equipe completa</p>
        </div>
      </div>

      <MilkProduction />
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
