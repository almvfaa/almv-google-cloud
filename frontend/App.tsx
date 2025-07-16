import React, { useState } from 'react';
import { Header } from './components/Header';
import Sidebar from './components/Sidebar';
import { ComplianceDetailModal } from './components/ComplianceDetailModal';
import { useComplianceData } from './hooks/useComplianceData';
import { IncumplimientoReporte } from './types';
import ProveedoresPage from './components/ProveedoresPage';
import DashboardView from './components/DashboardView';

const App: React.FC = () => {
    const { loading, data, stats } = useComplianceData();
    const [selectedComplianceItem, setSelectedComplianceItem] = useState<IncumplimientoReporte | null>(null);
    const [currentView, setCurrentView] = useState<'incumplimientos' | 'penalizaciones' | 'aclaraciones' | 'ordenes_compra' | 'proveedores' | 'entradas'>('incumplimientos');

    const handleRowClick = (item: IncumplimientoReporte) => {
        setSelectedComplianceItem(item);
    };

    const handleCloseModal = () => {
        setSelectedComplianceItem(null);
    };

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-main"></div>
                    <p className="mt-4 text-lg text-on-surface-secondary">Cargando datos del reporte...</p>
                </div>
            </div>
        );
    }

    if (!stats) return null;

    const renderContent = () => {
        switch(currentView) {
            case 'incumplimientos':
                return <DashboardView stats={stats} data={data} handleRowClick={handleRowClick} />;
            case 'proveedores':
                return <ProveedoresPage data={data} />;
            default:
                return (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-on-surface">Página en Construcción</h2>
                            <p className="text-on-surface-secondary mt-2">La sección de '{currentView.replace(/_/g, ' ')}' estará disponible próximamente.</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <>
            <div className="flex h-screen bg-background text-on-surface">
                <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Header />
                    <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
                       {renderContent()}
                    </main>
                </div>
            </div>
            {selectedComplianceItem && (
                <ComplianceDetailModal
                    isOpen={!!selectedComplianceItem}
                    onClose={handleCloseModal}
                    reportItem={selectedComplianceItem}
                />
            )}
        </>
    );
};

export default App;