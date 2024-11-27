import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css'],
})
export class RegisterModalComponent {
  @Input() selectedEvent: any;
  @Output() closeModal = new EventEmitter<void>();
  @Output() proceedToPayment = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

  proceed() {
    this.proceedToPayment.emit();
  }
}
