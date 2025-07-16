import React, { useState, useMemo } from 'react';
import { IncumplimientoReporte, Proveedor } from '../types';
import ProveedorCard from './ProveedorCard';
import { MagnifyingGlassIcon } from './Icons';

interface ProveedoresPageProps {
    data: IncumplimientoReporte[];
}

interface ProveedorStats {
    proveedor: Proveedor;
    totalIncumplimientos: number;
    totalPenalizado: number;
}

const ProveedoresPage: React.FC<ProveedoresPageProps> = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const proveedorStats = useMemo(() => {
        const statsMap = new Map<number, ProveedorStats>();

        data.forEach(item => {
            let stats = statsMap.get(item.proveedor.clave_proveedor);
            if (!stats) {
                stats = {
                    proveedor: item.proveedor,
                    totalIncumplimientos: 0,
                    totalPenalizado: 0,
                };
            }
            stats.totalIncumplimientos += 1;
            stats.totalPenalizado += item.penalizacion?.monto_penalizacion || 0;
            statsMap.set(item.proveedor.clave_proveedor, stats);
        });

        return Array.from(statsMap.values()).sort((a, b) => 
            a.proveedor.nombre_proveedor.localeCompare(b.proveedor.nombre_proveedor)
        );
    }, [data]);
    
    const filteredProveedores = useMemo(() => {
        if (!searchTerm) return proveedorStats;
        return proveedorStats.filter(p => 
            p.proveedor.nombre_proveedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.proveedor.rfc.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [proveedorStats, searchTerm]);

    return (
        <div className="animate-fadeInUp space-y-6">
            <div className="bg-surface p-4 rounded-xl border border-border-color">
                <h1 className="text-2xl font-bold text-on-surface">Directorio de Proveedores</h1>
                <p className="text-on-surface-secondary mt-1">Busque y analice el desempeño de cada proveedor.</p>
                 <div className="mt-4 relative">
                    <input
                        type="text"
                        placeholder="Buscar por nombre o RFC..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-border-color rounded-lg focus:ring-2 focus:ring-primary-main focus:outline-none"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-secondary">
                        <MagnifyingGlassIcon className="h-5 w-5" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProveedores.map((stats, index) => (
                    <ProveedorCard 
                        key={stats.proveedor.clave_proveedor} 
                        proveedor={stats.proveedor}
                        totalIncumplimientos={stats.totalIncumplimientos}
                        totalPenalizado={stats.totalPenalizado}
                        style={{ animationDelay: `${index * 50}ms`}}
                    />
                ))}
            </div>
            {filteredProveedores.length === 0 && (
                <div className="text-center py-10 col-span-full">
                    <p className="text-on-surface-secondary">No se encontraron proveedores que coincidan con la búsqueda.</p>
                </div>
            )}
        </div>
    );
};

export default ProveedoresPage;