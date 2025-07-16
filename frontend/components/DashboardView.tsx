import React from 'react';
import KPICard from './KPICard';
import ComplianceChart from './ComplianceChart';
import GeminiAnalysis from './GeminiAnalysis';
import ComplianceTable from './ComplianceTable';
import { SummaryStats, IncumplimientoReporte } from '../types';
import { DollarSignIcon, UsersIcon, ClockIcon, AlertTriangleIcon } from './Icons';

interface DashboardViewProps {
    stats: SummaryStats;
    data: IncumplimientoReporte[];
    handleRowClick: (item: IncumplimientoReporte) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ stats, data, handleRowClick }) => {
    return (
        <div className="space-y-8 animate-fadeInUp">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <KPICard
                    title="Total de Incumplimientos"
                    value={stats.totalIncumplimientos}
                    icon={<AlertTriangleIcon className="h-6 w-6" />}
                    variant="error"
                    style={{ animationDelay: '100ms' }}
                />
                <KPICard
                    title="Monto Total Penalizado"
                    value={`$${stats.totalPenalizado.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}`}
                    icon={<DollarSignIcon className="h-6 w-6" />}
                    variant="warning"
                    style={{ animationDelay: '200ms' }}
                />
                <KPICard
                    title="Proveedor con Más Faltas"
                    value={stats.proveedorConMasIncumplimientos}
                    icon={<UsersIcon className="h-6 w-6" />}
                    variant="info"
                    style={{ animationDelay: '300ms' }}
                />
                <KPICard
                    title="Promedio Días Atraso"
                    value={stats.promedioDiasAtraso}
                    icon={<ClockIcon className="h-6 w-6" />}
                    variant="success"
                    style={{ animationDelay: '400ms' }}
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div style={{ animationDelay: '500ms' }} className="animate-fadeInUp">
                    <ComplianceChart data={data} />
                </div>
                <div style={{ animationDelay: '600ms' }} className="animate-fadeInUp">
                    <GeminiAnalysis data={data} />
                </div>
            </div>
            <div style={{ animationDelay: '700ms' }} className="animate-fadeInUp">
                 <ComplianceTable data={data} onRowClick={handleRowClick} />
            </div>
        </div>
    );
};

export default DashboardView;