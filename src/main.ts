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
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { appConfig } from './app/app.config';  // Import your configuration
import { routes } from './app/app.routes'; // Import your routes
import { AppComponent } from './app/app.component';  // Your main app component
import { authInterceptor } from './app/interceptors/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(),
//     provideRouter(routes),  // Configure the router
//     ...appConfig.providers  // Apply the appConfig providers correctly
//   ]
// }).catch(err => console.error(err));


// ✅ Register all Community features for Ag-Grid
ModuleRegistry.registerModules([AllCommunityModule]);

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),  // Provide the router with the routes
    provideHttpClient(withInterceptors([authInterceptor])), // Register the interceptor
    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        positionClass: 'toast-top-right', // Toast position
        timeOut: 3000, // Auto close time (ms)
        preventDuplicates: true, // Avoid duplicate messages
      })
    ),
    
  ],
}).catch(err => console.error(err));