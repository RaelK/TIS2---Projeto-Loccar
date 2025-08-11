import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function FuncionarioAuthPage() {
  const [aba, setAba] = useState<"login" | "cadastro">("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", { email, senha });
      localStorage.setItem("usuario", JSON.stringify(res.data));
      navigate("/car-registration");
    } catch {
      setMensagem("Credenciais inválidas");
    }
  };

  const handleCadastro = async () => {
    try {
      await axios.post("http://localhost:8080/api/funcionarios", {
        nome,
        cpf,
        email,
        senha,
        cargo: "FUNCIONARIO",
        status: "ATIVO",
        telefone: "",
        dataAdmissao: new Date().toISOString().split("T")[0],
      });
      setMensagem("Cadastro realizado! Faça login.");
      setAba("login");
    } catch {
      setMensagem("Erro ao cadastrar funcionário.");
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10 bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setAba("login")}
          className={`w-1/2 py-2 ${aba === "login" ? "border-b-2 border-blue-600 font-bold" : "text-gray-500"}`}
        >
          Login
        </button>
        <button
          onClick={() => setAba("cadastro")}
          className={`w-1/2 py-2 ${aba === "cadastro" ? "border-b-2 border-blue-600 font-bold" : "text-gray-500"}`}
        >
          Cadastro
        </button>
      </div>

      {mensagem && <p className="text-center text-sm text-red-600 mb-4">{mensagem}</p>}

      {aba === "login" ? (
        <>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full p-2 border rounded mb-4"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Entrar
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Nome"
            className="w-full p-2 border rounded mb-3"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="text"
            placeholder="CPF"
            className="w-full p-2 border rounded mb-3"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full p-2 border rounded mb-4"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button
            onClick={handleCadastro}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Cadastrar
          </button>
        </>
      )}
    </div>
  );
}