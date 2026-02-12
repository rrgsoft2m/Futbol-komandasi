
import { AppConfig, LinkItem } from './types';

export const INITIAL_LINKS: LinkItem[] = [
  { id: '1', label: 'Telegram', url: 'https://t.me/rrgfcoder', icon: 'Send', active: true },
  { id: '2', label: 'Instagram', url: 'https://instagram.com/rrgsoft', icon: 'Instagram', active: true },
  { id: '3', label: 'YouTube', url: 'https://youtube.com/rrgsoft', icon: 'Youtube', active: true },
  { id: '4', label: 'Veb-sayt', url: 'https://rrgsoft.uz', icon: 'Globe', active: true },
  { id: '5', label: 'Homiylik', url: 'https://rrgsoft.uz/sponsor', icon: 'ShieldCheck', active: true },
];

export const DEFAULT_CONFIG: AppConfig = {
  teamName: 'RRG SOFT Futbol Komandasi',
  subtitle: 'G‘alaba sari birga!',
  logoUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=rrgsoft&backgroundColor=0f2137', 
  bgImageUrl: '',
  teamPosterUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1000',
  links: INITIAL_LINKS,
};

export const ADMIN_CREDENTIALS = {
  username: 'test',
  password: 'test123',
};
