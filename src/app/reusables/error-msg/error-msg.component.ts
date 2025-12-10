import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  imports: [],
  templateUrl: './error-msg.component.html',
  styleUrl: './error-msg.component.scss',
  standalone:true
})
export class ErrorMsgComponent {
  @Input() message:string="";
  @Input() show:boolean=false;

}
