import React, { useState } from 'react';
import { IncumplimientoReporte, EstadoPago, Aclaracion, TipoResolucion } from '../types';
import { DocumentMagnifyingGlassIcon, ChatBubbleLeftRightIcon, DocumentTextIcon, CheckCircleIcon, XCircleIcon, GavelIcon, TimeIcon } from './Icons';
import StatusPill from './StatusPill';

interface ComplianceDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    reportItem: IncumplimientoReporte;
}

const getTipoText = (tipo: number): string => {
    switch (tipo) {
        case 1: return 'Atraso en Entrega';
        case 2: return 'Calidad Deficiente';
        case 3: return 'Entrega Incompleta';
        default: return 'Desconocido';
    }
};

const getEstadoPagoText = (estado?: EstadoPago): string => {
    if(!estado) return 'N/A';
    switch (estado) {
        case EstadoPago.Pendiente: return 'Pendiente';
        case EstadoPago.Pagado: return 'Pagado';
        case EstadoPago.Retenido: return 'Retenido';
        default: return 'Desconocido';
    }
}

const TabButton: React.FC<{ icon: React.ReactNode; text: string; isActive: boolean; onClick: () => void; }> = ({ icon, text, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
            isActive
                ? 'border-primary-main text-primary-main bg-primary-light'
                : 'border-transparent text-on-surface-secondary hover:text-on-surface hover:border-slate-300'
        }`}
    >
        {icon}
        <span>{text}</span>
    </button>
);

const DetailsTab: React.FC<{ reportItem: IncumplimientoReporte }> = ({ reportItem }) => {
    const { incumplimiento, penalizacion, ordenCompra } = reportItem;

    const handleNotify = () => {
        alert(`(Simulación) Se ha enviado una notificación por correo electrónico al proveedor ${reportItem.proveedor.nombre_proveedor} sobre la penalización.`);
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-on-surface mb-2">Detalles del Incumplimiento</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-lg">
                    <div className="font-semibold text-slate-500">Tipo de Incumplimiento:</div>
                    <div className="text-on-surface">{getTipoText(incumplimiento.fk_tipo_incumplimiento)}</div>
                    
                    <div className="font-semibold text-slate-500">Fecha de Detección:</div>
                    <div className="text-on-surface">{incumplimiento.fecha_deteccion}</div>
                    
                    <div className="font-semibold text-slate-500">Fecha de Vencimiento:</div>
                    <div className="text-on-surface">{ordenCompra.fecha_vencimiento}</div>

                    <div className="font-semibold text-slate-500">Días de Atraso Calculado:</div>
                    <div className="text-on-surface font-bold">{incumplimiento.dias_atraso_calculado}</div>

                    <div className="font-semibold text-slate-500 col-span-2">Descripción de los Hechos:</div>
                    <div className="text-on-surface col-span-2 bg-white p-2 border rounded-md">{incumplimiento.descripcion_hechos}</div>
                    
                    <div className="font-semibold text-slate-500">Estado del Incumplimiento:</div>
                    <div><StatusPill status={incumplimiento.fk_estado_incumplimiento} /></div>
                </div>
            </div>

            {penalizacion && (
                 <div>
                    <h3 className="text-lg font-bold text-on-surface mb-2">Información de la Penalización (RF-004, RF-005, RF-009)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-orange-50 p-4 rounded-lg">
                        <div className="font-semibold text-slate-500">Monto de Penalización:</div>
                        <div className="text-error-dark font-bold text-lg">{`$${penalizacion.monto_penalizacion.toLocaleString('en-US')}`}</div>
                        
                        <div className="font-semibold text-slate-500">Porcentaje Aplicado:</div>
                        <div className="text-on-surface">{penalizacion.porcentaje_penalizacion ? `${penalizacion.porcentaje_penalizacion}%` : 'N/A'}</div>

                        <div className="font-semibold text-slate-500">Estado del Pago:</div>
                        <div className="text-on-surface font-semibold">{getEstadoPagoText(penalizacion.fk_estado_pago)}</div>
                    </div>
                </div>
            )}

            <div className="pt-4 border-t">
                 <button 
                    onClick={handleNotify}
                    className="bg-primary-main text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
                >
                    Notificar Proveedor (RF-006)
                </button>
            </div>
        </div>
    );
};

const ClarificationTimelineStep: React.FC<{icon: React.ReactNode, title: string, date: string, children: React.ReactNode, isLast?: boolean}> = ({icon, title, date, children, isLast = false}) => (
    <div className="flex">
        <div className="flex flex-col items-center mr-4">
            <div>
                <div className="flex items-center justify-center w-10 h-10 bg-primary-light rounded-full ring-4 ring-white" style={{textShadow: '0 0 10px white'}}>
                    {icon}
                </div>
            </div>
            {!isLast && <div className="w-px h-full bg-border-color"/>}
        </div>
        <div className="pb-8">
            <p className="mb-1 text-sm font-semibold text-on-surface">{title} <span className="font-normal text-on-surface-secondary">- {date}</span></p>
            <div className="text-sm text-on-surface-secondary">{children}</div>
        </div>
    </div>
);


const ClarificationTab: React.FC<{ aclaracion?: Aclaracion }> = ({ aclaracion }) => {
    if (!aclaracion) {
        return (
            <div className="text-center py-10">
                <p className="text-on-surface-secondary">No se ha presentado ninguna aclaración para este incumplimiento.</p>
            </div>
        );
    }
    
    const { resolucion } = aclaracion;

    return (
        <div>
            <h3 className="text-lg font-bold text-on-surface mb-4">Flujo de Aclaración y Resolución (RF-007, RF-008)</h3>
            <div className="p-4">
                <ClarificationTimelineStep icon={<ChatBubbleLeftRightIcon className="w-5 h-5 text-primary-main"/>} title="Aclaración Presentada por Proveedor" date={aclaracion.fecha_presentacion}>
                    <p className="font-semibold mb-1">Argumento:</p>
                    <p className="mb-2 p-2 bg-slate-100 rounded-md">"{aclaracion.argumento_proveedor}"</p>
                    {aclaracion.documento_adjunto_url && (
                        <a href={aclaracion.documento_adjunto_url} target="_blank" rel="noopener noreferrer" className="text-primary-main hover:underline">Ver documento adjunto</a>
                    )}
                </ClarificationTimelineStep>
                
                {resolucion && (
                    <ClarificationTimelineStep isLast icon={<GavelIcon className="w-5 h-5 text-primary-main"/>} title={`Resolución Emitida por ${resolucion.usuario_revisor}`} date={resolucion.fecha_resolucion}>
                        {resolucion.fk_tipo_resolucion === TipoResolucion.Procede ? (
                          <div className="flex items-center space-x-2 font-bold mb-2 text-success-dark">
                              <CheckCircleIcon className="w-5 h-5"/>
                              <span>Aclaración Procede (Justificado)</span>
                          </div>
                        ) : (
                           <div className="flex items-center space-x-2 font-bold mb-2 text-error-dark">
                             <XCircleIcon className="w-5 h-5" />
                             <span>Aclaración No Procede (Se mantiene sanción)</span>
                           </div>
                        )}
                        <p className="font-semibold mb-1">Dictamen:</p>
                        <p className="p-2 bg-slate-100 rounded-md">"{resolucion.dictamen}"</p>
                    </ClarificationTimelineStep>
                )}
                 {!resolucion && (
                     <ClarificationTimelineStep isLast icon={<TimeIcon className="w-5 h-5 text-primary-main"/>} title="En Revisión" date={new Date().toISOString().split('T')[0]}>
                        <p>La aclaración está siendo revisada por el área correspondiente.</p>
                    </ClarificationTimelineStep>
                 )}
            </div>
        </div>
    );
};


const PurchaseOrderTab: React.FC<{ reportItem: IncumplimientoReporte }> = ({ reportItem }) => {
    const { ordenCompra, proveedor } = reportItem;
    const subtotal = ordenCompra.detalles.reduce((sum, item) => sum + item.importe_total, 0);
    const iva = subtotal * 0.16;
    const ieps = 52.00;
    const total = subtotal + iva + ieps;

    return (
        <div className="p-2 sm:p-8 relative">
              {/* Header */}
              <div className="grid grid-cols-12 gap-2 mb-4">
                  <div className="col-span-2 flex items-center justify-center border border-black">
                      <img src="https://tse2.mm.bing.net/th/id/OIP.2EV-0BsZkOqjaivqrhXD9gHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Logo" className="h-20 w-20 object-contain" />
                  </div>
                  <div className="col-span-7 text-center py-2 flex flex-col justify-center">
                      <h1 className="font-bold text-base">ORGANISMO PUBLICO DESENTRALIZADO</h1>
                      <h2 className="font-bold text-base">HOSPITAL CIVIL DE GUADALAJARA</h2>
                      <h3 className="font-bold text-base">DIRECCION GENERAL</h3>
                  </div>
                  <div className="col-span-3 border border-black p-1 text-center flex flex-col justify-around">
                      <div>
                          <p className="font-bold text-sm">FORMA DE ORDEN</p>
                          <p className="font-bold text-sm">DE COMPRA</p>
                      </div>
                      <p className="text-sm mt-2">{ordenCompra.orden_compra}</p>
                  </div>
              </div>

              {/* Info Section */}
              <div className="grid grid-cols-12 gap-2 text-sm mb-4">
                  {/* Left Block */}
                  <div className="col-span-8">
                      <div className="border-l border-r border-t border-black h-full flex flex-col">
                          <div className="flex border-b border-black"><div className="w-1/4 font-semibold text-slate-500 text-xs uppercase p-1 border-r border-black">PROVEEDOR</div><div className="p-1 flex-1">{proveedor.nombre_proveedor}</div></div>
                          <div className="flex border-b border-black"><div className="w-1/4 font-semibold text-slate-500 text-xs uppercase p-1 border-r border-black">DOMICILIO</div><div className="p-1 flex-1">{proveedor.domicilio}</div></div>
                          <div className="flex border-b border-black">
                              <div className="w-1/2 flex"><div className="w-1/2 font-semibold text-slate-500 text-xs uppercase p-1 border-r border-black">TELEFONO</div><div className="p-1 flex-1">{proveedor.telefono || 'N/A'}</div></div>
                              <div className="w-1/2 flex border-l border-black"><div className="w-1/2 font-semibold text-slate-500 text-xs uppercase p-1 border-r border-black">REGISTRO</div><div className="p-1 flex-1">{proveedor.registro}</div></div>
                          </div>
                          <div className="flex border-b border-black"><div className="w-1/4 font-semibold text-slate-500 text-xs uppercase p-1 border-r border-black">ENTREGAR EN</div><div className="p-1 flex-1">ALMACEN DEL NUEVO HOSPITAL CIVIL DE GUADALAJARA, SALVADOR QUEVEDO Y ZUBIETA NO. 750 S.L.</div></div>
                          <div className="flex border-b border-black">
                              <div className="w-1/2 flex"><div className="w-1/2 font-semibold text-slate-500 text-xs uppercase p-1 border-r border-black">SUMINISTRO</div><div className="p-1 flex-1">{ordenCompra.suministro}</div></div>
                              <div className="w-1/2 flex border-l border-black"><div className="w-1/2 font-semibold text-slate-500 text-xs uppercase p-1 border-r border-black">T.E.</div><div className="p-1 flex-1">{ordenCompra.tiempo_entrega_dias} DIAS</div></div>
                          </div>
                          <div className="flex border-b border-black flex-grow"><div className="w-1/4 font-semibold text-slate-500 text-xs uppercase p-1 border-r border-black">OBSERVACIONES</div><div className="p-1 flex-1">{ordenCompra.observaciones}</div></div>
                      </div>
                  </div>
                  {/* Right Block */}
                  <div className="col-span-4">
                      <div className="border-l border-r border-t border-black h-full flex flex-col">
                          <div className="flex border-b border-black">
                              <div className="w-1/2 flex"><div className="w-1/2 font-semibold text-slate-500 text-xs uppercase p-1 border-r border-black">F.ELABORACION</div><div className="p-1 flex-1">{ordenCompra.fecha_elaboracion}</div></div>
                              <div className="w-1/2 flex border-l border-black"><div className="w-1/2 font-semibold text-slate-500 text-xs uppercase p-1 border-r border-black">SOLICITUD</div><div className="p-1 flex-1">{ordenCompra.solicitud}</div></div>
                          </div>
                          <div className="flex border-b border-black">
                              <div className="w-1/2 flex"><div className="w-1/2 font-semibold text-slate-500 text-xs uppercase p-1 border-r border-black">F. ENVIO</div><div className="p-1 flex-1">{ordenCompra.fecha_envio}</div></div>
                              <div className="w-1/2 p-1 border-l border-black"></div>
                          </div>
                          <div className="flex border-b border-black"><div className="w-1/2 font-semibold text-slate-500 text-xs uppercase p-1 border-r border-black">FONDEO</div><div className="p-1 flex-1">{ordenCompra.fondeo}</div></div>
                          <div className="flex border-b border-black"><div className="w-1/2 font-semibold text-slate-500 text-xs uppercase p-1 border-r border-black">SERVICIO SOLICITANTE</div><div className="p-1 flex-1">DIETOLOGIA JIM</div></div>
                          <div className="flex border-b border-black flex-grow"><div className="w-1/2 font-semibold text-slate-500 text-xs uppercase p-1 border-r border-black">OBSERVACIONES TIEMPO ENTREGA</div><div className="p-1 flex-1"></div></div>
                      </div>
                  </div>
              </div>
        </div>
    );
};


export const ComplianceDetailModal: React.FC<ComplianceDetailModalProps> = ({ isOpen, onClose, reportItem }) => {
    const [activeTab, setActiveTab] = useState('details');

    if (!isOpen) return null;

    const printPage = () => {
        window.print();
    };
    
    // Reset tab when modal opens with new item
    React.useEffect(() => {
        setActiveTab('details');
    }, [reportItem.id]);


    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center p-4 z-50 no-print">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col animate-scaleIn">
                <div className="p-4 flex justify-between items-center border-b">
                     <h2 className="text-lg font-bold text-on-surface">Detalle del Incumplimiento: #{reportItem.id}</h2>
                     <div>
                        <button onClick={printPage} className="mr-2 py-2 px-4 bg-slate-100 text-on-surface-secondary rounded hover:bg-slate-200 transition-colors">Imprimir</button>
                        <button onClick={onClose} className="py-2 px-4 bg-error-main text-white rounded hover:bg-error-dark transition-colors">Cerrar</button>
                    </div>
                </div>
                
                <div className="border-b border-border-color px-4">
                    <nav className="flex space-x-2">
                        <TabButton text="Detalles del Incumplimiento" icon={<DocumentMagnifyingGlassIcon className="w-5 h-5"/>} isActive={activeTab === 'details'} onClick={() => setActiveTab('details')} />
                        <TabButton text="Flujo de Aclaraciones" icon={<ChatBubbleLeftRightIcon className="w-5 h-5"/>} isActive={activeTab === 'clarifications'} onClick={() => setActiveTab('clarifications')} />
                        <TabButton text="Orden de Compra" icon={<DocumentTextIcon className="w-5 h-5"/>} isActive={activeTab === 'po'} onClick={() => setActiveTab('po')} />
                    </nav>
                </div>

                <div className="p-6 overflow-y-auto flex-grow">
                   <div className={activeTab === 'details' ? '' : 'hidden'}>
                        <DetailsTab reportItem={reportItem} />
                   </div>
                   <div className={activeTab === 'clarifications' ? '' : 'hidden'}>
                        <ClarificationTab aclaracion={reportItem.aclaracion} />
                   </div>
                    <div className={`${activeTab === 'po' ? '' : 'hidden'} print-area`}>
                        <PurchaseOrderTab reportItem={reportItem} />
                   </div>
                </div>
            </div>
        </div>
    );
};