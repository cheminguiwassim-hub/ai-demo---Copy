import { Component, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';   // <— your navbar component

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [RouterModule,Navbar],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {
  constructor(private router: Router) {}
  goMap() { this.router.navigate(['/pages/map-page']); }
  goRides() { this.router.navigate(['/pages/rides']); }

}
