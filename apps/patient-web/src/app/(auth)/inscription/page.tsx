'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowRight, HeartPulse, Check, Calculator } from 'lucide-react';
import { COMMUNES_ABIDJAN, ASSURANCES_CI } from '@/components/rdv/store';

export default function InscriptionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '+22507',
    commune: 'Cocody',
    assuranceId: 'CNAM',
    policyNumber: '',
  });
  const [loading, setLoading] = useState(false);

  // Recherche dynamique de l'assurance sélectionnée
  const assurance = useMemo(() => 
    ASSURANCES_CI.find(a => a.id === formData.assuranceId) || ASSURANCES_CI[0],
  [formData.assuranceId]);

  // Calcul live du ticket modérateur (base consultation type : 15 000 FCFA)
  const tarifBase = 15000;
  const montantAssurance = Math.round((tarifBase * assurance.tauxCouverture) / 100);
  const montantPatient = tarifBase - montantAssurance;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Sauvegarde robuste et complète dans le localStorage pour /rdv
    const patientData = {
      id: Date.now().toString(),
      nom: formData.fullName,
      tel: formData.phone.trim(),
      commune: formData.commune,
      assuranceId: assurance.id,
      assuranceNom: assurance.name,
      tauxCouverture: assurance.tauxCouverture,
      numCarte: formData.policyNumber.trim(),
    };

    localStorage.setItem('patient', JSON.stringify(patientData));

    setTimeout(() => {
      setLoading(false);
      router.push('/rdv');
    }, 800);
  };

  return (
    <main className="min-h-screen bg-[#080a0f] text-white flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/15 blur-3xl rounded-full pointer-events-none" />

      <div className="w-full max-w-lg bg-white/[0.05] backdrop-blur-2xl border border-white/[0.08] p-8 rounded-3xl shadow-2xl space-y-6 relative z-10 my-8">
        
        {/* En-tête */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-gradient-to-tr from-sky-400 to-emerald-400 text-slate-950 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-sky-500/30">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-white tracking-tight">Créer mon compte LIFECARE</h1>
            <p className="text-xs text-slate-400">Accédez à l'écosystème e-santé souverain d'Abidjan 🇨🇮</p>
          </div>
        </div>

        {/* Formulaire d'inscription */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Nom et Prénoms</label>
            <input
              type="text"
              required
              placeholder="Ex: Kouadio Konan"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 focus:bg-white/[0.08] focus:border-white/25 outline-none text-sm text-white placeholder:text-slate-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Téléphone (Wave / OM)</label>
              <input
                type="text"
                required
                placeholder="+22507000000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 focus:bg-white/[0.08] focus:border-white/25 outline-none text-sm text-white placeholder:text-slate-500 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Commune à Abidjan</label>
              <select
                value={formData.commune}
                onChange={(e) => setFormData({ ...formData, commune: e.target.value })}
                className="w-full px-4 py-3.5 rounded-2xl bg-[#0d121f] border border-white/10 focus:border-white/25 outline-none text-sm text-white transition-all"
              >
                {COMMUNES_ABIDJAN.map((c) => (
                  <option key={c} value={c} className="bg-slate-900 text-white">{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Section Assurance / Tiers-Payant interactive avec calcul live */}
          <div className="bg-[#11131a] p-4 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                Couverture & Tiers-payant
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                {assurance.tauxCouverture}% pris en charge
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ASSURANCES_CI.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, assuranceId: a.id })}
                  className={`relative p-2.5 rounded-xl border text-left transition-all ${
                    formData.assuranceId === a.id
                      ? 'bg-white text-black border-white shadow-md'
                      : 'bg-white/[0.04] border-white/10 text-slate-400 hover:bg-white/[0.07]'
                  }`}
                >
                  <div className="text-xs font-bold leading-tight truncate">{a.name}</div>
                  <div className="text-[10px] opacity-70 mt-0.5">{a.tauxCouverture}% remboursé</div>
                  {formData.assuranceId === a.id && (
                    <div className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-black text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {formData.assuranceId !== 'NONE' && (
              <div className="space-y-1 pt-1">
                <label className="block text-[11px] font-medium text-slate-400">Numéro de Matricule / Carte ({assurance.name})</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: CI-00123456"
                  value={formData.policyNumber}
                  onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-emerald-500/30 focus:border-emerald-500 outline-none text-xs text-white placeholder:text-slate-500"
                />
              </div>
            )}

            {/* 3. Encadré de calcul live du reste à payer */}
            <div className="bg-sky-500/10 border border-sky-500/20 rounded-xl p-3 flex items-start gap-2.5 text-xs">
              <Calculator className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div className="space-y-1 text-slate-300">
                <p className="font-semibold text-white">Simulation consultation type (15 000 FCFA) :</p>
                <p>
                  Part assurance ({assurance.tauxCouverture}%) : <span className="text-emerald-400 font-bold">{montantAssurance.toLocaleString()} FCFA</span>
                </p>
                <p>
                  Reste à votre charge (Ticket modérateur) : <span className="text-sky-300 font-bold underline">{montantPatient.toLocaleString()} FCFA</span>
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-sky-400 to-emerald-400 hover:brightness-110 text-slate-950 font-black py-4 rounded-2xl shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2 text-sm mt-2 disabled:opacity-60"
          >
            {loading ? 'Création du dossier...' : 'S’inscrire et accéder à l’application'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Lien vers connexion */}
        <div className="text-center pt-2 border-t border-white/10">
          <p className="text-xs text-slate-400">
            Vous avez déjà un compte ?{' '}
            <a href="/connexion" className="text-sky-400 font-bold hover:underline">
              Se connecter
            </a>
          </p>
        </div>

      </div>
    </main>
  );
}