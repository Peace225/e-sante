'use client';
import { useState, useEffect } from 'react';
import { Pill, QrCode, Plus, X, Search, CheckCircle2, User } from 'lucide-react';

type Med = { name: string; poso: string; duree: string };
type Ordo = { id: string; patient: string; meds: Med[]; date: string; hash: string };

const STOCK_MEDS = [
  'Amlodipine 5mg', 'Paracétamol 1g', 'Doliprane 1000mg', 'Amoxicilline 500mg', 
  'Metformine 500mg', 'Lisinopril 10mg', 'Ibuprofène 400mg', 'Paludrine', 
  'Artemether / Lumefantrine', 'Efferalgan 500mg', 'Spasfon'
];

const DEFAULT_PATIENTS = [
  'Kouadio Konan', 
  'Kouadio Junior (ayant droit)', 
  'Aya Marie', 
  'Traoré Aminata', 
  'Bamba Yaya'
];

const DEFAULT_ORDO: Ordo = {
  id: 'ORD-001',
  patient: 'Kouadio Konan',
  meds: [{ name: 'Amlodipine 5mg', poso: '1 matin', duree: '30j' }],
  date: "Aujourd'hui",
  hash: 'LIFECARE-RX-001'
};

export default function OrdonnancePro() {
  const [ordos, setOrdos] = useState<Ordo[]>([DEFAULT_ORDO]);
  const [isClient, setIsClient] = useState(false);
  
  const [showModal, setShowModal] = useState(false);
  const [searchPatient, setSearchPatient] = useState('Kouadio Konan');
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  
  const [meds, setMeds] = useState<Med[]>([]);
  const [searchMed, setSearchMed] = useState('');
  const [qrToShow, setQrToShow] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('ordonnances');
    if (saved) {
      try {
        setOrdos(JSON.parse(saved));
      } catch (e) {
        console.error("Erreur de parsing", e);
      }
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('ordonnances', JSON.stringify(ordos));
    }
  }, [ordos, isClient]);

  const addMed = (name: string) => {
    if (!name.trim()) return;
    setMeds(prev => [...prev, { name: name.trim(), poso: '1 matin et soir', duree: '7j' }]);
    setSearchMed('');
  };

  const createOrdo = () => {
    if (!searchPatient.trim()) {
      alert("Veuillez renseigner le nom du patient.");
      return;
    }
    if (meds.length === 0) {
      alert("Veuillez ajouter au moins un médicament à l'ordonnance.");
      return;
    }

    const timestamp = Date.now();
    const id = `ORD-${timestamp.toString().slice(-4)}`;
    const hash = `LIFECARE-RX-${timestamp}-${searchPatient.slice(0, 3).toUpperCase()}`;
    
    const newOrdo: Ordo = { id, patient: searchPatient.trim(), meds, date: "Aujourd'hui", hash };
    
    setOrdos(prev => [newOrdo, ...prev]);
    
    if (isClient) {
      localStorage.setItem('lastOrdonnance', JSON.stringify(newOrdo));
      localStorage.setItem('lastOrdonnanceQr', hash);
    }

    setMeds([]); 
    setShowModal(false);
  };

  const filteredPatients = DEFAULT_PATIENTS.filter(p => p.toLowerCase().includes(searchPatient.toLowerCase()));
  const filteredMeds = STOCK_MEDS.filter(m => m.toLowerCase().includes(searchMed.toLowerCase()));

  return (
    <div className="space-y-6 pb-28 relative text-white">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="flex justify-between items-center pb-4 border-b border-white/10">
        <div>
          <h1 className="text-xl font-black tracking-tight text-white">Ordonnances e-santé</h1>
          <p className="text-xs text-emerald-400 font-bold">Prescriptions sécurisées interopérables avec pharma-web</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-gradient-to-r from-emerald-400 to-sky-400 text-slate-950 font-black px-5 py-3 rounded-2xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all">
          <Plus className="w-4 h-4" /> Nouvelle ordonnance
        </button>
      </div>

      <div className="space-y-4">
        {ordos.map(o => (
          <div key={o.id} className="bg-white/[0.05] backdrop-blur-xl border border-white/10 p-5 rounded-3xl space-y-3 shadow-xl">
            <div className="flex justify-between items-center">
              <span className="font-bold text-white text-base">{o.patient} • <span className="text-slate-400 text-xs">{o.date}</span></span>
              <span className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full font-bold">{o.id}</span>
            </div>
            <div className="bg-[#11131a] p-3.5 rounded-2xl border border-white/10 text-xs space-y-2">
              <p className="text-[10px] uppercase font-bold text-slate-400">Médicaments prescrits :</p>
              {o.meds.map((m, i) => (
                <p key={i} className="flex justify-between text-emerald-300 font-medium">
                  <span className="flex items-center gap-1.5"><Pill className="w-3.5 h-3.5 text-emerald-400" /> {m.name}</span>
                  <span className="text-slate-400">{m.poso} • {m.duree}</span>
                </p>
              ))}
            </div>
            <button onClick={() => setQrToShow(o.hash)} className="w-full bg-white/10 hover:bg-white/15 border border-white/10 py-3 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-2">
              <QrCode className="w-4 h-4 text-sky-400" /> QR Pharma • <span className="font-mono text-sky-300">{o.hash.slice(0, 18)}...</span>
            </button>
          </div>
        ))}
      </div>

      {/* Modal création */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e1320] border border-white/15 w-full max-w-lg rounded-3xl p-6 space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-lg text-white">Nouvelle ordonnance</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center transition-colors"><X className="w-4 h-4" /></button>
            </div>
            
            {/* Recherche & Autocomplétion Patient */}
            <div className="space-y-1 relative">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">Patient (Recherche ou saisie libre)</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  value={searchPatient} 
                  onChange={e => { setSearchPatient(e.target.value); setShowPatientDropdown(true); }}
                  onFocus={() => setShowPatientDropdown(true)}
                  placeholder="Tapez le nom d'un patient..." 
                  className="w-full pl-10 pr-4 p-3.5 rounded-2xl bg-[#11131a] border border-white/10 text-sm text-white placeholder:text-slate-500 outline-none focus:border-emerald-400 transition-all" 
                />
              </div>

              {showPatientDropdown && (
                <div className="absolute left-0 right-0 z-20 bg-[#11131a] border border-white/15 rounded-2xl max-h-36 overflow-auto mt-1 p-1 shadow-2xl">
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map(p => (
                      <button 
                        key={p} 
                        type="button"
                        onClick={() => { setSearchPatient(p); setShowPatientDropdown(false); }} 
                        className="w-full text-left px-3 py-2 text-xs hover:bg-white/10 text-slate-200 rounded-xl transition-colors"
                      >
                        {p}
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-xs text-emerald-400">
                      Utiliser le nom saisi : <strong>"{searchPatient}"</strong>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Recherche & Ajout Médicament */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">Ajouter médicament</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    value={searchMed} 
                    onChange={e => setSearchMed(e.target.value)} 
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addMed(searchMed); }}}
                    placeholder="Tapez n'importe quel médicament..." 
                    className="w-full pl-10 pr-4 p-3.5 rounded-2xl bg-[#11131a] border border-white/10 text-sm text-white placeholder:text-slate-500 outline-none focus:border-emerald-400 transition-all" 
                  />
                </div>
                <button 
                  type="button" 
                  onClick={() => addMed(searchMed)}
                  className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black px-4 rounded-2xl text-xs transition-all"
                >
                  Ajouter
                </button>
              </div>

              {searchMed && (
                <div className="bg-[#11131a] border border-white/10 rounded-2xl max-h-32 overflow-auto mt-1 p-1">
                  {filteredMeds.length > 0 ? (
                    filteredMeds.map(m => (
                      <button key={m} onClick={() => addMed(m)} className="w-full text-left px-3 py-2 text-xs hover:bg-white/10 text-slate-200 rounded-xl transition-colors">{m}</button>
                    ))
                  ) : (
                    <button onClick={() => addMed(searchMed)} className="w-full text-left px-3 py-2 text-xs text-emerald-400 hover:bg-white/10 rounded-xl transition-colors">
                      + Ajouter "{searchMed}" comme nouveau médicament
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Liste des médicaments ajoutés */}
            <div className="space-y-2 max-h-40 overflow-auto">
              {meds.map((m, i) => (
                <div key={i} className="bg-white/[0.05] border border-white/10 p-3 rounded-2xl flex justify-between items-center text-xs gap-2">
                  <span className="font-semibold text-white flex-1">{m.name}</span>
                  <input value={m.poso} onChange={e => { const n = [...meds]; n[i].poso = e.target.value; setMeds(n); }} placeholder="Posologie" className="w-32 bg-[#11131a] border border-white/10 rounded-xl px-2.5 py-1 text-xs text-white outline-none focus:border-emerald-400" />
                  <button onClick={() => setMeds(meds.filter((_, j) => j !== i))} className="text-rose-400 hover:text-rose-300"><X className="w-4 h-4" /></button>
                </div>
              ))}
            </div>

            <button disabled={meds.length === 0 || !searchPatient.trim()} onClick={createOrdo} className="w-full bg-gradient-to-r from-emerald-400 to-sky-400 hover:brightness-110 text-slate-950 font-black py-4 rounded-2xl text-xs disabled:opacity-30 shadow-lg transition-all">
              <CheckCircle2 className="w-4 h-4 inline mr-2" /> Générer ordonnance + QR
            </button>
          </div>
        </div>
      )}

      {/* Modal QR plein écran */}
      {qrToShow && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e1320] border border-white/15 rounded-3xl p-6 text-center space-y-4 max-w-sm w-full shadow-2xl relative">
            <div className="bg-white p-4 rounded-2xl w-56 h-56 mx-auto shadow-inner flex items-center justify-center">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(qrToShow)}`} alt="QR" className="w-full h-full object-contain" />
            </div>
            <div className="bg-black/40 border border-white/10 px-3 py-2 rounded-xl">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-0.5">Hash Pharmacie</p>
              <p className="font-mono text-xs text-emerald-400 font-bold break-all">{qrToShow}</p>
            </div>
            <button onClick={() => setQrToShow(null)} className="w-full bg-white/10 hover:bg-white/15 py-3 rounded-xl text-xs font-bold text-white transition-all border border-white/10">Fermer</button>
            <p className="text-[11px] text-slate-400">Ce QR sera scanné dans <b>pharma-web</b> (port 3004)</p>
          </div>
        </div>
      )}
    </div>
  );
}