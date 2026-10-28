import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, Legend } from 'recharts';
import { analyticsData } from '../data/analyticsData';

const channelPieData = [
  { name: 'WhatsApp Cloud API', value: 58, color: '#10B981' },
  { name: 'Instagram Direct', value: 27, color: '#E1306C' },
  { name: 'Facebook Messenger', value: 15, color: '#1877F2' },
];

export function AnalyticsDashboard() {
  return (
    <div className="h-full p-6 overflow-y-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Leads Totales Meta', value: '1,280', trend: '+14%', color: 'text-emerald-400' },
          { label: 'Mensajes WhatsApp Cloud', value: '8,450', trend: '+22%', color: 'text-emerald-400' },
          { label: 'Valor Pipeline Comercial', value: '$99,800 USD', trend: '+8.5%', color: 'text-emerald-400' },
          { label: 'Tiempo Respuesta Medio', value: '1.8 min', trend: '-45 seg', color: 'text-indigo-400' },
        ].map((card) => (
          <div key={card.label} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">{card.label}</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-slate-100">{card.value}</span>
              <span className={`text-xs ${card.color} font-bold`}>{card.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-200">Volumen de Conversaciones por Canal</h3>
            <p className="text-xs text-slate-400">Tráfico semanal de WhatsApp, Instagram y Messenger</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="colorWa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorIg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E1306C" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#E1306C" stopOpacity={0} />
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

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-200">Distribución de Leads</h3>
            <p className="text-xs text-slate-400">Proporción por canal de origen</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={channelPieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {channelPieData.map((entry, index) => (
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
  );
}
