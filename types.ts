
export interface LinkItem {
  id: string;
  label: string;
  url: string;
  icon: string;
  active: boolean;
}

export interface AppConfig {
  teamName: string;
  subtitle: string;
  logoUrl: string;
  bgImageUrl: string;
  teamPosterUrl?: string;
  links: LinkItem[];
}

export type Page = 'home' | 'login' | 'admin';
