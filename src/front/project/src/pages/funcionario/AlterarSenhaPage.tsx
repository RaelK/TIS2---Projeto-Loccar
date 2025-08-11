import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../components/ui/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AlterarSenhaPage() {
  const { id } = useAuth();
  const navigate = useNavigate();

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleAlterarSenha = async () => {
    if (novaSenha !== confirmarSenha) {
      setMensagem("A nova senha e a confirmação não coincidem.");
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/auth/alterar-senha/${id}`, {
        senhaAtual,
        novaSenha
      });

      setMensagem("Senha alterada com sucesso.");
      setTimeout(() => {
        navigate("/car-management"); // 🔥 Redireciona após alterar senha
      }, 1500);
    } catch (error) {
      setMensagem("Erro ao alterar senha. Verifique a senha atual.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Alterar Senha</h2>

        {mensagem && (
          <div className="text-center text-sm mb-4 text-red-500">{mensagem}</div>
        )}

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Senha Atual</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md"
            value={senhaAtual}
            onChange={(e) => setSenhaAtual(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Nova Senha</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-gray-700">Confirmar Nova Senha</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
        </div>

        <button
          onClick={handleAlterarSenha}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Alterar Senha
        </button>
      </div>
    </div>
  );
}