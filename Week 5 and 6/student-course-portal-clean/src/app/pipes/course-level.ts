import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'courseLevel',
  standalone: true
})
export class CourseLevel implements PipeTransform {

  transform(value: string): string {

    switch (value) {

      case 'Beginner':
        return '🟢 Beginner Level';

      case 'Intermediate':
        return '🟡 Intermediate Level';

      case 'Advanced':
        return '🔴 Advanced Level';

      default:
        return value;

    }

  }

}
