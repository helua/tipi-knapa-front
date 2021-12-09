import { Component, OnInit } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  title = 'tipiKnapa | O nas';
  logo = '../../assets/TIPI-KNAPA_logo-tringle.jpg'
  description: MetaDefinition = {name: 'description', content: 'Historia Tipiknapa zdecydowanie nie należy do tych klasycznych. Poznaj historię sklepu Knapa i wartości, za którymi stoimy tworząc kolejne produkty dla Ciebie.'};
  bigPhotoUrl: string = '../../assets/about/big/';
  smallPhotoUrl: string = '../../assets/about/small/';
  abouts: string[] = [
    'Podczas wojażu po Polsce z moim przyjacielem <mark style="text-decoration: underline">Łukaszem</mark> zatrzymaliśmy się na obiad u jego rodziców. Tak poznałem <i>Rycha</i>. Jakiś czas potem Łukasz zrobił w domu kilka noży z piły tarczowej, które przywiózł na Grochów razem z pewną historią. Otóż Rychu zaskoczony faktem, że da się taki nóż wykonać własnoręcznie (i to w domowych warunkach), zaczął sam bawić się w swoim warsztacie… a reszta to historia. Mniej więcej w tym samym czasie logo TipiKnapa wylądowało na okładce albumu „Knurion"- pierwszym z wielu albumów, do których okładki robiliśmy razem z Łukaszem. Od tamtego czasu planowałem wrzucić na rynek własny produkt. Minęły cztery lata zanim połączyłem te kropki.',
    'Telefon do Łukasza, telefon do Rycha i już byliśmy w drodze na pierwsze spotkanie. Na pokładzie dodatkowo <i>dwóch Bartków</i> - speców od obiektywów i internetów, żeby to wszystko elegancko dokumentować. Gościna u <i>Państwa Wasilewskich</i> tradycyjnie przemiła, warsztat profesjonalny, Rychu rzetelny w wykładaniu nam tajników swojego rzemiosła. Temat dogadany, projekt noża ustalony, termin następnego wypadu również.',
    'Kolejny przyjazd i mamy niespodziankę - wita nas <i>Miro Bojan</i>, autor projektu naszego noża. Słuchamy zatem jego opowieści o pasji do noży, która jest właściwie niesamowitą historią życia Mira. W międzyczasie ustalamy detale techniczne i wszystko co nam się przypomni. Jest z nami również <i>Konrad</i>, kumpel z Kaszub, który w międzyczasie zmajstrował nierdzewne pudełeczka. Wspólnymi siłami dochodzimy do ostatecznej wizji. Bartek zasuwa z aparatem jak poparzony, bo czas nagli. Jakiś czas później podczas spaceru z psami trafiłem przypadkiem na <i>Helio</i>, który zaoferował uporządkować wszystkie nasze pomysły i zbudować ten sklep, jak łeb.',
    'Tak wygląda, w dużym skrócie, historia tego noża. Cel przyświeca nam następujący - dać ludziom coś, co jest nie tylko trwałe i potrzebne, ale też piękne, wykonane ręcznie z pasją i prezentowane z dumą. Ja ze swojej strony świadczę o tym własnym nazwiskiem i dopisuję dwa słowa, pojęcia nierozłączne, które przychodzą mi na myśl jako pierwsze, kiedy myślę o takim nożu - wolność i odpowiedzialność.'
  ]

  constructor(private titleService: Title, private metaService: Meta){}

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaService.updateTag(this.description);
  }
}
