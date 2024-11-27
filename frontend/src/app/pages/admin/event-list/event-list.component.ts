import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';  // Correct import for jsPDF
import * as XLSX from 'xlsx';  // Correct import for XLSX

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent {
  events = [
    { id: 1, title: 'Music Concert', date: '2024-12-01', location: 'Los Angeles' },
    { id: 2, title: 'Art Exhibition', date: '2024-12-05', location: 'New York' },
    { id: 3, title: 'Tech Conference', date: '2024-12-10', location: 'San Francisco' },
  ];

  isPopupOpen: boolean = false; // Controls popup visibility
  isEditMode: boolean = false; // Tracks if the popup is in edit mode
  selectedEvent: any = { id: null, title: '', date: '', location: '' }; // Holds the event to edit/add

  openAddEventPopup() {
    this.isEditMode = false; // Set to "Add" mode
    this.selectedEvent = { id: null, title: '', date: '', location: '' }; // Reset for new event
    this.isPopupOpen = true;
  }

  openEditEventPopup(event: any) {
    this.isEditMode = true; // Set to "Edit" mode
    this.selectedEvent = { ...event }; // Populate with selected event data
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false; // Close the popup
  }

  handleSaveEvent(updatedEvent: any) {
    if (this.isEditMode) {
      // Update existing event
      const index = this.events.findIndex((e) => e.id === updatedEvent.id);
      if (index > -1) this.events[index] = updatedEvent;
    } else {
      // Add new event
      updatedEvent.id = this.events.length + 1; // Generate a new ID
      this.events.push(updatedEvent);
    }
    this.closePopup(); // Close popup after saving
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
