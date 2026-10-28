import { Megaphone, Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { metaCampaigns } from '../data/metaCampaigns';

export function CampaignsPanel() {
  const [broadcastForm, setBroadcastForm] = useState({
    templateName: 'oferta_enterprise_q4',
    segment: 'Alta Prioridad',
    message: '¡Hola {{1}}! Tenemos una promoción especial para {{2}}. ¿Te gustaría agendar una demostración esta semana?',
  });
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  const handleSendBroadcast = (event: React.FormEvent) => {
    event.preventDefault();
    setBroadcastSuccess(true);
    setTimeout(() => setBroadcastSuccess(false), 4000);
  };

  return (
    <div className="h-full p-6 overflow-y-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                onChange={(e) => setBroadcastForm({ ...broadcastForm, templateName: e.target.value })}
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
                onChange={(e) => setBroadcastForm({ ...broadcastForm, segment: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="Alta Prioridad">Alta Prioridad</option>
                <option value="Enterprise">Leads Enterprise</option>
                <option value="Todos">Todos</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Cuerpo del Mensaje (Parámetros Dinámicos)</label>
              <textarea
                value={broadcastForm.message}
                onChange={(e) => setBroadcastForm({ ...broadcastForm, message: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 h-20 resize-none font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Iniciar Envío Programado</span>
            </button>

            {broadcastSuccess && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-xs text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>¡Campaña programada exitosamente! Se transmitirá por la WhatsApp Cloud API.</span>
              </div>
            )}
          </form>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
          <div className="flex items-center space-x-2">
            <Megaphone className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold text-slate-200">Campañas Meta Ads</h3>
              <p className="text-xs text-slate-400">Rendimiento en tiempo real sincronizado</p>
            </div>
          </div>

          <div className="space-y-3">
            {metaCampaigns.map((campaign) => (
              <div key={campaign.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-200">{campaign.name}</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${campaign.status === 'Activa' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                    {campaign.status}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center py-1">
                  <div className="bg-slate-900 p-1.5 rounded">
                    <span className="block text-[9px] text-slate-500">Inversión</span>
                    <span className="text-xs font-semibold text-slate-200">{campaign.spent}</span>
                  </div>
                  <div className="bg-slate-900 p-1.5 rounded">
                    <span className="block text-[9px] text-slate-500">Clics</span>
                    <span className="text-xs font-semibold text-slate-200">{campaign.clicks}</span>
                  </div>
                  <div className="bg-slate-900 p-1.5 rounded">
                    <span className="block text-[9px] text-slate-500">Leads</span>
                    <span className="text-xs font-semibold text-emerald-400">{campaign.leads}</span>
                  </div>
                  <div className="bg-slate-900 p-1.5 rounded">
                    <span className="block text-[9px] text-slate-500">ROAS</span>
                    <span className="text-xs font-semibold text-amber-400">{campaign.roas}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
