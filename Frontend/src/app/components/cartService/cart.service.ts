import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private cartItemsSource = new BehaviorSubject<any[]>([]); 
  cartItems$ = this.cartItemsSource.asObservable(); 

  private cartVisibleSource = new BehaviorSubject<boolean>(false);
  cartVisible$ = this.cartVisibleSource.asObservable();

  constructor() {}

  isUserLoggedIn (): boolean{
    const token = sessionStorage.getItem('auth_token');
    return !!token;
  }

  addToCart(item: any) {
    const currentItems = this.cartItemsSource.value;
    const existingItemIndex = currentItems.findIndex(product => product.productId === item.productId);

    if (existingItemIndex > -1) {
      currentItems[existingItemIndex].quantity += item.quantity;
    } else {
      currentItems.push(item);
    }

    this.cartItemsSource.next([...currentItems]); 
  }


  removeItemFromCart(productId: string) {
    const currentItems = this.cartItemsSource.value;
    const updatedItems = currentItems.filter(item => item.productId !== productId);  
    this.cartItemsSource.next(updatedItems);  
  }

  
  toggleCart() {
    this.cartVisibleSource.next(!this.cartVisibleSource.value); 
  }
}
