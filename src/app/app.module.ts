import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { NavMobileComponent } from './nav-mobile/nav-mobile.component';
import { AboutComponent } from './about/about.component';
import { ShopComponent } from './shop/shop.component';
import { MainComponent } from './main/main.component';
import { ProductsComponent } from './shop/products/products.component';
import { ProductComponent } from './shop/product/product.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ScullyLibModule } from '@scullyio/ng-lib';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NavMobileComponent,
    AboutComponent,
    ShopComponent,
    MainComponent,
    ProductsComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    BrowserAnimationsModule,
    ScullyLibModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
