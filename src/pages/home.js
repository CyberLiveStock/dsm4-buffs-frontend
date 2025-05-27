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
import {
  fetchBuffaloStats,
  fetchEmployeeCount,
  fetchLactationData,
  fetchTopBuffalos,
  fetchProductionSalesData,
  fetchProductionVsCollectionData,
  fetchProductionChartData,  // Importa aqui também
} from "@/utils/homeUtil";

export default function Home() {
  const [buffaloStats, setBuffaloStats] = useState({
    total: 0,
    females: 0,
    males: 0,
  });
  const [employeeCount, setEmployeeCount] = useState(0);
  const [lactationData, setLactationData] = useState({
    weekly: [],
    monthly: [],
    yearly: [],
  });
  const [topBuffalosData, setTopBuffalosData] = useState({
    buffalos: [],
    count: 0,
  });
  const [salesData, setSalesData] = useState({
    lastCollection: { amount: 0, date: null },
    pricePerLiter: 0,
    estimatedRevenue: 0,
  });
  const [productionVsCollection, setProductionVsCollection] = useState([]);
  const [productionChartData, setProductionChartData] = useState({
    monthly: [],
    yearly: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);

        // Carregar todos os dados em paralelo
        const [
          buffaloStatsData,
          employeeCountData,
          lactationDataResult,
          topBuffalosResult,
          salesDataResult,
          productionVsCollectionData,
          productionChartDataResult, // Aqui adiciona
        ] = await Promise.all([
          fetchBuffaloStats(),
          fetchEmployeeCount(),
          fetchLactationData(),
          fetchTopBuffalos(),
          fetchProductionSalesData(),
          fetchProductionVsCollectionData(),
          fetchProductionChartData(), // Função chamada aqui
        ]);

        setBuffaloStats(buffaloStatsData);
        setEmployeeCount(employeeCountData);
        setLactationData(lactationDataResult);
        setTopBuffalosData(topBuffalosResult);
        setSalesData(salesDataResult);
        setProductionVsCollection(productionVsCollectionData);
        setProductionChartData(productionChartDataResult); // Guarda no estado
      } catch (error) {
        console.error("❌ Erro ao carregar dados do dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

useEffect(() => {
  console.log("Lactation Data Mensal:", lactationData.monthly);
  console.log("Lactation Data Anual:", lactationData.yearly);
}, [lactationData]);


  const femalePercentage = buffaloStats.total
    ? ((buffaloStats.females / buffaloStats.total) * 100).toFixed(1)
    : 0;

  const malePercentage = buffaloStats.total
    ? ((buffaloStats.males / buffaloStats.total) * 100).toFixed(1)
    : 0;

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  function MilkProduction({ lactationData }) {
  const [isClient, setIsClient] = useState(false);
  const [activeButton, setActiveButton] = useState(1); // 1 = mensal, 2 = anual

  const getDataForPeriod = () => {
  if (activeButton === 1) {
    // Produção mensal total
    const totalProduction = lactationData.monthly.reduce(
      (sum, week) => sum + (week.uv || 0) * (week.count || 0),
      0
    );
    const dataForChart = lactationData.monthly.map(item => ({
      name: item.name,
      uv: (item.uv || 0) * (item.count || 0),
    }));
    return {
      data: dataForChart,
      title: "Produção Mensal Total",
      value: `${totalProduction}L`,
    };
  } else if (activeButton === 2) {
    // Produção anual total
    const totalProduction = lactationData.yearly.reduce(
      (sum, item) => sum + (item.uv || 0) * (item.count || 0),
      0
    );
    const dataForChart = lactationData.yearly.map(item => ({
      name: item.name,
      uv: (item.uv || 0) * (item.count || 0),
    }));
    return {
      data: dataForChart,
      title: "Produção Anual Total",
      value: `${totalProduction}L`,
    };
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
        className={`py-2 px-4 rounded-md w-1/2 transition-all duration-300 ${
          activeButton === 1
            ? "bg-[#f2b84d] text-black"
            : "bg-white text-black hover:bg-[#f2b84d] hover:text-white"
        }`}
        onClick={() => handleButtonClick(1)}
      >
        Mês
      </button>
      <button
        className={`py-2 px-4 rounded-md w-1/2 transition-all duration-300 ${
          activeButton === 2
            ? "bg-[#f2b84d] text-black"
            : "bg-white text-black hover:bg-[#f2b84d] hover:text-white"
        }`}
        onClick={() => handleButtonClick(2)}
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

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dados do dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col items-center gap-8">
      {/* Header and Indicators */}
      <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Olá, João Lima!</h1>
          <p className="text-gray-600">
            Bem-vindo ao dashboard da sua fazenda de búfalos. Aqui está o resumo
            de hoje.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
            <h2 className="text-sm font-medium text-gray-500">
              Total de Búfalos
            </h2>
            <p className="text-2xl font-bold text-gray-800">
              {buffaloStats.total}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
            <h2 className="text-sm font-medium text-gray-500">
              Total de Machos
            </h2>
            <p className="text-2xl font-bold text-gray-800">
              {buffaloStats.males}
            </p>
            <p className="text-sm font-medium text-gray-500">
              {malePercentage}% do rebanho
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
            <h2 className="text-sm font-medium text-gray-500">
              Total de Fêmeas
            </h2>
            <p className="text-2xl font-bold text-gray-800">
              {buffaloStats.females}
            </p>
            <p className="text-sm font-medium text-gray-500">
              {femalePercentage}% do rebanho
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
            <h2 className="text-sm font-medium text-gray-500">
              Total de Usuários
            </h2>
            <p className="text-2xl font-bold text-gray-800">{employeeCount}</p>
          </div>
        </div>
      </div>

      {/* Charts - First Row */}
      <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MilkProduction lactationData={lactationData} />
          <TopBuffaloesChart topBuffalosData={topBuffalosData} />
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
            <h2 className="text-sm font-medium text-gray-500">Última Coleta</h2>
            <p className="text-2xl font-bold text-gray-800">
              {salesData.lastCollection.amount.toLocaleString("pt-BR")} L
            </p>
            <h2 className="text-sm font-medium text-gray-500">
              Em {formatDate(salesData.lastCollection.date)}
            </h2>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
            <h2 className="text-sm font-medium text-gray-500">
              Valor por litro
            </h2>
            <p className="text-2xl font-bold text-gray-800">
              {formatCurrency(salesData.pricePerLiter)}
            </p>
            <p className="text-sm font-medium text-gray-500">
              Média das últimas vendas
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-[#e0e0e0]">
            <h2 className="text-sm font-medium text-gray-500">
              Faturamento estimado
            </h2>
            <p className="text-2xl font-bold text-gray-800">
              {formatCurrency(salesData.estimatedRevenue)}
            </p>
            <p className="text-sm font-medium text-gray-500">
              Baseado na produção mensal
            </p>
          </div>
        </div>
      </div>

      {/* Production Collection Chart */}
      <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
        <ProductionCollectionChart data={productionVsCollection} />
      </div>
    </div>
  );
}

 

// TopBuffaloesChart Component - ATUALIZADO
function TopBuffaloesChart({ topBuffalosData }) {
  const COLORS = ["#F2B84D"];
  const { buffalos, count } = topBuffalosData;

  // Se não há dados, mostrar mensagem
  if (!buffalos || buffalos.length === 0) {
    return (
      <div className="bg-white rounded-lg p-5 shadow border border-[#e0e0e0]">
        <h3 className="text-gray-800 text-lg mb-5 text-center text-black">
          Top Búfalas por Produção Diária (Litros)
        </h3>
        <div className="flex items-center justify-center h-[300px]">
          <p className="text-gray-500">Nenhum dado de produção disponível</p>
        </div>
      </div>
    );
  }

  // Título dinâmico baseado na quantidade
  const getTitle = () => {
    if (count === 0) return "Top Búfalas por Produção Diária (Litros)";
    return `Top ${count} Búfala${
      count > 1 ? "s" : ""
    } por Produção Diária (Litros)`;
  };

  return (
    <div className="bg-white rounded-lg p-5 shadow border border-[#e0e0e0]">
      <h3 className="text-gray-800 text-lg mb-5 text-center text-black">
        {getTitle()}
      </h3>
      <div className="w-auto mt-2.5">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={buffalos}
            layout="vertical"
            margin={{ top: 20, right: 30, bottom: 40 }}
            barSize={15}
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
              minTickGap={0}
              interval={0}
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
              {buffalos.map((entry, index) => (
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
function ProductionCollectionChart({ data }) {
  // Se não há dados, mostrar dados padrão ou mensagem
  if (!data || data.length === 0) {
    return (
      <div className="w-full bg-white rounded-xl p-5">
        <h2 className="text-center text-xl font-bold mb-5 text-gray-800">
          Produção vs Coleta Mensal
        </h2>
        <div className="flex items-center justify-center h-[400px]">
          <p className="text-gray-500">Nenhum dado disponível para exibir</p>
        </div>
      </div>
    );
  }

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
