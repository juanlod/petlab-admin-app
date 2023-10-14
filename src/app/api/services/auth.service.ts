import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private helper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public isAuthenticated(allowRoles?: string[]): boolean {
    if (!allowRoles?.includes('admin')) {
      return false;
    }

    const token = localStorage.getItem('token');
    let decode: any = {};

    try {
      decode = this.helper.decodeToken(token!) as any;
    } catch (error) {
      decode = false;
      this.sessionFinishedMessage(token, decode);
    }

    if (this.validateExpirationDate(decode?.expiration_date)) {
      this.sessionFinishedMessage(token, decode);
    }

    return !token || !decode || !allowRoles.includes(decode['rol'])
      ? false
      : true;
  }

  private sessionFinishedMessage(token: string, decode: any) {
    Swal.fire({
      heightAuto: false,
      title: '',
      text: `Su sesión ha terminado. Debe volver a iniciar sesión`,
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#22bb33',
      reverseButtons: true,
    }).then((result) => {
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      this.router.navigate(['login']);
      return !token || !decode ? false : true;
    });
  }

  private validateExpirationDate(expirationDate: number) {
    const currentUnixTime = Math.floor(Date.now() / 1000); // Obtén el tiempo actual en segundos desde la época Unix
    return expirationDate <= currentUnixTime;
  }
}
