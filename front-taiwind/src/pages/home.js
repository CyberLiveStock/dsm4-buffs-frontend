"use client";

import { useState, useEffect } from "react";
import Layout from "@/layout/Layout";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

export default function Home() {
  // Valores mockados (simulados)
  const [buffaloCount] = useState(250);
  const [femaleCount] = useState(150);
  const [maleCount] = useState(100);
  const [discardedCount] = useState(20);

  const femalePercentage = buffaloCount
    ? ((femaleCount / buffaloCount) * 100).toFixed(1)
    : 0;
  const malePercentage = buffaloCount
    ? ((maleCount / buffaloCount) * 100).toFixed(1)
    : 0;

  return (
    
      <div className="p-6 flex flex-col items-center gap-8">
        {/* Header and Indicators */}
        <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Olá, João Lima!
            </h1>
            <p className="text-gray-600">
              Bem-vindo ao dashboard da sua fazenda de búfalos. Aqui está o
              resumo de hoje.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
              <h2 className="text-sm font-medium text-gray-500">
                Total de Búfalos
              </h2>
              <p className="text-2xl font-bold text-gray-800">{buffaloCount}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
              <h2 className="text-sm font-medium text-gray-500">
                Total de Machos
              </h2>
              <p className="text-2xl font-bold text-gray-800">{maleCount}</p>
              <p className="text-sm font-medium text-gray-500">
                {malePercentage}% do rebanho
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
              <h2 className="text-sm font-medium text-gray-500">
                Total de Fêmeas
              </h2>
              <p className="text-2xl font-bold text-gray-800">{femaleCount}</p>
              <p className="text-sm font-medium text-gray-500">
                {femalePercentage}% do rebanho
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
              <h2 className="text-sm font-medium text-gray-500">
                Funcionários
              </h2>
              <p className="text-2xl font-bold text-gray-800">15</p>
            </div>
          </div>
        </div>

        {/* Charts - First Row */}
        <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MilkProduction />
            <TopBuffaloesChart />
          </div>
        </div>

        {/* Sales Indicators */}
        <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Vendas para Indústria
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
              <h2 className="text-sm font-medium text-gray-500">
                Última Coleta
              </h2>
              <p className="text-2xl font-bold text-gray-800">1.245 L</p>
              <h2 className="text-sm font-medium text-gray-500">
                Em 28/03/2025
              </h2>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
              <h2 className="text-sm font-medium text-gray-500">
                Valor por litro
              </h2>
              <p className="text-2xl font-bold text-gray-800">R$ 3.86</p>
              <p className="text-sm font-medium text-gray-500">
                0,4% Média das últimas vendas
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
              <h2 className="text-sm font-medium text-gray-500">
                Faturamento estimado
              </h2>
              <p className="text-2xl font-bold text-gray-800">R$ 143.220,00</p>
              <p className="text-sm font-medium text-gray-500">
                3,2% baseado na produção mensal
              </p>
            </div>
          </div>
        </div>

        {/* Production Collection Chart */}
        <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
          <ProductionCollectionChart />
        </div>
      </div>
   
  );
}

// MilkProduction Component
function MilkProduction() {
  const [isClient, setIsClient] = useState(false);
  const [activeButton, setActiveButton] = useState(1);

  const weeklyData = [
    { name: "Segunda", uv: 4000 },
    { name: "Terça", uv: 3100 },
    { name: "Quarta", uv: 2200 },
    { name: "Quinta", uv: 2780 },
    { name: "Sexta", uv: 1890 },
    { name: "Sábado", uv: 2390 },
    { name: "Domingo", uv: 3490 },
  ];

  const monthlyData = [
    { name: "Semana 1", uv: 16000 },
    { name: "Semana 2", uv: 14500 },
    { name: "Semana 3", uv: 12800 },
    { name: "Semana 4", uv: 17000 },
  ];

  const yearlyData = [
    { name: "Jan", uv: 60000 },
    { name: "Fev", uv: 50000 },
    { name: "Mar", uv: 45000 },
    { name: "Abr", uv: 53000 },
    { name: "Mai", uv: 60000 },
    { name: "Jun", uv: 70000 },
    { name: "Jul", uv: 65000 },
    { name: "Ago", uv: 67000 },
    { name: "Set", uv: 72000 },
    { name: "Out", uv: 69000 },
    { name: "Nov", uv: 71000 },
    { name: "Dez", uv: 74000 },
  ];

  const getDataForPeriod = () => {
    if (activeButton === 1) {
      return { data: weeklyData, title: "Média Semanal", value: "1000L" };
    } else if (activeButton === 2) {
      return { data: monthlyData, title: "Média Mensal", value: "15000L" };
    } else {
      return { data: yearlyData, title: "Média Anual", value: "60000L" };
    }
  };

  const { data, title, value } = getDataForPeriod();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  return (
    <div className="bg-[#f8fcfa] p-4 rounded-lg border border-[#e0e0e0]">
      <div className="flex justify-between mb-4 bg-white rounded-md">
        <button
          className={`py-2 px-4 rounded-md w-1/3 transition-all duration-300 ${
            activeButton === 1
              ? "bg-[#f2b84d] text-black"
              : "bg-white text-black hover:bg-[#f2b84d] hover:text-white"
          }`}
          onClick={() => handleButtonClick(1)}
        >
          Semana
        </button>
        <button
          className={`py-2 px-4 rounded-md w-1/3 transition-all duration-300 ${
            activeButton === 2
              ? "bg-[#f2b84d] text-black"
              : "bg-white text-black hover:bg-[#f2b84d] hover:text-white"
          }`}
          onClick={() => handleButtonClick(2)}
        >
          Mês
        </button>
        <button
          className={`py-2 px-4 rounded-md w-1/3 transition-all duration-300 ${
            activeButton === 3
              ? "bg-[#f2b84d] text-black"
              : "bg-white text-black hover:bg-[#f2b84d] hover:text-white"
          }`}
          onClick={() => handleButtonClick(3)}
        >
          Ano
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-around gap-4">
        <div className="flex-1 min-w-[300px] p-4 bg-white rounded-md border-2 border-gray-300 flex flex-col items-center justify-center">
          <h4 className="text-base font-medium text-black mb-2">
            Gráfico de Produção
          </h4>

          <div className="w-full h-[265px]">
            <ResponsiveContainer>
              <AreaChart
                key={activeButton}
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  interval={0}
                  angle={-35}
                  textAnchor="end"
                  style={{ fontSize: 10 }}
                />
                <YAxis
                  tickCount={6}
                  tickFormatter={(value) => `${value}L`}
                  style={{ fontSize: 10 }}
                />
                <Tooltip formatter={(value) => `${value}L`} />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full md:w-[30%] p-4 bg-white rounded-md border-2 border-gray-300 flex flex-col items-center justify-center">
          <h3 className="text-base font-bold text-gray-800 mb-2">{title}</h3>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold text-blue-600 mb-1">{value}</p>
            <p className="text-sm text-gray-600">Meta atingida</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// TopBuffaloesChart Component
function TopBuffaloesChart() {
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

  const COLORS = ["#F2B84D"];

  return (
    <div className="bg-white rounded-lg p-5 shadow border border-[#e0e0e0]">
      <h3 className="text-gray-800 text-lg mb-5 text-center text-black">
        Top 10 Búfalas por Produção Diária (Litros)
      </h3>
      <div className="w-auto mt-2.5">
      <ResponsiveContainer width="100%" height={300}>
  <BarChart
    data={data}
    layout="vertical"
    margin={{ top: 20, right: 30, bottom: 40 }}
    barSize={15} // menor pra caber mais barras
  >
    <CartesianGrid strokeDasharray="3 3" horizontal={false} />

    <XAxis
      type="number"
      domain={[0, "dataMax + 5"]}
      tick={{ fill: "#666" }}
      axisLine={{ stroke: "#ccc" }}
      tickLine={{ stroke: "#ccc" }}
      label={{
        value: "Litros de leite/dia",
        position: "insideBottomRight",
        offset: -10,
        fill: "#666",
      }}
    />

    <YAxis
      dataKey="name"
      type="category"
      width={160}
      tick={{
        fontSize: 12,
        fill: "#333",
      }}
      minTickGap={0} // força mostrar tudo
      interval={0}   // impede que pule labels
      axisLine={false}
      tickLine={false}
    />

    <Tooltip
      formatter={(value) => [`${value} litros`, "Produção"]}
      labelFormatter={(name) => `Búfala: ${name}`}
      contentStyle={{
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    />

    <Legend
      verticalAlign="top"
      height={36}
      formatter={() => "Produção diária"}
      wrapperStyle={{ color: "#000" }}
    />

    <Bar
      dataKey="leite"
      name="Produção"
      radius={[0, 4, 4, 0]}
      label={{ position: "right", fill: "#333" }}
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

// ProductionCollectionChart Component
function ProductionCollectionChart() {
  const data = [
    { month: "Jan", producao: 4200, coleta: 3800 },
    { month: "Fev", producao: 3900, coleta: 3600 },
    { month: "Mar", producao: 4500, coleta: 4200 },
    { month: "Abr", producao: 4800, coleta: 4500 },
    { month: "Mai", producao: 5100, coleta: 4900 },
    { month: "Jun", producao: 5400, coleta: 5200 },
    { month: "Jul", producao: 5200, coleta: 5000 },
    { month: "Ago", producao: 4900, coleta: 4700 },
    { month: "Set", producao: 4600, coleta: 4400 },
    { month: "Out", producao: 4300, coleta: 4100 },
    { month: "Nov", producao: 4000, coleta: 3800 },
    { month: "Dez", producao: 3800, coleta: 3500 },
  ];

  return (
    <div className="w-full bg-white rounded-xl p-5">
      <h2 className="text-center text-xl font-bold mb-5 text-gray-800">
        Produção vs Coleta Mensal
      </h2>

      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />

            <XAxis
              dataKey="month"
              tick={{ fill: "#333", fontSize: 12 }}
              axisLine={{ stroke: "#ccc" }}
              tickLine={{ stroke: "#ccc" }}
            />

            <YAxis
              tick={{ fill: "#333", fontSize: 12 }}
              axisLine={{ stroke: "#ccc" }}
              tickLine={{ stroke: "#ccc" }}
              label={{
                value: "Litros",
                angle: -90,
                position: "insideLeft",
                fill: "#333",
              }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
              }}
              formatter={(value, name) => [
                `${value} litros`,
                name === "producao" ? "Produção" : "Coleta",
              ]}
              labelFormatter={(label) => `Mês: ${label}`}
            />

            <Legend
              verticalAlign="top"
              iconType="circle"
              formatter={(value) =>
                value === "producao" ? "Produção" : "Coleta"
              }
            />

            <Line
              type="monotone"
              dataKey="producao"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6, stroke: "#3B82F6", strokeWidth: 2 }}
            />

            <Line
              type="monotone"
              dataKey="coleta"
              stroke="#F97316"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6, stroke: "#F97316", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-4 text-center text-gray-600 text-sm">
        Gráfico comparativo da produção e coleta mensal de leite (litros)
      </p>
    </div>
  );
}


Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};