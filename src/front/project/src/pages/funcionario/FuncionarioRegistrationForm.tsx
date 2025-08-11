import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

export default function FuncionarioRegistrationForm() {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    cargo: "",
    dataAdmissao: "",
    status: "",
    senha: ""
  });

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "cpf") {
      const apenasNumeros = value.replace(/\D/g, "");
      setFormData({ ...formData, [name]: apenasNumeros });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        cpf: formData.cpf.replace(/\D/g, ""),
        cargo: formData.cargo.toUpperCase(),
        dataAdmissao: dayjs(formData.dataAdmissao, "YYYY-MM-DD").isValid()
          ? dayjs(formData.dataAdmissao, "YYYY-MM-DD").format("DD/MM/YYYY")
          : formData.dataAdmissao
      };

      await axios.post("http://localhost:8080/funcionarios", payload);
      setMensagem("Funcionário cadastrado com sucesso!");
      setFormData({
        nome: "",
        cpf: "",
        email: "",
        telefone: "",
        cargo: "",
        dataAdmissao: "",
        status: "",
        senha: ""
      });
    } catch (error) {
      setMensagem("Erro ao cadastrar funcionário.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Cadastro de Funcionário</h2>
      {mensagem && <p className="mb-4 text-center text-sm text-red-500">{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input type="text" name="nome" value={formData.nome} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">CPF</label>
            <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} maxLength={14} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="Ex: 123.456.789-00" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Telefone</label>
            <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cargo</label>
            <select name="cargo" value={formData.cargo} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option value="">Selecione</option>
              <option value="ADMINISTRADOR">Administrador</option>
              <option value="GERENTE">Gerente</option>
              <option value="ATENDENTE">Atendente</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Data de Admissão</label>
            <input type="text" name="dataAdmissao" placeholder="dd/mm/yyyy" value={formData.dataAdmissao} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select name="status" value={formData.status} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option value="">Selecione</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <div className="relative">
              <input
                type={mostrarSenha ? "text" : "password"}
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 pr-10"
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-2 top-2 text-sm text-blue-600 hover:underline"
              >
                {mostrarSenha ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition">
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}