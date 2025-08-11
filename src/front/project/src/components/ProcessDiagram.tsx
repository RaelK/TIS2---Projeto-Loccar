import React from 'react';
import { CheckCircle, AlertTriangle, UserCheck, Send } from 'lucide-react';

const ProcessDiagram: React.FC = () => {
  const steps = [
    {
      icon: <UserCheck className="h-5 w-5" />,
      label: "Documentos Recebidos",
      color: "blue"
    },
    {
      icon: <AlertTriangle className="h-5 w-5" />,
      label: "Verificação",
      color: "yellow"
    },
    {
      icon: <Send className="h-5 w-5" />,
      label: "Cadastro",
      color: "green"
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      label: "Confirmação",
      color: "indigo"
    }
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[400px] py-4">
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 -translate-y-1/2" />
          
          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center animate-fade-up" style={{
                animationDelay: `${index * 100}ms`
              }}>
                <div className={`w-12 h-12 rounded-full bg-${step.color}-50 border-2 border-${step.color}-200 flex items-center justify-center mb-3 text-${step.color}-500 relative z-10`}>
                  {step.icon}
                </div>
                <span className="text-sm font-medium text-gray-600 text-center w-24">
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessDiagram;