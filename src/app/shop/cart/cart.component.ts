import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartData } from '../Product';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EcommerceService } from 'src/app/ecommerce.service';
import { getCart, getToken, setCart, setOrderId } from 'src/app/localStorage';

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
  @Input() token: any;
  checkout: string = 'https://tipi-knapa-checkout.netlify.app/';


  constructor(
    public dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CartData,
    private _snackBar: MatSnackBar,
    public router: Router,
    private ecomm: EcommerceService) {}

  ngOnInit(): void {
    this.cart = JSON.parse(getCart());
    this.ord = this.data.ord;
    // this.ord = JSON.parse(getOrderId());

    console.log('pobieram koszyk z localStorage');
    console.log(this.cart);
  }
  onClose(): void {

    this.dialogRef.close();
  }
  trashItem(id: string){
    this.token = JSON.parse(getToken());
    console.log('usuwam line item');
    console.log(id);
    this.ecomm.deleteLineItem(this.token.access_token, id).toPromise().then(result => {
      this.ecomm.getCart(this.token.access_token, this.data.ord).subscribe(o =>{
        console.log('koszyk po usunięciu');
        console.log(o);
        setCart(o);
        this.cart = JSON.parse(getCart());
        setOrderId('');
      });
    });
    // this.onClose();
    // this.openSnackBar('Koszyk jest pusty', 'Fajnie!');
  }
  openSnackBar(message: string, action: string) {
    let ref = this._snackBar.open(message, action, {
      horizontalPosition: "center",
      verticalPosition: "top",
    });
    ref.onAction().subscribe(() => {
      // this.router.navigate(['o-nas']);
    });
  }

}
