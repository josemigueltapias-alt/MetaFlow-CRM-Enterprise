import { Contact } from '../types/crm';

interface ContactDetailPanelProps {
  selectedContact: Contact;
  agentNotes: Record<string, string>;
  currentNote: string;
  onSetCurrentNote: (value: string) => void;
  onSaveNote: () => void;
}

export function ContactDetailPanel({
  selectedContact,
  agentNotes,
  currentNote,
  onSetCurrentNote,
  onSaveNote,
}: ContactDetailPanelProps) {
  return (
    <div className="w-72 border-l border-slate-800 bg-slate-900/40 p-4 space-y-5 overflow-y-auto shrink-0">
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

      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Etiquetas Meta</h4>
        <div className="flex flex-wrap gap-1.5">
          {selectedContact.tags.map((tag, index) => (
            <span key={index} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Notas Internas</h4>
        <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 min-h-[60px]">
          {agentNotes[selectedContact.id] || 'Sin notas registradas para este contacto.'}
        </div>
        <div className="space-y-1">
          <textarea
            placeholder="Agregar nota privada..."
            value={currentNote}
            onChange={(e) => onSetCurrentNote(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50 resize-none h-16"
          />
          <button
            onClick={onSaveNote}
            className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-lg transition"
          >
            Guardar Nota
          </button>
        </div>
      </div>
    </div>
  );
}
