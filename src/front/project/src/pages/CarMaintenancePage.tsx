import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PenTool as Tool, CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useToast } from '../hooks/useToast';

interface MaintenanceFormData {
  tipo: string;
  dataProgramada: string;
  descricao: string;
}

const CarMaintenancePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState<MaintenanceFormData>({
    tipo: '',
    dataProgramada: new Date().toISOString().split('T')[0],
    descricao: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof MaintenanceFormData, string>>>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof MaintenanceFormData]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof MaintenanceFormData, string>> = {};
    if (!formData.tipo) newErrors.tipo = 'Selecione o tipo de manutenção';
    if (!formData.dataProgramada) newErrors.dataProgramada = 'Informe a data';
    if (!formData.descricao.trim()) newErrors.descricao = 'Preencha a descrição';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    if (!formData.tipo && !formData.dataProgramada && !formData.descricao) {
      toast({ title: 'Campos obrigatórios', description: 'Preencha todos os campos antes de registrar.' });
      return;
    }

    if (!validate()) return;

    try {
      const res = await fetch(`http://localhost:8080/api/veiculos/${id}/manutencao`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Erro ao registrar manutenção');

      toast({ title: 'Manutenção registrada com sucesso!' });
      setSuccess(true);
      setFormData({
        tipo: '',
        dataProgramada: new Date().toISOString().split('T')[0],
        descricao: '',
      });

    } catch (err) {
      toast({ title: 'Falha ao registrar manutenção' });
      setErrorMsg((err as Error).message);
      setError(true);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12">
      <div className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-800">
        <Tool className="w-7 h-7 text-yellow-600" />
        Registrar Manutenção
      </div>

      {success && (
        <div className="flex items-center text-green-600 gap-2 mb-4">
          <CheckCircle className="w-5 h-5" />
          <span>Manutenção registrada com sucesso!</span>
        </div>
      )}

      {error && (
        <div className="flex items-center text-red-600 gap-2 mb-4">
          <AlertTriangle className="w-5 h-5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
            Tipo de Manutenção
          </label>
          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">Selecione</option>
            <option value="PREVENTIVA">Preventiva</option>
            <option value="CORRETIVA">Corretiva</option>
          </select>
          {errors.tipo && <p className="text-sm text-red-600">{errors.tipo}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="dataProgramada" className="block text-sm font-medium text-gray-700">
            Data Programada
          </label>
          <input
            type="date"
            name="dataProgramada"
            value={formData.dataProgramada}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {errors.dataProgramada && <p className="text-sm text-red-600">{errors.dataProgramada}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
            Descrição
          </label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            maxLength={500}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white h-28 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {errors.descricao && <p className="text-sm text-red-600">{errors.descricao}</p>}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={18} /> Voltar
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarMaintenancePage;