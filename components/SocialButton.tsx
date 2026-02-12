
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LinkItem } from '../types';

interface SocialButtonProps {
  link: LinkItem;
}

const SocialButton: React.FC<SocialButtonProps> = ({ link }) => {
  // Dynamic icon selection
  const IconComponent = (LucideIcons as any)[link.icon] || LucideIcons.ExternalLink;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-full flex items-center justify-between p-4 mb-4 glass rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 active:scale-95 gold-glow"
    >
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-xl text-white shadow-lg">
          <IconComponent size={20} />
        </div>
        <span className="text-white font-semibold text-lg">{link.label}</span>
      </div>
      <LucideIcons.ChevronRight className="text-white/30 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" size={20} />
      
      {/* Decorative ornament edge */}
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#D4AF37] opacity-0 group-hover:opacity-100 rounded-r-2xl transition-opacity"></div>
    </a>
  );
};

export default SocialButton;
