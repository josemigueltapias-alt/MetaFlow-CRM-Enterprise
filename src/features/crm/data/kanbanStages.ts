import { KanbanStageDef } from '../types/crm';

export const kanbanStages: KanbanStageDef[] = [
  { id: 'Nuevo Lead', title: 'Nuevos Leads', color: 'border-l-blue-500', badgeBg: 'bg-blue-500/10 text-blue-400' },
  { id: 'Contactado', title: 'Contactados', color: 'border-l-amber-500', badgeBg: 'bg-amber-500/10 text-amber-400' },
  { id: 'Propuesta Enviada', title: 'Propuesta Enviada', color: 'border-l-purple-500', badgeBg: 'bg-purple-500/10 text-purple-400' },
  { id: 'Negociación', title: 'En Negociación', color: 'border-l-indigo-500', badgeBg: 'bg-indigo-500/10 text-indigo-400' },
  { id: 'Cerrado Ganado', title: 'Cerrados Ganados', color: 'border-l-emerald-500', badgeBg: 'bg-emerald-500/10 text-emerald-400' },
  { id: 'Cerrado Perdido', title: 'Cerrados Perdidos', color: 'border-l-rose-500', badgeBg: 'bg-rose-500/10 text-rose-400' },
];
