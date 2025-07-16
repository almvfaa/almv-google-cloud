import React from 'react';
import { BellIcon, VideoCameraIcon, UserAvatar } from './Icons';


export const Header: React.FC = () => {
    return (
        <header className="bg-surface p-3 flex items-center justify-between z-10 no-print border-b border-border-color">
            {/* Left Side */}
            <div className="flex items-center text-sm text-on-surface-secondary">
                <span className="font-bold text-on-surface">Usuario:</span>
                <span className="ml-2">Becerra Gonzalez Oscar</span>
                <span className="mx-2 text-slate-400">/</span>
                <span className="font-semibold text-on-surface">SII "Sistema Integral de Información" del HCG</span>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
                <button className="text-on-surface-secondary hover:text-primary-main transition-colors">
                    <BellIcon />
                </button>
                 <button className="text-on-surface-secondary hover:text-primary-main transition-colors">
                    <VideoCameraIcon />
                </button>
                <div className="h-8 w-8 flex items-center justify-center">
                    <img src="https://tse2.mm.bing.net/th/id/OIP.2EV-0BsZkOqjaivqrhXD9gHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Logo" className="h-full w-full object-contain" />
                </div>
                <UserAvatar />
            </div>
        </header>
    );
};