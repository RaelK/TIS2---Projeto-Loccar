import React from 'react';
import CustomerRegistrationForm from '../components/CustomerRegistrationForm';
import ProcessDiagram from '../components/ProcessDiagram';
import { Clock, UserPlus, AlertTriangle } from 'lucide-react';

const CustomerRegistrationPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="mb-12 text-center animate-fade-up">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Cadastro de Clientes</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Preencha o formulário com os dados do cliente para efetuar o cadastro no sistema.
            Certifique-se de que todos os documentos foram conferidos antes de finalizar.
          </p>
        </div>

        {/* Grid de conteúdo principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Formulário */}
          <div className="lg:col-span-7">
            <div className="card p-8">
              <CustomerRegistrationForm />
            </div>
          </div>

          {/* Etapas e diagrama */}
          <div className="lg:col-span-5 space-y-8">
            <div className="card p-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <Clock className="mr-3 h-5 w-5 text-blue-500" />
                Etapas do Processo
              </h3>
              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: "Recebimento de Documentos",
                    description: "Cliente fornece os documentos necessários"
                  },
                  {
                    step: 2,
                    title: "Conferência",
                    description: "Funcionário confere a documentação"
                  },
                  {
                    step: 3,
                    title: "Cadastro",
                    description: "Dados são cadastrados no sistema"
                  },
                  {
                    step: 4,
                    title: "Confirmação",
                    description: "Cliente recebe a confirmação do cadastro"
                  }
                ].map((item) => (
                  <div key={item.step} className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <span className="text-blue-600 font-medium">{item.step}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <UserPlus className="mr-3 h-5 w-5 text-blue-500" />
                Fluxo de Cadastro
              </h3>
              <ProcessDiagram />
            </div>
          </div>
        </div>

        {/* Bloco Proteção de Dados - fora do grid */}
        <div className="flex justify-center">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 w-full max-w-md">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Proteção de Dados</h4>
                <p className="text-sm text-blue-700">
                  Todos os dados pessoais coletados estão sujeitos à LGPD. 
                  Mantenha a confidencialidade das informações do cliente.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomerRegistrationPage;