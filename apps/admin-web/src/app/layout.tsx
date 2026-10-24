'use client';

import './globals.css';
import { LayoutDashboard, Store, Stethoscope, Users, ShieldCheck, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/connexion';

  return (
    <html lang="fr">
      <body className="min-h-screen bg-[#080a0f] text-white flex overflow-x-hidden">
        
        {!isLoginPage && (
          <aside className="w-64 border-r border-white/10 bg-white/[0.02] backdrop-blur-xl hidden md:flex flex-col justify-between p-6 fixed h-screen z-20">
            <div className="space-y-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-400 to-emerald-400 text-slate-950 flex items-center justify-center font-black">
                  AD
                </div>
                <span className="font-black tracking-tight text-white">LIFECARE <span className="text-sky-400">ADMIN</span></span>
              </div>

              <nav className="space-y-1.5 text-xs font-semibold">
                <Link href="/" className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${pathname === '/' ? 'bg-white/10 text-white shadow-md' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                  <LayoutDashboard className="w-4 h-4 text-sky-400" /> Vue d'ensemble
                </Link>
                <Link href="/pharmacies" className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${pathname === '/pharmacies' ? 'bg-white/10 text-white shadow-md' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                  <Store className="w-4 h-4 text-emerald-400" /> Pharmacies
                </Link>
                <Link href="/medecins" className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${pathname === '/medecins' ? 'bg-white/10 text-white shadow-md' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                  <Stethoscope className="w-4 h-4 text-sky-400" /> Médecins
                </Link>
                <Link href="/patients" className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${pathname === '/patients' ? 'bg-white/10 text-white shadow-md' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                  <Users className="w-4 h-4 text-violet-400" /> Patients
                </Link>
              </nav>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <div className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-2xl border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs">
                  SA
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-tight">Super Admin</p>
                  <p className="text-[10px] text-sky-400 font-medium">PISAM • Abidjan</p>
                </div>
              </div>
              <Link href="/connexion" className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 transition-all">
                <LogOut className="w-4 h-4" /> Déconnexion
              </Link>
            </div>
          </aside>
        )}

        <main className={`flex-1 min-h-screen p-4 sm:p-6 relative ${!isLoginPage ? 'md:ml-64' : 'w-full flex items-center justify-center'}`}>
          {!isLoginPage && (
            <header className="max-w-4xl mx-auto flex justify-between items-center pt-2 pb-6 border-b border-white/10 mb-6">
              <div>
                <h1 className="text-xl font-black tracking-tight text-white">Console d'Administration</h1>
                <p className="text-xs text-sky-400 font-bold">Supervision globale de l'écosystème e-santé LIFECARE 360</p>
              </div>
              <div className="bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs px-3.5 py-1.5 rounded-full font-bold">
                Master Node • Port 3002
              </div>
            </header>
          )}

          <div className={!isLoginPage ? "max-w-4xl mx-auto" : "w-full"}>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}