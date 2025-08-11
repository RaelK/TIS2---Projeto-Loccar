import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Car, Menu, X } from 'lucide-react';
import { useAuth } from './ui/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { isFuncionario, nome, cargo, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLogout = () => setShowLogout(!showLogout);
  const toggleDropdown = () => setOpenDropdown(!openDropdown);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('email');
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 max-w-full">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-white hover:text-blue-100 transition-colors">
            <Car className="h-8 w-8" />
            <span className="text-2xl font-bold">Loccar</span>
          </Link>

          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-4">
              {!isFuncionario ? (
                <>
                  <Link to="/customer-registration" className={`whitespace-nowrap text-white hover:text-blue-100 transition-colors ${location.pathname === '/customer-registration' ? 'border-b-2 border-white' : ''}`}>
                    👥 Cadastro de Clientes
                  </Link>
                  <Link to="/vehicle-rental" className={`whitespace-nowrap text-white hover:text-blue-100 transition-colors ${location.pathname === '/vehicle-rental' ? 'border-b-2 border-white' : ''}`}>
                    🚗 Locação
                  </Link>
                  <Link to="/client-feedback" className={`whitespace-nowrap text-white hover:text-blue-100 transition-colors ${location.pathname === '/client-feedback' ? 'border-b-2 border-white' : ''}`}>
                    💬 Feedback
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/car-management"
                    className={`whitespace-nowrap text-white hover:text-blue-100 transition-colors ${location.pathname === '/car-management' ? 'border-b-2 border-white' : ''
                      }`}
                  >
                    🚗🛠️ Gestão de Veículos
                  </Link>

                  <Link
                    to="/vehicle-return-evaluation"
                    className={`whitespace-nowrap text-white hover:text-blue-100 transition-colors ${location.pathname === '/vehicle-return-evaluation' ? 'border-b-2 border-white' : ''
                      }`}
                  >
                    🔍🚘 Avaliação de Devolução
                  </Link>

                  <Link
                    to="/technical-inspection/agendamento"
                    className={`whitespace-nowrap text-white hover:text-blue-100 transition-colors ${location.pathname.startsWith('/technical-inspection') ? 'border-b-2 border-white' : ''
                      }`}
                  >
                    🧰 Vistoria Técnica
                  </Link>

                  <Link
                    to="/performance-indicators"
                    className={`whitespace-nowrap text-white hover:text-blue-100 transition-colors ${location.pathname === '/performance-indicators' ? 'border-b-2 border-white' : ''
                      }`}
                  >
                    📊 Indicadores de Desempenho
                  </Link>
                </>
              )}
            </nav>

            {isFuncionario && (
              <div onClick={toggleLogout} className="relative flex flex-col items-end bg-blue-700 rounded-lg px-3 py-1 cursor-pointer hover:bg-blue-600 transition-all duration-200">
                <div className="leading-tight text-right">
                  <div className="text-sm font-semibold">{nome}</div>
                  <div className="text-xs italic text-blue-200">{cargo}</div>
                </div>
                <div className="w-full h-px bg-blue-300 my-1"></div>

                {showLogout && (
                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={() => navigate("/alterar-senha")}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded text-white text-sm border border-white shadow-md"
                    >
                      Alterar Senha
                    </button>

                    <button
                      onClick={handleLogout}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-white text-sm border border-white shadow-md"
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <button className="md:hidden text-white focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-2 space-y-2">
            {!isFuncionario ? (
              <>
                <Link to="/customer-registration" onClick={toggleMenu} className="block text-white hover:text-blue-100">
                  👥 Cadastro de Clientes
                </Link>
                <Link to="/vehicle-rental" onClick={toggleMenu} className="block text-white hover:text-blue-100">
                  🚗 Locação
                </Link>
                <Link to="/client-feedback" onClick={toggleMenu} className="block text-white hover:text-blue-100">
                  💬 Feedback
                </Link>
              </>
            ) : (
              <>
                <Link to="/car-management" onClick={toggleMenu} className="block text-white hover:text-blue-100">
                  Gestão de Veículos
                </Link>
                <Link to="/vehicle-return-evaluation" onClick={toggleMenu} className="block text-white hover:text-blue-100">
                  Avaliação de Devolução
                </Link>
                <Link to="/technical-inspection/agendamento" onClick={toggleMenu} className="block text-white hover:text-blue-100">
                  Vistoria - Agendamento
                </Link>
                <Link to="/technical-inspection/checklist" onClick={toggleMenu} className="block text-white hover:text-blue-100">
                  Vistoria - Checklist
                </Link>
                <Link to="/technical-inspection/aprovacao" onClick={toggleMenu} className="block text-white hover:text-blue-100">
                  Vistoria - Aprovação
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;