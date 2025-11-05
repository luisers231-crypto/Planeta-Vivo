import React, { useState, useEffect, useCallback } from 'react';
import { FeudRound } from '../types';
import { generateFamilyFeudRound } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';

const CienGalileanos: React.FC = () => {
    const [roundData, setRoundData] = useState<FeudRound | null>(null);
    const [revealedAnswers, setRevealedAnswers] = useState<string[]>([]);
    const [guess, setGuess] = useState('');
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const startNewRound = useCallback(async () => {
        setIsLoading(true);
        setRevealedAnswers([]);
        setScore(0);
        setMessage('');
        setGuess('');
        const data = await generateFamilyFeudRound();
        setRoundData(data);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        startNewRound();
    }, [startNewRound]);

    const handleGuessSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!guess.trim() || !roundData) return;

        const normalizedGuess = guess.trim().toLowerCase();
        const foundAnswer = roundData.answers.find(
            a => a.answer.toLowerCase() === normalizedGuess && !revealedAnswers.includes(a.answer)
        );

        if (foundAnswer) {
            setRevealedAnswers([...revealedAnswers, foundAnswer.answer]);
            setScore(score + foundAnswer.points);
            setMessage('¡Buena respuesta!');
        } else {
            setMessage('Intenta de nuevo.');
        }
        setGuess('');
        setTimeout(() => setMessage(''), 2000);
    };
    
    const revealAll = () => {
        if(!roundData) return;
        setRevealedAnswers(roundData.answers.map(a => a.answer));
    }

    if (isLoading || !roundData) {
        return <div className="flex flex-col items-center"><h2 className="text-3xl font-bold text-teal-800 mb-4">100 Galileanos Dicen</h2><LoadingSpinner /></div>;
    }

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-teal-800 mb-4 text-center">100 Galileanos Dicen</h2>
            <p className="text-2xl text-slate-700 font-semibold mb-6 text-center">{roundData.question}</p>

            <div className="w-full flex flex-col md:flex-row gap-8">
                <div className="flex-1 bg-teal-100 p-4 rounded-lg shadow-lg">
                    {roundData.answers.map((item, index) => (
                        <div key={index} className="flex justify-between items-center bg-white mb-2 p-3 rounded-md shadow text-lg">
                           {revealedAnswers.includes(item.answer) ? (
                                <>
                                    <span className="font-semibold text-slate-800">{item.answer}</span>
                                    <span className="font-bold text-teal-700 bg-teal-200 px-3 py-1 rounded-full">{item.points}</span>
                                </>
                           ) : (
                               <span className="font-semibold text-slate-400">{index + 1}. ?????</span>
                           )}
                        </div>
                    ))}
                </div>
                <div className="w-full md:w-64 flex flex-col items-center">
                    <div className="text-center bg-white p-6 rounded-xl shadow-xl mb-4">
                        <div className="text-lg text-slate-500">Puntuación Total</div>
                        <div className="text-6xl font-bold text-green-600">{score}</div>
                    </div>
                    
                    <form onSubmit={handleGuessSubmit} className="w-full">
                        <input
                            type="text"
                            value={guess}
                            onChange={(e) => setGuess(e.target.value)}
                            placeholder="Escribe tu respuesta"
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                        />
                        <button type="submit" className="w-full mt-2 bg-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors">
                            Adivinar
                        </button>
                    </form>
                    {message && <p className="mt-2 text-center font-semibold">{message}</p>}
                </div>
            </div>
            
             <div className="mt-8 flex gap-4">
                <button onClick={revealAll} className="bg-amber-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-amber-600 transition-colors">
                    Revelar Todo
                </button>
                <button onClick={startNewRound} className="bg-teal-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-700 transition-colors">
                    Nueva Ronda
                </button>
            </div>
        </div>
    );
};

export default CienGalileanos;