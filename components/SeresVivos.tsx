import React, { useState, useCallback } from 'react';
import { generateEducationalContent } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';

const SeresVivos: React.FC = () => {
    const [topic, setTopic] = useState('los animales');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateContent = useCallback(async () => {
        if (!topic) return;
        setIsLoading(true);
        setContent('');
        const generatedContent = await generateEducationalContent(topic);
        setContent(generatedContent);
        setIsLoading(false);
    }, [topic]);

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-teal-800 mb-4">Explora el Mundo de los Seres Vivos</h2>
            <p className="text-slate-600 mb-6 text-center max-w-2xl">
                Escribe un tema sobre el que quieras aprender (por ejemplo, "las plantas", "los insectos", "los mamíferos marinos") y deja que la IA te enseñe algo nuevo.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 mb-6 w-full max-w-md">
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Ej: los reptiles"
                    className="flex-grow p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
                <button
                    onClick={handleGenerateContent}
                    disabled={isLoading || !topic}
                    className="bg-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex justify-center items-center"
                >
                    {isLoading ? 'Generando...' : 'Generar Contenido'}
                </button>
            </div>
            
            {isLoading && <LoadingSpinner />}
            
            {content && (
                <div 
                  className="prose prose-teal lg:prose-xl max-w-4xl w-full bg-slate-50 p-6 rounded-lg shadow-inner"
                  // Fix: Removed .replace(/\n/g, '<br />') as the content is now valid HTML from the API.
                  dangerouslySetInnerHTML={{ __html: content }}
                />
            )}
        </div>
    );
};

export default SeresVivos;