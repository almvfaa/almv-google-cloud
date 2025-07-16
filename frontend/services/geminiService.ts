
import { GoogleGenAI } from "@google/genai";
import { IncumplimientoReporte } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const analyzeComplianceData = async (data: IncumplimientoReporte[]): Promise<string> => {
  if (!API_KEY) {
    return "Error: La clave de API de Gemini no está configurada. Por favor, configure la variable de entorno API_KEY.";
  }

  const simplifiedData = data.map(item => ({
    proveedor: item.proveedor.nombre_proveedor,
    tipo_incumplimiento: item.incumplimiento.fk_tipo_incumplimiento,
    dias_atraso: item.incumplimiento.dias_atraso_calculado,
    monto_penalizado: item.penalizacion?.monto_penalizacion || 0,
    estado: item.incumplimiento.fk_estado_incumplimiento
  }));

  const prompt = `
    Eres un analista experto en cadenas de suministro y adquisiciones.
    A continuación se presenta un conjunto de datos en formato JSON sobre incumplimientos de proveedores.

    Leyenda de los códigos:
    - tipo_incumplimiento: 1=Atraso en Entrega, 2=Calidad Deficiente, 3=Entrega Incompleta
    - estado: 1=Detectado, 2=Justificado, 3=No Justificado, 4=Procede Sanción, 5=Cancelado

    Datos:
    ${JSON.stringify(simplifiedData, null, 2)}

    Por favor, analiza estos datos y proporciona un resumen ejecutivo en español. Tu análisis debe incluir:
    1.  Un resumen general de la situación de incumplimientos.
    2.  Identificación del proveedor(es) con más incidentes.
    3.  El tipo de incumplimiento más común y su posible impacto.
    4.  Una recomendación clave para mejorar la gestión de proveedores basada en estos datos.

    Formatea tu respuesta en un texto claro y conciso, utilizando viñetas o párrafos cortos. No incluyas el JSON original en tu respuesta.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            temperature: 0.3
        }
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if(error instanceof Error) {
        return `Error al analizar los datos con IA: ${error.message}`;
    }
    return "Error al analizar los datos con IA. Ocurrió un error desconocido.";
  }
};