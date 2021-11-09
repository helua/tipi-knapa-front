import { Injectable } from '@angular/core';
import { getSalesChannelToken } from '@commercelayer/js-auth';
import { EcommerceService } from './ecommerce.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  // const token = {
  //   accessToken: 'eyJhbGciOiJIUzUxMiJ9.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJPWEttVkZHYWdSIiwic2x1ZyI6InRoZS10ZWFsLWJyYW5kLTE4MCJ9LCJhcHBsaWNhdGlvbiI6eyJpZCI6IllHeWFxaUJ2b0ciLCJraW5kIjoic2FsZXNfY2hhbm5lbCIsInB1YmxpYyI6dHJ1ZX0sInRlc3QiOnRydWUsImV4cCI6MTYzNjQ5ODU3NiwibWFya2V0Ijp7ImlkIjpbIlhsQmR5aFlWZWoiXSwicHJpY2VfbGlzdF9pZCI6IllrWFFhQ3FFYmwiLCJzdG9ja19sb2NhdGlvbl9pZHMiOlsiYm5FZVF1elJ2biIsImVuYnFRdVJlQU0iXSwiZ2VvY29kZXJfaWQiOm51bGwsImFsbG93c19leHRlcm5hbF9wcmljZXMiOmZhbHNlfSwicmFuZCI6MC4yMjUxNDI0NTYxODcwMTE3fQ.2PwL2bEOK1mpbMCuOiPxfD5mar5RLzYEHaC8PUlYWPLviVPXgL0ogNsrKNY9tzaWpWLWvMLQzIuMygTqxOJXSA',
  //   expires: 'Date Tue Nov 09 2021 23:56:15 GMT+0100 (czas środkowoeuropejski standardowy)'}

  url: string = 'https://the-teal-brand-180.commercelayer.io'
  clientID: string = 'OAMcie37PMeilXSGUfsF0LY4Ry9nUi9Em2Yx-LzhcNU';
  scope: string ="market:6369";
  // scope: string ="market:6421";
  // url: string = 'https://tipi-knapa.commercelayer.io'
  // clientID: string = 'HnNc90yMw7y86SONLNFTDHhN8kThJRBi1BxY_fBrtbo';
  constructor(private ecomm: EcommerceService) { }

  async getToken(){

    const token = await getSalesChannelToken({
      clientId: this.clientID,
      endpoint: this.url,
      scope: this.scope
    })
    // const token = await getSalesChannelToken({
    //   clientId: 'N7V8FFNMG8ylXYju_6RrcH7qRostvS8MY8ahWlulJVE',
    //   endpoint: 'https://tipi-knapa-shop.commercelayer.io',
    //   scope: 'market:7273'
    // })

  // console.log('My access token: ', token.accessToken)
  // console.log('Expiration date: ', token.expires)
  return token
  }

}
