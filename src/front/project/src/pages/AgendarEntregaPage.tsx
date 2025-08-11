import React from 'react';

const AgendarEntregaPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto bg-green-50 border border-green-300 rounded-xl p-6 text-center shadow">
        <h2 className="text-2xl font-semibold text-green-800">
          ✅ Entrega confirmada com sucesso!
        </h2>
        <p className="text-green-700 mt-4 text-lg">
          🚗 O veículo está pronto para ser retirado pelo cliente.
        </p>
      </div>
    </div>
  );
};

export default AgendarEntregaPage;
