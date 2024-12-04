import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { NewArrivalsComponent } from './components/new-arrivals/new-arrivals.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { LoginComponent } from './components/login/login.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DashboardComponent } from './components/adminDashboard/dashboard.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { adminAuthGuard } from './components/guard/admin-auth.guard';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ViewMessagesComponent } from './components/view-messages/view-messages.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'new-arrivals', component: NewArrivalsComponent },
  { path: 'new-arrivals/:category', component: NewArrivalsComponent },
  { path: 'new-arrivals', component: NewArrivalsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-login/dashboard', component: DashboardComponent,canActivate: [adminAuthGuard]  },
  { path: 'admin-login/dashboard/mangeProducts', component: ManageProductsComponent },
  { path: 'admin-login/dashboard/viewMessages', component: ViewMessagesComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "**", redirectTo: '/home'} 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
