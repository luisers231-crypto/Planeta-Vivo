import React, { useState, useEffect, useCallback } from 'react';
import { JeopardyCategory, JeopardyQuestion } from '../types';
import { generateJeopardyBoard } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';

const categoryColors = [
    { bg: 'bg-teal-600', hover: 'hover:bg-teal-700', header: 'bg-teal-800' },
    { bg: 'bg-indigo-600', hover: 'hover:bg-indigo-700', header: 'bg-indigo-800' },
    { bg: 'bg-rose-600', hover: 'hover:bg-rose-700', header: 'bg-rose-800' },
    { bg: 'bg-amber-500', hover: 'hover:bg-amber-600', header: 'bg-amber-700' },
];

const Jeopardy: React.FC = () => {
    const [board, setBoard] = useState<JeopardyCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeQuestion, setActiveQuestion] = useState<JeopardyQuestion | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [score, setScore] = useState(0);

    const loadBoard = useCallback(async () => {
        setIsLoading(true);
        setScore(0);
        const newBoard = await generateJeopardyBoard();
        setBoard(newBoard);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        loadBoard();
    }, [loadBoard]);

    const handleQuestionClick = (categoryIndex: number, questionIndex: number) => {
        const question = board[categoryIndex].questions[questionIndex];
        if (question.revealed) return;

        setActiveQuestion(question);
        setShowAnswer(false);

        const newBoard = [...board];
        newBoard[categoryIndex].questions[questionIndex].revealed = true;
        setBoard(newBoard);
    };
    
    const handleScoreUpdate = (points: number) => {
        setScore(prev => prev + points);
        setActiveQuestion(null);
    };

    const QuestionModal: React.FC = () => {
        if (!activeQuestion) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full text-center relative">
                    <button onClick={() => setActiveQuestion(null)} className="absolute top-2 right-4 text-3xl font-bold text-slate-400 hover:text-slate-600">&times;</button>
                    <h3 className="text-xl font-bold text-sky-700 mb-4">Puntos: {activeQuestion.points}</h3>
                    <p className="text-2xl min-h-[100px] flex items-center justify-center">{activeQuestion.question}</p>
                    
                    {showAnswer && <p className="mt-4 text-3xl font-bold text-green-600">{activeQuestion.answer}</p>}

                    <div className="mt-8 flex justify-center gap-4">
                        {!showAnswer ? (
                             <button onClick={() => setShowAnswer(true)} className="bg-amber-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-amber-600">Revelar Respuesta</button>
                        ) : (
                            <>
                               <button onClick={() => handleScoreUpdate(activeQuestion.points)} className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600">Correcto</button>
                               <button onClick={() => handleScoreUpdate(-activeQuestion.points)} className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600">Incorrecto</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    };


    if (isLoading) {
        return <div className="flex flex-col items-center"><h2 className="text-3xl font-bold text-teal-800 mb-4">Jeopardy</h2><LoadingSpinner /></div>;
    }

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-teal-800 mb-2">Jeopardy</h2>
            <p className="text-2xl font-bold mb-4">Puntuación: <span className={score >= 0 ? 'text-green-600' : 'text-red-600'}>{score}</span></p>
            <div className={`grid grid-cols-${board.length} gap-2 w-full`}>
                {board.map((category, catIndex) => {
                    const colors = categoryColors[catIndex % categoryColors.length];
                    return (
                        <div key={catIndex} className="flex flex-col gap-2">
                            <div className={`${colors.header} text-white text-center font-bold p-4 rounded-lg shadow-md h-24 flex items-center justify-center`}>
                                {category.title}
                            </div>
                            {category.questions.map((q, qIndex) => (
                                <button
                                    key={qIndex}
                                    onClick={() => handleQuestionClick(catIndex, qIndex)}
                                    disabled={q.revealed}
                                    className={`${colors.bg} ${colors.hover} text-white text-2xl font-bold p-4 rounded-lg shadow-md h-24 flex items-center justify-center disabled:bg-slate-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
                                >
                                    {q.revealed ? '' : q.points}
                                </button>
                            ))}
                        </div>
                    )
                })}
            </div>
             <button onClick={loadBoard} className="mt-8 bg-teal-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-700 transition-colors">
                Nuevo Tablero
            </button>
            <QuestionModal />
        </div>
    );
};

export default Jeopardy;