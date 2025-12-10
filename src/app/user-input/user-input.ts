import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
const ENTER_KEY_ASCII = 13;
@Component({
  selector: 'app-user-input',
  imports: [FormsModule],
  templateUrl: './user-input.html',
  styleUrl: './user-input.scss',
})
export class UserInput {
  @Output() sendMessageEmitter = new EventEmitter()
  message: string=""
  sendMessage(){
    this.sendMessageEmitter.emit(this.message);
    this.message="";
  }
  onKeyUp($event:any){
    if($event.which === ENTER_KEY_ASCII){
      this.sendMessage();
      this.message="";
    }
  }
}
