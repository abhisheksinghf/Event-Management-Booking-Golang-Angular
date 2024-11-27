import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Event } from './event.model';  // Import the Event interface

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  events: Event[] = [];  // Initialize with the correct type
  filteredEvents: Event[] = [];  // Initialize with the correct type
  categories: string[] = [];
  locations: string[] = [];

  selectedEvent: Event | null = null;  // Type the selectedEvent variable correctly
  isModalOpen: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  // On component initialization, fetch events from the backend
  ngOnInit(): void {
    this.fetchEvents();
  }

  // Fetch events from the backend
  fetchEvents(): void {
    this.http.get<Event[]>('http://localhost:8080/getevents').subscribe({
      next: (data) => {
        this.events = data;  // Store the events fetched from the backend
        this.filteredEvents = [...this.events];  // Initialize filteredEvents
        this.extractCategoriesAndLocations();
      },
      error: (err) => {
        console.error('Error fetching events:', err);
      },
    });
  }

  // Extract unique categories and locations from the fetched events
  extractCategoriesAndLocations(): void {
    this.categories = [...new Set(this.events.map((event) => event.category))];
    this.locations = [...new Set(this.events.map((event) => event.location))];
  }

  // Filter events based on selected category
  filterEvents(event: any): void {
    const filterCategory = event.target.value;
    if (filterCategory) {
      this.filteredEvents = this.events.filter((e) => e.category === filterCategory);
    } else {
      this.filteredEvents = [...this.events];
    }
  }

  // Search events based on title or description
  searchEvent(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filteredEvents = this.events.filter((e) => 
      e.title.toLowerCase().includes(query) || e.description.toLowerCase().includes(query)
    );
  }

  // Open the event registration modal
  openRegisterModal(event: Event): void {
    this.selectedEvent = event;
    this.isModalOpen = true;
  }

  // Close the event registration modal
  closeRegisterModal(): void {
    this.isModalOpen = false;
  }

  // Proceed to payment page with the selected event
  proceedToPayment(): void {
    this.router.navigate(['/payment'], { state: { event: this.selectedEvent } });
  }
}
