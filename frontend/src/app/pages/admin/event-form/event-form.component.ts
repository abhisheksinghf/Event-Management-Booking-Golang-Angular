import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent {
  @Input() event: any = { id: null, title: '', date: '', location: '' }; // Prepopulate data
  @Input() isEditMode: boolean = false; // Distinguish between add and edit
  @Output() saveEvent = new EventEmitter<any>(); // Emit event data on save
  @Output() close = new EventEmitter<void>(); // Notify parent to close the popup

  handleSaveEvent() {
    if (!this.event.title || !this.event.date || !this.event.location) {
      alert('Please fill out all fields!');
      return;
    }
    this.saveEvent.emit(this.event); // Emit the event object to parent
  }

  closePopup() {
    this.close.emit(); // Notify parent to close popup
  }
}
