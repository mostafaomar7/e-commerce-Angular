import { Component, OnInit } from '@angular/core';
import { Api } from '../service/api';
import { Product } from '../models/product.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Cartservice } from '../service/cartservice';
@Component({
  selector: 'app-product-details',
  imports: [CommonModule , RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {
  constructor(private serv: Api , private cartserv :Cartservice , private route : ActivatedRoute , private sanitizer: DomSanitizer) {}
  productid! :Number;
  product: Product | null = null;
  getStars(rate: number): SafeHtml {
    let fullStar = `<i class="fas fa-star"></i>`;
    let halfStar = `<i class="fas fa-star-half-alt"></i>`;
    let emptyStar = `<i class="far fa-star"></i>`;

    let fullStarsCount = Math.floor(rate);
    let hasHalfStar = rate - fullStarsCount >= 0.5;
    let emptyStarsCount = 5 - fullStarsCount - (hasHalfStar ? 1 : 0);

    let starsHtml = fullStar.repeat(fullStarsCount) +
                      (hasHalfStar ? halfStar : '') +
                      emptyStar.repeat(emptyStarsCount);

    return this.sanitizer.bypassSecurityTrustHtml(starsHtml);
  }

  addedToCartId: number | null = null;

  addToCart(product: Product) {
    this.cartserv.addtocart(product);
    this.addedToCartId = product.id;
    setTimeout(() => {
      this.addedToCartId = null;
    }, 4000); 
  }
    isLoading: boolean = true;
  ngOnInit(): void {

    this.productid = Number(this.route.snapshot.paramMap.get('id'));
    
   this.serv.get<Product[]>()
      .subscribe(products => {
        this.product = products.find(p => p.id === this.productid) || null;
        console.log(this.product);
        this.isLoading = false;
      });
  }
}
