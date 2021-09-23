import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { InfoComponent } from './info/info.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { NavMobileComponent } from './nav-mobile/nav-mobile.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { KontaktComponent } from './kontakt/kontakt.component';
import { CennikComponent } from './cennik/cennik.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    InfoComponent,
    GaleriaComponent,
    NavMobileComponent,
    KontaktComponent,
    CennikComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
