import { X } from 'lucide-react';
import { Contact } from '../types/crm';

interface ContactModalProps {
  contact: Contact | null;
  onClose: () => void;
}

export function ContactModal({ contact, onClose }: ContactModalProps) {
  if (!contact) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3">
          <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover" />
          <div>
            <h3 className="text-base font-bold text-slate-100">{contact.name}</h3>
            <p className="text-xs text-slate-400">{contact.company}</p>
          </div>
        </div>

        <div className="space-y-2 border-t border-b border-slate-800 py-3 text-xs text-slate-300">
          <div className="flex justify-between py-1">
            <span className="text-slate-500">Teléfono Directo:</span>
            <span className="font-mono">{contact.phone}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-500">Email Corporativo:</span>
            <span>{contact.email}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-500">Origen Campaña:</span>
            <span className="text-amber-400">{contact.adSource}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-500">Etapa Actual:</span>
            <span className="text-emerald-400 font-bold">{contact.stage}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-lg transition"
        >
          Cerrar Ficha
        </button>
      </div>
    </div>
  );
}
