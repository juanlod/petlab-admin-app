import { DatePipe } from '@angular/common';
import { Directive } from '@angular/core';
import { Utils } from '../../utils';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Directive()
export abstract class CommonComponent  {
  public today: string;
  public window = window;
  public mobileWindowSize: number = 768;

  confirmModal?: NzModalRef;

  constructor() {
    // Actualizamos el dia actual cada 1 segundo
    setInterval(() => {
      let pipe = new DatePipe('es-ES');
      this.today = pipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss');
    }, 1000);
  }

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

  encryptAllFields(objectToEncrypt: any): any {
    const encryptedObject = {};
    for (const [key, value] of Object.entries(objectToEncrypt)) {
      // Ignorar los campos '_id' e 'id' durante la encriptación
      if (key !== '_id' && key !== 'id') {
        if (typeof value === 'string') {
          encryptedObject[key] = this.encrypt(value);
        } else {
          encryptedObject[key] = value;
        }
      } else {
        // Añadir el campo sin encriptación
        encryptedObject[key] = value;
      }
    }
    return encryptedObject;
  }

  decryptAllFields(objectToDecrypt: any): any {
    const decryptedObject = {};
    for (const [key, value] of Object.entries(objectToDecrypt)) {
      // Ignorar los campos '_id' e 'id' durante la desencriptación
      if (key !== '_id' && key !== 'id') {
        if (typeof value === 'string') {
          decryptedObject[key] = this.decrypt(value);
        } else {
          decryptedObject[key] = value;
        }
      } else {
        // Añadir el campo sin desencriptación
        decryptedObject[key] = value;
      }
    }
    return decryptedObject;
  }

  encrypt(value: string): string {
    if (!value) {
      return null;
    }
    const encryptedValue = CryptoJS.AES.encrypt(
      value,
      environment.secretKey
    ).toString();
    return encryptedValue;
  }

  decrypt(encryptedValue: string): string {
    if (!encryptedValue) {
      return null;
    }
    const decryptedValue = CryptoJS.AES.decrypt(
      encryptedValue,
      environment.secretKey
    );
    return decryptedValue.toString(CryptoJS.enc.Utf8);
  }
}
