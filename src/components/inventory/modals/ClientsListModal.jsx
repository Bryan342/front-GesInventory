import React, { useState, useEffect } from 'react';
import { X, Search, FileText, Calendar, User, ArrowRight, Printer } from 'lucide-react';
import QuotationPrintModal from './QuotationPrintModal'; // Reutilizamos el visor de PDF

const ClientsListModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reservations, setReservations] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);

  // --- CARGAR LAS COTIZACIONES GENERADAS ---
  useEffect(() => {
    if (isOpen) {
      // Leemos las cotizaciones que guardó la IA
      const storedDocs = JSON.parse(localStorage.getItem('fake_generated_docs') || '[]');
      // Filtramos solo las que son de tipo COTIZACION
      const quotes = storedDocs.filter(d => d.type === 'COTIZACION');
      setReservations(quotes);
    }
  }, [isOpen]);

  // Filtrado por buscador
  const filteredList = reservations.filter(r => 
    r.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center backdrop-blur-sm animate-fade-in">
        <div className="bg-white rounded-3xl p-8 w-full max-w-4xl shadow-2xl relative h-[80vh] flex flex-col">
          
          {/* Header */}
          <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition"><X size={20}/></button>
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#1e1b4b]">Reserva de Clientes</h2>
            <p className="text-gray-500 text-sm">Bandeja de cotizaciones y pedidos pendientes de atención.</p>
          </div>

          {/* Buscador */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20}/>
            <input 
              type="text" 
              placeholder="Buscar por cliente o código de cotización..." 
              className="w-full pl-12 p-3 bg-gray-50 rounded-xl border focus:ring-2 focus:ring-indigo-900 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* TABLA DE RESERVAS (DOCUMENTOS) */}
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-white z-10 shadow-sm">
                <tr className="text-xs font-bold text-gray-500 uppercase border-b border-gray-200">
                  <th className="pb-3 pl-4">Código</th>
                  <th className="pb-3">Cliente</th>
                  <th className="pb-3">Fecha</th>
                  <th className="pb-3 text-center">Ítems</th>
                  <th className="pb-3 text-center">Estado</th>
                  <th className="pb-3 text-right pr-4">Acción</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-600">
                {filteredList.length > 0 ? (
                  filteredList.map((res, idx) => (
                    <tr key={idx} className="border-b border-gray-50 hover:bg-indigo-50/30 transition h-16 group">
                      
                      {/* CÓDIGO */}
                      <td className="pl-4">
                        <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100">
                          {res.code}
                        </span>
                      </td>

                      {/* CLIENTE */}
                      <td>
                        <div className="flex items-center gap-2 font-bold text-gray-800">
                          <User size={16} className="text-gray-400"/>
                          {res.companyName}
                        </div>
                      </td>

                      {/* FECHA */}
                      <td>
                        <div className="flex items-center gap-2 text-xs">
                          <Calendar size={14} className="text-gray-400"/>
                          {res.date}
                        </div>
                      </td>

                      {/* ÍTEMS */}
                      <td className="text-center font-medium">
                        {res.items.length} prod.
                      </td>

                      {/* ESTADO */}
                      <td className="text-center">
                        <span className="bg-yellow-100 text-yellow-700 border border-yellow-200 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                          PENDIENTE
                        </span>
                      </td>

                      {/* ACCIÓN */}
                      <td className="text-right pr-4">
                        <button 
                          onClick={() => setSelectedDoc({
                            id: res.code,
                            client: res.companyName,
                            date: res.date,
                            items: res.items,
                            totalItems: res.items.length
                          })}
                          className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-indigo-600 hover:text-white hover:border-transparent transition shadow-sm font-bold text-xs flex items-center gap-2 ml-auto"
                        >
                          <FileText size={14}/> Ver Cotización
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-20">
                      <div className="flex flex-col items-center opacity-40">
                        <FileText size={48} className="mb-2"/>
                        <p>No hay reservas generadas aún.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
            <div className="text-xs text-gray-400">
              Mostrando {filteredList.length} registros
            </div>
          </div>

        </div>
      </div>

      {/* VISOR DE DOCUMENTO (Al dar click en "Ver Cotización") */}
      <QuotationPrintModal 
        isOpen={!!selectedDoc} 
        onClose={() => setSelectedDoc(null)} 
        data={selectedDoc} 
      />
    </>
  );
};

export default ClientsListModal;