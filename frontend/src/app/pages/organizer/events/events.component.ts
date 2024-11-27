import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import $ from 'jquery';
import 'datatables.net';
import { jsPDF } from 'jspdf';  // Correct import for jsPDF
import * as XLSX from 'xlsx';  // Correct import for XLSX

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: any[] = [];  // Initialize events as an empty array
  showModal = false;
  selectedEvent: any = null; // Store the event being edited

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchEvents(); // Fetch events when component is initialized
  }

  fetchEvents(): void {
    this.http.get<any[]>('http://localhost:8080/getevents')  // API endpoint to fetch events
      .subscribe({
        next: (data) => {
          this.events = data;  // Assign the fetched data to the events array
          this.initializeDataTable();  // Reinitialize the DataTable
        },
        error: (err) => {
          console.error('Error fetching events:', err);
        }
      });
  }

  initializeDataTable(): void {
    setTimeout(() => {
      $('#eventsTable').DataTable({
        pageLength: 5,
        lengthMenu: [5, 10, 15],
        destroy: true
      });
    }, 0);
  }

  openModal(event: any = null): void {
    this.selectedEvent = event; // Pass the event to edit or null for add
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedEvent = null;
  }

  saveEvent(eventData: any): void {
    if (this.selectedEvent) {
      // Editing an event
      const index = this.events.findIndex(event => event.event_id === this.selectedEvent.event_id);
      if (index !== -1) {
        this.events[index] = { ...this.selectedEvent, ...eventData };
      }
    } else {
      // Adding a new event
      const newEvent = { ...eventData, event_id: this.events.length + 1 };  // Adjust ID logic as needed
      this.events.push(newEvent);
    }
    this.closeModal(); // Close the modal
    $('#eventsTable').DataTable().destroy(); // Reinitialize table
    this.initializeDataTable();
  }

  deleteEvent(eventId: number): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.events = this.events.filter(event => event.event_id !== eventId);
      $('#eventsTable').DataTable().destroy();
      this.initializeDataTable();
    }
  }

  // Export to PDF
  exportToPDF() {
    const doc = new jsPDF();
    doc.text('Event List', 10, 10);
    this.events.forEach((event, index) => {
      doc.text(`${event.title} - ${event.date} - ${event.location}`, 10, 20 + (index * 10));
    });
    doc.save('events.pdf');
  }

  // Export to Excel
  exportToExcel() {
    const ws = XLSX.utils.json_to_sheet(this.events);  // Convert events to a sheet
    const wb = XLSX.utils.book_new();  // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Events');  // Append the sheet to the workbook
    XLSX.writeFile(wb, 'events.xlsx');  // Save the file
  }
}