'use client';

import { useState } from 'react';
import { Stethoscope, ShieldCheck, CheckCircle2, Clock, XCircle, Building2 } from 'lucide-react';

type Doctor = {
  id: string;
  name: string;
  specialite: string;
  etablissement: string;
  rpps: string;
  status: 'VALIDE' | 'EN_ATTENTE' | 'REJETE';
};

export default function AdminMedecinsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([
    { id: 'DOC-01', name: 'Dr. Kouassi Jean-Marc', specialite: 'Cardiologue', etablissement: 'PISAM Cocody', rpps: 'RPPS-CI-1008492', status: 'VALIDE' },
    { id: 'DOC-02', name: 'Dr. Touré Mariam', specialite: 'Pédiatre', etablissement: 'Polyclinique Farah', rpps: 'RPPS-CI-1009321', status: 'EN_ATTENTE' },
    { id: 'DOC-03', name: 'Dr. N’Guessan Serge', specialite: 'Médecin Généraliste', etablissement: 'CHU de Treichville', rpps: 'RPPS-CI-1004510', status: 'EN_ATTENTE' },
    { id: 'DOC-04', name: 'Dr. Diallo Ibrahim', specialite: 'Neurologue', etablissement: 'PISAM Cocody', rpps: 'RPPS-CI-1002198', status: 'VALIDE' },
  ]);

  const updateStatus = (id: string, newStatus: 'VALIDE' | 'REJETE') => {
    setDoctors(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));
  };

  return (
    <div className="space-y-6 pb-28 relative text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="flex justify-between items-center pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-sky-400" /> Validation RPPS & Accès Praticiens
          </h2>
          <p className="text-xs text-sky-400 font-bold">Contrôle de l'Ordre National des Médecins de Côte d'Ivoire • pro-web (Port 3001)</p>
        </div>
        <span className="bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs px-3.5 py-1.5 rounded-full font-bold">
          {doctors.filter(d => d.status === 'EN_ATTENTE').length} en attente
        </span>
      </div>

      <div className="space-y-3">
        {doctors.map(doc => (
          <div key={doc.id} className="bg-white/[0.05] backdrop-blur-xl p-5 rounded-3xl border border-white/10 flex flex-col sm:flex-row justify-between sm:items-center gap-4 shadow-xl">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h3 className="font-bold text-white text-sm">{doc.name}</h3>
                <span className="text-[11px] text-sky-300 font-semibold bg-sky-500/10 border border-sky-500/20 px-2.5 py-0.5 rounded-full">
                  {doc.specialite}
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-500" /> {doc.etablissement} • <span className="font-mono text-slate-300">{doc.rpps}</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              {doc.status === 'VALIDE' && (
                <span className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-3.5 py-1.5 rounded-full font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> RPPS Certifié
                </span>
              )}

              {doc.status === 'REJETE' && (
                <span className="text-xs bg-rose-500/10 border border-rose-500/20 text-rose-300 px-3.5 py-1.5 rounded-full font-bold flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-rose-400" /> Accès Refusé
                </span>
              )}

              {doc.status === 'EN_ATTENTE' && (
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-amber-500/10 border border-amber-500/20 text-amber-300 px-3 py-1.5 rounded-full font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> À vérifier
                  </span>
                  <button
                    onClick={() => updateStatus(doc.id, 'VALIDE')}
                    className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black px-3.5 py-1.5 rounded-xl text-xs transition-all"
                  >
                    Valider RPPS
                  </button>
                  <button
                    onClick={() => updateStatus(doc.id, 'REJETE')}
                    className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-bold px-3 py-1.5 rounded-xl text-xs transition-all"
                  >
                    Rejeter
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}