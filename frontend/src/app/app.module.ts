import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PaymentComponent } from './pages/home/payment/payment.component';
import { BookingConfirmationComponent } from './pages/home/booking-confirmation/booking-confirmation.component';
import { RegisterModalComponent } from './pages/home/register-modal/register-modal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrganizerComponent } from './pages/organizer/organizer.component';
import { DashboardComponent } from './pages/organizer/dashboard/dashboard.component';
import { EventsComponent } from './pages/organizer/events/events.component';
import { BookingsComponent } from './pages/organizer/bookings/bookings.component';
import { AddEventComponent } from './pages/organizer/events/add-event/add-event.component';
import { RegisterComponent } from './auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ParticipantComponent } from './pages/participant/participant.component';
import { EventsinfoComponent } from './pages/participant/eventsinfo/eventsinfo.component';
import { WishlistComponent } from './pages/participant/wishlist/wishlist.component';
import { ModalPopComponent } from './pages/participant/model-pop/model-pop.component';
import { Userbookings } from './pages/participant/userbookings/userbookings.component';
import { EventsdisplayComponent } from './pages/participant/eventsdisplay/eventsdisplay.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PaymentComponent,
    BookingConfirmationComponent,
    RegisterModalComponent,
    NavbarComponent,
    LoginComponent,
    OrganizerComponent,
    DashboardComponent,
    EventsComponent,
    BookingsComponent,
    AddEventComponent,
    RegisterComponent,
    ParticipantComponent,
    EventsinfoComponent,
    WishlistComponent,
    ModalPopComponent,
    Userbookings,
    EventsdisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,  // Import routing module
    HttpClientModule, // Make sure HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent],  // Bootstrap the AppComponent
})
export class AppModule {}
