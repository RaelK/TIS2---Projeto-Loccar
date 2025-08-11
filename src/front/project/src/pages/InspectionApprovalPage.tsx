import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, X, AlertTriangle } from 'lucide-react';
import { useToast } from '../hooks/useToast';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = approvalData.status === 'approved'
      ? "Veículo liberado para uso!"
      : "Veículo enviado para reparo.";
    
    toast({
      title: "Análise concluída",
      description: message,
      variant: approvalData.status === 'approved' ? "success" : "info",
    });

    setTimeout(() => {
      navigate('/car-management');
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Aprovação da Vistoria</h1>
          <p className="text-gray-600 mt-2">
            Analise o checklist e aprove ou reprove a vistoria técnica
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="status" className="form-label">
                Status da Vistoria
              </label>
              <select
                id="status"
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
              <label htmlFor="additionalNotes" className="form-label">
                Observações Adicionais
              </label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                value={approvalData.additionalNotes}
                onChange={handleChange}
                className="input-field h-32"
                placeholder="Adicione observações sobre a decisão..."
              />
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
              className={`btn-primary flex items-center ${
                approvalData.status === 'approved' 
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
