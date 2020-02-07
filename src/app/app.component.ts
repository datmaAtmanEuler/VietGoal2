import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LANGUAGES } from './app.static';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppState } from './app-state.service';
import { Register } from './models/register';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']

})

export class AppComponent implements OnInit, AfterViewInit {
  values: string[] = ['Tag 1', 'Tag 2', 'Tag 4'];

  specialPage: boolean;

  private specialPages: any[] = [];
  currentUser: Register = new Register();
  private currentUrl = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    public translate: TranslateService,
    private appState: AppState,
    private location: Location
  ) {
  }

  ngAfterViewInit() {
  }

  ngOnInit(): void {
    if (this.authenticationService.currentUser) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
        const languages = LANGUAGES.map(i => i.code);
        this.translate.addLangs(languages);
        this.translate.setDefaultLang(languages[1]);

        const browserLang = this.translate.getBrowserLang();
        const languageUse = languages.indexOf(browserLang) >= 0 ? browserLang : languages[1];
        this.translate.use(languageUse);
        this.appState.locale = LANGUAGES.filter(i => i.code === languageUse)[0];
    this.router.events.subscribe((route:any) => {
      this.currentUrl = route.url;

      this.specialPage = this.specialPages.indexOf(this.currentUrl) !== -1;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
