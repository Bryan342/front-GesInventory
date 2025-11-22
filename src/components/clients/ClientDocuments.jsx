import React, { useState, useEffect } from 'react';
import { FileText, Download, UploadCloud, Receipt, Truck, FileCheck, Eye } from 'lucide-react';
import UploadDocumentModal from './UploadDocumentModal';

// Importamos los datos iniciales
import initialDocumentsData from '../../data/documents.json';

const ClientDocuments = ({ selectedCompany }) => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  
  // Estado global de documentos (simulando base de datos)
  const [allDocuments, setAllDocuments] = useState(initialDocumentsData);

  // 1. AGREGAR DOCUMENTO (Simulación)
  const handleAddDocument = (newDocData) => {
    const newId = allDocuments.length + 1;
    
    const newDoc = {
      id: newId,
      companyId: selectedCompany.id, // IMPORTANTE: Lo vinculamos a la empresa actual
      code: newDocData.code,         // Usamos el código manual del usuario
      type: newDocData.type,
      date: newDocData.date,
      fileName: newDocData.fileName, // Solo el nombre, no el archivo real
      notes: newDocData.notes
    };

    // Agregamos al estado "global"
    setAllDocuments([newDoc, ...allDocuments]);
  };

  // 2. FILTRAR (Solo mostrar documentos de esta empresa)
  // Si selectedCompany es null, array vacío. Si no, filtramos.
  const companyDocuments = selectedCompany 
    ? allDocuments.filter(doc => doc.companyId === selectedCompany.id) 
    : [];

  // Helper iconos
  const getIconByType = (type) => {
    switch (type) {
      case 'FACTURA': return <Receipt size={16} />;
      case 'GUIA': return <Truck size={16} />;
      case 'CONTRATO': return <FileCheck size={16} />;
      default: return <FileText size={16} />;
    }
  };

  if (!selectedCompany) return <div>Seleccione una empresa...</div>;

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 min-h-[500px] flex flex-col relative border border-gray-200 animate-fade-in">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-8 border-b pb-6 border-gray-100">
        <div>
            <h2 className="text-3xl font-bold text-black">{selectedCompany.name}</h2>
            <p className="text-gray-400 text-sm mt-1">ID: {selectedCompany.id} • RUC: {selectedCompany.ruc}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-[#1e1b4b] text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
            {selectedCompany.plan}
          </span>
        </div>
      </div>

      {/* Tabla */}
      <div className="flex-1">
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b pb-2">
              <th className="pb-3 w-1/3 pl-2">Código Documento</th>
              <th className="pb-3 w-1/3 text-center">Tipo / Archivo</th>
              <th className="pb-3 w-1/3 text-right pr-2">Fecha Emisión</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {companyDocuments.length > 0 ? (
              companyDocuments.map((doc) => (
                <tr key={doc.id} className="border-b border-gray-50 hover:bg-gray-50 transition group">
                  
                  {/* CÓDIGO (Manual) */}
                  <td className="py-4 pl-2 font-bold text-blue-900">{doc.code}</td>
                  
                  {/* TIPO Y NOMBRE */}
                  <td className="py-4">
                     <div className="flex justify-center items-center gap-3">
                        <span className={`
                          flex items-center gap-2 text-[10px] font-bold uppercase px-3 py-1 rounded-full border
                          ${doc.type === 'FACTURA' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                          ${doc.type === 'INFORME' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                          ${doc.type === 'GUIA' ? 'bg-orange-50 text-orange-700 border-orange-200' : ''}
                        `}>
                          {getIconByType(doc.type)} {doc.type}
                        </span>
                        {/* Nombre del archivo (simulado) */}
                        <span className="text-gray-400 truncate max-w-[100px]" title={doc.fileName}>
                          {doc.fileName}
                        </span>
                     </div>
                  </td>
                  
                  {/* FECHA Y ACCIONES */}
                  <td className="py-4 text-right pr-2 font-mono flex justify-end items-center gap-3">
                    {doc.date}
                    <div className="opacity-0 group-hover:opacity-100 transition flex gap-1">
                      <button className="p-1 hover:bg-gray-100 rounded text-blue-600" title="Ver Detalle"><Eye size={16}/></button>
                      <button className="p-1 hover:bg-gray-100 rounded text-gray-600" title="Descargar"><Download size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-12">
                  <div className="flex flex-col items-center text-gray-300">
                    <UploadCloud size={48} className="mb-2 opacity-50"/>
                    <p>No hay documentos registrados.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Botón */}
      <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
        <button 
            onClick={() => setIsUploadOpen(true)}
            className="bg-[#1e1b4b] text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-900 transition shadow-lg flex items-center gap-2 active:scale-95"
        >
          <UploadCloud size={20}/>
          Subir Nuevo Documento
        </button>
      </div>

      <UploadDocumentModal 
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSave={handleAddDocument}
        companyName={selectedCompany.name}
      />
    </div>
  );
};

export default ClientDocuments;