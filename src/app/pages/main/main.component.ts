import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DoctorComponent } from '../../doctor/doctor.component';
import { FilterComponent } from '../../filter/filter.component';
import { DoctorsService } from '../../services/doctors.service';
import { Medecin } from '../../types/medecin';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterLink,
    DoctorComponent,
    ReactiveFormsModule,
    FilterComponent,
    FormsModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  private readonly doctorsService = inject(DoctorsService);
  private readonly destroyRef = inject(DestroyRef);
  medecins!: Medecin[];
  filteredMedecins!: Medecin[];

  ngOnInit(): void {
    this.doctorsService
      .getDoctors()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((medecins) => {
        this.medecins = medecins;
        this.filteredMedecins = medecins;
      });
  }
  searchDoctor(name: string): void {
    if (!name) {
      this.filteredMedecins = this.medecins;
      return;
    }
    this.filteredMedecins = this.medecins.filter((medecin) =>
      medecin.nom.toLowerCase().includes(name.toLowerCase())
    );
  }
}
