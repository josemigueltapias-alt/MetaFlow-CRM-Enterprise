import { MessageSquare, Users, Kanban, BarChart3, Megaphone, Settings } from 'lucide-react';
import { ContactStage } from '../types/crm';

interface SidebarProps {
  activeTab: string;
  onSetActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, onSetActiveTab }: SidebarProps) {
  const navItems = [
    { id: 'inbox', label: 'Bandeja Omnicanal', icon: MessageSquare, badge: '3' },
    { id: 'pipeline', label: 'Pipeline de Ventas', icon: Kanban },
    { id: 'analytics', label: 'Analítica & KPIs', icon: BarChart3 },
    { id: 'campaigns', label: 'Campañas & Meta Ads', icon: Megaphone },
    { id: 'contacts', label: 'Directorio Leads', icon: Users },
    { id: 'settings', label: 'Meta Developer API', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between select-none">
      <div>
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                MetaFlow<span className="text-emerald-400 text-xs ml-1 font-mono">CRM</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">Meta & WhatsApp Hub</p>
            </div>
          </div>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map(({ id, label, icon: Icon, badge }) => (
            <button
              key={id}
              onClick={() => onSetActiveTab(id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === id
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </div>
              {badge ? (
                <span className="bg-emerald-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-full">{badge}</span>
              ) : null}
            </button>
          ))}
        </nav>
      </div>

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
  );
}
