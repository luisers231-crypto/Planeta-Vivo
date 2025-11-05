import React, { useState, useEffect, useCallback } from 'react';
import { generateHangmanWord } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';

const Ahorcado: React.FC = () => {
    const [word, setWord] = useState<string>('');
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [wrongGuesses, setWrongGuesses] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const maxWrongGuesses = 6;
    const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

    const startNewGame = useCallback(async () => {
        setIsLoading(true);
        setGuessedLetters([]);
        setWrongGuesses(0);
        const newWord = await generateHangmanWord();
        setWord(newWord);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        startNewGame();
    }, [startNewGame]);

    const handleGuess = (letter: string) => {
        if (guessedLetters.includes(letter)) return;

        const newGuessedLetters = [...guessedLetters, letter];
        setGuessedLetters(newGuessedLetters);

        if (!word.includes(letter)) {
            setWrongGuesses(wrongGuesses + 1);
        }
    };

    const isGameWon = word ? word.split('').every(letter => guessedLetters.includes(letter)) : false;
    const isGameLost = wrongGuesses >= maxWrongGuesses;
    const isGameOver = isGameWon || isGameLost;

    const WordDisplay = () => (
        <div className="flex gap-2 sm:gap-4 justify-center text-3xl sm:text-5xl font-bold tracking-widest my-8">
            {word.split('').map((letter, index) => (
                <span key={index} className="w-10 h-14 sm:w-12 sm:h-16 flex items-center justify-center border-b-4 border-slate-400">
                    {guessedLetters.includes(letter) ? letter : ''}
                </span>
            ))}
        </div>
    );

    const Keyboard = () => (
        <div className="flex flex-wrap gap-2 justify-center max-w-2xl">
            {alphabet.map(letter => (
                <button
                    key={letter}
                    onClick={() => handleGuess(letter)}
                    disabled={guessedLetters.includes(letter) || isGameOver}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg shadow-md font-bold text-lg sm:text-xl text-teal-700 hover:bg-teal-100 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors"
                >
                    {letter}
                </button>
            ))}
        </div>
    );

    if (isLoading) {
        return <div className="flex flex-col items-center"><h2 className="text-3xl font-bold text-teal-800 mb-4">Ahorcado</h2><LoadingSpinner /></div>;
    }

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-teal-800 mb-4">Ahorcado</h2>
            <p className="text-slate-600 mb-4">Intentos restantes: {maxWrongGuesses - wrongGuesses}</p>
            <WordDisplay />
            {isGameOver ? (
                <div className="text-center">
                    <p className={`text-3xl font-bold ${isGameWon ? 'text-green-600' : 'text-red-600'}`}>
                        {isGameWon ? '¡Felicidades, ganaste!' : '¡Oh no, perdiste!'}
                    </p>
                    {!isGameWon && <p className="text-xl mt-2">La palabra era: <span className="font-bold">{word}</span></p>}
                    <button onClick={startNewGame} className="mt-6 bg-teal-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-700 transition-colors">
                        Jugar de Nuevo
                    </button>
                </div>
            ) : (
                <Keyboard />
            )}
        </div>
    );
};

export default Ahorcado;