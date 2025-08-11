import { updateInspection } from "../../services/inspectionService";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, X, AlertTriangle } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

interface ApprovalData {
  status: string;
  additionalNotes: string;
}

const InspectionApprovalPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [approvalData, setApprovalData] = useState<ApprovalData>({
    status: 'approved',
    additionalNotes: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setApprovalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const inspectionId = localStorage.getItem('inspectionId');

    if (!usuario?.id) {
      toast({
        title: "Erro",
        description: "Funcionário não identificado. Faça login novamente.",
        variant: "destructive",
      });
      return;
    }

    if (!inspectionId) {
      toast({
        title: "Erro na aprovação",
        description: "ID da vistoria não encontrado. Realize o agendamento e o checklist primeiro.",
        variant: "destructive",
      });
      return;
    }

    try {
      const payload = {
        aprovacao: approvalData.status === 'approved' ? 'Aprovado' : 'Reprovado',
        observacoesGerente: approvalData.additionalNotes,
        funcionario: {
          id: usuario.id,
          nome: usuario.nome
        }
      };

      await updateInspection(Number(inspectionId), payload);

      toast({
        title: "Análise concluída",
        description: approvalData.status === 'approved'
          ? "Veículo liberado para uso!"
          : "Veículo enviado para reparo.",
        variant: approvalData.status === 'approved' ? "success" : "info",
      });

      localStorage.removeItem('inspectionId');

      setTimeout(() => {
        navigate('/car-management');
      }, 2000);
    } catch (error) {
      toast({
        title: "Erro na aprovação",
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
          <h1 className="text-3xl font-bold text-gray-800">Aprovação da Vistoria</h1>
          <p className="text-gray-600 mt-2">
            Analise o checklist e aprove ou reprove a vistoria técnica.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          <div className="space-y-6">
            <div>
              <label className="form-label">Status da Vistoria</label>
              <select
                name="status"
                value={approvalData.status}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="approved">Aprovado</option>
                <option value="rejected">Reprovado</option>
              </select>
            </div>

            <div>
              <label className="form-label">Observações Adicionais</label>
              <textarea
                name="additionalNotes"
                value={approvalData.additionalNotes}
                onChange={handleChange}
                className="input-field h-32"
                placeholder="Adicione observações sobre a decisão..."
              />
            </div>
          </div>

          <div className="mt-8 flex justify-between space-x-4">
            <button
              type="button"
              onClick={() => navigate('/inspection-checklist')}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Voltar
            </button>
            <button
              type="submit"
              className={`btn-primary flex items-center ${approvalData.status === 'approved'
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-red-500 hover:bg-red-600'
                }`}
            >
              {approvalData.status === 'approved' ? (
                <CheckCircle className="h-5 w-5 mr-2" />
              ) : (
                <X className="h-5 w-5 mr-2" />
              )}
              {approvalData.status === 'approved' ? 'Aprovar Vistoria' : 'Reprovar Vistoria'}
            </button>
          </div>
        </form>

        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Importante</h4>
              <p className="text-sm text-blue-700 mt-1">
                Sua decisão determinará se o veículo será liberado para uso ou
                enviado para reparos. Analise cuidadosamente o checklist antes de
                tomar a decisão.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionApprovalPage;