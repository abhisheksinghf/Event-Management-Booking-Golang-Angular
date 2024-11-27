import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eventsdisplay',
  templateUrl: './eventsdisplay.component.html',
  styleUrls: ['./eventsdisplay.component.css'],
})
export class EventsdisplayComponent implements OnInit {
  // Count card metrics
  totalEvents: number = 0;
  ticketsBooked: number = 0;
  wishlistCount: number = 0;
  notifications: number = 0;

  events: any[] = [];
  filteredEvents: any[] = [];

  selectedEvent: any = null;
  isModalOpen: boolean = false;

  isWishlistModalOpen: boolean = false; // Wishlist modal state
  wishlistedEvents: any[] = []; // Store wishlisted events

  // Variables for modal form
  userName: string = '';
  ticketCount: number = 1;

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

        // Initialize wishlist state for each event
        this.events.forEach((event) => {
          event.isWishlisted = false;  // Add default wishlist state
        });
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

  // Toggle the wishlist status
  toggleWishlist(event: any): void {
    event.isWishlisted = !event.isWishlisted;  // Toggle wishlist state
    this.wishlistCount = this.events.filter(e => e.isWishlisted).length; // Update wishlist count

    // Update wishlistedEvents list
    this.wishlistedEvents = this.events.filter(e => e.isWishlisted);
    console.log(`${event.title} has been ${event.isWishlisted ? 'added to' : 'removed from'} wishlist.`);
  }

  // Open the wishlist modal
  openWishlistModal(): void {
    this.isWishlistModalOpen = true;
  }

  // Close the wishlist modal
  closeWishlistModal(): void {
    this.isWishlistModalOpen = false;
  }

  // Open registration modal
  openRegisterModal(event: any): void {
    this.selectedEvent = event;
    this.isModalOpen = true;
    this.userName = ''; // Reset userName and ticketCount when opening the modal
    this.ticketCount = 1;
  }

  // Close registration modal
  closeRegisterModal(): void {
    this.isModalOpen = false;
  }

  // Handle registration logic
  registerForEvent(): void {
    if (this.userName && this.ticketCount > 0) {
      // Logic for registering for the event, e.g., call an API to submit registration
      console.log('Registering for event:', this.selectedEvent);
      console.log('User:', this.userName);
      console.log('Tickets:', this.ticketCount);

      // Close the modal after successful registration
      this.closeRegisterModal();
    } else {
      alert('Please provide valid information!');
    }
  }
}
