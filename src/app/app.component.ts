import { Component } from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { getToken, clear } from '../app/localStorage'
import { TokenService } from './token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TIPI-KNAPA';
  norobots: MetaDefinition = {robots: 'description', content: 'noindex, nofollow, noimageindex'};

  constructor(private metaService: Meta, private token: TokenService){};

  ngOnInit(){
    this.metaService.updateTag(this.norobots);
    // clear();
    console.log(getToken())
    
    if(getToken() == null){
      this.token.getToken();
    }
  }
}
