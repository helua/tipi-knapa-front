import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EcommerceService } from 'src/app/ecommerce.service';
import { TokenService } from 'src/app/token.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: any;
  @Input() price: any ='';
  @Output() newCart = new EventEmitter<any>();
  // @Output() cartChanged: EventEmitter<any> = new EventEmitter();

  checkout: string = 'https://tipi-knapa-checkout.netlify.app/';

  ord: string = '';
  // cart: any;

  constructor(private ecomm: EcommerceService, private token: TokenService) { }

  ngOnInit() {
  }

  createOrder(){
    this.token.getToken().then((t) => {
      if(t){
        this.ecomm.createEmptyOrder(t.accessToken).subscribe(o => {
          this.ord = o.data.id;
          this.ecomm.addLineItems(t.accessToken, this.ord, this.product.sku, this.product.title, this.product.images[0]).subscribe(r => {
            console.log(r);
          });
          this.ecomm.getCart(t.accessToken, this.ord).subscribe(c => {
            // this.cart = c;
            this.newCart.emit(c);

            console.log(c);
          });
        });
      }
    });
  }

  productPrice(){
    return this.price;
  }
}

