import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PaymentComponent } from './pages/home/payment/payment.component';
import { BookingConfirmationComponent } from './pages/home/booking-confirmation/booking-confirmation.component';
import { LoginComponent } from './auth/login/login.component';
import { OrganizerComponent } from './pages/organizer/organizer.component'; // Import Organizer Component
import { DashboardComponent } from './pages/organizer/dashboard/dashboard.component'; // Import Dashboard Component
import { EventsComponent } from './pages/organizer/events/events.component'; // Import Events Component
import { BookingsComponent } from './pages/organizer/bookings/bookings.component'; // Import Bookings Component
import { RegisterComponent } from './auth/register/register.component';
import { ParticipantComponent } from './pages/participant/participant.component';
import { EventsinfoComponent } from './pages/participant/eventsinfo/eventsinfo.component';
import { WishlistComponent } from './pages/participant/wishlist/wishlist.component';
import { Userbookings } from './pages/participant/userbookings/userbookings.component';
import { EventsdisplayComponent } from './pages/participant/eventsdisplay/eventsdisplay.component';
import { AdminbookingsComponent } from './pages/superadmin/adminbookings/adminbookings.component';
import { SuperadminComponent } from './pages/superadmin/superadmin.component';
import { AdmindashComponent } from './pages/superadmin/admindash/admindash.component';
import { EventsdashComponent } from './pages/superadmin/eventsdash/eventsdash.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Default Route
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },
  { path: 'payment', component: PaymentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'booking-confirmation', component: BookingConfirmationComponent },

  // Organizer Routes with Parameterized ID
  {
    path: 'organizer/:user_id', // Dynamically pass the user_id in the URL
    component: OrganizerComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'events', component: EventsComponent },
      { path: 'bookings', component: BookingsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Default child route
    ]
  },
  // Organizer Routes with Parameterized ID
  {
    path: 'superadmin/:user_id', // Dynamically pass the user_id in the URL
    component: SuperadminComponent,
    children: [
      { path: 'dashboard', component: AdmindashComponent },
      { path: 'events', component: EventsdashComponent },
      { path: 'bookings', component: AdminbookingsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Default child route
    ]
  },
  
  {
    path: 'participant/:user_id', // Dynamically pass the user_id in the URL
    component: ParticipantComponent,
    children: [
      { path: 'dashboard', component: EventsinfoComponent },
      { path: 'allevents', component: EventsdisplayComponent },
      { path: 'userbookings', component: Userbookings },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Default child route
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Set up routing
  exports: [RouterModule],
})
export class AppRoutingModule {}
