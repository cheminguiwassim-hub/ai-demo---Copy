import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';   // path to your routes file
bootstrapApplication(App, {
  providers: [provideHttpClient(),provideRouter(routes)] // <-- this provides HttpClient globally
}).catch((err) => console.error(err));
