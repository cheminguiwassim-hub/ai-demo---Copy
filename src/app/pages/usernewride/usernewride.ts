import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BacknavbarComponent } from '../../shared/backnavbar/backnavbar.component';
import { RideService } from '../../services/ride.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new',
  standalone:true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,BacknavbarComponent],
  templateUrl: './usernewride.html',
  styleUrl: './usernewride.scss',
  
})
export class  Usernewride{
  rideForm: FormGroup;
  currentStep = 1;
  governorates = [
  "Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès",
  "Gafsa", "Jendouba", "Kairouan", "Kasserine", "Kébili",
  "Kef", "Mahdia", "Manouba", "Médenine", "Monastir",
  "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", "Sousse",
  "Tataouine", "Tozeur", "Tunis", "Zaghouan"
];

  
  constructor(private fb: FormBuilder, private rideService: RideService,private authService: AuthService,private router:Router) {
  this.rideForm = this.fb.group({
  origin: ['', Validators.required],
  destination: ['', Validators.required],

  date: ['', Validators.required],
  time: ['', Validators.required],

  totalSeats: [1, [Validators.required, Validators.min(1), Validators.max(8)]],
  seats: [1], // sera mis à jour automatiquement = totalSeats

  price: [0, [Validators.required, Validators.min(0)]],

  luggageAllowed: [true],
  description: [''],
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
  incrementSeats() {
  let value = this.rideForm.get('totalSeats')?.value;
  if (value < 8) {
    this.rideForm.patchValue({ totalSeats: value + 1, seats: value + 1 });
  }
}

decrementSeats() {
  let value = this.rideForm.get('totalSeats')?.value;
  if (value > 1) {
    this.rideForm.patchValue({ totalSeats: value - 1, seats: value - 1 });
  }
}


  onSubmit() {
    if (this.rideForm.valid) {
          const user = this.authService.currentUser.value;
    if (!user) {
      alert("Utilisateur non connecté !");
      return;
    }

    const rideData = {
      ...this.rideForm.value,
      driverId: user.id     // 🔥 Ajout automatique du conducteur
    };

    this.rideService.createRide(rideData).subscribe({
      next: (response) => {
        console.log("Trajet créé :", response);
        alert("Trajet publié avec succès !");
        this.currentStep = 1;
        this.rideForm.reset();
        this.router.navigate(['/pages/userrides']);
      },
      error: (err) => {
        console.error("Erreur backend :", err);
        alert("Erreur lors de la publication du trajet");
      }
    });

    } else {
      this.rideForm.markAllAsTouched();
    }
  }
}
