import React from 'react';
import { GameView } from '../types';

interface MainMenuProps {
    onSelectView: (view: GameView) => void;
}

// Fix: Changed icon type from JSX.Element to React.ReactNode to resolve "Cannot find namespace 'JSX'" error.
const MenuCard: React.FC<{ title: string; description: string; onClick: () => void; icon: React.ReactNode; }> = ({ title, description, onClick, icon }) => (
    <button
        onClick={onClick}
        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out text-left flex flex-col justify-between"
    >
        <div>
            <div className="text-teal-500 mb-3">{icon}</div>
            <h3 className="text-xl font-bold text-slate-800">{title}</h3>
            <p className="text-slate-500 mt-1">{description}</p>
        </div>
    </button>
);


const MainMenu: React.FC<MainMenuProps> = ({ onSelectView }) => {
    const menuItems = [
        {
            view: 'seres-vivos' as GameView,
            title: 'Explora los Seres Vivos',
            description: 'Aprende sobre la vida en la Tierra con ayuda de IA.',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.747h18" /></svg>
        },
        {
            view: 'tres-en-raya' as GameView,
            title: 'Tres en Raya',
            description: 'El clásico juego de estrategia. ¿Puedes ganar?',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
        },
        {
            view: 'ahorcado' as GameView,
            title: 'Ahorcado',
            description: 'Adivina la palabra secreta antes de que sea tarde.',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        },
        {
            view: 'jeopardy' as GameView,
            title: 'Jeopardy',
            description: 'Pon a prueba tus conocimientos en varias categorías.',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        },
        {
            view: 'cien-galileanos' as GameView,
            title: '100 Galileanos Dicen',
            description: 'Adivina las respuestas más populares a las encuestas.',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map(item => (
                <MenuCard 
                    key={item.view}
                    title={item.title}
                    description={item.description}
                    onClick={() => onSelectView(item.view)}
                    icon={item.icon}
                />
            ))}
        </div>
    );
};

export default MainMenu;