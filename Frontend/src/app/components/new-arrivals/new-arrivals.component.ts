import { Component } from '@angular/core';
import { ProductService } from '../productService/product.service';
import { CartService } from '../cartService/cart.service'; 
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrl: './new-arrivals.component.css'
})
export class NewArrivalsComponent  {
  categories = [
    { key: 'men_fashion', label: "Men's Fashion" },
    { key: 'women_fashion', label: "Women's Fashion" },
    { key: 'men_accessories', label: "Men's Accessories" },
    { key: 'women_accessories', label: "Women's Accessories" }
  ];

  activeCategory: string = '';  
  products: any[] = []; 
  loading: boolean = false;
  productsLimit: number = 10;  
  allProducts: any[] = []; 
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.activeCategory = params['category'] || 'men_fashion';
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProductsByCategory(this.activeCategory).subscribe(products => {
      this.allProducts = products;  // تخزين جميع المنتجات
      this.products = this.allProducts.slice(0, this.productsLimit); // عرض أول 10 منتجات فقط
      this.loading = false;
    }, error => {
      console.error('Error loading products:', error);
      this.loading = false;
    });
  }

  selectCategory(categoryKey: string): void {
    this.activeCategory = categoryKey;
    this.router.navigate(['/new-arrivals'], { queryParams: { category: categoryKey } });
    this.loadProducts();
  }

  viewDetails(product: any): void {
    const returnUrl = this.router.url;
    this.router.navigate(['/product-details', product.id], {
      queryParams: { returnUrl: returnUrl, category: this.activeCategory }
    });
  }

  addToCart(product: any): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.cartService.addToCart(product);
      console.log('Product added to cart:', product);
    } else {
      alert('Please log in to add items to your cart!');
      this.router.navigate(['/login']);
    }
  }

  viewMore(): void {
    if (this.productsLimit < this.allProducts.length) {
      this.productsLimit += 10;  // زيادة عدد المنتجات المعروضة بـ 10
      this.products = this.allProducts.slice(0, this.productsLimit);  // عرض المنتجات الجديدة
    }
  }
}
