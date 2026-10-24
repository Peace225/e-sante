'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Phone, ArrowRight, HeartPulse, ShieldCheck } from 'lucide-react';

export default function ConnexionPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('07');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock auth + save patient for assurance flow
    const patient = localStorage.getItem('patient');
    if (!patient) {
      localStorage.setItem('patient', JSON.stringify({ tel: phone, assurance: 'cnam', nom: 'Patient Test' }));
    }

    setTimeout(() => {
      setLoading(false);
      router.push('/rdv');
    }, 900);
  };

  return (
    <main className="min-h-screen bg-[#080a0f] text-white flex flex-col items-center justify-center p-5 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/15 blur-3xl rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-black tracking-tight">Bon retour 👋</h1>
            <p className="text-sm text-slate-400 mt-1">Connecte-toi à ton dossier CNAM</p>
          </div>
        </div>

        <div className="bg-white/[0.05] backdrop-blur-2xl border border-white/[0.08] p-6 rounded-3xl shadow-2xl space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest text-slate-400 uppercase">Numéro Wave / OM</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-white transition-colors" />
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0701234567"
                  className="w-full pl-11 pr-14 py-3.5 rounded-2xl bg-white/[0.06] border border-white/10 focus:bg-white/[0.08] focus:border-white/20 focus:ring-0 outline-none text-sm font-medium placeholder:text-slate-500 transition-all text-white"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold bg-white text-black px-2.5 py-1 rounded-full">CI</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold tracking-widest text-slate-400 uppercase">Mot de passe</label>
                <button type="button" className="text-xs text-sky-400 hover:text-sky-300">Oublié ?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-white transition-colors" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/[0.06] border border-white/10 focus:bg-white/[0.08] focus:border-white/20 focus:ring-0 outline-none text-sm font-medium placeholder:text-slate-500 transition-all text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-zinc-100 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed group mt-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  Se connecter
                  <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </>
              )}
            </button>
          </form>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-slate-500">ou</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="text-center space-y-3">
            <p className="text-xs text-slate-400">
              Pas de dossier ?{' '}
              <a href="/inscription" className="text-white font-bold hover:underline underline-offset-4">
                Créer avec mon assurance
              </a>
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-3 h-3" />
              CNAM • NSIA • SUNU acceptées
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">© 2026 LIFECARE 360 • Données chiffrées AES-256</p>
      </div>
    </main>
  );
}