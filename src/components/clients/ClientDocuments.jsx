import React from 'react';

// VISTA: Solo muestra datos y botones
const ClientDocuments = () => {
  // MODELO (Datos falsos locales para este componente)
  const documents = [
    { id: 'C001-0001', type: 'INFORME', hasInvoice: true, hasGuide: true, date: '22-11-2025' },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 min-h-[500px] flex flex-col relative border border-gray-200">
      
      {/* Cabecera de la Tarjeta */}
      <div className="flex justify-between items-start mb-8">
        <h2 className="text-3xl font-bold text-black">Grupo Wong</h2>
        <div className="flex items-center gap-2">
          <span className="bg-[#1e1b4b] text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
            👁️ Plan Contratado
          </span>
          <button className="p-1 border rounded hover:bg-gray-100">📝</button>
        </div>
      </div>

      {/* Tabla de Documentos */}
      <div className="flex-1">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-gray-100 text-lg font-bold text-gray-800">
              <th className="pb-2 w-1/4">Código</th>
              <th className="pb-2 w-1/2 text-center">Informe</th>
              <th className="pb-2 w-1/4 text-right">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id} className="border-b border-gray-100 text-gray-600">
                <td className="py-4 font-medium">{doc.id}</td>
                <td className="py-4 flex justify-center gap-6 text-xs font-bold text-gray-700 uppercase tracking-wide">
                  <span className="flex items-center gap-1 cursor-pointer hover:text-blue-800">👁️ INFORME</span>
                  <span className="flex items-center gap-1 cursor-pointer hover:text-blue-800">👁️ FACTURA</span>
                  <span className="flex items-center gap-1 cursor-pointer hover:text-blue-800">👁️ GUIA DE REMISION</span>
                </td>
                <td className="py-4 text-right font-mono">{doc.date}</td>
              </tr>
            ))}
            {/* Líneas vacías decorativas para igualar la imagen */}
            {[1, 2, 3].map((i) => (
              <tr key={i} className="border-b border-gray-100 h-12">
                <td colSpan="3"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botones Inferiores */}
      <div className="flex justify-between gap-4 mt-6">
        <button className="bg-[#110f2e] text-white px-8 py-3 rounded-full font-bold hover:bg-blue-900 transition w-1/3">
          Subir Documento
        </button>
        <button className="bg-[#110f2e] text-white px-8 py-3 rounded-full font-bold hover:bg-blue-900 transition w-1/3">
          Emitir Factura
        </button>
        <button className="bg-[#110f2e] text-white px-8 py-3 rounded-full font-bold hover:bg-blue-900 transition w-1/3">
          Guia de remision
        </button>
      </div>
    </div>
  );
};

export default ClientDocuments;