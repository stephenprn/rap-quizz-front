import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  constructor() {}

  transform(seconds: number): string {
    if (seconds === 0) {
      return 'illimité';
    }

    if (seconds < 60) {
      return `${seconds} secondes`;
    }

    const minutes = Math.trunc(seconds / 60);

    if (seconds % 60 === 0) {
      if (minutes === 1) {
        return '1 minute';
      }

      return `${minutes} minutes`;
    }

    return `${minutes} min et ${seconds % 60} sec`;
  }
}
