'use client';

import Link from 'next/link';
import { Store, Stethoscope, Users, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-6 pb-28 relative text-white">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* En-tête de section */}
      <div className="pb-4 border-b border-white/10 space-y-1">
        <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-sky-400" /> Administration Générale LIFECARE 360
        </h2>
        <p className="text-xs text-sky-400 font-bold">Port 3002 • Super Admin PISAM • Supervision et gestion des accès réseau</p>
      </div>

      {/* Cartes de navigation rapide */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link 
          href="/pharmacies" 
          className="bg-white/[0.05] backdrop-blur-2xl p-6 rounded-3xl border border-white/10 hover:border-emerald-400/50 hover:bg-white/[0.08] transition-all space-y-3 shadow-xl group"
        >
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Store className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Pharmacies</h3>
            <p className="text-xs text-slate-400 mt-1">Créer et gérer les accès pour <code className="text-emerald-300 font-mono">pharma-web (3004)</code></p>
          </div>
        </Link>

        <Link 
          href="/medecins" 
          className="bg-white/[0.05] backdrop-blur-2xl p-6 rounded-3xl border border-white/10 hover:border-sky-400/50 hover:bg-white/[0.08] transition-all space-y-3 shadow-xl group"
        >
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Stethoscope className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 transition-colors" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Médecins</h3>
            <p className="text-xs text-slate-400 mt-1">Validation des numéros RPPS et des accès <code className="text-sky-300 font-mono">pro-web</code></p>
          </div>
        </Link>

        <Link 
          href="/patients" 
          className="bg-white/[0.05] backdrop-blur-2xl p-6 rounded-3xl border border-white/10 hover:border-violet-400/50 hover:bg-white/[0.08] transition-all space-y-3 shadow-xl group"
        >
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <Users className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-violet-400 transition-colors" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Patients</h3>
            <p className="text-xs text-slate-400 mt-1">Supervision de la base <code className="text-violet-300 font-mono">patient-web (3000)</code></p>
          </div>
        </Link>
      </div>
    </div>
  );
}