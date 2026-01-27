
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ForumSectionComponent from './components/ForumSection';
import InfoPanel from './components/InfoPanel';
import Footer from './components/Footer';
import AuthModals from './components/AuthModals';
import ThreadList from './components/ThreadList';
import ThreadView from './components/ThreadView';
import { ForumCategory, User, Thread } from './types';

const forumData: ForumCategory[] = [
  {
    id: 'cat-1',
    title: 'Основной раздел',
    icon: 'Info',
    sections: [
      {
        id: 'sec-1',
        title: 'Новости проекта',
        description: 'Последние обновления и важные объявления от администрации.',
        topicsCount: 0,
        postsCount: 0,
        lastPost: { title: 'Открытие проекта Aspect RP', author: 'Artem_Protsko', date: 'Сегодня в 14:20' }
      },
      {
        id: 'sec-2',
        title: 'Общий раздел',
        description: 'Общение на свободные темы, идеи и предложения по улучшению.',
        topicsCount: 0,
        postsCount: 0
      }
    ]
  },
  {
    id: 'cat-2',
    title: 'Игровой процесс',
    icon: 'Gamepad2',
    sections: [
      {
        id: 'sec-3',
        title: 'Государственные организации',
        description: 'Полиция, Мэрия, Армия и Больницы.',
        topicsCount: 0,
        postsCount: 0
      },
      {
        id: 'sec-4',
        title: 'Уличные группировки',
        description: 'Гетто, Мафии и нелегальные организации.',
        topicsCount: 0,
        postsCount: 0
      }
    ]
  },
  {
    id: 'cat-3',
    title: 'Технический раздел',
    icon: 'Settings',
    sections: [
      {
        id: 'sec-5',
        title: 'Техническая поддержка',
        description: 'Проблемы с лаунчером, подключением или игровым аккаунтом.',
        topicsCount: 0,
        postsCount: 0
      }
    ]
  }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'forum' | 'about'>('home');
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState<'login' | 'register' | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('aspect_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('aspect_user');
  };

  const navigateToSection = (sectionId: string) => {
    setSelectedSection(sectionId);
    setSelectedThread(null);
    setActiveTab('forum');
  };

  const handleBreadcrumbClick = (to: 'forum' | 'section') => {
    if (to === 'forum') {
      setSelectedSection(null);
      setSelectedThread(null);
    } else if (to === 'section') {
      setSelectedThread(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user} 
        onLogout={handleLogout}
        onLoginClick={() => setShowAuth('login')}
        onRegisterClick={() => setShowAuth('register')}
      />
      
      <main className="flex-grow container mx-auto px-4 py-6 max-w-7xl">
        {activeTab === 'forum' && (selectedSection || selectedThread) && (
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 mb-6 bg-[#161b22] p-2 px-4 rounded border border-[#30363d] uppercase tracking-wider">
            <button onClick={() => handleBreadcrumbClick('forum')} className="hover:text-blue-400 transition-colors">Форум</button>
            {selectedSection && (
              <>
                <span className="text-slate-700">/</span>
                <button 
                  onClick={() => handleBreadcrumbClick('section')} 
                  className={`hover:text-blue-400 ${!selectedThread ? 'text-blue-400' : ''}`}
                >
                  Раздел
                </button>
              </>
            )}
            {selectedThread && (
              <>
                <span className="text-slate-700">/</span>
                <span className="text-blue-400 truncate max-w-xs">{selectedThread.title}</span>
              </>
            )}
          </div>
        )}

        {activeTab === 'home' && (
          <>
            <Hero onEnterForum={() => setActiveTab('forum')} />
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 space-y-6">
                <div className="xf-node">
                  <div className="xf-node-header">Новости и обновления</div>
                  <div className="divide-y divide-[#30363d]">
                    {forumData[0].sections.map(section => (
                      <ForumSectionComponent key={section.id} section={section} onClick={() => navigateToSection(section.id)} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <InfoPanel />
              </div>
            </div>
          </>
        )}

        {activeTab === 'forum' && !selectedSection && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
              {forumData.map(category => (
                <div key={category.id} className="xf-node">
                  <div className="xf-node-header">{category.title}</div>
                  <div className="divide-y divide-[#30363d]">
                    {category.sections.map(section => (
                      <ForumSectionComponent 
                        key={section.id} 
                        section={section} 
                        onClick={() => navigateToSection(section.id)} 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-1">
              <InfoPanel />
            </div>
          </div>
        )}

        {activeTab === 'forum' && selectedSection && !selectedThread && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <ThreadList 
                sectionId={selectedSection} 
                onThreadSelect={setSelectedThread} 
                user={user}
                onAuthRequired={() => setShowAuth('login')}
              />
            </div>
            <div className="lg:col-span-1">
              <InfoPanel />
            </div>
          </div>
        )}

        {activeTab === 'forum' && selectedThread && (
          <ThreadView 
            thread={selectedThread} 
            user={user} 
            onAuthRequired={() => setShowAuth('login')}
          />
        )}

        {activeTab === 'about' && (
           <div className="max-w-4xl mx-auto space-y-8 py-4">
              <div className="xf-node p-8">
                <h1 className="text-3xl font-black mb-6 text-blue-400 uppercase tracking-tight">Aspect Role Play — Новая эра SAMP в 2026 году</h1>
                <div className="space-y-6 text-slate-300 leading-relaxed">
                  <p>
                    Aspect Role Play (Aspect RP) — это амбициозный игровой проект во вселенной San Andreas Multiplayer, 
                    предлагающий игрокам уникальный опыт погружения в реалистичную жизнь на карте Сан-Андреас. 
                    Наш проект сочетает классическую атмосферу SAMP с современными техническими решениями.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="p-4 bg-[#21262d] rounded border border-[#30363d]">
                      <h3 className="font-bold text-blue-400 mb-2 uppercase text-sm">📜 О проекте</h3>
                      <p className="text-sm">Проект основан в 2026 году. В данный момент Aspect RP находится в стадии активной разработки, каждый элемент полируется до идеала.</p>
                    </div>
                    <div className="p-4 bg-[#21262d] rounded border border-[#30363d]">
                      <h3 className="font-bold text-blue-400 mb-2 uppercase text-sm">🗺️ Особенности</h3>
                      <p className="text-sm">Эксклюзивные объекты, обновленные интерьеры и собственный лаунчер для максимальной стабильности.</p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="font-bold text-blue-400 mb-4 uppercase text-sm">Команда разработки</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-3 bg-[#0d1117] border border-[#30363d] rounded">
                        <div className="w-10 h-10 rounded bg-blue-600 flex items-center justify-center font-bold text-xs uppercase">AP</div>
                        <div>
                          <div className="font-bold text-white">Артем Процко</div>
                          <div className="text-xs text-blue-500 uppercase font-bold">Главный разработчик (Lead Developer)</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-3 bg-[#0d1117] border border-[#30363d] rounded">
                        <div className="w-10 h-10 rounded bg-indigo-600 flex items-center justify-center font-bold text-xs uppercase">YK</div>
                        <div>
                          <div className="font-bold text-white">Ярослав Куриленок</div>
                          <div className="text-xs text-indigo-500 uppercase font-bold">Ведущий дизайнер</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <blockquote className="border-l-4 border-blue-500 pl-6 py-2 italic text-slate-400 bg-blue-500/5 mt-8">
                    «Мы создаем не просто сервер, а платформу для самореализации каждого игрока. Aspect Role Play — это сочетание опыта прошлых лет и технологий 2026 года».
                    <footer className="mt-2 text-xs font-bold text-blue-400">— Артем Процко</footer>
                  </blockquote>
                </div>
              </div>
           </div>
        )}
      </main>

      <Footer />

      {showAuth && (
        <AuthModals 
          type={showAuth} 
          onClose={() => setShowAuth(null)} 
          onSuccess={(u) => { setUser(u); setShowAuth(null); }} 
        />
      )}
    </div>
  );
};

export default App;
