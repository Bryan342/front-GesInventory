import React, { useState } from 'react';
import { useMovements } from '../../hooks/useMovements';
import { Eye, Edit2, Image as ImageIcon } from 'lucide-react';
// Importamos los modales
import NoteModal from './modals/NoteModal';
import ClientsListModal from './modals/ClientsListModal';
import EditMovementModal from './modals/EditMovementModal';

const MovementsTable = ({ onNavigateToClients }) => {
  const { movements, loading, updateMovement } = useMovements();
  
  // Estados de Modales
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState({ text: '', title: '' });
  
  const [isClientsOpen, setIsClientsOpen] = useState(false);
  
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingMov, setEditingMov] = useState(null);

  if (loading) return <div className="p-10 text-center text-gray-400">Cargando movimientos...</div>;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 max-w-5xl mx-auto">
      
      {/* 1. BARRA SUPERIOR (Imagen 3) */}
      <div className="flex justify-between items-center mb-8 bg-white p-2 rounded-full border shadow-sm">
        <span className="ml-6 font-medium text-gray-600">Reserva de Clientes</span>
        <div className="flex gap-2">
          {/* Botón VISUALIZAR */}
          <button 
            onClick={() => setIsClientsOpen(true)}
            className="px-6 py-2 rounded-full text-white bg-[#1e1b4b] font-bold hover:bg-blue-900 transition"
          >
            Visualizar
          </button>
          
          {/* Botón AÑADIR CLIENTE (Navega a la otra vista) */}
          <button 
            onClick={onNavigateToClients} 
            className="px-6 py-2 rounded-full text-[#1e1b4b] border-2 border-[#1e1b4b] font-bold hover:bg-blue-50 transition"
          >
            + Añadir cliente
          </button>
        </div>
      </div>

      {/* 2. TABLA DE MOVIMIENTOS */}
      <h3 className="text-gray-500 mb-4 text-sm font-medium">Movimientos de Inventario</h3>
      <table className="w-full text-left">
        <thead>
          <tr className="text-black font-bold border-b border-gray-200 text-sm">
            <th className="pb-4">Fecha/Hora</th>
            <th className="pb-4">Producto</th>
            <th className="pb-4">Tipo</th>
            <th className="pb-4">Cantidad</th>
            <th className="pb-4">Motivo</th>
            <th className="pb-4">Usuario</th>
            <th className="pb-4 text-right">Notas</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-600">
          {movements.map((mov) => (
            <tr key={mov.id} className="border-b border-gray-100 hover:bg-gray-50 h-16">
              
              <td className="py-3 font-mono text-xs">{mov.date}</td>
              
              <td>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 font-bold text-gray-800">
                    {mov.productId}
                    <ImageIcon size={12} className="text-gray-400"/>
                  </div>
                  <span className="text-xs text-gray-500">{mov.productName}</span>
                </div>
              </td>
              
              <td>
                <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                  mov.type === 'Entrada' ? 'bg-[#1e1b4b]' : 'bg-gray-400'
                }`}>
                  {mov.type}
                </span>
              </td>
              
              <td className="font-bold text-center">{mov.quantity}</td>
              
              <td>{mov.reason}</td>
              
              <td className="text-xs uppercase">{mov.user}</td>
              
              <td className="text-right">
                <div className="flex items-center justify-end gap-2">
                  {/* EDITAR */}
                  <button 
                    onClick={() => { setEditingMov(mov); setIsEditOpen(true); }}
                    className="p-2 border rounded hover:bg-gray-100"
                  >
                    <Edit2 size={14}/>
                  </button>
                  
                  {/* VER NOTAS (Botón oscuro como la imagen) */}
                  <button 
                    onClick={() => { setSelectedNote({text: mov.notes, title: mov.productName}); setIsNoteOpen(true); }}
                    className="px-4 py-1 bg-[#1e1b4b] text-white rounded-lg text-xs font-bold hover:bg-blue-900"
                  >
                    Ver
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- MODALES --- */}
      <NoteModal 
        isOpen={isNoteOpen} 
        onClose={() => setIsNoteOpen(false)} 
        note={selectedNote.text} 
        title={selectedNote.title} 
      />

      <ClientsListModal 
        isOpen={isClientsOpen} 
        onClose={() => setIsClientsOpen(false)} 
      />

      <EditMovementModal 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        movement={editingMov}
        onSave={updateMovement}
      />
    </div>
  );
};

export default MovementsTable;