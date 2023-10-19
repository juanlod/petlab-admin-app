import { DatePipe } from '@angular/common';
import { Directive, AfterViewInit, HostListener } from '@angular/core';
import { Utils } from '../../utils';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Directive()
export abstract class CommonComponent implements AfterViewInit {
  public today: string;

  confirmModal?: NzModalRef;

  constructor() {
    // Actualizamos el dia actual cada 1 segundo
    setInterval(() => {
      let pipe = new DatePipe('es-ES');
      this.today = pipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss')
    }, 1000);

  }

  ngAfterViewInit(): void {}

  /**
   * Lee un archivo y devuelve su contenido como un Array<number>
   *
   * @param file El archivo a leer
   * @returns Una promesa que resuelve con el contenido del archivo como Array<number>
   */
  public readFileAsArrayBuffer(file: File): Promise<Array<number>> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const arrayBuffer: ArrayBuffer = e.target.result;
        const byteArray = new Uint8Array(arrayBuffer);
        resolve(Array.from(byteArray));
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  }


    transformDate(date: string, pattern: string, language: string) {
    return Utils.transformDate(date, pattern, language);
  }

}
