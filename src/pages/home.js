import MilkProduction from "@/components/Home/MilkProduction/MilkProduction";
import TopBuffaloesChart from "@/components/Home/TopBuffaloesChart/TopBuffaloesChart";
import ProductionCollectionChart from "@/components/Home/ProductionCollectionChart/ProductionCollectionChart.js";

import Layout from "@/layout/Layout.js";
import styles from "@/styles/Home.module.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.indicators}>
          <div>
            <h1 className={styles.title}>Olá, João Barreto!</h1>
            <p className={styles.description}>
              Bem-vindo ao dashboard da sua fazenda de búfalos. Aqui está o
              resumo de hoje.
            </p>
          </div>
          <div className={styles.indicatorContainer}>
            <div className={styles.indicatorCard}>
              <h2 className={styles.indicatorTitle}>Total de Búfalos</h2>
              <p className={styles.indicatorValue}>247</p>
            </div>
            <div className={styles.indicatorCard}>
              <h2 className={styles.indicatorTitle}>Total de Machos</h2>
              <p className={styles.indicatorValue}>186</p>
              <p className={styles.indicatorTitle}>25% do rebanho</p>
            </div>
            <div className={styles.indicatorCard}>
              <h2 className={styles.indicatorTitle}>Total de Fêmeas</h2>
              <p className={styles.indicatorValue}>61</p>
              <p className={styles.indicatorTitle}>75% do rebanho</p>
            </div>
            <div className={styles.indicatorCard}>
              <h2 className={styles.indicatorTitle}>Funcionários</h2>
              <p className={styles.indicatorValue}>15</p>
            </div>
          </div>
        </div>
        <div className={styles.graph}>
          <div className={styles.graphContainer}>
            <MilkProduction></MilkProduction>
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
              <h2 className={styles.indicatorTitle}>Valor por litro </h2>
              <p className={styles.indicatorValue}>R$ 3.86</p>
              <p className={styles.indicatorTitle}>
                0,4% Média das ultimas vendas
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
          <ProductionCollectionChart></ProductionCollectionChart>
        </div>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
