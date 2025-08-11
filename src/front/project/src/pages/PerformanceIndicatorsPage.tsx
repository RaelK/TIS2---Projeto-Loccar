import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { AlertTriangle, Clock, TrendingUp, Car, CheckCircle, BarChart3 } from 'lucide-react';
import { getPerformanceIndicators } from '../services/performanceIndicatorsService';
import { PerformanceIndicators } from '../types/PerformanceIndicators';

const PerformanceIndicatorsPage: React.FC = () => {
  const [data, setData] = useState<PerformanceIndicators | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const indicators = await getPerformanceIndicators();
        setData(indicators);
      } catch (err) {
        setError('Erro ao carregar os indicadores');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

const repairPercentage = data?.repairPercentage?.toFixed(2) ?? '0.00';

  const vehicleStatusData = [
    { name: 'Disponíveis', value: data?.availableVehicles ?? 0, color: '#10B981' },
    { name: 'Alugados', value: data?.rentedVehicles ?? 0, color: '#3B82F6' },
    { name: 'Manutenção', value: data?.maintenanceVehicles ?? 0, color: '#F59E0B' },
  ];

  const repairStatusData = [
    {
      name: 'Sem necessidade de reparo',
      value: (data?.totalInspections ?? 0) - (data?.vehiclesNeedingRepair ?? 0),
      color: '#10B981',
    },
    {
      name: 'Necessitam reparo',
      value: data?.vehiclesNeedingRepair ?? 0,
      color: '#EF4444',
    },
  ];

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Indicadores de Desempenho</h1>
        <p className="text-gray-600">Acompanhe as métricas principais da sua frota e operações</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          icon={<AlertTriangle className="h-6 w-6 text-white" />}
          title="Veículos Necessitando Reparo"
          value={parseFloat(repairPercentage)}
          unit="%"
          color="bg-red-500"
          trend="down"
          trendValue="↓"
        />
        <MetricCard
          icon={<Clock className="h-6 w-6 text-white" />}
          title="Tempo Médio de Análise"
          value={data?.averageAnalysisTime ?? 0}
          unit="h"
          color="bg-blue-500"
          trend="stable"
          trendValue="→"
        />
        <MetricCard
          icon={<TrendingUp className="h-6 w-6 text-white" />}
          title="Taxa de Utilização da Frota"
          value={data?.vehicleUtilizationRate ?? 0}
          unit="%"
          color="bg-green-500"
          trend="up"
          trendValue="↑"
        />
        <MetricCard
          icon={<Car className="h-6 w-6 text-white" />}
          title="Total de Veículos"
          value={data?.totalVehicles ?? 0}
          unit=""
          color="bg-purple-500"
          trend="stable"
          trendValue="→"
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ChartPie title="Status da Frota" data={vehicleStatusData} />
        <ChartPie title="Necessidade de Reparos" data={repairStatusData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ChartBar
          title="Taxa de Utilização da Frota"
          value={data?.vehicleUtilizationRate ?? 0}
          maxValue={100}
          unit="%"
          color="#3B82F6"
        />
        <ChartBar
          title="Tempo Médio de Análise do Checklist"
          value={data?.averageAnalysisTime ?? 0}
          maxValue={8}
          unit="h"
          color="#10B981"
        />
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <BarChart3 className="h-6 w-6 text-blue-500 mr-2" />
          Detalhamento dos Indicadores
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Indicador</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descrição</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4">Percentual de veículos que necessitam reparo</td>
                <td className="px-6 py-4">Mede a proporção de vistorias que resultam em necessidade de reparo</td>
                <td className="px-6 py-4">{repairPercentage}%</td>
              </tr>
              <tr>
                <td className="px-6 py-4">Tempo médio de análise do checklist</td>
                <td className="px-6 py-4">Mede o tempo médio entre o preenchimento e a análise</td>
                <td className="px-6 py-4">{data?.averageAnalysisTime} horas</td>
              </tr>
              <tr>
                <td className="px-6 py-4">Taxa de utilização da frota</td>
                <td className="px-6 py-4">Mede a proporção de veículos em uso em relação ao total</td>
                <td className="px-6 py-4">{data?.vehicleUtilizationRate}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Resumo */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-start space-x-4">
          <CheckCircle className="h-6 w-6 text-blue-500 mt-1" />
          <div>
            <h4 className="font-medium text-blue-900 mb-2">Resumo de Performance</h4>
            <p className="text-blue-700">
              Frota com {data?.availableVehicles} veículos disponíveis de {data?.totalVehicles} no total.
            </p>
            <p className="text-blue-700">
              Análise média em {data?.averageAnalysisTime} horas.
            </p>
            <p className="text-blue-700">
              {(100 - parseFloat(repairPercentage)).toFixed(1)}% das vistorias sem necessidade de reparo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceIndicatorsPage;

const MetricCard = ({
  icon,
  title,
  value,
  unit,
  color,
  trendValue,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
  unit: string;
  color: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
}) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-full ${color}`}>{icon}</div>
      <div className="text-sm text-gray-600">{trendValue}</div>
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">
        {value}
        {unit}
      </p>
    </div>
  </div>
);

const ChartPie = ({
  title,
  data,
}: {
  title: string;
  data: { name: string; value: number; color: string }[];
}) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

const ChartBar = ({
  title,
  value,
  maxValue,
  unit,
  color,
}: {
  title: string;
  value: number;
  maxValue: number;
  unit: string;
  color: string;
}) => {
  const percentage = (value / maxValue) * 100;
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold">{value + unit}</span>
          <span className="text-sm text-gray-600">de {maxValue + unit}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="h-4 rounded-full"
            style={{
              width: `${percentage}%`,
              backgroundColor: color,
            }}
          />
        </div>
        <div className="text-right text-sm text-gray-600">{percentage.toFixed(1)}%</div>
      </div>
    </div>
  );
};