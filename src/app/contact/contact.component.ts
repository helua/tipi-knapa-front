import { Component, OnInit } from '@angular/core';
import { faCopyright, faCode, faImages } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  copyIcon = faCopyright;
  codeIcon = faCode;
  imagesIcon = faImages;
  constructor() { }

  ngOnInit(): void {
  }

}
