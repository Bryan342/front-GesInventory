import React from 'react';
import { Package, ArrowRightLeft, BarChart3, FileText, FolderOpen, ClipboardCheck } from 'lucide-react';

const AnimatedTabs = ({ tabs, activeTab, onTabChange }) => {
  const activeIndex = tabs.indexOf(activeTab);
  const translateVal = activeIndex * 100;

  const iconMap = {
    'Productos': Package,
    'Movimientos': ArrowRightLeft,
    'Reportes': BarChart3,
    'Planes': FileText,
    'Documentos': FolderOpen,
    'Control': ClipboardCheck
  };

  return (
    <div className="relative bg-gray-200/80 p-1 rounded-full w-full max-w-4xl mx-auto grid grid-cols-3 isolate">
      {/* Fondo blanco deslizante */}
      <div 
        className="absolute top-1 bottom-1 left-1 w-[calc(33.33%-6px)] bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out z-0"
        style={{ transform: `translateX(${translateVal}%)` }}
      ></div>

      {/* Botones */}
      {tabs.map((tab) => {
        const IconComponent = iconMap[tab] || FileText;
        const isActive = activeTab === tab;

        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`
              z-10 py-2 rounded-full font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2
              ${isActive ? 'text-black font-bold scale-105' : 'text-gray-500 hover:text-gray-700'}
            `}
          >
            <IconComponent size={18} strokeWidth={isActive ? 2.5 : 2} />
            <span>{tab}{tab === 'Control' && ' de Docs'}</span>
          </button>
        );
      })}
    </div>
  );
};

export default AnimatedTabs;