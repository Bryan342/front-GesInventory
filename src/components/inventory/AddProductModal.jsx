import React, { useState, useEffect } from 'react';
import { X, Sparkles, Lightbulb } from 'lucide-react';

const AddProductModal = ({ isOpen, onClose, onSave }) => {
  // Estado local del formulario
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    currentStock: '',
    description: ''
  });

  // Estado para la sugerencia de la IA
  const [aiSuggestion, setAiSuggestion] = useState(null);

  // --- LÓGICA DE IA (SISTEMA EXPERTO) ---
  useEffect(() => {
    const text = formData.name.toLowerCase();
    const qty = parseInt(formData.currentStock) || 0;

    // Si no hay stock suficiente o nombre, limpiamos la sugerencia
    if (qty <= 0 || !text) {
      setAiSuggestion(null);
      return;
    }

    // REGLA 1: CÁMARAS DE SEGURIDAD (La "Finta" Principal)
    if (text.includes('camara') || text.includes('cámara') || text.includes('cctv') || text.includes('hikvision')) {
      setAiSuggestion({
        type: 'blue',
        icon: <Sparkles size={18} />,
        title: 'Asistente de Instalación (CCTV)',
        message: `Para instalar ${qty} cámara(s), el sistema recomienda agregar al stock:`,
        items: [
          `• ${qty * 2} Conectores de video (Balun/BNC)`,
          `• ${qty} Fuentes de poder (12V 1A)`,
          `• ${qty * 20} Metros de cable UTP/Coaxial (Estimado)`,
          `• 1 DVR de ${qty <= 4 ? 4 : qty <= 8 ? 8 : 16} canales`
        ]
      });
      return;
    }

    // REGLA 2: IMPRESORAS (Venta Cruzada)
    if (text.includes('impresora') || text.includes('multifuncional') || text.includes('epson') || text.includes('canon')) {
      setAiSuggestion({
        type: 'orange',
        icon: <Lightbulb size={18} />,
        title: 'Recordatorio de Venta Cruzada',
        message: `Al ingresar ${qty} impresora(s), no olvides verificar existencias de:`,
        items: [
          `• ${qty} Kits de tintas o tóners de repuesto`,
          `• ${qty} Cables USB (si no vienen en caja)`,
          `• Resmas de papel A4`
        ]
      });
      return;
    }
    
    // Si no coincide con ninguna regla
    setAiSuggestion(null);

  }, [formData.name, formData.currentStock]);
  // --- FIN LÓGICA IA ---

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convertimos números
    onSave({
      ...formData,
      price: parseFloat(formData.price),
      currentStock: parseInt(formData.currentStock),
      minStock: 5 // Valor por defecto
    });
    
    // Limpiar estados
    setFormData({ name: '', category: '', price: '', currentStock: '', description: '' });
    setAiSuggestion(null);
    onClose(); 
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Botón Cerrar */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition">
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-[#1e1b4b]">Nuevo Producto</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Nombre del Producto</label>
            <input required type="text" className="w-full p-3 bg-gray-50 rounded-xl border focus:ring-2 focus:ring-blue-900 outline-none"
              placeholder="Ej: Cámara Hikvision 1080p..."
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Categoría</label>
              <select className="w-full p-3 bg-gray-50 rounded-xl border focus:ring-2 focus:ring-blue-900 outline-none"
                value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option value="">Seleccionar...</option>
                <option value="Electrónicos">Electrónicos</option>
                <option value="Periféricos">Periféricos</option>
                <option value="Accesorios">Accesorios</option>
                <option value="Muebles">Muebles</option>
                <option value="Seguridad">Seguridad</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Precio ($)</label>
              <input required type="number" step="0.01" className="w-full p-3 bg-gray-50 rounded-xl border focus:ring-2 focus:ring-blue-900 outline-none"
                value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Stock Inicial</label>
              <input required type="number" className="w-full p-3 bg-gray-50 rounded-xl border focus:ring-2 focus:ring-blue-900 outline-none"
                value={formData.currentStock} onChange={e => setFormData({...formData, currentStock: e.target.value})} />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-600 mb-1">Descripción Corta</label>
               <input type="text" className="w-full p-3 bg-gray-50 rounded-xl border focus:ring-2 focus:ring-blue-900 outline-none"
                value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>
          </div>

          {/* --- BLOQUE DE SUGERENCIA IA --- */}
          {aiSuggestion && (
            <div className={`mt-4 p-4 rounded-xl border animate-pulse transition-all duration-500 ease-in-out ${
              aiSuggestion.type === 'blue' 
                ? 'bg-blue-50 border-blue-200 text-blue-900' 
                : 'bg-orange-50 border-orange-200 text-orange-900'
            }`}>
              <div className="flex items-center gap-2 font-bold mb-2">
                {aiSuggestion.icon}
                {aiSuggestion.title}
              </div>
              <p className="text-sm mb-2 opacity-90">{aiSuggestion.message}</p>
              <ul className="text-sm space-y-1 ml-5 list-disc">
                {aiSuggestion.items.map((item, idx) => (
                  <li key={idx} className="font-medium opacity-80">{item.replace('• ', '')}</li>
                ))}
              </ul>
            </div>
          )}
          {/* --- FIN BLOQUE IA --- */}

          <button type="submit" className="w-full bg-[#1e1b4b] text-white py-3 rounded-xl font-bold hover:bg-blue-900 transition mt-4 shadow-lg">
            Guardar Producto
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;