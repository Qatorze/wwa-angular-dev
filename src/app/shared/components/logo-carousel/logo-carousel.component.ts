import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo-carousel',
  standalone: false,
  
  templateUrl: './logo-carousel.component.html',
  styleUrl: './logo-carousel.component.scss'
})
export class LogoCarouselComponent implements OnInit {

  logos: string [] = [
    'assets/logo-uni-1-wwa.svg',
    'assets/logo-uni-2-wwa.svg',
    'assets/logo-uni-3-wwa.svg',
    'assets/logo-uni-4-wwa.svg',
    'assets/logo-uni-5-wwa.svg',
    'assets/logo-uni-6-wwa.svg',
    'assets/logo-uni-7-wwa.svg',
    'assets/logo-uni-8-wwa.svg',

    // Ajouter d'autre logo ici pour les faire appraître dans le caroussel également en haut
  ];

  constructor() {}

  ngOnInit(): void {}
}
