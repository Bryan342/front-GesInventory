import React, { useState } from 'react';

// --- 1. IMPORTACIÓN DE COMPONENTES ---
// Estructurales
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import AnimatedTabs from './components/common/AnimatedTabs';

// Sección Inventario
import ProductTable from './components/inventory/ProductTable';
import MovementsTable from './components/inventory/MovementsTable';

// Sección Clientes
import ClientDocuments from './components/clients/ClientDocuments';
import ClientControl from './components/clients/ClientControl';

// --- 2. VISTA INTERNA: PLANES (Definida aquí por simplicidad) ---
const PlanesView = () => (
  <div className="grid grid-cols-3 gap-6 mt-8 animate-fade-in">
    {['Plan Mensual', 'Plan Trimestral', 'Plan Anual'].map((plan) => (
      <div key={plan} className="bg-white h-96 rounded-3xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition-all cursor-pointer flex flex-col items-center pt-10 group hover:-translate-y-1">
        <div className="w-20 h-20 bg-gray-50 rounded-full mb-6 flex items-center justify-center group-hover:bg-[#1e1b4b] transition-colors duration-300">
          <span className="text-3xl group-hover:text-white">📄</span>
        </div>
        <h3 className="text-2xl font-bold mb-2 text-gray-700 group-hover:text-[#1e1b4b]">{plan}</h3>
        <p className="text-gray-400 text-center px-4 text-sm">Acceso completo a la gestión documental, facturación y soporte prioritario.</p>
        <button className="mt-auto border border-gray-300 px-6 py-2 rounded-full text-sm font-bold text-gray-500 group-hover:bg-[#1e1b4b] group-hover:text-white group-hover:border-transparent transition">
          Seleccionar
        </button>
      </div>
    ))}
  </div>
);

// --- 3. APP PRINCIPAL ---
function App() {
  // A. ESTADOS GLOBALES
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentSection, setCurrentSection] = useState('INVENTARIO'); // 'INVENTARIO' o 'CLIENTES'
  const [activeTab, setActiveTab] = useState('Productos');

  // B. VERIFICACIÓN DE LOGIN
  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  // C. LÓGICA DE NAVEGACIÓN
  const goToClients = () => {
    setCurrentSection('CLIENTES');
    setActiveTab('Documentos'); // Al entrar a clientes, vamos directo a Documentos (o Planes)
  };

  const goToInventory = () => {
    setCurrentSection('INVENTARIO');
    setActiveTab('Productos'); // Al volver, vamos a Productos
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentSection('INVENTARIO');
    setActiveTab('Productos');
  };

  // D. DEFINICIÓN DE PESTAÑAS
  const inventoryTabs = ['Productos', 'Movimientos', 'Reportes'];
  const clientTabs = ['Planes', 'Documentos', 'Control'];

  return (
    <div className="min-h-screen bg-[#f8fafc] relative font-sans text-gray-800">

      {/* 1. SIDEBAR (Solo visible en sección CLIENTES) */}
      {currentSection === 'CLIENTES' && (
        <div className="fixed left-0 top-0 h-full z-50 animate-slide-in-left">
          <Sidebar />
        </div>
      )}

      {/* 2. CONTENEDOR PRINCIPAL (Layout Adaptativo) */}
      <main
        className={`
          p-8 w-full transition-all duration-500 ease-in-out min-h-screen
          ${currentSection === 'CLIENTES' ? 'pl-40 pr-8' : 'max-w-6xl mx-auto'}
        `}
      >

        {/* Botón Salir (Flotante) */}
        <button
          onClick={handleLogout}
          className="fixed top-6 right-8 text-sm text-red-400 hover:text-red-600 font-bold z-50 hover:underline transition"
        >
          Cerrar Sesión
        </button>

        {/* 3. CABECERA (Título y Botón Atrás) */}
        <div className="flex items-center justify-center gap-4 mb-8 relative">
          {/* Flecha de regreso solo si estamos en Clientes */}
          {currentSection === 'CLIENTES' && (
            <button
              onClick={goToInventory}
              className="absolute left-0 text-3xl text-blue-900 font-bold hover:-translate-x-1 transition transform p-2 rounded-full hover:bg-blue-50"
              title="Volver al Inventario"
            >
              ←
            </button>
          )}
          
          <h1 className="text-4xl font-normal text-black text-center tracking-tight">
            {currentSection === 'INVENTARIO'
              ? 'Sistema de Gestión de Inventarios'
              : 'Reserva de Clientes'}
          </h1>
        </div>

        {/* 4. PESTAÑAS ANIMADAS */}
        <div className="mb-10">
          <AnimatedTabs
            tabs={currentSection === 'INVENTARIO' ? inventoryTabs : clientTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* 5. ÁREA DE CONTENIDO (Cambia según el Tab) */}
        <div className="animate-fade-in min-h-[600px]">

          {/* --- SECCIÓN: INVENTARIO --- */}
          {currentSection === 'INVENTARIO' && (
            <>
              {/* TABLA DE PRODUCTOS (Con Buscador, Modales, Edición) */}
              {activeTab === 'Productos' && <ProductTable />}

              {/* TABLA DE MOVIMIENTOS (Con Navegación a Clientes) */}
              {activeTab === 'Movimientos' && (
                <MovementsTable onNavigateToClients={goToClients} />
              )}

              {/* REPORTES (Placeholder) */}
              {activeTab === 'Reportes' && (
                <div className="flex flex-col items-center justify-center h-96 text-gray-300 border-2 border-dashed border-gray-200 rounded-3xl bg-white/50">
                  <span className="text-6xl mb-4"></span>
                  <p className="text-lg font-medium">Módulo de Reportes</p>
                  <p className="text-sm">Próximamente disponible</p>
                </div>
              )}
            </>
          )}

          {/* --- SECCIÓN: CLIENTES --- */}
          {currentSection === 'CLIENTES' && (
            <>
              {activeTab === 'Planes' && <PlanesView />}
              {activeTab === 'Documentos' && <ClientDocuments />}
              {activeTab === 'Control' && <ClientControl />}
            </>
          )}

        </div>
      </main>
    </div>
  );
}

export default App;