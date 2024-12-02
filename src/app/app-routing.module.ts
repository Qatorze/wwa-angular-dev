import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './shared/components/not-found-page/not-found-page.component';
import { preventLoggedInGuard } from './core/guards/prevent-logged-in.guard';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'homepage',
    loadChildren: () =>
      import('./homepage/homepage.module').then((m) => m.HomepageModule),
    canActivate: [preventLoggedInGuard], //Empèche de sortir d'aller à la page principale de l'application si le user est connecté.
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    canActivate: [authGuard],
    data: { role: 'user' },
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [authGuard],
    data: { role: 'admin' },
  },
  {
    path: 'auth', // Nuova rotta per il modulo auth
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [preventLoggedInGuard],
  },

  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
