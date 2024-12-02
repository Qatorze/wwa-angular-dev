import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { OverviewComponent } from './pages/overview/overview.component';

@NgModule({
  declarations: [
    LandingPageComponent,
    OverviewComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    SharedModule,
  ],
})
export class HomepageModule {}
