import { Component, inject, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatestWith, map } from 'rxjs';
import { DoctorsService } from '../../services/doctors.service';
import { Medecin } from '../../types/medecin';
import { RapportVisite } from '../../types/rapportVisite';

@Component({
  selector: 'app-detail-medecin',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './detail-medecin.component.html',
  styleUrl: './detail-medecin.component.scss',
})
export class DetailMedecinComponent {
  private readonly doctorsService = inject(DoctorsService);
  private readonly route = inject(ActivatedRoute);
  id = input.required<number>();
  medecin!: Medecin;
  rapports: RapportVisite[] = [];

  rapportVisiteForm = new FormGroup({
    date: new FormControl<string | null>(null, Validators.required),
    motif: new FormControl<string | null>(null, Validators.required),
    bilan: new FormControl<string | null>(null, Validators.required),
    visiteur: new FormControl<string | null>(null, Validators.required),
  });

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      // this.doctorsService
      //   .getDoctorById(Number(this.id))
      //   .subscribe((medecin) => {
      //     this.medecin = medecin;
      //   });
    });
    // this.doctorsService
    //   .getRapportVisteurByIdMedecin(Number(this.id))
    //   .subscribe((rapports) => {
    //     this.rapports = Array.isArray(rapports) ? rapports : [];
    //     console.log(this.rapports);
    //   });
    this.doctorsService
      .getDoctorById(Number(this.id))
      .pipe(
        combineLatestWith(
          this.doctorsService.getRapportVisteurByIdMedecin(Number(this.id))
        ),
        map(([medecin, rapports]) => {
          this.medecin = medecin;
          this.rapports = Array.isArray(rapports) ? rapports : [];
        })
      )
      .subscribe();

    // this.doctorsService
    //   .getDoctorById(Number(this.id()))
    //   .subscribe((medecin) => {
    //     this.medecin = medecin;
    //     console.log(this.medecin);
    //   });
  }
  onSubmit(): void {
    if (this.rapportVisiteForm.valid) {
      const newRapport = this.rapportVisiteForm.value;
    }
    console.log(this.rapportVisiteForm.value);
  }
}
