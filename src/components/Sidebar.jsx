import React from 'react';

const Sidebar = () => {
  const menuItems = [
    { id: 1, label: 'Grupo Wong' },
    { id: 2, label: 'Grifos' },
    { id: 3, label: 'Minera' },
    { id: 4, label: 'Otros' },
    { id: 5, label: 'Otros' },
  ];

  return (
    // El "aside" fijo a la izquierda
    <aside className="w-28 h-screen fixed left-0 top-0 p-2 flex flex-col gap-4 bg-white z-50">
      
      {/* Contenedor Azul Oscuro (Cápsula) */}
      <div className="bg-dark-sidebar h-full rounded-2xl flex flex-col items-center py-4 gap-2 shadow-xl">
        
        {/* Items del menú */}
        {menuItems.map((item, index) => (
          <button 
            key={item.id}
            className={`
              w-20 py-3 text-xs font-medium text-white rounded-xl transition-all duration-200
              ${index === 0 ? 'bg-primary-blue shadow-lg ring-1 ring-white/20' : 'hover:bg-white/10'}
            `}
          >
            {item.label}
          </button>
        ))}

        {/* Espaciador flexible para empujar el botón "+" abajo si quisieras */}
        <div className="flex-1"></div>

        {/* Botón de agregar (+) */}
        <button className="w-12 h-12 bg-dark-btn rounded-xl text-white text-2xl flex items-center justify-center hover:bg-blue-900 transition mb-2">
          +
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;