import React, { useState, useMemo } from 'react';
import { IncumplimientoReporte } from '../types';
import StatusPill from './StatusPill';

const getTipoText = (tipo: number): string => {
    switch (tipo) {
        case 1: return 'Atraso en Entrega';
        case 2: return 'Calidad Deficiente';
        case 3: return 'Entrega Incompleta';
        default: return 'Desconocido';
    }
};

const SortIcon: React.FC<{ direction: 'ascending' | 'descending' | null }> = ({ direction }) => {
    if (!direction) {
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>;
    }
    if (direction === 'ascending') {
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>;
    }
    return <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>;
};

const SortableHeader: React.FC<{
    title: string;
    sortKey: any;
    sortConfig: { key: string; direction: 'ascending' | 'descending' } | null;
    requestSort: (key: any) => void;
}> = ({ title, sortKey, sortConfig, requestSort }) => {
    const isSorted = sortConfig?.key === sortKey;
    const direction = isSorted ? sortConfig.direction : null;

    return (
        <th className="p-3 text-left font-semibold text-on-surface-secondary cursor-pointer" onClick={() => requestSort(sortKey)}>
            <div className="flex items-center space-x-2">
                <span>{title}</span>
                <SortIcon direction={direction} />
            </div>
        </th>
    );
};

const ComplianceTable: React.FC<{ data: IncumplimientoReporte[], onRowClick: (item: IncumplimientoReporte) => void }> = ({ data, onRowClick }) => {
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>({ key: 'incumplimiento.fecha_deteccion', direction: 'descending' });

    const sortedData = useMemo(() => {
        if (!data) return [];
        let sortableItems = [...data];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                const getNestedValue = (obj: any, path: string) => path.split('.').reduce((o, i) => o?.[i], obj);
                
                const aValue = getNestedValue(a, sortConfig.key);
                const bValue = getNestedValue(b, sortConfig.key);

                // Push null/undefined values to the end of the sorted list
                if (aValue == null && bValue != null) return 1;
                if (aValue != null && bValue == null) return -1;
                if (aValue == null && bValue == null) return 0;
                
                const direction = sortConfig.direction === 'ascending' ? 1 : -1;
                
                if (aValue < bValue) {
                    return -1 * direction;
                }
                if (aValue > bValue) {
                    return 1 * direction;
                }
                
                return 0;
            });
        }
        return sortableItems;
    }, [data, sortConfig]);

    const requestSort = (key: string) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="bg-surface rounded-xl border border-border-color overflow-hidden mt-8">
            <h3 className="text-xl font-bold p-4 border-b border-border-color">Detalle de Incumplimientos</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-border-color">
                        <tr>
                            <SortableHeader title="Proveedor" sortKey="proveedor.nombre_proveedor" sortConfig={sortConfig} requestSort={requestSort} />
                            <SortableHeader title="Orden Compra" sortKey="ordenCompra.orden_compra" sortConfig={sortConfig} requestSort={requestSort} />
                             <th className="p-3 text-left font-semibold text-on-surface-secondary">Tipo Incumplimiento</th>
                            <SortableHeader title="Fecha Detección" sortKey="incumplimiento.fecha_deteccion" sortConfig={sortConfig} requestSort={requestSort} />
                            <SortableHeader title="Fecha Vencimiento" sortKey="ordenCompra.fecha_vencimiento" sortConfig={sortConfig} requestSort={requestSort} />
                            <SortableHeader title="Días Atraso" sortKey="incumplimiento.dias_atraso_calculado" sortConfig={sortConfig} requestSort={requestSort} />
                            <th className="p-3 text-left font-semibold text-on-surface-secondary">Estado</th>
                            <SortableHeader title="Monto Penalizado" sortKey="penalizacion.monto_penalizacion" sortConfig={sortConfig} requestSort={requestSort} />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border-color">
                        {sortedData.map(item => (
                            <tr key={item.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => onRowClick(item)}>
                                <td className="p-3 font-medium text-on-surface">{item.proveedor.nombre_proveedor}</td>
                                <td className="p-3 text-on-surface-secondary">{item.ordenCompra.orden_compra}</td>
                                <td className="p-3">{getTipoText(item.incumplimiento.fk_tipo_incumplimiento)}</td>
                                <td className="p-3">{item.incumplimiento.fecha_deteccion}</td>
                                <td className="p-3 text-warning-dark">{item.ordenCompra.fecha_vencimiento}</td>
                                <td className="p-3 text-center font-semibold">{item.incumplimiento.dias_atraso_calculado}</td>
                                <td className="p-3">
                                    <StatusPill status={item.incumplimiento.fk_estado_incumplimiento} />
                                </td>
                                <td className="p-3 text-right font-mono text-error-main">
                                    {item.penalizacion ? `$${item.penalizacion.monto_penalizacion.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ComplianceTable;