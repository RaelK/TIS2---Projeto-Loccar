import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../components/ui/AuthContext";

export default function LoginFuncionarioPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { loginAsFuncionario } = useAuth();

  // 🔥 Aqui é onde fica o handleLogin
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        senha
      });

      console.log(response.data); // 🔥 Verifica no console se vem id, nome e cargo

      const usuario = {
        id: response.data.id,
        nome: response.data.nome,
        cargo: response.data.cargo, // 🔥 ESSENCIAL! Aqui salva o cargo
        email: email
      };

      localStorage.setItem("usuario", JSON.stringify(usuario));
      loginAsFuncionario(usuario); // 🔥 Atualiza o contexto
      navigate("/car-management"); // 🔥 Redireciona após login
    } catch {
      setErro("Email ou senha inválidos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 px-4">
      <div className="flex w-full max-w-4xl shadow-xl rounded-3xl overflow-hidden">
        <div className="w-full md:w-1/2 bg-white p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Entrar</h2>

          <div className="text-center text-sm text-gray-500 mb-6">
            Use sua conta de email
          </div>

          {erro && (
            <p className="text-red-600 text-center font-medium mb-4">{erro}</p>
          )}

          <div className="mb-4">
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <div className="mb-6 text-center">
            <a href="#" className="text-sm text-gray-600 hover:text-blue-600">
              Esqueceu sua senha?
            </a>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-700 transition"
          >
            ENTRAR
          </button>
        </div>

        <div className="hidden md:flex md:w-1/2 bg-blue-600 text-white items-center justify-center flex-col p-10">
          <h3 className="text-3xl font-bold mb-4 text-center">Bem-vindo, parceiro Loccar!</h3>
          <p className="mb-8 text-center max-w-xs text-blue-100">
            Registre-se com seus dados pessoais para usar nossos recursos do site
          </p>
          <a
            href="/funcionario"
            className="bg-transparent border-2 border-white text-white font-semibold px-8 py-2 rounded-full hover:bg-white hover:text-blue-600 transition-colors"
          >
            INSCREVER
          </a>
        </div>
      </div>
    </div>
  );
}