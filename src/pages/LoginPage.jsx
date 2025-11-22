import React, { useState } from 'react';
import usersData from '../data/users.json'; // Importamos los datos

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Buscamos si existe el usuario y coincide la contraseña
    const userFound = usersData.find(
      u => u.username === username && u.password === password
    );

    if (userFound) {
      onLogin(userFound); // Pasamos los datos del usuario si quieres usarlos
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#1e1b4b] rounded-2xl mx-auto flex items-center justify-center mb-4 text-white text-2xl font-bold">L</div>
          <h2 className="text-2xl font-bold text-gray-800">Iniciar Sesión</h2>
          <p className="text-gray-400 text-sm mt-2">Sistema de Gestión de Inventarios</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Usuario</label>
            <input 
              type="text" value={username} onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e1b4b]"
              placeholder="Ej: admin"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
            <input 
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e1b4b]"
              placeholder="Ej: 123"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button type="submit" className="bg-[#1e1b4b] text-white py-4 rounded-xl font-bold hover:bg-blue-900 transition shadow-lg">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;