import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EcommerceService {

  url: string = 'https://the-teal-brand-180.commercelayer.io'
  checkoutUrl: string = 'https://tipi-knapa-checkout.netlify.app/';
  orderCreated: string = '';

  // async getAccess(token: string){
  //   var f = require('@commercelayer/sdk');
  //   var cl = new f({
  //     organization: 'the-teal-brand-180',
  //     accessToken: token
  //   });
  //   console.log(cl);

  //   const sku = await cl.skus.retrieve('WvAJSDdpeZ');
  //   console.log(sku);

  // }
  constructor(private http: HttpClient ) { }

  getPrices(token: string){

    return  this.http.get<any>(this.url+'/api/skus?filter[q][code_in]=HEJdjbsjhdvbsf87y8435&include=prices', {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': 'Bearer '+token
      },
    });
  }
  createEmptyOrder(token: string){
    console.log(token);
    const headersData = {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': 'Bearer '+token,
    }
    const headers = { headers: new HttpHeaders(headersData)};

    return this.http.post<any>(this.url+'/api/orders',{
        "data": {
            "type": "orders",
            "attributes": {
              "language_code": "en",
              "customer_email": "heliooooo@pelio.pl"
            }
          }
        },
      headers);
  }
  addProductAndPostOrder(token: string, orderId: string, sku: string){
    const headersData = {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': 'Bearer '+token,
    }
    const headers = { headers: new HttpHeaders(headersData)};
    console.log(token, orderId, sku);
    return this.http.post<any>(this.url+'/api/line_items', {
      "data": {
        "type": "line_items",
        "attributes": {
          "quantity": 1,
          "_update_quantity": true,
          "sku_code": sku,
          "name": " Nóż typu finka Tipi Knapa ",
          "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Red_rectangle.svg/1200px-Red_rectangle.svg.png",
        },
        "relationships": {
          "order": {
            "data": {
              "type": "orders",
              "id": orderId
            },
            "market": {
              "type": "market",
              "id": "XlBdyhYVej"
              }
          }
        }
        // "item": {
        //   "data": {
        //     "type": "skus",
        //     "id": productId
        //   }
        // }
      }
    },headers);
  }
  goToCheckout(id: string){
    return this.http.get(this.checkoutUrl+id);
  }
}
