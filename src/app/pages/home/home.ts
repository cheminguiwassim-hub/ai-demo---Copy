import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';   // <— your navbar component

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [RouterModule,Navbar],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class Home {

}
