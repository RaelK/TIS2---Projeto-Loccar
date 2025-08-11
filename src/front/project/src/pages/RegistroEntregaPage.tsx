import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/useToast';

interface RouteParams {
  contratoId?: string;
  veiculoId?: string;
  [key: string]: string | undefined;
}

const RegistroEntregaPage: React.FC = () => {
  const { toast } = useToast();
  const { contratoId, veiculoId } = useParams<RouteParams>();
  const navigate = useNavigate();

  const [observacoesEntrega, setObservacoesEntrega] = useState('');
  const [entregaConfirmada, setEntregaConfirmada] = useState(false);

  const handleConfirmarEntrega = async () => {
    const veiculoIdNumber = parseInt(veiculoId || '');

    if (!contratoId || isNaN(veiculoIdNumber)) {
      toast({
        title: 'Erro nos parâmetros',
        description: 'Contrato ou veículo inválido. Tente novamente.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/entregas/${contratoId}/confirmar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contratoId: parseInt(contratoId),
          observacoesEntrega,
          checklistPreenchido: true,
          termoAssinado: true,
          dataEntrega: new Date().toISOString(),
          horaEntrega: new Date().toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }),
        }),
      });

      if (response.ok) {
        await fetch(`http://localhost:8080/api/veiculos/${veiculoIdNumber}/status`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'ALUGADO' }),
        });

        toast({
          title: '✅ Entrega confirmada!',
          description: 'O status do veículo foi atualizado.',
          variant: 'success',
        });

        setEntregaConfirmada(true);

        // ⏳ Redireciona após 4 segundos
        setTimeout(() => {
          navigate('/client-feedback');
        }, 4000);

      } else {
        toast({
          title: '❌ Erro ao confirmar entrega',
          description: 'Verifique os dados e tente novamente.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Erro inesperado',
        description: 'Não foi possível conectar ao servidor.',
        variant: 'destructive',
      });
    }
  };

  if (entregaConfirmada) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] px-4">
        <div className="text-center p-8 bg-green-50 border border-green-200 rounded-xl shadow-lg max-w-lg w-full">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            ✅ Entrega confirmada com sucesso!
          </h2>
          <p className="text-green-600 text-lg mb-4">
            🚗 O veículo está pronto para ser retirado pelo cliente.
          </p>
          <p className="text-blue-700 text-md">
            🔗 Você será redirecionado para nosso <strong>formulário de feedback</strong> para avaliar sua experiência.
          </p>
          <p className="text-sm text-gray-500 mt-2">Se não for redirecionado, <a className="text-blue-600 underline" href="/client-feedback">clique aqui</a>.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Registro de Entrega</h1>

      <div className="mb-4">
        <label htmlFor="observacoes" className="block mb-1 font-medium">
          Observações da entrega
        </label>
        <textarea
          id="observacoes"
          className="w-full border border-gray-300 rounded-md p-2"
          value={observacoesEntrega}
          onChange={(e) => setObservacoesEntrega(e.target.value)}
        />
      </div>

      <button
        onClick={handleConfirmarEntrega}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
      >
        Confirmar Entrega
      </button>
    </div>
  );
};

export default RegistroEntregaPage;