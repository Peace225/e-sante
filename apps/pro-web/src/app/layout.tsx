'use client';

import './globals.css';
import { LayoutDashboard, Users, FileText, Calendar, Wallet, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ProLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/connexion';

  return (
    <html lang="fr">
      <body className="min-h-screen bg-[#080a0f] text-white flex overflow-x-hidden">
        
        {/* Sidebar Fixe Global (Masquée sur /connexion) */}
        {!isLoginPage && (
          <aside className="w-64 border-r border-white/10 bg-white/[0.02] backdrop-blur-xl hidden md:flex flex-col justify-between p-6 fixed h-screen z-20">
            <div className="space-y-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-400 to-sky-400 text-slate-950 flex items-center justify-center font-black">
                  LC
                </div>
                <span className="font-black tracking-tight text-white">LIFECARE <span className="text-sky-400">PRO</span></span>
              </div>

              <nav className="space-y-1.5 text-xs font-semibold">
                <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-400 hover:bg-white/5 hover:text-white transition-all">
                  <LayoutDashboard className="w-4 h-4 text-sky-400" /> Tableau de bord
                </Link>
                <Link href="/patients" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-400 hover:bg-white/5 hover:text-white transition-all">
                  <Users className="w-4 h-4 text-slate-400" /> Patients
                </Link>
                <Link href="/ordonnances" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-400 hover:bg-white/5 hover:text-white transition-all">
                  <FileText className="w-4 h-4 text-slate-400" /> Ordonnances
                </Link>
                <Link href="/planning" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-400 hover:bg-white/5 hover:text-white transition-all">
                  <Calendar className="w-4 h-4 text-slate-400" /> Planning
                </Link>
                <Link href="/finances" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-400 hover:bg-white/5 hover:text-white transition-all">
                  <Wallet className="w-4 h-4 text-slate-400" /> Finances
                </Link>
              </nav>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link 
                href="/connexion"
                className="w-full flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 transition-all"
              >
                <LogOut className="w-4 h-4" /> Déconnexion
              </Link>
            </div>
          </aside>
        )}

        {/* Contenu de la page (Plein écran si /connexion, sinon avec marge pour la sidebar) */}
        <main className={`flex-1 min-h-screen p-4 sm:p-6 relative ${!isLoginPage ? 'md:ml-64' : 'w-full flex items-center justify-center'}`}>
          
          {/* En-tête Global avec Profil (Masqué sur /connexion) */}
          {!isLoginPage && (
            <header className="max-w-4xl mx-auto flex justify-between items-center pt-2 pb-6 border-b border-white/10 mb-6">
              <div>
                <h1 className="text-xl font-black tracking-tight text-white">Dr. Kouassi Jean-Marc</h1>
                <p className="text-xs text-sky-400 font-bold">Cardiologue • PISAM, Cocody • Abidjan</p>
              </div>
              
              <div className="flex items-center gap-3 bg-white/[0.05] border border-white/10 px-3.5 py-2 rounded-2xl shadow-xl">
                <div className="w-9 h-9 bg-gradient-to-tr from-sky-400 to-emerald-400 text-slate-950 rounded-xl flex items-center justify-center font-black text-sm shadow-md">
                  KJ
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-bold text-white leading-tight">Dr. Kouassi</p>
                  <p className="text-[10px] text-emerald-400 font-medium">Session Active</p>
                </div>
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