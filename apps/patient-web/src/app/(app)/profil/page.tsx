'use client';

import { useState, useEffect } from 'react';
import { User, ShieldCheck, Phone, MapPin, Users, Plus, FileText, LogOut, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfilPage() {
  const router = useRouter();

  // Données du profil patient connecté (avec lecture dynamique du localStorage)
  const [patient, setPatient] = useState({
    fullName: 'Kouadio Konan',
    phone: '+225 07 00 00 00 00',
    commune: 'Cocody',
    assuranceName: 'MCI Care / Ascoma',
    policyNumber: 'CI-00123456',
    cnamNumber: 'CNAM-987654321',
  });

  useEffect(() => {
    const saved = localStorage.getItem('patient');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPatient({
          fullName: parsed.nom || 'Kouadio Konan',
          phone: parsed.tel || '+225 07 00 00 00 00',
          commune: parsed.commune || 'Cocody',
          assuranceName: parsed.assurance || 'CNAM',
          policyNumber: parsed.numCarte || 'CI-00123456',
          cnamNumber: 'CNAM-987654321',
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Liste des ayants droit rattachés au compte
  const [dependents, setDependents] = useState([
    { id: 'dep-1', fullName: 'Kouadio Junior', relationship: 'Fils', birthDate: '2022-05-14', bloodGroup: 'O+' },
    { id: 'dep-2', fullName: 'Aya Marie (Maman)', relationship: 'Parent', birthDate: '1958-11-20', bloodGroup: 'A+' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newDepName, setNewDepName] = useState('');
  const [newDepRelation, setNewDepRelation] = useState('Fils / Fille');

  const handleAddDependent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDepName.trim()) {
      setDependents([
        ...dependents,
        {
          id: Date.now().toString(),
          fullName: newDepName,
          relationship: newDepRelation,
          birthDate: '2024-01-01',
          bloodGroup: 'O+',
        },
      ]);
      setNewDepName('');
      setShowAddModal(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6 pb-28 text-white relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* En-tête Profil */}
      <div className="bg-white/[0.04] backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-tr from-sky-400 to-emerald-400 text-slate-950 rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg shadow-sky-500/20">
            {patient.fullName.split(' ').map((n) => n[0]).join('')}
          </div>
          <div className="space-y-1">
            <h1 className="text-lg font-black text-white tracking-tight">{patient.fullName}</h1>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-sky-400" /> {patient.phone}
            </p>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-400" /> {patient.commune}, Abidjan
            </p>
          </div>
        </div>

        {/* Carte CNAM & Mutuelle */}
        <div className="bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 text-white p-5 rounded-2xl shadow-xl space-y-3 border border-white/10">
          <div className="flex justify-between items-center">
            <span className="text-[11px] uppercase font-bold tracking-wider text-sky-100">Carte d'Assuré / Tiers-Payant</span>
            <ShieldCheck className="w-5 h-5 text-emerald-200" />
          </div>
          <div className="space-y-1">
            <p className="font-black text-base">{patient.assuranceName}</p>
            <p className="text-xs text-sky-100 font-mono">Matricule : {patient.policyNumber}</p>
            <p className="text-xs text-emerald-100 font-mono">CNAM : {patient.cnamNumber}</p>
          </div>
        </div>
      </div>

      {/* Section Ayants Droit (Famille) */}
      <div className="bg-white/[0.04] backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-black text-white text-base">Gestion de la Famille (Ayants droit)</h2>
            <p className="text-xs text-slate-400">Prenez RDV et gérez le carnet de santé de vos proches</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 text-sky-400 rounded-2xl flex items-center justify-center transition-colors border border-white/10 shadow-md"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 pt-1">
          {dependents.map((dep) => (
            <div key={dep.id} className="bg-[#11131a] p-4 rounded-2xl border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/5 text-sky-400 rounded-xl flex items-center justify-center font-bold text-sm border border-white/10">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{dep.fullName}</h3>
                  <p className="text-xs text-slate-400">{dep.relationship} • Groupe Sanguin : <strong className="text-emerald-300">{dep.bloodGroup}</strong></p>
                </div>
              </div>
              <span className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full font-bold">
                Couvert
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Ajout Ayant Droit */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e1320] border border-white/15 w-full max-w-md p-6 rounded-3xl shadow-2xl space-y-5 relative animate-in fade-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-slate-300 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1 pt-1">
              <h3 className="text-lg font-black text-white">Ajouter un membre de la famille</h3>
              <p className="text-xs text-slate-400">Renseignez les informations de votre ayant droit</p>
            </div>

            <form onSubmit={handleAddDependent} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Nom et Prénoms</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Kouadio Amenan"
                  value={newDepName}
                  onChange={(e) => setNewDepName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-400 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Lien de parenté</label>
                <select
                  value={newDepRelation}
                  onChange={(e) => setNewDepRelation(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#0d121f] border border-white/10 text-sm text-white outline-none focus:border-sky-400 transition-all"
                >
                  <option value="Enfant" className="bg-slate-900 text-white">Enfant (Fils / Fille)</option>
                  <option value="Parent" className="bg-slate-900 text-white">Parent (Père / Mère)</option>
                  <option value="Conjoint" className="bg-slate-900 text-white">Conjoint / Conjointe</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 bg-white/10 hover:bg-white/15 text-white py-3.5 rounded-2xl font-bold text-xs transition-all border border-white/10"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-gradient-to-r from-sky-400 to-emerald-400 hover:brightness-110 text-slate-950 py-3.5 rounded-2xl font-black shadow-lg shadow-sky-500/25 text-xs transition-all"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Déconnexion */}
      <div className="pt-2">
        <button
          onClick={() => router.push('/connexion')}
          className="w-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 font-bold py-4 rounded-2xl transition-all text-sm flex items-center justify-center gap-2 shadow-lg"
        >
          <LogOut className="w-4 h-4" />
          Se déconnecter de LIFECARE
        </button>
      </div>
    </div>
  );
}