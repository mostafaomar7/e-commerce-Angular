import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Cartservice } from '../service/cartservice';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink , RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  constructor(private cartserv : Cartservice){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  getcartcount(): number {
    return this.cartserv.getcart().length;
  }
}
