import React from 'react';
import { EstadoIncumplimiento } from '../types';
import { CircleDotIcon, CheckIcon, XMarkIcon, GavelSolidIcon, SlashIcon } from './Icons';

interface StatusPillProps {
    status: EstadoIncumplimiento;
}

const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
    const baseClasses = 'px-2.5 py-1 text-xs font-semibold rounded-full inline-flex items-center space-x-1.5';

    switch (status) {
        case EstadoIncumplimiento.Detectado:
            return (
                <span className={`${baseClasses} bg-info-light text-info-dark`}>
                    <CircleDotIcon className="w-3.5 h-3.5" />
                    <span>Detectado</span>
                </span>
            );
        case EstadoIncumplimiento.Justificado:
            return (
                <span className={`${baseClasses} bg-success-light text-success-dark`}>
                    <CheckIcon className="w-3.5 h-3.5" />
                    <span>Justificado</span>
                </span>
            );
        case EstadoIncumplimiento.NoJustificado:
            return (
                <span className={`${baseClasses} bg-warning-light text-warning-dark`}>
                    <XMarkIcon className="w-3.5 h-3.5" />
                    <span>No Justificado</span>
                </span>
            );
        case EstadoIncumplimiento.ProcedeSancion:
            return (
                <span className={`${baseClasses} bg-error-light text-error-dark`}>
                    <GavelSolidIcon className="w-3.5 h-3.5" />
                    <span>Procede Sanción</span>
                </span>
            );
        case EstadoIncumplimiento.Cancelado:
             return (
                <span className={`${baseClasses} bg-slate-100 text-slate-800`}>
                    <SlashIcon className="w-3.5 h-3.5" />
                    <span>Cancelado</span>
                </span>
            );
        default:
            return (
                 <span className={`${baseClasses} bg-gray-100 text-gray-800`}>
                    <span>Desconocido</span>
                </span>
            );
    }
};

export default StatusPill;