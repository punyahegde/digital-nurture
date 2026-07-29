import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, retry, catchError } from 'rxjs/operators';

export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  level: string;
  gradeStatus?: 'Passed' | 'Failed' | 'Pending';
}

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      // Retry the request 2 times if it fails
      retry(2),

      // Transform the data before sending it to the component
      map((courses) =>
        courses.map((course) => ({
          ...course,
          name: course.name.trim(),
        })),
      ),

      // Log the response to the browser console
      tap((courses) => {
        console.log('Courses fetched successfully:', courses);
      }),

      // Handle HTTP errors
      catchError((error) => {
        console.error('HTTP Error:', error);

        return throwError(() => new Error('Unable to load courses. Please try again.'));
      }),
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      tap((course) => {
        console.log('Service returned:', course);
      }),
    );
  }

  addCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
