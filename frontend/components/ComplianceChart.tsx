import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IncumplimientoReporte, TipoIncumplimiento } from '../types';

const getTipoText = (tipo: TipoIncumplimiento): string => {
    switch (tipo) {
        case TipoIncumplimiento.AtrasoEntrega: return 'Atraso en Entrega';
        case TipoIncumplimiento.CalidadDeficiente: return 'Calidad Deficiente';
        case TipoIncumplimiento.EntregaIncompleta: return 'Entrega Incompleta';
        default: return 'Desconocido';
    }
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface p-3 rounded-lg border border-border-color shadow-md">
        <p className="font-bold text-on-surface">{label}</p>
        <p className="text-sm text-primary-main">{`Incidencias : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const ComplianceChart: React.FC<{ data: IncumplimientoReporte[] }> = ({ data }) => {
    const chartData = useMemo(() => {
        const counts = data.reduce((acc, item) => {
            const typeName = getTipoText(item.incumplimiento.fk_tipo_incumplimiento);
            acc[typeName] = (acc[typeName] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return Object.keys(counts).map(name => ({
            name,
            incidencias: counts[name]
        }));
    }, [data]);

    return (
        <div className="bg-surface p-4 rounded-xl border border-border-color h-96">
            <h3 className="text-xl font-bold mb-4 text-on-surface">Incumplimientos por Tipo</h3>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" angle={-25} textAnchor="end" stroke="#64748b" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#64748b" allowDecimals={false} />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: 'rgba(79, 70, 229, 0.05)' }}
                    />
                    <Legend wrapperStyle={{paddingTop: '20px'}} />
                    <Bar dataKey="incidencias" fill="var(--color-primary-main)" name="Nro. de Incidencias" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ComplianceChart;