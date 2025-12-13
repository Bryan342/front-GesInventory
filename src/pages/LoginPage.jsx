import React, { useState } from 'react';
import { User, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import usersData from '../data/users.json'; // TU LÓGICA IMPORTADA
import logo from '../assets/logo.png';    // TU LOGO

const LoginPage = ({ onLogin }) => {
  // Usamos tus estados
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // TU LÓGICA DE VALIDACIÓN
    const userFound = usersData.find(
      u => u.username === username && u.password === password
    );

    if (userFound) {
      onLogin(userFound); 
    } else {
      setError('Usuario o contraseña incorrectos');
      // Borrar mensaje de error a los 3 segundos para limpiar visualmente
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* --- FONDO DECORATIVO (Estilo Hexagonal) --- */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px]"></div>
      </div>

      {/* --- TARJETA DE LOGIN --- */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 w-full max-w-md p-8 rounded-3xl shadow-2xl relative z-10 animate-fade-in-up">
        
        {/* LOGO Y TÍTULO */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-white rounded-2xl p-4 shadow-lg mb-4 flex items-center justify-center border-4 border-[#1e1b4b] animate-pulse-slow">
            <img src={logo} alt="Jordy Security" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-wide text-center">JORDY SECURITY</h1>
          <p className="text-blue-200 text-sm font-medium tracking-wider mt-1 opacity-80">SISTEMA DE GESTIÓN DE INVENTARIOS</p>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Usuario</label>
            <div className="relative group">
              <User className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-400 transition" size={20}/>
              <input 
                type="text" 
                className="w-full bg-[#0f172a]/50 border border-white/10 rounded-xl py-3 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                placeholder="Ej: admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Contraseña</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-400 transition" size={20}/>
              <input 
                type="password" 
                className="w-full bg-[#0f172a]/50 border border-white/10 rounded-xl py-3 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-300 text-sm font-bold bg-red-500/20 p-3 rounded-lg border border-red-500/30 animate-shake">
              <AlertCircle size={16}/> {error}
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2 group border border-white/10"
          >
            INGRESAR AL SISTEMA <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
          </button>

        </form>

        <div className="mt-8 text-center border-t border-white/5 pt-4">
          <p className="text-xs text-gray-500">
            © 2025 Jordy Security S.A.C. <br/> Acceso restringido a personal autorizado.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;