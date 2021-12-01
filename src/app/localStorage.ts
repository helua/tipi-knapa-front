import { isString } from "util";
//TOKEN
export function setToken(token: any){
  const jsonData = JSON.stringify(token.data);
  localStorage.setItem('token', jsonData);
}
export function getToken(): any {
  return localStorage.getItem('token');
}

//CART
export function setCart(cart: any){
  const jsonData = JSON.stringify(cart);
  localStorage.setItem('cart', jsonData);
}
export function getCart(): any {
  return localStorage.getItem('cart');
}
//ORDER ID
export function setOrderId(orderId: string){
  localStorage.setItem('orderId', orderId);
}
export function getOrderId(): any {
  return localStorage.getItem('orderId');
}
//CHECKOUT BUTTON
export function setCheckoutButton(isEnabled: string){
  localStorage.setItem('isEnabled', isEnabled);
}
export function getCheckoutButton(): any {
  return localStorage.getItem('isEnabled');
}
//SHIPMENT
export function setShipment(shipment: string){
  const jsonData = JSON.stringify(shipment);
  localStorage.setItem('shipment', jsonData);
}
export function getShipment(): any {
  return localStorage.getItem('shipment');
}

export function clear() {
  return localStorage.clear();
}
