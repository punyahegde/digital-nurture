import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CreditLabelPipe } from '../../pipes/credit-label';
import { HighlightDirective } from '../../directives/highlight';
import { Course } from '../../services/course';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, CreditLabelPipe, HighlightDirective],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {
  @Input()
  course!: Course;

  @Output()
  enrollRequested = new EventEmitter<number>();

  constructor(
    private router: Router,
    private enrollmentService: EnrollmentService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Course Input Changed:', changes['course']);
  }

  viewCourse(): void {
    this.router.navigate(['courses', this.course.id]);
  }

  enroll(): void {
    if (this.enrollmentService.isEnrolled(this.course.id)) {
      this.enrollmentService.unenroll(this.course.id);
    } else {
      this.enrollmentService.enroll(this.course);
    }

    this.enrollRequested.emit(this.course.id);
  }

  isEnrolled(): boolean {
    return this.enrollmentService.isEnrolled(this.course.id);
  }

  getLevelClass(): string {
    switch (this.course.level) {
      case 'Beginner':
        return 'beginner';

      case 'Intermediate':
        return 'intermediate';

      case 'Advanced':
        return 'advanced';

      default:
        return '';
    }
  }

  getCreditStyle() {
    return {
      'font-weight': 'bold',
      color: this.course.credits >= 4 ? 'green' : 'blue',
    };
  }
}
