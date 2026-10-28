import { Contact, ContactStage } from '../types/crm';
import { kanbanStages } from '../data/kanbanStages';

interface PipelineBoardProps {
  contacts: Contact[];
  onUpdateStage: (contactId: string, newStage: ContactStage) => void;
}

export function PipelineBoard({ contacts, onUpdateStage }: PipelineBoardProps) {
  return (
    <div className="h-full p-6 overflow-x-auto bg-slate-950">
      <div className="flex space-x-4 min-w-[1200px] h-full pb-4">
        {kanbanStages.map((stage) => {
          const stageContacts = contacts.filter((contact) => contact.stage === stage.id);
          const totalStageValue = stageContacts.reduce((acc, current) => acc + current.value, 0);

          return (
            <div key={stage.id} className="w-72 bg-slate-900/50 rounded-xl border border-slate-800 flex flex-col h-full">
              <div className={`p-3.5 border-b border-slate-800 border-l-4 ${stage.color} flex items-center justify-between`}>
                <div>
                  <h3 className="text-xs font-bold text-slate-200">{stage.title}</h3>
                  <p className="text-[10px] text-slate-400">${totalStageValue.toLocaleString()} USD</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${stage.badgeBg}`}>
                  {stageContacts.length}
                </span>
              </div>

              <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                {stageContacts.map((contact) => (
                  <div key={contact.id} className="p-3.5 bg-slate-900 rounded-xl border border-slate-800/80 hover:border-slate-700 transition shadow-sm space-y-3 group">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <img src={contact.avatar} alt={contact.name} className="w-7 h-7 rounded-full object-cover" />
                        <div>
                          <h4 className="text-xs font-semibold text-slate-200">{contact.name}</h4>
                          <p className="text-[10px] text-slate-400">{contact.company}</p>
                        </div>
                      </div>
                      <span className="text-emerald-400">{contact.channel}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/50">
                      <span className="font-bold text-emerald-400">${contact.value.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-500 font-mono">Score: {contact.score}</span>
                    </div>

                    <div className="pt-2">
                      <select
                        value={contact.stage}
                        onChange={(e) => onUpdateStage(contact.id, e.target.value as ContactStage)}
                        className="w-full bg-slate-950 border border-slate-800 text-[10px] text-slate-300 rounded p-1 focus:outline-none focus:border-emerald-500"
                      >
                        {kanbanStages.map((option) => (
                          <option key={option.id} value={option.id}>{option.title}</option>
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
  );
}
