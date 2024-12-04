import { Component, OnInit } from '@angular/core';
import { ProductService } from '../productService/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.css'
})
export class ManageProductsComponent implements OnInit {
  products: any[] = [];  
  errorMessage: string ='';
  selectedProduct: any ={};
  newProduct = { name: '', description: '', category: '', price: 0, images: '' }; 

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts(); 
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((products: any[]) => {
      this.products = products; 
    });
  }

  addProduct(): void {
    this.productService.addProduct(this.newProduct).subscribe(() => {
      this.loadProducts(); 
      this.newProduct = { name: '', description: '', category: '', price: 0, images: '' }; 
    });
  }
   editProduct(product:any):void {
    this.selectedProduct = {...product};
    this.newProduct={...product};
   }

   
  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.loadProducts(); 
    });
  }



getImagesArray(images: string | string[]): string[] {
  if (typeof images === 'string') {
    return images.split(','); 
  } else if (Array.isArray(images)) {
    return images; 
  }
  return [];
  }

}
