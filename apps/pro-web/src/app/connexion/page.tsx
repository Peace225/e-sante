'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Stethoscope, ShieldCheck, ArrowRight, Lock } from 'lucide-react';

export default function ProLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('dr.kouassi@pisam.ci');
  const [password, setPassword] = useState('********');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/'); // Redirection vers le dashboard praticien
    }, 800);
  };

  return (
    <main className="min-h-screen bg-[#080a0f] text-white flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/15 blur-3xl rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-white/[0.05] backdrop-blur-2xl border border-white/[0.08] p-8 rounded-3xl shadow-2xl space-y-6 relative z-10">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-gradient-to-tr from-emerald-400 to-sky-400 text-slate-950 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-black tracking-tight">Portail Praticien</h1>
            <p className="text-xs text-slate-400">Accès sécurisé réservé au corps médical 🇨🇮</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Email Professionnel / Ordre</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-sm text-white outline-none focus:border-emerald-400 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Mot de passe</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-sm text-white outline-none focus:border-emerald-400 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-400 to-sky-400 hover:brightness-110 text-slate-950 font-black py-4 rounded-2xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 text-sm mt-2"
          >
            {loading ? 'Authentification...' : 'Se connecter au cabinet'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </main>
  );
}