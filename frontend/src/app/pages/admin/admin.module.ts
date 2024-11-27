import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Add this import
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventFormComponent } from './event-form/event-form.component';

@NgModule({
  declarations: [
    DashboardComponent,
    EventListComponent,
    EventFormComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule, // Import here for ngModel support
  ],
})
export class AdminModule {}
