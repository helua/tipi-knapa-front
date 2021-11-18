import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EcommerceService } from 'src/app/ecommerce.service';
import { TokenService } from 'src/app/token.service';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: any;
  @Input() price: any ='';
  @Output() updateCart = new EventEmitter<any>();
  ord: string = '';
  cartIcon = faCartPlus;

  constructor(private ecomm: EcommerceService, private token: TokenService) { }

  ngOnInit() {
  }

  createOrder(){
    if(!this.ord){
      this.token.getToken().then((t) => {
        if(t){
          this.ecomm.createEmptyOrder(t.accessToken).subscribe(o => {
            this.ord = o.data.id;
            // console.log(this.ord)
            this.ecomm.addLineItems(t.accessToken, this.ord, this.product.sku, this.product.title, this.product.images[0]).subscribe(r => {
            });
            this.ecomm.getCart(t.accessToken, this.ord).subscribe(c => {
              this.updateCart.emit({cart: c, ord: this.ord});
            });
          });
        }
      });
    }
    if(this.ord){
      this.token.getToken().then((t) => {
        if(t){
          this.ecomm.addLineItems(t.accessToken, this.ord, this.product.sku, this.product.title, this.product.images[0]).subscribe(r => {
            // console.log(r);
          });
          this.ecomm.getCart(t.accessToken, this.ord).subscribe(c => {
            this.updateCart.emit({cart: c, ord: this.ord});
            // console.log(c);
          });
        }
      });
    }

  }

  productPrice(){
    return this.price;
  }
}

