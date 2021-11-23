import { Injectable } from '@angular/core';
import { getSalesChannelToken } from '@commercelayer/js-auth';
import { EcommerceService } from './ecommerce.service';
import { getToken, setToken } from './localStorage';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  url: string = 'https://tipi-knapa-shop.commercelayer.io'
  clientID: string = 'N7V8FFNMG8ylXYju_6RrcH7qRostvS8MY8ahWlulJVE';
  scope: string ="market:7273";
  stock: string = "stock_location:6551";
  token: string = "";
  isTokenValid: boolean = false;
  constructor() { }

  async getToken(){

    const token = await getSalesChannelToken({
      clientId: this.clientID,
      endpoint: this.url,
      scope: this.scope,
    })
    if(token){
      console.log(token);
      setToken(token);
      this.isTokenValid = true;
    }
    // else return {accessToken: 'eyJhbGciOiJIUzUxMiJ9.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJZbnJRWUZES0tYIiwic2x1ZyI6InRpcGkta25hcGEtc2hvcCJ9LCJhcHBsaWNhdGlvbiI6eyJpZCI6ImRObldtaXd2WEciLCJraW5kIjoic2FsZXNfY2hhbm5lbCIsInB1YmxpYyI6dHJ1ZX0sInRlc3QiOnRydWUsImV4cCI6MTYzNjU3MTk2MCwibWFya2V0Ijp7ImlkIjpbInZsR1JtaG5wTmciXSwicHJpY2VfbGlzdF9pZCI6ImRsd1F5Q0pZZ0IiLCJzdG9ja19sb2NhdGlvbl9pZHMiOlsiTkdOUkV1V1ZSRyJdLCJnZW9jb2Rlcl9pZCI6bnVsbCwiYWxsb3dzX2V4dGVybmFsX3ByaWNlcyI6ZmFsc2V9LCJyYW5kIjowLjcyMjkwNjI2ODQyNTU1NDl9.SGqwwh2Op0xDQ-RPxEsVgzkMxJxgS5X3GZtaLo1cbAGqxUcqyeeyKTt0bb930nSuosbNXYX5EGXeN9_jCnl-KQ'};

  }
  checkIfTokenValid(): boolean{
    const tokObject = JSON.parse(getToken());
    console.log(tokObject);
    if(tokObject === null){
      return false;
    }
    let currentDate = Math.round(new Date().getTime() / 1000);

    console.log(currentDate);
    const tokenValidTimeRemaing = tokObject.created_at - currentDate + tokObject.expires_in;
    console.log(tokenValidTimeRemaing);
    if(tokenValidTimeRemaing > 0){
      return true;
    }
    else{
      return false;
    }

  }

}
