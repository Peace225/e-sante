export const COMMUNES_ABIDJAN = [
  'Cocody',
  'Marcory',
  'Yopougon',
  'Plateau',
  'Treichville',
  'Riviera',
  'Adjamé',
  'Koumassi',
];

export const SPECIALITES_SANTE = [
  'Médecin Généraliste',
  'Cardiologue',
  'Pédiatre',
  'Gynécologue',
  'Ophtalmologue',
  'Dentiste',
  'Dermatologue',
];

export const ASSURANCES_CI = [
  { id: 'NONE', name: 'Aucune (100% Privé)', tauxCouverture: 0 },
  { id: 'CNAM', name: 'CMU / CNAM', tauxCouverture: 70 },
  { id: 'MUGEFCI', name: 'MUGEF-CI (Fonctionnaires)', tauxCouverture: 80 },
  { id: 'MCI_CARE', name: 'MCI Care / Ascoma', tauxCouverture: 80 },
  { id: 'NSIA', name: 'NSIA Assurances', tauxCouverture: 80 },
  { id: 'SANLAM', name: 'Sanlam Santé', tauxCouverture: 85 },
];

export interface CalculTarifResult {
  montantTotal: number;
  montantAssurance: number;
  montantPatient: number;
  taux: number;
}

/**
 * Calcule le ticket modérateur selon l'assurance du patient à Abidjan
 */
export function calculPriseEnCharge(montantTotal: number, assuranceId: string): CalculTarifResult {
  const assurance = ASSURANCES_CI.find((a) => a.id === assuranceId) || ASSURANCES_CI[0];
  const taux = assurance.tauxCouverture;
  
  const montantAssurance = Math.round((montantTotal * taux) / 100);
  const montantPatient = montantTotal - montantAssurance;

  return {
    montantTotal,
    montantAssurance,
    montantPatient,
    taux,
  };
}