import { Component, OnInit } from '@angular/core';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-cennik',
  templateUrl: './cennik.component.html',
  styleUrls: ['./cennik.component.scss']
})
export class CennikComponent implements OnInit {


  title = 'Cennik | INOMHUS Skate School';
  keywords: MetaDefinition = {name: 'keywords', content: 'jakieś keywords'};
  description: MetaDefinition = {name: 'description', content: 'jakiś opis'};

  constructor(private titleService: Title, private metaService: Meta){}

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaService.updateTag(this.keywords);
    this.metaService.updateTag(this.description);
  }

}
