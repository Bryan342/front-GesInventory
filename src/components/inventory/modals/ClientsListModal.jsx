import React from 'react';
import { X, User } from 'lucide-react';
import clientsData from '../../../data/clients_vip.json'; // Asegúrate de que la ruta sea correcta

const ClientsListModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"><X size={20}/></button>
        <h3 className="text-2xl font-bold mb-6 text-[#1e1b4b]">Clientes Destacados</h3>
        <div className="space-y-3">
          {clientsData.map(client => (
            <div key={client.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border hover:border-blue-900 transition group">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full text-blue-900"><User size={20}/></div>
                <div>
                  <p className="font-bold text-gray-800">{client.name}</p>
                  <p className="text-xs text-gray-400">RUC: {client.ruc}</p>
                </div>
              </div>
              <span className="text-xs font-bold px-2 py-1 bg-white border rounded text-gray-600">{client.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ClientsListModal;