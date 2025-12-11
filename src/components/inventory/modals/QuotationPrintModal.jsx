import React from 'react';
import { X, Printer, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';

const QuotationPrintModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  const { id, client, date, items, totalItems } = data;

  return (
    <div className="fixed inset-0 bg-black/80 z-[70] flex items-center justify-center backdrop-blur-sm p-4 animate-fade-in">
      
      {/* CONTENEDOR PRINCIPAL (Se adapta a la pantalla) */}
      <div className="bg-gray-200 w-full max-w-3xl max-h-[95vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        
        {/* BARRA DE HERRAMIENTAS (Superior) */}
        <div className="bg-[#1e1b4b] text-white p-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">Vista Previa de Impresión</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.print()} // Finta de impresión
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white text-[#1e1b4b] rounded-lg hover:bg-gray-100 font-bold text-sm transition"
            >
              <Printer size={16} /> Imprimir
            </button>
            <button 
              onClick={onClose} 
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* ZONA DE SCROLL (Para ver todo el documento) */}
        <div className="overflow-y-auto p-4 sm:p-8 flex-1 custom-scrollbar">
          
          {/* HOJA DE PAPEL (A4 Simulado) */}
          <div className="bg-white shadow-xl mx-auto w-full max-w-[21cm] min-h-[29.7cm] p-8 sm:p-12 relative text-gray-800 flex flex-col">
            
            {/* 1. ENCABEZADO CORPORATIVO */}
            <div className="flex flex-col sm:flex-row justify-between border-b-4 border-[#1e1b4b] pb-6 mb-8 gap-6">
              
              {/* Logo y Empresa */}
              <div className="flex items-start gap-4">
                <div className="bg-[#1e1b4b] p-3 rounded-xl text-white">
                  <ShieldCheck size={40} />
                </div>
                <div>
                  <h1 className="text-3xl font-black text-[#1e1b4b] tracking-wide leading-none">JORDY SECURITY</h1>
                  <p className="text-sm font-bold text-gray-500 mt-1 tracking-wider">SOLUCIONES EN SEGURIDAD ELECTRÓNICA</p>
                  
                  <div className="mt-4 space-y-1 text-xs text-gray-500 font-medium">
                    <div className="flex items-center gap-2"><MapPin size={12}/> Av. La Paz 123, Ventanilla - Callao</div>
                    <div className="flex items-center gap-2"><Phone size={12}/> +51 999 888 777</div>
                    <div className="flex items-center gap-2"><Mail size={12}/> ventas@jordysecurity.com</div>
                  </div>
                </div>
              </div>

              {/* Datos del Documento */}
              <div className="text-right sm:w-1/3">
                <div className="border-2 border-dashed border-gray-300 p-4 rounded-xl bg-gray-50">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">COTIZACIÓN N°</div>
                  <div className="text-2xl font-mono font-bold text-red-600">{id}</div>
                  <div className="w-full h-px bg-gray-300 my-2"></div>
                  <div className="text-xs font-bold text-gray-400 uppercase">FECHA</div>
                  <div className="text-sm font-bold text-gray-800">{date}</div>
                </div>
              </div>
            </div>

            {/* 2. DATOS DEL CLIENTE */}
            <div className="bg-blue-50/50 p-6 rounded-xl mb-8 border border-blue-100">
              <h3 className="text-xs font-bold text-[#1e1b4b] uppercase mb-2 flex items-center gap-2">
                <User size={14}/> Cliente / Solicitante
              </h3>
              <div className="text-xl font-bold text-gray-900">{client}</div>
              <div className="text-sm text-gray-500 mt-1">RUC: 20XXXXXXXXX | Dirección: -</div>
            </div>

            {/* 3. TABLA DE PRODUCTOS */}
            <div className="flex-1">
              <table className="w-full mb-8 border-collapse">
                <thead>
                  <tr className="bg-[#1e1b4b] text-white">
                    <th className="py-3 px-4 text-left text-xs font-bold uppercase rounded-tl-lg">Ítem / Descripción</th>
                    <th className="py-3 px-4 text-center text-xs font-bold uppercase w-24">Cant.</th>
                    <th className="py-3 px-4 text-center text-xs font-bold uppercase w-24 rounded-tr-lg">Unid.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <td className="py-3 px-4">
                        <div className="font-bold text-gray-800 text-sm">{item.name}</div>
                        <div className="text-[10px] text-gray-400 font-mono mt-0.5">{item.id}</div>
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-gray-800">{item.qty}</td>
                      <td className="py-3 px-4 text-center text-xs text-gray-500">UND</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 4. TOTALES */}
            <div className="flex justify-end mb-12">
              <div className="w-48">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Total Ítems:</span>
                  <span className="font-bold text-gray-800">{totalItems}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="font-bold text-[#1e1b4b] text-lg">TOTAL:</span>
                  <span className="font-bold text-[#1e1b4b] text-lg">S/. -.--</span>
                </div>
                <p className="text-[10px] text-gray-400 text-right italic">*Precios incluyen IGV</p>
              </div>
            </div>

            {/* 5. PIE DE PÁGINA (Términos) */}
            <div className="mt-auto border-t-2 border-gray-100 pt-8 grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-xs text-[#1e1b4b] mb-2 uppercase">Condiciones Comerciales:</h4>
                <ul className="text-[10px] text-gray-500 list-disc ml-4 space-y-1">
                  <li>Validez de la oferta: 15 días calendario.</li>
                  <li>Forma de pago: 50% Adelanto, 50% contra entrega.</li>
                  <li>Tiempo de entrega: Inmediato (Sujeto a Stock).</li>
                  <li>Garantía: 12 Meses por defectos de fábrica.</li>
                </ul>
              </div>
              <div className="flex flex-col items-center justify-end">
                <div className="h-16 w-32 border-b border-gray-800 mb-2"></div>
                <div className="text-xs font-bold text-gray-800">JORDY SECURITY S.A.C.</div>
                <div className="text-[10px] text-gray-500">Área de Ventas</div>
              </div>
            </div>

          </div>
        </div>

        {/* BOTÓN MÓVIL (Solo visible en pantallas chicas) */}
        <div className="p-4 bg-white border-t border-gray-200 sm:hidden">
          <button 
            onClick={onClose} 
            className="w-full bg-[#1e1b4b] text-white py-3 rounded-xl font-bold"
          >
            Cerrar Vista Previa
          </button>
        </div>

      </div>
    </div>
  );
};

export default QuotationPrintModal;