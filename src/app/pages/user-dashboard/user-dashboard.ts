import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardCard } from './dashboard-card/dashboard-card';
import { App } from '../../app';
import { BacknavbarComponent } from '../../shared/backnavbar/backnavbar.component';

@Component({
  selector: 'app-user-dashboard',
  imports: [RouterLink,DashboardCard,BacknavbarComponent
  ],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.scss',
  standalone:true,
})
export class UserDashboard {

}
