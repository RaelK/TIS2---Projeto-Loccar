import React, { useState, useEffect } from "react";
import { useToast } from "../hooks/useToast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, UploadCloud } from "lucide-react";

const checklistDanos = [
  { key: "lataria", label: "Danos na lataria" },
  { key: "vidros", label: "Trincos ou quebras nos vidros" },
  { key: "pneus", label: "Danos ou desgaste excessivo nos pneus" },
  { key: "interior", label: "Danos no interior do veículo" },
  { key: "luzes", label: "Luzes quebradas ou não funcionais" },
  { key: "outros", label: "Outros danos" },
];

const VehicleReturnEvaluationPage: React.FC = () => {
  const [veiculosAlugados, setVeiculosAlugados] = useState<any[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [clienteNome, setClienteNome] = useState<string>("");
  const [dataHoraDevolucao, setDataHoraDevolucao] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [fotos, setFotos] = useState<File[]>([]);
  const [comprovante, setComprovante] = useState<File | null>(null);
  const [contratoAssinado, setContratoAssinado] = useState<File | null>(null);
  const [avaliacaoEstrelas, setAvaliacaoEstrelas] = useState(0);
  const [possuiDanos, setPossuiDanos] = useState<boolean | null>(null);
  const [danosChecklist, setDanosChecklist] = useState<{ [key: string]: boolean }>({});
  const [descricaoDanos, setDescricaoDanos] = useState("");
  const [dataPrevistaReparo, setDataPrevistaReparo] = useState("");
  const [custoEstimadoReparo, setCustoEstimadoReparo] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/veiculos?status=ALUGADO")
      .then((res) => setVeiculosAlugados(res.data))
      .catch((err) => console.error("Erro ao buscar veículos alugados:", err));
  }, []);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (files: any) => void,
    options?: { multiple?: boolean; accept?: string[]; maxFiles?: number }
  ) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);

      const validFiles = options?.accept
        ? fileList.filter((file) => options.accept?.includes(file.type))
        : fileList;

      if (options?.maxFiles && validFiles.length > options.maxFiles) {
        toast({ title: `Máximo de ${options.maxFiles} arquivos permitido.` });
        return;
      }

      setter(options?.multiple ? validFiles : validFiles[0]);
    }
  };

  const handleDanosChecklistChange = (key: string) => {
    setDanosChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!selectedVehicle || !clienteNome || !dataHoraDevolucao || avaliacaoEstrelas === 0) {
      toast({ title: "Preencha todos os campos obrigatórios." });
      setIsSubmitting(false);
      return;
    }

    const checklistSelecionado = Object.entries(danosChecklist)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    const body = {
      dataHoraDevolucao,
      comprovanteUrl: comprovante?.name ?? "",
      checklistDigital: checklistSelecionado,
      fotosVeiculoUrls: fotos.map((f) => f.name),
      descricaoDanos,
      possuiDanos,
      tipoReparo: selectedVehicle,
      custoEstimado: Number(custoEstimadoReparo) || 0,
      dataPrevista: dataPrevistaReparo,
      avaliacaoCliente: avaliacaoEstrelas,
      comentarioCliente: observacoes,
      contratoAssinadoUrl: contratoAssinado?.name ?? "",
      linkRelatorio: "",
      decisaoGerente: "",
      comentarioGerente: "",
      clienteNome,
    };

    try {
      // Envio da avaliação
      const response = await fetch("http://localhost:8080/api/avaliacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        toast({
          title: "Erro ao salvar a avaliação",
          description: "Tente novamente.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Atualizar status do veículo após salvar a avaliação
      const novoStatus = possuiDanos ? "MANUTENCAO" : "DISPONIVEL";

      const statusResponse = await fetch(`http://localhost:8080/api/veiculos/${selectedVehicle}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: novoStatus }),
      });

      if (!statusResponse.ok) {
        toast({
          title: "Avaliação salva, mas erro ao atualizar status do veículo",
          description: "O status do veículo precisa ser atualizado manualmente.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      toast({
        title: "Avaliação salva com sucesso!",
        description: `O veículo foi movido para status ${novoStatus}.`,
        variant: "success",
      });

      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate("/car-management");

    } catch (error) {
      console.error("Erro:", error);
      toast({
        title: "Erro",
        description: "Não foi possível concluir a avaliação. Verifique a conexão.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Avaliação de Devolução</h1>
        <p className="text-gray-600 mb-8">Registre a vistoria e avaliação final do veículo devolvido.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Veículo */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Veículo:</label>
            <select
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Selecione um veículo</option>
              {veiculosAlugados.map((veiculo: any) => (
                <option key={veiculo.id} value={veiculo.id}>
                  {veiculo.modelo} - {veiculo.placa}
                </option>
              ))}
            </select>
          </div>

          {/* Cliente */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Cliente:</label>
            <input
              type="text"
              value={clienteNome}
              onChange={(e) => setClienteNome(e.target.value)}
              placeholder="Digite o nome do cliente"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Data e Hora */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Data e Hora da Devolução:</label>
            <input
              type="datetime-local"
              value={dataHoraDevolucao}
              onChange={(e) => setDataHoraDevolucao(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Comentário */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Comentário do Cliente:</label>
            <textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={3}
            />
          </div>

          {/* Avaliação Estrelas */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Avaliação:</label>
            <div className="flex items-center gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setAvaliacaoEstrelas(star)}
                  className="focus:outline-none"
                  aria-label={`Avaliar com ${star} estrela${star > 1 ? 's' : ''}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={avaliacaoEstrelas >= star ? '#facc15' : 'none'}
                    viewBox="0 0 30 24"
                    stroke="#facc15"
                    className="w-7 h-7"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.29a1 1 0 00.95.69h6.6c.969 0 1.371 1.24.588 1.81l-5.347 3.89a1 1 0 00-.364 1.118l2.036 6.29c.3.921-.755 1.688-1.538 1.118l-5.347-3.89a1 1 0 00-1.175 0l-5.347 3.89c-.783.57-1.838-.197-1.538-1.118l2.036-6.29a1 1 0 00-.364-1.118l-5.347-3.89c-.783-.57-.38-1.81.588-1.81h6.6a1 1 0 00.95-.69l2.036-6.29z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Comprovante */}
          <div>
            <label className="block text-gray-700 font-bold mb-2 flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-blue-500" />
              Comprovante <span className="text-xs text-gray-500">(Arquivo PDF ou JPG/PNG)</span>
            </label>
            <input
              type="file"
              accept="application/pdf,image/jpeg,image/png"
              onChange={(e) =>
                handleFileChange(e, setComprovante, {
                  accept: ['application/pdf', 'image/jpeg', 'image/png']
                })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {comprovante && (
              <div className="text-xs bg-gray-100 px-2 py-1 mt-2 rounded">
                {comprovante.name}
              </div>
            )}
          </div>

          {/* Fotos */}
          <div>
            <label className="block text-gray-700 font-bold mb-2 flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-blue-500" />
              Fotos da Devolução <span className="text-xs text-gray-500">(Máximo 5 imagens JPG/PNG)</span>
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png"
              multiple
              onChange={(e) =>
                handleFileChange(e, setFotos, {
                  multiple: true,
                  accept: ['image/jpeg', 'image/png'],
                  maxFiles: 5
                })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {fotos.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {fotos.map((file, idx) => (
                  <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {file.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Contrato */}
          <div>
            <label className="block text-gray-700 font-bold mb-2 flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-blue-500" />
              Contrato Assinado <span className="text-xs text-gray-500">(Arquivo PDF)</span>
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) =>
                handleFileChange(e, setContratoAssinado, {
                  accept: ['application/pdf']
                })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {contratoAssinado && (
              <div className="text-xs bg-gray-100 px-2 py-1 mt-2 rounded">
                {contratoAssinado.name}
              </div>
            )}
          </div>

          {/* Danos */}
          <div className="mt-6">
            <label className="block text-gray-700 font-bold mb-2">Veículo possui danos?</label>
            <div className="flex gap-6 mt-2">
              <button
                type="button"
                className={`flex items-center gap-2 px-4 py-2 rounded border ${possuiDanos === true ? "bg-green-100 border-green-500" : "border-gray-300"}`}
                onClick={() => setPossuiDanos(true)}
              >
                <CheckCircle className="w-5 h-5 text-green-600" /> Sim
              </button>
              <button
                type="button"
                className={`flex items-center gap-2 px-4 py-2 rounded border ${possuiDanos === false ? "bg-red-100 border-red-500" : "border-gray-300"}`}
                onClick={() => setPossuiDanos(false)}
              >
                <XCircle className="w-5 h-5 text-red-600" /> Não
              </button>
            </div>
          </div>

          {possuiDanos && (
            <div className="mt-6 p-4 border rounded bg-red-50">
              <h3 className="font-semibold text-red-700 mb-4">Relatar Danos do Veículo</h3>

              <div className="space-y-4">
                {/* Checklist de Danos */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Checklist de Danos</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {checklistDanos.map((item) => (
                      <label key={item.key} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={!!danosChecklist[item.key]}
                          onChange={() => handleDanosChecklistChange(item.key)}
                        />
                        {item.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Descrição dos Danos */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Descrição dos Danos</label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows={3}
                    value={descricaoDanos}
                    onChange={(e) => setDescricaoDanos(e.target.value)}
                  />
                </div>

                {/* Data prevista para o reparo */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Data prevista para o reparo</label>
                  <input
                    type="date"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={dataPrevistaReparo}
                    onChange={(e) => setDataPrevistaReparo(e.target.value)}
                  />
                </div>

                {/* Custo estimado */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">
                    Custo estimado do reparo (R$)
                  </label>
                  <input
                    type="number"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={custoEstimadoReparo}
                    onChange={(e) => setCustoEstimadoReparo(e.target.value)}
                    placeholder="Digite o custo estimado"
                    min={0}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Salvar Avaliação"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleReturnEvaluationPage;