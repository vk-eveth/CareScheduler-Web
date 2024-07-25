import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { appConfig } from './app/app.config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const mergedProviders = [
  ...appConfig.providers,
  provideHttpClient(withFetch()),
  importProvidersFrom(HttpClientModule),
  importProvidersFrom(BrowserAnimationsModule),
  importProvidersFrom(ToastrModule.forRoot()),
  provideAnimationsAsync()
];

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: mergedProviders
}).catch(err => console.error(err));
