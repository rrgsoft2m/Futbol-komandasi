
import React from 'react';
import { AppConfig } from '../types';
import SocialButton from './SocialButton';
import { Settings, Trophy, Sparkles } from 'lucide-react';

interface PublicViewProps {
  config: AppConfig;
  onGoToLogin: () => void;
}

const PublicView: React.FC<PublicViewProps> = ({ config, onGoToLogin }) => {
  return (
    <div className="flex flex-col items-center animate-fadeIn pb-12">
      {/* Admin Quick Access (Fixed Position) */}
      <button 
        onClick={onGoToLogin}
        className="absolute top-0 right-0 p-4 text-white/20 hover:text-white transition-colors z-20"
      >
        <Settings size={20} />
      </button>

      {/* Hero Section */}
      <div className="flex flex-col items-center mt-8 mb-10 text-center">
        <div className="relative group">
          {/* Animated Gold Ring */}
          <div className="absolute -inset-2 bg-[#D4AF37] rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative w-32 h-32 rounded-full border-4 border-[#D4AF37] overflow-hidden shadow-2xl bg-white">
            <img 
              src={config.logoUrl} 
              alt="RRG SOFT Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#D4AF37] p-2 rounded-full text-white border-2 border-[#0B3D2E] shadow-lg">
            <Trophy size={16} fill="white" />
          </div>
        </div>

        <h1 className="mt-6 text-2xl font-sporty text-white tracking-wide">
          {config.teamName}
        </h1>
        <p className="mt-1 text-[#D4AF37] font-medium tracking-widest text-sm uppercase">
          {config.subtitle}
        </p>
      </div>

      {/* Team Poster Section */}
      {config.teamPosterUrl && (
        <div className="w-full mb-10 group">
          <div className="flex items-center space-x-2 mb-4 px-2">
            <Sparkles size={16} className="text-[#D4AF37]" />
            <h2 className="text-white/80 font-sporty text-xs tracking-widest">JAMOA RUHI</h2>
          </div>
          <div className="relative rounded-3xl overflow-hidden glass aspect-video border border-white/10 shadow-2xl">
            <img 
              src={config.teamPosterUrl} 
              alt="Team Artwork" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D2E]/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white font-bold text-sm tracking-wide drop-shadow-lg">RRG SOFT – G'ALABA SARI!</p>
            </div>
          </div>
        </div>
      )}

      {/* Links List */}
      <div className="w-full space-y-2">
        {config.links.filter(l => l.active).map((link) => (
          <SocialButton key={link.id} link={link} />
        ))}
      </div>

      {/* Social Icons Mini Section */}
      <div className="mt-12 flex space-x-6 text-white/50">
        <div className="p-3 glass rounded-full hover:text-[#D4AF37] transition-colors cursor-pointer">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
        </div>
        <div className="p-3 glass rounded-full hover:text-[#D4AF37] transition-colors cursor-pointer">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </div>
        <div className="p-3 glass rounded-full hover:text-[#D4AF37] transition-colors cursor-pointer">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
        </div>
      </div>
    </div>
  );
};

export default PublicView;
