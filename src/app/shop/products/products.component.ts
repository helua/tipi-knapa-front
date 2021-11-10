import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/token.service';
import { FeedService } from 'src/app/feed.service';
import { Product } from '../Product'
import { EcommerceService } from 'src/app/ecommerce.service';
// import CommerceLayer from '@commercelayer/sdk'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products!: Observable<Product[]>;
  price: any ='';
  constructor(private feed: FeedService, private token: TokenService, private ecomm: EcommerceService) { }

  ngOnInit(): void {
    this.products = this.feed.getProducts();
    this.token.getToken().then((t) =>{
      if(t){
        this.ecomm.getPrices(t.accessToken).subscribe(p => {
          console.log(p);
          if(p){
            this.price = p.included[0].attributes.formatted_amount;
            console.log(this.price);
          }
        });
      }
    });
  }
}
