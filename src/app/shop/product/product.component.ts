import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { EcommerceService } from 'src/app/ecommerce.service';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { getCart, getOrderId, setOrderId, getCheckoutButton, setCheckoutButton } from 'src/app/localStorage';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class ProductComponent implements OnInit {

  @Input() product: any;
  @Input() price: any ='';
  @Input() token: any;
  @Input() stock: any;
  @Output() updateCart = new EventEmitter<any>();
  @Input() ord: string = '';
  checkout: string = 'https://checkout.tipiknapa.pl/';
  // isCheckoutEnabled: boolean = true;
  cartIcon = faCartPlus;

  constructor(private ecomm: EcommerceService) { }

  ngOnInit() {
    if(getOrderId() !== undefined){
      this.ord = getOrderId();
    }
    console.log(this.stock);
    // console.log(getCheckoutButton())
    // console.log('pobieram daną o Checkout Button z localStorage');
    //   var isTrueSet = (getCheckoutButton() === 'true');
    //   this.isCheckoutEnabled = isTrueSet;
    //   console.log(this.isCheckoutEnabled);
  }

  createOrder(){
    if(!this.ord){
      this.ecomm.createEmptyOrder(this.token.access_token).subscribe(o => {
        this.ord = o.data.id;
        setOrderId(this.ord);
        this.ecomm.addLineItems(this.token.access_token, this.ord, this.product.sku, this.product.title, this.product.images[0]).subscribe(r => {
          this.ecomm.getCart(this.token.access_token, this.ord).subscribe(c => {
            this.updateCart.emit({cart: c, ord: this.ord});
            // this.isCheckoutEnabled = true;
            // setCheckoutButton(this.isCheckoutEnabled.toString());
          });
        });
      });
    }
    if(this.ord){
      this.ecomm.addLineItems(this.token.access_token, this.ord, this.product.sku, this.product.title, this.product.images[0]).subscribe(r => {
        this.ecomm.getCart(this.token.access_token, this.ord).subscribe(c => {
          this.updateCart.emit({cart: c, ord: this.ord});
        });
      });

    }
  }
  productPrice(){
    return this.price;
  }
}

