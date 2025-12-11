import React, { useState, useEffect } from 'react';
import { X, Sparkles, Box, FileText, User, CheckCircle2, Search, CheckSquare, Square } from 'lucide-react';
// IMPORTANTE: Importamos tus datos reales
import productsData from '../../../data/products.json';
import clientsData from '../../../data/clients_vip.json'; // <--- TUS CLIENTES REALES

const SmartProjectModal = ({ isOpen, onClose, onCreateProject }) => {
  const [projectText, setProjectText] = useState('');
  const [selectedClientId, setSelectedClientId] = useState('');
  const [analysis, setAnalysis] = useState(null);

  // --- BUSCADOR DE PRODUCTOS ---
  const findInInventory = (keyword) => {
    const term = keyword.toLowerCase();
    return productsData.find(p => 
      p.name.toLowerCase().includes(term) || 
      p.description.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    );
  };

  // --- CEREBRO IA ---
  useEffect(() => {
    if (!projectText) {
      setAnalysis(null);
      return;
    }

    const text = projectText.toLowerCase();
    const match = text.match(/(\d+)\s+(.+)/);
    
    if (match) {
      const qty = parseInt(match[1]);
      const productType = match[2].trim();

      let rawItems = [];
      let message = "";
      let type = "generic";
      
      const realProduct = findInInventory(productType);

      // 1. CASO CÁMARAS (Finta PRO)
      if (productType.includes('cámara') || productType.includes('camara') || productType.includes('cctv')) {
        type = 'complex';
        message = '🤖 Accesorios de instalación calculados automáticamente.';
        rawItems = [
          { id: 'CCTV001', name: 'Cámara Bullet IP66 Hikvision', qty: qty, stock: 50, found: true },
          { id: 'CCTV002', name: 'Video Balun (Par)', qty: qty, stock: 200, found: true },
          { id: 'CCTV003', name: 'Fuente de Poder 12V', qty: qty, stock: 45, found: true },
          { id: 'CCTV004', name: 'Cable UTP Cat6 (mts)', qty: qty * 20, stock: 500, found: true }
        ];
      } 
      // 2. CASO ENCONTRADO REAL
      else if (realProduct) {
        type = 'verified';
        const hasStock = realProduct.currentStock >= qty;
        message = hasStock 
          ? `✅ Producto en almacén. Stock: ${realProduct.currentStock}`
          : `⚠️ Stock bajo (${realProduct.currentStock} disponibles).`;

        rawItems = [
          { id: realProduct.id, name: realProduct.name, qty: qty, reason: 'Solicitud', stock: realProduct.currentStock, found: true }
        ];
        
        if (realProduct.category === 'Electrónicos' || realProduct.name.includes('Laptop')) {
             message += " (Sugerencias agregadas)";
             rawItems.push({ id: 'PROD003', name: 'Mouse Logitech G203', qty: qty, reason: 'Sugerencia', stock: 12, found: true });
        }
      }
      // 3. CASO GENÉRICO
      else {
        type = 'simple';
        message = 'ℹ️ Producto nuevo (No catalogado).';
        const productName = productType.charAt(0).toUpperCase() + productType.slice(1);
        rawItems = [
          { id: `GEN-${Date.now()}`, name: `${productName} (Genérico)`, qty: qty, reason: 'Manual', stock: 0, found: false }
        ];
      }

      const itemsWithSelection = rawItems.map(item => ({ ...item, selected: true }));

      setAnalysis({
        title: realProduct ? `Cotización: ${realProduct.name}` : `Requerimiento: ${productType}`,
        items: itemsWithSelection,
        message,
        type
      });
    } else {
      setAnalysis(null);
    }
  }, [projectText]);

  // --- CHECKBOX TOGGLE ---
  const toggleItem = (index) => {
    if (!analysis) return;
    const newItems = [...analysis.items];
    newItems[index].selected = !newItems[index].selected;
    setAnalysis({ ...analysis, items: newItems });
  };

  const handleProcess = () => {
    const itemsToSend = analysis.items.filter(i => i.selected);
    
    if (itemsToSend.length > 0 && selectedClientId) {
      // BUSCAMOS EL CLIENTE COMPLETO EN EL JSON
      const fullClient = clientsData.find(c => c.id.toString() === selectedClientId.toString());
      
      if (fullClient) {
        onCreateProject(itemsToSend, fullClient); // Pasamos el objeto completo
        onClose();
        setProjectText('');
        setAnalysis(null);
        setSelectedClientId('');
      }
    }
  };

  const selectedCount = analysis ? analysis.items.filter(i => i.selected).length : 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-8 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-100 rounded-full text-indigo-700"><Sparkles size={24} /></div>
          <div>
            <h2 className="text-2xl font-bold text-[#1e1b4b]">Asistente de Cotizaciones</h2>
            <p className="text-gray-500 text-sm">Selecciona ítems y asigna un cliente registrado.</p>
          </div>
        </div>

        <div className="mb-4 relative">
          <label className="block text-sm font-bold text-gray-700 mb-2">¿Qué necesita el cliente?</label>
          <textarea 
            className="w-full p-4 pl-12 bg-gray-50 rounded-2xl border-2 border-indigo-100 focus:border-indigo-500 outline-none text-lg resize-none h-20 transition-all"
            placeholder="Ej: 4 camaras... o 2 monitores..."
            value={projectText}
            onChange={(e) => setProjectText(e.target.value)}
            autoFocus
          />
          <Search className="absolute left-4 top-9 text-gray-400" size={20}/>
        </div>

        {analysis && (
          <div className={`mb-4 rounded-2xl p-5 border animate-slide-up transition-colors ${
             analysis.type === 'verified' ? 'bg-green-50 border-green-200' : 
             analysis.type === 'complex' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className={`font-bold flex items-center gap-2 ${analysis.type === 'verified' ? 'text-green-800' : 'text-blue-900'}`}>
                  {analysis.type === 'verified' ? <CheckCircle2 size={18}/> : <Box size={18}/>} 
                  {analysis.title}
                </h3>
                <p className="text-xs mt-1 font-medium opacity-80">{analysis.message}</p>
              </div>
            </div>
            <div className="bg-white/60 rounded-xl overflow-hidden border border-gray-100">
              {analysis.items.map((item, idx) => (
                <div key={idx} onClick={() => toggleItem(idx)} className={`flex justify-between items-center p-3 border-b last:border-0 cursor-pointer transition-colors ${item.selected ? 'bg-white hover:bg-indigo-50/30' : 'bg-gray-100 opacity-60'}`}>
                  <div className="flex items-center gap-3">
                     <div className={`text-indigo-600 transition-transform ${item.selected ? 'scale-100' : 'scale-90 opacity-50'}`}>
                        {item.selected ? <CheckSquare size={20} fill="#e0e7ff" /> : <Square size={20} className="text-gray-400"/>}
                     </div>
                     <div className={!item.selected ? 'line-through text-gray-400' : ''}>
                        <div className="font-medium text-sm text-gray-800">{item.name}</div>
                        {item.found && <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 rounded">Stock: {item.stock}</span>}
                     </div>
                  </div>
                  <div className="text-right"><div className={`font-mono font-bold ${item.selected ? 'text-indigo-900' : 'text-gray-400'}`}>x{item.qty}</div></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SELECTOR CON DATOS REALES DE CLIENTS_VIP.JSON */}
        {analysis && selectedCount > 0 && (
          <div className="mb-6 animate-fade-in">
            <label className="block text-sm font-bold text-gray-700 mb-2">Asignar a Cliente</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20}/>
              <select 
                className="w-full p-3 pl-10 bg-white rounded-xl border border-gray-300 focus:border-indigo-500 outline-none"
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(e.target.value)}
              >
                <option value="">-- Seleccionar Cliente --</option>
                {clientsData.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button onClick={onClose} className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100">Cancelar</button>
          <button 
            onClick={handleProcess}
            disabled={!analysis || !selectedClientId || selectedCount === 0}
            className={`px-8 py-3 rounded-xl font-bold text-white flex items-center gap-2 transition-all transform hover:scale-105 ${
              analysis && selectedClientId && selectedCount > 0 ? 'bg-[#1e1b4b] shadow-lg shadow-indigo-200' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            <FileText size={18} /> {selectedCount > 0 ? `Generar (${selectedCount})` : 'Generar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmartProjectModal;