
import { 
    IncumplimientoReporte, 
    EstadoIncumplimiento, 
    TipoIncumplimiento, 
    OrdenCompra,
    EstadoPago,
    EstadoAclaracion,
    TipoResolucion
} from '../types';

// Raw data, some fields will be calculated/processed
export const MOCK_DATA: (Omit<IncumplimientoReporte, 'ordenCompra' | 'aclaracion' | 'penalizacion'> & { ordenCompra: Omit<OrdenCompra, 'fecha_vencimiento' | 'importe_total'>, penalizacion?: IncumplimientoReporte['penalizacion'] })[] = [
  {
    id: 1,
    proveedor: { clave_proveedor: 2212, nombre_proveedor: 'GUZMAN SANDOVAL RAUL', rfc: 'GUSR800101XYZ', domicilio: 'AV. SIEMPRE VIVA 123', registro: 1234 },
    ordenCompra: { 
      id_oc: 10400043, 
      orden_compra: 'OC/A/10400043', 
      fk_contrato: 90, 
      solicitud: 1974,
      fecha_elaboracion: '2025-07-01',
      fecha_envio: '2025-07-01',
      fondeo: 'PRESUPUESTO ABC/2025',
      suministro: 'Agosto/2025',
      tiempo_entrega_dias: 30,
      observaciones: 'ENTREGA URGENTE',
      u_hospitalaria: 1,
      u_resp: 1,
      prog: 1,
      partida: 1111,
      detalles: [{ codigo: 'FR-001', cantidad: 100, unidad: 'KG', descripcion: 'FRESAS FRESCAS', precio_unitario: 1888.67, importe_total: 188867.50 }]
    },
    incumplimiento: {
      id_incumplimiento: 101, fk_entrada: 1, fk_tipo_incumplimiento: TipoIncumplimiento.AtrasoEntrega,
      fecha_deteccion: '2025-08-08', dias_atraso_calculado: 7, descripcion_hechos: 'Retraso en la entrega de Fresas. La fecha de vencimiento era 2025-07-31 y se entregó el 2025-08-07.',
      fk_estado_incumplimiento: EstadoIncumplimiento.ProcedeSancion,
    },
  },
  {
    id: 2,
    proveedor: { 
      clave_proveedor: 4379,
      nombre_proveedor: 'BANUELOS AREVALO MARIA DOLORES',
      rfc: 'BAMD850202ABC',
      domicilio: 'MEZQUITAN, 752, ARTESANOS, GUADALAJARA',
      registro: 4379
    },
    ordenCompra: { 
      id_oc: 10500733,
      orden_compra: 'OC/25/10500733',
      fk_contrato: 97,
      solicitud: 1973,
      fecha_elaboracion: '2025-06-27',
      fecha_envio: '2025-06-27',
      fondeo: 'PRESUPUESTO LPL01/2025',
      suministro: 'Julio/2025',
      tiempo_entrega_dias: 35,
      observaciones: 'PROGRAMADO',
      u_hospitalaria: 5,
      u_resp: 3,
      prog: 4,
      partida: 2212,
      detalles: [
        { codigo: '2212001022', cantidad: 50.00, unidad: 'GALON', descripcion: 'CONCENTRADO DE HORCHATA LÍQUIDO', precio_unitario: 249.00, importe_total: 12450.00 },
        { codigo: '2212001028', cantidad: 220.00, unidad: 'LATA', descripcion: 'DURAZNO EN ALMIBAR DE 820 GRS', precio_unitario: 58.00, importe_total: 12760.00 },
      ],
    },
    incumplimiento: {
      id_incumplimiento: 102, fk_entrada: 2, fk_tipo_incumplimiento: TipoIncumplimiento.CalidadDeficiente,
      fecha_deteccion: '2025-08-05', dias_atraso_calculado: 0, descripcion_hechos: 'El concentrado de horchata presenta sedimentos no habituales.',
      fk_estado_incumplimiento: EstadoIncumplimiento.NoJustificado,
    },
     penalizacion: { id_penalizacion: 202, fk_incumplimiento: 102, monto_penalizacion: 4851.03, fk_estado_pago: EstadoPago.Retenido }
  },
  {
    id: 3,
    proveedor: { clave_proveedor: 3333, nombre_proveedor: 'NUÑEZ DE LA O ALFONSO', rfc: 'NUAO900303DEF', domicilio: 'CALLE FALSA 123', registro: 5678 },
    ordenCompra: { id_oc: 10400056, orden_compra: 'OC/A/10400056', fk_contrato: 103,
      solicitud: 1975,
      fecha_elaboracion: '2025-07-02',
      fecha_envio: '2025-07-02',
      fondeo: 'PRESUPUESTO DEF/2025',
      suministro: 'Agosto/2025',
      tiempo_entrega_dias: 25,
      observaciones: '',
      u_hospitalaria: 2,
      u_resp: 2,
      prog: 2,
      partida: 2222,
      detalles: [{ codigo: 'CEB-M-01', cantidad: 500, unidad: 'KG', descripcion: 'CEBOLLA MORADA', precio_unitario: 148.24, importe_total: 74123.40 }]
     },
    incumplimiento: {
      id_incumplimiento: 103, fk_entrada: 3, fk_tipo_incumplimiento: TipoIncumplimiento.EntregaIncompleta,
      fecha_deteccion: '2025-07-28', dias_atraso_calculado: 0, descripcion_hechos: 'Faltaron 10kg de Cebolla morada.',
      fk_estado_incumplimiento: EstadoIncumplimiento.Justificado,
    }
  },
  {
    id: 4,
    proveedor: { clave_proveedor: 5555, nombre_proveedor: 'MORALES RÍOS FELIPE DE JESÚS', rfc: 'MORF750101XYZ', domicilio: 'AV. DEL PAN 500', registro: 8899 },
    ordenCompra: { 
      id_oc: 10400078, orden_compra: 'OC/A/10400078', fk_contrato: 105,
      solicitud: 2001,
      fecha_elaboracion: '2025-09-01',
      fecha_envio: '2025-09-01',
      fondeo: 'LPL 84/2023',
      suministro: 'Octubre/2025',
      tiempo_entrega_dias: 22,
      observaciones: 'PANADERIA',
      u_hospitalaria: 3, u_resp: 3, prog: 5, partida: 8000,
      detalles: [{ codigo: 'PAN-001', cantidad: 7050, unidad: 'PZA', descripcion: 'PAN DULCE DE 100 GRS', precio_unitario: 10.00, importe_total: 111976.25 }]
     },
    incumplimiento: {
      id_incumplimiento: 104, fk_entrada: 4, fk_tipo_incumplimiento: TipoIncumplimiento.AtrasoEntrega,
      fecha_deteccion: '2025-10-15', dias_atraso_calculado: 22, descripcion_hechos: 'La entrega programada para el 23 de Septiembre se realizó hasta el 15 de Octubre.',
      fk_estado_incumplimiento: EstadoIncumplimiento.ProcedeSancion,
    },
     penalizacion: { id_penalizacion: 204, fk_incumplimiento: 104, monto_penalizacion: 11197.63, porcentaje_penalizacion: 10, fk_estado_pago: EstadoPago.Pagado }
  },
  {
    id: 5,
    proveedor: { 
      clave_proveedor: 4379,
      nombre_proveedor: 'BANUELOS AREVALO MARÍA DOLORES',
      rfc: 'BAMD850202ABC',
      domicilio: 'MEZQUITAN, 752, ARTESANOS, GUADALAJARA',
      registro: 4379
    },
    ordenCompra: { 
      id_oc: 10400052, orden_compra: 'OC/A/10400052', fk_contrato: 99,
      solicitud: 1980,
      fecha_elaboracion: '2025-08-10',
      fecha_envio: '2025-08-10',
      fondeo: 'LPL 01/2024',
      suministro: 'Septiembre/2025',
      tiempo_entrega_dias: 23,
      observaciones: 'CARNICOS',
      u_hospitalaria: 4, u_resp: 4, prog: 6, partida: 2212,
      detalles: [{ codigo: 'CAR-005', cantidad: 124, unidad: 'KG', descripcion: 'BISTECK DE RES AGUAYON', precio_unitario: 155, importe_total: 19220.00 }]
     },
    incumplimiento: {
      id_incumplimiento: 105, fk_entrada: 5, fk_tipo_incumplimiento: TipoIncumplimiento.CalidadDeficiente,
      fecha_deteccion: '2025-09-05', dias_atraso_calculado: 0, descripcion_hechos: 'La carne presenta un color oscuro y olor anómalo. No cumple con las especificaciones de frescura.',
      fk_estado_incumplimiento: EstadoIncumplimiento.NoJustificado,
    },
    penalizacion: { id_penalizacion: 205, fk_incumplimiento: 105, monto_penalizacion: 5000.00, fk_estado_pago: EstadoPago.Retenido }
  },
  {
    id: 6,
    proveedor: { clave_proveedor: 7777, nombre_proveedor: 'JACOBO GUTIERREZ FABIOLA', rfc: 'GUFJ890505XYZ', domicilio: 'AV. DE LOS LACTEOS 321', registro: 6655 },
    ordenCompra: { 
      id_oc: 10400067, orden_compra: 'OC/A/10400067', fk_contrato: 108,
      solicitud: 1999,
      fecha_elaboracion: '2025-07-15',
      fecha_envio: '2025-07-15',
      fondeo: 'LPL 76/2023',
      suministro: 'Agosto/2025',
      tiempo_entrega_dias: 15,
      observaciones: 'ABARROTES VARIOS',
      u_hospitalaria: 5, u_resp: 5, prog: 7, partida: 2212,
      detalles: [{ codigo: 'AB-010', cantidad: 39, unidad: 'CAJA', descripcion: 'ACEITE COMESTIBLE 928ML', precio_unitario: 928, importe_total: 36192 }]
     },
    incumplimiento: {
      id_incumplimiento: 106, fk_entrada: 6, fk_tipo_incumplimiento: TipoIncumplimiento.AtrasoEntrega,
      fecha_deteccion: '2025-08-03', dias_atraso_calculado: 4, descripcion_hechos: 'Retraso de 4 días en la entrega de abarrotes.',
      fk_estado_incumplimiento: EstadoIncumplimiento.ProcedeSancion,
    }
  },
    {
    id: 7,
    proveedor: { clave_proveedor: 3333, nombre_proveedor: 'NUÑEZ DE LA O ALFONSO', rfc: 'NUAO900303DEF', domicilio: 'CALLE FALSA 123', registro: 5678 },
    ordenCompra: { 
      id_oc: 10400057, orden_compra: 'OC/A/10400057', fk_contrato: 104,
      solicitud: 1976,
      fecha_elaboracion: '2025-06-01',
      fecha_envio: '2025-06-01',
      fondeo: 'PRESUPUESTO GHI/2025',
      suministro: 'Julio/2025',
      tiempo_entrega_dias: 23,
      observaciones: 'PESCADOS Y MARISCOS',
      u_hospitalaria: 3, u_resp: 3, prog: 3, partida: 2223,
      detalles: [{ codigo: 'PES-003', cantidad: 170, unidad: 'KG', descripcion: 'HUACHINANGO TROZO S/ESPINAS', precio_unitario: 200, importe_total: 34000 }]
     },
    incumplimiento: {
      id_incumplimiento: 107, fk_entrada: 7, fk_tipo_incumplimiento: TipoIncumplimiento.EntregaIncompleta,
      fecha_deteccion: '2025-06-25', dias_atraso_calculado: 0, descripcion_hechos: 'Se recibieron 150kg en lugar de los 170kg solicitados. Faltante de 20kg.',
      fk_estado_incumplimiento: EstadoIncumplimiento.Detectado,
    }
  },
];
