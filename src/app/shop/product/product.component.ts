import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EcommerceService } from 'src/app/ecommerce.service';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { getOrderId, setOrderId } from 'src/app/localStorage';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: any;
  @Input() price: any ='';
  @Input() token: any;
  @Input() stock: any;

  @Output() updateCart = new EventEmitter<any>();
  @Input() ord: string = '';
  cartIcon = faCartPlus;

  constructor(private ecomm: EcommerceService) { }

  ngOnInit() {
    if(getOrderId() !== undefined){
      this.ord = getOrderId();
    }
  }

  createOrder(){
    if(!this.ord){
      this.ecomm.createEmptyOrder(this.token.access_token).subscribe(o => {
        this.ord = o.data.id;
        setOrderId(this.ord);
        this.ecomm.addLineItems(this.token.access_token, this.ord, this.product.sku, this.product.title, this.product.images[0]).subscribe(r => {
        });
        this.ecomm.getCart(this.token.access_token, this.ord).subscribe(c => {
          this.updateCart.emit({cart: c, ord: this.ord});
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
  // getCurrentOrder(){
  //   this.ecomm.getCart(this.token.access_token, this.ord).subscribe(c => {
  //     console.log(c);
  //     console.log(getCart())
  //   });
  // }

  productPrice(){
    return this.price;
  }
}

