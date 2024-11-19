import { Component, input } from '@angular/core';
import { Medecin } from '../types/medecin';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.scss',
})
export class DoctorComponent {
  doctor = input.required<Medecin>();
  // @Input() medecins!: Medecin[];
}
