import React from 'react';

// Ahora recibe props: la lista de empresas, cuál está seleccionada y la función para cambiar
const Sidebar = ({ companies, selectedCompanyId, onSelectCompany, onAddClick }) => {
  
  return (
    <aside className="w-32 h-screen fixed left-0 top-0 p-2 flex flex-col gap-4 bg-transparent z-50 font-sans">
      {/* Contenedor Azul Oscuro */}
      <div className="bg-[#0f172a] h-full rounded-2xl flex flex-col items-center py-4 gap-2 shadow-2xl overflow-y-auto no-scrollbar">
        
        {/* Mapeamos las empresas dinámicamente */}
        {companies.map((company) => {
          const isSelected = selectedCompanyId === company.id;
          return (
            <button 
              key={company.id}
              onClick={() => onSelectCompany(company.id)}
              className={`
                w-24 py-3 px-1 text-xs font-medium text-white rounded-xl transition-all duration-200 break-words leading-tight
                ${isSelected ? 'bg-[#242055] shadow-lg ring-1 ring-white/20 scale-105 font-bold' : 'hover:bg-white/10 opacity-80 hover:opacity-100'}
              `}
            >
              {company.name}
            </button>
          );
        })}

        {/* Espaciador */}
        <div className="flex-1"></div>

        {/* Botón + (Opcional, también puede agregar desde Planes) */}
        <button 
          onClick={onAddClick}
          className="w-12 h-12 bg-[#1e1b4b] rounded-xl text-white text-2xl flex items-center justify-center hover:bg-blue-900 transition mb-2 shadow-lg border border-white/10"
        >
          +
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;