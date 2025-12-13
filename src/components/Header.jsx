import React from 'react';
import { LogOut } from 'lucide-react';

const Header = ({ onLogout }) => {
  return (
    <header className="fixed top-0 left-0 w-full h-20 bg-white shadow-sm z-40 flex items-center justify-between px-8 pl-24">
      {/* NOTA: Hemos quitado el logo de aquí.
         Agregamos 'pl-24' (padding-left) para que el texto no choque 
         con el logo flotante que pondremos en App.jsx 
      */}

      {/* 1. IZQUIERDA: NOMBRE DE LA EMPRESA (Texto simple, sin logo) */}
      <div className="hidden md:block">
          <h1 className="font-black text-[#1e1b4b] text-xl leading-none tracking-wide">JORDY SECURITY</h1>
          <p className="text-[10px] font-bold text-gray-400 tracking-wider">SISTEMA DE GESTIÓN</p>
      </div>

      {/* 2. CENTRO: TÍTULO */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h2 className="text-xl md:text-2xl text-gray-800 font-medium tracking-tight whitespace-nowrap">
          Gestión de Inventarios
        </h2>
      </div>

      {/* 3. DERECHA: CERRAR SESIÓN */}
      <button 
        onClick={onLogout}
        className="group flex items-center gap-2 text-red-500 font-bold text-sm hover:bg-red-50 px-4 py-2 rounded-lg transition-all"
      >
        <span className="group-hover:translate-x-[-2px] transition-transform hidden sm:inline">Cerrar Sesión</span>
        <LogOut size={18} />
      </button>

    </header>
  );
};

export default Header;