import { Component } from '@angular/core';
import {Location} from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-backnavbar',
  standalone:true,
  imports: [RouterLink],
  templateUrl: './backnavbar.component.html',
  styleUrl: './backnavbar.component.scss'
})
export class BacknavbarComponent {
constructor(private location:Location){}
goBack(){
  this.location.back();
}
}
