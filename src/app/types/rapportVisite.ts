export interface RapportVisite {
  idVisiteur: string;
  idMedecin: number;
  nom?: string;
  prenom?: string;
  date?: string | Date;
  motif: string;
  bilan: string;
  medicaments?: string | null;
}
