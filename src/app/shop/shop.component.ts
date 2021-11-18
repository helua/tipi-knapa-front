import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  title = 'SKLEP | TIPI KNAPA';
  keywords: MetaDefinition = {name: 'keywords', content: 'jakieś keywords'};
  description: MetaDefinition = {name: 'description', content: 'jakiś opis'};

  constructor(private token: TokenService, private titleService: Title, private metaService: Meta) { }

  ngOnInit() {
    this.token.getToken();
    this.titleService.setTitle(this.title);
    this.metaService.updateTag(this.keywords);
    this.metaService.updateTag(this.description);
  }


}

