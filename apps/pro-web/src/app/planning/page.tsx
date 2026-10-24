'use client';
import { useState, useEffect } from 'react';
import { Clock, Lock, Calendar as CalIcon } from 'lucide-react';

type Slot = { 
  id: string; 
  time: string; 
  status: 'AVAILABLE' | 'LOCKED' | 'BOOKED' | 'BLOCKED'; 
  patient: string | null; 
  expiresAt?: number 
};

// Pas de Date.now() statique ici pour éviter le décalage SSR
const DEFAULT_SLOTS: Slot[] = [
  { id: '1', time: '09:00 - 09:30', status: 'AVAILABLE', patient: null },
  { id: '2', time: '09:30 - 10:00', status: 'LOCKED', patient: 'Kouadio Konan (Redis Lock)' },
  { id: '3', time: '10:00 - 10:30', status: 'BOOKED', patient: 'Traoré Aminata' },
  { id: '4', time: '14:30 - 15:00', status: 'BOOKED', patient: 'Kouadio Konan (Confirmé)' },
  { id: '5', time: '15:00 - 15:30', status: 'AVAILABLE', patient: null },
  { id: '6', time: '16:00 - 16:30', status: 'BLOCKED', patient: 'Pause / Urgence' },
];

export default function PlanningPage() {
  // Initialisation SSR-safe identique serveur/client pour éviter tout warning d'hydratation
  const [slots, setSlots] = useState<Slot[]>(DEFAULT_SLOTS);
  const [isClient, setIsClient] = useState(false);

  // Chargement propre du localStorage et initialisation dynamique du temps après le montage client
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('pro_planning_slots');
    if (saved) {
      try {
        setSlots(JSON.parse(saved));
      } catch (e) {
        console.error("Erreur lecture planning", e);
      }
    } else {
      // Attribue un expiresAt propre basé sur le temps réel du client (ex: 10 minutes)
      setSlots(prev => prev.map(s => s.status === 'LOCKED' ? { ...s, expiresAt: Date.now() + 600000 } : s));
    }
  }, []);

  // Gestion de l'expiration du verrou Redis (10 min) en temps réel
  useEffect(() => {
    if (!isClient) return;
    const interval = setInterval(() => {
      setSlots(prevSlots => 
        prevSlots.map(slot => {
          if (slot.status === 'LOCKED' && slot.expiresAt && Date.now() > slot.expiresAt) {
            return { ...slot, status: 'AVAILABLE', patient: null, expiresAt: undefined };
          }
          return slot;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [isClient]);

  // Sauvegarde dans le localStorage uniquement après le rendu client
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('pro_planning_slots', JSON.stringify(slots));
    }
  }, [slots, isClient]);

  const toggleSlotStatus = (id: string) => {
    setSlots(prev => prev.map(slot => {
      if (slot.id === id) {
        if (slot.status === 'AVAILABLE') return { ...slot, status: 'BLOCKED', patient: 'Créneau bloqué' };
        if (slot.status === 'BLOCKED') return { ...slot, status: 'AVAILABLE', patient: null };
      }
      return slot;
    }));
  };

  return (
    <div className="space-y-6 pb-28 relative text-white">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* En-tête de section (Intégré proprement avec le ProLayout) */}
      <div className="flex justify-between items-center pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-black tracking-tight text-white">Gestion du Planning & Créneaux</h2>
          <p className="text-xs text-emerald-400 font-bold">Synchronisation Redis en direct avec l'application patient</p>
        </div>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-2xl text-xs font-semibold">
          <CalIcon className="w-4 h-4 text-emerald-400" />
          <span>Aujourd'hui</span>
        </div>
      </div>

      {/* Grille des créneaux */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Horaires de consultation du jour</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {slots.map(slot => (
            <div 
              key={slot.id} 
              className={`p-4 rounded-3xl border backdrop-blur-xl flex justify-between items-center transition-all shadow-xl ${
                slot.status === 'BOOKED' ? 'bg-sky-500/10 border-sky-500/20' :
                slot.status === 'LOCKED' ? 'bg-amber-500/10 border-amber-500/20' :
                slot.status === 'BLOCKED' ? 'bg-white/[0.02] border-white/5 opacity-50' :
                'bg-white/[0.05] border-white/10'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-white text-sm">{slot.time}</span>
                </div>
                <p className="text-xs text-slate-400">
                  {slot.patient ? slot.patient : (slot.status === 'BLOCKED' ? 'Créneau bloqué' : 'Disponible pour réservation')}
                </p>
              </div>

              <div>
                {slot.status === 'BOOKED' ? (
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    BOOKED
                  </span>
                ) : slot.status === 'LOCKED' ? (
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1 animate-pulse">
                    <Lock className="w-3 h-3" /> Redis Lock (10m)
                  </span>
                ) : (
                  <button
                    onClick={() => toggleSlotStatus(slot.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      slot.status === 'BLOCKED' ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30' : 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30'
                    }`}
                  >
                    {slot.status === 'BLOCKED' ? 'Débloquer' : 'Bloquer'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}