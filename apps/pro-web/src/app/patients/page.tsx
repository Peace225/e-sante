'use client';

import { useState } from 'react';
import { Users, Search, Phone, MapPin, ShieldCheck } from 'lucide-react';

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients] = useState([
    {
      id: 'pat-1',
      fullName: 'Kouadio Konan',
      phone: '+225 07000000',
      commune: 'Cocody',
      assurance: 'MCI Care (80%)',
      policyNumber: 'CI-00123456',
      lastVisit: 'Aujourd’hui',
      bloodGroup: 'O+',
    },
    {
      id: 'pat-2',
      fullName: 'Traoré Aminata',
      phone: '+225 05000000',
      commune: 'Marcory',
      assurance: 'CNAM (70%)',
      policyNumber: 'CI-00987654',
      lastVisit: 'Hier',
      bloodGroup: 'A+',
    },
  ]);

  const filteredPatients = patients.filter(p => 
    p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.policyNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-28 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* En-tête de section */}
      <div className="flex justify-between items-center pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-black tracking-tight text-white">Dossiers Patients</h2>
          <p className="text-xs text-sky-400 font-bold">Suivi médical & télétransmission • PISAM</p>
        </div>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-2xl text-xs">
          <Users className="w-4 h-4 text-sky-400" />
          <span className="font-bold">{patients.length} patients</span>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="bg-white/[0.05] backdrop-blur-2xl p-4 rounded-3xl border border-white/10 flex gap-2 shadow-xl">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
            placeholder="Rechercher par nom ou numéro de police d'assurance..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#11131a] border border-white/10 text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-400/50 transition-all" 
          />
        </div>
      </div>

      {/* Liste des patients */}
      <div className="space-y-3">
        {filteredPatients.map(patient => (
          <div key={patient.id} className="bg-white/[0.05] backdrop-blur-xl p-5 rounded-3xl border border-white/10 space-y-4 shadow-xl">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="font-black text-white text-base">{patient.fullName}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-3">
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-sky-400" /> {patient.phone}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-sky-400" /> {patient.commune}, Abidjan</span>
                </p>
              </div>
              <span className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> {patient.assurance}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10 text-xs text-slate-300">
              <div className="bg-[#11131a] p-3 rounded-2xl border border-white/10">
                <span className="text-slate-500 block text-[10px] uppercase">N° Matricule</span>
                <span className="font-mono font-bold text-white">{patient.policyNumber}</span>
              </div>
              <div className="bg-[#11131a] p-3 rounded-2xl border border-white/10">
                <span className="text-slate-500 block text-[10px] uppercase">Groupe Sanguin</span>
                <span className="font-bold text-emerald-300">{patient.bloodGroup}</span>
              </div>
              <div className="bg-[#11131a] p-3 rounded-2xl border border-white/10 col-span-2 sm:col-span-1">
                <span className="text-slate-500 block text-[10px] uppercase">Dernière visite</span>
                <span className="font-semibold text-white">{patient.lastVisit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}