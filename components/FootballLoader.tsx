
import React from 'react';

const FootballLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-[#0B3D2E] flex flex-col items-center justify-center">
      <div className="relative w-24 h-24 mb-6">
        {/* Spinner ring */}
        <div className="absolute inset-0 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin"></div>
        {/* Football SVG */}
        <div className="absolute inset-2 flex items-center justify-center animate-spin-slow">
          <svg viewBox="0 0 24 24" className="w-16 h-16 fill-white" xmlns="http://www.w3.org/2000/svg">
             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14l-3 4h6l-3-4zm-4.5 5l-2.5 3h5l-2.5-3zm9 0l-2.5 3h5l-2.5-3zm-7.5 6l2-2.5h2l2 2.5h-6z"/>
          </svg>
        </div>
      </div>
      <p className="text-[#D4AF37] font-sporty text-lg tracking-widest animate-pulse">
        YUKLANMOQDA...
      </p>
    </div>
  );
};

export default FootballLoader;
