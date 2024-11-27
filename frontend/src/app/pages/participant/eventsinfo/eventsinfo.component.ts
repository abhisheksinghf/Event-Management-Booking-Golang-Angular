import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eventsinfo',
  templateUrl: './eventsinfo.component.html',
  styleUrls: ['./eventsinfo.component.css'],
})
export class EventsinfoComponent implements OnInit {
  // Count card metrics
  totalEvents: number = 0; 
  ticketsBooked: number = 0; 
  wishlistCount: number = 0; 
  notifications: number = 0;

  events: any[] = []; 
  filteredEvents: any[] = []; 

  selectedEvent: any = null; 
  isModalOpen: boolean = false; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchEventData();
  }

  // Fetch events and statistics from the backend
  fetchEventData(): void {
    // Fetch event list
    this.http.get<any[]>('http://localhost:8080/getevents').subscribe({
      next: (data) => {
        this.events = data;
        this.filteredEvents = [...this.events]; 
        this.totalEvents = this.events.length; 
      },
      error: (err) => {
        console.error('Error fetching events:', err);
      },
    });

    // Fetch additional statistics (if available from backend)
    this.http.get<any>('http://localhost:8080/getstats').subscribe({
      next: (stats) => {
        this.ticketsBooked = stats.ticketsBooked || 0;
        this.wishlistCount = stats.wishlistCount || 0;
        this.notifications = stats.notifications || 0;
      },
      error: (err) => {
        console.error('Error fetching statistics:', err);
      },
    });
  }

  // Open registration modal
  openRegisterModal(event: any): void {
    this.selectedEvent = event;
    this.isModalOpen = true;
  }

  // Close registration modal
  closeRegisterModal(): void {
    this.isModalOpen = false;
  }
}
