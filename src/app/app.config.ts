import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { AngularSvgIconModule } from 'angular-svg-icon';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({ 
        theme: {
            preset: Lara,
            options: {
              darkModeSelector: '.my-app-dark',
              cssLayer: {
                name: 'primeng',
                order: 'tailwind-base, primeng, tailwind-utilities'
            }
            }
        }
    }),
    importProvidersFrom(AngularSvgIconModule.forRoot()),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes)]
};
