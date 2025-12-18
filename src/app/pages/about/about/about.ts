import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BacknavbarComponent } from '../../../shared/backnavbar/backnavbar.component';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, BacknavbarComponent],
  templateUrl: './about.html',
  styleUrls: ['./about.scss']
})
export class About {}

