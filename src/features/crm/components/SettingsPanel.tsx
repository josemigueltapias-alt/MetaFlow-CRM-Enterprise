import { Terminal, Activity } from 'lucide-react';
import { useState } from 'react';

const initialMetaConfig = {
  pageId: '109283748291029',
  wabaId: '778120394819283',
  phoneNumberId: '10599283019283',
  systemToken: 'EAAG192831029310293810293810293810293810293810293',
  webhookUrl: 'https://crm.metaflow.io/api/v1/webhooks/meta-incoming',
  verifyToken: 'metaflow_secure_webhook_token_2026',
  autoSync: true,
  aiAssistEnabled: true,
};

const initialLogs = [
  { id: 1, event: 'messages.whatsapp.received', status: 200, time: 'Hace 2 min', payload: 'from: +525541238900 (Text: PDF Proposal)' },
  { id: 2, event: 'instagram.direct_message', status: 200, time: 'Hace 14 min', payload: 'from: @sofia_design (Media: Story Link)' },
  { id: 3, event: 'meta.leadgen_webhook', status: 200, time: 'Hace 1 hora', payload: 'form_id: 9918237192 (Lead: Retail SAC)' },
];

export function SettingsPanel() {
  const [metaConfig, setMetaConfig] = useState(initialMetaConfig);
  const [webhookLogs, setWebhookLogs] = useState(initialLogs);

  const handleTriggerSimulatedWebhook = () => {
    const randomEvent = {
      id: Date.now(),
      event: 'whatsapp_cloud_api.message_inbound',
      status: 200,
      time: 'Ahora mismo',
      payload: 'from: +525599887766 (Payload: "Info sobre precios")',
    };
    setWebhookLogs((prev) => [randomEvent, ...prev]);
  };

  return (
    <div className="h-full p-6 overflow-y-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                onChange={(e) => setMetaConfig({ ...metaConfig, wabaId: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">ID de Número de Teléfono Registrado</label>
              <input
                type="text"
                value={metaConfig.phoneNumberId}
                onChange={(e) => setMetaConfig({ ...metaConfig, phoneNumberId: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Token de Acceso Permanente de Sistema</label>
              <input
                type="password"
                value={metaConfig.systemToken}
                onChange={(e) => setMetaConfig({ ...metaConfig, systemToken: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

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
  );
}
