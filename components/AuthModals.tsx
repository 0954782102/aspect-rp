
import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Eye, EyeOff } from 'lucide-react';
import { User } from '../types';

interface AuthModalsProps {
  type: 'login' | 'register';
  onClose: () => void;
  onSuccess: (user: User) => void;
}

const AuthModals: React.FC<AuthModalsProps> = ({ type, onClose, onSuccess }) => {
  const [view, setView] = useState<'login' | 'register' | 'recovery'>(type);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        username: username || 'Игрок',
        email: email || 'player@aspect.com',
        avatar: '',
        role: 'User',
        joinedDate: new Date().toLocaleDateString(),
        postsCount: 0
      };
      
      localStorage.setItem('aspect_user', JSON.stringify(mockUser));
      onSuccess(mockUser);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0b0e14]/90 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-900 border border-white/5 rounded-2xl shadow-2xl overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center text-white font-black text-2xl mb-4 shadow-lg shadow-blue-500/20">
              A
            </div>
            <h2 className="text-2xl font-bold">
              {view === 'login' && 'Вход в аккаунт'}
              {view === 'register' && 'Регистрация'}
              {view === 'recovery' && 'Восстановление пароля'}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {view === 'login' && 'С возвращением на Aspect Role Play'}
              {view === 'register' && 'Присоединяйтесь к новой эре SAMP'}
              {view === 'recovery' && 'Мы отправим инструкции на ваш email'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {view === 'register' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Никнейм</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="text" 
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Artem_Protsko"
                    className="w-full bg-slate-950 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-sm focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.com"
                  className="w-full bg-slate-950 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-sm focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            </div>

            {view !== 'recovery' && (
              <div className="space-y-1">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Пароль</label>
                  {view === 'login' && (
                    <button 
                      type="button"
                      onClick={() => setView('recovery')}
                      className="text-[10px] font-bold text-blue-400 hover:text-blue-300 uppercase tracking-tighter"
                    >
                      Забыли пароль?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-white/5 rounded-xl py-3 pl-10 pr-12 text-sm focus:border-blue-500 outline-none transition-colors"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}

            <button 
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 transition-all mt-4"
            >
              {loading ? 'Загрузка...' : view === 'login' ? 'Войти' : view === 'register' ? 'Создать аккаунт' : 'Сбросить пароль'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center text-sm">
            {view === 'login' ? (
              <p className="text-slate-500">
                Нет аккаунта? {' '}
                <button onClick={() => setView('register')} className="text-blue-400 font-bold hover:underline">Зарегистрироваться</button>
              </p>
            ) : (
              <p className="text-slate-500">
                Уже есть аккаунт? {' '}
                <button onClick={() => setView('login')} className="text-blue-400 font-bold hover:underline">Войти</button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModals;
