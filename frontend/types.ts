
export enum EstadoIncumplimiento {
  Detectado = 1,
  Justificado = 2,
  NoJustificado = 3,
  ProcedeSancion = 4,
  Cancelado = 5,
}

export enum TipoIncumplimiento {
  AtrasoEntrega = 1,
  CalidadDeficiente = 2,
  EntregaIncompleta = 3,
}

// New Enums for RFs
export enum EstadoPago {
  Pendiente = 1,
  Pagado = 2,
  Retenido = 3,
}

export enum EstadoAclaracion {
  SinPresentar = 0,
  Presentada = 1,
  EnRevision = 2,
  Resuelta = 3,
}

export enum TipoResolucion {
  Procede = 1, // Justifies the non-compliance, cancels penalty
  NoProcede = 2, // Upholds the penalty
}

// New Interfaces for RFs
export interface Aclaracion {
  id_aclaracion: number;
  fk_incumplimiento: number;
  fecha_presentacion: string;
  argumento_proveedor: string;
  documento_adjunto_url?: string;
  fk_estado_aclaracion: EstadoAclaracion;
  resolucion?: {
    fecha_resolucion: string;
    dictamen: string;
    fk_tipo_resolucion: TipoResolucion;
    usuario_revisor: string;
  };
}


export interface Proveedor {
  clave_proveedor: number;
  nombre_proveedor: string;
  rfc: string;
  domicilio: string;
  telefono?: string;
  registro: number;
}

export interface DetalleOrdenCompra {
  codigo: string;
  cantidad: number;
  unidad: string;
  descripcion: string;
  precio_unitario: number;
  importe_total: number;
}

export interface OrdenCompra {
  id_oc: number;
  orden_compra: string;
  fk_contrato: number;
  importe_total: number;
  solicitud: number;
  fecha_elaboracion: string;
  fecha_envio: string;
  fondeo: string;
  suministro: string;
  tiempo_entrega_dias: number;
  observaciones: string;
  u_hospitalaria: number;
  u_resp: number;
  prog: number;
  partida: number;
  detalles: DetalleOrdenCompra[];
  fecha_vencimiento: string; // RF-001
}

export interface Incumplimiento {
  id_incumplimiento: number;
  fk_entrada: number;
  fk_tipo_incumplimiento: TipoIncumplimiento;
  fecha_deteccion: string;
  dias_atraso_calculado: number;
  descripcion_hechos: string;
  fk_estado_incumplimiento: EstadoIncumplimiento;
}

export interface Penalizacion {
    id_penalizacion: number;
    fk_incumplimiento: number;
    monto_penalizacion: number;
    fk_estado_pago?: EstadoPago; // RF-009
    porcentaje_penalizacion?: number; // RF-004
}

// Combined type for reporting purposes
export interface IncumplimientoReporte {
  id: number;
  proveedor: Proveedor;
  ordenCompra: OrdenCompra;
  incumplimiento: Incumplimiento;
  penalizacion?: Penalizacion;
  aclaracion?: Aclaracion; // RF-007, RF-008
}

export interface SummaryStats {
    totalIncumplimientos: number;
    totalPenalizado: number;
    proveedorConMasIncumplimientos: string;
    promedioDiasAtraso: number;
}
