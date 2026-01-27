
import React, { useState } from 'react';
import { MessageSquare, Plus, Filter, User, Clock, Eye } from 'lucide-react';
import { Thread, User as UserType } from '../types';

interface ThreadListProps {
  sectionId: string;
  onThreadSelect: (thread: Thread) => void;
  user: UserType | null;
  onAuthRequired: () => void;
}

const ThreadList: React.FC<ThreadListProps> = ({ sectionId, onThreadSelect, user, onAuthRequired }) => {
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  // Mock initial threads
  const [threads, setThreads] = useState<Thread[]>([
    {
      id: 't1',
      sectionId,
      title: 'Как начать играть на нашем проекте?',
      authorId: 'admin',
      authorName: 'Artem_Protsko',
      createdAt: '12.01.2026',
      repliesCount: 45,
      viewsCount: 1205,
      lastPost: { authorName: 'Igor_SAMP', date: '5 мин. назад' }
    },
    {
      id: 't2',
      sectionId,
      title: 'Презентация нового лаунчера от Ярослава',
      authorId: 'designer',
      authorName: 'Yaroslav_Kurylenok',
      createdAt: '10.01.2026',
      repliesCount: 128,
      viewsCount: 5430,
      lastPost: { authorName: 'Admin', date: 'Вчера, 18:00' }
    }
  ]);

  const handleCreateThread = () => {
    if (!user) {
      onAuthRequired();
      return;
    }
    if (!newTitle.trim()) return;

    const newThread: Thread = {
      id: Math.random().toString(36).substr(2, 9),
      sectionId,
      title: newTitle,
      authorId: user.id,
      authorName: user.username,
      createdAt: 'Сегодня, сейчас',
      repliesCount: 0,
      viewsCount: 1
    };

    setThreads([newThread, ...threads]);
    setNewTitle('');
    setShowCreate(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">Темы раздела</h1>
          <p className="text-slate-500 text-sm mt-1">Здесь обсуждаются важные вопросы и предложения</p>
        </div>
        <button 
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 transition-all"
        >
          <Plus size={18} />
          <span>Создать тему</span>
        </button>
      </div>

      {showCreate && (
        <div className="bg-slate-900 border border-blue-500/30 rounded-2xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <h3 className="text-lg font-bold mb-4">Новая тема</h3>
          <div className="space-y-4">
            <input 
              type="text" 
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Заголовок вашей темы..."
              className="w-full bg-slate-950 border border-white/10 rounded-xl py-4 px-6 text-lg focus:border-blue-500 outline-none transition-colors"
            />
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowCreate(false)}
                className="px-6 py-2 text-slate-400 hover:text-white font-bold"
              >
                Отмена
              </button>
              <button 
                onClick={handleCreateThread}
                className="px-8 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold shadow-lg shadow-blue-500/20"
              >
                Опубликовать
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden">
        {/* Header Row */}
        <div className="hidden md:flex items-center px-6 py-3 bg-slate-800/50 border-b border-white/5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          <div className="flex-grow">Название темы / Автор</div>
          <div className="w-32 text-center">Статистика</div>
          <div className="w-48 text-right">Последний ответ</div>
        </div>

        {/* Thread List */}
        <div className="divide-y divide-white/5">
          {threads.map(thread => (
            <div 
              key={thread.id} 
              onClick={() => onThreadSelect(thread)}
              className="flex flex-col md:flex-row items-center px-6 py-5 hover:bg-white/[0.02] transition-colors cursor-pointer group"
            >
              <div className="flex-grow flex items-center space-x-4 w-full md:w-auto">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform shrink-0">
                  <MessageSquare size={20} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-slate-100 font-bold group-hover:text-blue-400 transition-colors truncate">{thread.title}</h4>
                  <div className="flex items-center space-x-2 text-xs text-slate-500 mt-0.5">
                    <span className="flex items-center"><User size={10} className="mr-1" /> {thread.authorName}</span>
                    <span>•</span>
                    <span className="flex items-center"><Clock size={10} className="mr-1" /> {thread.createdAt}</span>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex w-32 items-center justify-center space-x-4 text-xs font-bold shrink-0">
                <div className="text-center">
                  <div className="text-slate-300">{thread.repliesCount}</div>
                  <div className="text-slate-600 text-[10px] uppercase">Ответов</div>
                </div>
                <div className="text-center">
                  <div className="text-slate-300">{thread.viewsCount}</div>
                  <div className="text-slate-600 text-[10px] uppercase">Просмотров</div>
                </div>
              </div>

              <div className="hidden md:block w-48 text-right shrink-0">
                {thread.lastPost ? (
                  <div className="space-y-0.5">
                    <div className="text-sm font-bold text-blue-400">{thread.lastPost.authorName}</div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold">{thread.lastPost.date}</div>
                  </div>
                ) : (
                  <span className="text-xs text-slate-600 italic">Нет ответов</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreadList;
