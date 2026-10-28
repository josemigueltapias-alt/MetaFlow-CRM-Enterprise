import { Message } from '../types/crm';

export const initialMessages: Record<string, Message[]> = {
  c1: [
    { id: 'm1', sender: 'them', text: '¡Hola! Vi su anuncio sobre la plataforma CRM integrada con WhatsApp Cloud API. Me interesa cotizar para un equipo de 40 asesores.', time: '10:15 AM', status: 'read', channel: 'whatsapp' },
    { id: 'm2', sender: 'me', text: '¡Hola Carlos! Un gusto saludarte. Con mucho gusto te asesoramos. Nuestra suite soporta multicanalidad en tiempo real y asignación automática de leads.', time: '10:18 AM', status: 'sent', channel: 'whatsapp' },
    { id: 'm3', sender: 'them', text: 'Excelente. ¿Podrían enviarme la propuesta en PDF o agendar una demo técnica esta tarde?', time: '10:22 AM', status: 'delivered', channel: 'whatsapp' },
  ],
  c2: [
    { id: 'm1', sender: 'them', text: 'Hola, me encantó el diseño de su plataforma en Instagram. ¿Tienen planes especiales para agencias digitales?', time: 'Ayer 04:20 PM', status: 'read', channel: 'instagram' },
    { id: 'm2', sender: 'me', text: '¡Hola Sofía! Sí, nuestro plan Agencia incluye hasta 10 líneas de WhatsApp y chatbots personalizados.', time: 'Ayer 04:30 PM', status: 'read', channel: 'instagram' },
  ],
  c3: [
    { id: 'm1', sender: 'them', text: 'Buenas tardes. Requerimos integración mediante Webhooks con nuestro sistema ERP actual. ¿Está disponible en su API Meta?', time: '02:30 PM', status: 'read', channel: 'messenger' },
  ],
};
