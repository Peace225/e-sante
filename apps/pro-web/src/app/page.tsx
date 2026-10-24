'use client';

import { useState, useEffect } from 'react';
import { QrCode, CheckCircle2, Clock, User, Search } from 'lucide-react';

type RDV = {
  id: string;
  patientName: string;
  assurance: string;
  slot: string;
  status: 'CONFIRMED' | 'CHECKED_IN' | 'DONE';
  total: number;
  patientPaid: number;
  hash: string;
};

export default function ProDashboard() {
  const [rdvs, setRdvs] = useState<RDV[]>([
    { id: 'apt-1', patientName: 'Kouadio Konan', assurance: 'MCI Care (80%)', slot: '14:30', status: 'CONFIRMED', total: 15000, patientPaid: 3000, hash: 'LIFECARE-SECURE-HASH-89423719' },
    { id: 'apt-2', patientName: 'Kouadio Junior (ayant droit)', assurance: 'MCI Care', slot: '15:00', status: 'CONFIRMED', total: 10000, patientPaid: 2000, hash: 'LIFECARE-SECURE-HASH-12345678' },
  ]);
  const [scanInput, setScanInput] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'CONFIRMED' | 'CHECKED_IN'>('ALL');

  useEffect(() => {
    const savedRdv = localStorage.getItem('lastRdv');
    const savedHash = localStorage.getItem('lastQrHash');
    if (savedRdv) {
      try {
        const parsed = JSON.parse(savedRdv);
        const newRdv: RDV = {
          id: parsed.id || 'apt-dynamic',
          patientName: parsed.doctorName ? 'Kouadio Konan' : 'Patient LIFECARE',
          assurance: parsed.assuranceNom || 'CNAM (70%)',
          slot: parsed.slot || '14:30',
          status: 'CONFIRMED',
          total: parsed.tarif?.montantTotal || parsed.montantTotal || 15000,
          patientPaid: parsed.tarif?.montantPatient || parsed.patientPaid || 3000,
          hash: savedHash || 'LIFECARE-SECURE-HASH-89423719',
        };
        setRdvs(prev => {
          if (prev.some(r => r.hash === newRdv.hash)) return prev;
          return [newRdv, ...prev];
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleScan = () => {
    const found = rdvs.find(r => r.hash === scanInput.trim() || r.id === scanInput.trim());
    if (!found) { 
      alert('QR Invalide - RDV non trouvé'); 
      return; 
    }
    setRdvs(rdvs.map(r => r.id === found.id ? { ...r, status: 'CHECKED_IN' as const } : r));
    setScanInput('');
  };

  const handleFinish = (id: string) => {
    setRdvs(rdvs.map(r => r.id === id ? { ...r, status: 'DONE' as const } : r));
  };

  const filtered = filter === 'ALL' ? rdvs : rdvs.filter(r => r.status === filter);

  return (
    <div className="space-y-6 pb-28 relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Scanner */}
      <div className="bg-white/[0.05] backdrop-blur-2xl p-6 rounded-3xl border border-white/10 space-y-3 shadow-2xl">
        <h2 className="font-black text-sm flex items-center gap-2">
          <QrCode className="w-4 h-4 text-sky-400" /> Scanner Pass Sécurisé
        </h2>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              value={scanInput} 
              onChange={e => setScanInput(e.target.value)} 
              placeholder="LIFECARE-SECURE-HASH-..."
              className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-[#11131a] border border-white/10 text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-400/50 font-mono transition-all" 
            />
          </div>
          <button 
            onClick={handleScan} 
            className="bg-white text-black font-black px-6 rounded-2xl text-sm hover:brightness-110 transition-all shadow-md"
          >
            Valider
          </button>
        </div>
        <p className="text-[11px] text-slate-400">
          Copiez le hash depuis <code className="text-sky-300">/mes-rdv</code> côté patient pour simuler le check-in au guichet.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div 
          onClick={() => setFilter('ALL')} 
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${filter === 'ALL' ? 'bg-white text-black border-white shadow-lg' : 'bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/[0.06]'}`}
        >
          <p className="text-[10px] uppercase font-bold opacity-60">Total</p>
          <p className="text-xl font-black">{rdvs.length}</p>
        </div>
        <div 
          onClick={() => setFilter('CONFIRMED')} 
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${filter === 'CONFIRMED' ? 'bg-amber-400 text-black border-amber-400 shadow-lg' : 'bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/[0.06]'}`}
        >
          <p className="text-[10px] uppercase font-bold opacity-60">En attente</p>
          <p className="text-xl font-black">{rdvs.filter(r => r.status === 'CONFIRMED').length}</p>
        </div>
        <div 
          onClick={() => setFilter('CHECKED_IN')} 
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${filter === 'CHECKED_IN' ? 'bg-emerald-400 text-black border-emerald-400 shadow-lg' : 'bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/[0.06]'}`}
        >
          <p className="text-[10px] uppercase font-bold opacity-60">Arrivés</p>
          <p className="text-xl font-black">{rdvs.filter(r => r.status === 'CHECKED_IN').length}</p>
        </div>
      </div>

      {/* Liste RDV */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">File d'attente - Aujourd'hui</h2>
        {filtered.filter(r => r.status !== 'DONE').map(rdv => (
          <div key={rdv.id} className="bg-white/[0.05] backdrop-blur-xl p-5 rounded-3xl border border-white/10 flex justify-between items-center shadow-xl">
            <div className="space-y-1">
              <h3 className="font-bold flex items-center gap-2 text-white">
                <User className="w-4 h-4 text-sky-400" />
                {rdv.patientName} 
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-bold ${rdv.status === 'CHECKED_IN' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-amber-500/10 border-amber-500/20 text-amber-300'}`}>
                  {rdv.status}
                </span>
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                {rdv.slot} • {rdv.assurance} • Réglé Wave : <strong className="text-emerald-300">{rdv.patientPaid.toLocaleString()}F</strong> / {rdv.total.toLocaleString()}F
              </p>
              <p className="font-mono text-[10px] text-sky-300/70">{rdv.hash}</p>
            </div>
            {rdv.status === 'CHECKED_IN' ? (
              <button 
                onClick={() => handleFinish(rdv.id)} 
                className="bg-emerald-400 hover:bg-emerald-300 text-black font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" /> Terminer
              </button>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <QrCode className="w-5 h-5 text-slate-500" />
              </div>
            )}
          </div>
        ))}
        {filtered.filter(r => r.status !== 'DONE').length === 0 && (
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 text-center text-sm text-slate-400">
            Aucun patient en attente dans cette catégorie.
          </div>
        )}
      </div>
    </div>
  );
}