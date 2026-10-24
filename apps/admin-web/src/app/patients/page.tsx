'use client';

import { useState } from 'react';
import { Users, Search, ShieldCheck, CreditCard, Activity } from 'lucide-react';

export default function AdminPatientsPage() {
  const [search, setSearch] = useState('');
  const [patients] = useState([
    { id: 'PAT-901', name: 'Kouadio Konan', cmu: 'CMU-CI-88492019', assurance: 'MCI Care (80%)', commune: 'Cocody', consentementArtci: true, lastSync: 'Aujourd’hui, 14:32' },
    { id: 'PAT-902', name: 'Ahoua Grâce', cmu: 'CMU-CI-77381920', assurance: 'CNAM (70%)', commune: 'Plateau', consentementArtci: true, lastSync: 'Aujourd’hui, 11:15' },
    { id: 'PAT-903', name: 'Yao Kouamé', cmu: 'CMU-CI-66291044', assurance: 'ASCOMA (80%)', commune: 'Marcory', consentementArtci: true, lastSync: 'Hier, 18:40' },
    { id: 'PAT-904', name: 'Bakayoko Fatou', cmu: 'CMU-CI-55109283', assurance: 'CNAM (70%)', commune: 'Yopougon', consentementArtci: true, lastSync: 'Hier, 09:20' },
  ]);

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.cmu.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-28 relative text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="flex justify-between items-center pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-violet-400" /> Registre Patients & Conformité ARTCI
          </h2>
          <p className="text-xs text-violet-400 font-bold">Supervision des identités numériques de santé • patient-web (Port 3000)</p>
        </div>
        <div className="bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs px-3.5 py-1.5 rounded-full font-bold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" /> Chiffrement Loi N°2013-450
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="bg-white/[0.05] backdrop-blur-2xl p-4 rounded-3xl border border-white/10 flex gap-2 shadow-xl">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher par nom ou numéro de sécurité sociale CMU..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#0d0f16] border border-white/10 text-xs text-white placeholder:text-slate-500 outline-none focus:border-violet-400"
          />
        </div>
      </div>

      {/* Liste des dossiers */}
      <div className="space-y-3">
        {filtered.map(pat => (
          <div key={pat.id} className="bg-white/[0.05] backdrop-blur-xl p-5 rounded-3xl border border-white/10 flex flex-col sm:flex-row justify-between sm:items-center gap-4 shadow-xl">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h3 className="font-bold text-white text-sm">{pat.name}</h3>
                <span className="text-[10px] font-mono bg-white/10 px-2.5 py-0.5 rounded-full text-violet-300">{pat.cmu}</span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-3">
                <span className="flex items-center gap-1"><CreditCard className="w-3.5 h-3.5 text-sky-400" /> {pat.assurance}</span>
                <span>•</span>
                <span>{pat.commune}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Dernière synchro</p>
                <p className="text-xs text-slate-200 font-medium">{pat.lastSync}</p>
              </div>
              <span className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" /> Consentement Actif
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}