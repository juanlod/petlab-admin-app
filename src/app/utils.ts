import { DatePipe } from '@angular/common';

export class Utils {


   static transformDate(date: string, format: string, location: string, toUS?: boolean): string {
    const datePipe = new DatePipe(location);
    return !toUS ?  datePipe.transform(date, format) : datePipe.transform(date, 'dd-MM-yyyy', '+0000');
  }


  static transformToDate(date: string, format: string, location: string): Date {
    const datePipe = new DatePipe(location);
    const transformedDate = datePipe.transform(date, format);
    return transformedDate ? new Date(transformedDate) : null;
  }


  static getActualDate() {
    const actualDate = new Date();
    const year = actualDate.getFullYear();
    const month = String(actualDate.getMonth() + 1).padStart(2, '0');
    const day = String(actualDate.getDate()).padStart(2, '0');

    return `${year}/${month}/${day}`;
  }

}
