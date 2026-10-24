'use client';

import { TrendingUp, CheckCircle } from 'lucide-react';

export default function FinancesPage() {
  const transactions = [
    { id: 'tr-1', patient: 'Kouadio Konan', mode: 'Wave Mobile Money', montant: 3000, type: 'Ticket Modérateur', date: 'Aujourd’hui, 14:30' },
    { id: 'tr-2', patient: 'Traoré Aminata', mode: 'Orange Money', montant: 2000, type: 'Ticket Modérateur', date: 'Aujourd’hui, 11:15' },
    { id: 'tr-3', patient: 'Bamba Yaya', mode: 'CNAM / Mutuelle', montant: 12000, type: 'Télétransmission', date: 'Hier, 16:00' },
  ];

  return (
    <div className="space-y-6 pb-28 relative text-white">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* En-tête de section */}
      <div className="pb-4 border-b border-white/10">
        <h2 className="text-xl font-black tracking-tight text-white">Finances & Télétransmissions</h2>
        <p className="text-xs text-emerald-400 font-bold">Suivi des encaissements Wave/OM et remboursements mutuelles</p>
      </div>

      {/* Cartes de KPIs financiers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/[0.05] backdrop-blur-2xl p-5 rounded-3xl border border-white/10 space-y-2 shadow-xl">
          <span className="text-xs uppercase font-bold text-slate-400">Total Encaissé (Patients)</span>
          <p className="text-2xl font-black text-white">125 000 <span className="text-xs text-sky-400">FCFA</span></p>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> +15% ce mois</p>
        </div>

        <div className="bg-white/[0.05] backdrop-blur-2xl p-5 rounded-3xl border border-white/10 space-y-2 shadow-xl">
          <span className="text-xs uppercase font-bold text-slate-400">En attente (CNAM / Mutuelles)</span>
          <p className="text-2xl font-black text-white">450 000 <span className="text-xs text-emerald-400">FCFA</span></p>
          <p className="text-[11px] text-slate-400">Traitement sous 48h</p>
        </div>

        <div className="bg-white/[0.05] backdrop-blur-2xl p-5 rounded-3xl border border-white/10 space-y-2 shadow-xl">
          <span className="text-xs uppercase font-bold text-slate-400">Consultations du mois</span>
          <p className="text-2xl font-black text-white">42</p>
          <p className="text-[11px] text-sky-400">PISAM - Cocody</p>
        </div>
      </div>

      {/* Historique des transactions */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Derniers règlements & flux</h2>

        <div className="space-y-3">
          {transactions.map(tx => (
            <div key={tx.id} className="bg-white/[0.05] backdrop-blur-xl p-4 rounded-3xl border border-white/10 flex justify-between items-center shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{tx.patient}</h3>
                  <p className="text-xs text-slate-400">{tx.mode} • {tx.date}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="font-black text-emerald-300 text-sm">+{tx.montant.toLocaleString()} FCFA</span>
                <span className="block text-[10px] text-slate-400">{tx.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}