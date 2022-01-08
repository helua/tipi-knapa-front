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

  title = 'tipiKnapa | Sklep';
  description: MetaDefinition = {name: 'description', content: 'Sprawdź, jakie produkty mamy aktualnie w sklepie Tipiknapa i spraw sobie ręcznie wykonywany nóż finka. Wolność i odpowiedzialność w najlepszym wydaniu.'};
  token: any;

  constructor( private titleService: Title, private metaService: Meta, private tok: TokenService) { }

  ngOnInit() {

    this.token = this.tok.getToken();
    // console.log('Token pobrany = sklep otwarty')



    //SEO
    this.titleService.setTitle(this.title);
    this.metaService.updateTag(this.description);

    //STYLES MENU
    let logo = document.getElementById("tablet") as HTMLElement;
    logo.style.position = 'absolute';
    let navMain = Array.from(document.getElementsByClassName("nav-main") as HTMLCollectionOf<HTMLElement>);
    for (let i = 0; i < navMain.length; i++) {
      navMain[i].style.position = 'absolute';
    }
  }

  ngOnDestroy(){
    let logo = document.getElementById("tablet") as HTMLElement;
    logo.style.position = 'fixed';
    let navMain = Array.from(document.getElementsByClassName("nav-main") as HTMLCollectionOf<HTMLElement>);
    for (let i = 0; i < navMain.length; i++) {
      navMain[i].style.position = 'fixed';
    }
  }
}

