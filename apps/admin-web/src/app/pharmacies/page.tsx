'use client';

import { useState, useEffect } from 'react';
import { Store, Plus, CheckCircle2, MapPin, ShieldCheck, KeyRound, Trash2 } from 'lucide-react';

type Pharma = {
  id: string;
  name: string;
  commune: string;
  titulaire: string;
  email: string;
  licence: string;
  status: 'ACTIF' | 'SUSPENDU';
};

const INITIAL_PHARMAS: Pharma[] = [
  { id: 'PH-01', name: 'Pharmacie du Plateau', commune: 'Plateau', titulaire: 'Dr. Koné Seydou', email: 'pharma.plateau@lifecare.ci', licence: 'ORD-CI-2026-089', status: 'ACTIF' },
  { id: 'PH-02', name: 'Grande Pharmacie des Deux Plateaux', commune: 'Cocody', titulaire: 'Dr. Bamba Aminata', email: 'contact@pharma2plateaux.ci', licence: 'ORD-CI-2026-112', status: 'ACTIF' },
  { id: 'PH-03', name: 'Pharmacie Sainte-famille Riviera', commune: 'Cocody', titulaire: 'Dr. Aka Laurent', email: 'riviera@lifecare.ci', licence: 'ORD-CI-2026-154', status: 'ACTIF' },
];

export default function AdminPharmaciesPage() {
  const [pharmas, setPharmas] = useState<Pharma[]>(INITIAL_PHARMAS);
  const [name, setName] = useState('');
  const [commune, setCommune] = useState('Cocody');
  const [titulaire, setTitulaire] = useState('');
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('lifecare_admin_pharmas');
    if (saved) {
      try { setPharmas(JSON.parse(saved)); } catch {}
    }
  }, []);

  const savePharmas = (list: Pharma[]) => {
    setPharmas(list);
    localStorage.setItem('lifecare_admin_pharmas', JSON.stringify(list));
  };

  const handleAddPharma = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !titulaire || !email) return;

    const newPharma: Pharma = {
      id: `PH-0${pharmas.length + 1}`,
      name,
      commune,
      titulaire,
      email,
      licence: `ORD-CI-2026-${Math.floor(200 + Math.random() * 700)}`,
      status: 'ACTIF',
    };

    const updated = [newPharma, ...pharmas];
    savePharmas(updated);
    setName('');
    setTitulaire('');
    setEmail('');
    setToast(`Accès pharma-web (3004) généré pour ${newPharma.name}`);
    setTimeout(() => setToast(''), 4000);
  };

  const toggleStatus = (id: string) => {
    const updated = pharmas.map(p =>
      p.id === id ? { ...p, status: p.status === 'ACTIF' ? 'SUSPENDU' : 'ACTIF' } as Pharma : p
    );
    savePharmas(updated);
  };

  return (
    <div className="space-y-6 pb-28 relative text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="flex justify-between items-center pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-400" /> Habilitation des Pharmacies Partenaires
          </h2>
          <p className="text-xs text-emerald-400 font-bold">Création et révocation des accès au portail pharma-web (Port 3004)</p>
        </div>
        <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs px-3.5 py-1.5 rounded-full font-bold">
          {pharmas.filter(p => p.status === 'ACTIF').length} Officines actives
        </span>
      </div>

      {toast && (
        <div className="bg-emerald-500/10 border border-emerald-400/30 p-4 rounded-2xl text-emerald-200 text-xs flex items-center gap-3 shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="font-bold">{toast}</span>
        </div>
      )}

      {/* Formulaire d'ajout d'officine */}
      <form onSubmit={handleAddPharma} className="bg-white/[0.05] backdrop-blur-2xl p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-emerald-400" /> Ouvrir un nouvel accès Officine (Ordre des Pharmaciens CI)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nom de la pharmacie (ex: Pharmacie Mermoz)"
            required
            className="px-4 py-3 rounded-2xl bg-[#0d0f16] border border-white/10 text-xs text-white placeholder:text-slate-500 outline-none focus:border-emerald-400"
          />
          <input
            value={titulaire}
            onChange={e => setTitulaire(e.target.value)}
            placeholder="Pharmacien Titulaire (ex: Dr. Koffi Marc)"
            required
            className="px-4 py-3 rounded-2xl bg-[#0d0f16] border border-white/10 text-xs text-white placeholder:text-slate-500 outline-none focus:border-emerald-400"
          />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email de connexion pharma-web"
            required
            className="px-4 py-3 rounded-2xl bg-[#0d0f16] border border-white/10 text-xs text-white placeholder:text-slate-500 outline-none focus:border-emerald-400"
          />
          <select
            value={commune}
            onChange={e => setCommune(e.target.value)}
            className="px-4 py-3 rounded-2xl bg-[#0d0f16] border border-white/10 text-xs text-white outline-none focus:border-emerald-400"
          >
            <option value="Plateau">Abidjan - Plateau</option>
            <option value="Cocody">Abidjan - Cocody</option>
            <option value="Marcory">Abidjan - Marcory</option>
            <option value="Yopougon">Abidjan - Yopougon</option>
            <option value="Treichville">Abidjan - Treichville</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black px-6 py-3 rounded-2xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4" /> Générer les identifiants pharma-web
        </button>
      </form>

      {/* Liste des Pharmacies */}
      <div className="space-y-3">
        {pharmas.map(pharma => (
          <div key={pharma.id} className="bg-white/[0.05] backdrop-blur-xl p-5 rounded-3xl border border-white/10 flex flex-col sm:flex-row justify-between sm:items-center gap-4 shadow-xl">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="font-bold text-white text-sm">{pharma.name}</span>
                <span className="text-[10px] font-mono bg-white/10 px-2.5 py-0.5 rounded-full text-slate-300">{pharma.licence}</span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {pharma.commune} • Titulaire : <strong className="text-slate-200">{pharma.titulaire}</strong>
              </p>
              <p className="text-[11px] font-mono text-emerald-400">{pharma.email}</p>
            </div>

            <div className="flex items-center gap-2.5">
              <span className={`text-[11px] px-3 py-1 rounded-full font-bold border ${
                pharma.status === 'ACTIF'
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
              }`}>
                {pharma.status}
              </span>
              <button
                onClick={() => toggleStatus(pharma.id)}
                className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-2 rounded-xl text-slate-300 font-semibold transition-all"
              >
                {pharma.status === 'ACTIF' ? 'Suspendre' : 'Réactiver'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}