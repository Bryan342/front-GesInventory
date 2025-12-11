import React, { useState } from 'react';
import { useMovements } from '../../hooks/useMovements';
import { Edit2, Sparkles, FileText, Clock } from 'lucide-react';
import NoteModal from './modals/NoteModal';
import ClientsListModal from './modals/ClientsListModal';
import EditMovementModal from './modals/EditMovementModal';
import SmartProjectModal from './modals/SmartProjectModal';
import QuotationPrintModal from './modals/QuotationPrintModal';

const MovementsTable = ({ onNavigateToClients }) => {
  const { movements: initialMovements, loading, updateMovement } = useMovements();
  const [localMovements, setLocalMovements] = useState([]);
  // Combinamos movimientos nuevos (IA) y antiguos (JSON)
  const displayMovements = [...localMovements, ...initialMovements];

  // Estados
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState({ text: '', title: '' });
  const [isClientsOpen, setIsClientsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingMov, setEditingMov] = useState(null);
  const [isSmartModalOpen, setIsSmartModalOpen] = useState(false);
  const [printData, setPrintData] = useState(null);

  // --- FUNCIÓN MAESTRA: Crear y Vincular ---
  const handleProjectCreate = (items, clientObj) => {
    // 1. Generar Código
    const code = `COT-${Math.floor(1000 + Math.random() * 9000)}`; 
    const dateFull = new Date();
    const dateStr = dateFull.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    const dateShort = dateFull.toISOString().split('T')[0];

    // 2. Crear Movimientos en Tabla (Visual)
    const newMovements = items.map((item, index) => ({
      id: `${code}-${index + 1}`,
      groupCode: code,
      date: dateStr,
      productId: item.id,
      productName: item.name,
      type: 'Pendiente', 
      quantity: item.qty,
      reason: 'Generado por IA', // Motivo técnico
      user: 'SISTEMA',
      notes: `Cliente Asignado: ${clientObj.name}`, // Nota detallada
      fullQuotationData: { 
        id: code, 
        client: clientObj.name, 
        date: dateStr,
        items: items,
        totalItems: items.reduce((acc, curr) => acc + curr.qty, 0)
      }
    }));

    setLocalMovements([...newMovements, ...localMovements]);

    // 3. ENVIAR A DOCUMENTOS DEL CLIENTE (Usando ID real)
    const newDoc = {
      code: code,
      type: 'COTIZACION',
      date: dateShort,
      fileName: `Cotizacion_${clientObj.name.replace(/\s+/g, '_')}.pdf`,
      companyId: clientObj.id, // <--- LA CLAVE: Usamos el ID del cliente real
      items: items
    };

    // Guardamos en LocalStorage
    const existingDocs = JSON.parse(localStorage.getItem('fake_generated_docs') || '[]');
    localStorage.setItem('fake_generated_docs', JSON.stringify([newDoc, ...existingDocs]));
    
    alert(`✅ Cotización ${code} generada para ${clientObj.name} y enviada a su carpeta.`);
  };

  const handleOpenDocument = (mov) => {
    if (mov.fullQuotationData) {
      setPrintData(mov.fullQuotationData);
    } else {
      setPrintData({
        id: mov.groupCode || 'DOC',
        client: 'Cliente General',
        date: mov.date,
        items: [{name: mov.productName, qty: mov.quantity}],
        totalItems: mov.quantity
      });
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-400">Cargando...</div>;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8 bg-white p-2 rounded-full border shadow-sm">
        <span className="ml-6 font-medium text-gray-600">Gestión de Inventario</span>
        <div className="flex gap-2"> 
          <button 
            onClick={() => setIsSmartModalOpen(true)}
            className="px-5 py-2 rounded-full text-white bg-gradient-to-r from-violet-600 to-indigo-600 font-bold hover:shadow-lg hover:scale-105 transition flex items-center gap-2 animate-pulse-slow"
          >
            <Sparkles size={16} /> cotizar
          </button>
          <button onClick={() => setIsClientsOpen(true)} className="px-6 py-2 rounded-full text-[#1e1b4b] font-bold hover:bg-gray-100 transition">Ver Reservas</button>
          <button onClick={onNavigateToClients} className="px-6 py-2 rounded-full text-[#1e1b4b] border-2 border-[#1e1b4b] font-bold hover:bg-blue-50 transition">+ Cliente</button>
        </div>
      </div>

      {/* Tabla */}
      <h3 className="text-gray-500 mb-4 text-sm font-medium">Movimientos ({displayMovements.length})</h3>
      <table className="w-full text-left">
        <thead>
          <tr className="text-black font-bold border-b border-gray-200 text-sm">
            <th className="pb-4">Fecha/Código</th>
            <th className="pb-4">Producto</th>
            <th className="pb-4">Estado</th>
            <th className="pb-4 text-center">Cant.</th>
            <th className="pb-4">Motivo</th>
            <th className="pb-4">Usuario</th>
            <th className="pb-4 text-right">Detalles / Doc</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-600">
          {displayMovements.map((mov) => (
            <tr key={mov.id} className={`border-b border-gray-100 h-16 transition-colors ${mov.type === 'Pendiente' ? 'bg-amber-50' : 'hover:bg-gray-50'}`}>
              
              <td className="py-3">
                 <div className="flex flex-col">
                   <span className="font-mono font-bold text-gray-800 text-xs">{mov.groupCode || mov.date.split(' ')[0]}</span>
                   <span className="text-[10px] text-gray-400">{mov.date.split(' ')[1] || ''}</span>
                 </div>
              </td>
              
              <td>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-800">{mov.productName}</span>
                  <span className="text-xs text-gray-400">{mov.productId}</span>
                </div>
              </td>
              
              <td>
                <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit ${
                  mov.type === 'Pendiente' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 
                  mov.type === 'Entrada' ? 'bg-[#1e1b4b] text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {mov.type === 'Pendiente' && <Clock size={12} />}
                  {mov.type.toUpperCase()}
                </span>
              </td>
              
              <td className="font-bold text-center text-lg">{mov.quantity}</td>
              
              {/* RESTAURADA COLUMNA MOTIVO */}
              <td>{mov.reason}</td>

              {/* RESTAURADA COLUMNA USUARIO */}
              <td className="text-xs uppercase font-bold text-gray-500">{mov.user}</td>
              
              {/* RESTAURADA COLUMNA NOTAS / ACCIONES */}
              <td className="text-right">
                <div className="flex items-center justify-end gap-2">
                   {(mov.type === 'Pendiente' || mov.type === 'Cotización') ? (
                     <button onClick={() => handleOpenDocument(mov)} className="flex items-center gap-1 px-3 py-1 bg-white border border-indigo-200 text-indigo-700 rounded-lg hover:bg-indigo-50 shadow-sm text-xs font-bold">
                       <FileText size={14}/> Ver Doc
                     </button>
                   ) : (
                     <button onClick={() => { setSelectedNote({text: mov.notes, title: mov.productName}); setIsNoteOpen(true); }} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-200">
                        Ver Nota
                     </button>
                   )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modales */}
      <NoteModal isOpen={isNoteOpen} onClose={() => setIsNoteOpen(false)} note={selectedNote.text} title={selectedNote.title} />
      <ClientsListModal isOpen={isClientsOpen} onClose={() => setIsClientsOpen(false)} />
      <EditMovementModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} movement={editingMov} onSave={updateMovement} />
      <SmartProjectModal isOpen={isSmartModalOpen} onClose={() => setIsSmartModalOpen(false)} onCreateProject={handleProjectCreate} />
      <QuotationPrintModal isOpen={!!printData} onClose={() => setPrintData(null)} data={printData} />
    </div>
  );
};

export default MovementsTable;