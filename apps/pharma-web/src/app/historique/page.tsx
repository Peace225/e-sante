'use client';

import { useState } from 'react';
import { History, CheckCircle2, ShieldCheck, Pill, Calendar } from 'lucide-react';

export default function HistoriquePage() {
  const [history] = useState([
    {
      id: 'ORD-001',
      patient: 'Kouadio Konan',
      meds: ['Amlodipine 5mg', 'Paracétamol 1g'],
      assurance: 'MCI Care (80%)',
      montantTotal: 15000,
      partPatient: 3000,
      date: 'Aujourd’hui, 14:45'
    },
    {
      id: 'ORD-098',
      patient: 'Traoré Aminata',
      meds: ['Amoxicilline 500mg'],
      assurance: 'CNAM (70%)',
      montantTotal: 8500,
      partPatient: 2550,
      date: 'Hier, 11:20'
    },
  ]);

  return (
    <div className="space-y-6 pb-28 relative text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="flex justify-between items-center pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-black tracking-tight text-white">Historique des Délivrances</h2>
          <p className="text-xs text-emerald-400 font-bold">Suivi des ordonnances scannées et télétransmissions mutuelles</p>
        </div>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-2xl text-xs">
          <History className="w-4 h-4 text-emerald-400" />
          <span className="font-bold">{history.length} transactions</span>
        </div>
      </div>

      <div className="space-y-4">
        {history.map(item => (
          <div key={item.id} className="bg-white/[0.05] backdrop-blur-xl border border-white/10 p-5 rounded-3xl space-y-3 shadow-xl">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {item.patient}
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" /> {item.date} • <ShieldCheck className="w-3.5 h-3.5 text-sky-400" /> {item.assurance}
                </p>
              </div>
              <span className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full font-bold">
                {item.id}
              </span>
            </div>

            <div className="bg-[#11131a] p-3.5 rounded-2xl border border-white/10 text-xs space-y-1">
              <p className="text-[10px] uppercase font-bold text-slate-400">Produits délivrés :</p>
              {item.meds.map(m => (
                <p key={m} className="text-emerald-300 font-medium flex items-center gap-1.5">
                  <Pill className="w-3.5 h-3.5 text-emerald-400" /> {m}
                </p>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2 text-xs text-slate-300 border-t border-white/10">
              <span>Total prescription : <strong className="text-white">{item.montantTotal.toLocaleString()} FCFA</strong></span>
              <span>Ticket réglé par patient : <strong className="text-emerald-300">{item.partPatient.toLocaleString()} FCFA</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}