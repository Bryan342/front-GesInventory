import React from 'react';

const Sidebar = ({ companies, selectedCompanyId, onSelectCompany, onAddClick }) => {
  return (
    <aside 
      className="w-32 fixed left-0 top-24 bottom-4 p-2 flex flex-col gap-4 bg-transparent z-30 font-sans"
    >
      {/* NOTA: 
         - 'top-24': Baja el sidebar para que no tape el Header ni el Logo.
         - 'bottom-4': Define la altura automáticamente hasta el final de la pantalla.
         - 'z-30': Asegura que esté en una capa inferior al Header y Logo.
      */}

      {/* Contenedor de la lista */}
      <div className="bg-[#0f172a] h-full rounded-2xl flex flex-col items-center py-4 gap-2 shadow-2xl overflow-hidden animate-slide-in-left">
        
        {/* ZONA LISTA (Empresas) */}
        <div className="flex-1 w-full overflow-y-auto no-scrollbar flex flex-col items-center gap-2">
          {companies.map((company) => {
            const isSelected = selectedCompanyId === company.id;
            return (
              <button 
                key={company.id}
                onClick={() => onSelectCompany(company.id)}
                className={`
                  w-24 py-3 px-1 text-xs font-medium text-white rounded-xl transition-all duration-200 break-words leading-tight shrink-0
                  ${isSelected ? 'bg-[#242055] shadow-lg ring-1 ring-white/20 scale-105 font-bold' : 'hover:bg-white/10 opacity-80 hover:opacity-100'}
                `}
              >
                {company.name}
              </button>
            );
          })}
        </div>

        {/* ZONA INFERIOR (Botón Más) */}
        <div className="shrink-0 w-full flex justify-center pt-2 border-t border-white/5">
          <button 
            onClick={onAddClick}
            className="w-12 h-12 bg-[#1e1b4b] rounded-xl text-white text-2xl flex items-center justify-center hover:bg-blue-900 transition shadow-lg border border-white/10"
          >
            +
          </button>
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;