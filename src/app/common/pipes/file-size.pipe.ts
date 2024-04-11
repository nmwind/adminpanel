import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
  standalone: true
})
export class FileSizePipe implements PipeTransform {

    transform(bytes: number): string {
        if (isNaN(bytes) || bytes === 0) return '0 b';

        const sizes = ['b', 'Kb', 'Mb', 'Gb', 'Tb'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
    }

}
