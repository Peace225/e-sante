// types/index.ts

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  dateTime: string; // ce que le GET te renvoie
  reason: string;   // ce que le GET te renvoie
  etablissement: string;
  status: 'CONFIRME' | 'EN_ATTENTE' | 'ANNULE';
  createdAt?: string;
  updatedAt?: string;
}

// DTO pour le POST - doit coller à ton backend
export interface CreateAppointmentDto {
  patientId: string;
  doctorId: string;
  date: string; // ISO string - ton API l'appelle "date" pas "dateTime"
  motif: string; // ton API l'appelle "motif" pas "reason"
  etablissement?: string;
}

export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  role: 'PATIENT' | 'MEDECIN' | 'ADMIN';
}

export interface Ordonnance {
  id: string;
  patientId: string;
  doctorId: string;
  medicaments: string[]; // ex: ["Paracétamol 500mg x 20"]
  instructions: string;
  code?: string; // ex: ORD-2026-CI-001 - pour ton QR
  qrCodeUrl?: string;
  status?: 'ACTIVE' | 'UTILISEE' | 'EXPIREE';
  createdAt: string;
}

// Bonus utile pour ton mobile
export interface ApiResponse<T> {
  data: T;
  message?: string;
}