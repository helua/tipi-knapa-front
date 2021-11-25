import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartData } from '../Product';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  closeIcon = faTimes;
  trashIcon = faTrashAlt;
  @Input() cart: any;
  @Input() ord: any;
  checkout: string = 'https://tipi-knapa-checkout.netlify.app/';


  constructor(
    public dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CartData,
    private _snackBar: MatSnackBar,
    public router: Router) {}

  ngOnInit(): void {
    this.cart = this.data.cart;
    this.ord = this.data.ord;
  }
  onClose(): void {
    this.dialogRef.close();
  }
  trashSnackBar(){
    this.onClose();
    this.openSnackBar('Wystarczy, że wyjdziesz, posprzątamy tu za Ciebie', 'Poznaj genezę noża')
  }
  openSnackBar(message: string, action: string) {
    let ref = this._snackBar.open(message, action, {
      horizontalPosition: "center",
      verticalPosition: "top",
    });
    ref.onAction().subscribe(() => {
      this.router.navigate(['o-nas']);
    });
  }

}
