import React, { useState } from 'react';
import { useToast } from "../hooks/useToast";

const CustomerRegistrationForm: React.FC = () => {
  const { toast } = useToast();

  const estadosBrasil = [
    { sigla: "AC", nome: "Acre" }, { sigla: "AL", nome: "Alagoas" }, { sigla: "AP", nome: "Amapá" },
    { sigla: "AM", nome: "Amazonas" }, { sigla: "BA", nome: "Bahia" }, { sigla: "CE", nome: "Ceará" },
    { sigla: "DF", nome: "Distrito Federal" }, { sigla: "ES", nome: "Espírito Santo" }, { sigla: "GO", nome: "Goiás" },
    { sigla: "MA", nome: "Maranhão" }, { sigla: "MT", nome: "Mato Grosso" }, { sigla: "MS", nome: "Mato Grosso do Sul" },
    { sigla: "MG", nome: "Minas Gerais" }, { sigla: "PA", nome: "Pará" }, { sigla: "PB", nome: "Paraíba" },
    { sigla: "PR", nome: "Paraná" }, { sigla: "PE", nome: "Pernambuco" }, { sigla: "PI", nome: "Piauí" },
    { sigla: "RJ", nome: "Rio de Janeiro" }, { sigla: "RN", nome: "Rio Grande do Norte" }, { sigla: "RS", nome: "Rio Grande do Sul" },
    { sigla: "RO", nome: "Rondônia" }, { sigla: "RR", nome: "Roraima" }, { sigla: "SC", nome: "Santa Catarina" },
    { sigla: "SP", nome: "São Paulo" }, { sigla: "SE", nome: "Sergipe" }, { sigla: "TO", nome: "Tocantins" }
  ];

  const defaultFormState = {
    nome: '',
    cpf: '',
    cnh: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    telefone: '',
    email: '',
    formaPagamento: '',
    documentoVerificado: false
  };

  const [formData, setFormData] = useState(defaultFormState);

  const formatInput = (name: string, value: string) => {
    switch (name) {
      case 'cpf':
        return value.replace(/\D/g, '').slice(0, 11);
      case 'cnh':
        return value.replace(/\D/g, '').slice(0, 11);
      case 'cep':
        return value.replace(/\D/g, '').slice(0, 8);
      case 'telefone':
        return value.replace(/\D/g, '').slice(0, 14);
      case 'email':
        return value.slice(0, 256);
      default:
        return value;
    }
  };

  const validateMinLengths = () => {
    if (formData.cpf.length !== 11) return "CPF deve conter 11 dígitos.";
    if (formData.cnh.length !== 11) return "CNH deve conter 11 dígitos.";
    if (formData.cep.length !== 8) return "CEP deve conter 8 dígitos.";
    if (formData.telefone.length < 8) return "Telefone deve conter pelo menos 8 dígitos.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return "E-mail inválido.";
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    const isCheckbox = target.type === 'checkbox';
    const formattedValue = isCheckbox ? target.checked : formatInput(name, value);
    setFormData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allFieldsEmpty = Object.values(formData).every(
      (value) => value === '' || value === false
    );

    if (allFieldsEmpty) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos do formulário."
      });
      return;
    }

    const emptyFields = Object.entries(formData)
      .filter(([key, value]) => {
        if (key === 'documentoVerificado') return false;
        return value === '' || value === null;
      })
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      toast({
        title: "Campos obrigatórios",
        description: `Preencha os seguintes campos: ${emptyFields.join(', ')}`
      });
      return;
    }

    const lengthError = validateMinLengths();
    if (lengthError) {
      toast({ title: "Validação de dados", description: lengthError });
      return;
    }

    if (!formData.documentoVerificado) {
      toast({
        title: "Verificação necessária",
        description: "Por favor, confirme a verificação dos documentos."
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/clientes", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast({
          title: "Cliente cadastrado",
          description: "Cadastro realizado com sucesso."
        });
        setFormData(defaultFormState);
      } else {
        toast({
          title: "Erro ao cadastrar",
          description: "Verifique os dados e tente novamente."
        });
      }
    } catch (error) {
      toast({
        title: "Falha de conexão",
        description: "Não foi possível conectar ao servidor."
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Cadastro de Cliente</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="font-medium text-sm">Nome Completo</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded-md w-full mt-1 text-sm" required />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-sm">CPF</label>
          <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded-md w-full mt-1 text-sm" required />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-sm">CNH</label>
          <input type="text" name="cnh" value={formData.cnh} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded-md w-full mt-1 text-sm" required />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-sm">Endereço</label>
          <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded-md w-full mt-1 text-sm" required />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-sm">Cidade</label>
          <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded-md w-full mt-1 text-sm" required />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-sm">Estado</label>
          <select name="estado" value={formData.estado} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded-md w-full mt-1 text-sm" required>
            <option value="">Selecione o estado</option>
            {estadosBrasil.map(uf => <option key={uf.sigla} value={uf.sigla}>{uf.nome}</option>)}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-sm">CEP</label>
          <input type="text" name="cep" value={formData.cep} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded-md w-full mt-1 text-sm" required />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-sm">Telefone</label>
          <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded-md w-full mt-1 text-sm" required />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-sm">E-mail</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded-md w-full mt-1 text-sm" required />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-sm">Forma de Pagamento</label>
          <select name="formaPagamento" value={formData.formaPagamento} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded-md w-full mt-1 text-sm" required>
            <option value="">Selecione</option>
            <option value="Crédito">Cartão de Crédito</option>
            <option value="Débito">Cartão de Débito</option>
            <option value="PIX">PIX</option>
            <option value="Dinheiro">Dinheiro</option>
          </select>
        </div>
        <div className="col-span-1 sm:col-span-2 flex items-center space-x-2 mt-2">
          <input type="checkbox" name="documentoVerificado" onChange={handleChange} checked={formData.documentoVerificado} className="h-4 w-4 text-blue-600" />
          <label className="text-sm">Confirmo que os documentos foram verificados</label>
        </div>
        <div className="col-span-1 sm:col-span-2 mt-4">
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition text-sm">
            Cadastrar Cliente
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerRegistrationForm;