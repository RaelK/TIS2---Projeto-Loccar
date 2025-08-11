import { Toaster } from "react-hot-toast";
import FeedbackForm from "../components/FeedbackForm";

export default function ClientFeedbackPage() {
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        🌟 Avalie sua experiência na Loccar!
      </h1>

      <FeedbackForm
        tipoFeedback="INICIAL"
        clienteId={undefined} // 🔥 Sem cliente vinculado
        contratoId={undefined} // 🔥 Sem contrato vinculado
      />

      <Toaster position="top-center" />
    </div>
  );
}
