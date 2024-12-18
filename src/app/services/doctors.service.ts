import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medecin } from '../types/medecin';
import { RapportVisite } from '../types/rapportVisite';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  httpClient = inject(HttpClient);

  getDoctors(): Observable<Medecin[]> {
    return this.httpClient.get<Medecin[]>(
      'http://localhost/restgsb/medecins?nom='
    );
  }
  getDoctorById(id: number): Observable<Medecin> {
    return this.httpClient.get<Medecin>(
      `http://localhost/restgsb/medecin/${id}`
    );
  }
  getRapportVisteurByIdMedecin(id: number): Observable<RapportVisite> {
    return this.httpClient.get<RapportVisite>(
      `http://localhost/restgsb/rapports/${id}`
    );
  }
  addRapportVisite(rapportVisite: RapportVisite): Observable<RapportVisite> {
    const url = `http://localhost/restgsb/nouveaurapport?idVisiteur=${
      rapportVisite.idVisiteur
    }&idMedecin=${rapportVisite.idMedecin}&motif=${encodeURIComponent(
      rapportVisite.motif
    )}&bilan=${encodeURIComponent(rapportVisite.bilan)}&date=${
      rapportVisite.date
    }&medicaments=${rapportVisite.medicaments}`;
    return this.httpClient.get<RapportVisite>(url);
  }
}
