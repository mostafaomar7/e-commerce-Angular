import { Routes } from '@angular/router';
import { Notfound } from './notfound/notfound';
import { Products } from './products/products';
import { Home } from './home/home';
import { ProductDetails } from './product-details/product-details';
import { Cart } from './cart/cart';
import { Login } from './login/login';
import { Register } from './register/register';

export const routes: Routes = [
  { path: '', component: Home },
  {path: 'product/:id', component: ProductDetails},
  {path: 'cart' , component: Cart},
  {path: 'login' , component: Login},
  {path: 'register' , component: Register},
  { path: '**', component: Notfound },
];
