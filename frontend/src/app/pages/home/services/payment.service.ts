import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  processPayment(event: any) {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        const bookingId = this.generateBookingId();
        resolve({ success: true, bookingId: bookingId });
      }, 2000); // Simulate payment processing time
    });
  }

  generateBookingId(): string {
    return 'BOOK' + Math.floor(Math.random() * 1000000).toString();
  }
}
