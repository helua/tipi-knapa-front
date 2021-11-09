import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  // { path: '', redirectTo: '/info', pathMatch: 'full' },
  { path: '', component: MainComponent },
  { path: 'o-nas', component: AboutComponent },
  { path: 'sklep', component: ShopComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
