import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from '../utility/constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-panal',
  imports: [CommonModule],
  templateUrl: './message-panal.html',
  styleUrl: './message-panal.scss',
})
export class MessagePanal {
  @Input() messages: Message[]=[];
  @Input() pendingBooking = false;
  @Input() pendingRideCreation = false;

  @Output() bookingConfirmed = new EventEmitter<void>();
  @Output() bookingCancelled = new EventEmitter<void>();

  confirmBooking() {
    this.bookingConfirmed.emit();
  }

  cancelBooking() {
    this.bookingCancelled.emit();
  }
}
