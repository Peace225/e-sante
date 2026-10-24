export const ROLES = ["PATIENT","MEDECIN","PHARMACIEN","LABO","ASSUREUR","ADMIN_FAMILLE"] as const;
export type Role = typeof ROLES[number];
export type JwtPayload = { sub: string; role: Role; familyId?: string };
