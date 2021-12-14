import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainComponent implements OnInit {

  title = 'tipiKnapa by Kuba Knap';
  description: MetaDefinition = {name: 'description', content: 'Sklep Kuby Knapa - nóż R1 i więcej produktów już wkrótce'};

  constructor(private titleService: Title, private metaService: Meta){}

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaService.updateTag(this.description);
  }

}
