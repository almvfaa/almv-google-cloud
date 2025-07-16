import React from 'react';
import { AlertTriangleIcon, CollectionIcon, DocumentTextIcon, UsersIcon, InboxIcon, ChatBubbleLeftRightIcon } from './Icons';

type View = 'incumplimientos' | 'penalizaciones' | 'aclaraciones' | 'ordenes_compra' | 'proveedores' | 'entradas';

const NavItem: React.FC<{
    icon: React.ReactNode;
    text: string;
    view: View;
    active: boolean;
    onClick: (view: View) => void;
}> = ({ icon, text, view, active, onClick }) => {
    const baseClasses = "flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ease-in-out relative";
    const activeClasses = "bg-sidebar-active text-white font-semibold shadow-inner";
    const inactiveClasses = "hover:bg-sidebar-active/75 text-sidebar-foreground hover:text-white transform hover:translate-x-2";

    return (
        <li>
            <a onClick={() => onClick(view)} className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}>
                {active && <div className="absolute left-0 top-0 h-full w-1 bg-primary-main rounded-r-full"></div>}
                {icon}
                <span>{text}</span>
            </a>
        </li>
    );
};

interface SidebarProps {
    currentView: string;
    setCurrentView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
    const navItems: { view: View; icon: React.ReactNode; text: string; }[] = [
        { view: 'incumplimientos', icon: <AlertTriangleIcon className="h-5 w-5" />, text: 'Incumplimientos' },
        { view: 'penalizaciones', icon: <CollectionIcon className="h-5 w-5" />, text: 'Penalizaciones' },
        { view: 'aclaraciones', icon: <ChatBubbleLeftRightIcon className="h-5 w-5" />, text: 'Aclaraciones' },
        { view: 'ordenes_compra', icon: <DocumentTextIcon className="h-5 w-5" />, text: 'Ordenes de Compra' },
        { view: 'proveedores', icon: <UsersIcon className="h-5 w-5" />, text: 'Proveedores' },
        { view: 'entradas', icon: <InboxIcon className="h-5 w-5" />, text: 'Entradas' },
    ];
    
    return (
        <aside className="w-64 bg-gradient-to-b from-slate-800 to-slate-900 flex-shrink-0 p-4 border-r border-slate-700/50 flex-col hidden lg:flex no-print">
            <div className="flex items-center justify-center h-16 mb-4">
                 <h2 className="text-xl font-bold text-white tracking-wider">SII HCG</h2>
            </div>
            <nav>
                <ul className="space-y-2">
                    {navItems.map(item => (
                        <NavItem
                            key={item.view}
                            icon={item.icon}
                            text={item.text}
                            view={item.view}
                            active={currentView === item.view}
                            onClick={setCurrentView}
                        />
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;