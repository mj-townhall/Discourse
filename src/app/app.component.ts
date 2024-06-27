import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'discourseFrontend';
  prefersDarkMode: boolean = false;
  showAd :boolean =false;
  constructor(private router:Router){}
  ngOnInit() {
    this.detectSystemDarkMode();
    if (!( (this.router.url.startsWith('/login')) || (this.router.url.startsWith('/signup')) ) ) {
      this.showAd=true;
    }
    else this.showAd=false;
  }

  detectSystemDarkMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.prefersDarkMode = true;
    }

  }

}
