import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-teal-700 tracking-tight">
                Planeta Vivo
            </h1>
            <p className="mt-2 text-lg sm:text-xl text-slate-700">
                Una Aventura de Juegos Educativos
            </p>
        </header>
    );
};

export default Header;