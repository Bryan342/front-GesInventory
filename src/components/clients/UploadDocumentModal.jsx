import React, { useState } from 'react';
import { X, UploadCloud, FileType, Calendar, FileText, Hash } from 'lucide-react';

const UploadDocumentModal = ({ isOpen, onClose, onSave, companyName }) => {
  const [formData, setFormData] = useState({
    code: '', // Nuevo campo
    type: 'INFORME',
    date: '',
    file: null,
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación simple
    if (!formData.code || !formData.date || !formData.file) {
      alert("Por favor completa el Código, la Fecha y selecciona un Archivo.");
      return;
    }
    
    // Simulamos el envío
    onSave({
      ...formData,
      fileName: formData.file.name // Guardamos solo el nombre para simular
    });
    
    // Limpiar formulario
    setFormData({ code: '', type: 'INFORME', date: '', file: null, notes: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl relative border border-gray-100">
        
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"><X size={20} /></button>

        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#1e1b4b] p-3 rounded-xl text-white shadow-lg">
            <UploadCloud size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#1e1b4b]">Registrar Documento</h2>
            <p className="text-sm text-gray-500">Empresa: <span className="font-semibold">{companyName}</span></p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* 1. NUEVO CAMPO: CÓDIGO */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-1">
              <Hash size={16} className="text-blue-900"/> Código / Serie
            </label>
            <input 
              type="text" 
              autoFocus
              placeholder="Ej: FAC-E001-2023"
              className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-900 outline-none transition"
              value={formData.code}
              onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
            />
          </div>

          {/* 2. Tipo y Fecha (en dos columnas para ahorrar espacio) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-1">
                <FileType size={16} className="text-blue-900"/> Tipo
              </label>
              <select 
                className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-900 outline-none"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="INFORME">Informe</option>
                <option value="FACTURA">Factura</option>
                <option value="GUIA">Guía Remisión</option>
                <option value="CONTRATO">Contrato</option>
              </select>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-1">
                <Calendar size={16} className="text-blue-900"/> Fecha
              </label>
              <input 
                type="date" 
                className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-900 outline-none"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
          </div>

          {/* 3. Archivo */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-1">
              <FileText size={16} className="text-blue-900"/> Archivo Digital
            </label>
            <div className="relative group">
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={(e) => setFormData({...formData, file: e.target.files[0]})}
              />
              <div className="w-full p-4 bg-white border-2 border-dashed border-gray-300 rounded-xl text-center group-hover:border-blue-500 group-hover:bg-blue-50 transition flex flex-col items-center justify-center gap-2">
                {formData.file ? (
                  <>
                    <FileText size={24} className="text-green-600"/>
                    <span className="font-bold text-gray-800 text-sm">{formData.file.name}</span>
                  </>
                ) : (
                  <>
                    <UploadCloud size={24} className="text-gray-400"/>
                    <span className="text-gray-500 text-sm">Arrastra o clic para subir</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <button type="submit" className="w-full bg-[#1e1b4b] text-white py-4 rounded-xl font-bold hover:bg-blue-900 transition shadow-lg mt-2">
            Guardar Documento
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadDocumentModal;