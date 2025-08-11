import React, { createContext, useContext, useState, useEffect } from 'react';

interface Usuario {
  id: number;
  nome: string;
  cargo: string;
  email: string;
}

interface AuthContextType {
  isFuncionario: boolean;
  nome: string;
  cargo: string;
  id: number | null;
  email: string;
  loginAsFuncionario: (usuario: Usuario) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFuncionario, setIsFuncionario] = useState(false);
  const [nome, setNome] = useState('Funcionário');
  const [cargo, setCargo] = useState('Cargo');
  const [id, setId] = useState<number | null>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (storedUser?.nome && storedUser?.cargo && storedUser?.id) {
      setIsFuncionario(true);
      setNome(storedUser.nome);
      setCargo(storedUser.cargo);
      setId(storedUser.id);
      setEmail(storedUser.email);
    }
  }, []);

  const loginAsFuncionario = (usuario: Usuario) => {
    setIsFuncionario(true);
    setNome(usuario.nome);
    setCargo(usuario.cargo);
    setId(usuario.id);
    setEmail(usuario.email);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  };

  const logout = () => {
    setIsFuncionario(false);
    setNome('Funcionário');
    setCargo('Cargo');
    setId(null);
    setEmail('');
    localStorage.removeItem('usuario');
  };

  return (
    <AuthContext.Provider value={{ isFuncionario, nome, cargo, id, email, loginAsFuncionario, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};