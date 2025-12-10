import { Component, Input } from '@angular/core';
import { Message } from '../utility/constants';

@Component({
  selector: 'app-message-panal',
  imports: [],
  templateUrl: './message-panal.html',
  styleUrl: './message-panal.scss',
})
export class MessagePanal {
  @Input() messages: Message[]=[];

}
