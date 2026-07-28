import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../services/course';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile {
  enrolledCourses: Course[] = [];

  constructor(private enrollmentService: EnrollmentService) {
    this.enrolledCourses = this.enrollmentService.getEnrolledCourses();
  }
}
