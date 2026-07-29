import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { provideStore } from '@ngrx/store';
import { provideState } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';

import { courseReducer } from './store/course/course.reducer';
import { CourseEffects } from './store/course/course.effects';

import { authInterceptor } from './interceptors/auth-interceptor';
import { errorInterceptor } from './interceptors/error-interceptor';
import { loadingInterceptor } from './interceptors/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideRouter(routes),

    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor, loadingInterceptor])),

    provideStore({}),

    provideState('course', courseReducer),

    provideEffects([CourseEffects]),

    provideStoreDevtools({
      maxAge: 25,
    }),
  ],
};
