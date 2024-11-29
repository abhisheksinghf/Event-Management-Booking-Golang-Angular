import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userbookings',
  templateUrl: './userbookings.component.html',
  styleUrls: ['./userbookings.component.css'],
})
export class Userbookings implements OnInit {
  // Hardcoded bookings
  bookings = [
 
    {
      bookingId: 104,
      eventName: 'Startup Pitch Fest',
      userName: 'John Doe',
      bookingDate: '2024-11-29',
      ticketPrice: 75,
      ticketsCount: 2,
      location: 'Austin, TX',
      eventDate: '2024-12-25 14:00:00',
      category: 'business',
      availableTickets: 300
    }
    
  ];

  constructor() {}

  ngOnInit(): void {}
}
