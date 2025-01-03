import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import $ from 'jquery';
import 'datatables.net';
import { jsPDF } from 'jspdf';  // Correct import for jsPDF
import * as XLSX from 'xlsx';  // Correct import for XLSX

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  bookings: any[] = [];  // Initialize bookings as an empty array
  showModal = false;
  selectedEvent: any = null; // Store the event being edited

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBookings(); // Fetch bookings when component is initialized
  }

  fetchBookings(): void {
    // Get the organizer ID from the URL or elsewhere (e.g., localStorage, sessionStorage)
    const organizerId = this.getOrganizerIdFromURL();

    this.http.get<any[]>(`http://localhost:8080/getbookings?orgId=${organizerId}`, {
      headers: {
        'Content-Type': 'application/json',
        // Add Authorization or other headers if needed
      }
    }).subscribe({
      next: (data) => {
        this.bookings = data;  // Assign the fetched data to the bookings array
        this.initializeDataTable();  // Reinitialize the DataTable
      },
      error: (err) => {
        console.error('Error fetching bookings:', err);
        if (err.status === 0) {
          console.error('Possible CORS issue or the backend is not accessible.');
        } else if (err.status === 404) {
          console.error('API route not found.');
        }
      }
    });
  }

  getOrganizerIdFromURL(): string {
    // You can modify this to fetch the organizerId from the URL or route parameters as per your routing logic
    const url = window.location.href;
    const segments = url.split('/');
    const orgIndex = segments.indexOf('organizer');
    if (orgIndex !== -1 && segments[orgIndex + 1]) {
      return segments[orgIndex + 1]; // Return the organizerId
    }
    return ''; // Default return value in case no orgId is found
  }

  initializeDataTable(): void {
    setTimeout(() => {
      $('#bookingsTable').DataTable({
        pageLength: 5,
        lengthMenu: [5, 10, 15],
        destroy: true
      });
    }, 0);
  }

  // Export to PDF
  exportToPDF() {
    const doc = new jsPDF();
    doc.text('Booking Details', 10, 10);
    this.bookings.forEach((booking, index) => {
      doc.text(`${booking.title} - ${booking.date} - ${booking.location} - ${booking.ticket_name} - $${booking.total_price}`, 10, 20 + (index * 10));
    });
    doc.save('bookings.pdf');
  }

  // Export to Excel
  exportToExcel() {
    const ws = XLSX.utils.json_to_sheet(this.bookings);  // Convert bookings to a sheet
    const wb = XLSX.utils.book_new();  // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Bookings');  // Append the sheet to the workbook
    XLSX.writeFile(wb, 'bookings.xlsx');  // Save the file
  }
}
