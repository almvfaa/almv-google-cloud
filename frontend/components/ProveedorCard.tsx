import React from 'react';
import { Proveedor } from '../types';
import { BuildingOfficeIcon, AlertTriangleIcon, DollarSignIcon } from './Icons';

interface ProveedorCardProps {
    proveedor: Proveedor;
    totalIncumplimientos: number;
    totalPenalizado: number;
    style?: React.CSSProperties;
}

const ProveedorCard: React.FC<ProveedorCardProps> = ({ proveedor, totalIncumplimientos, totalPenalizado, style }) => {
    return (
        <div style={style} className="bg-surface rounded-xl border border-border-color p-5 flex flex-col space-y-4 transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 animate-fadeInUp">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="font-bold text-on-surface text-lg leading-tight">{proveedor.nombre_proveedor}</h3>
                    <p className="text-xs text-on-surface-secondary font-mono">{proveedor.rfc}</p>
                </div>
                 <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-200 text-primary-dark flex-shrink-0">
                    <BuildingOfficeIcon className="h-6 w-6" />
                </div>
            </div>
            
            <div className="border-t border-border-color pt-4 flex-grow flex flex-col justify-end space-y-3">
                 <div className="flex items-center space-x-2 text-sm">
                    <AlertTriangleIcon className="h-5 w-5 text-error-main flex-shrink-0" />
                    <span className="text-on-surface-secondary">Total de Incidentes:</span>
                    <span className="font-bold text-on-surface ml-auto">{totalIncumplimientos}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                    <DollarSignIcon className="h-5 w-5 text-warning-main flex-shrink-0" />
                    <span className="text-on-surface-secondary">Monto Penalizado:</span>
                    <span className="font-bold text-on-surface ml-auto">${totalPenalizado.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
            </div>
        </div>
    );
};

export default ProveedorCard;