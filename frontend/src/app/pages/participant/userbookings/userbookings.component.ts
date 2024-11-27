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
      bookingId: 101,
      eventName: 'Tech Conference 2024',
      userName: 'John Doe',
      bookingDate: '2024-11-15',
      ticketPrice: 120,
      ticketsCount: 2,
      location: 'San Francisco, CA',
      eventDate: '2024-12-01',
    },
    {
      bookingId: 102,
      eventName: 'Music Fest 2024',
      userName: 'Jane Smith',
      bookingDate: '2024-11-10',
      ticketPrice: 85,
      ticketsCount: 1,
      location: 'Los Angeles, CA',
      eventDate: '2024-12-15',
    },
    {
      bookingId: 103,
      eventName: 'Art Expo',
      userName: 'Alice Johnson',
      bookingDate: '2024-11-20',
      ticketPrice: 50,
      ticketsCount: 3,
      location: 'New York, NY',
      eventDate: '2024-12-10',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
