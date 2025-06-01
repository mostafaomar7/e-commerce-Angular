import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalprice'
})
export class TotalpricePipe implements PipeTransform {

  transform(cartItems: any[]): number {
    if (!cartItems || cartItems.length === 0) return 0;
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

}
