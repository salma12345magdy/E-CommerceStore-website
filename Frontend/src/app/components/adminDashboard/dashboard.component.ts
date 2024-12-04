import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authService/auth.service';
import { ProductService } from '../productService/product.service';
import { Router } from '@angular/router';
import { ContactService } from '../contactService/contact.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  implements OnInit {
  user: any;
  products: any[] = []; 
  messages: any[] = []; 

  constructor(
    private authService: AuthService,
    private router: Router,
    private productService: ProductService,
    private contactService: ContactService 
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/admin-login']);
      return; 
    }

    this.loadProducts(); 
    this.loadMessages(); 
    this.user = this.authService.getUserDetails(); 
  }

  manageProducts(): void {
    this.router.navigate(['admin-login/dashboard/mangeProducts']); 
  }

  viewMessages(): void {
    this.router.navigate(['admin-login/dashboard/viewMessages']); 
  }

  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/admin-login']); 
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (products: any[]) => {
        this.products = products; 
      },
      (error) => {
        console.error('Error loading products:', error); 
      }
    );
  }
  loadMessages(): void {
    this.contactService.getMessages().subscribe(
      (messages: any[]) => {
        this.messages = messages; 
      },
      (error) => {
        console.error('Error loading messages:', error); 
      }
    );
  }

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.loadProducts(); 
    });
  }

  addProduct(productData: any): void {
    this.productService.addProduct(productData).subscribe(() => {
      this.loadProducts(); 
    });
  }

  editProduct(product: any): void {
    this.router.navigate([`admin-login/dashboard/edit-product/${product._id}`]); 
  }
}

  
