import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { getToken } from '../localStorage';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {

  title = 'SKLEP | TIPI KNAPA';
  keywords: MetaDefinition = {name: 'keywords', content: 'jakieś keywords'};
  description: MetaDefinition = {name: 'description', content: 'jakiś opis'};
  token: any;

  constructor( private titleService: Title, private metaService: Meta) { }

  ngOnInit() {
    this.token = JSON.parse(getToken());
    
    this.titleService.setTitle(this.title);
    this.metaService.updateTag(this.keywords);
    this.metaService.updateTag(this.description);

    let logo = document.getElementById("tablet") as HTMLElement;
    logo.style.position = 'absolute';

  }

  ngOnDestroy(){
    let logo = document.getElementById("tablet") as HTMLElement;

    logo.style.position = 'fixed';

  }


}

