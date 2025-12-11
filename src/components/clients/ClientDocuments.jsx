import React, { useState, useEffect } from 'react';
import { FileText, Download, UploadCloud, Receipt, Truck, FileCheck, Eye, ClipboardList } from 'lucide-react';
import UploadDocumentModal from './UploadDocumentModal';
import initialDocumentsData from '../../data/documents.json';

const ClientDocuments = ({ selectedCompany }) => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [allDocuments, setAllDocuments] = useState(initialDocumentsData);

  // --- CARGAR DOCUMENTOS DE STORAGE ---
  useEffect(() => {
    const generatedDocs = JSON.parse(localStorage.getItem('fake_generated_docs') || '[]');
    // Fusionamos con los datos del JSON
    setAllDocuments([...generatedDocs, ...initialDocumentsData]);
  }, []); // Se ejecuta al montar

  // --- FILTRO: AHORA USAMOS EL ID EXACTO ---
  // Comparamos doc.companyId con selectedCompany.id (convirtiendo a String por seguridad)
  const companyDocuments = selectedCompany 
    ? allDocuments.filter(doc => String(doc.companyId) === String(selectedCompany.id)) 
    : [];

  const handleAddDocument = (newDocData) => {
    const newDoc = {
      id: allDocuments.length + 1,
      companyId: selectedCompany.id,
      code: newDocData.code,
      type: newDocData.type,
      date: newDocData.date,
      fileName: newDocData.fileName,
      notes: newDocData.notes
    };
    setAllDocuments([newDoc, ...allDocuments]);
  };

  const getIconByType = (type) => {
    switch (type) {
      case 'FACTURA': return <Receipt size={16} />;
      case 'GUIA': return <Truck size={16} />;
      case 'CONTRATO': return <FileCheck size={16} />;
      case 'COTIZACION': return <ClipboardList size={16} />;
      default: return <FileText size={16} />;
    }
  };

  if (!selectedCompany) return <div className="p-8 text-gray-400">Seleccione una empresa...</div>;

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 min-h-[500px] flex flex-col relative border border-gray-200 animate-fade-in">
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
              companyDocuments.map((doc, index) => (
                <tr key={index} className="border-b border-gray-50 hover:bg-gray-50 transition group">
                  <td className="py-4 pl-2 font-bold text-blue-900">{doc.code}</td>
                  <td className="py-4">
                      <div className="flex justify-center items-center gap-3">
                         <span className={`flex items-center gap-2 text-[10px] font-bold uppercase px-3 py-1 rounded-full border
                           ${doc.type === 'FACTURA' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                           ${doc.type === 'INFORME' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                           ${doc.type === 'COTIZACION' ? 'bg-purple-50 text-purple-700 border-purple-200' : ''} 
                         `}>
                           {getIconByType(doc.type)} {doc.type}
                         </span>
                         <span className="text-gray-400 truncate max-w-[150px]" title={doc.fileName}>{doc.fileName}</span>
                      </div>
                  </td>
                  <td className="py-4 text-right pr-2 font-mono flex justify-end items-center gap-3">
                    {doc.date}
                    <div className="opacity-0 group-hover:opacity-100 transition flex gap-1">
                      <button className="p-1 hover:bg-gray-100 rounded text-blue-600"><Eye size={16}/></button>
                      <button className="p-1 hover:bg-gray-100 rounded text-gray-600"><Download size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="3" className="text-center py-12 text-gray-300">No hay documentos registrados.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
        <button onClick={() => setIsUploadOpen(true)} className="bg-[#1e1b4b] text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-900 transition flex items-center gap-2"><UploadCloud size={20}/> Subir Nuevo Documento</button>
      </div>
      <UploadDocumentModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} onSave={handleAddDocument} companyName={selectedCompany.name} />
    </div>
  );
};

export default ClientDocuments;