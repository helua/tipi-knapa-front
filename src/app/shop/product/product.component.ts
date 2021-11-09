import { Component, Input, OnInit } from '@angular/core';
import { EcommerceService } from 'src/app/ecommerce.service';
import { TokenService } from 'src/app/token.service';
import { Product } from '../Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {


  @Input() product: any;
  @Input() priceList: any = '';
  url: string = 'https://tipi-knapa.commercelayer.io'
  tok: string = 'eyJhbGciOiJIUzUxMiJ9.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJPWEttVkZHYWdSIiwic2x1ZyI6InRoZS10ZWFsLWJyYW5kLTE4MCJ9LCJhcHBsaWNhdGlvbiI6eyJpZCI6IllHeWFxaUJ2b0ciLCJraW5kIjoic2FsZXNfY2hhbm5lbCIsInB1YmxpYyI6dHJ1ZX0sInRlc3QiOnRydWUsImV4cCI6MTYzNTE5MzIxNCwibWFya2V0Ijp7ImlkIjpbInFvTGRCaEJKTW8iXSwicHJpY2VfbGlzdF9pZCI6ImVsYnd5Q0p5UkwiLCJzdG9ja19sb2NhdGlvbl9pZHMiOlsiZW5icVF1UmVBTSIsImJuRWVRdXpSdm4iXSwiZ2VvY29kZXJfaWQiOm51bGwsImFsbG93c19leHRlcm5hbF9wcmljZXMiOmZhbHNlfSwicmFuZCI6MC45NTUwNTc1NTc4MTgzMjg2fQ.wBGG82A36A8qJdf5qZD3dELXC-LO2nFp5rBmYSKq9-aYFc4i_FUtfgd3gKmFqixmVoUeXoQAdj8BVcm8q3CI4A';
  ord: string = '';
  id: string = 'WQrOSKmemz';
  @Input() price: any ='';

  constructor(private ecomm: EcommerceService, private token: TokenService) { }

  ngOnInit(): void {
    this.product.price;
  }

  createOrder(){
    this.token.getToken().then(t => {
      // this.ecomm.createEmptyOrder(t.accessToken).subscribe(o => {
      //   console.log(o);
      //   this.ord = o.data.id;
      //   this.ecomm.addProductAndPostOrder(t.accessToken, o.data.id, this.product.sku).subscribe(r => {
      //     console.log(r);
      //   });
      // });
    });
    console.log('trigger order');
  }
  productPrice(){
    return this.price;
  }



  }

