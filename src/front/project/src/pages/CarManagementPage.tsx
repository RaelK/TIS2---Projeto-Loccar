import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, PenTool as Tool, CheckCircle, AlertTriangle, Plus, Trash2, Pencil } from 'lucide-react';
import { useToast } from '../hooks/useToast';

interface CarData {
  id: number;
  modelo: string;
  placa: string;
  ano: number;
  status: 'DISPONIVEL' | 'MANUTENCAO' | 'ALUGADO';
  quilometragem: number;
  ultimaManutencao?: string;
}

const CarManagementPage: React.FC = () => {
  const { toast } = useToast();
  const [cars, setCars] = useState<CarData[]>([]);
  const [alerta, setAlerta] = useState(false);

  const fetchVeiculos = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/veiculos");
      const data = await res.json();
      setCars(data);
    } catch (err) {
      console.error("Erro ao carregar veículos:", err);
    }
  };

  const fetchManutencoesProximas = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/veiculos/manutencoes/proximas");
      const data = await res.json();
      if (data.length > 0) setAlerta(true);
    } catch (err) {
      console.error("Erro ao verificar manutenções próximas:", err);
    }
  };

  useEffect(() => {
    fetchVeiculos();
    fetchManutencoesProximas();
  }, []);

  const getStatusBadge = (status: CarData['status']) => {
    const badges = {
      DISPONIVEL: 'bg-green-100 text-green-800',
      MANUTENCAO: 'bg-yellow-100 text-yellow-800',
      ALUGADO: 'bg-blue-100 text-blue-800',
    };
    return badges[status];
  };

  const marcarComoDisponivel = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/veiculos/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'DISPONIVEL' })
      });

      if (response.ok) {
        toast({ title: "Veículo marcado como disponível." });
        fetchVeiculos();
      } else {
        toast({ title: "Erro ao atualizar status" });
      }
    } catch (err) {
      console.error("Erro:", err);
      toast({ title: "Erro ao atualizar status" });
    }
  };

  const excluirVeiculo = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este veículo?')) return;

    try {
      const response = await fetch(`http://localhost:8080/api/veiculos/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast({ title: 'Veículo excluído com sucesso!' });
        fetchVeiculos();
      } else {
        toast({ title: 'Erro ao excluir veículo.' });
      }
    } catch (error) {
      console.error('Erro ao excluir veículo:', error);
      toast({ title: 'Erro na operação.' });
    }
  };

  const mainCars = cars.slice(0, 9);
  const carouselCars = cars.slice(9);

  const renderCarCard = (car: CarData) => (
    <div key={car.id} className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <Car className="h-6 w-6 text-blue-500 mr-3" />
          <h3 className="text-lg font-semibold text-gray-800">{car.modelo}</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(car.status)}`}>
          {car.status === 'DISPONIVEL' && 'Disponível'}
          {car.status === 'MANUTENCAO' && 'Em Manutenção'}
          {car.status === 'ALUGADO' && 'Alugado'}
        </span>
      </div>

      <div className="space-y-2 text-gray-600">
        <p>Placa: {car.placa}</p>
        <p>Ano: {car.ano}</p>
        <p>Última Manutenção: {car.ultimaManutencao || 'N/A'}</p>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
        <Link
          to={`/car-maintenance/${car.id}`}
          className="flex-grow flex items-center justify-center px-3 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition"
        >
          <Tool className="h-4 w-4 mr-2" />
          Manutenção
        </Link>
        <button
          onClick={() => marcarComoDisponivel(car.id)}
          className="flex-grow flex items-center justify-center px-3 py-2 border border-green-500 text-green-500 rounded-md hover:bg-green-50 transition"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Disponibilizar
        </button>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
        <Link
          to={`/car-edit/${car.id}`}
          className="flex-grow flex items-center justify-center px-3 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition"
        >
          <Pencil className="h-4 w-4 mr-2" />
          Editar
        </Link>

        <button
          onClick={() => excluirVeiculo(car.id)}
          className="flex-grow flex items-center justify-center px-3 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Excluir
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Gestão de Veículos</h1>
            <p className="text-gray-600 mt-2">
              Gerencie sua frota de veículos e acompanhe manutenções
            </p>

            {alerta && (
              <div className="mt-4 flex items-center gap-3 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded">
                <AlertTriangle className="w-5 h-5" />
                <p className="text-sm">
                  <strong>Atenção:</strong> Existem veículos com manutenção preventiva agendada para os próximos 7 dias.
                </p>
              </div>
            )}
          </div>

          <Link to="/car-registration" className="btn-primary flex items-center">
            <Plus className="mr-2 h-5 w-5" />
            Novo Veículo
          </Link>
        </div>

        {/* Grid principal com até 9 veículos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainCars.map(renderCarCard)}
        </div>

        {/* Carrossel para veículos adicionais */}
        {carouselCars.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Outros Veículos</h2>
            <div className="flex overflow-x-auto space-x-4 pb-4">
              {carouselCars.map(renderCarCard)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarManagementPage;