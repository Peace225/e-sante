'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, MapPin, QrCode, ShieldCheck, CheckCircle2, User } from 'lucide-react';

export default function AppointmentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const rdvId = (params.id as string) || '360';

  // Données de test du rendez-vous sélectionné (normalement récupéré via l'API depuis appointment-service)
  const appointment = {
    id: rdvId,
    doctorName: 'Dr. Kouassi Jean-Marc',
    specialty: 'Cardiologue',
    cabinet: 'Polyclinique Internationale Sainte Anne-Marie (PISAM), Cocody',
    scheduledAt: 'Aujourd’hui à 14:30',
    status: 'CONFIRMED',
    patientName: 'Kouadio Konan (Moi-même)',
    totalFee: 15000,
    patientPaid: 3000,
    insuranceCovered: 12000,
    assuranceName: 'MCI Care (80%)',
    policyNumber: 'CI-00123456',
    qrCodePayload: `LIFECARE-SECURE-HASH-${rdvId.toUpperCase()}-2026`,
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6 pb-28 text-white relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Bouton Retour */}
      <button
        onClick={() => router.push('/mes-rdv')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour à la liste de mes rendez-vous
      </button>

      {/* En-tête Statut */}
      <div className="bg-white/[0.05] backdrop-blur-2xl p-6 rounded-3xl border border-white/10 shadow-2xl space-y-6">
        <div className="flex justify-between items-start border-b border-white/10 pb-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full mb-2">
              <CheckCircle2 className="w-4 h-4" />
              Rendez-vous Confirmé & Payé
            </span>
            <h1 className="text-xl font-black text-white">{appointment.doctorName}</h1>
            <p className="text-xs text-sky-400 font-semibold">{appointment.specialty}</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase font-mono">ID Réf</span>
            <span className="text-xs font-mono font-bold text-slate-200">#{appointment.id}</span>
          </div>
        </div>

        {/* Informations de la consultation */}
        <div className="space-y-3 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-sky-400 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Date et Heure</span>
              <span className="font-semibold text-white text-sm">{appointment.scheduledAt}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Lieu de consultation</span>
              <span className="font-semibold text-white text-sm">{appointment.cabinet}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-sky-400 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Patient concerné</span>
              <span className="font-semibold text-white text-sm">{appointment.patientName}</span>
            </div>
          </div>
        </div>

        {/* Section QR Code d'accès au cabinet */}
        <div className="bg-[#11131a] border border-white/10 p-6 rounded-2xl text-center space-y-4">
          <div className="w-44 h-44 bg-white p-3 mx-auto rounded-2xl flex items-center justify-center shadow-inner">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(appointment.qrCodePayload)}`}
              alt="QR Code d'accès au cabinet"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-white text-sm">QR Code d'accès au cabinet</h3>
            <p className="text-[11px] text-slate-400">
              Présentez ce code au secrétariat de la clinique pour valider votre arrivée sans attente.
            </p>
          </div>
          <div className="bg-black/40 border border-white/10 px-3 py-2 rounded-xl inline-block">
            <span className="font-mono text-xs font-bold text-sky-400 tracking-wider">
              {appointment.qrCodePayload}
            </span>
          </div>
        </div>

        {/* Reçu Tiers-Payant / Assurance */}
        <div className="bg-[#11131a] p-4 rounded-2xl text-xs space-y-2 border border-white/10">
          <div className="flex items-center gap-1.5 font-bold text-emerald-300 pb-2 border-b border-white/10">
            <ShieldCheck className="w-4 h-4" />
            Reçu de Télétransmission & Paiement
          </div>
          <div className="flex justify-between text-slate-400 pt-1">
            <span>Tarif brut consultation :</span>
            <span>{appointment.totalFee.toLocaleString()} FCFA</span>
          </div>
          <div className="flex justify-between text-emerald-300 font-medium">
            <span>Tiers-payant ({appointment.assuranceName}) :</span>
            <span>-{appointment.insuranceCovered.toLocaleString()} FCFA</span>
          </div>
          <div className="flex justify-between font-black text-white pt-2 border-t border-white/10 text-sm">
            <span>Ticket modérateur réglé (Wave) :</span>
            <span className="text-sky-300">{appointment.patientPaid.toLocaleString()} FCFA</span>
          </div>
        </div>
      </div>
    </div>
  );
}