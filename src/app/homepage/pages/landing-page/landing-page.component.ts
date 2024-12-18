import { Component } from '@angular/core';
import { faUser, } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing-page',
  standalone: false,
  
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  faUser = faUser;
  faArrowRight = faArrowRight;
}
