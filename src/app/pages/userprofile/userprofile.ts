import { Component } from '@angular/core';

@Component({
  selector: 'app-userprofile',
  imports: [],
  templateUrl: './userprofile.html',
  styleUrl: './userprofile.scss',
  standalone:true,
})
export class Userprofile {
      getUserInitials(): string {
    return 'JD';}

}
