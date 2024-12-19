import { Component } from '@angular/core';
import { faWhatsapp, faInstagram, faFacebook,  } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: false,
  
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  faWhatsapp = faWhatsapp;
  faInstagram = faInstagram;
  faFacebook = faFacebook;
}
