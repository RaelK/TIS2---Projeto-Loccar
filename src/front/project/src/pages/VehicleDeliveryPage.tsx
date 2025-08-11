import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '../hooks/useToast';

interface DeliveryData {
  deliveryDate: string;
  deliveryTime: string;
  fleetManagerName: string;
  customerSignature: boolean;
  vehicleChecklist: boolean;
  observations: string;
}

const VehicleDeliveryPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [deliveryData, setDeliveryData] = useState<DeliveryData>({
    deliveryDate: '',
    deliveryTime: '',
    fleetManagerName: '',
    customerSignature: false,
    vehicleChecklist: false,
    observations: '',
  });

  useEffect(() => {
    fetch(`http://localhost:8080/api/locacao/contrato/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar contrato');
        return res.json();
      })
      .then((data) => {
        setDeliveryData((prev) => ({
          ...prev,
          deliveryDate: data.endDate || ''
        }));
      })
      .catch(() => {
        toast({
          title: "Erro ao carregar dados do contrato",
          description: "Não foi possível obter a data da entrega.",
          variant: "destructive"
        });
      });
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setDeliveryData({
      ...deliveryData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/locacao/entrega', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...deliveryData,
          contratoId: id
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        const messages = Object.values(errorData.errors || {}).join(', ');
        toast({
          title: "Erro ao registrar entrega",
          description: messages || "Erro inesperado.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Entrega finalizada com sucesso!",
        description: "O processo de locação foi concluído.",
        variant: "success",
      });

      setTimeout(() => {
        navigate('/vehicle-rental');
      }, 2000);
    } catch (error) {
      toast({
        title: "Erro de conexão",
        description: "Não foi possível conectar ao servidor.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Entrega do Veículo</h1>
          <p className="text-gray-600 mt-2">
            Registre a entrega do veículo ao cliente
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Data da Entrega</label>
                <input type="date" name="deliveryDate" value={deliveryData.deliveryDate} onChange={handleChange} className="input-field" required />
              </div>
              <div>
                <label className="form-label">Horário da Entrega</label>
                <input type="time" name="deliveryTime" value={deliveryData.deliveryTime} onChange={handleChange} className="input-field" required />
              </div>
            </div>

            <div>
              <label className="form-label">Nome do Gerente de Frota</label>
              <input type="text" name="fleetManagerName" value={deliveryData.fleetManagerName} onChange={handleChange} className="input-field" required />
            </div>

            <div>
              <label className="form-label">Observações</label>
              <textarea name="observations" value={deliveryData.observations} onChange={handleChange} className="input-field h-32" />
            </div>

            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input type="checkbox" name="vehicleChecklist" checked={deliveryData.vehicleChecklist} onChange={handleChange} className="w-4 h-4 text-blue-600" required />
                <span className="text-sm text-gray-600">Checklist do veículo foi preenchido e assinado</span>
              </label>

              <label className="flex items-center space-x-3">
                <input type="checkbox" name="customerSignature" checked={deliveryData.customerSignature} onChange={handleChange} className="w-4 h-4 text-blue-600" required />
                <span className="text-sm text-gray-600">Cliente assinou o termo de entrega</span>
              </label>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button type="button" onClick={() => navigate('/vehicle-rental')} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              <CheckCircle className="h-5 w-5 mr-2" />
              Finalizar Entrega
            </button>
          </div>
        </form>

        <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-100">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-900">Atenção</h4>
              <p className="text-sm text-yellow-700 mt-1">
                Certifique-se de que todos os documentos foram devidamente assinados
                e que o cliente está ciente das condições de uso do veículo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDeliveryPage;