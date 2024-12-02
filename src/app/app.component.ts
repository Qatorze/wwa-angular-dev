import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'; // Importa l'icona

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false,
})
export class AppComponent {
  faCoffee = faCoffee;
  title = 'wwa-angular-dev';
}
