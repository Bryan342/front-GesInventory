import React, { useState } from 'react';

// Imports de Componentes
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import AnimatedTabs from './components/common/AnimatedTabs';
import ProductTable from './components/inventory/ProductTable';
import MovementsTable from './components/inventory/MovementsTable';
import ClientDocuments from './components/clients/ClientDocuments';
import ClientControl from './components/clients/ClientControl';
import AddCompanyModal from './components/clients/AddCompanyModal';

// DATOS E IMAGEN
import initialCompaniesData from './data/companies.json'; 
import logo from './assets/logo.png'; // <--- IMPORTAMOS EL LOGO AQUÍ

// Vista simple de Planes
const PlanesView = ({ onPlanSelect }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 animate-fade-in pb-10">
    {['Plan Mensual', 'Plan Trimestral', 'Plan Anual'].map((plan) => (
      <div 
        key={plan} 
        onClick={() => onPlanSelect(plan)} 
        className="bg-white h-96 rounded-3xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition-all cursor-pointer flex flex-col items-center pt-10 group hover:-translate-y-1 hover:border-blue-200"
      >
        <div className="w-20 h-20 bg-gray-50 rounded-full mb-6 flex items-center justify-center group-hover:bg-[#1e1b4b] transition-colors duration-300">
          <span className="text-3xl group-hover:text-white">📄</span>
        </div>
        <h3 className="text-2xl font-bold mb-2 text-gray-700 group-hover:text-[#1e1b4b]">{plan}</h3>
        <p className="text-gray-400 text-center px-4 text-sm mb-4">Selecciona para registrar empresa.</p>
        <button className="mt-auto border border-gray-300 px-6 py-2 rounded-full text-sm font-bold text-gray-500 group-hover:bg-[#1e1b4b] group-hover:text-white group-hover:border-transparent transition">
          Contratar
        </button>
      </div>
    ))}
  </div>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentSection, setCurrentSection] = useState('INVENTARIO'); 
  const [activeTab, setActiveTab] = useState('Productos');

  // --- ESTADO DE EMPRESAS ---
  const [companies, setCompanies] = useState(initialCompaniesData);
  const [selectedCompanyId, setSelectedCompanyId] = useState(companies[0].id);
  
  // Estados Modal
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [selectedPlanForNewCompany, setSelectedPlanForNewCompany] = useState('');

  const handleAddCompany = ({ name, plan }) => {
    const newId = companies.length > 0 ? Math.max(...companies.map(c => c.id)) + 1 : 1;
    const newCompany = { 
      id: newId, 
      name, 
      plan,
      ruc: "20" + Math.floor(Math.random() * 900000000 + 100000000), 
      address: "Dirección Pendiente",
      status: "Nuevo"
    };
    setCompanies([...companies, newCompany]); 
    setSelectedCompanyId(newId); 
    setIsCompanyModalOpen(false); 
    setActiveTab('Documentos'); 
  };

  const handlePlanClick = (planName) => {
    setSelectedPlanForNewCompany(planName);
    setIsCompanyModalOpen(true);
  };

  const currentCompany = companies.find(c => c.id === selectedCompanyId) || companies[0];

  const goToClients = () => { setCurrentSection('CLIENTES'); setActiveTab('Documentos'); };
  const goToInventory = () => { setCurrentSection('INVENTARIO'); setActiveTab('Productos'); };
  
  const handleLogout = () => { 
    setIsAuthenticated(false); 
    setCurrentSection('INVENTARIO'); 
    sessionStorage.removeItem('jordy_temp_docs');
  };

  if (!isAuthenticated) return <LoginPage onLogin={() => setIsAuthenticated(true)} />;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-gray-800 relative">
      
      {/* --------------------------------------------------
          LOGO FLOTANTE "FUERA DE TODO" (ESTÁTICO) 
          --------------------------------------------------
          z-[60] asegura que esté encima del Header (z-40) y Sidebar.
          fixed top-2 left-4 lo clava en la esquina.
      */}
      <div className="fixed top-2 left-4 z-[60] w-16 h-16 bg-white rounded-xl shadow-lg border border-gray-100 p-2 flex items-center justify-center animate-fade-in hover:scale-105 transition-transform cursor-default">
         <img src={logo} alt="Jordy Security" className="w-full h-full object-contain" />
      </div>

      {/* HEADER GLOBAL (Barra Blanca) */}
      <Header onLogout={handleLogout} />

      {/* SIDEBAR (Lista de Empresas) */}
      {currentSection === 'CLIENTES' && (
        <Sidebar 
          companies={companies} 
          selectedCompanyId={selectedCompanyId}
          onSelectCompany={setSelectedCompanyId}
          onAddClick={() => setActiveTab('Planes')} 
        />
      )}

      {/* CONTENIDO PRINCIPAL */}
      <main 
        className={`
          pt-24 px-8 w-full transition-all duration-500 ease-in-out min-h-screen 
          ${currentSection === 'CLIENTES' ? 'pl-40' : 'max-w-6xl mx-auto'}
        `}
      >
        {/* NAVEGACIÓN Y TÍTULOS */}
        <div className="flex items-center justify-center gap-4 mb-8 relative">
          {currentSection === 'CLIENTES' && (
             <button 
               onClick={goToInventory} 
               className="absolute left-0 text-sm font-bold text-blue-900 hover:-translate-x-1 transition transform px-4 py-2 rounded-xl bg-blue-50 border border-blue-100 flex items-center gap-2"
             >
               ← Volver
             </button>
          )}
          <h1 className="text-3xl font-light text-gray-400 text-center tracking-tight hidden md:block">
            {currentSection === 'INVENTARIO' ? 'Panel de Control / Almacén' : 'Gestión de Clientes'}
          </h1>
        </div>

        <div className="mb-10">
          <AnimatedTabs 
            tabs={currentSection === 'INVENTARIO' ? ['Productos', 'Movimientos', 'Reportes'] : ['Planes', 'Documentos', 'Control']}
            activeTab={activeTab} onTabChange={setActiveTab}
          />
        </div>

        {/* VISTAS */}
        <div className="animate-fade-in min-h-[600px] pb-20">
          {currentSection === 'INVENTARIO' && (
            <>
              {activeTab === 'Productos' && <ProductTable />}
              {activeTab === 'Movimientos' && <MovementsTable onNavigateToClients={goToClients} />}
              {activeTab === 'Reportes' && <div className="text-center py-20 text-gray-400">Próximamente...</div>}
            </>
          )}

          {currentSection === 'CLIENTES' && (
            <>
              {activeTab === 'Planes' && <PlanesView onPlanSelect={handlePlanClick} />}
              {activeTab === 'Documentos' && <ClientDocuments selectedCompany={currentCompany} />}
              {activeTab === 'Control' && <ClientControl selectedCompany={currentCompany}/>}
            </>
          )}
        </div>
      </main>

      <AddCompanyModal 
        isOpen={isCompanyModalOpen}
        onClose={() => setIsCompanyModalOpen(false)}
        selectedPlan={selectedPlanForNewCompany}
        onSave={handleAddCompany}
      />
    </div>
  );
}

export default App;