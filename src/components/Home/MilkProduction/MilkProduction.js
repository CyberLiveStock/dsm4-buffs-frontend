'use client';

import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './MilkProduction.module.css'; 

// Dados para a semana, mês e ano
const weeklyData = [
  { name: 'Segunda', uv: 4000 },
  { name: 'Terça', uv: 3000 },
  { name: 'Quarta', uv: 2000 },
  { name: 'Quinta', uv: 2780 },
  { name: 'Sexta', uv: 1890 },
  { name: 'Sábado', uv: 2390 },
  { name: 'Domingo', uv: 3490 },
];

const monthlyData = [
  { name: 'Semana 1', uv: 16000 },
  { name: 'Semana 2', uv: 14000 },
  { name: 'Semana 3', uv: 12000 },
  { name: 'Semana 4', uv: 17000 },
];

const yearlyData = [
  { name: 'Janeiro', uv: 60000 },
  { name: 'Fevereiro', uv: 50000 },
  { name: 'Março', uv: 45000 },
  { name: 'Abril', uv: 53000 },
  { name: 'Maio', uv: 60000 },
  { name: 'Junho', uv: 70000 },
];

const MilkProduction = () => {
  const [isClient, setIsClient] = useState(false);
  const [activeButton, setActiveButton] = useState(1);  // Botão 1 já começa selecionado

  // Definir dados e título do card com base no botão ativo
  const getDataForPeriod = () => {
    if (activeButton === 1) {
      return { data: weeklyData, title: 'Média Semanal', value: '1000L' };
    } else if (activeButton === 2) {
      return { data: monthlyData, title: 'Média Mensal', value: '15000L' };
    } else {
      return { data: yearlyData, title: 'Média Anual', value: '60000L' };
    }
  };

  const { data, title, value } = getDataForPeriod();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Ou um spinner de carregamento
  }

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId); // Atualiza o botão ativo
  };

  return (
    <div className={styles.milkProductionContainer}>
      <div className={styles.buttonsContainer}>
        <button
          className={`${styles.button} ${activeButton === 1 ? styles.buttonActive : ''}`}
          onClick={() => handleButtonClick(1)}
        >
          Semana
        </button>
        <button
          className={`${styles.button} ${activeButton === 2 ? styles.buttonActive : ''}`}
          onClick={() => handleButtonClick(2)}
        >
          Mês
        </button>
        <button
          className={`${styles.button} ${activeButton === 3 ? styles.buttonActive : ''}`}
          onClick={() => handleButtonClick(3)}
        >
          Ano
        </button>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.graphContainer}>
          <h4>Gráfico de Produção</h4>
          <div style={{ width: '100%', height: 110 }}>
            <ResponsiveContainer>
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.cardContainer}>
          <h3 className={styles.milkProductionTitle}>{title}</h3>
          <div className={styles.milkProductionInfo}>
            <p className={styles.milkProductionValue}>{value}</p>
            <p className={styles.milkProductionSubtitle}>Meta atingida</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilkProduction;
