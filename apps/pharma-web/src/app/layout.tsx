'use client';

import './globals.css';
import { Store, History, Package, QrCode, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PharmaLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/connexion';

  return (
    <html lang="fr">
      <body className="min-h-screen bg-[#080a0f] text-white flex overflow-x-hidden">
        
        {/* Sidebar Fixe Pharmacie (Masquée sur /connexion) */}
        {!isLoginPage && (
          <aside className="w-64 border-r border-white/10 bg-white/[0.02] backdrop-blur-xl hidden md:flex flex-col justify-between p-6 fixed h-screen z-20">
            <div className="space-y-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-400 to-sky-400 text-slate-950 flex items-center justify-center font-black">
                  PH
                </div>
                <span className="font-black tracking-tight text-white">LIFECARE <span className="text-emerald-400">PHARMA</span></span>
              </div>

              <nav className="space-y-1.5 text-xs font-semibold">
                <Link href="/" className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${pathname === '/' ? 'bg-white/10 text-white shadow-md' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                  <QrCode className="w-4 h-4 text-emerald-400" /> Scanner & Délivrance
                </Link>
                <Link href="/historique" className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${pathname === '/historique' ? 'bg-white/10 text-white shadow-md' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                  <History className="w-4 h-4 text-slate-400" /> Historique & Flux
                </Link>
                <Link href="/stock" className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${pathname === '/stock' ? 'bg-white/10 text-white shadow-md' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                  <Package className="w-4 h-4 text-slate-400" /> Gestion des Stocks
                </Link>
              </nav>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <div className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-2xl border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  P7
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-tight">Pharma Plateau</p>
                  <p className="text-[10px] text-emerald-400 font-medium">Connecté</p>
                </div>
              </div>
              <Link 
                href="/connexion"
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 transition-all"
              >
                <LogOut className="w-4 h-4" /> Déconnexion
              </Link>
            </div>
          </aside>
        )}

        {/* Contenu de la page (Plein écran centré si /connexion, sinon avec marge pour la sidebar) */}
        <main className={`flex-1 min-h-screen p-4 sm:p-6 relative ${!isLoginPage ? 'md:ml-64' : 'w-full flex items-center justify-center'}`}>
          
          {/* Header Global (Masqué sur /connexion) */}
          {!isLoginPage && (
            <header className="max-w-4xl mx-auto flex justify-between items-center pt-2 pb-6 border-b border-white/10 mb-6">
              <div>
                <h1 className="text-xl font-black tracking-tight text-white">Pharmacie du Plateau</h1>
                <p className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5" /> Abidjan • Réseau Partenaire LIFECARE
                </p>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs px-3.5 py-1.5 rounded-full font-bold">
                Portail Officiel v3.6
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