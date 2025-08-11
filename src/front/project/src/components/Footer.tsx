import React from 'react';
import { Car, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Loccar</span>
            </div>
            <p className="text-gray-300">
              Soluções inovadoras para locação de veículos, com eficiência, 
              produtividade e otimização de processos.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Endereço</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin size={18} className="text-blue-400" />
                <span className="text-gray-300">
                  R. Cláudio Manoel, 1162 - Savassi, Belo Horizonte - MG, 30140-100
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={18} className="text-blue-400" />
                <span className="text-gray-300">
                  PUC Minas - Ed. Fernanda - Prédio 4
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Créditos</h3>
            <div className="space-y-2">
              <p className="text-gray-300">
                <strong>Alunos:</strong> Breno de Oliveira Ribeiro, Eduardo Assumpcao Spinelli, 
                Henrique Azevedo Flores, Pedro Lucca Feitosa Oliveira, Rael Kiluanji de Jesus Cassimiro
              </p>
              <p className="text-gray-300">
                <strong>Professoras:</strong> Cleia Marcia Gomes Amaral, Joana Gabriela Ribeiro de Souza
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-6 mt-8">
          <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
            <Facebook size={24} />
          </a>
          <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
            <Instagram size={24} />
          </a>
          <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
            <Linkedin size={24} />
          </a>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Loccar. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
