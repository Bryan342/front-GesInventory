import React from 'react';
import { X } from 'lucide-react';

const NoteModal = ({ isOpen, onClose, note, title }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"><X size={18}/></button>
        <h3 className="text-lg font-bold mb-4 text-[#1e1b4b]">Notas de {title}</h3>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-gray-700 italic">
          "{note}"
        </div>
      </div>
    </div>
  );
};
export default NoteModal;