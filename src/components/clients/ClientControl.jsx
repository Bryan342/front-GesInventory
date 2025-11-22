import React from 'react';

const ClientControl = () => {
  // --- MODELO (Datos Estáticos) ---
  // Esta estructura es la que tu Backend Java debería enviarte después.
  const mockData = [
    { 
      id: 1, 
      entrada: { label: 'INFORME', type: 'report' }, 
      hojaServicio: { label: 'Documento', type: 'doc' }, 
      ordenCompra: { label: 'Documento', type: 'doc' } 
    },
    // Puedes añadir más filas aquí para probar
  ];

  // --- CONTROLADOR (Lógica) ---
  // Aquí conectarás con Java después. Por ahora simulamos la acción.
  
  const handleView = (docType, id) => {
    console.log(`🔌 Conectar Backend: Visualizar ${docType} del ID ${id}`);
    // Ejemplo futuro: window.open(`http://localhost:8080/api/docs/view/${id}`)
  };

  const handleDownload = (docType, id) => {
    console.log(`🔌 Conectar Backend: Descargar ${docType} del ID ${id}`);
    // Ejemplo futuro: fetch(`http://localhost:8080/api/docs/download/${id}`)
  };

  const handleUpload = () => {
    console.log("🔌 Conectar Backend: Abrir modal de subida");
  };

  const handleEditPlan = () => {
    console.log("🔌 Conectar Backend: Editar Plan Contratado");
  };

  // --- VISTA (UI) ---
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 min-h-[500px] flex flex-col border border-gray-200 relative">
      
      {/* Cabecera (Igual que en Documentos, reutilizando estilos) */}
      <div className="flex justify-between items-start mb-8">
        <h2 className="text-3xl font-bold text-black">Grupo Wong</h2>
        <div className="flex items-center gap-2">
          <button className="bg-[#1e1b4b] text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-blue-900 transition">
            👁️ Plan Contratado
          </button>
          <button 
            onClick={handleEditPlan}
            className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 text-gray-500"
          >
            ✏️
          </button>
        </div>
      </div>

      {/* Tabla Específica de Control */}
      <div className="flex-1">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-gray-200 text-sm font-bold text-black uppercase tracking-wide">
              <th className="pb-3 w-1/3">EM Entrada de mercaderia</th>
              <th className="pb-3 w-1/3 text-center">Hoja de Servicio</th>
              <th className="pb-3 w-1/3 text-right pr-4">Orden De Compra</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((row) => (
              <tr key={row.id} className="border-b border-gray-300 text-gray-600 h-16">
                
                {/* Columna 1: Entrada de Mercadería */}
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleView('entrada', row.id)} className="hover:text-black transition font-medium text-xs flex items-center gap-1">
                      👁️ {row.entrada.label}
                    </button>
                    <button onClick={() => handleDownload('entrada', row.id)} className="text-gray-400 hover:text-black">
                      ↓
                    </button>
                  </div>
                </td>

                {/* Columna 2: Hoja de Servicio (Centrada) */}
                <td className="py-4">
                  <div className="flex items-center justify-center gap-4">
                    <span className="flex items-center gap-1 font-medium text-xs">
                      👁️ {row.hojaServicio.label}
                    </span>
                    <button onClick={() => handleDownload('hoja', row.id)} className="text-gray-400 hover:text-black">
                      ↓
                    </button>
                  </div>
                </td>

                {/* Columna 3: Orden de Compra (Alineada derecha) */}
                <td className="py-4">
                  <div className="flex items-center justify-end gap-4 pr-4">
                    <span className="flex items-center gap-1 font-medium text-xs">
                      👁️ {row.ordenCompra.label}
                    </span>
                    <button onClick={() => handleDownload('orden', row.id)} className="text-gray-400 hover:text-black">
                      ↓
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {/* Líneas vacías decorativas para dar el efecto de "cuaderno" de la imagen */}
            {[1, 2, 3].map((i) => (
              <tr key={`empty-${i}`} className="border-b border-gray-300 h-16">
                <td colSpan="3"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botón Flotante Inferior Derecha */}
      <div className="flex justify-end mt-8">
        <button 
          onClick={handleUpload}
          className="bg-[#110f2e] text-white px-8 py-3 rounded-full font-bold hover:bg-blue-900 transition shadow-lg"
        >
          Subir Documento
        </button>
      </div>
    </div>
  );
};

export default ClientControl;