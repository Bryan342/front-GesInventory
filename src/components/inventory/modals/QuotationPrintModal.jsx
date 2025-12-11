import React from 'react';
import { X, Printer, Download } from 'lucide-react';

const QuotationPrintModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  const { id, client, date, items, totalItems } = data;

  return (
    <div className="fixed inset-0 bg-black/70 z-[70] flex items-center justify-center backdrop-blur-md animate-fade-in">
      {/* Contenedor del Documento A4 */}
      <div className="bg-gray-100 p-4 rounded-xl max-h-[95vh] overflow-y-auto w-full max-w-3xl">
        
        {/* Barra de Herramientas Superior */}
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-white font-bold text-lg">Vista Previa de Documento</h2>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-200 font-bold text-sm">
              <Printer size={16} /> Imprimir
            </button>
            <button onClick={onClose} className="p-2 bg-white/10 text-white hover:bg-white/20 rounded-full transition">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* HOJA DE PAPEL (A4 Simulado) */}
        <div className="bg-white shadow-2xl w-full min-h-[800px] p-12 relative text-gray-800">
          
          {/* ENCABEZADO */}
          <div className="flex justify-between border-b-2 border-gray-800 pb-6 mb-8">
            <div>
              <div className="text-3xl font-extrabold text-[#1e1b4b] tracking-tight">MI EMPRESA S.A.C.</div>
              <div className="text-sm text-gray-500 mt-1">Av. La Tecnología 123, Oficina 404</div>
              <div className="text-sm text-gray-500">Lima, Perú | +51 999-999-999</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Cotización N°</div>
              <div className="text-4xl font-mono font-bold text-red-600">{id}</div>
              <div className="text-sm font-medium mt-1 text-gray-600">{date}</div>
            </div>
          </div>

          {/* DATOS DEL CLIENTE */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Cliente / Solicitante</h3>
            <div className="text-xl font-bold text-gray-800">{client}</div>
            <div className="text-sm text-gray-500">RUC / DNI: -</div>
          </div>

          {/* TABLA DE PRODUCTOS */}
          <table className="w-full mb-8">
            <thead className="bg-[#1e1b4b] text-white">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-bold uppercase">Descripción</th>
                <th className="py-3 px-4 text-center text-sm font-bold uppercase w-32">Cantidad</th>
                <th className="py-3 px-4 text-center text-sm font-bold uppercase w-32">Unidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-4 px-4">
                    <div className="font-bold text-gray-800">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.id}</div>
                  </td>
                  <td className="py-4 px-4 text-center font-mono text-lg font-medium">{item.qty}</td>
                  <td className="py-4 px-4 text-center text-sm text-gray-500">UND</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t-2 border-gray-800">
              <tr>
                <td className="pt-4 text-right font-bold text-gray-600">TOTAL ÍTEMS:</td>
                <td className="pt-4 text-center font-bold text-xl">{totalItems}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>

          {/* NOTAS Y FIRMA */}
          <div className="mt-16 grid grid-cols-2 gap-12">
            <div>
              <h4 className="font-bold text-sm mb-2">Condiciones:</h4>
              <ul className="text-xs text-gray-500 list-disc ml-4 space-y-1">
                <li>Precios sujetos a variación sin previo aviso.</li>
                <li>Validez de la oferta: 15 días.</li>
                <li>Tiempo de entrega: Inmediato (Sujeto a Stock).</li>
              </ul>
            </div>
            <div className="text-center mt-8">
              <div className="border-t border-gray-400 w-full mb-2"></div>
              <div className="text-xs font-bold text-gray-500 uppercase">Firma Autorizada</div>
            </div>
          </div>

          {/* Marca de agua de estado */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-gray-200 text-gray-100 text-8xl font-black rotate-[-30deg] pointer-events-none select-none uppercase opacity-50">
            PENDIENTE
          </div>

        </div>
      </div>
    </div>
  );
};

export default QuotationPrintModal;