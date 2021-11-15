import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartData } from '../Product';
import { faTimes } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  closeIcon = faTimes;
  @Input() cart: any;
  checkout: string = 'https://tipi-knapa-checkout.netlify.app/';


  constructor(public dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CartData,) {}

  onClose(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.cart = this.data.cart;
    console.log(this.cart);
    console.log(this.data.cart)
  }

}
