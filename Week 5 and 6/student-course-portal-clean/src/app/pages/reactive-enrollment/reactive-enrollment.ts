import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { CanExit } from '../../guards/pending-changes-guard';

@Component({
  selector: 'app-reactive-enrollment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment.html',
  styleUrl: './reactive-enrollment.css',
})
export class ReactiveEnrollment implements CanExit {
  enrollmentForm: FormGroup;

  submitted = false;

  submittedStudent = {
    name: '',
    email: '',
    courseId: '',
    preferredSemester: '',
  };

  constructor(private fb: FormBuilder) {
    this.enrollmentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],

      email: ['', [Validators.required, Validators.email], [this.simulateEmailCheck()]],

      courseId: ['', [Validators.required, this.noCourseCode()]],

      preferredSemester: ['Odd', Validators.required],

      agreeToTerms: [false, Validators.requiredTrue],

      additionalCourses: this.fb.array([]),
    });
  }

  get f() {
    return this.enrollmentForm.controls;
  }

  get additionalCourses(): FormArray {
    return this.enrollmentForm.get('additionalCourses') as FormArray;
  }

  noCourseCode(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (value && value.startsWith('XX')) {
        return { noCourseCode: true };
      }

      return null;
    };
  }

  simulateEmailCheck(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(control.value).pipe(
        delay(800),
        map((email) => {
          if (email && email.includes('test@')) {
            return { emailTaken: true };
          }

          return null;
        }),
      );
    };
  }

  addCourse(): void {
    this.additionalCourses.push(new FormControl('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  onSubmit(): void {
    if (this.enrollmentForm.invalid) {
      this.enrollmentForm.markAllAsTouched();
      return;
    }

    this.submitted = true;

    this.submittedStudent = {
      ...this.enrollmentForm.value,
    };

    console.log('Reactive Form Submitted');
    console.log(this.enrollmentForm.value);
    console.log(this.enrollmentForm.getRawValue());

    this.enrollmentForm.reset();
  }

  canExit(): boolean {
    if (this.enrollmentForm.dirty && !this.submitted) {
      return confirm('You have unsaved changes. Are you sure you want to leave this page?');
    }

    return true;
  }
}
