import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardCard } from './dashboard-card/dashboard-card';

@Component({
  selector: 'app-user-dashboard',
  imports: [RouterLink,DashboardCard],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.scss',
  standalone:true,
})
export class UserDashboard {

}
