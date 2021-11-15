import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/token.service';
import { FeedService } from 'src/app/feed.service';
import { Product } from '../Product'
import { EcommerceService } from 'src/app/ecommerce.service';
import { MatDialog } from '@angular/material/dialog';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  cartIcon = faShoppingCart;
  hidden = true;



  products!: Observable<Product[]>;
  price: any ='';
  cart: any = {
    data: {
      attributes: {
        skus_count: 0,
      }
    }
  };
// cart = {
//   data: {
//     attributes: {
//       formatted_discount_amount: "0,00 zł",
//       formatted_gift_card_amount: "0,00 zł",
//       formatted_shipping_amount: "0,00 zł"   ​​​,
//       formatted_subtotal_amount: "1 000,00 zł"  , ​​​
//       formatted_total_amount_with_taxes: "1 000,00 zł" ,  ​​​
//       formatted_total_tax_amount: "0,00 zł"  ​​​,
//       number: 14963121  ,​​​
//       skus_count: 1,
//       image_url: "https://cdn.sanity.io/images/reekcfrj/production/1465e9a3aabe4b5240c64a2961a3b9d02623a1a8-3217x4021.jpg",
//       name: "Nóż typu finka Tipi Knapa"
//     }
//   }
// };
  constructor(private feed: FeedService, private token: TokenService, private ecomm: EcommerceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.products = this.feed.getProducts();
    this.token.getToken().then((t) =>{
      if(t){
        this.ecomm.getPrices(t.accessToken).subscribe(p => {
          if(p){
            this.price = p.included[0].attributes.formatted_amount;
            console.log(this.price);
          }
        });
      }
    });
  }
  onNewCart(cart: any){
    this.cart = cart;
    console.log(this.cart);
    this.toggleBadgeVisibility();
  }
  toggleBadgeVisibility() {
    if(this.hidden = true){
      this.hidden = !this.hidden;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(CartComponent, {
      width: '600px',
      data: {cart: this.cart},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
