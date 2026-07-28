import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { CourseCard } from '../../components/course-card/course-card';
import { HighlightDirective } from '../../directives/highlight';
import { CourseLevel } from '../../pipes/course-level';

import { Course } from '../../services/course';

import * as CourseActions from '../../store/course/course.actions';
import * as CourseSelectors from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCard, HighlightDirective, CourseLevel],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  courses$: Observable<Course[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  selectedCourseId?: number;

  searchTerm = '';

  today = new Date();
  courseFee = 1500;
  completionRate = 0.85;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.courses$ = this.store.select(CourseSelectors.selectAllCourses);
    this.loading$ = this.store.select(CourseSelectors.selectCoursesLoading);
    this.error$ = this.store.select(CourseSelectors.selectCoursesError);
  }

  ngOnInit(): void {
    this.store.dispatch(CourseActions.loadCourses());

    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['search'] || '';
    });
  }

  onEnroll(courseId: number): void {
    this.selectedCourseId = courseId;
  }

  updateSearch(search: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: search,
      },
      queryParamsHandling: 'merge',
    });
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }
}
