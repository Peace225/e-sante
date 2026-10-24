'use client';

import { useState } from 'react';
import { Package, AlertCircle, CheckCircle, Search } from 'lucide-react';

export default function StockPage() {
  const [search, setSearch] = useState('');
  const [medicaments] = useState([
    { id: 'm-1', name: 'Amlodipine 5mg', stock: 140, seuilMin: 20, status: 'EN_STOCK' },
    { id: 'm-2', name: 'Paracétamol 1g', stock: 12, seuilMin: 30, status: 'STOCK_FAIBLE' },
    { id: 'm-3', name: 'Amoxicilline 500mg', stock: 85, seuilMin: 15, status: 'EN_STOCK' },
    { id: 'm-4', name: 'Metformine 500mg', stock: 0, seuilMin: 25, status: 'RUPTURE' },
  ]);

  const filtered = medicaments.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 pb-28 relative text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="flex justify-between items-center pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-black tracking-tight text-white">Gestion des Stocks Pharmacie</h2>
          <p className="text-xs text-emerald-400 font-bold">Inventaire en temps réel et alertes de réapprovisionnement</p>
        </div>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-2xl text-xs">
          <Package className="w-4 h-4 text-emerald-400" />
          <span className="font-bold">{medicaments.length} références</span>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="bg-white/[0.05] backdrop-blur-2xl p-4 rounded-3xl border border-white/10 flex gap-2 shadow-xl">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Rechercher un médicament dans l'inventaire..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#11131a] border border-white/10 text-sm text-white placeholder:text-slate-500 outline-none focus:border-emerald-400 transition-all" 
          />
        </div>
      </div>

      {/* Liste du stock */}
      <div className="space-y-3">
        {filtered.map(med => (
          <div key={med.id} className="bg-white/[0.05] backdrop-blur-xl p-5 rounded-3xl border border-white/10 flex justify-between items-center shadow-xl">
            <div className="space-y-1">
              <h3 className="font-bold text-white text-base">{med.name}</h3>
              <p className="text-xs text-slate-400">Quantité en stock : <strong className="text-white">{med.stock} boîtes</strong> (Seuil d'alerte : {med.seuilMin})</p>
            </div>

            <div>
              {med.status === 'EN_STOCK' && (
                <span className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" /> En stock
                </span>
              )}
              {med.status === 'STOCK_FAIBLE' && (
                <span className="text-xs bg-amber-500/10 border border-amber-500/20 text-amber-300 px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" /> Stock faible
                </span>
              )}
              {med.status === 'RUPTURE' && (
                <span className="text-xs bg-rose-500/10 border border-rose-500/20 text-rose-300 px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" /> En rupture
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}