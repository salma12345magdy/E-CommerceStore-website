import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';  

  constructor(private http: HttpClient) {}


  searchProducts(searchTerm: string, category: string): Observable<any[]> {
    
    let url = `${this.apiUrl}/products?`;
  
    if (searchTerm) {
      url += `q=${searchTerm}&`; 
    }
  
    if (category) {
      url += `category=${category}`; 
    }
  
    return this.http.get<any[]>(url); 
  }



 getProductsByCategory(category: string): Observable<any> {
  const url = `${this.apiUrl}/category/${category}`; 
  console.log('Requesting URL:', url);

  return this.http.get<any[]>(url).pipe(
    map(products =>
      products.map(product => ({
        ...product,  
        imageUrl: product.images && product.images.length > 0 ? product.images[0] : 'default.jpg' 
      }))
    )
  );
}

getProductById(productId: string): Observable<any> {
  const url = `${this.apiUrl}/${productId}`; 
  return this.http.get<any>(url);
}

// جلب جميع المنتجات
getProducts(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl);
}



addProduct(productData: any): Observable<any> {
  return this.http.post(this.apiUrl, productData);  
}

deleteProduct(productId: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${productId}`);  
}

updateProduct(productId: string, updatedData: any): Observable<any> {
  const url =` ${this.apiUrl}/${productId}`; 
  return this.http.put(url, updatedData); 
  }
}