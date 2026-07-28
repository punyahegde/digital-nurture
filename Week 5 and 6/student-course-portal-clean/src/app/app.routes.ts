import { Routes } from '@angular/router';

import { Home } from './pages/home/home';

import { authGuard } from './guards/auth-guard';
import { pendingChangesGuard } from './guards/pending-changes-guard';
export const routes: Routes = [
  {
    path: '',
    component: Home,
  },

  {
    path: 'courses',
    loadComponent: () => import('./pages/course-list/course-list').then((m) => m.CourseList),
  },

  {
    path: 'courses/:id',
    loadComponent: () => import('./pages/course-detail/course-detail').then((m) => m.CourseDetail),
  },

  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/student-profile/student-profile').then((m) => m.StudentProfile),
    children: [
      {
        path: 'details',
        loadComponent: () =>
          import('./pages/profile-details/profile-details').then((m) => m.ProfileDetails),
      },
    ],
  },

  {
    path: 'enrollment',
    loadComponent: () =>
      import('./pages/student-enrollment/student-enrollment').then((m) => m.StudentEnrollment),
  },

  {
    path: 'reactive-enrollment',
    canDeactivate: [pendingChangesGuard],
    loadComponent: () =>
      import('./pages/reactive-enrollment/reactive-enrollment').then((m) => m.ReactiveEnrollment),
  },

  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
