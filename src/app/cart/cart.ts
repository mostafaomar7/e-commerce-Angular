import { Component, OnInit } from '@angular/core';
import { Cartservice } from '../service/cartservice';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TotalpricePipe } from '../totalprice-pipe';

@Component({
  selector: 'app-cart',
  imports: [CommonModule , RouterLink , TotalpricePipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  constructor(private cartserv:Cartservice) {}

  cartItems : Product[] =[];
  ngOnInit(): void {
    this.cartItems = this.cartserv.getcart()
    console.log(this.cartItems);
  }
  removefromcart(id:number) {
    this.cartserv.removefromcart(id);
    this.cartItems = this.cartserv.getcart();
    console.log(`Product with id ${id} removed from cart.`);
  }

  clearcarts(){
    this.cartserv.clearcart();
    this.cartItems = [];
    console.log("Cart cleared");
  }
  // getTotalPrice(): number {
  //   return this.cartserv.gettotalprice();
  // }
}
