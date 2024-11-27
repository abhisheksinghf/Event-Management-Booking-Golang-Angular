import { Component } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.css'],
})
export class BookingConfirmationComponent {
  bookingDetails = {
    bookingId: 'ABC123',
    event: {
      title: 'Tech Conference 2024',
      location: 'San Francisco, CA',
      date: '2024-12-15',
      cost: 150,
    },
  };

  downloadTicket() {
    const ticketElement = document.querySelector('.booking-card') as HTMLElement; // Explicit type cast
    if (ticketElement) {
      html2canvas(ticketElement).then((canvas) => {
        const link = document.createElement('a');
        link.download = `ticket_${this.bookingDetails.bookingId}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    } else {
      console.error('Ticket element not found');
    }
  }
}
