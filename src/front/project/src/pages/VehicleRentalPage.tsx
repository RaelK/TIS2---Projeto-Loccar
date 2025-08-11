import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, CheckCircle, Search } from 'lucide-react';
import { useToast } from '../hooks/useToast';
import axios from 'axios';

interface Vehicle {
  id: number;
  marca: string;
  modelo?: string;
  placa: string;
  diaria: number;
  categoria: string;
  status?: string;
}

const VehicleRentalPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [searchParams, setSearchParams] = useState({
    marca: '',
    categoria: '',
  });

  const [vehicleTypes, setVehicleTypes] = useState<string[]>([]);
  const [availableVehicles, setAvailableVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataHoraAtual, setDataHoraAtual] = useState<string>('');

  const vehiclesPerPage = 5;

  useEffect(() => {
    const agora = new Date().toISOString(); // Salva data e hora atual no formato ISO
    setDataHoraAtual(agora);

    axios.get<Vehicle[]>("http://localhost:8080/api/veiculos/disponiveis")
      .then(response => {
        const disponiveis = response.data;
        setAvailableVehicles(disponiveis);
        setFilteredVehicles(disponiveis);
      })
      .catch(error => console.error("Erro ao buscar veículos disponíveis:", error));

    setVehicleTypes([
      "Econômico",
      "Intermediário",
      "Luxo",
      "SUV",
      "Utilitário"
    ]);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtrados = availableVehicles.filter(v =>
      v.marca.toLowerCase().includes(searchParams.marca.toLowerCase()) &&
      (searchParams.categoria === '' || v.categoria === searchParams.categoria)
    );
    setFilteredVehicles(filtrados);
    setCurrentPage(0);
    toast({
      title: "Pesquisa realizada",
      description: "Veículos disponíveis encontrados",
      variant: "success",
    });
  };

  const handleVehicleSelect = (vehicleId: number) => {
    if (!vehicleId || isNaN(vehicleId)) {
      console.error("ID do veículo inválido:", vehicleId);
      toast({
        title: "Erro",
        description: "ID do veículo selecionado é inválido.",
        variant: "destructive",
      });
      return;
    }
    navigate(`/rental-contract/${vehicleId}`);
  };

  const totalPages = Math.ceil(filteredVehicles.length / vehiclesPerPage);
  const currentVehicles = filteredVehicles.slice(
    currentPage * vehiclesPerPage,
    (currentPage + 1) * vehiclesPerPage
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Locação de Veículos</h1>
          <p className="text-gray-600 mt-2">Realize a reserva de veículos para seus clientes</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Search className="h-5 w-5 text-blue-500 mr-2" />
                Buscar Veículos
              </h2>
              <form onSubmit={handleSearch} className="space-y-4">
                <input
                  type="text"
                  placeholder="Marca do Veículo"
                  value={searchParams.marca}
                  onChange={(e) => setSearchParams({ ...searchParams, marca: e.target.value })}
                  className="input-field"
                />
                <select
                  value={searchParams.categoria}
                  onChange={(e) => setSearchParams({ ...searchParams, categoria: e.target.value })}
                  className="input-field"
                >
                  <option value="">Selecione a categoria</option>
                  {vehicleTypes.map((type, idx) => (
                    <option key={idx} value={type}>{type}</option>
                  ))}
                </select>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full">
                  <Search className="inline w-4 h-4 mr-1" /> Buscar
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Car className="h-5 w-5 text-green-500 mr-2" />
                Veículos Disponíveis
              </h2>
              {filteredVehicles.length === 0 ? (
                <p className="text-gray-500">Nenhum veículo encontrado.</p>
              ) : (
                <>
                  <ul className="space-y-4">
                    {currentVehicles.map(vehicle => (
                      <li key={vehicle.id} className="border p-4 rounded shadow-sm flex justify-between items-center">
                        <div>
                          <p><strong>{vehicle.marca} {vehicle.modelo || ''}</strong></p>
                          <p>Placa: {vehicle.placa}</p>
                          <p>Diária: R$ {vehicle.diaria ? vehicle.diaria.toFixed(2) : 'N/A'}</p>
                          <p>Última Manutenção: {new Date(dataHoraAtual).toLocaleString()}</p>
                        </div>
                        <button
                          onClick={() => handleVehicleSelect(vehicle.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                          <CheckCircle className="inline w-4 h-4 mr-1" /> Reservar
                        </button>
                      </li>
                    ))}
                  </ul>
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-6 space-x-2">
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentPage(index)}
                          className={`px-3 py-1 rounded ${index === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleRentalPage;