// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';
// import { provideHttpClient } from '@angular/common/http';
// import { provideRouter } from '@angular/router';
// import { importProvidersFrom } from '@angular/core';
// import { LoginComponent } from './app/component/login/login.component';
// import { UserComponent } from './app/component/user/user.component';
// import { routes } from './app/app.routes';

// // bootstrapApplication(AppComponent, {
// //   providers: [provideHttpClient()] // Add this
// // }).catch(err => console.error(err));

// // Bootstrap the application with routing
// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(),
//     provideRouter(routes),  // Add the routing configuration
//     importProvidersFrom(LoginComponent, UserComponent),  // Import your components
//   ]
// }).catch(err => console.error(err));

// main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { appConfig } from './app/app.config';  // Import your configuration
import { routes } from './app/app.routes'; // Import your routes
import { AppComponent } from './app/app.component';  // Your main app component

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(),
//     provideRouter(routes),  // Configure the router
//     ...appConfig.providers  // Apply the appConfig providers correctly
//   ]
// }).catch(err => console.error(err));


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),  // Provide the router with the routes
  ],
}).catch(err => console.error(err));