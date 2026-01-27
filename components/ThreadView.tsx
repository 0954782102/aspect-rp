
import React, { useState } from 'react';
import { Send, User as UserIcon, Clock, Edit2, History, Check, X } from 'lucide-react';
import { Thread, Post, User as UserType, EditHistory } from '../types';

interface ThreadViewProps {
  thread: Thread;
  user: UserType | null;
  onAuthRequired: () => void;
}

const ThreadView: React.FC<ThreadViewProps> = ({ thread, user, onAuthRequired }) => {
  const [replyContent, setReplyContent] = useState('');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [showHistoryId, setShowHistoryId] = useState<string | null>(null);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 'p1',
      threadId: thread.id,
      authorId: thread.authorId,
      authorName: thread.authorName,
      authorAvatar: '',
      authorRole: 'Администратор',
      content: 'Приветствуем всех в нашей новой теме! Надеемся на конструктивное обсуждение.',
      createdAt: thread.createdAt,
      editHistory: []
    }
  ]);

  const handleSendReply = () => {
    if (!user) {
      onAuthRequired();
      return;
    }
    if (!replyContent.trim()) return;

    const newPost: Post = {
      id: Math.random().toString(36).substr(2, 9),
      threadId: thread.id,
      authorId: user.id,
      authorName: user.username,
      authorAvatar: '',
      authorRole: user.role,
      content: replyContent,
      createdAt: 'Только что',
      editHistory: []
    };

    setPosts([...posts, newPost]);
    setReplyContent('');
  };

  const startEdit = (post: Post) => {
    setEditingPostId(post.id);
    setEditContent(post.content);
  };

  const saveEdit = (postId: string) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        const history: EditHistory = { content: p.content, editedAt: new Date().toLocaleTimeString() };
        return { 
          ...p, 
          content: editContent, 
          editHistory: [...p.editHistory, history] 
        };
      }
      return p;
    }));
    setEditingPostId(null);
  };

  return (
    <div className="space-y-8">
      <div className="bg-slate-900/60 p-8 rounded-2xl border border-blue-500/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <UserIcon size={120} />
        </div>
        <h1 className="text-4xl font-black text-white relative z-10">{thread.title}</h1>
        <div className="flex items-center space-x-4 mt-4 text-slate-400 text-sm relative z-10">
          <span className="flex items-center"><UserIcon size={14} className="mr-1.5" /> {thread.authorName}</span>
          <span>•</span>
          <span className="flex items-center"><Clock size={14} className="mr-1.5" /> {thread.createdAt}</span>
        </div>
      </div>

      <div className="space-y-6">
        {posts.map((post, idx) => (
          <div key={post.id} className="flex flex-col md:flex-row bg-slate-900 border border-white/5 rounded-2xl overflow-hidden shadow-xl">
            {/* Author Sidebar */}
            <div className="w-full md:w-56 bg-slate-800/30 p-6 flex md:flex-col items-center text-center space-x-4 md:space-x-0 shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-slate-700 flex items-center justify-center text-slate-500 mb-4 border-2 border-white/5 shadow-inner">
                <UserIcon size={32} />
              </div>
              <div className="text-left md:text-center flex-grow md:flex-grow-0">
                <h4 className="font-bold text-white text-lg truncate w-full">{post.authorName}</h4>
                <div className={`mt-1 inline-block px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  post.authorRole === 'Администратор' ? 'bg-red-500/20 text-red-400 border border-red-500/20' : 'bg-blue-500/20 text-blue-400 border border-blue-500/20'
                }`}>
                  {post.authorRole}
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="flex-grow flex flex-col min-h-[200px]">
              <div className="px-6 py-3 bg-slate-800/10 border-b border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-bold uppercase">
                <span>Опубликовано: {post.createdAt}</span>
                <span className="text-slate-600">#{idx + 1}</span>
              </div>
              
              <div className="p-8 flex-grow text-slate-300 leading-relaxed text-lg">
                {editingPostId === post.id ? (
                  <textarea 
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full bg-slate-950 border border-blue-500/30 rounded-xl p-4 text-slate-200 outline-none h-32"
                  />
                ) : (
                  <div className="whitespace-pre-wrap">{post.content}</div>
                )}
                
                {post.editHistory.length > 0 && !editingPostId && (
                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                    <button 
                      onClick={() => setShowHistoryId(showHistoryId === post.id ? null : post.id)}
                      className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-blue-400 transition-colors uppercase tracking-widest"
                    >
                      <History size={12} />
                      <span>Изменено {post.editHistory.length} раз(а)</span>
                    </button>
                    <span className="text-[10px] text-slate-700 italic">Последнее: {post.editHistory[post.editHistory.length-1].editedAt}</span>
                  </div>
                )}
                
                {showHistoryId === post.id && (
                  <div className="mt-4 p-4 bg-slate-950/50 rounded-xl border border-white/5 space-y-3">
                    <div className="text-[10px] font-bold text-slate-600 uppercase mb-2">История изменений</div>
                    {post.editHistory.map((h, i) => (
                      <div key={i} className="text-xs p-2 bg-slate-900/50 rounded border-l-2 border-blue-500/30">
                        <div className="text-slate-500 mb-1">{h.editedAt}</div>
                        <div className="text-slate-400 italic line-clamp-1">{h.content}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="px-6 py-3 bg-slate-800/5 border-t border-white/5 flex justify-end space-x-4">
                {user?.id === post.authorId && (
                  editingPostId === post.id ? (
                    <>
                      <button onClick={() => setEditingPostId(null)} className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-red-400 transition-colors uppercase"><X size={14} /> Отмена</button>
                      <button onClick={() => saveEdit(post.id)} className="flex items-center space-x-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase"><Check size={14} /> Сохранить</button>
                    </>
                  ) : (
                    <button onClick={() => startEdit(post)} className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-blue-400 transition-colors uppercase"><Edit2 size={14} /> Редактировать</button>
                  )
                )}
                <button className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase">Цитировать</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Editor / Reply Area */}
      <div className="mt-12 bg-slate-900 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-6 py-4 bg-slate-800/50 border-b border-white/5">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Написать ответ</h3>
        </div>
        <div className="p-6">
          <textarea 
            placeholder={user ? "Введите ваше сообщение..." : "Вы должны войти в аккаунт, чтобы оставить ответ"}
            disabled={!user}
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="w-full bg-slate-950 border border-white/5 rounded-xl p-6 text-slate-200 outline-none min-h-[160px] focus:border-blue-500/50 transition-colors text-lg"
          />
          <div className="flex justify-between items-center mt-4">
            <div className="text-xs text-slate-500">
              {user ? `Отвечаете как ${user.username}` : "Только зарегистрированные пользователи могут писать сообщения"}
            </div>
            <button 
              onClick={handleSendReply}
              disabled={!user || !replyContent.trim()}
              className="flex items-center space-x-3 px-10 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 transition-all transform active:scale-95"
            >
              <Send size={18} />
              <span>Отправить</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadView;
