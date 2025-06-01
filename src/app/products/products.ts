import { Component, OnInit } from '@angular/core';
import { Api } from '../service/api';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Cartservice } from '../service/cartservice';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  constructor(private serv : Api , private cartserv : Cartservice , private sanitizer: DomSanitizer , private router :Router) {}

  products: Product [] = [];
   getStars(rate: number): SafeHtml {
    const fullStar = `<i class="fas fa-star"></i>`;
    const halfStar = `<i class="fas fa-star-half-alt"></i>`;
    const emptyStar = `<i class="far fa-star"></i>`;

    const fullStarsCount = Math.floor(rate);
    const hasHalfStar = rate - fullStarsCount >= 0.5;
    const emptyStarsCount = 5 - fullStarsCount - (hasHalfStar ? 1 : 0);

    const starsHtml = fullStar.repeat(fullStarsCount) +
                      (hasHalfStar ? halfStar : '') +
                      emptyStar.repeat(emptyStarsCount);

    return this.sanitizer.bypassSecurityTrustHtml(starsHtml);
  }

  getProductDetails(id: number) {
    this.router.navigate(['/product', id]);
  }

  addedToCartId: number | null = null;

  addToCart(product: Product) {
    this.cartserv.addtocart(product);
    this.addedToCartId = product.id;
    setTimeout(() => {
      this.addedToCartId = null;
    }, 4000); 
  }
   limitWords(text: string, wordLimit: number): string {
  let words = text.split(' ');
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(' ') + '...'
    : text;
}

   isLoading: boolean = true;
  ngOnInit() {
    this.serv.get<Product[]>().subscribe((data) => {
      this.products = data;
      this.isLoading = false;
    });
  }
}
