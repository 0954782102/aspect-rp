
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#161b22] border-t border-[#30363d] mt-12 py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-black text-xs">
                A
              </div>
              <span className="text-lg font-black uppercase tracking-tighter">Aspect Role Play</span>
            </div>
            <p className="text-slate-500 text-xs max-w-sm leading-relaxed">
              Мы создаем не просто сервер, а платформу для самореализации каждого игрока. 
              Aspect Role Play — это сочетание опыта прошлых лет и технологий 2026 года.
            </p>
          </div>
          
          <div>
            <h4 className="text-slate-300 text-xs font-bold uppercase mb-4 tracking-widest">Информация</h4>
            <ul className="space-y-2 text-slate-500 text-xs">
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Правила форума</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Донат-услуги</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Лор проекта</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Карта штата</li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-300 text-xs font-bold uppercase mb-4 tracking-widest">Контакты</h4>
            <ul className="space-y-2 text-slate-500 text-xs">
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Техподдержка</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Реклама</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Сотрудничество</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Discord</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#30363d] mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-slate-600 text-[10px] font-bold uppercase tracking-widest">
          <p>© 2026 Aspect Role Play. Все права защищены. Не аффилировано с Rockstar Games.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <span className="hover:text-white cursor-pointer">Политика</span>
            <span className="hover:text-white cursor-pointer">Условия</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
