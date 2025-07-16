
import { useState, useEffect } from 'react';
import { 
    IncumplimientoReporte, 
    EstadoIncumplimiento, 
    TipoIncumplimiento, 
    SummaryStats,
    EstadoPago,
    EstadoAclaracion,
    TipoResolucion,
    Aclaracion
} from '../types';
import { MOCK_DATA } from '../data/mockData';


export const useComplianceData = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<IncumplimientoReporte[]>([]);
    const [stats, setStats] = useState<SummaryStats | null>(null);

    useEffect(() => {
        setLoading(true);
        // Simulate API call and backend processing
        setTimeout(() => {
            const processedData = MOCK_DATA.map(d => {
              // Calculate derived values
              const importe_total = d.ordenCompra.detalles.reduce((sum, item) => sum + item.importe_total, 0);

              // RF-001: Calculate due date
              const fechaEnvio = new Date(d.ordenCompra.fecha_envio);
              // Add days, accounting for timezone offset
              fechaEnvio.setUTCDate(fechaEnvio.getUTCDate() + d.ordenCompra.tiempo_entrega_dias);
              const fecha_vencimiento = fechaEnvio.toISOString().split('T')[0];

              let penalizacion = d.penalizacion;
              let aclaracion: Aclaracion | undefined;

              // RF-004 & RF-005: Calculate penalty for late delivery
              if (d.incumplimiento.fk_estado_incumplimiento === EstadoIncumplimiento.ProcedeSancion && d.incumplimiento.fk_tipo_incumplimiento === TipoIncumplimiento.AtrasoEntrega && !penalizacion) {
                  const diasAtraso = d.incumplimiento.dias_atraso_calculado;
                  let porcentaje = 0;
                  if (diasAtraso > 15) porcentaje = 0.10;
                  else if (diasAtraso > 5) porcentaje = 0.06;
                  else if (diasAtraso > 0) porcentaje = 0.03;

                  if (porcentaje > 0) {
                      penalizacion = {
                          id_penalizacion: d.id + 200,
                          fk_incumplimiento: d.incumplimiento.id_incumplimiento,
                          monto_penalizacion: parseFloat((importe_total * porcentaje).toFixed(2)),
                          porcentaje_penalizacion: porcentaje * 100,
                          fk_estado_pago: EstadoPago.Pendiente, // RF-009
                      };
                  }
              }

              // RF-007 & RF-008: Add mock clarification data based on ID
              if(d.id === 1) { 
                aclaracion = {
                  id_aclaracion: 301, fk_incumplimiento: 101, fecha_presentacion: '2025-08-09',
                  argumento_proveedor: 'Hubo un bloqueo en la carretera principal que impidió la llegada a tiempo. Se adjunta evidencia fotográfica.',
                  documento_adjunto_url: '#', fk_estado_aclaracion: EstadoAclaracion.Resuelta,
                  resolucion: {
                    fecha_resolucion: '2025-08-12',
                    dictamen: 'El argumento del proveedor es insuficiente. El bloqueo fue reportado y levantado el mismo día, no justifica 7 días de atraso. Procede la sanción.',
                    fk_tipo_resolucion: TipoResolucion.NoProcede, usuario_revisor: 'Coordinación Jurídica'
                  }
                }
              } else if (d.id === 3) {
                 aclaracion = {
                    id_aclaracion: 302, fk_incumplimiento: 103, fecha_presentacion: '2025-07-29',
                    argumento_proveedor: 'Hubo un error en el pesaje en nuestro almacén. El resto de la mercancía (10kg) fue enviada al día siguiente sin costo.',
                    documento_adjunto_url: '#', fk_estado_aclaracion: EstadoAclaracion.Resuelta,
                    resolucion: {
                        fecha_resolucion: '2025-07-30',
                        dictamen: 'Se comprueba la entrega posterior del faltante. Se acepta la justificación y se cancela el proceso de sanción.',
                        fk_tipo_resolucion: TipoResolucion.Procede, usuario_revisor: 'Area Requirente'
                    }
                }
              } else if (d.id === 5) {
                 aclaracion = {
                    id_aclaracion: 305, fk_incumplimiento: 105, fecha_presentacion: '2025-09-06',
                    argumento_proveedor: 'Se argumenta que el producto estaba dentro de los parámetros de frescura al salir del centro de distribución.',
                    fk_estado_aclaracion: EstadoAclaracion.EnRevision,
                 }
              }


              return {
                ...d,
                ordenCompra: {
                  ...d.ordenCompra,
                  fecha_vencimiento,
                  importe_total
                },
                penalizacion,
                aclaracion
              } as IncumplimientoReporte;
            });
            
            setData(processedData);
            
            // Calculate stats
            const totalIncumplimientos = processedData.length;
            const totalPenalizado = processedData.reduce((acc, item) => acc + (item.penalizacion?.monto_penalizacion || 0), 0);
            
            const providerCounts = processedData.reduce((acc, item) => {
                acc[item.proveedor.nombre_proveedor] = (acc[item.proveedor.nombre_proveedor] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);
            
            const proveedorConMasIncumplimientos = Object.keys(providerCounts).reduce((a, b) => providerCounts[a] > providerCounts[b] ? a : b, '');

            const atrasos = processedData.filter(i => i.incumplimiento.dias_atraso_calculado > 0);
            const totalDiasAtraso = atrasos.reduce((acc, item) => acc + item.incumplimiento.dias_atraso_calculado, 0);
            const promedioDiasAtraso = atrasos.length > 0 ? parseFloat((totalDiasAtraso / atrasos.length).toFixed(1)) : 0;

            setStats({
                totalIncumplimientos,
                totalPenalizado,
                proveedorConMasIncumplimientos,
                promedioDiasAtraso
            });

            setLoading(false);
        }, 1000);
    }, []);

    return { loading, data, stats };
}
