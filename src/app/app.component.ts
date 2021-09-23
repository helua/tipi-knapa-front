import { Component } from '@angular/core';
import { faFacebookF, faInstagram, faVimeoV } from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'INOMHUS-SKATESCHOOL';
  vimeoIcon = faVimeoV;
  instagramIcon = faInstagram;
  facebookIcon = faFacebookF;
  menuIcon = faBars;

}
