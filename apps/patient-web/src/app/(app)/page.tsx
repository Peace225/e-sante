'use client';

import { useRouter } from 'next/navigation';
import { ShieldCheck, Calendar, ArrowRight, Sparkles, Lock, Smartphone, HeartPulse } from 'lucide-react';

export default function AppHomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#080a0f] text-white flex flex-col relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-2xl mx-auto w-full px-5 py-6 flex flex-col min-h-screen">
        
        {/* Header mini */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center font-bold">
              <HeartPulse className="w-5 h-5" />
            </div>
            <span className="font-black tracking-tight">LIFECARE 360</span>
          </div>
          <div className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 font-medium">
            Abidjan • LIVE 🇨🇮
          </div>
        </div>

        {/* Hero */}
        <div className="flex-1 flex flex-col justify-center space-y-6 py-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide text-sky-300">
              <Sparkles className="w-3.5 h-3.5" />
              SUPER APP E-SANTÉ CI • CNAM CONNECTÉ 🇨🇮
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-black tracking-[-0.04em] leading-[1.05]">
                La santé simplifiée,<br />
                <span className="bg-gradient-to-r from-sky-400 via-teal-200 to-emerald-300 bg-clip-text text-transparent">
                  du RDV au soin.
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-[95%]">
                Trouve un spécialiste à <span className="text-white font-semibold">Cocody, Marcory, Yopougon</span>, bloque ton créneau 10 min (Redis), et paie ton ticket modérateur via <span className="text-white font-semibold">Wave / OM</span>.
              </p>
            </div>
          </div>

          {/* 📸 Image d'un médecin africain professionnel en blouse */}
          <div className="relative w-full h-40 sm:h-48 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000"
              alt="Médecin spécialiste à Abidjan"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-transparent to-transparent flex flex-col justify-end p-4">
              <div className="flex items-center gap-2 text-emerald-300 text-[11px] font-bold bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full w-fit border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Réseau de cliniques partenaires actif à Abidjan
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <button
              onClick={() => router.push('/inscription')}
              className="w-full bg-white text-black font-black py-3.5 px-8 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:bg-zinc-100 transition-all flex items-center justify-center gap-3 text-sm group"
            >
              Créer mon dossier santé
              <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => router.push('/connexion')}
                className="bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white font-semibold py-3.5 rounded-2xl transition-all text-xs sm:text-sm"
              >
                J'ai déjà un compte
              </button>
              <button
                onClick={() => router.push('/rdv')}
                className="bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white font-semibold py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                <Calendar className="w-4 h-4 text-sky-400" />
                Voir les médecins
              </button>
            </div>

            {/* Trust avec de vraies petites photos de profil */}
            <div className="flex items-center justify-center gap-2.5 pt-1 text-xs text-slate-400">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-[#080a0f] object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                  alt="Patient"
                />
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-[#080a0f] object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
                  alt="Patient"
                />
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-[#080a0f] object-cover"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100"
                  alt="Patient"
                />
              </div>
              <span>+1 200 patients assurés CNAM cette semaine</span>
            </div>
          </div>
        </div>

        {/* Bento */}
        <div className="grid grid-cols-3 gap-2.5 pb-6">
          {[
            { icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', title: 'CNAM 70%', desc: 'Ticket modérateur calculé auto' },
            { icon: Lock, color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20', title: 'Lock 10min', desc: 'Anti double-booking Redis' },
            { icon: Smartphone, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', title: 'Wave & OM', desc: 'Paiement + Reçu QR' },
          ].map((f, i) => (
            <div key={i} className="bg-white/[0.04] backdrop-blur border border-white/[0.06] p-3 rounded-2xl space-y-2">
              <div className={`w-7 h-7 rounded-lg ${f.bg} ${f.color} flex items-center justify-center border`}>
                <f.icon className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-[11px] leading-tight">{f.title}</h3>
                <p className="text-[10px] text-slate-400 leading-snug mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-white/[0.06] pt-3 flex justify-between items-center text-xs text-slate-500">
          <p>© 2026 LIFECARE 360 • Cocody</p>
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Opérationnel
          </div>
        </div>
      </div>
    </div>
  );
}