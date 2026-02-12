
import React, { useState, useRef } from 'react';
import { AppConfig, LinkItem } from '../types';
import { DEFAULT_CONFIG } from '../constants';
import { LogOut, Save, Plus, Trash2, Eye, LayoutDashboard, Image as ImageIcon, Sparkles, Loader2, RotateCcw, Upload } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface AdminDashboardProps {
  config: AppConfig;
  onUpdate: (config: AppConfig) => void;
  onLogout: () => void;
  onBack: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ config, onUpdate, onLogout, onBack }) => {
  const [localConfig, setLocalConfig] = useState<AppConfig>({ ...config });
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onUpdate(localConfig);
      setIsSaving(false);
      alert('Muvaffaqiyatli saqlandi!');
    }, 800);
  };

  const handleReset = () => {
    if (window.confirm('Haqiqatdan ham barcha o\'zgarishlarni o\'chirib, boshlang\'ich holatga qaytarmoqchimisiz?')) {
      setLocalConfig({ ...DEFAULT_CONFIG });
      onUpdate(DEFAULT_CONFIG);
      alert('Tizim dastlabki holatga qaytarildi.');
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Rasm hajmi juda katta (maksimal 2MB)');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setLocalConfig({ ...localConfig, logoUrl: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGeneratePoster = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `A professional, high-end football team promotional poster for 'RRG SOFT'. 
      The theme should be 'G'alaba sari birga'. Color palette: Navy Blue (#0F2137) and metallic gold (#D4AF37). 
      Cinematic sports lighting, modern brand aesthetic. No text.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { aspectRatio: "16:9" } }
      });

      let imageUrl = '';
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (imageUrl) {
        setLocalConfig({ ...localConfig, teamPosterUrl: imageUrl });
      }
    } catch (error) {
      alert('Rasm yaratishda xatolik!');
    } finally {
      setIsGenerating(false);
    }
  };

  const updateLink = (id: string, updates: Partial<LinkItem>) => {
    setLocalConfig({
      ...localConfig,
      links: localConfig.links.map(l => l.id === id ? { ...l, ...updates } : l)
    });
  };

  const removeLink = (id: string) => {
    setLocalConfig({
      ...localConfig,
      links: localConfig.links.filter(l => l.id !== id)
    });
  };

  const addLink = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setLocalConfig({
      ...localConfig,
      links: [...localConfig.links, { id: newId, label: 'Yangi Link', url: '#', icon: 'Link', active: true }]
    });
  };

  return (
    <div className="w-full animate-fadeIn pb-32">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-sporty text-white">Boshqaruv</h2>
        <div className="flex space-x-2">
          <button 
            onClick={handleReset}
            className="p-3 glass rounded-xl text-orange-400 hover:bg-orange-500/10 transition-all"
            title="Asliga qaytarish"
          >
            <RotateCcw size={20} />
          </button>
          <button 
            onClick={onBack}
            className="p-3 glass rounded-xl text-white/60 hover:text-white transition-all"
          >
            <Eye size={20} />
          </button>
          <button 
            onClick={onLogout}
            className="p-3 glass rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Main Settings */}
      <div className="glass p-6 rounded-3xl mb-6 space-y-4">
        <div className="flex items-center space-x-2 text-[#D4AF37] mb-4">
          <LayoutDashboard size={18} />
          <h3 className="font-bold uppercase tracking-wider text-sm">Asosiy Ma'lumotlar</h3>
        </div>
        
        <div>
          <label className="block text-white/50 text-xs mb-1 uppercase">Komanda nomi</label>
          <input 
            type="text" 
            value={localConfig.teamName}
            onChange={(e) => setLocalConfig({...localConfig, teamName: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#D4AF37]"
            placeholder="Komanda nomi"
          />
        </div>

        <div>
          <label className="block text-white/50 text-xs mb-1 uppercase">Slogan</label>
          <input 
            type="text" 
            value={localConfig.subtitle}
            onChange={(e) => setLocalConfig({...localConfig, subtitle: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#D4AF37]"
            placeholder="Slogan"
          />
        </div>

        {/* Logo Section with Upload */}
        <div className="space-y-3">
          <label className="block text-white/50 text-xs mb-1 uppercase">Logo (Kompyuterdan yuklash)</label>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-24 h-24 rounded-2xl bg-white flex items-center justify-center overflow-hidden border-2 border-[#D4AF37]/50 shadow-lg shrink-0">
                <img src={localConfig.logoUrl} className="w-full h-full object-cover" alt="Preview" />
            </div>
            <div className="flex-1 w-full space-y-2">
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleLogoUpload}
                accept="image/*"
                className="hidden"
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full glass hover:bg-white/10 text-white text-sm font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all border-[#D4AF37]/20"
              >
                <Upload size={18} className="text-[#D4AF37]" />
                FAYL TANLASH
              </button>
              <p className="text-[10px] text-white/40 text-center sm:text-left uppercase">JPG, PNG format • Maksimal 2MB</p>
            </div>
          </div>
          <div className="mt-2">
            <label className="block text-white/30 text-[10px] mb-1 uppercase">Yoki Logo URL</label>
            <input 
              type="text" 
              value={localConfig.logoUrl.startsWith('data:') ? '' : localConfig.logoUrl}
              onChange={(e) => setLocalConfig({...localConfig, logoUrl: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm outline-none focus:border-[#D4AF37]"
              placeholder="https://..."
            />
          </div>
        </div>
      </div>

      {/* AI Image Generation Section */}
      <div className="glass p-6 rounded-3xl mb-6 bg-gradient-to-br from-[#D4AF37]/10 to-transparent border-[#D4AF37]/20">
        <div className="flex items-center space-x-2 text-[#D4AF37] mb-4">
          <Sparkles size={18} />
          <h3 className="font-bold uppercase tracking-wider text-sm">AI Poster</h3>
        </div>
        <button 
          onClick={handleGeneratePoster}
          disabled={isGenerating}
          className="w-full bg-white/5 hover:bg-white/10 border border-[#D4AF37]/30 text-[#D4AF37] font-bold py-3 rounded-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <ImageIcon size={18} />}
          <span>{isGenerating ? 'YARATILMOQDA...' : 'YANGI RASM YARATISH'}</span>
        </button>
      </div>

      {/* Links Management */}
      <div className="glass p-6 rounded-3xl mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2 text-[#D4AF37]">
            <Plus size={18} />
            <h3 className="font-bold uppercase tracking-wider text-sm">Linklar</h3>
          </div>
          <button onClick={addLink} className="text-xs bg-[#D4AF37] text-[#0B3D2E] px-3 py-1 rounded-lg font-bold">
            + QO'SHISH
          </button>
        </div>

        <div className="space-y-4">
          {localConfig.links.map((link) => (
            <div key={link.id} className="p-4 bg-white/5 border border-white/10 rounded-2xl relative">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <input 
                  type="text" 
                  value={link.label}
                  onChange={(e) => updateLink(link.id, { label: e.target.value })}
                  className="bg-black/20 border border-white/5 rounded-lg px-3 py-1.5 text-white text-sm outline-none"
                  placeholder="Nom"
                />
                <input 
                  type="text" 
                  value={link.url}
                  onChange={(e) => updateLink(link.id, { url: e.target.value })}
                  className="bg-black/20 border border-white/5 rounded-lg px-3 py-1.5 text-white text-sm outline-none"
                  placeholder="URL"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={link.active} 
                    onChange={(e) => updateLink(link.id, { active: e.target.checked })}
                    className="mr-2 accent-[#D4AF37]"
                  />
                  <span className="text-white/50 text-xs">Aktiv</span>
                </label>
                <button onClick={() => removeLink(link.id)} className="text-red-400/50 hover:text-red-400">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 max-w-lg mx-auto z-50">
        <button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-[#D4AF37] hover:bg-[#B8860B] text-[#0B3D2E] font-bold py-4 rounded-2xl transition-all shadow-2xl flex items-center justify-center space-x-2"
        >
            <Save size={20} />
            <span>{isSaving ? 'SAQLANMOQDA...' : 'SAQLASH'}</span>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
