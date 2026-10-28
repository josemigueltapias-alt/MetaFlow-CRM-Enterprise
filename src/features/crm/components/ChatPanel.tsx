import { MessageSquare, Phone, Video, Info, Paperclip, Smile, Sparkles, Send } from 'lucide-react';
import { Contact, Message } from '../types/crm';

interface ChatPanelProps {
  selectedContact: Contact;
  messages: Message[];
  newMessageText: string;
  onSetNewMessageText: (value: string) => void;
  onSendMessage: () => void;
  onGenerateAiReply: () => void;
  aiLoading: boolean;
  onOpenContactModal: (contact: Contact) => void;
}

const renderChannelIcon = (channel: Contact['channel'], size = 'w-4 h-4') => {
  switch (channel) {
    case 'whatsapp':
      return <MessageSquare className={`${size} text-emerald-400`} />;
    case 'instagram':
      return <span className={`${size} text-pink-400`}>◎</span>;
    case 'messenger':
      return <span className={`${size} text-blue-400`}>f</span>;
    default:
      return <MessageSquare className={`${size} text-slate-400`} />;
  }
};

export function ChatPanel({
  selectedContact,
  messages,
  newMessageText,
  onSetNewMessageText,
  onSendMessage,
  onGenerateAiReply,
  aiLoading,
  onOpenContactModal,
}: ChatPanelProps) {
  return (
    <div className="flex-1 flex flex-col bg-slate-950">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/40">
        <div className="flex items-center space-x-3">
          <img src={selectedContact.avatar} alt={selectedContact.name} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-sm text-slate-100">{selectedContact.name}</h3>
              {renderChannelIcon(selectedContact.channel, 'w-4 h-4')}
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
                {selectedContact.stage}
              </span>
            </div>
            <p className="text-xs text-slate-400">{selectedContact.company} • {selectedContact.phone}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"><Phone className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"><Video className="w-4 h-4" /></button>
          <button
            onClick={() => onOpenContactModal(selectedContact)}
            className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium hover:bg-emerald-500/20 transition flex items-center space-x-2"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Ver Ficha</span>
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/60">
        <div className="flex justify-center">
          <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1 rounded-full flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Origen: {selectedContact.adSource}</span>
          </span>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 shadow-md ${
              msg.sender === 'me'
                ? 'bg-emerald-600 text-white rounded-br-none'
                : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
            }`}>
              <p className="leading-relaxed">{msg.text}</p>
              <div className={`flex items-center justify-end space-x-1 text-[9px] ${msg.sender === 'me' ? 'text-emerald-200' : 'text-slate-500'}`}>
                <span>{msg.time}</span>
                {msg.sender === 'me' && <span>✓✓</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-slate-800 bg-slate-900/30 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={onGenerateAiReply}
              disabled={aiLoading}
              className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[11px] font-medium hover:opacity-90 transition"
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
            onChange={(e) => onSetNewMessageText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
          <button
            onClick={onSendMessage}
            className="p-2.5 bg-emerald-500 text-slate-950 rounded-xl hover:bg-emerald-400 font-bold transition shadow-lg shadow-emerald-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
