import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LogoCarouselComponent } from './components/logo-carousel/logo-carousel.component';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, LogoCarouselComponent],
  imports: [CommonModule, NgOptimizedImage, FontAwesomeModule],
  exports: [
    HeaderComponent, // Esporta HeaderComponent
    FooterComponent, // Esporta FooterComponent
    LogoCarouselComponent,
  ],
})
export class SharedModule {}
