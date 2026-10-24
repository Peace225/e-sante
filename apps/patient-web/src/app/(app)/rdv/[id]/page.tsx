'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, ShieldCheck, QrCode, X, CheckCircle } from 'lucide-react';

export default function MesRdvPage() {
  const router = useRouter();
  const [rdv, setRdv] = useState<any>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrHash, setQrHash] = useState('');

  useEffect(() => {
    const savedRdv = localStorage.getItem('lastRdv');
    if (savedRdv) {
      try {
        const parsed = JSON.parse(savedRdv);
        setRdv(parsed);
        
        // Récupération ou génération unique du hash de sécurité persistant
        let hash = localStorage.getItem('lastQrHash');
        if (!hash) {
          hash = `LIFECARE-SECURE-HASH-${Math.floor(10000000 + Math.random() * 90000000)}`;
          localStorage.setItem('lastQrHash', hash);
        }
        setQrHash(hash);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6 pb-28 text-white relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* En-tête */}
      <div className="flex justify-between items-center pt-2">
        <h1 className="text-xl font-black tracking-tight text-white">Mes Rendez-vous</h1>
        <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          1 Actif
        </span>
      </div>

      {!rdv ? (
        <div className="bg-white/[0.04] backdrop-blur-xl p-8 rounded-3xl text-center border border-white/10 space-y-3">
          <p className="text-slate-300 font-medium text-sm">Aucun rendez-vous actif pour le moment.</p>
          <button
            onClick={() => router.push('/rdv')}
            className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold py-3 px-6 rounded-2xl text-xs transition-all shadow-lg shadow-sky-500/20"
          >
            Prendre un rendez-vous
          </button>
        </div>
      ) : (
        <div className="bg-white/[0.05] backdrop-blur-2xl p-6 rounded-3xl border border-white/10 shadow-2xl space-y-5">
          {/* Badge Statut */}
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              <CheckCircle className="w-3.5 h-3.5" />
              Payé & Confirmé (Wave)
            </div>
            <span className="text-xs text-slate-400 font-mono">Réf: #{rdv.id?.slice(-6) || '360'}</span>
          </div>

          {/* Infos Médecin */}
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-black text-white text-lg">{rdv.doctorName}</h3>
                <p className="text-xs text-sky-400 font-semibold">{rdv.specialty}</p>
                <p className="text-xs text-slate-400 mt-1">{rdv.cabinet}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-sky-400" />
                <span>{rdv.slot} • {rdv.date || 'Aujourd’hui'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span>{rdv.commune}, Abidjan</span>
              </div>
            </div>
          </div>

          {/* Récapitulatif Financier Tiers-Payant */}
          <div className="bg-[#11131a] p-4 rounded-2xl border border-white/10 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Montant total consultation :</span>
              <span>{rdv.tarif?.montantTotal?.toLocaleString() || rdv.montantTotal?.toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between text-emerald-300 font-medium">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Prise en charge ({rdv.assuranceNom}) :
              </span>
              <span>- {rdv.tarif?.montantAssurance?.toLocaleString() || rdv.montantAssurance?.toLocaleString()} FCFA</span>
            </div>
            <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-black text-white">
              <span>Payé par vos soins (Wave) :</span>
              <span className="text-sky-300">{rdv.tarif?.montantPatient?.toLocaleString() || rdv.montantPatient?.toLocaleString()} FCFA</span>
            </div>
          </div>

          {/* Bouton d'affichage du QR Code modale */}
          <button
            onClick={() => setShowQrModal(true)}
            className="w-full bg-gradient-to-r from-sky-400 to-emerald-400 hover:brightness-110 text-slate-950 font-black py-4 rounded-2xl shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <QrCode className="w-4 h-4" />
            Afficher le QR Code d'accès au cabinet
          </button>
        </div>
      )}

      {/* MODALE QR CODE PREMIUM */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e1320] border border-white/15 w-full max-w-sm rounded-3xl p-6 text-center space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Bouton Fermer */}
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1 pt-2">
              <h3 className="text-lg font-black text-white">Pass Sécurisé Cabinet</h3>
              <p className="text-xs text-slate-400">Présentez ce QR Code au secrétariat de la clinique</p>
            </div>

            {/* Vrai QR Code généré via API publique */}
            <div className="bg-white p-4 rounded-2xl w-48 h-48 mx-auto shadow-inner flex items-center justify-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrHash)}`}
                alt="QR Code de consultation"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Hash affiché en police Monospace */}
            <div className="bg-black/40 border border-white/10 px-3 py-2 rounded-xl">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-0.5">Hash de sécurité</p>
              <p className="text-xs font-mono font-bold text-sky-400 tracking-wider">{qrHash}</p>
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full bg-white/10 hover:bg-white/15 text-white font-bold py-3 rounded-xl text-xs transition-all border border-white/10"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}