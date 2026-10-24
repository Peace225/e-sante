'use client';

import { ShieldCheck } from 'lucide-react';
import { calculPriseEnCharge, ASSURANCES_CI } from './store';

interface Props {
  montantTotal: number;
  assuranceId: string;
}

export default function AssuranceBadge({ montantTotal, assuranceId }: Props) {
  // Normalisation de l'ID en majuscules pour éviter tout problème de casse
  const normalizedId = (assuranceId || 'NONE').toUpperCase();
  const result = calculPriseEnCharge(montantTotal, normalizedId);
  const assuranceObj = ASSURANCES_CI.find((a) => a.id === normalizedId);

  if (normalizedId === 'NONE' || !assuranceObj) {
    return (
      <div className="bg-white/[0.04] backdrop-blur-xl p-4 rounded-2xl border border-white/10 text-xs text-slate-300 flex justify-between items-center shadow-lg">
        <span className="font-medium">Tarif standard (Sans assurance)</span>
        <strong className="text-white font-bold text-sm">{montantTotal.toLocaleString()} FCFA</strong>
      </div>
    );
  }

  return (
    <div className="bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/20 p-4 rounded-2xl space-y-2.5 text-xs shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-emerald-300 font-bold">
        <span className="flex items-center gap-1.5 tracking-wide">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          Tiers-Payant actif : {assuranceObj.name} ({result.taux}%)
        </span>
        <span className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-200 px-2.5 py-1 rounded-xl w-fit text-[11px]">
          Pris en charge : -{result.montantAssurance.toLocaleString()} F
        </span>
      </div>

      <div className="pt-2.5 border-t border-white/10 flex justify-between items-center text-sm">
        <span className="text-slate-300 font-medium">Reste à payer (Ticket modérateur) :</span>
        <strong className="text-sky-300 font-black text-base">{result.montantPatient.toLocaleString()} FCFA</strong>
      </div>
    </div>
  );
}