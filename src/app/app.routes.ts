// import { Routes } from '@angular/router';
// import { UserComponent } from './component/user/user.component';
// import { LoginComponent } from './component/login/login.component';

// export const routes: Routes = [
//     { path: '', redirectTo: '/login', pathMatch: 'full' },  // Default route
//   { path: 'login', component: LoginComponent },
//   { path: 'signup', component: UserComponent },  // User component for sign-up
// ];


import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './component/user/user.component';
import { LoginComponent } from './component/login/login.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SignupComponent } from './component/signup/signup.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Default route
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] }, // Protected Route
  { path: 'user', component: UserComponent, canActivate: [authGuard] }, // Protected Route

];

export const AppRoutingModule = RouterModule.forRoot(routes); // Use forRoot with routes

