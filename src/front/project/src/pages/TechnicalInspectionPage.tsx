import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clipboard, CheckCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '../hooks/useToast';

interface InspectionFormData {
  inspectionDate: string;
  inspectionTime: string;
  vehiclePlate: string;
  inspectionReason: string;
}

const TechnicalInspectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState<InspectionFormData>({
    inspectionDate: new Date().toISOString().split('T')[0],
    inspectionTime: '',
    vehiclePlate: '',
    inspectionReason: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Vistoria agendada com sucesso!",
      description: `Vistoria agendada para ${formData.inspectionDate} às ${formData.inspectionTime}`,
      variant: "success",
    });

    setTimeout(() => {
      navigate('/inspection-checklist');
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Agendamento de Vistoria Técnica</h1>
          <p className="text-gray-600 mt-2">
            Agende uma vistoria técnica para avaliar as condições do veículo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="inspectionDate" className="form-label">
                  Data da Vistoria
                </label>
                <input
                  type="date"
                  id="inspectionDate"
                  name="inspectionDate"
                  value={formData.inspectionDate}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label htmlFor="inspectionTime" className="form-label">
                  Horário da Vistoria
                </label>
                <input
                  type="time"
                  id="inspectionTime"
                  name="inspectionTime"
                  value={formData.inspectionTime}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="vehiclePlate" className="form-label">
                Placa do Veículo
              </label>
              <input
                type="text"
                id="vehiclePlate"
                name="vehiclePlate"
                value={formData.vehiclePlate}
                onChange={handleChange}
                className="input-field"
                placeholder="ABC-1234"
                required
              />
            </div>

            <div>
              <label htmlFor="inspectionReason" className="form-label">
                Motivo da Vistoria
              </label>
              <textarea
                id="inspectionReason"
                name="inspectionReason"
                value={formData.inspectionReason}
                onChange={handleChange}
                className="input-field h-32"
                placeholder="Descreva o motivo da vistoria..."
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
            <button type="submit" className="btn-primary">
              <Calendar className="h-5 w-5 mr-2" />
              Agendar Vistoria
            </button>
          </div>
        </form>

        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Importante</h4>
              <p className="text-sm text-blue-700 mt-1">
                Certifique-se de que o veículo estará disponível no horário agendado
                para a realização da vistoria técnica.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalInspectionPage;
