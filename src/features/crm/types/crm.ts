export type Channel = 'whatsapp' | 'instagram' | 'messenger';

export type ContactStage =
  | 'Nuevo Lead'
  | 'Contactado'
  | 'Propuesta Enviada'
  | 'Negociación'
  | 'Cerrado Ganado'
  | 'Cerrado Perdido';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  channel: Channel;
  avatar: string;
  company: string;
  value: number;
  stage: ContactStage;
  sentiment: string;
  score: number;
  tags: string[];
  lastActive: string;
  unreadCount: number;
  adSource: string;
  city: string;
}

export interface Message {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
  status: string;
  channel: Channel;
}

export interface MetaConfig {
  pageId: string;
  wabaId: string;
  phoneNumberId: string;
  systemToken: string;
  webhookUrl: string;
  verifyToken: string;
  autoSync: boolean;
  aiAssistEnabled: boolean;
}

export interface WebhookLog {
  id: number;
  event: string;
  status: number;
  time: string;
  payload: string;
}

export interface Campaign {
  id: string;
  name: string;
  budget: string;
  spent: string;
  clicks: number;
  leads: number;
  roas: string;
  status: 'Activa' | 'Pausada';
}

export interface AnalyticsPoint {
  name: string;
  whatsapp: number;
  messenger: number;
  instagram: number;
  conversiones: number;
}

export interface KanbanStageDef {
  id: ContactStage;
  title: string;
  color: string;
  badgeBg: string;
}
