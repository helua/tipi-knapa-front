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
export function setOrderId(orderId: any){
  localStorage.setItem('orderId', orderId);
}
export function getOrderId(): any {
  return localStorage.getItem('orderId');
}

export function clear() {
  return localStorage.clear();
}
