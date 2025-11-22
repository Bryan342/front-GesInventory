import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const EditMovementModal = ({ isOpen, onClose, onSave, movement }) => {
  const [formData, setFormData] = useState({ id: '', quantity: '', reason: '', notes: '' });

  useEffect(() => {
    if (movement) setFormData(movement);
  }, [movement]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-xl relative">
        <button onClick={onClose} className="absolute top-4 right-4"><X size={20}/></button>
        <h3 className="text-xl font-bold mb-4 text-[#1e1b4b]">Editar Movimiento</h3>
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); onClose(); }} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500">Cantidad</label>
            <input type="number" className="w-full p-2 border rounded-lg bg-gray-50" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500">Motivo</label>
            <input type="text" className="w-full p-2 border rounded-lg bg-gray-50" value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500">Notas</label>
            <textarea className="w-full p-2 border rounded-lg bg-gray-50" rows="3" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} />
          </div>
          <button type="submit" className="w-full bg-[#1e1b4b] text-white py-3 rounded-xl font-bold">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
};
export default EditMovementModal;