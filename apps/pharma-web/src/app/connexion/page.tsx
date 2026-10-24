'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Store, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function PharmaLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('pharma.plateau@lifecare.ci');
  const [password, setPassword] = useState('********');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/');
    }, 800);
  };

  return (
    <div className="w-full max-w-md mx-auto py-12 relative text-white">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="bg-white/[0.05] backdrop-blur-2xl p-8 rounded-3xl border border-white/10 space-y-6 shadow-2xl relative">
        
        {/* En-tête du form */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-400 to-sky-400 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
            <Store className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-black tracking-tight text-white">Portail Pharmacie Partenaire</h1>
          <p className="text-xs text-emerald-400 font-bold flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Accès sécurisé interopérable e-santé
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Email Officiel Pharmacie</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="email" 
                required
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-[#11131a] border border-white/10 text-sm text-white outline-none focus:border-emerald-400 transition-all" 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="password" 
                required
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-[#11131a] border border-white/10 text-sm text-white outline-none focus:border-emerald-400 transition-all" 
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-400 to-sky-400 hover:brightness-110 text-slate-950 font-black py-4 rounded-2xl shadow-lg shadow-emerald-500/20 text-xs transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Connexion en cours...' : (
              <>
                Se connecter au comptoir <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-white/10">
          <p className="text-[11px] text-slate-500">
            Réseau de distribution pharmaceutique • Abidjan, Côte d'Ivoire
          </p>
        </div>
      </div>
    </div>
  );
}