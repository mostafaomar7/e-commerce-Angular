import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Cartservice {
  private cartname = 'cart';
  private cartitems: any[] = [];

  constructor() {
    let storedCart = localStorage.getItem(this.cartname);
    if (storedCart) {
      this.cartitems = JSON.parse(storedCart);
    } 
   }
  getcart() {
    return [...this.cartitems]; 
  }
  
  setproduct(){
    localStorage.setItem(this.cartname, JSON.stringify(this.cartitems))
   }

   addtocart(product: any) {
  const existing = this.cartitems.find((item: any) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    this.cartitems.push({ ...product, quantity: 1 });
  }

  this.setproduct();
}
   removefromcart(id: number) {
    this.cartitems = this.cartitems.filter(item => item.id !== id);
    this.setproduct();
  }

  clearcart() {
    this.cartitems = [];
    localStorage.removeItem(this.cartname);
  }

  cartcount(){
    return this.cartitems.length;
  }
  // use pipe for bonus 
  // gettotalprice() {
  //   return this.cartitems.reduce((total, item) => total + (item.price * item.quantity), 0);
  // }
  
}
