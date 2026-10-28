import React, { useState, useMemo } from 'react';
import { 
  MessageSquare, 
  Users, 
  Kanban, 
  BarChart3, 
  Send, 
  Settings, 
  Search, 
  Phone, 
  Video, 
  MoreVertical, 
  Bot, 
  Sparkles, 
  CheckCheck, 
  Plus, 
  Filter, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ExternalLink, 
  DollarSign, 
  UserPlus, 
  Clock, 
  Tag, 
  Mail, 
  Building, 
  Globe, 
  ArrowUpRight, 
  ChevronRight, 
  Copy, 
  Play, 
  Pause, 
  Sliders, 
  ShieldCheck, 
  Activity, 
  Terminal,
  Paperclip,
  Smile,
  Info,
  Check,
  X,
  PlusCircle,
  TrendingDown,
  Megaphone,
  Layers,
  Facebook,
  Instagram,
  FileText,
  MousePointer,
  Radio,
  Eye
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, Legend 
} from 'recharts';

// --- DATOS INICIALES EN ESPAÑOL ---
const INITIAL_CONTACTS = [
  {
    id: 'c1',
    name: 'Carlos Mendoza',
    email: 'carlos.m@innovatech.com',
    phone: '+52 55 4123 8900',
    channel: 'whatsapp',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    company: 'InnovaTech México',
    value: 12500,
    stage: 'Propuesta Enviada',
    sentiment: 'Positivo',
    score: 88,
    tags: ['Alta Prioridad', 'Enterprise', 'B2B'],
    lastActive: 'Hace 10 min',
    unreadCount: 2,
    adSource: 'Meta Ad: Campaña Q3 SaaS Enterprise',
    city: 'Ciudad de México, MX'
  },
  {
    id: 'c2',
    name: 'Sofía Rodríguez',
    email: 'sofia@designstudio.co',
    phone: '+57 310 987 6543',
    channel: 'instagram',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    company: 'Studio Creativo Co',
    value: 4800,
    stage: 'Contactado',
    sentiment: 'Neutral',
    score: 64,
    tags: ['Diseño', 'Prospecto'],
    lastActive: 'Hace 1 hora',
    unreadCount: 0,
    adSource: 'IG Story Formulario Directo',
    city: 'Bogotá, CO'
  },
  {
    id: 'c3',
    name: 'Alejandro Gómez',
    email: 'agomez@logistics.net',
    phone: '+1 305 555 0192',
    channel: 'messenger',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    company: 'Gómez Global Logistics',
    value: 28000,
    stage: 'Negociación',
    sentiment: 'Muy Intencionado',
    score: 94,
    tags: ['Logística', 'Lead Caliente'],
    lastActive: 'Hace 3 horas',
    unreadCount: 1,
    adSource: 'FB Clic a Messenger',
    city: 'Miami, USA'
  },
  {
    id: 'c4',
    name: 'Mariana Silva',
    email: 'msilva@retailperu.pe',
    phone: '+51 987 654 321',
    channel: 'whatsapp',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    company: 'Retail Solutions SAC',
    value: 9500,
    stage: 'Nuevo Lead',
    sentiment: 'Neutral',
    score: 72,
    tags: ['E-commerce', 'Nuevo'],
    lastActive: 'Hace 5 horas',
    unreadCount: 0,
    adSource: 'Anuncio Clic a WhatsApp',
    city: 'Lima, PE'
  },
  {
    id: 'c5',
    name: 'Fernando López',
    email: 'flopez@fintech.io',
    phone: '+54 11 4988 2211',
    channel: 'whatsapp',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    company: 'Fintech Capital',
    value: 45000,
    stage: 'Cerrado Ganado',
    sentiment: 'Satisfecho',
    score: 99,
    tags: ['VIP', 'Cliente'],
    lastActive: 'Ayer',
    unreadCount: 0,
    adSource: 'Orgánico / Recomendación',
    city: 'Buenos Aires, AR'
  }
];

const INITIAL_MESSAGES = {
  c1: [
    { id: 'm1', sender: 'them', text: '¡Hola! Vi su anuncio sobre la plataforma CRM integrada con WhatsApp Cloud API. Me interesa cotizar para un equipo de 40 asesores.', time: '10:15 AM', status: 'read', channel: 'whatsapp' },
    { id: 'm2', sender: 'me', text: '¡Hola Carlos! Un gusto saludarte. Con mucho gusto te asesoramos. Nuestra suite soporta multicanalidad en tiempo real y asignación automática de leads.', time: '10:18 AM', status: 'read', channel: 'whatsapp' },
    { id: 'm3', sender: 'them', text: 'Excelente. ¿Podrían enviarme la propuesta en PDF o agendar una demo técnica esta tarde?', time: '10:22 AM', status: 'delivered', channel: 'whatsapp' }
  ],
  c2: [
    { id: 'm1', sender: 'them', text: 'Hola, me encantó el diseño de su plataforma en Instagram. ¿Tienen planes especiales para agencias digitales?', time: 'Ayer 04:20 PM', status: 'read', channel: 'instagram' },
    { id: 'm2', sender: 'me', text: '¡Hola Sofía! Sí, nuestro plan Agencia incluye hasta 10 líneas de WhatsApp y chatbots personalizados.', time: 'Ayer 04:30 PM', status: 'read', channel: 'instagram' }
  ],
  c3: [
    { id: 'm1', sender: 'them', text: 'Buenas tardes. Requerimos integración mediante Webhooks con nuestro sistema ERP actual. ¿Está disponible en su API Meta?', time: '02:30 PM', status: 'read', channel: 'messenger' }
  ]
};

const KANBAN_STAGES = [
  { id: 'Nuevo Lead', title: 'Nuevos Leads', color: 'border-l-blue-500', badgeBg: 'bg-blue-500/10 text-blue-400' },
  { id: 'Contactado', title: 'Contactados', color: 'border-l-amber-500', badgeBg: 'bg-amber-500/10 text-amber-400' },
  { id: 'Propuesta Enviada', title: 'Propuesta Enviada', color: 'border-l-purple-500', badgeBg: 'bg-purple-500/10 text-purple-400' },
  { id: 'Negociación', title: 'En Negociación', color: 'border-l-indigo-500', badgeBg: 'bg-indigo-500/10 text-indigo-400' },
  { id: 'Cerrado Ganado', title: 'Cerrados Ganados', color: 'border-l-emerald-500', badgeBg: 'bg-emerald-500/10 text-emerald-400' },
  { id: 'Cerrado Perdido', title: 'Cerrados Perdidos', color: 'border-l-rose-500', badgeBg: 'bg-rose-500/10 text-rose-400' }
];

const ANALYTICS_DATA = [
  { name: 'Lun', whatsapp: 140, messenger: 45, instagram: 78, conversiones: 18 },
  { name: 'Mar', whatsapp: 210, messenger: 60, instagram: 95, conversiones: 24 },
  { name: 'Mié', whatsapp: 290, messenger: 85, instagram: 130, conversiones: 38 },
  { name: 'Jue', whatsapp: 240, messenger: 70, instagram: 110, conversiones: 31 },
  { name: 'Vie', whatsapp: 350, messenger: 95, instagram: 160, conversiones: 48 },
  { name: 'Sáb', whatsapp: 180, messenger: 30, instagram: 90, conversiones: 20 },
  { name: 'Dom', whatsapp: 110, messenger: 20, instagram: 50, conversiones: 12 }
];

const CHANNEL_PIE_DATA = [
  { name: 'WhatsApp Cloud API', value: 58, color: '#10B981' },
  { name: 'Instagram Direct', value: 27, color: '#E1306C' },
  { name: 'Facebook Messenger', value: 15, color: '#1877F2' }
];

const META_CAMPAIGNS = [
  { id: 'cmp_1', name: 'Conversión Directa WhatsApp - Q4', budget: '$2,500 USD', spent: '$1,840 USD', clicks: 14200, leads: 380, roas: '4.8x', status: 'Activa' },
  { id: 'cmp_2', name: 'Instagram Stories Retargeting', budget: '$1,200 USD', spent: '$980 USD', clicks: 8900, leads: 195, roas: '3.6x', status: 'Activa' },
  { id: 'cmp_3', name: 'B2B Messenger Lead Gen', budget: '$800 USD', spent: '$800 USD', clicks: 4300, leads: 82, roas: '2.9x', status: 'Pausada' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('inbox'); // 'inbox', 'pipeline', 'analytics', 'campaigns', 'contacts', 'settings'
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [selectedContactId, setSelectedContactId] = useState('c1');
  const [newMessageText, setNewMessageText] = useState('');
  const [channelFilter, setChannelFilter] = useState('all');
  const [aiLoading, setAiLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [agentNotes, setAgentNotes] = useState({
    c1: 'Cliente sumamente interesado. Solicita integración especial con WhatsApp API oficial.',
    c2: 'Enviar brochure de precios para agencias.',
    c3: 'Pendiente reunión técnica con equipo de TI.'
  });
  const [currentNote, setCurrentNote] = useState('');
  
  // Modal de contacto
  const [selectedContactModal, setSelectedContactModal] = useState(null);

  // Configuración de Meta
  const [metaConfig, setMetaConfig] = useState({
    pageId: '109283748291029',
    wabaId: '778120394819283',
    phoneNumberId: '10599283019283',
    systemToken: 'EAAG192831029310293810293810293810293810293810293',
    webhookUrl: 'https://crm.metaflow.io/api/v1/webhooks/meta-incoming',
    verifyToken: 'metaflow_secure_webhook_token_2026',
    autoSync: true,
    aiAssistEnabled: true
  });

  const [webhookLogs, setWebhookLogs] = useState([
    { id: 1, event: 'messages.whatsapp.received', status: 200, time: 'Hace 2 min', payload: 'from: +525541238900 (Text: PDF Proposal)' },
    { id: 2, event: 'instagram.direct_message', status: 200, time: 'Hace 14 min', payload: 'from: @sofia_design (Media: Story Link)' },
    { id: 3, event: 'meta.leadgen_webhook', status: 200, time: 'Hace 1 hora', payload: 'form_id: 9918237192 (Lead: Retail SAC)' }
  ]);

  // Campaña WhatsApp Masiva Formulario
  const [broadcastForm, setBroadcastForm] = useState({
    templateName: 'oferta_enterprise_q4',
    segment: 'Alta Prioridad',
    message: '¡Hola {{1}}! Tenemos una promoción especial para {{2}}. ¿Te gustaría agendar una demostración esta semana?'
  });
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  // Filtros
  const selectedContact = useMemo(() => {
    return contacts.find(c => c.id === selectedContactId) || contacts[0];
  }, [contacts, selectedContactId]);

  const filteredContacts = useMemo(() => {
    return contacts.filter(c => {
      const matchesChannel = channelFilter === 'all' || c.channel === channelFilter;
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.phone.includes(searchQuery);
      return matchesChannel && matchesSearch;
    });
  }, [contacts, channelFilter, searchQuery]);

  // Enviar mensaje
  const handleSendMessage = () => {
    if (!newMessageText.trim() || !selectedContactId) return;

    const newMsg = {
      id: `m_${Date.now()}`,
      sender: 'me',
      text: newMessageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      channel: selectedContact.channel
    };

    setMessages(prev => ({
      ...prev,
      [selectedContactId]: [...(prev[selectedContactId] || []), newMsg]
    }));

    setNewMessageText('');

    // Respuesta simulada de Webhook
    setTimeout(() => {
      setMessages(prev => {
        const existing = prev[selectedContactId] || [];
        return {
          ...prev,
          [selectedContactId]: [
            ...existing,
            {
              id: `m_reply_${Date.now()}`,
              sender: 'them',
              text: '¡Excelente! Muchas gracias por la atención inmediata. Estamos revisando los detalles.',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              status: 'delivered',
              channel: selectedContact.channel
            }
          ]
        };
      });

      setWebhookLogs(prev => [
        {
          id: Date.now(),
          event: `messages.${selectedContact.channel}.received`,
          status: 200,
          time: 'Ahora mismo',
          payload: `from: ${selectedContact.phone} (Ack: Delivered)`
        },
        ...prev
      ]);
    }, 2000);
  };

  // Generador IA
  const handleGenerateAiResponse = () => {
    setAiLoading(true);
    setTimeout(() => {
      setNewMessageText(`Hola ${selectedContact.name}, he preparado el desglose para ${selectedContact.company}. Podemos agendar una videollamada hoy mismo para revisar la integración con WhatsApp Cloud API y Meta Ads. ¿Te queda bien a las 4:00 PM?`);
      setAiLoading(false);
    }, 900);
  };

  // Guardar nota del agente
  const handleSaveNote = () => {
    if (!currentNote.trim()) return;
    setAgentNotes(prev => ({
      ...prev,
      [selectedContactId]: currentNote
    }));
    setCurrentNote('');
  };

  // Cambiar etapa Kanban
  const handleUpdateStage = (contactId, newStage) => {
    setContacts(prev => prev.map(c => c.id === contactId ? { ...c, stage: newStage } : c));
  };

  // Ejecutar plantilla masiva
  const handleSendBroadcast = (e) => {
    e.preventDefault();
    setBroadcastSuccess(true);
    setTimeout(() => setBroadcastSuccess(false), 4000);
  };

  // Simular evento Webhook
  const handleTriggerSimulatedWebhook = () => {
    const randomEvent = {
      id: Date.now(),
      event: 'whatsapp_cloud_api.message_inbound',
      status: 200,
      time: 'Ahora mismo',
      payload: 'from: +525599887766 (Payload: "Info sobre precios")'
    };
    setWebhookLogs(prev => [randomEvent, ...prev]);
  };

  // Renders de iconos de canal
  const renderChannelIcon = (channel, size = "w-4 h-4") => {
    switch (channel) {
      case 'whatsapp':
        return <MessageSquare className={`${size} text-emerald-400`} />;
      case 'instagram':
        return <Instagram className={`${size} text-pink-400`} />;
      case 'messenger':
        return <Facebook className={`${size} text-blue-400`} />;
      default:
        return <MessageSquare className={`${size} text-slate-400`} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      
      {/* MENÚ NAVEGACIÓN LATERAL */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between select-none">
        <div>
          {/* Logo */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg leading-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  MetaFlow<span className="text-emerald-400 text-xs ml-1 font-mono">CRM</span>
                </h1>
                <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">Meta & WhatsApp Hub</p>
              </div>
            </div>
          </div>

          {/* Menú de Navegación */}
          <nav className="p-3 space-y-1">
            <button
              onClick={() => setActiveTab('inbox')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'inbox' 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-4 h-4" />
                <span>Bandeja Omnicanal</span>
              </div>
              <span className="bg-emerald-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-full">3</span>
            </button>

            <button
              onClick={() => setActiveTab('pipeline')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'pipeline' 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Kanban className="w-4 h-4" />
                <span>Pipeline de Ventas</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'analytics' 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-4 h-4" />
                <span>Analítica & KPIs</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('campaigns')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'campaigns' 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Megaphone className="w-4 h-4" />
                <span>Campañas & Meta Ads</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-pink-500"></span>
            </button>

            <button
              onClick={() => setActiveTab('contacts')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'contacts' 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Users className="w-4 h-4" />
                <span>Directorio Leads</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'settings' 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Settings className="w-4 h-4" />
                <span>Meta Developer API</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Estado Conexión API */}
        <div className="p-4 border-t border-slate-800">
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">WhatsApp Cloud API</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>WABA ID: 7781...9283</span>
              <span className="text-emerald-400">En línea</span>
            </div>
          </div>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-950 overflow-hidden">
        
        {/* BARRA SUPERIOR */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-bold text-slate-100 capitalize">
              {activeTab === 'inbox' && 'Bandeja de Entrada Unificada'}
              {activeTab === 'pipeline' && 'Embudo de Ventas Kanban'}
              {activeTab === 'analytics' && 'Métricas & Reportes Meta'}
              {activeTab === 'campaigns' && 'Campañas WhatsApp & Meta Ads'}
              {activeTab === 'contacts' && 'Gestión de Leads & Contactos'}
              {activeTab === 'settings' && 'Consola Desarrollador Meta'}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs bg-slate-800 text-slate-300 border border-slate-700">
              En Vivo
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Buscador Rápido */}
            <div className="relative w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar lead, teléfono..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            {/* Perfil Agente */}
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-800">
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-200">Asesor Senior</p>
                <p className="text-[10px] text-emerald-400 font-mono">Agente Activo</p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Agente"
                className="w-8 h-8 rounded-lg object-cover ring-2 ring-emerald-500/30"
              />
            </div>
          </div>
        </header>

        {/* CONTENIDO SEGÚN LA PESTAÑA */}
        <div className="flex-1 overflow-hidden relative">

          {/* 1. BANDEJA DE ENTRADA OMNICANAL */}
          {activeTab === 'inbox' && (
            <div className="h-full flex overflow-hidden">
              
              {/* LISTA DE CHATS */}
              <div className="w-80 border-r border-slate-800 flex flex-col bg-slate-900/30 shrink-0">
                {/* Filtros por canal */}
                <div className="p-3 border-b border-slate-800 flex items-center justify-between gap-1">
                  <button
                    onClick={() => setChannelFilter('all')}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
                      channelFilter === 'all' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setChannelFilter('whatsapp')}
                    className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium transition ${
                      channelFilter === 'whatsapp' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={() => setChannelFilter('instagram')}
                    className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium transition ${
                      channelFilter === 'instagram' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Instagram className="w-3 h-3" />
                    <span>IG</span>
                  </button>
                  <button
                    onClick={() => setChannelFilter('messenger')}
                    className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium transition ${
                      channelFilter === 'messenger' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Facebook className="w-3 h-3" />
                    <span>FB</span>
                  </button>
                </div>

                {/* Items de Chat */}
                <div className="flex-1 overflow-y-auto divide-y divide-slate-800/40">
                  {filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      onClick={() => setSelectedContactId(contact.id)}
                      className={`p-3.5 cursor-pointer transition flex items-start space-x-3 ${
                        selectedContactId === contact.id ? 'bg-slate-800/80 border-l-2 border-emerald-400' : 'hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="relative">
                        <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full object-cover" />
                        <span className="absolute -bottom-1 -right-1 p-0.5 bg-slate-950 rounded-full">
                          {renderChannelIcon(contact.channel)}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4 className="text-xs font-semibold text-slate-200 truncate">{contact.name}</h4>
                          <span className="text-[10px] text-slate-500">{contact.lastActive}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mb-1">{contact.company}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                            ${contact.value.toLocaleString()} USD
                          </span>
                          {contact.unreadCount > 0 && (
                            <span className="bg-emerald-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                              {contact.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PANEL DE CONVERSACIÓN */}
              <div className="flex-1 flex flex-col bg-slate-950">
                {/* Encabezado del Chat */}
                <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/40">
                  <div className="flex items-center space-x-3">
                    <img src={selectedContact.avatar} alt={selectedContact.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-sm text-slate-100">{selectedContact.name}</h3>
                        {renderChannelIcon(selectedContact.channel, "w-4 h-4")}
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
                          {selectedContact.stage}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{selectedContact.company} • {selectedContact.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">
                      <Video className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setSelectedContactModal(selectedContact)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium hover:bg-emerald-500/20 transition flex items-center space-x-1"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Ver Ficha</span>
                    </button>
                  </div>
                </div>

                {/* Mensajes */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/60">
                  {/* Etiqueta Origen Ad Meta */}
                  <div className="flex justify-center">
                    <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1 rounded-full flex items-center space-x-1">
                      <Zap className="w-3 h-3 text-amber-400" />
                      <span>Origen: {selectedContact.adSource}</span>
                    </span>
                  </div>

                  {(messages[selectedContactId] || []).map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 shadow-md ${
                          msg.sender === 'me'
                            ? 'bg-emerald-600 text-white rounded-br-none'
                            : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                        }`}
                      >
                        <p className="leading-relaxed">{msg.text}</p>
                        <div className={`flex items-center justify-end space-x-1 text-[9px] ${msg.sender === 'me' ? 'text-emerald-200' : 'text-slate-500'}`}>
                          <span>{msg.time}</span>
                          {msg.sender === 'me' && <CheckCheck className="w-3 h-3 text-emerald-200" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Caja de Escritura */}
                <div className="p-3 border-t border-slate-800 bg-slate-900/30 space-y-2">
                  {/* Botones de Asistencia IA y Adjuntos */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleGenerateAiResponse}
                        disabled={aiLoading}
                        className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[11px] font-medium hover:opacity-90 transition shadow-sm disabled:opacity-50"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>{aiLoading ? 'Generando...' : 'Respuesta Asistida IA'}</span>
                      </button>
                      <span className="text-[10px] text-slate-500">Plantillas Meta aprobadas disponibles</span>
                    </div>

                    <div className="flex items-center space-x-1 text-slate-400">
                      <button className="p-1.5 hover:text-slate-200 transition"><Paperclip className="w-4 h-4" /></button>
                      <button className="p-1.5 hover:text-slate-200 transition"><Smile className="w-4 h-4" /></button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder={`Escribe un mensaje por ${selectedContact.channel}...`}
                      value={newMessageText}
                      onChange={(e) => setNewMessageText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="p-2.5 bg-emerald-500 text-slate-950 rounded-xl hover:bg-emerald-400 font-bold transition shadow-lg shadow-emerald-500/20"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* PANEL LATERAL DERECHO - DETALLES Y NOTAS */}
              <div className="w-72 border-l border-slate-800 bg-slate-900/40 p-4 space-y-5 overflow-y-auto shrink-0">
                {/* Scoring del Lead */}
                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300">Score de Venta</span>
                    <span className="text-xs font-bold text-emerald-400">{selectedContact.score}/100</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full" style={{ width: `${selectedContact.score}%` }}></div>
                  </div>
                  <p className="text-[10px] text-slate-400">Sentimiento: <span className="text-slate-200 font-medium">{selectedContact.sentiment}</span></p>
                </div>

                {/* Info rápida */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Información Clave</h4>
                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-500">Valor Estimado:</span>
                      <span className="font-semibold text-emerald-400">${selectedContact.value.toLocaleString()} USD</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-500">Ubicación:</span>
                      <span>{selectedContact.city}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-500">Email:</span>
                      <span className="truncate max-w-[120px]">{selectedContact.email}</span>
                    </div>
                  </div>
                </div>

                {/* Etiquetas */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Etiquetas Meta</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedContact.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Notas Rápidas del Agente */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Notas Internas</h4>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 min-h-[60px]">
                    {agentNotes[selectedContactId] || 'Sin notas registradas para este contacto.'}
                  </div>
                  <div className="space-y-1">
                    <textarea
                      placeholder="Agregar nota privada..."
                      value={currentNote}
                      onChange={(e) => setCurrentNote(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50 resize-none h-16"
                    />
                    <button
                      onClick={handleSaveNote}
                      className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-lg transition"
                    >
                      Guardar Nota
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* 2. PIPELINE DE VENTAS (KANBAN) */}
          {activeTab === 'pipeline' && (
            <div className="h-full p-6 overflow-x-auto bg-slate-950">
              <div className="flex space-x-4 min-w-[1200px] h-full pb-4">
                {KANBAN_STAGES.map((stage) => {
                  const stageContacts = contacts.filter(c => c.stage === stage.id);
                  const totalStageValue = stageContacts.reduce((acc, curr) => acc + curr.value, 0);

                  return (
                    <div key={stage.id} className="w-72 bg-slate-900/50 rounded-xl border border-slate-800 flex flex-col h-full">
                      {/* Encabezado Etapa */}
                      <div className={`p-3.5 border-b border-slate-800 border-l-4 ${stage.color} flex items-center justify-between`}>
                        <div>
                          <h3 className="text-xs font-bold text-slate-200">{stage.title}</h3>
                          <p className="text-[10px] text-slate-400">${totalStageValue.toLocaleString()} USD</p>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${stage.badgeBg}`}>
                          {stageContacts.length}
                        </span>
                      </div>

                      {/* Tarjetas de Lead */}
                      <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                        {stageContacts.map((contact) => (
                          <div
                            key={contact.id}
                            className="p-3.5 bg-slate-900 rounded-xl border border-slate-800/80 hover:border-slate-700 transition shadow-sm space-y-3 group"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-2">
                                <img src={contact.avatar} alt={contact.name} className="w-7 h-7 rounded-full object-cover" />
                                <div>
                                  <h4 className="text-xs font-semibold text-slate-200">{contact.name}</h4>
                                  <p className="text-[10px] text-slate-400">{contact.company}</p>
                                </div>
                              </div>
                              {renderChannelIcon(contact.channel)}
                            </div>

                            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/50">
                              <span className="font-bold text-emerald-400">${contact.value.toLocaleString()}</span>
                              <span className="text-[10px] text-slate-500 font-mono">Score: {contact.score}</span>
                            </div>

                            {/* Selector cambio rápido de etapa */}
                            <div className="pt-2">
                              <select
                                value={contact.stage}
                                onChange={(e) => handleUpdateStage(contact.id, e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 text-[10px] text-slate-300 rounded p-1 focus:outline-none focus:border-emerald-500"
                              >
                                {KANBAN_STAGES.map((st) => (
                                  <option key={st.id} value={st.id}>Mover a: {st.title}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. ANALÍTICA Y METRICAS GENERALE */}
          {activeTab === 'analytics' && (
            <div className="h-full p-6 overflow-y-auto space-y-6">
              
              {/* KPIs Principales */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium">Leads Totales Meta</span>
                    <Users className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-slate-100">1,280</span>
                    <span className="text-xs text-emerald-400 flex items-center font-bold">
                      <TrendingUp className="w-3 h-3 mr-0.5" /> +14%
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500">Últimos 30 días vía Meta Ads & Orgánico</p>
                </div>

                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium">Mensajes WhatsApp Cloud</span>
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-slate-100">8,450</span>
                    <span className="text-xs text-emerald-400 flex items-center font-bold">
                      <TrendingUp className="w-3 h-3 mr-0.5" /> +22%
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500">Tasa de respuesta inmediata 98%</p>
                </div>

                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium">Valor Pipeline Comercial</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-slate-100">$99,800 USD</span>
                    <span className="text-xs text-emerald-400 flex items-center font-bold">
                      <TrendingUp className="w-3 h-3 mr-0.5" /> +8.5%
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500">Oportunidades abiertas activas</p>
                </div>

                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium">Tiempo Respuesta Medio</span>
                    <Clock className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-slate-100">1.8 min</span>
                    <span className="text-xs text-emerald-400 font-bold">-45 seg</span>
                  </div>
                  <p className="text-[10px] text-slate-500">Asistido por automatizaciones IA</p>
                </div>
              </div>

              {/* GRÁFICOS RECHARTS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Gráfico de Área - Volumen por Canal */}
                <div className="lg:col-span-2 p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-200">Volumen de Conversaciones por Canal</h3>
                      <p className="text-xs text-slate-400">Tráfico semanal de WhatsApp, Instagram y Messenger</p>
                    </div>
                  </div>

                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={ANALYTICS_DATA}>
                        <defs>
                          <linearGradient id="colorWa" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorIg" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#E1306C" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#E1306C" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                        <YAxis stroke="#64748b" fontSize={11} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                        <Area type="monotone" dataKey="whatsapp" name="WhatsApp" stroke="#10B981" fillOpacity={1} fill="url(#colorWa)" />
                        <Area type="monotone" dataKey="instagram" name="Instagram" stroke="#E1306C" fillOpacity={1} fill="url(#colorIg)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Gráfico Pastel - Distribución Canales */}
                <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-200">Distribución de Leads</h3>
                    <p className="text-xs text-slate-400">Proporción por canal de origen</p>
                  </div>

                  <div className="h-64 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={CHANNEL_PIE_DATA}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {CHANNEL_PIE_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                        <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* 4. CAMPAÑAS Y META ADS */}
          {activeTab === 'campaigns' && (
            <div className="h-full p-6 overflow-y-auto space-y-6">
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Creador de Envíos Masivos WhatsApp */}
                <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
                  <div className="flex items-center space-x-2">
                    <Megaphone className="w-5 h-5 text-emerald-400" />
                    <div>
                      <h3 className="text-sm font-bold text-slate-200">Envío Masivo WhatsApp (Cloud API)</h3>
                      <p className="text-xs text-slate-400">Envía plantillas HSM verificadas por Meta</p>
                    </div>
                  </div>

                  <form onSubmit={handleSendBroadcast} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre de la Plantilla Verificada</label>
                      <select 
                        value={broadcastForm.templateName}
                        onChange={(e) => setBroadcastForm({...broadcastForm, templateName: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                      >
                        <option value="oferta_enterprise_q4">oferta_enterprise_q4 (Aprobada)</option>
                        <option value="recordatorio_demo_live">recordatorio_demo_live (Aprobada)</option>
                        <option value="bienvenida_lead_nuevo">bienvenida_lead_nuevo (Aprobada)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Segmento Objetivo</label>
                      <select 
                        value={broadcastForm.segment}
                        onChange={(e) => setBroadcastForm({...broadcastForm, segment: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Alta Prioridad">Alta Prioridad ({contacts.length} destinatarios)</option>
                        <option value="Enterprise">Leads Enterprise (24 destinatarios)</option>
                        <option value="Todos">Todos los contactos ({contacts.length * 3} destinatarios)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Cuerpo del Mensaje (Parámetros Dinámicos)</label>
                      <textarea
                        value={broadcastForm.message}
                        onChange={(e) => setBroadcastForm({...broadcastForm, message: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 h-20 resize-none font-mono"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Iniciar Envío Programado</span>
                    </button>

                    {broadcastSuccess && (
                      <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-xs text-emerald-400 flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>¡Campaña programada exitosamente! Se transmitirá por la WhatsApp Cloud API.</span>
                      </div>
                    )}
                  </form>
                </div>

                {/* Rastreador de Meta Ads Clic a WhatsApp */}
                <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-5 h-5 text-amber-400" />
                      <div>
                        <h3 className="text-sm font-bold text-slate-200">Campañas Meta Ads (Clic a WhatsApp)</h3>
                        <p className="text-xs text-slate-400">Rendimiento en tiempo real sincronizado</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {META_CAMPAIGNS.map((cmp) => (
                      <div key={cmp.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-200">{cmp.name}</h4>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${cmp.status === 'Activa' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'}`}>
                            {cmp.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-4 gap-2 text-center py-1">
                          <div className="bg-slate-900 p-1.5 rounded">
                            <span className="block text-[9px] text-slate-500">Inversión</span>
                            <span className="text-xs font-semibold text-slate-200">{cmp.spent}</span>
                          </div>
                          <div className="bg-slate-900 p-1.5 rounded">
                            <span className="block text-[9px] text-slate-500">Clics</span>
                            <span className="text-xs font-semibold text-slate-200">{cmp.clicks}</span>
                          </div>
                          <div className="bg-slate-900 p-1.5 rounded">
                            <span className="block text-[9px] text-slate-500">Leads Generados</span>
                            <span className="text-xs font-semibold text-emerald-400">{cmp.leads}</span>
                          </div>
                          <div className="bg-slate-900 p-1.5 rounded">
                            <span className="block text-[9px] text-slate-500">ROAS</span>
                            <span className="text-xs font-semibold text-amber-400">{cmp.roas}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* 5. DIRECTORIO DE CONTACTOS */}
          {activeTab === 'contacts' && (
            <div className="h-full p-6 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-200">Todos los Leads & Clientes Registrados</h3>
                <span className="text-xs text-slate-400">{filteredContacts.length} contactos encontrados</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">Nombre</th>
                      <th className="p-3">Empresa</th>
                      <th className="p-3">Canal</th>
                      <th className="p-3">Etapa</th>
                      <th className="p-3">Valor Estimado</th>
                      <th className="p-3">Score</th>
                      <th className="p-3 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {filteredContacts.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-800/40 transition">
                        <td className="p-3 flex items-center space-x-2">
                          <img src={c.avatar} alt={c.name} className="w-7 h-7 rounded-full object-cover" />
                          <div>
                            <span className="font-semibold text-slate-200 block">{c.name}</span>
                            <span className="text-[10px] text-slate-500">{c.email}</span>
                          </div>
                        </td>
                        <td className="p-3">{c.company}</td>
                        <td className="p-3">{renderChannelIcon(c.channel)}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">
                            {c.stage}
                          </span>
                        </td>
                        <td className="p-3 font-semibold text-emerald-400">${c.value.toLocaleString()} USD</td>
                        <td className="p-3 font-mono">{c.score}/100</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              setSelectedContactId(c.id);
                              setActiveTab('inbox');
                            }}
                            className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md hover:bg-emerald-500/20 transition text-[11px]"
                          >
                            Abrir Chat
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 6. CONSOLA META DEVELOPER HUB */}
          {activeTab === 'settings' && (
            <div className="h-full p-6 overflow-y-auto space-y-6">
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Configuración de Tokens Meta */}
                <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-5 h-5 text-indigo-400" />
                    <div>
                      <h3 className="text-sm font-bold text-slate-200">Credenciales Meta Cloud API</h3>
                      <p className="text-xs text-slate-400">Tokens de acceso permanente de la aplicación</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp Business Account ID (WABA)</label>
                      <input
                        type="text"
                        value={metaConfig.wabaId}
                        onChange={(e) => setMetaConfig({...metaConfig, wabaId: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">ID de Número de Teléfono Registrado</label>
                      <input
                        type="text"
                        value={metaConfig.phoneNumberId}
                        onChange={(e) => setMetaConfig({...metaConfig, phoneNumberId: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Token de Acceso Permanente de Sistema</label>
                      <input
                        type="password"
                        value={metaConfig.systemToken}
                        onChange={(e) => setMetaConfig({...metaConfig, systemToken: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Webhook & Simulador de Eventos */}
                <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Activity className="w-5 h-5 text-emerald-400" />
                        <div>
                          <h3 className="text-sm font-bold text-slate-200">Consola Webhook en Tiempo Real</h3>
                          <p className="text-xs text-slate-400">Escuchando eventos entrantes de Meta Graph API</p>
                        </div>
                      </div>
                      <button
                        onClick={handleTriggerSimulatedWebhook}
                        className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs rounded-lg font-medium transition"
                      >
                        Simular Evento
                      </button>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 h-48 overflow-y-auto font-mono text-[11px]">
                      {webhookLogs.map((log) => (
                        <div key={log.id} className="p-1.5 border-b border-slate-800/60 flex items-center justify-between text-slate-300">
                          <span className="text-emerald-400 font-bold">{log.event}</span>
                          <span className="text-slate-500 text-[10px]">{log.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">URL del Webhook Configurado:</span>
                    <span className="text-xs font-mono text-emerald-400 truncate max-w-[200px]">{metaConfig.webhookUrl}</span>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      </main>

      {/* MODAL DETALLE DE CLIENTE FICHA COMPLETA */}
      {selectedContactModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedContactModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <img src={selectedContactModal.avatar} alt={selectedContactModal.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h3 className="text-base font-bold text-slate-100">{selectedContactModal.name}</h3>
                <p className="text-xs text-slate-400">{selectedContactModal.company}</p>
              </div>
            </div>

            <div className="space-y-2 border-t border-b border-slate-800 py-3 text-xs text-slate-300">
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Teléfono Directo:</span>
                <span className="font-mono">{selectedContactModal.phone}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Email Corporativo:</span>
                <span>{selectedContactModal.email}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Origen Campaña:</span>
                <span className="text-amber-400">{selectedContactModal.adSource}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Etapa Actual:</span>
                <span className="text-emerald-400 font-bold">{selectedContactModal.stage}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedContactModal(null)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-lg transition"
            >
              Cerrar Ficha
            </button>
          </div>
        </div>
      )}

    </div>
  );
}