
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center overflow-x-hidden bg-[#0F2137]">
      {/* Uzbek Pattern Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="uzbek-pattern w-full h-full"></div>
        {/* Subtle Gradient Spots */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto min-h-screen px-4 py-8 flex flex-col">
        {children}
      </div>

      {/* Footer Branding */}
      <footer className="relative z-10 py-6 text-center text-white/40 text-xs tracking-widest font-sporty">
        © {new Date().getFullYear()} RRG SOFT • BARCHA HUQUQLAR HIMOYA QILINGAN
      </footer>
    </div>
  );
};

export default Layout;
