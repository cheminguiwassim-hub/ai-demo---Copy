import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ride {
  origin: string;
  destination: string;
  date: string;
  time: string;
  totalSeats: number;
  seats: number;
  price: number;
  luggageAllowed: boolean;
  description?: string;
  driverId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RideService {

  private apiUrl = 'http://localhost:4000/rides/'; // ton backend

  constructor(private http: HttpClient) {}

  // ➕ Créer un trajet
  createRide(ride: Ride): Observable<any> {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const driverId = currentUser?.id || null;
      const rideWithDriver = { ...ride, driverId };
    return this.http.post(`${this.apiUrl}`, rideWithDriver);


  }

  // 📄 Récupérer tous les trajets
  getAllRides(): Observable<Ride[]> {
    return this.http.get<Ride[]>(`${this.apiUrl}`);
  }

  // 🔍 Récupérer un trajet par ID
  getRideById(id: string): Observable<Ride> {
    return this.http.get<Ride>(`${this.apiUrl}/${id}`);
  }
}
