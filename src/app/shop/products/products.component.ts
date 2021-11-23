import { Component, Input, OnInit } from '@angular/core';
import { FeedService } from 'src/app/feed.service';
import { Product } from '../Product'
import { EcommerceService } from 'src/app/ecommerce.service';
import { MatDialog } from '@angular/material/dialog';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartComponent } from '../cart/cart.component';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';



// const sanity = sanityClient({
//   projectId: process.env.SANITY_PROJECT_ID,
//   dataset: process.env.SANITY_DATASET,
//   useCdn: true,
// });

const sanityClient = require("@sanity/client");
const sanity = sanityClient({
  projectId: 'hv4oxj7f',
  dataset: 'production',
  apiVersion: '2021-10-21',
  useCdn: true,
});
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  cartIcon = faShoppingCart;
  badgeHidden = true;

  // products!: Observable<Product[]>;
  productsRaw: any = [];
  products: Product[] = [
    // {title: "",
    // slug: "",
    // categories: "",
    // vendor: "",
    // body: "",
    // // images: [{}],
    // sku: "",
    // weight: "",
    // length: "",
    // bladeLength: "",
    // bladeWidth: "",
    // steelThickness: ""}
  ];

  price: any ='';
  cart: any = {
    data: {
      attributes: {
        skus_count: 0,
      }
    }
  };
  ord: string = '';
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
  @Input() token: any;
  constructor(private feed: FeedService, private ecomm: EcommerceService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.feed.getProducts().subscribe( products => {
      this.productsRaw = products;
      console.log(products)
      this.products.push(this.workResult(this.productsRaw.result[0]));
    });

    if(this.token !== null){
      this.ecomm.getPrices(this.token.access_token).subscribe(p => {
        if(p){
          this.price = p.included[0].attributes.formatted_amount;
          console.log(this.price);
        }
      });
    }
    else{
      this.token = {"access_token":"eyJhbGciOiJIUzUxMiJ9.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJZbnJRWUZES0tYIiwic2x1ZyI6InRpcGkta25hcGEtc2hvcCJ9LCJhcHBsaWNhdGlvbiI6eyJpZCI6ImRObldtaXd2WEciLCJraW5kIjoic2FsZXNfY2hhbm5lbCIsInB1YmxpYyI6dHJ1ZX0sInRlc3QiOnRydWUsImV4cCI6MTYzNzYxOTM4NSwibWFya2V0Ijp7ImlkIjpbInZsR1JtaG5wTmciXSwicHJpY2VfbGlzdF9pZCI6ImRsd1F5Q0pZZ0IiLCJzdG9ja19sb2NhdGlvbl9pZHMiOlsiTkdOUkV1V1ZSRyJdLCJnZW9jb2Rlcl9pZCI6bnVsbCwiYWxsb3dzX2V4dGVybmFsX3ByaWNlcyI6ZmFsc2V9LCJyYW5kIjowLjU0NDcyOTY1MDgwODg2Nzh9.5Jpb8MOoqX_CQT8_zYdFXI4km1pgtreVozJUTe7q_KD1Z9xxZLE4kPf4cuP6RTZTliXRr2eeNRyU1bo83oWM2A","token_type":"Bearer","expires_in":14391,"scope":"market:7273","created_at":1637604985};
    }

  }
  workResult(p: any): Product{
    const blocksToHtml = require("@sanity/block-content-to-html");
    const imageUrlBuilder = require("@sanity/image-url");
    const output: Product = {
      title: p.title,
      slug: p.slug.current,
      categories: p.categoryTitles,
      vendor: p.vendor,
      body: blocksToHtml({ blocks: p.body }),
      sku: p.defaultProductVariant.sku,
      weight: p.defaultProductVariant.grams,
      length: p.defaultProductVariant.length,
      bladeLength: p.defaultProductVariant.bladeLength,
      bladeWidth: p.defaultProductVariant.bladeWidth,
      steelThickness: p.defaultProductVariant.steelThickness,
      images: []

    }
    for (let i = 0; i < p.defaultProductVariant.images.length; i++){

      const image =
      p.defaultProductVariant.images &&
      p.defaultProductVariant.images.length > 0
        ? p.defaultProductVariant.images[i].asset._ref
        : null;

      if (image) {
        output.images?.push(imageUrlBuilder(sanity).image(image).url())
      }
    }
    return output;
  }

//koszyk
  onUpdatedCart(cart: any){
    this.cart = cart.cart;
    this.ord = cart.ord;
    this.toggleBadgeVisibility();
    this.openSnackBar('Dodano do koszyka', 'Zobacz koszyk');
  }
  toggleBadgeVisibility() {
    if(this.badgeHidden = true){
      this.badgeHidden = !this.badgeHidden;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(CartComponent, {
      width: '600px',
      data: {cart: this.cart, ord: this.ord},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openSnackBar(message: string, action: string) {
    let ref = this._snackBar.open(message, action, {
      horizontalPosition: "right",
      verticalPosition: "top",
    });
    ref.onAction().subscribe(() => {
      this.openDialog();
    });
  }

}
