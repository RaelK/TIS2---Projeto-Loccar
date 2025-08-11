import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import { Car } from 'lucide-react';

const CarRegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    ano: '',
    placa: '',
    cor: '',
    chassi: '',
    quilometragem: '',
    tipoCombustivel: '',
    transmissao: '',
    categoria: '',
    diaria: '',
    verificado: false
  });

  const currentYear = new Date().getFullYear();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ano = parseInt(formData.ano);
    const diaria = parseFloat(formData.diaria);
    const quilometragem = parseInt(formData.quilometragem);

    const allEmpty = Object.values(formData).every(val => val === '' || val === false);
    if (allEmpty) {
      toast({ title: "Campos obrigatórios", description: "Preencha todos os campos do formulário." });
      return;
    }

    if (!formData.marca.trim()) {
      toast({ title: "Campo obrigatório", description: "Preencha a marca do veículo." }); return;
    }
    if (!formData.modelo.trim()) {
      toast({ title: "Campo obrigatório", description: "Preencha o modelo do veículo." }); return;
    }
    if (isNaN(ano) || ano < 1900 || ano > currentYear) {
      toast({ title: "Ano inválido", description: `O ano deve estar entre 1900 e ${currentYear}` }); return;
    }
    if (!/^[A-Z]{3}\d{4}$|^[A-Z]{3}\d[A-Z]{2}$/.test(formData.placa.toUpperCase())) {
      toast({ title: "Placa inválida", description: "A placa deve seguir o formato padrão ou Mercosul." }); return;
    }
    if (!formData.cor.trim()) {
      toast({ title: "Campo obrigatório", description: "Preencha a cor do veículo." }); return;
    }
    if (!/^[A-Z0-9]{17}$/i.test(formData.chassi)) {
      toast({ title: "Chassi inválido", description: "O chassi deve conter exatamente 17 caracteres alfanuméricos." }); return;
    }
    if (isNaN(quilometragem) || quilometragem < 0) {
      toast({ title: "Quilometragem inválida", description: "A quilometragem deve ser um valor numérico positivo." }); return;
    }
    if (!formData.tipoCombustivel) {
      toast({ title: "Campo obrigatório", description: "Selecione o tipo de combustível." }); return;
    }
    if (!formData.transmissao) {
      toast({ title: "Campo obrigatório", description: "Selecione a transmissão." }); return;
    }
    if (!formData.categoria) {
      toast({ title: "Campo obrigatório", description: "Selecione a categoria." }); return;
    }
    if (isNaN(diaria) || diaria <= 0) {
      toast({ title: "Diária inválida", description: "A diária deve ser um valor numérico maior que zero." }); return;
    }
    if (!formData.verificado) {
      toast({ title: "Confirmação pendente", description: "Confirme que os documentos foram verificados." }); return;
    }

    const payload = {
      ...formData,
      ano,
      quilometragem,
      diaria,
      status: 'MANUTENCAO'
    };

    try {
      const res = await fetch("http://localhost:8080/api/veiculos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Erro ao cadastrar veículo");

      toast({ title: "Veículo cadastrado com sucesso!" });
      navigate("/car-management");
    } catch (err) {
      toast({ title: "Erro ao cadastrar veículo" });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-800 mb-6">
        <Car className="w-7 h-7 text-blue-600" />
        Cadastro de Veículo
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Marca 🚗</label>
            <input name="marca" value={formData.marca} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="text-sm font-medium">Modelo</label>
            <input name="modelo" value={formData.modelo} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="text-sm font-medium">Ano</label>
            <input name="ano" type="number" min="1900" max={currentYear} value={formData.ano} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="text-sm font-medium">Placa</label>
            <input name="placa" value={formData.placa} onChange={handleChange} className="input-field uppercase" maxLength={7} />
          </div>
          <div>
            <label className="text-sm font-medium">Cor</label>
            <input name="cor" value={formData.cor} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="text-sm font-medium">Chassi</label>
            <input name="chassi" value={formData.chassi} onChange={handleChange} className="input-field uppercase" maxLength={17} />
          </div>
          <div>
            <label className="text-sm font-medium">Quilometragem</label>
            <input name="quilometragem" type="number" min="0" value={formData.quilometragem} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="text-sm font-medium">Tipo de Combustível</label>
            <select name="tipoCombustivel" value={formData.tipoCombustivel} onChange={handleChange} className="input-field">
              <option value="">Tipo de Combustível</option>
              <option value="Gasolina">Gasolina</option>
              <option value="Etanol">Etanol</option>
              <option value="Diesel">Diesel</option>
              <option value="Flex">Flex</option>
              <option value="Elétrico">Elétrico</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Transmissão</label>
            <select name="transmissao" value={formData.transmissao} onChange={handleChange} className="input-field">
              <option value="">Transmissão</option>
              <option value="Manual">Manual</option>
              <option value="Automático">Automático</option>
              <option value="CVT">CVT</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Categoria</label>
            <select name="categoria" value={formData.categoria} onChange={handleChange} className="input-field">
              <option value="">Categoria</option>
              <option value="Econômico">Econômico</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Luxo">Luxo</option>
              <option value="SUV">SUV</option>
              <option value="Utilitário">Utilitário</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Diária (R$)</label>
            <input name="diaria" type="number" step="0.01" min="0.01" value={formData.diaria} onChange={handleChange} className="input-field w-full" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="verificado" checked={formData.verificado} onChange={handleChange} />
          <label className="text-sm text-gray-700">Confirmo que todos os documentos do veículo foram verificados</label>
        </div>
        <div className="flex justify-end gap-4">
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarRegistrationPage;