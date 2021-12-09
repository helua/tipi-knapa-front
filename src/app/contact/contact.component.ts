import { Component, OnInit } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { faCopyright, faCode, faImages } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  title = 'tipiKnapa | Kontakt';
  description: MetaDefinition = {name: 'description', content: 'Masz pytania dotyczące sklepu Tipiknapa? A może potrzebujesz dopytać się o szczegóły konkretnego produktu? Podbijaj do nas, coś na pewno zaradzimy.'};

  copyIcon = faCopyright;
  codeIcon = faCode;
  imagesIcon = faImages;
  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {
    //SEO
    this.titleService.setTitle(this.title);
    this.metaService.updateTag(this.description);
  }

}
