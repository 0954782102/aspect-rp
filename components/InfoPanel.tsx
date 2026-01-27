
import React from 'react';
import { Download } from 'lucide-react';

const InfoPanel: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="bg-blue-600 rounded p-4 text-white shadow-lg shadow-blue-500/10">
        <div className="flex items-center space-x-2 mb-2">
          <Download size={18} />
          <span className="font-bold uppercase text-xs">Лаунчер проекта</span>
        </div>
        <p className="text-[11px] text-blue-100 mb-3 opacity-80">Используйте наш официальный клиент для стабильной игры и быстрого подключения.</p>
        <button className="w-full py-2 bg-white text-blue-600 rounded font-bold text-xs uppercase hover:bg-blue-50 transition-colors">Скачать</button>
      </div>
    </div>
  );
};

export default InfoPanel;
