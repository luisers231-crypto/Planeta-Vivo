import { GoogleGenAI, Type } from "@google/genai";
import { FeudRound, JeopardyCategory } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateEducationalContent(topic: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      // Fix: Updated prompt to request HTML instead of Markdown for direct rendering in the component.
      contents: `Escribe una descripción educativa y atractiva sobre "${topic}" para niños de 10 a 12 años. Estructura la respuesta en HTML, usando etiquetas como <h2>, <ul>, <li> y <strong> para que sea fácil de leer.`,
    });
    return response.text;
  } catch (error) {
    console.error("Error al generar contenido educativo:", error);
    return "Hubo un error al generar el contenido. Por favor, inténtalo de nuevo.";
  }
}

export async function generateHangmanWord(): Promise<string> {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: 'Dame una sola palabra en español, de dificultad media, para un juego de ahorcado. La palabra debe ser sobre ciencia o naturaleza. No incluyas ninguna explicación, solo la palabra.',
        });
        return response.text.trim().toUpperCase();
    } catch (error) {
        console.error("Error al generar palabra para Ahorcado:", error);
        return "NATURALEZA"; // Fallback word
    }
}


export async function generateJeopardyBoard(): Promise<JeopardyCategory[]> {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Genera un tablero de Jeopardy para niños con 5 categorías y 4 preguntas por categoría. Los temas deben ser sobre ciencia, historia, geografía y animales. Los puntos deben ser 100, 200, 300, 400. Devuelve un JSON válido.",
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING },
                            questions: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        question: { type: Type.STRING },
                                        answer: { type: Type.STRING },
                                        points: { type: Type.INTEGER },
                                    },
                                    required: ["question", "answer", "points"],
                                },
                            },
                        },
                        required: ["title", "questions"],
                    },
                },
            },
        });
        const parsedResponse = JSON.parse(response.text);
        // Add revealed property to each question
        return parsedResponse.map((category: any) => ({
            ...category,
            questions: category.questions.map((q: any) => ({...q, revealed: false }))
        }));
    } catch (error) {
        console.error("Error al generar tablero de Jeopardy:", error);
        // Return a fallback board
        return [
            { title: "Animales", questions: [{ question: "Rey de la selva", answer: "León", points: 100, revealed: false }] },
            { title: "Ciencia", questions: [{ question: "H2O es...", answer: "Agua", points: 100, revealed: false }] }
        ];
    }
}

export async function generateFamilyFeudRound(): Promise<FeudRound> {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Crea una pregunta de encuesta para un juego tipo "100 Mexicanos Dijeron" (Family Feud) y 5 respuestas populares con sus puntos. El tema debe ser escolar o educativo. El total de puntos no debe sumar exactamente 100. Devuelve un JSON válido.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        question: { type: Type.STRING },
                        answers: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    answer: { type: Type.STRING },
                                    points: { type: Type.INTEGER },
                                },
                                required: ["answer", "points"],
                            },
                        },
                    },
                    required: ["question", "answers"],
                },
            },
        });
        return JSON.parse(response.text);
    } catch (error) {
        console.error("Error al generar ronda de 100 Galileanos:", error);
        return {
            question: "Menciona algo que usas en la escuela",
            answers: [
                { answer: "Lápiz", points: 30 },
                { answer: "Libro", points: 25 },
                { answer: "Mochila", points: 20 },
                { answer: "Cuaderno", points: 15 },
                { answer: "Goma", points: 10 },
            ]
        };
    }
}