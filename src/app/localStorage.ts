export function setToken(token: any){
  const jsonData = JSON.stringify(token.data);
  localStorage.setItem('token', jsonData);
}

export function getToken(): any {
  return localStorage.getItem('token');
}
export function clear() {
  return localStorage.clear();
}
