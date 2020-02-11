import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AppState} from './app-state.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from '@angular/common';
import {CookieModule} from 'ngx-cookie';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {LoginComponent} from './login/login.component';
import {LoginService} from './services/login.service'; 

import {NgxPaginationModule} from 'ngx-pagination';
import { NgbModalConfig, NgbModal, NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ConfirmComponent } from './shared/modal/confirm/confirm.component';
import { environment } from 'environments/environment';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `${environment.serverOriginUrl}i18n/`, '.json');
}

@NgModule({
  imports: [
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    NgbModalModule,
    HttpClientModule,
    CookieModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
	useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  entryComponents: [ConfirmComponent],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    ConfirmComponent
  ],
  providers: [  	
	NgbModalConfig,
	NgbModal,
        NgbActiveModal,
	AppState,
	LoginService,
	{ provide: APP_BASE_HREF, useValue: '/' },
       { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
