import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css'],
})
export class RegisterModalComponent {
  @Input() selectedEvent: any;
  @Output() closeModal = new EventEmitter<void>();

  userName: string = '';

  constructor(private http: HttpClient, private router: Router) {} // Inject Router

  close() {
    this.closeModal.emit();
  }

  registerUser() {
    if (!this.selectedEvent || !this.userName) {
      alert('Please provide your name to register!');
      return;
    }
  
    const registrationData = {
      event_id: this.selectedEvent.event_id,
      name: this.userName,
      total_price: this.selectedEvent.ticket_price,
    };
  
    this.http.post<{ message: string }>('http://localhost:8080/bookticket', registrationData).subscribe({
      next: (response) => {
        // alert(response.message); // Display success message
        this.close();
        
        // Navigate to the payment page and pass required data
        this.router.navigate(['/payment'], {
          queryParams: {
            event_id: this.selectedEvent.event_id,
            event_name: this.selectedEvent.title,
            user_name: this.userName,
            total_price: this.selectedEvent.ticket_price,
          },
        });
      },
      error: (err) => {
        console.error('Registration failed:', err);
        alert('Something went wrong. Please try again.');
      },
    });
  }
}