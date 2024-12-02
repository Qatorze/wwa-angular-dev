import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ManageUsersComponent, DashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
  ],
})
export class AdminModule {}
