'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, ArrowRight, KeyRound } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('superadmin@lifecare360.ci');
  const [password, setPassword] = useState('••••••••••••');
  const [code2FA, setCode2FA] = useState('849201');
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
      {/* Lueur d'arrière-plan */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-sky-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="bg-white/[0.05] backdrop-blur-2xl p-8 rounded-3xl border border-white/10 space-y-6 shadow-2xl relative">
        
        {/* En-tête */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-400 to-emerald-400 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-sky-500/20">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-black tracking-tight text-white">Console Super Admin</h1>
          <p className="text-xs text-sky-400 font-bold flex items-center justify-center gap-1.5">
            Master Node PISAM • Port 3002
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Identifiant Administrateur Réseau
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="email" 
                required
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-[#11131a] border border-white/10 text-sm text-white outline-none focus:border-sky-400 transition-all" 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Clé d'accès Master
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="password" 
                required
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-[#11131a] border border-white/10 text-sm text-white outline-none focus:border-sky-400 transition-all" 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Jeton de sécurité 2FA (ARTCI)
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400" />
              <input 
                type="text" 
                required
                value={code2FA} 
                onChange={e => setCode2FA(e.target.value)} 
                className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-[#11131a] border border-white/10 text-sm font-mono tracking-widest text-sky-300 outline-none focus:border-sky-400 transition-all" 
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-sky-400 to-emerald-400 hover:brightness-110 text-slate-950 font-black py-4 rounded-2xl shadow-lg shadow-sky-500/20 text-xs transition-all flex items-center justify-center gap-2 mt-2"
          >
            {loading ? 'Authentification Master...' : (
              <>
                Déverrouiller la Console <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-3 border-t border-white/10">
          <p className="text-[11px] text-slate-500">
            Supervision Nationale e-Santé • Conformité Loi N°2013-450
          </p>
        </div>
      </div>
    </div>
  );
}