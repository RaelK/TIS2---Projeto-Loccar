import { updateInspection } from "../../services/inspectionService";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clipboard, AlertTriangle } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

interface ChecklistData {
  tiresCondition: string;
  generalConditions: string;
  mileage: string;
  needsRepairs: string;
}

const InspectionChecklistPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const inspectionId = localStorage.getItem('inspectionId');
  const vehiclePlate = localStorage.getItem('vehiclePlate') || '';
  const vehicleMileage = localStorage.getItem('vehicleMileage') || '';
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

  const [checklistData, setChecklistData] = useState<ChecklistData>({
    tiresCondition: 'good',
    generalConditions: '',
    mileage: vehicleMileage,
    needsRepairs: 'no',
  });

  useEffect(() => {
    if (!inspectionId) {
      toast({
        title: "Erro ao carregar vistoria",
        description: "Agendamento não encontrado. Por favor, realize o agendamento primeiro.",
        variant: "destructive",
      });
      navigate('/technical-inspection/agendamento');
      return;
    }

    if (!usuario?.id) {
      toast({
        title: "Erro",
        description: "Funcionário não identificado. Faça login novamente.",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [inspectionId, navigate, toast, usuario]);

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

    if (!inspectionId) return;

    if (!usuario?.id) {
      toast({
        title: "Erro",
        description: "Funcionário não identificado. Faça login novamente.",
        variant: "destructive",
      });
      return;
    }

    try {
      const payload = {
        estadoPneus: checklistData.tiresCondition,
        condicoesGerais: checklistData.generalConditions,
        quilometragem: parseInt(checklistData.mileage),
        necessitaReparos: checklistData.needsRepairs === 'yes',
        funcionario: {
          id: usuario.id,
          nome: usuario.nome
        }
      };

      await updateInspection(Number(inspectionId), payload);

      toast({
        title: "Checklist enviado com sucesso!",
        description: "O gerente irá analisar as informações da vistoria.",
        variant: "success",
      });

      setTimeout(() => {
        navigate('/technical-inspection/aprovacao');
      }, 1000);
    } catch (error) {
      toast({
        title: "Erro ao enviar checklist",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Checklist de Vistoria</h1>
          <p className="text-gray-600 mt-2">
            Preencha o checklist com as condições atuais do veículo{' '}
            <strong>{vehiclePlate}</strong>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          <div className="space-y-6">
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
            <button type="submit" className="btn-primary flex items-center">
              <Clipboard className="h-5 w-5 mr-2" />
              Enviar Checklist
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