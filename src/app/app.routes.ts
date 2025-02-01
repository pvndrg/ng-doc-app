// import { Routes } from '@angular/router';
// import { UserComponent } from './component/user/user.component';
// import { LoginComponent } from './component/login/login.component';

// export const routes: Routes = [
//     { path: '', redirectTo: '/login', pathMatch: 'full' },  // Default route
//   { path: 'login', component: LoginComponent },
//   { path: 'signup', component: UserComponent },  // User component for sign-up
// ];


import { Routes } from '@angular/router';
import { UserComponent } from './component/user/user.component';
import { LoginComponent } from './component/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Default route
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: UserComponent },
];
