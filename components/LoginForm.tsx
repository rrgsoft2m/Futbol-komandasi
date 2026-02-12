
import React, { useState } from 'react';
import { ADMIN_CREDENTIALS } from '../constants';
import { ChevronLeft, Lock } from 'lucide-react';

interface LoginFormProps {
  onLogin: (status: boolean) => void;
  onBack: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      onLogin(true);
    } else {
      setError('Login yoki parol noto‘g‘ri!');
    }
  };

  return (
    <div className="w-full animate-fadeIn">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center text-white/60 hover:text-white transition-colors"
      >
        <ChevronLeft size={20} />
        <span>Orqaga</span>
      </button>

      <div className="glass p-8 rounded-3xl border border-white/10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#D4AF37] rounded-2xl flex items-center justify-center text-[#0B3D2E] mb-4">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-sporty text-white">Admin Panel</h2>
          <p className="text-white/50 text-sm mt-2">Boshqaruv uchun tizimga kiring</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white/70 text-sm mb-2 font-medium">Foydalanuvchi nomi</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none transition-all"
              placeholder="test"
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-2 font-medium">Parol</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none transition-all"
              placeholder="test123"
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button 
            type="submit"
            className="w-full bg-[#D4AF37] hover:bg-[#B8860B] text-[#0B3D2E] font-bold py-4 rounded-xl transition-all active:scale-95 shadow-lg shadow-[#D4AF37]/20"
          >
            KIRISH
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
