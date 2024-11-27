import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventListComponent } from './event-list/event-list.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'events', component: EventListComponent }, // Route to manage events
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
