import { TestBed } from '@angular/core/testing';

import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { provideHttpClient } from '@angular/common/http';

import { CourseService, Course } from './course';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    {
      id: 1,
      name: ' Angular Basics ',
      code: 'ANG101',
      credits: 4,
      level: 'Beginner',
      gradeStatus: 'Passed',
    },
    {
      id: 2,
      name: 'React',
      code: 'REA101',
      credits: 3,
      level: 'Intermediate',
      gradeStatus: 'Pending',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), CourseService],
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all courses', () => {
    service.getCourses().subscribe((courses) => {
      expect(courses.length).toBe(2);

      expect(courses[0].name).toBe('Angular Basics');

      expect(courses[1].code).toBe('REA101');
    });

    const request = httpMock.expectOne('http://localhost:3000/courses');

    expect(request.request.method).toBe('GET');

    request.flush(mockCourses);
  });

  it('should fetch one course', () => {
    service.getCourseById(1).subscribe((course) => {
      expect(course.id).toBe(1);

      expect(course.name).toBe(' Angular Basics ');
    });

    const request = httpMock.expectOne('http://localhost:3000/courses/1');

    expect(request.request.method).toBe('GET');

    request.flush(mockCourses[0]);
  });

  it('should add a course', () => {
    const newCourse = {
      name: 'Vue',
      code: 'VUE101',
      credits: 3,
      level: 'Beginner' as const,
      gradeStatus: 'Pending' as const,
    };

    service.addCourse(newCourse).subscribe((course) => {
      expect(course.id).toBe(3);

      expect(course.name).toBe('Vue');
    });

    const request = httpMock.expectOne('http://localhost:3000/courses');

    expect(request.request.method).toBe('POST');

    request.flush({
      id: 3,
      ...newCourse,
    });
  });

  it('should update a course', () => {
    const updated: Course = {
      id: 1,
      name: 'Angular Advanced',
      code: 'ANG101',
      credits: 5,
      level: 'Advanced',
      gradeStatus: 'Passed',
    };

    service.updateCourse(1, updated).subscribe((course) => {
      expect(course.name).toBe('Angular Advanced');

      expect(course.credits).toBe(5);
    });

    const request = httpMock.expectOne('http://localhost:3000/courses/1');

    expect(request.request.method).toBe('PUT');

    request.flush(updated);
  });

  it('should delete a course', () => {
    service.deleteCourse(1).subscribe((response) => {
      expect(response).toBeNull();
    });

    const request = httpMock.expectOne('http://localhost:3000/courses/1');

    expect(request.request.method).toBe('DELETE');

    request.flush(null);
  });
});
