import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
  } from "recharts";
  import styles from "./TopBuffaloesChart.module.css";
  
  const mockData = [
    { name: "Búfala 01", leite: 32 },
    { name: "Búfala 02", leite: 29 },
    { name: "Búfala 03", leite: 27 },
    { name: "Búfala 04", leite: 26 },
    { name: "Búfala 05", leite: 25 },
    { name: "Búfala 06", leite: 23 },
    { name: "Búfala 07", leite: 22 },
    { name: "Búfala 08", leite: 21 },
    { name: "Búfala 09", leite: 20 },
    { name: "Búfala 10", leite: 19 },
  ];
  
  export default function TopBuffaloesChart() {
    return (
      <div className={styles.chartContainer}>
        <h3 className={styles.title}>Top 10 Búfalas por Produção</h3>
        <div className={styles.graphContainer}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={mockData}
              layout="vertical"
              margin={{ top: 5, right: 20, bottom: 5, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                tickSize={5}
                tickFormatter={(value) => `${value}`} 
              />
              <YAxis
                dataKey="name"
                type="category"
                width={150}
                tick={{ fontSize: 14 }} 
                tickFormatter={(value) => value}
                angle={-45} 
                textAnchor="end" 
                padding={{ top: 10, bottom: 10 }} // Dá mais espaço entre os itens
              />
              <Tooltip />
              <Bar dataKey="leite" fill="#F2B84D" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  