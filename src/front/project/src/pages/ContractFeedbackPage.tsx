import { Toaster } from "react-hot-toast";
import FeedbackForm from "../components/FeedbackForm";
import { useParams } from "react-router-dom";

export default function ContractFeedbackPage() {
  const { id } = useParams();

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        📄 Avalie seu Contrato
      </h1>

      <FeedbackForm contratoId={Number(id)} tipoFeedback="GERAL" />

      <Toaster position="top-center" />
    </div>
  );
}