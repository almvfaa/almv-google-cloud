import React, { useState, useCallback } from 'react';
import { analyzeComplianceData } from '../services/geminiService';
import { IncumplimientoReporte } from '../types';
import { SparklesIcon } from './Icons';


const GeminiAnalysis: React.FC<{ data: IncumplimientoReporte[] }> = ({ data }) => {
    const [analysis, setAnalysis] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnalysis = useCallback(async () => {
        setLoading(true);
        setError(null);
        setAnalysis('');
        try {
            const result = await analyzeComplianceData(data);
            setAnalysis(result);
        } catch (e: any) {
            setError(e.message || 'Ocurrió un error al generar el análisis.');
        } finally {
            setLoading(false);
        }
    }, [data]);

    const ShimmerLoader = () => (
        <div className="space-y-4">
            <div className="h-4 bg-slate-200 rounded w-3/4 animate-shimmer"></div>
            <div className="space-y-2">
                <div className="h-4 bg-slate-200 rounded animate-shimmer"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6 animate-shimmer"></div>
            </div>
            <div className="h-4 bg-slate-200 rounded w-1/2 animate-shimmer"></div>
             <div className="space-y-2">
                <div className="h-4 bg-slate-200 rounded animate-shimmer"></div>
                <div className="h-4 bg-slate-200 rounded w-4/6 animate-shimmer"></div>
            </div>
        </div>
    );

    return (
        <div className="bg-surface p-4 rounded-xl border border-border-color h-96 flex flex-col transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-on-surface">Análisis con IA de Gemini</h3>
                <button
                    onClick={handleAnalysis}
                    disabled={loading}
                    className="flex items-center bg-primary-main text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed transform hover:scale-105"
                >
                    <SparklesIcon />
                    {loading ? 'Analizando...' : 'Generar Análisis'}
                </button>
            </div>
            <div className="flex-grow bg-slate-50 rounded-md p-4 overflow-y-auto prose prose-sm max-w-none prose-p:text-on-surface-secondary prose-headings:text-on-surface prose-strong:text-on-surface">
                {loading && <ShimmerLoader />}
                {error && <p className="text-red-500">{error}</p>}
                {analysis ? (
                     <div className="animate-fadeInUp" dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br />').replace(/(\d\.)/g, '<br/><strong>$1</strong>') }} />
                ) : (
                    !loading && <p className="text-on-surface-secondary text-center">Haga clic en "Generar Análisis" para obtener un resumen ejecutivo y recomendaciones de la IA.</p>
                )}
            </div>
        </div>
    );
};

export default GeminiAnalysis;