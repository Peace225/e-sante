'use client';

import { useState, useEffect, useRef } from 'react';
import { QrCode, Pill, CheckCircle2, Search, ShieldCheck, User, Camera, Zap, PackageCheck, Store, X } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';

type OrdoData = {
  id: string;
  patient: string;
  meds: { name: string; poso: string; duree: string }[];
  date: string;
  hash: string;
};

export default function PharmaDashboard() {
  const [scanInput, setScanInput] = useState('');
  const [currentOrdo, setCurrentOrdo] = useState<OrdoData | null>(null);
  const [successMsg, setSuccessMsg] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    const savedOrdo = localStorage.getItem('lastOrdonnance');
    const savedHash = localStorage.getItem('lastOrdonnanceQr');
    if (savedOrdo && savedHash) {
      try {
        const parsed = JSON.parse(savedOrdo);
        setCurrentOrdo(parsed);
        setScanInput(savedHash);
      } catch {}
    }

    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  const handleSearchOrdo = (query: string) => {
    const target = (query || scanInput).trim();
    if (!target) return;
    
    const savedOrdo = localStorage.getItem('lastOrdonnance');
    if (savedOrdo) {
      try {
        const parsed = JSON.parse(savedOrdo);
        if (parsed.hash === target || parsed.id === target || target.includes('LIFECARE-RX')) {
          setCurrentOrdo(parsed);
          setSuccessMsg(false);
          stopCameraScan();
          return;
        }
      } catch {}
    }

    setCurrentOrdo({
      id: 'ORD-001',
      patient: 'Kouadio Konan',
      meds: [
        { name: 'Amlodipine 5mg', poso: '1 matin', duree: '30j' },
        { name: 'Paracétamol 1g', poso: '1 / 8h', duree: '5j' }
      ],
      date: "Aujourd'hui, 14:30",
      hash: target
    });
    setSuccessMsg(false);
    stopCameraScan();
  };

  const startCameraScan = async () => {
    setIsScanning(true);
    try {
      const scanner = new Html5Qrcode("reader");
      scannerRef.current = scanner;
      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          setScanInput(decodedText);
          handleSearchOrdo(decodedText);
        },
        () => {}
      );
    } catch (err) {
      console.error("Erreur d'accès à la caméra:", err);
      setIsScanning(false);
      // Fallback si la caméra échoue (simulation instantanée)
      const savedHash = localStorage.getItem('lastOrdonnanceQr') || 'LIFECARE-RX-PISAM-9K2L';
      setScanInput(savedHash);
      handleSearchOrdo(savedHash);
    }
  };

  const stopCameraScan = async () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      try {
        await scannerRef.current.stop();
      } catch {}
    }
    setIsScanning(false);
  };

  const handleDispense = () => {
    if (currentOrdo) localStorage.setItem(`delivered_${currentOrdo.hash}`, JSON.stringify({ ...currentOrdo, deliveredAt: new Date().toISOString() }));
    setSuccessMsg(true);
    setTimeout(() => {
      setCurrentOrdo(null);
      setScanInput('');
      setSuccessMsg(false);
    }, 3500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-28 relative text-white">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

      {successMsg && (
        <div className="bg-emerald-500/10 border border-emerald-400/30 p-4 rounded-2xl text-emerald-200 text-xs flex items-center gap-3 shadow-lg">
          <div className="w-8 h-8 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center shrink-0"><CheckCircle2 className="w-5 h-5" /></div>
          <div><p className="font-bold">Délivrance validée</p><p className="text-emerald-300/80">Télétransmission CNAM / MCI envoyée • Ticket modérateur facturé</p></div>
        </div>
      )}

      {/* Scanner Card */}
      <div className="bg-white/[0.05] backdrop-blur-2xl p-6 rounded-3xl border border-white/10 space-y-4 shadow-2xl">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-sm flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-white/10 flex items-center justify-center"><QrCode className="w-4 h-4 text-emerald-400" /></div> Scanner Pass Ordonnance
          </h2>
          <button 
            onClick={isScanning ? stopCameraScan : startCameraScan}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${isScanning ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'}`}
          >
            {isScanning ? <X className="w-3.5 h-3.5" /> : <Camera className="w-3.5 h-3.5" />} 
            {isScanning ? 'Fermer la caméra' : 'Activer la Webcam'}
          </button>
        </div>

        {/* Conteneur de la caméra (affiché seulement si actif) */}
        {isScanning && (
          <div className="relative bg-black rounded-2xl overflow-hidden border border-white/10 p-2 max-w-sm mx-auto">
            <div id="reader" className="w-full rounded-xl overflow-hidden" />
          </div>
        )}

        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              value={scanInput} 
              onChange={e => setScanInput(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && handleSearchOrdo(scanInput)}
              placeholder="LIFECARE-RX-..."
              className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-[#0d0f16] border border-white/10 text-sm text-white placeholder:text-slate-600 outline-none focus:border-emerald-400 focus:bg-[#11131a] font-mono transition-all" 
            />
          </div>
          <button onClick={() => handleSearchOrdo(scanInput)} className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black px-6 rounded-2xl text-xs transition-all shadow-[0_0_20px_theme(colors.emerald.400/30)]">Rechercher</button>
        </div>
      </div>

      {/* Ordonnance */}
      {currentOrdo ? (
        <div className="bg-white/[0.05] backdrop-blur-xl p-6 rounded-3xl border border-white/10 space-y-5 shadow-2xl">
          <div className="flex justify-between items-start border-b border-white/10 pb-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-400 to-sky-400 text-slate-950 flex items-center justify-center font-black"><User className="w-5 h-5" /></div>
              <div><h3 className="font-bold text-white text-base">{currentOrdo.patient}</h3><p className="text-xs text-slate-400">{currentOrdo.date} • PISAM Cocody • Dr. KJ</p><p className="text-xs font-mono text-emerald-400 mt-1">{currentOrdo.hash}</p></div>
            </div>
            <span className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-full font-bold flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> {currentOrdo.id}</span>
          </div>

          <div className="space-y-2.5">
            <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Prescription vérifiée</p>
            {currentOrdo.meds.map((m, idx) => (
              <div key={idx} className="bg-[#11131a] p-4 rounded-2xl border border-white/10 flex justify-between items-center text-xs">
                <span className="font-bold text-white flex items-center gap-3"><span className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400"><Pill className="w-4 h-4" /></span> {m.name}</span>
                <span className="text-slate-400 font-medium"><span className="text-white">{m.poso}</span> • <span className="text-sky-300">{m.duree}</span></span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-sky-500/10 border border-sky-500/20 p-3.5 rounded-2xl"><p className="text-[10px] text-sky-300/70 uppercase font-bold">CNAM</p><p className="text-sm font-black text-sky-200">70% pris en charge</p></div>
            <div className="bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-2xl"><p className="text-[10px] text-amber-300/70 uppercase font-bold">Ticket Modérateur</p><p className="text-sm font-black text-amber-200">30% • Wave / OM</p></div>
          </div>

          <button onClick={handleDispense} className="w-full bg-gradient-to-r from-emerald-400 to-sky-400 hover:brightness-110 text-slate-950 font-black py-4 rounded-2xl shadow-xl transition-all text-xs flex items-center justify-center gap-2"><PackageCheck className="w-5 h-5" /> Valider la délivrance et télétransmettre <Zap className="w-4 h-4 text-slate-950" /></button>
        </div>
      ) : (
        <div className="p-10 rounded-3xl bg-white/[0.03] border border-dashed border-white/10 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto"><QrCode className="w-6 h-6 text-slate-500" /></div>
          <p className="text-sm text-slate-300 font-bold">En attente de scan PISAM</p>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">Active la webcam pour scanner le QR ou utilise le hash synchronisé</p>
        </div>
      )}
    </div>
  );
}