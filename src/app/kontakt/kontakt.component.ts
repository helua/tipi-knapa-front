import { Component, OnInit } from '@angular/core';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-kontakt',
  templateUrl: './kontakt.component.html',
  styleUrls: ['./kontakt.component.scss']
})
export class KontaktComponent implements OnInit {

  title = 'Konktakt | INOMHUS Skate School';
  keywords: MetaDefinition = {name: 'keywords', content: 'jakieś keywords'};
  description: MetaDefinition = {name: 'description', content: 'jakiś opis'};

  constructor(private titleService: Title, private metaService: Meta){}

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaService.updateTag(this.keywords);
    this.metaService.updateTag(this.description);
  }
}
