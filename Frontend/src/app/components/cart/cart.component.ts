import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { CartService } from '../cartService/cart.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent    {
  cartItems: any[] = [];
  cartVisible: boolean = false;
  totalPrice: number = 0;

  constructor(private cartService: CartService, private router: Router) {

    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotalPrice();  
    });

    this.cartService.cartVisible$.subscribe(visible => {
      this.cartVisible = visible;
    });
  }

  addToCart(item: any) {
    const isLoggedIn = this.cartService.isUserLoggedIn();

    if (isLoggedIn) {
      this.cartService.addToCart(item); 
      alert('Item added to cart successfully!');
    } else {
      alert('You need to log in first!');
      this.router.navigate(['/login']); 
    }
  }


  closeCart() {
    this.cartService.toggleCart(); 
  }

  continueShopping() {
    this.cartVisible = false;
    this.router.navigate(['/new-arrivals']);  
  }

  removeFromCart(productId: string) {
    this.cartService.removeItemFromCart(productId); 
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
