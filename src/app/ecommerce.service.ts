import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EcommerceService {

  url: string = 'https://tipi-knapa-shop.commercelayer.io'
  checkoutUrl: string = 'https://tipi-knapa-checkout.netlify.app/';
  orderCreated: string = '';

  constructor(private http: HttpClient ) { }

  getPrices(token: string){

    return  this.http.get<any>(this.url+'/api/skus?include=prices', {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': 'Bearer '+token
      },
    });
  }
  createEmptyOrder(token: string){
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
              "language_code": "pl"
            }
          }
        },
      headers);
  }
  addLineItems(token: string, orderId: string, sku: string, name: string, img: string){
    const headersData = {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': 'Bearer '+token,
    }
    const headers = { headers: new HttpHeaders(headersData)};
    return this.http.post<any>(this.url+'/api/line_items', {
      "data": {
        "type": "line_items",
        "attributes": {
          "quantity": 1,
          "_update_quantity": true,
          "sku_code": sku,
          "name": name,
          "image_url": img
        },
        "relationships": {
          "order": {
            "data": {
              "type": "orders",
              "id": orderId
            },
            "market": {
              "type": "market",
              "id": "vlGRmhnpNg"
              }
          }
        }
      }
    },headers);
  }
  getCart(token: string, orderId: string){
    const headersData = {
      'Accept': 'application/vnd.api+json',
      'Authorization': 'Bearer '+token,
    }
    const headers = { headers: new HttpHeaders(headersData)};

    return this.http.get<any>(this.url+'/api/orders/'+orderId+'?include=line_items&fields[orders]=number,skus_count,formatted_subtotal_amount,formatted_discount_amount,formatted_shipping_amount,formatted_total_tax_amount,formatted_gift_card_amount,formatted_total_amount_with_taxes,line_items&fields[line_items]=item_type,image_url,name,sku_code,formatted_unit_amount,quantity,formatted_total_amount',
      headers);
  }
  goToCheckout(id: string){
    return this.http.get(this.checkoutUrl+id);
  }
}
