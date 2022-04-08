import { AfterViewInit, Component, Input, OnInit, HostListener } from '@angular/core';
import { Image } from 'src/app/shop/Product';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}
@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements AfterViewInit, OnInit{

  slideIndex: number = 1;
  @Input() slidesSet: Image[] = [];
  @Input() slidesId: string = '';
  slidesIdLocal: string = '';
  slides: any[] = [];

  constructor() {}

  ngOnInit(): void{
    this.createSlidesSet(this.slidesSet);
    this.slidesIdLocal = this.slidesId;
  }
   createSlidesSet(slides: Image[]){
    let newSlides = slides.map((slide, index) => ({
      source: slide,
      indexOf: index+1
    })
    )
    this.slides = newSlides;
  }

  ngAfterViewInit(): void {
    this.showSlides(this.slideIndex);
  }

  plusSlides(n: number): void {
    this.showSlides(this.slideIndex += n);
  }
  currentSlide(n: number): void {
    this.showSlides(this.slideIndex = n);
  }
  showSlides(n: number): void {
    let i;
    const slides = Array.from(document.getElementsByClassName(this.slidesId) as HTMLCollectionOf<HTMLElement>);
    const dots = Array.from(document.getElementsByClassName('dot') as HTMLCollectionOf<HTMLElement>);
    const dotsCurrent = Array.from(document.getElementsByClassName('dot-'+this.slidesId) as HTMLCollectionOf<HTMLElement>);
    if (n > slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    for (i = 0; i < dotsCurrent.length; i++) {
      dotsCurrent[i].className = dotsCurrent[i].className.replace(' active', '');
    }
    slides[this.slideIndex - 1].style.display = 'block';
    dotsCurrent[this.slideIndex - 1].className += ' active';
  }
  
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.plusSlides(1);
    }
    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.plusSlides(-1);
    }
  }

  //navigate on swipe right / left event
  onSwipe(evt: any) {
  const x = Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? 'right' : 'left'):'';
  // posible usage of up / down swipe event
  // const y = Math.abs(evt.deltaY) > 40 ? (evt.deltaY > 0 ? 'down' : 'up') : '';
  console.log(x);
  if(x === 'right'){
    this.plusSlides(-1);
  }
  if(x === 'left'){
    this.plusSlides(1);
  }
  }
}
