'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Cell,
  LabelList
} from "recharts";
import styles from "./TopBuffaloesChart.module.css";

const data = [
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

// Cores gradientes para as barras
const COLORS = [
  '#F2B84D'
];

export default function TopBuffaloesChart() {
  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.title}>Top 10 Búfalas por Produção Diária (Litros)</h3>
      <div className={styles.graphContainer}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
            barSize={25}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            
            <XAxis 
              type="number" 
              domain={[0, 'dataMax + 5']}
              tick={{ fill: '#666' }}
              axisLine={{ stroke: '#ccc' }}
              tickLine={{ stroke: '#ccc' }}
              label={{ 
                value: 'Litros de leite/dia', 
                position: 'insideBottomRight', 
                offset: -10,
                fill: '#666'
              }}
            />
            
            <YAxis
              dataKey="name"
              type="category"
              width={120}
              tick={{ fontSize: 12, fill: '#333' }}
              axisLine={false}
              tickLine={false}
            />
            
            <Tooltip 
              formatter={(value) => [`${value} litros`, 'Produção']}
              labelFormatter={(name) => `Búfala: ${name}`}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
            
            <Legend 
              verticalAlign="top" 
              height={36}
              formatter={() => 'Produção diária'}
            />
            
            <Bar 
              dataKey="leite" 
              name="Produção" 
              radius={[0, 4, 4, 0]}
              label={{ position: 'right', fill: '#333' }}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                />
              ))}
              <LabelList 
                dataKey="leite" 
                position="right" 
                formatter={(value) => `${value} L`}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}