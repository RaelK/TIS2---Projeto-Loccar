import React from 'react';
import { Link } from 'react-router-dom';
import { Car, ShieldCheck, Clock, Award, ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-500 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Locação de veículos simplificada para o seu negócio
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              A Loccar oferece uma solução completa para automatização, 
              eficiência e otimização dos processos de locação de veículos.
            </p>
            <Link 
              to="/login-funcionario"
              className="inline-flex items-center bg-white text-blue-700 font-semibold px-6 py-3 rounded-md shadow-lg hover:bg-blue-50 transition-all transform hover:translate-y-[-2px]"
            >
              Área do Funcionário
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
        
        {/* Wave shape divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
            className="w-full h-[60px] fill-gray-50"
          >
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Por que escolher a Loccar?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Segurança</h3>
              <p className="text-gray-600">
                Sua frota e dados protegidos com nosso sistema avançado de segurança e controle.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Eficiência</h3>
              <p className="text-gray-600">
                Automatize processos e reduza o tempo gasto em tarefas administrativas.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Qualidade</h3>
              <p className="text-gray-600">
                Sistema desenvolvido com as melhores tecnologias para garantir estabilidade e performance.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Car className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Simplicidade</h3>
              <p className="text-gray-600">
                Interface intuitiva e fácil de usar, sem complicações para você e sua equipe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Pronto para otimizar seu negócio?</h2>
          <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
            Acesse a área do funcionário para começar a cadastrar seus clientes e 
            experimente como a Loccar pode transformar o seu negócio de locação de veículos.
          </p>
          <Link 
            to="/login-funcionario"
            className="inline-flex items-center bg-blue-600 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition-colors"
          >
            Acessar Área do Funcionário
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;