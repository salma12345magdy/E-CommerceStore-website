import { Component } from '@angular/core';
import { CartService } from '../cartService/cart.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent   {
  cartItems: any[] = [];

  constructor(private cartService: CartService, private router: Router) {
    
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

 
  openCart() {
    this.cartService.toggleCart();
  }

toggleSignIn() {
  this.router.navigate(['/sign-in']);
}



}
