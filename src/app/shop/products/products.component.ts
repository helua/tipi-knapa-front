import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
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
  // cl = CommerceLayer({
  //   organization: 'your-organization-slug',
  //   accessToken: 'your-access-token'
  // })

  products!: Observable<Product[]>;
  productList: any;
  productsdummy: Product[] = [
    {
      title: 'Nóż Tipi Knapa',
      images: ['../../../assets/noz.bmp'],
      slug: 'noz-tipi-knapa',
      sku: 'sfdgfjs433t',
      price: 784
    }
  ];
  // t: any;
  // tok: string = 'eyJhbGciOiJIUzUxMiJ9.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJXblpQb0ZyRUx5Iiwic2x1ZyI6InRpcGkta25hcGEifSwiYXBwbGljYXRpb24iOnsiaWQiOiJSTnpyRGlkcmdOIiwia2luZCI6InNhbGVzX2NoYW5uZWwiLCJwdWJsaWMiOnRydWV9LCJ0ZXN0Ijp0cnVlLCJleHAiOjE2MzQzMDQ3MzcsIm1hcmtldCI6eyJpZCI6WyJCanhySmhleHFsIl0sInByaWNlX2xpc3RfaWQiOiJlQnhkRUNSWHFCIiwic3RvY2tfbG9jYXRpb25faWRzIjpbIkRHekFvdWxwUW4iLCJva2RZenVvWWRNIl0sImdlb2NvZGVyX2lkIjpudWxsLCJhbGxvd3NfZXh0ZXJuYWxfcHJpY2VzIjpmYWxzZX0sInJhbmQiOjAuMTY2NjM5MTg2MjM4OTI5NH0.kl3XmccudDJ9CWoeUlJ9dgCcd3IXMzBa8urjmqd_715_iKoit7TM4A0GnTRmUr2i1PvpeLot3-JmZlX-8-jtdg';
  // priceList: any = {included: {
  //   [{attributes: {
  //     formatted_price: '1$'
  //     }
  //   }]
  // }};
  price: any;

  constructor(private feed: FeedService, private token: TokenService, private ecomm: EcommerceService) { }

  ngOnInit(): void {
    this.products = this.feed.getProducts();
    this.products.subscribe(pr => {
      this.productList = pr;
      console.log(this.productList)
    })
    this.token.getToken().then(t => {

      // this.ecomm.getPrices(t.accessToken).subscribe(p => {
      //   this.price = p.included[0].attributes.formatted_amount;
      //   console.log(this.price);
      // });
    });
  }
}
