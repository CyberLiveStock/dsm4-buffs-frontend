import React, { useState, useEffect } from "react";
import MilkProduction from "@/components/Home/MilkProduction/MilkProduction";
import TopBuffaloesChart from "@/components/Home/TopBuffaloesChart/TopBuffaloesChart";
import ProductionCollectionChart from "@/components/Home/ProductionCollectionChart/ProductionCollectionChart.js";

// IMPORT DE FUNÇÕES
import { getAllBuffalos } from "@/services/buffaloService.js";

import Layout from "@/layout/Layout.js";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const [buffaloCount, setBuffaloCount] = useState(0); // Estado para armazenar o total de búfalos
  const [femaleCount, setFemaleCount] = useState(0); // Estado para armazenar o total de fêmeas
  const [maleCount, setMaleCount] = useState(0); // Estado para armazenar o total de machos

  // Função responsável por buscar os búfalos e atualizar os estados
  async function fetchBuffalos() {
    try {
      const buffalos = await getAllBuffalos(); // Pega todos os búfalos do banco
      setBuffaloCount(buffalos.length); // Atualiza o total de búfalos

      // Filtra e conta as fêmeas
      const onlyFemales = buffalos.filter(b => b.sexo === "Fêmea");
      setFemaleCount(onlyFemales.length); // Atualiza o total de fêmeas

      // Filtra e conta os machos
      const onlyMales = buffalos.filter(b => b.sexo === 'Macho');
      setMaleCount(onlyMales.length); // Atualiza o total de machos

      // Log de controle, só para ver no console
      console.log(`🐃 Atualizado: Total ${buffalos.length}, Fêmeas ${onlyFemales.length}, Machos ${onlyMales.length}`);
    } catch (error) {
      console.error("Erro ao buscar búfalos:", error); // Caso ocorra algum erro, é exibido no console
    }
  }

  useEffect(() => {
    // Executa a função de busca assim que o componente for montado pela primeira vez
    fetchBuffalos();

    // Configura o "polling" para atualizar os dados a cada 10 segundos (10000 ms)
    const intervalId = setInterval(fetchBuffalos, 1000); // Vai chamar fetchBuffalos a cada 10 segundos

    // Limpa o intervalo quando o componente for desmontado (evita vazamentos de memória)
    return () => clearInterval(intervalId);
  }, []); // O array vazio aqui garante que o efeito aconteça apenas na montagem do componente

  // Calcula a porcentagem de fêmeas em relação ao total de búfalos
  const femalePercentage = buffaloCount ? ((femaleCount / buffaloCount) * 100).toFixed(1) : 0;
  // Calcula a porcentagem de machos em relação ao total de búfalos
  const malePercentage = buffaloCount ? ((maleCount / buffaloCount) * 100).toFixed(1) : 0;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.indicators}>
          <div>
            <h1 className={styles.title}>Olá, João Barreto!</h1>
            <p className={styles.description}>
              Bem-vindo ao dashboard da sua fazenda de búfalos. Aqui está o resumo de hoje.
            </p>
          </div>
          <div className={styles.indicatorContainer}>
            <div className={styles.indicatorCard}>
              <h2 className={styles.indicatorTitle}>Total de Búfalos</h2>
              <p className={styles.indicatorValue}>{buffaloCount}</p> {/* Exibe o número total de búfalos */}
            </div>
            <div className={styles.indicatorCard}>
              <h2 className={styles.indicatorTitle}>Total de Machos</h2>
              <p className={styles.indicatorValue}>{maleCount}</p> {/* Exibe o número de machos */}
              <p className={styles.indicatorTitle}>{malePercentage}% do rebanho</p> {/* Exibe a porcentagem de machos */}
            </div>
            <div className={styles.indicatorCard}>
              <h2 className={styles.indicatorTitle}>Total de Fêmeas</h2>
              <p className={styles.indicatorValue}>{femaleCount}</p> {/* Exibe o número de fêmeas */}
              <p className={styles.indicatorTitle}>{femalePercentage}% do rebanho</p> {/* Exibe a porcentagem de fêmeas */}
            </div>
            <div className={styles.indicatorCard}>
              <h2 className={styles.indicatorTitle}>Funcionários</h2>
              <p className={styles.indicatorValue}>15</p> {/* Exibe o número de funcionários */}
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
              <h2 className={styles.indicatorTitle}>Valor por litro </h2>
              <p className={styles.indicatorValue}>R$ 3.86</p>
              <p className={styles.indicatorTitle}>0,4% Média das ultimas vendas</p>
            </div>
            <div className={styles.indicatorCard}>
              <h2 className={styles.indicatorTitle}>Faturamento estimado</h2>
              <p className={styles.indicatorValue}>R$ 143.220,00</p>
              <p className={styles.indicatorTitle}>3,2% baseado na produção mensal</p>
            </div>
          </div>
        </div>
        <div className={styles.graph}>
          <div className={styles.graphContainer}>
            <ProductionCollectionChart />
          </div>
        </div>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
