import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    TranslateModule   // ⭐ IMPORTANT
  ],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css']
})
export class SettingsComponent {

  constructor(private translate: TranslateService) {}

  toggleDarkMode(enabled: boolean) {
    if (enabled) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode','true');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode','false');
    }
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

  toggleNotifications(enabled: boolean) {
    if (enabled) {
      const audio = new Audio('/notification.mp3');
      audio.play();
    }
  }

  ngOnInit() {

    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      this.translate.use(savedLang);
    }

    const dark = localStorage.getItem('darkMode');
    if (dark === 'true') {
      document.body.classList.add('dark-mode');
    }

  }
}
