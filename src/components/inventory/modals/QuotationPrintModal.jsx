import React from 'react';
import { X, Printer, ShieldCheck, MapPin, Phone, Mail, User } from 'lucide-react';
import logo from '../../../assets/logo.png';

const QuotationPrintModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  const { 
    id = 'BORRADOR', 
    client = 'Cliente General', 
    date = new Date().toLocaleDateString(), 
    items = [], 
    totalItems = 0 
  } = data;

  return (
    <div className="fixed inset-0 bg-black/80 z-[70] flex items-center justify-center backdrop-blur-sm p-4 animate-fade-in">
      
      <div className="bg-gray-200 w-full max-w-3xl max-h-[95vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        
        <div className="bg-[#1e1b4b] text-white p-4 flex justify-between items-center shrink-0">
          <span className="font-bold text-lg">Vista Previa</span>
          <div className="flex items-center gap-3">
            <button onClick={() => window.print()} className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white text-[#1e1b4b] rounded-lg hover:bg-gray-100 font-bold text-sm transition">
              <Printer size={16} /> Imprimir
            </button>
            <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-4 sm:p-8 flex-1 custom-scrollbar">
          {/* --- HOJA DE PAPEL --- */}
          {/* 'relative' y 'overflow-hidden' son claves para que el fondo no se salga */}
          <div className="bg-white shadow-xl mx-auto w-full max-w-[21cm] min-h-[29.7cm] p-8 sm:p-12 relative text-gray-800 flex flex-col overflow-hidden">
            
            {/* --- MARCA DE AGUA (FONDO) --- */}
            {/* z-0 para que esté detrás de todo. pointer-events-none para poder clickear el texto encima */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
               {/* Círculo Azul Arriba Derecha */}
               <div className="absolute top-[-10%] right-[-20%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[80px]"></div>
               {/* Círculo Índigo Abajo Izquierda */}
               <div className="absolute bottom-[-10%] left-[-20%] w-[400px] h-[400px] bg-indigo-100/50 rounded-full blur-[80px]"></div>
               {/* Logo gigante central muy transparente (Opcional, queda muy pro) */}
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
                  <img src={logo} alt="" className="w-96 grayscale" />
               </div>
            </div>

            {/* --- CONTENIDO DEL DOCUMENTO (z-10 para estar encima del fondo) --- */}
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex flex-col sm:flex-row justify-between border-b-4 border-[#1e1b4b] pb-6 mb-8 gap-6">
                  <div className="flex items-start gap-5">
                    <div className="w-24 h-24 flex items-center justify-center bg-white rounded-xl shadow-sm border border-gray-100">
                      <img src={logo} alt="Logo" className="w-full h-full object-contain p-2" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-black text-[#1e1b4b] tracking-wide leading-none">JORDY SECURITY</h1>
                      <p className="text-sm font-bold text-gray-500 mt-1 tracking-wider">SOLUCIONES EN SEGURIDAD</p>
                      <div className="mt-4 space-y-1 text-xs text-gray-500 font-medium">
                        <div className="flex items-center gap-2"><MapPin size={12}/> Av. La Paz 123, Ventanilla</div>
                        <div className="flex items-center gap-2"><Phone size={12}/> +51 999 888 777</div>
                        <div className="flex items-center gap-2"><Mail size={12}/> ventas@jordysecurity.com</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right sm:w-1/3">
                    <div className="border-2 border-dashed border-gray-300 p-4 rounded-xl bg-white/50 backdrop-blur-sm">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">COTIZACIÓN</div>
                      <div className="text-xl font-mono font-bold text-red-600 truncate">{id}</div>
                      <div className="text-sm font-bold text-gray-800 mt-2">{date}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50/60 backdrop-blur-sm p-6 rounded-xl mb-8 border border-blue-100">
                  <h3 className="text-xs font-bold text-[#1e1b4b] uppercase mb-2 flex items-center gap-2">
                    <User size={14}/> Cliente / Solicitante
                  </h3>
                  <div className="text-xl font-bold text-gray-900">{client}</div>
                </div>

                <div className="flex-1">
                  <table className="w-full mb-8 border-collapse">
                    <thead>
                      <tr className="bg-[#1e1b4b] text-white">
                        <th className="py-3 px-4 text-left text-xs font-bold uppercase rounded-tl-lg">Descripción</th>
                        <th className="py-3 px-4 text-center text-xs font-bold uppercase w-24">Cant.</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white/50">
                      {items.length > 0 ? (
                        items.map((item, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-white/80' : 'bg-gray-50/50'}>
                            <td className="py-3 px-4">
                              <div className="font-bold text-gray-800 text-sm">{item.name || 'Producto sin nombre'}</div>
                              <div className="text-[10px] text-gray-400 font-mono mt-0.5">{item.id}</div>
                            </td>
                            <td className="py-3 px-4 text-center font-bold text-gray-800">{item.qty}</td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="2" className="py-4 text-center text-gray-400 text-sm">Sin ítems</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="mt-auto border-t-2 border-gray-100 pt-8 flex justify-between items-end">
                  <div>
                    <h4 className="font-bold text-xs text-[#1e1b4b] mb-1">CONDICIONES:</h4>
                    <p className="text-[10px] text-gray-500">Validez: 15 días • Precios inc. IGV</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-gray-800">JORDY SECURITY S.A.C.</div>
                  </div>
                </div>
            </div> {/* Fin Contenido Relative */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationPrintModal;