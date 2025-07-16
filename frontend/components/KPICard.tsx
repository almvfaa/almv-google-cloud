import React from 'react';

interface KPICardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    variant: 'error' | 'warning' | 'info' | 'success';
    style?: React.CSSProperties;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, icon, variant, style }) => {
    
    const renderIcon = () => {
        switch(variant) {
            case 'error':
                return <div className="p-3 rounded-lg bg-gradient-to-br from-red-100 to-red-200 text-error-dark">{icon}</div>;
            case 'warning':
                return <div className="p-3 rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 text-warning-dark">{icon}</div>;
            case 'info':
                 return <div className="p-3 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 text-info-dark">{icon}</div>;
            case 'success':
                 return <div className="p-3 rounded-lg bg-gradient-to-br from-green-100 to-green-200 text-success-dark">{icon}</div>;
        }
    }
    
    return (
        <div style={style} className="bg-surface p-5 rounded-xl border border-border-color flex items-center space-x-4 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
            {renderIcon()}
            <div>
                <p className="text-sm text-on-surface-secondary font-medium">{title}</p>
                <p className="text-2xl font-bold text-on-surface tracking-tight">{value}</p>
            </div>
        </div>
    );
};

export default KPICard;