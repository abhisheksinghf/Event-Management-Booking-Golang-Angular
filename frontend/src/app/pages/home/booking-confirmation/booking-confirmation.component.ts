import { Component } from '@angular/core';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.css'],
})
export class BookingConfirmationComponent {
  bookingDetails: any;

  constructor() {
    this.bookingDetails = history.state;
  }
}
