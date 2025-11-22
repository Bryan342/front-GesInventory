import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddCompanyModal = ({ isOpen, onClose, onSave, selectedPlan }) => {
  const [companyName, setCompanyName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!companyName.trim()) return;
    
    // Enviamos el nombre y el plan seleccionado al padre
    onSave({ name: companyName, plan: selectedPlan });
    setCompanyName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"><X size={20}/></button>
        
        <h2 className="text-2xl font-bold mb-2 text-[#1e1b4b]">Nueva Suscripción</h2>
        <p className="text-blue-600 font-medium mb-6">Plan seleccionado: {selectedPlan}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Nombre de la Empresa</label>
            <input 
              autoFocus
              type="text" 
              className="w-full p-3 bg-gray-50 rounded-xl border focus:ring-2 focus:ring-blue-900 outline-none"
              placeholder="Ej: Constructora S.A.C."
              value={companyName} 
              onChange={e => setCompanyName(e.target.value)} 
            />
          </div>

          <button type="submit" className="w-full bg-[#1e1b4b] text-white py-3 rounded-xl font-bold hover:bg-blue-900 transition shadow-lg">
            Crear y Agregar Empresa
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCompanyModal;