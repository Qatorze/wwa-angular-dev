import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  imports: [CommonModule, NgOptimizedImage, FontAwesomeModule],
  exports: [
    HeaderComponent, // Esporta HeaderComponent
    FooterComponent, // Esporta FooterComponent
  ],
})
export class SharedModule {}
