import React, { useState, useEffect } from 'react';

type Player = 'X' | 'O';

const TresEnRaya: React.FC = () => {
    const initialBoard = Array(9).fill(null);
    const [board, setBoard] = useState<(Player | null)[]>(initialBoard);
    const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
    const [winner, setWinner] = useState<Player | 'Empate' | null>(null);

    const checkWinner = (currentBoard: (Player | null)[]) => {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
                return currentBoard[a];
            }
        }
        if (currentBoard.every(square => square !== null)) {
            return 'Empate';
        }
        return null;
    };

    const handleClick = (index: number) => {
        if (board[index] || winner) return;
        
        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);
        
        const newWinner = checkWinner(newBoard);
        if (newWinner) {
            setWinner(newWinner);
        } else {
            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        }
    };

    const resetGame = () => {
        setBoard(initialBoard);
        setCurrentPlayer('X');
        setWinner(null);
    };

    const Square: React.FC<{ value: Player | null, onClick: () => void }> = ({ value, onClick }) => (
        <button 
            onClick={onClick} 
            className={`w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-lg shadow-md flex items-center justify-center text-5xl font-bold transition-transform transform hover:scale-105 ${
                value === 'X' ? 'text-cyan-600' : 'text-amber-600'
            }`}
        >
            {value}
        </button>
    );

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-teal-800 mb-4">Tres en Raya</h2>
            <div className="grid grid-cols-3 gap-3 p-3 bg-teal-100 rounded-xl shadow-lg">
                {board.map((value, index) => (
                    <Square key={index} value={value} onClick={() => handleClick(index)} />
                ))}
            </div>
            <div className="mt-6 text-center">
                {winner ? (
                    <p className="text-2xl font-semibold text-green-600">
                        {winner === 'Empate' ? '¡Es un empate!' : `¡El ganador es ${winner}!`}
                    </p>
                ) : (
                    <p className="text-2xl font-semibold text-slate-700">
                        Turno de: <span className={currentPlayer === 'X' ? 'text-cyan-600' : 'text-amber-600'}>{currentPlayer}</span>
                    </p>
                )}
                <button onClick={resetGame} className="mt-4 bg-teal-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-700 transition-colors">
                    Jugar de Nuevo
                </button>
            </div>
        </div>
    );
};

export default TresEnRaya;