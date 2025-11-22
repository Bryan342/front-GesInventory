import React, { useState } from 'react';

// Imports de Componentes
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import AnimatedTabs from './components/common/AnimatedTabs';
import ProductTable from './components/inventory/ProductTable';
import MovementsTable from './components/inventory/MovementsTable';
import ClientDocuments from './components/clients/ClientDocuments';
import ClientControl from './components/clients/ClientControl';
import AddCompanyModal from './components/clients/AddCompanyModal';

// --- IMPORTAMOS LOS DATOS DEL JSON ---
import initialCompaniesData from './data/companies.json'; 

// Vista simple de Planes
const PlanesView = ({ onPlanSelect }) => (
  <div className="grid grid-cols-3 gap-6 mt-8 animate-fade-in">
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
  // Estados
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentSection, setCurrentSection] = useState('INVENTARIO'); 
  const [activeTab, setActiveTab] = useState('Productos');

  // --- ESTADO DE EMPRESAS (INICIALIZADO CON JSON) ---
  const [companies, setCompanies] = useState(initialCompaniesData);
  const [selectedCompanyId, setSelectedCompanyId] = useState(companies[0].id);
  
  // Estados Modal
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [selectedPlanForNewCompany, setSelectedPlanForNewCompany] = useState('');

  // --- LÓGICA DE AGREGAR EMPRESA ---
  const handleAddCompany = ({ name, plan }) => {
    const newId = companies.length > 0 ? Math.max(...companies.map(c => c.id)) + 1 : 1;
    
    const newCompany = { 
      id: newId, 
      name, 
      plan,
      // Generamos datos falsos para el nuevo registro
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

  // Obtener empresa actual para pasar sus datos (RUC, Plan, etc) a las vistas
  const currentCompany = companies.find(c => c.id === selectedCompanyId) || companies[0];

  // Login y Navegación (Igual que antes)
  if (!isAuthenticated) return <LoginPage onLogin={() => setIsAuthenticated(true)} />;

  const goToClients = () => { setCurrentSection('CLIENTES'); setActiveTab('Documentos'); };
  const goToInventory = () => { setCurrentSection('INVENTARIO'); setActiveTab('Productos'); };
  const handleLogout = () => { setIsAuthenticated(false); setCurrentSection('INVENTARIO'); };

  return (
    <div className="min-h-screen bg-[#f8fafc] relative font-sans text-gray-800">
      
      {currentSection === 'CLIENTES' && (
        <div className="fixed left-0 top-0 h-full z-50 animate-slide-in-left">
          <Sidebar 
            companies={companies} 
            selectedCompanyId={selectedCompanyId}
            onSelectCompany={setSelectedCompanyId}
            onAddClick={() => setActiveTab('Planes')} 
          />
        </div>
      )}

      <main className={`p-8 w-full transition-all duration-500 ease-in-out min-h-screen ${currentSection === 'CLIENTES' ? 'pl-40 pr-8' : 'max-w-6xl mx-auto'}`}>
        
        <button onClick={handleLogout} className="fixed top-6 right-8 text-sm text-red-400 hover:text-red-600 font-bold z-50 hover:underline transition">Cerrar Sesión</button>
        
        <div className="flex items-center justify-center gap-4 mb-8 relative">
          {currentSection === 'CLIENTES' && (
             <button onClick={goToInventory} className="absolute left-0 text-3xl text-blue-900 font-bold hover:-translate-x-1 transition transform p-2 rounded-full hover:bg-blue-50">←</button>
          )}
          <h1 className="text-4xl font-normal text-black text-center tracking-tight">
            {currentSection === 'INVENTARIO' ? 'Sistema de Gestión de Inventarios' : 'Reserva de Clientes'}
          </h1>
        </div>

        <div className="mb-10">
          <AnimatedTabs 
            tabs={currentSection === 'INVENTARIO' ? ['Productos', 'Movimientos', 'Reportes'] : ['Planes', 'Documentos', 'Control']}
            activeTab={activeTab} onTabChange={setActiveTab}
          />
        </div>

        <div className="animate-fade-in min-h-[600px]">
          {currentSection === 'INVENTARIO' && (
            <>
              {activeTab === 'Productos' && <ProductTable />}
              {activeTab === 'Movimientos' && <MovementsTable onNavigateToClients={goToClients} />}
              {activeTab === 'Reportes' && <div className="text-center py-20 text-gray-400">Próximamente...</div>}
            </>
          )}

          {currentSection === 'CLIENTES' && (
            <>
              {/* Pasamos la función handlePlanClick a PlanesView */}
              {activeTab === 'Planes' && <PlanesView onPlanSelect={handlePlanClick} />}
              
              {/* Pasamos todos los datos del JSON al componente Documentos */}
              {activeTab === 'Documentos' && (
                <ClientDocuments selectedCompany={currentCompany} />
              )}
              
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