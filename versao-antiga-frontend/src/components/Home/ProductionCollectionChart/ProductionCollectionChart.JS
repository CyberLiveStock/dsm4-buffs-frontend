'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const ProductionCollectionChart = () => {
  const data = [
    { month: 'Jan', producao: 4200, coleta: 3800 },
    { month: 'Fev', producao: 3900, coleta: 3600 },
    { month: 'Mar', producao: 4500, coleta: 4200 },
    { month: 'Abr', producao: 4800, coleta: 4500 },
    { month: 'Mai', producao: 5100, coleta: 4900 },
    { month: 'Jun', producao: 5400, coleta: 5200 },
    { month: 'Jul', producao: 5200, coleta: 5000 },
    { month: 'Ago', producao: 4900, coleta: 4700 },
    { month: 'Set', producao: 4600, coleta: 4400 },
    { month: 'Out', producao: 4300, coleta: 4100 },
    { month: 'Nov', producao: 4000, coleta: 3800 },
    { month: 'Dez', producao: 3800, coleta: 3500 },
  ];

  return (
    <div style={{
      width: '100%',
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      padding: '20px',
      border: '1px solid #ddd'
    }}>
      <h2 style={{ 
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#333'
      }}>
        Produção vs Coleta Mensal
      </h2>

      <div style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />

            <XAxis 
              dataKey="month" 
              tick={{ fill: '#333', fontSize: 12 }}
              axisLine={{ stroke: '#ccc' }}
              tickLine={{ stroke: '#ccc' }}
            />

            <YAxis
              tick={{ fill: '#333', fontSize: 12 }}
              axisLine={{ stroke: '#ccc' }}
              tickLine={{ stroke: '#ccc' }}
              label={{
                value: 'Litros',
                angle: -90,
                position: 'insideLeft',
                fill: '#333'
              }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 3px 6px rgba(0,0,0,0.1)'
              }}
              formatter={(value, name) => [`${value} litros`, name === 'producao' ? 'Produção' : 'Coleta']}
              labelFormatter={(label) => `Mês: ${label}`}
            />

            <Legend 
              verticalAlign="top"
              iconType="circle"
              formatter={(value) => value === 'producao' ? 'Produção' : 'Coleta'}
            />

            <Line
              type="monotone"
              dataKey="producao"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
            />

            <Line
              type="monotone"
              dataKey="coleta"
              stroke="#F97316"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6, stroke: '#F97316', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p style={{ 
        marginTop: '16px', 
        textAlign: 'center', 
        color: '#666', 
        fontSize: '14px' 
      }}>
        Gráfico comparativo da produção e coleta mensal de leite (litros)
      </p>
    </div>
  );
};

export default ProductionCollectionChart;
