import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, AlertTriangle, Clipboard, CheckCircle, X } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { createInspection, updateInspection } from "../../services/inspectionService";
import { getAllVehicles } from "../../services/vehicleService";

const TechnicalInspectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [usuario, setUsuario] = useState<any>({});

  const [formData, setFormData] = useState({
    inspectionDate: new Date().toISOString().split('T')[0],
    inspectionTime: '',
    vehicleId: '',
    inspectionReason: '',
  });

  const [checklistData, setChecklistData] = useState({
    tiresCondition: 'good',
    generalConditions: '',
    mileage: '',
    needsRepairs: 'no',
  });

  const [approvalData, setApprovalData] = useState({
    status: 'approved',
    additionalNotes: '',
  });

  useEffect(() => {
    // Load user data from localStorage
    const userData = JSON.parse(localStorage.getItem('usuario') || '{}');
    setUsuario(userData);

    const fetchVehicles = async () => {
      try {
        const data = await getAllVehicles();
        setVehicles(data);
      } catch (error) {
        console.error("Erro ao buscar veículos", error);
        toast({
          title: "Erro ao carregar veículos",
          description: "Não foi possível carregar a lista de veículos",
          variant: "destructive",
        });
      }
    };
    fetchVehicles();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "vehicleId") {
      const selectedVehicle = vehicles.find((v) => String(v.id) === value);
      if (selectedVehicle) {
        setChecklistData((prev) => ({
          ...prev,
          mileage: selectedVehicle.quilometragem.toString()
        }));
      }
    }
  };
  
  const handleChecklistChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setChecklistData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApprovalChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setApprovalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitStep1 = async (e: React.FormEvent) => {
    e.preventDefault();

    const funcionarioId = usuario?.id;

    if (!funcionarioId) {
      toast({
        title: "Erro ao agendar",
        description: "Funcionário não identificado. Faça login novamente.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.vehicleId) {
      toast({
        title: "Selecione um veículo",
        description: "Por favor, selecione um veículo para a vistoria",
        variant: "destructive",
      });
      return;
    }

    try {
      const payload = {
        dataVistoria: `${formData.inspectionDate}T${formData.inspectionTime}`,
        motivo: formData.inspectionReason,
        veiculo: { id: Number(formData.vehicleId) },
        funcionario: { id: funcionarioId } // ✅ aqui associa quem está logado
      };

      const response = await createInspection(payload);
      localStorage.setItem('inspectionId', response.id);

      toast({
        title: "Vistoria agendada com sucesso!",
        description: `Para ${formData.inspectionDate} às ${formData.inspectionTime}`,
        variant: "success",
      });

      setStep(2);
    } catch (error) {
      toast({
        title: "Erro ao agendar",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const handleSubmitStep2 = async (e: React.FormEvent) => {
    e.preventDefault();

    const inspectionId = localStorage.getItem('inspectionId');
    const funcionarioId = usuario?.id;

    if (!inspectionId) {
      toast({
        title: "Erro no checklist",
        description: "ID da vistoria não encontrado. Realize o agendamento primeiro.",
        variant: "destructive",
      });
      return;
    }

    if (!funcionarioId) {
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
        funcionario: { id: funcionarioId }
      };

      await updateInspection(Number(inspectionId), payload);

      toast({
        title: "Checklist enviado com sucesso!",
        description: "O gerente irá analisar as informações da vistoria.",
        variant: "success",
      });

      setStep(3);
    } catch (error) {
      toast({
        title: "Erro ao enviar checklist",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const handleSubmitStep3 = async (e: React.FormEvent) => {
    e.preventDefault();

    const inspectionId = localStorage.getItem('inspectionId');
    const funcionarioId = usuario?.id;

    if (!inspectionId) {
      toast({
        title: "Erro na aprovação",
        description: "ID da vistoria não encontrado. Realize o agendamento primeiro.",
        variant: "destructive",
      });
      return;
    }

    if (!funcionarioId) {
      toast({
        title: "Erro",
        description: "Funcionário não identificado. Faça login novamente.",
        variant: "destructive",
      });
      return;
    }

    try {
      const payload = {
        aprovacao: approvalData.status === 'approved' ? 'Aprovado' : 'Reprovado',
        observacoesGerente: approvalData.additionalNotes,
        funcionario: { id: funcionarioId }
      };

      await updateInspection(Number(inspectionId), payload);
      localStorage.removeItem('inspectionId');

      const message = approvalData.status === 'approved'
        ? "Veículo liberado para uso!"
        : "Veículo enviado para reparo.";

      toast({
        title: "Análise concluída",
        description: message,
        variant: approvalData.status === 'approved' ? "success" : "info",
      });

      navigate('/car-management');
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
        {step === 1 && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Agendamento de Vistoria Técnica</h1>
              <p className="text-gray-600 mt-2">
                Agende uma vistoria técnica para avaliar as condições do veículo
              </p>
            </div>

            <form onSubmit={handleSubmitStep1} className="bg-white rounded-lg shadow-md p-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Data da Vistoria</label>
                    <input
                      type="date"
                      name="inspectionDate"
                      value={formData.inspectionDate}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Horário da Vistoria</label>
                    <input
                      type="time"
                      name="inspectionTime"
                      value={formData.inspectionTime}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Veículo</label>
                  <select
                    name="vehicleId"
                    value={formData.vehicleId}
                    onChange={handleChange}
                    className="input-field"
                    required
                  >
                    <option value="">Selecione um veículo</option>
                    {vehicles.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.placa} - {vehicle.modelo}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">Motivo da Vistoria</label>
                  <textarea
                    name="inspectionReason"
                    value={formData.inspectionReason}
                    onChange={handleChange}
                    className="input-field h-32"
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
          </>
        )}

        {step === 2 && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Checklist de Vistoria</h1>
              <p className="text-gray-600 mt-2">
                Preencha o checklist com as condições atuais do veículo
              </p>
            </div>

            <form onSubmit={handleSubmitStep2} className="bg-white rounded-lg shadow-md p-8">
              <div className="space-y-6">
                <div>
                  <label className="form-label">Estado dos Pneus</label>
                  <select
                    name="tiresCondition"
                    value={checklistData.tiresCondition}
                    onChange={handleChecklistChange}
                    className="input-field"
                    required
                  >
                    <option value="good">Bom</option>
                    <option value="regular">Regular</option>
                    <option value="bad">Ruim</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Condições Gerais</label>
                  <textarea
                    name="generalConditions"
                    value={checklistData.generalConditions}
                    onChange={handleChecklistChange}
                    className="input-field h-32"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Quilometragem</label>
                  <input
                    type="number"
                    name="mileage"
                    value={checklistData.mileage}
                    onChange={handleChecklistChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Necessita de Reparos?</label>
                  <select
                    name="needsRepairs"
                    value={checklistData.needsRepairs}
                    onChange={handleChecklistChange}
                    className="input-field"
                    required
                  >
                    <option value="no">Não</option>
                    <option value="yes">Sim</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 flex justify-between space-x-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Voltar
                </button>
                <button type="submit" className="btn-primary">
                  <Clipboard className="h-5 w-5 mr-2" />
                  Enviar Checklist
                </button>
              </div>
            </form>
          </>
        )}

        {step === 3 && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Aprovação da Vistoria</h1>
              <p className="text-gray-600 mt-2">
                Analise o checklist e aprove ou reprove a vistoria técnica
              </p>
            </div>

            <form onSubmit={handleSubmitStep3} className="bg-white rounded-lg shadow-md p-8">
              <div className="space-y-6">
                <div>
                  <label className="form-label">Status da Vistoria</label>
                  <select
                    name="status"
                    value={approvalData.status}
                    onChange={handleApprovalChange}
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
                    onChange={handleApprovalChange}
                    className="input-field h-32"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-between space-x-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
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
          </>
        )}
      </div>
    </div>
  );
};

export default TechnicalInspectionPage;