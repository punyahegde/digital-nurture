import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../services/course';
@Component({
  selector: 'app-student-enrollment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-enrollment.html',
  styleUrl: './student-enrollment.css',
})
export class StudentEnrollment {
  constructor(private enrollmentService: EnrollmentService) {}

  student = {
    name: '',
    email: '',
    course: '',
  };

  submitted = false;

  submittedStudent = {
    name: '',
    email: '',
    course: '',
  };

  onSubmit(): void {
    const course: Course = {
      id: Date.now(),
      name: this.student.course,
      code: this.student.course.toUpperCase(),
      credits: 3,
      level: 'Beginner',
    };

    this.enrollmentService.enroll(course);

    this.submitted = true;

    this.submittedStudent = {
      ...this.student,
    };

    console.log('Enrollment Successful');
    console.log(this.submittedStudent);
  }
}
