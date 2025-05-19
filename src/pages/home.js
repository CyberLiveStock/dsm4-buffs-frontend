import React, { useState, useEffect } from "react";
import MilkProduction from "@/components/Home/MilkProduction/MilkProduction";
import TopBuffaloesChart from "@/components/Home/TopBuffaloesChart/TopBuffaloesChart";
import ProductionCollectionChart from "@/components/Home/ProductionCollectionChart/ProductionCollectionChart";
import { fetchBuffaloStats } from "@/utils/buffaloUtil"; // Importa a função utilitária
import Layout from "@/layout/Layout";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const [buffaloCount, setBuffaloCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [maleCount, setMaleCount] = useState(0);
  const [discardedCount, setDiscardedCount] = useState(0);

  async function fetchBuffalos() {
    const stats = await fetchBuffaloStats();

    setBuffaloCount(stats.active.total);
    setFemaleCount(stats.active.females);
    setMaleCount(stats.active.males);
    setDiscardedCount(stats.discarded.total);
  }

  useEffect(() => {
    fetchBuffalos();
    const intervalId = setInterval(fetchBuffalos, 10000); // Atualiza a cada 10s
    return () => clearInterval(intervalId);
  }, []);

  const femalePercentage = buffaloCount
    ? ((femaleCount / buffaloCount) * 100).toFixed(1)
    : 0;
  const malePercentage = buffaloCount
    ? ((maleCount / buffaloCount) * 100).toFixed(1)
    : 0;

  return (
    <div className={styles.container}>
      <div className={styles.indicators}>
        <div>
          <h1 className={styles.title}>Olá, João Lima!</h1>
          <p className={styles.description}>
            Bem-vindo ao dashboard da sua fazenda de búfalos. Aqui está o resumo de hoje.
          </p>
        </div>
        <div className={styles.indicatorContainer}>
          <div className={styles.indicatorCard}>
            <h2 className={styles.indicatorTitle}>Total de Búfalos</h2>
            <p className={styles.indicatorValue}>{buffaloCount}</p>
          </div>
          <div className={styles.indicatorCard}>
            <h2 className={styles.indicatorTitle}>Total de Machos</h2>
            <p className={styles.indicatorValue}>{maleCount}</p>
            <p className={styles.indicatorTitle}>{malePercentage}% do rebanho</p>
          </div>
          <div className={styles.indicatorCard}>
            <h2 className={styles.indicatorTitle}>Total de Fêmeas</h2>
            <p className={styles.indicatorValue}>{femaleCount}</p>
            <p className={styles.indicatorTitle}>{femalePercentage}% do rebanho</p>
          </div>
          <div className={styles.indicatorCard}>
            <h2 className={styles.indicatorTitle}>Funcionários</h2>
            <p className={styles.indicatorValue}>15</p>
          </div>
        </div>
      </div>

      <div className={styles.graph}>
        <div className={styles.graphContainer}>
          <MilkProduction />
        </div>
        <div className={styles.graphContainer}>
          <TopBuffaloesChart />
        </div>
      </div>

      <div className={styles.indicators}>
        <div>
          <h1 className={styles.title}>Vendas para Indústria</h1>
        </div>
        <div className={styles.indicatorContainer}>
          <div className={styles.indicatorCard}>
            <h2 className={styles.indicatorTitle}>Última Coleta</h2>
            <p className={styles.indicatorValue}>1.245 L</p>
            <h2 className={styles.indicatorTitle}>Em 28/03/2025</h2>
          </div>
          <div className={styles.indicatorCard}>
            <h2 className={styles.indicatorTitle}>Valor por litro</h2>
            <p className={styles.indicatorValue}>R$ 3.86</p>
            <p className={styles.indicatorTitle}>
              0,4% Média das últimas vendas
            </p>
          </div>
          <div className={styles.indicatorCard}>
            <h2 className={styles.indicatorTitle}>Faturamento estimado</h2>
            <p className={styles.indicatorValue}>R$ 143.220,00</p>
            <p className={styles.indicatorTitle}>
              3,2% baseado na produção mensal
            </p>
          </div>
        </div>
      </div>

      <div className={styles.graph}>
        <div className={styles.graphContainer}>
          <ProductionCollectionChart />
        </div>
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
