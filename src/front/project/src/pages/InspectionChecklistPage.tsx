import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clipboard, AlertTriangle } from 'lucide-react';
import { useToast } from '../hooks/useToast';

interface ChecklistData {
  tiresCondition: string;
  generalConditions: string;
  mileage: string;
  needsRepairs: string;
  vehicleId: string; // Added vehicleId to the interface
}

const InspectionChecklistPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [checklistData, setChecklistData] = useState<ChecklistData>({
    tiresCondition: 'good',
    generalConditions: '',
    mileage: '',
    needsRepairs: 'no',
    vehicleId: '', // Added vehicleId to the state
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setChecklistData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // First, save the checklist data
      const response = await fetch('http://localhost:8080/api/inspections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checklistData),
      });

      if (!response.ok) {
        throw new Error('Failed to save inspection');
      }

      // If the checklist indicates repairs are needed, update vehicle status
      if (checklistData.needsRepairs === 'yes') {
        const statusResponse = await fetch(
          `http://localhost:8080/api/veiculos/${checklistData.vehicleId}/status`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'MANUTENCAO' }),
          }
        );

        if (!statusResponse.ok) {
          throw new Error('Failed to update vehicle status');
        }

        toast({
          title: 'Checklist enviado!',
          description: 'O veículo foi encaminhado para manutenção.',
          variant: 'info',
        });
      } else {
        toast({
          title: 'Checklist enviado com sucesso!',
          description: 'O gerente irá analisar as informações da vistoria.',
          variant: 'success',
        });
      }

      setTimeout(() => {
        navigate(checklistData.needsRepairs === 'yes' ? '/car-management' : '/inspection-approval');
      }, 2000);
    } catch (error) {
      console.error('Erro ao enviar checklist:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível enviar o checklist. Verifique a conexão.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Checklist de Vistoria</h1>
          <p className="text-gray-600 mt-2">
            Preencha o checklist com as condições atuais do veículo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          <div className="space-y-6">
            {/* Add vehicle selection field */}
            <div>
              <label htmlFor="vehicleId" className="form-label">
                Veículo
              </label>
              <input
                type="text"
                id="vehicleId"
                name="vehicleId"
                value={checklistData.vehicleId}
                onChange={handleChange}
                className="input-field"
                placeholder="Digite o ID do veículo"
                required
              />
            </div>

            <div>
              <label htmlFor="tiresCondition" className="form-label">
                Estado dos Pneus
              </label>
              <select
                id="tiresCondition"
                name="tiresCondition"
                value={checklistData.tiresCondition}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="good">Bom</option>
                <option value="regular">Regular</option>
                <option value="bad">Ruim</option>
              </select>
            </div>

            <div>
              <label htmlFor="generalConditions" className="form-label">
                Condições Gerais
              </label>
              <textarea
                id="generalConditions"
                name="generalConditions"
                value={checklistData.generalConditions}
                onChange={handleChange}
                className="input-field h-32"
                placeholder="Descreva as condições gerais do veículo..."
                required
              />
            </div>

            <div>
              <label htmlFor="mileage" className="form-label">
                Quilometragem
              </label>
              <input
                type="number"
                id="mileage"
                name="mileage"
                value={checklistData.mileage}
                onChange={handleChange}
                className="input-field"
                placeholder="Digite a quilometragem atual"
                required
              />
            </div>

            <div>
              <label htmlFor="needsRepairs" className="form-label">
                Necessita de Reparos?
              </label>
              <select
                id="needsRepairs"
                name="needsRepairs"
                value={checklistData.needsRepairs}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="no">Não</option>
                <option value="yes">Sim</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/car-management')}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isSubmitting}
            >
              <Clipboard className="h-5 w-5 mr-2" />
              {isSubmitting ? 'Enviando...' : 'Enviar Checklist'}
            </button>
          </div>
        </form>

        <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-100">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-900">Atenção</h4>
              <p className="text-sm text-yellow-700 mt-1">
                Verifique cuidadosamente todos os itens antes de enviar o checklist.
                Esta avaliação é crucial para a segurança e manutenção da frota.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionChecklistPage;