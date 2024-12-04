import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; 
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { NewArrivalsComponent } from './components/new-arrivals/new-arrivals.component';
import { ProductService } from './components/productService/product.service'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './components/interceptors/auth.interceptor';
import { CartComponent } from './components/cart/cart.component'; 
import { Router, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './components/authService/auth.service';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ContactService } from './components/contactService/contact.service';
import { DashboardComponent } from './components/adminDashboard/dashboard.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ViewMessagesComponent } from './components/view-messages/view-messages.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    NewArrivalsComponent,
    CartComponent,
    RegisterComponent,
    LoginComponent,
    ProductDetailsComponent,
    ContactUsComponent,
    DashboardComponent,
    AdminLoginComponent,
    ManageProductsComponent,
    ViewMessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductService, // إضافة ProductService
    AuthService, // إضافة AuthService
    ContactService, // إضافة ContactUsService
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, // إضافة AuthInterceptor
      multi: true // يسمح باستخدام أكثر من interceptor
    },
    {
      provide: JWT_OPTIONS,
      useValue: { 
        // إعدادات JWT_OPTIONS حسب الحاجة
        tokenGetter: () => sessionStorage.getItem('auth_token'),
        headerName: 'Authorization',
        allowedDomains: ['localhost:3000'],
        disallowedRoutes: ['localhost:3000/admin/login']
      }
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
