import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { OverviewComponent } from './pages/overview/overview.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'overview', component: OverviewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepageRoutingModule {}
