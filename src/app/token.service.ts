import { Injectable } from '@angular/core';
import { getSalesChannelToken } from '@commercelayer/js-auth';
import { EcommerceService } from './ecommerce.service';
import { clear, getToken, setToken } from './localStorage';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  url: string = 'https://tipi-knapa-shop.commercelayer.io'
  clientID: string = 'N7V8FFNMG8ylXYju_6RrcH7qRostvS8MY8ahWlulJVE';
  scope: string ="market:7273";
  stock: string = "stock_location:6551";
  token: string = "";
  constructor() { }

  async getToken(){
    if(this.checkIfTokenValid() === false){
      const tokenAPI = await getSalesChannelToken({
        clientId: this.clientID,
        endpoint: this.url,
        scope: this.scope,
      })
      if(tokenAPI){
        // console.log('nowy token utworzony');
        // console.log(tokenAPI);
        setToken(tokenAPI);
        // console.log('nowy token w localStorage');
        // console.log(getToken());
        return getToken();
      }

    }
    else{

      return getToken();
    }

  }
  checkIfTokenValid(): boolean{
    const tokObject = JSON.parse(getToken());
    // console.log('token zastały');
    // console.log(tokObject);
    if(tokObject === null){
      return false;
    }
    let currentDate = Math.round(new Date().getTime() / 1000);
    // console.log(currentDate);
    const tokenValidTimeRemaing =  tokObject.expires_in;
    // const tokenValidTimeRemaing =  tokObject.expires_in - ( currentDate - tokObject.created_at ) ;
    // console.log(tokenValidTimeRemaing);
    // console.log(currentDate - tokObject.created_at)
    if(tokenValidTimeRemaing > 0 && currentDate - tokObject.created_at < 14400){
      return true;
    }
    else{
      return false;
    }
  }

}
