import { Component } from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { getToken, clear, setCart, setOrderId, setCheckoutButton, getCart, getOrderId, getCheckoutButton } from '../app/localStorage'
import { TokenService } from './token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TIPI-KNAPA';
  norobots: MetaDefinition = {robots: 'description', content: 'noindex, nofollow, noimageindex'};

  constructor(private metaService: Meta){};

  ngOnInit(){
    // clear();
    this.metaService.updateTag(this.norobots);

    if(getCart() === null){
      setCart({
      data: {
        attributes: {
          skus_count: 0,
        }
      }
    });
    }
    console.log(getOrderId());
    if(getOrderId() === null){
      setOrderId('');
    }
    if(getCheckoutButton() === null){
      setCheckoutButton('true');
    }
  }
}
