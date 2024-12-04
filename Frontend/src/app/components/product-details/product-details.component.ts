import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../productService/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent  implements OnInit {
  product: any;
  selectedImage: string = '';
  returnUrl: string = '';
  category: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe((data: any) => {
        this.product = data;
        this.selectedImage = 'http://localhost:3000/images/' + this.product.images[0];
      });
    }

    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/';
      this.category = params['category'] || 'men_fashion';  
    });
  }

  changeImage(image: string): void {
    this.selectedImage = 'http://localhost:3000/images/' + image;
  }

  addToCart(product: any): void {
    console.log('Added to cart:', product);
  }

  closeProduct(): void {
    window.history.back(); 
  }
  
}
