import { Component, output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  searchDoctorControl = new FormControl<string | null>(null);
  searchDoctor = output<string>();

  addFilter(): void {
    if (this.searchDoctorControl.value === null) {
      return;
    }
    return this.searchDoctor.emit(this.searchDoctorControl.value);
  }
}
