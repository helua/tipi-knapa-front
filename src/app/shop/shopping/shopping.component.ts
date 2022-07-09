import { Component, Input, OnInit } from '@angular/core';
import { FeedService } from 'src/app/feed.service';
import { Product } from '../Product'
import { EcommerceService } from 'src/app/ecommerce.service';
import { MatDialog } from '@angular/material/dialog';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartComponent } from '../cart/cart.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getCart, getCheckoutButton, getOrderId, getToken, setCart, setCheckoutButton, setOrderId } from 'src/app/localStorage';

const sanityClient = require("@sanity/client");
const sanity = sanityClient({
  projectId: 'hv4oxj7f',
  dataset: 'production',
  apiVersion: '2021-10-21',
  useCdn: true,
});
@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  cartIcon = faShoppingCart;
  badgeHidden: boolean = true;

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
  stock: any = '';
  cart: any = '';
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
    this.cart = JSON.parse(getCart());
    this.ord = getOrderId();
        // console.log(getOrderId());
    var isTrueSet = (getCheckoutButton() === 'false');
    this.badgeHidden = isTrueSet;
    // console.log(getCheckoutButton());
    //Sanity
    this.feed.getProducts().subscribe( products => {
      this.productsRaw = products;
      //do poprawienia przy >1 produkcie
      this.products.push(this.workResult(this.productsRaw.result[0]));
    });
    //Commerce Layer
    this.token = JSON.parse(getToken());
    if(this.token){
      this.ecomm.getPrices(this.token.access_token).subscribe(p => {
        if(p){
          //do poprawienia przy >1 produkcie
          this.price = p.included[0].attributes.formatted_amount;
          // console.log(this.price);
        }
      });
      this.ecomm.getStock(this.token.access_token).subscribe(p => {
        if(p){
          //do poprawienia przy >1 produkcie
          this.stock = p.data[0].attributes.quantity;
          // console.log(this.stock);
        }
      });
    }
  }

  workResult(p: any): Product{
    const blocksToHtml = require("@sanity/block-content-to-html");
    const imageUrlBuilder = require("@sanity/image-url");
    const output: Product = {
      title: p.title,
      slug: p.slug.current,
      categories: p.categoryTitles,
      statuses: p.statusTitles,
      vendor: p.vendor,
      body: blocksToHtml({ blocks: p.body }),
      sku: p.defaultProductVariant.sku,
      weight: p.defaultProductVariant.grams,
      length: p.defaultProductVariant.length,
      bladeLength: p.defaultProductVariant.bladeLength,
      bladeWidth: p.defaultProductVariant.bladeWidth,
      steelThickness: p.defaultProductVariant.steelThickness,
      handle: p.defaultProductVariant.handle,
      blade: p.defaultProductVariant.blade,
      sheath: p.defaultProductVariant.sheath,
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
    this.ord = cart.ord;
    setOrderId(cart.ord);
    // console.log(getOrderId());
    this.cart = cart.cart;
    setCart(cart.cart);
    // console.log('dodano do koszyka');
    // console.log(getCart());
    setCheckoutButton(true.toString());
    this.openSnackBar('Dodano do koszyka', 'Zobacz koszyk');
    var isTrueSet = (getCheckoutButton() === 'false');
    this.badgeHidden = isTrueSet;
  }

  toggleBadgeVisibility() {
    if(this.badgeHidden = true){
      this.badgeHidden = !this.badgeHidden;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(CartComponent, {
      width: '466px',
      maxWidth: '97vw',
      data: { ord: this.ord },
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      this.cart = JSON.parse(getCart());
      this.ord = getOrderId();
      // console.log(this.ord);
    });
  }
  openSnackBar(message: string, action: string) {
    let ref = this._snackBar.open(message, action, {
      horizontalPosition: "center",
      verticalPosition: "top",
    });
    ref.onAction().subscribe(() => {
      this.openDialog();
    });
  }

}
