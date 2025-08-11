import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

interface FeedbackFormProps {
  clienteId?: number;
  contratoId?: number;
  tipoFeedback: "INICIAL" | "GERAL";
}

export default function FeedbackForm({
  clienteId,
  contratoId,
  tipoFeedback,
}: FeedbackFormProps) {
  const [nota, setNota] = useState<number>(0);
  const [comentario, setComentario] = useState<string>("");
  const navigate = useNavigate();

  const enviarFeedback = async () => {
    if (nota < 1) {
      toast.error("🌟 Por favor, selecione uma nota de 1 a 5.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/feedback", {
        cliente: clienteId ? { id: clienteId } : null,
        contrato: contratoId ? { id: contratoId } : null,
        nota,
        comentario,
        tipoFeedback,
      });

      toast.success("✅ Obrigado pelo seu feedback!");

      setNota(0);
      setComentario("");

      setTimeout(() => navigate("/"), 3000); // Redireciona após 3 segundos
    } catch (error) {
      toast.error(
        "❌ Erro ao enviar. Verifique sua conexão ou os dados preenchidos."
      );
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-6 text-center leading-snug">
        🚗 Sua opinião é muito importante. <br />
        Avalie nosso atendimento e sua experiência no sistema.
      </h2>


      <div className="flex justify-center space-x-2 mb-4">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setNota(n)}
            className={`text-4xl ${n <= nota ? "text-yellow-400" : "text-gray-300"
              } hover:scale-110 transition cursor-pointer`}
            aria-label={`${n} estrelas`}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        className="w-full border rounded p-2 mb-4"
        rows={4}
        maxLength={500}
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="Deixe seu comentário (opcional)"
      />

      <button
        onClick={enviarFeedback}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Enviar Feedback
      </button>
    </div>
  );
}