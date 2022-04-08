import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as Hammer from 'hammerjs';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { NavMobileComponent } from './nav-mobile/nav-mobile.component';
import { AboutComponent } from './about/about.component';
import { ShopComponent } from './shop/shop.component';
import { MainComponent } from './main/main.component';
import { ShoppingComponent } from './shop/shopping/shopping.component';
import { ProductComponent } from './shop/product/product.component';
import { CartComponent } from './shop/cart/cart.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { ButtonComponent } from './components/button/button.component';
import { ContactComponent } from './contact/contact.component';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any> {
    swipe: { direction: Hammer.DIRECTION_HORIZONTAL },
  };
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NavMobileComponent,
    AboutComponent,
    ShopComponent,
    MainComponent,
    ShoppingComponent,
    ProductComponent,
    SlideshowComponent,
    ButtonComponent,
    CartComponent,
    LoadingComponent,
    ContactComponent,
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
    HttpClientModule,
    MatDialogModule,
    MatBadgeModule,
    MatTooltipModule,
    MatSnackBarModule,
    HammerModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {duration: 3700}},
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
  ],
  bootstrap: [AppComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
