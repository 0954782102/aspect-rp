
import React from 'react';
import { Home, MessageSquare, Info, ShoppingCart, Download, LogOut } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: 'home' | 'forum' | 'about') => void;
  user: User | null;
  onLogout: () => void;
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  user, 
  onLogout, 
  onLoginClick, 
  onRegisterClick 
}) => {
  return (
    <nav className="sticky top-0 z-50 bg-[#0b0e14]/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-7xl">
        <div 
          className="flex items-center space-x-2 cursor-pointer group"
          onClick={() => setActiveTab('home')}
        >
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black group-hover:scale-110 transition-transform">
            A
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic">
            Aspect <span className="text-blue-500">Role Play</span>
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-1">
          <NavItem 
            icon={<Home size={18} />} 
            label="Главная" 
            active={activeTab === 'home'} 
            onClick={() => setActiveTab('home')}
          />
          <NavItem 
            icon={<MessageSquare size={18} />} 
            label="Форум" 
            active={activeTab === 'forum'} 
            onClick={() => setActiveTab('forum')}
          />
          <NavItem 
            icon={<Info size={18} />} 
            label="О проекте" 
            active={activeTab === 'about'} 
            onClick={() => setActiveTab('about')}
          />
          <div className="h-6 w-px bg-white/10 mx-2"></div>
          
          {user ? (
            <div className="flex items-center space-x-4 pl-2">
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-white/5">
                <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold">
                  {user.username.substring(0, 2).toUpperCase()}
                </div>
                <span className="text-sm font-semibold">{user.username}</span>
              </div>
              <button 
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                title="Выйти"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 ml-2">
              <button 
                onClick={onLoginClick}
                className="px-4 py-2 text-sm font-bold text-slate-300 hover:text-white transition-colors"
              >
                Войти
              </button>
              <button 
                onClick={onRegisterClick}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-bold transition-colors"
              >
                Регистрация
              </button>
            </div>
          )}
          
          <div className="h-6 w-px bg-white/10 mx-2"></div>
          <button className="flex items-center space-x-2 px-4 py-2 rounded bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] transition-colors font-bold text-xs uppercase tracking-wider">
            <Download size={14} />
            <span>Скачать</span>
          </button>
        </div>

        <div className="md:hidden flex items-center space-x-4">
           <button onClick={() => setActiveTab('forum')} className="text-slate-400"><MessageSquare size={24} /></button>
        </div>
      </div>
    </nav>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors font-medium text-sm ${
      active ? 'text-blue-400 bg-blue-500/10' : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default Navbar;
