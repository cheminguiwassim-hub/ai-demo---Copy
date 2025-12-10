import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new',
  standalone:true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './usernewride.html',
  styleUrl: './usernewride.scss',
  
})
export class  Usernewride{
  rideForm: FormGroup;
  currentStep = 1;
  
  constructor(private fb: FormBuilder) {
    this.rideForm = this.fb.group({
      departure: ['', Validators.required],
      arrival: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      passengers: [1, [Validators.required, Validators.min(1), Validators.max(8)]],
      price: [20, [Validators.required, Validators.min(0)]],
      description: [''],
      // Options
      allowSmoking: [false],
      allowPets: [false],
      instantBooking: [true]
    });
  }

  // Helper for animation state or step validation
  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit() {
    if (this.rideForm.valid) {
      console.log('Ride published:', this.rideForm.value);
      // Here you would typically call a service
      alert('Trajet publié avec succès ! (Simulation)');
    } else {
      this.rideForm.markAllAsTouched();
    }
  }
}
