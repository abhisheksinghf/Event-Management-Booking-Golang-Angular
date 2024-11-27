import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  @Input() event: any = null; // Accept the event to edit
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<any>(); // Emit the saved event data
  addEventForm: FormGroup;
  organizerId: string | null = null;  // Start as null

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.addEventForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      location: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      category: ['', Validators.required],
      ticket_price: [0, [Validators.required, Validators.min(0)]],
      total_tickets: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    // Access the current URL and extract the organizer ID
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split('/');  // Split URL by '/' to get parts
    this.organizerId = urlParts[urlParts.length - 2];  // The organizer ID will be 3rd from the last part

    console.log('Organizer ID extracted from URL:', this.organizerId); // Should log '123'

    if (this.event) {
      // Prefill the form if editing
      this.addEventForm.patchValue(this.event);
    }
  }

  onSubmit(): void {
    if (this.addEventForm.valid) {
      // Convert organizerId to an integer (if it's a valid number)
      const eventData = { 
        ...this.addEventForm.value, 
        organizer_id: parseInt(this.organizerId as string, 10) 
      };
  
      // Check if conversion was successful
      if (isNaN(eventData.organizer_id)) {
        console.error("Invalid organizer ID");
        return;
      }
  
      // Determine if we're adding or updating
      if (this.event && this.event.event_id) {
        eventData['event_id'] = this.event.event_id; // Include the event_id for updates
      }
  
      // Send the data to the backend with the correct headers
      this.http.post(`http://localhost:8080/addEvent`, eventData, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).subscribe({
        next: (response: any) => {
          console.log(response.message);
          this.saveEvent.emit(eventData); // Emit the saved event data
          this.closeModal(); // Close the modal
        },
        error: (err) => {
          console.error('Error saving event:', err);
        }
      });
    }
  }
  

  closeModal(): void {
    this.closeModalEvent.emit();
  }
}
