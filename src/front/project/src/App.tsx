import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import LandingPage from './pages/LandingPage';
import CustomerRegistrationPage from './pages/CustomerRegistrationPage';
import CarManagementPage from './pages/CarManagementPage';
import CarRegistrationPage from './pages/CarRegistrationPage';
import CarMaintenancePage from './pages/CarMaintenancePage';
import FuncionarioRegistrationPage from './pages/funcionario/FuncionarioRegistrationPage';
import LoginFuncionarioPage from './pages/funcionario/LoginFuncionarioPage';
import VehicleRentalPage from './pages/VehicleRentalPage';
import VehicleDeliveryPage from './pages/VehicleDeliveryPage';
import RentalContractPage from './pages/RentalContractPage';
import VehicleReturnEvaluationPage from './pages/VehicleReturnEvaluationPage';
import AlterarSenhaPage from './pages/funcionario/AlterarSenhaPage';
import PerformanceIndicatorsPage from './pages/PerformanceIndicatorsPage';
import TechnicalInspectionPage from './pages/vistoria/TechnicalInspectionPage';
import InspectionChecklistPage from './pages/vistoria/InspectionChecklistPage';
import InspectionApprovalPage from './pages/vistoria/InspectionApprovalPage';
import CarEditPage from './pages/CarEditPage';

import ClientFeedbackPage from './pages/ClientFeedbackPage';

import RegistroEntregaPage from './pages/RegistroEntregaPage'; // Página de Agendar Entrega

import { Toaster } from './components/ui/Toaster';

function App() {
  return (
    <Layout>
      <Routes>
        {/* 🔹 Página Inicial */}
        <Route path="/" element={<LandingPage />} />

        {/* 🔹 Clientes */}
        <Route path="/customer-registration" element={<CustomerRegistrationPage />} />

        {/* 🔹 Veículos */}
        <Route path="/car-management" element={<CarManagementPage />} />
        <Route path="/car-registration" element={<CarRegistrationPage />} />
        <Route path="/car-maintenance/:id" element={<CarMaintenancePage />} />
        <Route path="/car-edit/:id" element={<CarEditPage />} />

        {/* 🔹 Funcionários */}
        <Route path="/funcionario" element={<FuncionarioRegistrationPage />} />
        <Route path="/login-funcionario" element={<LoginFuncionarioPage />} />
        <Route path="/alterar-senha" element={<AlterarSenhaPage />} />

        {/* 🔹 Locação */}
        <Route path="/vehicle-rental" element={<VehicleRentalPage />} />
        <Route path="/rental-contract/:id" element={<RentalContractPage />} />
        <Route path="/vehicle-delivery/:id" element={<VehicleDeliveryPage />} />
        <Route path="/contrato/:id/entregar-veiculo" element={<VehicleDeliveryPage />} />
        <Route path="/vehicle-return-evaluation" element={<VehicleReturnEvaluationPage />} />
        <Route path="/contrato/:contratoId/veiculo/:veiculoId/agendar-entrega" element={<RegistroEntregaPage />} />

        {/* 🔹 Indicadores */}
        <Route path="/performance-indicators" element={<PerformanceIndicatorsPage />} />

        {/* 🔹 Vistoria Técnica */}
        <Route path="/technical-inspection/agendamento" element={<TechnicalInspectionPage />} />
        <Route path="/technical-inspection/checklist" element={<InspectionChecklistPage />} />
        <Route path="/technical-inspection/aprovacao" element={<InspectionApprovalPage />} />

        {/* 🔹 Feedback */}
        <Route path="/client-feedback" element={<ClientFeedbackPage />} />
      </Routes>

      <Toaster />
    </Layout>
  );
}

export default App;