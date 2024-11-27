import { Component } from '@angular/core';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent {
  bookings = [
    { event: 'Music Concert', attendee: 'John Doe', email: 'john@example.com' },
    { event: 'Art Workshop', attendee: 'Jane Smith', email: 'jane@example.com' },
    { event: 'Tech Meetup', attendee: 'Sam Wilson', email: 'sam@example.com' }
  ];
}
