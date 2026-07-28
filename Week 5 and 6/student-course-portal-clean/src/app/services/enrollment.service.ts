import { Injectable } from '@angular/core';
import { Course } from './course';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private enrolledCourses: Course[] = [];

  enroll(course: Course): void {
    if (!this.isEnrolled(course.id)) {
      this.enrolledCourses.push(course);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourses = this.enrolledCourses.filter((course) => course.id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourses.some((course) => course.id === courseId);
  }

  getEnrolledCourses(): Course[] {
    return this.enrolledCourses;
  }
}
