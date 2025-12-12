import { Component } from '@angular/core';
import { BacknavbarComponent } from '../../shared/backnavbar/backnavbar.component';

@Component({
  selector: 'app-userprofile',
  imports: [BacknavbarComponent],
  templateUrl: './userprofile.html',
  styleUrl: './userprofile.scss',
  standalone:true,
})
export class Userprofile {
      getUserInitials(): string {
    return 'JD';}

}
