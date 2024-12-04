import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../productService/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchText: string = ''; 
  filteredProducts: any[] = []; 
  products: any[] = [] ;

  constructor(private router: Router, private productService: ProductService) {} 



onSearch(): void {
  this.applyFilters();
}

applyFilters(): void {
  this.filteredProducts = this.products.filter((product) => {
    return product.name.toLowerCase().includes(this.searchText.toLowerCase());
  });
}


}
