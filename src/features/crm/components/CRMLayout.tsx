import { Search, MessageSquare, Phone, Video } from 'lucide-react';
import { ContactList } from './ContactList';
import { ChatPanel } from './ChatPanel';
import { ContactDetailPanel } from './ContactDetailPanel';
import { PipelineBoard } from './PipelineBoard';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { CampaignsPanel } from './CampaignsPanel';
import { SettingsPanel } from './SettingsPanel';
import { ContactModal } from './ContactModal';
import { useCrmState } from '../hooks/useCrmState';
import { useState } from 'react';

export function CRMLayout() {
  const crm = useCrmState();
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedContactModal, setSelectedContactModal] = useState<any>(null);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'inbox':
        return (
          <div className="h-full flex overflow-hidden">
            <ContactList
              contacts={crm.filteredContacts}
              selectedContactId={crm.selectedContactId}
              onSelectContact={crm.setSelectedContactId}
              channelFilter={crm.channelFilter}
              onSetChannelFilter={crm.setChannelFilter}
              searchQuery={crm.searchQuery}
              onSearch={crm.setSearchQuery}
            />

            <ChatPanel
              selectedContact={crm.selectedContact}
              messages={crm.messages[crm.selectedContactId] ?? []}
              newMessageText={crm.newMessageText}
              onSetNewMessageText={crm.setNewMessageText}
              onSendMessage={crm.sendMessage}
              onGenerateAiReply={crm.generateAiReply}
              aiLoading={crm.aiLoading}
              onOpenContactModal={setSelectedContactModal}
            />

            <ContactDetailPanel
              selectedContact={crm.selectedContact}
              agentNotes={crm.agentNotes}
              currentNote={crm.currentNote}
              onSetCurrentNote={crm.setCurrentNote}
              onSaveNote={crm.saveNote}
            />
          </div>
        );
      case 'pipeline':
        return <PipelineBoard contacts={crm.contacts} onUpdateStage={crm.updateContactStage} />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'campaigns':
        return <CampaignsPanel />;
      case 'contacts':
        return (
          <div className="h-full p-6 overflow-y-auto space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-200">Todos los Leads & Clientes Registrados</h3>
              <span className="text-xs text-slate-400">{crm.filteredContacts.length} contactos encontrados</span>
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
                  {crm.filteredContacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-slate-800/40 transition">
                      <td className="p-3 flex items-center space-x-2">
                        <img src={contact.avatar} alt={contact.name} className="w-7 h-7 rounded-full object-cover" />
                        <div>
                          <span className="font-semibold text-slate-200 block">{contact.name}</span>
                          <span className="text-[10px] text-slate-500">{contact.email}</span>
                        </div>
                      </td>
                      <td className="p-3">{contact.company}</td>
                      <td className="p-3">
                        <MessageSquare className="w-4 h-4 text-emerald-400" />
                      </td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">{contact.stage}</span></td>
                      <td className="p-3 font-semibold text-emerald-400">${contact.value.toLocaleString()} USD</td>
                      <td className="p-3 font-mono">{contact.score}/100</td>
                      <td className="p-3 text-right">
                        <button onClick={() => { crm.setSelectedContactId(contact.id); setActiveTab('inbox'); }} className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md hover:bg-emerald-500/20 transition text-[11px]">
                          Abrir Chat
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'settings':
        return <SettingsPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
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
            {[
              { id: 'inbox', label: 'Bandeja Omnicanal', icon: MessageSquare, badge: '3' },
              { id: 'pipeline', label: 'Pipeline de Ventas', icon: Search },
              { id: 'analytics', label: 'Analítica & KPIs', icon: Search },
              { id: 'campaigns', label: 'Campañas & Meta Ads', icon: Search },
              { id: 'contacts', label: 'Directorio Leads', icon: Search },
              { id: 'settings', label: 'Meta Developer API', icon: Search },
            ].map(({ id, label, icon: Icon, badge }) => (
              <button key={id} onClick={() => setActiveTab(id)} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === id ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
                <div className="flex items-center space-x-3"><Icon className="w-4 h-4" /><span>{label}</span></div>
                {badge ? <span className="bg-emerald-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-full">{badge}</span> : null}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">WhatsApp Cloud API</span>
              <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono"><span>WABA ID: 7781...9283</span><span className="text-emerald-400">En línea</span></div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-slate-950 overflow-hidden">
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
            <span className="px-2.5 py-0.5 rounded-full text-xs bg-slate-800 text-slate-300 border border-slate-700">En Vivo</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Buscar lead, teléfono..." value={crm.searchQuery} onChange={(e) => crm.setSearchQuery(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50" />
            </div>
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-800">
              <div className="text-right"><p className="text-xs font-semibold text-slate-200">Asesor Senior</p><p className="text-[10px] text-emerald-400 font-mono">Agente Activo</p></div>
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Agente" className="w-8 h-8 rounded-lg object-cover ring-2 ring-emerald-500/30" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden relative">{renderTabContent()}</div>
      </main>

      {selectedContactModal && <ContactModal contact={selectedContactModal} onClose={() => setSelectedContactModal(null)} />}
    </div>
  );
}
