/*import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardCard } from './dashboard-card/dashboard-card';
import { App } from '../../app';
import { BacknavbarComponent } from '../../shared/backnavbar/backnavbar.component';
import { AuthService, IUser } from '../../services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  imports: [RouterLink,DashboardCard,BacknavbarComponent
  ],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.scss',
  standalone:true,
})
export class UserDashboard implements OnInit{
   user:IUser | null =null;
   constructor(private authservice: AuthService){}
  ngOnInit(): void {
    this.user=this.authservice.getUser();
  }
 

}
*/


import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardCard } from './dashboard-card/dashboard-card';
import { App } from '../../app';
import { BacknavbarComponent } from '../../shared/backnavbar/backnavbar.component';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  imports: [RouterLink,DashboardCard,BacknavbarComponent
  ],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.scss',
  standalone:true,
})
export class UserDashboard implements OnInit{
   user:User | null =null;
   constructor(private authservice: AuthService){}
  ngOnInit(): void {
    this.user=this.authservice.getUser();
  }
}