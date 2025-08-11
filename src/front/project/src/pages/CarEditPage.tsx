import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/useToast';

const CarEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    modelo: '',
    placa: '',
    ano: '',
    quilometragem: '',
    ultimaManutencao: '',
  });

  useEffect(() => {
    fetch(`http://localhost:8080/api/veiculos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          modelo: data.modelo || '',
          placa: data.placa || '',
          ano: data.ano || '',
          quilometragem: data.quilometragem || '',
          ultimaManutencao: data.ultimaManutencao || '',
        });
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch(`http://localhost:8080/api/veiculos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        modelo: formData.modelo,
        placa: formData.placa,
        ano: parseInt(formData.ano),
        quilometragem: parseInt(formData.quilometragem),
        ultimaManutencao: formData.ultimaManutencao || null,
      }),
    })
      .then((res) => {
        if (res.ok) {
          toast({ title: 'Veículo atualizado com sucesso!' });
          navigate('/car-management');
        } else {
          toast({ title: 'Erro ao atualizar veículo.' });
        }
      })
      .catch(() => toast({ title: 'Erro na comunicação com o servidor.' }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Editar Veículo</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Modelo</label>
            <input
              type="text"
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Placa</label>
            <input
              type="text"
              name="placa"
              value={formData.placa}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ano</label>
            <input
              type="number"
              name="ano"
              value={formData.ano}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quilometragem</label>
            <input
              type="number"
              name="quilometragem"
              value={formData.quilometragem}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Última Manutenção</label>
            <input
              type="date"
              name="ultimaManutencao"
              value={formData.ultimaManutencao}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex space-x-4 justify-center">
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Salvar
            </button>
            <button
              type="button"
              className="px-5 py-2 rounded-md border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
              onClick={() => navigate('/car-management')}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarEditPage;