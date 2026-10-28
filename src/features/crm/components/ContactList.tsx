import { MessageSquare, Instagram, Facebook } from 'lucide-react';
import { Contact, Channel } from '../types/crm';

interface ContactListProps {
  contacts: Contact[];
  selectedContactId: string;
  onSelectContact: (id: string) => void;
  channelFilter: 'all' | Channel;
  onSetChannelFilter: (filter: 'all' | Channel) => void;
  searchQuery: string;
  onSearch: (value: string) => void;
}

const renderChannelIcon = (channel: Channel, size = 'w-4 h-4') => {
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

export function ContactList({
  contacts,
  selectedContactId,
  onSelectContact,
  channelFilter,
  onSetChannelFilter,
  searchQuery,
  onSearch,
}: ContactListProps) {
  return (
    <div className="w-80 border-r border-slate-800 flex flex-col bg-slate-900/30 shrink-0">
      <div className="p-3 border-b border-slate-800 flex items-center justify-between gap-1">
        {(['all', 'whatsapp', 'instagram', 'messenger'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => onSetChannelFilter(filter)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
              channelFilter === filter ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {filter === 'all' ? 'Todos' : filter === 'whatsapp' ? 'WhatsApp' : filter === 'instagram' ? 'IG' : 'FB'}
          </button>
        ))}
      </div>

      <div className="p-3 border-b border-slate-800">
        <input
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          placeholder="Buscar lead..."
        />
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-slate-800/40">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => onSelectContact(contact.id)}
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
  );
}
