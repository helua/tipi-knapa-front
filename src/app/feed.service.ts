import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from './shop/Product';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor( private http: HttpClient ) {}

  // getProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>('/.netlify/functions/getProducts', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  // }
  getProducts(){
    return this.http.get(`https://hv4oxj7f.api.sanity.io/v2021-10-21/data/query/production?query=*[_type=="product"]{title, slug, defaultProductVariant, tags, "categoryTitles": categories[]->title,  "statusTitles": statuses[]->title, "vendor": vendor->title, body}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
