import React, { useState } from 'react';
import { GameView } from './types';
import MainMenu from './components/MainMenu';
import Header from './components/Header';
import SeresVivos from './components/SeresVivos';
import TresEnRaya from './components/TresEnRaya';
import Ahorcado from './components/Ahorcado';
import Jeopardy from './components/Jeopardy';
import CienGalileanos from './components/CienGalileanos';
import BackButton from './components/BackButton';

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<GameView>('menu');

    const renderView = () => {
        switch (currentView) {
            case 'seres-vivos':
                return <SeresVivos />;
            case 'tres-en-raya':
                return <TresEnRaya />;
            case 'ahorcado':
                return <Ahorcado />;
            case 'jeopardy':
                return <Jeopardy />;
            case 'cien-galileanos':
                return <CienGalileanos />;
            case 'menu':
            default:
                return <MainMenu onSelectView={setCurrentView} />;
        }
    };

    return (
        <div className="min-h-screen text-slate-800 font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <Header />
                <main className="mt-6 bg-white/70 backdrop-blur-sm shadow-xl rounded-2xl p-4 sm:p-6 lg:p-8 transition-all duration-300">
                    {currentView !== 'menu' && <BackButton onClick={() => setCurrentView('menu')} />}
                    {renderView()}
                </main>
                 <footer className="text-center mt-8 text-slate-600 text-sm">
                    <p>Creado con React, Tailwind CSS y la magia de la API de Gemini.</p>
                </footer>
            </div>
        </div>
    );
};

export default App;