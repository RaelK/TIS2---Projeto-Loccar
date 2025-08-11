import { useToast } from '../hooks/useToast';

export function useFuncionarioToast() {
  const { toast } = useToast();
  
  function sucesso(mensagem: string) {
    toast({
      title: 'Sucesso!',
      description: mensagem,
      variant: 'success',
    });
  }

  function erro(mensagem: string) {
    toast({
      title: 'Erro ao cadastrar funcionário',
      description: mensagem,
      variant: 'error',
    });
  }

  return { sucesso, erro };
}