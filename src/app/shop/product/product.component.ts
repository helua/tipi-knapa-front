import { Component, Input, OnInit } from '@angular/core';
import { EcommerceService } from 'src/app/ecommerce.service';
import { TokenService } from 'src/app/token.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: any;
  @Input() priceList: any = '';
  ord: string = '';
  checkout: string = 'https://tipi-knapa-checkout.netlify.app/';
  id: string = 'WQrOSKmemz';
  @Input() price: any ='';

  constructor(private ecomm: EcommerceService, private token: TokenService) { }

  ngOnInit(): void {
    this.product.price;
  }

  createOrder(){
    this.token.getToken().then((t) => {
        this.ecomm.createEmptyOrder(t.accessToken).subscribe(o => {
          console.log(o);
          this.ord = o.data.id;
          this.ecomm.addProductAndPostOrder(t.accessToken, o.data.id, this.product.sku).subscribe(r => {
            console.log(r);
          });
        });
      console.log('trigger order');

    });
  }

  productPrice(){
    return this.price;
  }
}

