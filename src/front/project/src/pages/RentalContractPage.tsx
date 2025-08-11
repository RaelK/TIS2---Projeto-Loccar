import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Send, AlertTriangle } from 'lucide-react';
import { useToast } from '../hooks/useToast';

interface ContractData {
  customerName: string;
  document: string;
  email: string;
  startDate: string;
  endDate: string;
  totalValue: string;
  acceptedTerms: boolean;
}

interface ApiResponse {
  id: number;
  [key: string]: any;
}

interface Cliente {
  nome: string;
  cpf: string;
  email: string;
}

const RentalContractPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id: vehicleId } = useParams<{ id: string }>();

  const [contractData, setContractData] = useState<ContractData>({
    customerName: '',
    document: '',
    email: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    totalValue: '',
    acceptedTerms: false,
  });

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [diaria, setDiaria] = useState<number>(0);

  useEffect(() => {
    fetch('http://localhost:8080/api/clientes')
      .then(res => res.json())
      .then(data => setClientes(data))
      .catch(err => console.error("Erro ao buscar clientes:", err));
  }, []);

  useEffect(() => {
    if (vehicleId) {
      fetch(`http://localhost:8080/api/veiculos/${vehicleId}`)
        .then(res => res.json())
        .then(data => setDiaria(data.diaria))
        .catch(err => console.error("Erro ao buscar veículo:", err));
    }
  }, [vehicleId]);

  useEffect(() => {
    if (contractData.startDate && contractData.endDate && diaria > 0) {
      const start = new Date(contractData.startDate);
      const end = new Date(contractData.endDate);
      const dias = Math.max(Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)), 0);
      const valorTotal = dias * diaria;
      setContractData(prev => ({ ...prev, totalValue: valorTotal.toFixed(2) }));
    }
  }, [contractData.startDate, contractData.endDate, diaria]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    if (name === 'document') {
      const onlyNumbers = value.replace(/\D/g, '');
      if (onlyNumbers.length <= 11) {
        setContractData({ ...contractData, document: onlyNumbers });
      }
    } else if (name === 'email') {
      if (value.length <= 256) {
        setContractData({ ...contractData, email: value });
      }
    } else {
      setContractData({ ...contractData, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const clienteCadastrado = clientes.find(cliente =>
      cliente.nome.trim().toLowerCase() === contractData.customerName.trim().toLowerCase() &&
      cliente.cpf.replace(/\D/g, '') === contractData.document.replace(/\D/g, '') &&
      cliente.email.trim().toLowerCase() === contractData.email.trim().toLowerCase()
    );

    if (!clienteCadastrado) {
      toast({
        title: "Cliente não cadastrado",
        description: "O cliente informado não está cadastrado. Cadastre o cliente antes de enviar o contrato.",
        variant: "destructive"
      });
      return;
    }

    if (!contractData.acceptedTerms) {
      toast({
        title: 'Contrato não aceito',
        description: 'Você deve confirmar que explicou os termos ao cliente.',
        variant: 'destructive',
      });
      return;
    }

    const numericVehicleId = vehicleId ? parseInt(vehicleId, 10) : undefined;
    if (numericVehicleId === undefined || isNaN(numericVehicleId)) {
      toast({ title: "Erro", description: "ID do veículo inválido ou não fornecido.", variant: "destructive" });
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/locacao/contrato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: contractData.customerName,
          document: contractData.document,
          email: contractData.email,
          startDate: contractData.startDate,
          endDate: contractData.endDate,
          totalValue: parseFloat(contractData.totalValue),
          vehicleId: numericVehicleId
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ errors: { general: "Erro ao processar resposta do servidor." } }));
        const messages = errorData.errors && typeof errorData.errors === 'object'
          ? Object.values(errorData.errors).join(', ')
          : "Erro inesperado.";
        toast({ title: "Erro ao enviar contrato", description: messages, variant: "destructive" });
        return;
      }

      const data: ApiResponse = await response.json();
      if (!data.id) throw new Error('ID do contrato não retornado');

      toast({
        title: 'Contrato enviado!',
        description: `📧 O contrato (ID: ${data.id}) será enviado para ${contractData.email} com instruções para assinatura digital.`,
        variant: 'success',
      });

      await new Promise(resolve => setTimeout(resolve, 2500));
      navigate(`/contrato/${data.id}/veiculo/${numericVehicleId}/agendar-entrega`);

    } catch (error) {
      console.error('Erro ao submeter contrato:', error);
      toast({
        title: "Erro ao conectar ao servidor",
        description: error instanceof Error ? error.message : "Verifique sua conexão ou tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Contrato de Locação</h1>
        <p className="text-gray-600 mb-6">Preencha os dados para gerar o contrato digital</p>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
          <div className="mb-4">
            <label htmlFor="customerName" className="block mb-1">Nome do Cliente</label>
            <input id="customerName" type="text" name="customerName" value={contractData.customerName} onChange={handleChange} className="input-field" required />
          </div>

          <div className="mb-4">
            <label htmlFor="document" className="block mb-1">CPF (somente números)</label>
            <input id="document" type="text" name="document" value={contractData.document} onChange={handleChange} className="input-field" required maxLength={11} pattern="\d{11}" title="Digite um CPF válido com 11 números." inputMode="numeric" />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">E-mail</label>
            <input id="email" type="email" name="email" value={contractData.email} onChange={handleChange} className="input-field" required maxLength={256} title="Digite um e-mail válido (máximo 256 caracteres)." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="startDate" className="block mb-1">Data de Início</label>
              <input id="startDate" type="date" name="startDate" value={contractData.startDate} onChange={handleChange} className="input-field" required />
            </div>
            <div>
              <label htmlFor="endDate" className="block mb-1">Data de Término</label>
              <input id="endDate" type="date" name="endDate" value={contractData.endDate} onChange={handleChange} className="input-field" required />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="totalValue" className="block mb-1">Valor Total (R$)</label>
            <input id="totalValue" type="text" name="totalValue" value={contractData.totalValue || ''} disabled className="input-field bg-gray-100 text-gray-700 border border-gray-300 rounded px-3 py-2 cursor-not-allowed" />
          </div>

          <div className="flex items-center mb-4">
            <input type="checkbox" id="acceptedTerms" name="acceptedTerms" checked={contractData.acceptedTerms} onChange={handleChange} className="w-4 h-4 mr-2 accent-blue-600" required />
            <label htmlFor="acceptedTerms" className="text-sm text-gray-700">Confirmo que todos os termos foram explicados ao cliente</label>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="btn-primary flex items-center">
              <Send className="h-5 w-5 mr-2" />
              Enviar Contrato
            </button>
          </div>
        </form>

        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Importante</h4>
              <p className="text-sm text-blue-700 mt-1">
                Certifique-se de que todos os dados estão corretos antes de enviar o contrato. O cliente receberá um e-mail para assinatura digital.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalContractPage;