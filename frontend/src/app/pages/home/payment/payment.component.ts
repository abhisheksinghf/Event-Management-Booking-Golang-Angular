import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  event: any;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.event = history.state.event;
  }

  processPayment() {
    // Simulate payment process
    setTimeout(() => {
      this.router.navigate(['/booking-confirmation'], { state: { event: this.event, bookingId: this.generateBookingId() } });
    }, 2000);
  }

  generateBookingId(): string {
    return 'BOOK' + Math.floor(Math.random() * 1000000).toString();
  }
}
