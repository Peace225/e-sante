'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Star, Calendar, ShieldCheck } from 'lucide-react';
import { COMMUNES_ABIDJAN, SPECIALITES_SANTE, calculPriseEnCharge } from '@/components/rdv/store';

// Données fictives réalistes pour Abidjan
const MEDECINS_ABIDJAN = [
  {
    id: 'doc-1',
    name: 'Dr. Kouassi Jean-Marc',
    specialty: 'Cardiologue',
    commune: 'Cocody',
    cabinet: 'Polyclinique Internationale Sainte Anne-Marie (PISAM)',
    fee: 15000,
    rating: 4.9,
    nextSlot: 'Aujourd’hui à 14:30',
  },
  {
    id: 'doc-2',
    name: 'Dr. Traoré Aminata',
    specialty: 'Pédiatre',
    commune: 'Marcory',
    cabinet: 'Cabinet Médical Le Rocher (Zone 4)',
    fee: 10000,
    rating: 4.8,
    nextSlot: 'Demain à 09:00',
  },
  {
    id: 'doc-3',
    name: 'Dr. Bamba Yaya',
    specialty: 'Médecin Généraliste',
    commune: 'Yopougon',
    cabinet: 'Centre Médical Niangon',
    fee: 7000,
    rating: 4.7,
    nextSlot: 'Aujourd’hui à 16:00',
  },
];

export default function RDVIndexPage() {
  const router = useRouter();
  const [selectedCommune, setSelectedCommune] = useState('Tout');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Tout');
  const [patient, setPatient] = useState<{ nom: string; assurance: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('patient');
    if (saved) {
      try {
        setPatient(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // 2. Fix Case-Sensitive : Normalisation en majuscules pour correspondre au store
  const assuranceId = (patient?.assurance || 'CNAM').toUpperCase();

  // 1. Filtre souple incluant l'option 'Tout'
  const filteredDoctors = MEDECINS_ABIDJAN.filter(
    (doc) => 
      (selectedCommune === 'Tout' || doc.commune === selectedCommune) && 
      (selectedSpecialty === 'Tout' || doc.specialty === selectedSpecialty)
  );

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6 pb-28 text-white relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* En-tête de recherche */}
      <div className="bg-white/[0.04] backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl space-y-5">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-black tracking-tight text-white">Trouver un médecin</h1>
          {patient && (
            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              Tiers-payant actif ({assuranceId})
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Commune</label>
          <div className="grid grid-cols-3 gap-2">
            {['Tout', ...COMMUNES_ABIDJAN.slice(0, 5)].map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCommune(c)}
                className={`py-2.5 px-3 text-xs rounded-xl border transition-all font-semibold ${
                  selectedCommune === c
                    ? 'border-white bg-white text-black shadow-md'
                    : 'border-white/10 bg-white/[0.02] text-slate-400 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Spécialité médicale</label>
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="w-full p-3.5 rounded-2xl bg-[#0d121f] border border-white/10 text-white text-sm outline-none focus:border-white/25 transition-all"
          >
            <option value="Tout" className="bg-slate-900 text-white">Toutes les spécialités</option>
            {SPECIALITES_SANTE.map((spec) => (
              <option key={spec} value={spec} className="bg-slate-900 text-white">{spec}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Liste des résultats */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
          Praticiens disponibles ({filteredDoctors.length})
        </h2>

        {filteredDoctors.length === 0 ? (
          <div className="bg-white/[0.04] backdrop-blur-xl p-8 rounded-3xl text-center border border-white/10 space-y-2">
            <p className="text-slate-300 font-medium text-sm">Aucun praticien trouvé pour cette recherche.</p>
            <p className="text-xs text-slate-500">Essayez de sélectionner "Tout" pour voir l'ensemble des praticiens disponibles.</p>
          </div>
        ) : (
          filteredDoctors.map((doc) => {
            const tarif = calculPriseEnCharge(doc.fee, assuranceId);

            return (
              <div
                key={doc.id}
                className="bg-white/[0.05] backdrop-blur-xl p-5 rounded-3xl border border-white/10 shadow-xl space-y-4 hover:border-sky-400/40 transition-all group"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-white text-base group-hover:text-sky-300 transition-colors">{doc.name}</h3>
                    <p className="text-xs text-sky-400 font-semibold">{doc.specialty}</p>
                    <p className="text-xs text-slate-400 pt-0.5">{doc.cabinet}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 text-amber-300 px-2.5 py-1 rounded-xl text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {doc.rating}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <MapPin className="w-4 h-4 text-sky-400" />
                    <span>{doc.commune}, Abidjan</span>
                  </div>
                  
                  <div className="text-right">
                    <span className="line-through text-slate-500 text-[11px] mr-1.5">{doc.fee.toLocaleString()} FCFA</span>
                    <span className="font-black text-emerald-300 text-sm">{tarif.montantPatient.toLocaleString()} FCFA</span>
                    <span className="block text-[10px] text-slate-400">Reste à charge ({tarif.taux}% pris en charge)</span>
                  </div>
                </div>

                {/* 3. Passage du fee dans l'URL pour la page de détail / rdv */}
                <button
                  onClick={() => router.push(`/rdv/${doc.id}?fee=${doc.fee}`)}
                  className="w-full bg-gradient-to-r from-sky-400 to-emerald-400 hover:brightness-110 text-slate-950 font-black py-3.5 rounded-2xl shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  Choisir un créneau (Verrouillage Redis)
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}