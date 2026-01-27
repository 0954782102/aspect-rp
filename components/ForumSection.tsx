
import React from 'react';
import { MessageSquare, User, Clock } from 'lucide-react';
import { ForumSection as ForumSectionType } from '../types';

interface Props {
  section: ForumSectionType;
  onClick?: () => void;
}

const ForumSection: React.FC<Props> = ({ section, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="flex flex-col md:flex-row items-center p-4 hover:bg-[#21262d] transition-colors cursor-pointer group border-b border-[#30363d] last:border-b-0"
    >
      <div className="w-10 h-10 bg-[#0d1117] border border-[#30363d] rounded flex items-center justify-center text-blue-500 shrink-0 group-hover:border-blue-500/50 transition-colors">
        <MessageSquare size={18} />
      </div>
      
      <div className="flex-grow mt-3 md:mt-0 md:ml-4 text-center md:text-left">
        <h3 className="text-sm font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
          {section.title}
        </h3>
        <p className="text-slate-500 text-[11px] mt-0.5">{section.description}</p>
      </div>

      <div className="hidden xl:flex items-center space-x-6 shrink-0 text-center px-4 border-l border-[#30363d] mx-4">
        <div>
          <div className="text-xs font-bold text-slate-300">{section.topicsCount.toLocaleString()}</div>
          <div className="text-[9px] text-slate-500 uppercase font-black">Темы</div>
        </div>
        <div>
          <div className="text-xs font-bold text-slate-300">{section.postsCount.toLocaleString()}</div>
          <div className="text-[9px] text-slate-500 uppercase font-black">Сообщ.</div>
        </div>
      </div>

      <div className="shrink-0 w-full md:w-56 mt-3 md:mt-0 p-2 bg-[#0d1117] rounded border border-[#30363d] flex flex-col justify-center min-h-[44px]">
        {section.lastPost ? (
          <div className="space-y-0.5">
            <div className="text-[11px] font-bold text-blue-400 truncate hover:underline">{section.lastPost.title}</div>
            <div className="flex items-center justify-between text-[9px] text-slate-500 font-black uppercase">
              <span className="flex items-center">
                <User size={8} className="mr-1" />
                {section.lastPost.author}
              </span>
              <span className="flex items-center">
                <Clock size={8} className="mr-1" />
                {section.lastPost.date}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-[10px] text-slate-700 italic text-center uppercase font-bold">Нет сообщений</div>
        )}
      </div>
    </div>
  );
};

export default ForumSection;
