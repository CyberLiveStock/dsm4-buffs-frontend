"use client"

import { useEffect, useState } from "react"
import styles from "./StatusReprodutivo.module.css"

export default function StatusReprodutivo() {
  // Dados do status reprodutivo
  const statusData = [
    { status: "No cio", valor: 1.5 },
    { status: "Prenhez confirmada", valor: 1.5 },
    { status: "Lactando", valor: 0.5 },
    { status: "Em secagem", valor: 1.5 },
  ]

  // Estado para animação das barras
  const [animatedValues, setAnimatedValues] = useState(statusData.map(() => 0))

  // Efeito para animar as barras quando o componente é montado
  useEffect(() => {
    setAnimatedValues(statusData.map((item) => item.valor))
  }, [])

  // Valor máximo para escala do eixo Y
  const maxValue = Math.max(...statusData.map((item) => item.valor)) * 1.2

  // Valores do eixo Y
  const yAxisValues = [0, maxValue / 4, maxValue / 2, (maxValue * 3) / 4, maxValue]

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Distribuição por Status reprodutivo</h2>
        <p className={styles.subtitle}>Análise detalhada do status das búfalas</p>

        <div className={styles.chartContainer}>
          {/* Eixo Y */}
          <div className={styles.yAxis}>
            {yAxisValues.reverse().map((value, index) => (
              <div key={index} className={styles.yAxisLabel}>
                {value.toFixed(1)}
              </div>
            ))}
          </div>

          {/* Gráfico de barras */}
          <div className={styles.chart}>
            {statusData.map((item, index) => (
              <div
                key={index}
                className={styles.bar}
                style={{
                  height: `${(animatedValues[index] / maxValue) * 100}%`,
                }}
              >
                <div className={styles.barValue}>{item.valor.toFixed(1)}</div>
              </div>
            ))}
          </div>

          {/* Eixo X */}
          <div className={styles.xAxis}>
            {statusData.map((item, index) => (
              <div key={index} className={styles.xAxisLabel}>
                {item.status}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
