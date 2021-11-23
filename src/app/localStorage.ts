import { isString } from "util";

export function setToken(token: any){
  const jsonData = JSON.stringify(token.data);
  localStorage.setItem('token', jsonData);
}

export function getToken(): any {
  // console.log(localStorage.getItem('token'))
  // const tokRaw = localStorage.getItem('token');
  // console.log(tokRaw);
  // // const tokObject = JSON.parse(tokRaw);
  return localStorage.getItem('token');
}
export function clear() {
  return localStorage.clear();
}
