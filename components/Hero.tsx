
import React from 'react';
import { ChevronRight, Play } from 'lucide-react';

interface HeroProps {
  onEnterForum: () => void;
}

const Hero: React.FC<HeroProps> = ({ onEnterForum }) => {
  return (
    <section className="relative rounded-lg overflow-hidden bg-[#161b22] border border-[#30363d] h-[320px] flex items-center shadow-xl">
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1542204111-99881850117d?auto=format&fit=crop&q=80&w=1600" 
          alt="San Andreas" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117] via-[#0d1117]/90 to-transparent"></div>
      </div>

      <div className="relative z-10 px-8 md:px-12 space-y-4 max-w-3xl">
        <div className="inline-flex items-center space-x-2 px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest border border-blue-500/20">
          Проект основан в 2026 году
        </div>
        <h1 className="text-4xl md:text-5xl font-black leading-tight uppercase tracking-tighter">
          Aspect Role Play<br />
          <span className="text-blue-500">Новая эра SAMP</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-xl">
          Амбициозный игровой проект во вселенной San Andreas Multiplayer. 
          Погрузись в реалистичную жизнь с уникальными механиками и современными решениями.
        </p>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-2">
          <button className="flex items-center justify-center space-x-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded font-bold text-sm transition-all shadow-lg shadow-blue-500/20">
            <Play fill="currentColor" size={16} />
            <span>Начать игру</span>
          </button>
          <button 
            onClick={onEnterForum}
            className="flex items-center justify-center space-x-2 px-6 py-2.5 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded font-bold text-sm transition-all"
          >
            <span>На форум</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
