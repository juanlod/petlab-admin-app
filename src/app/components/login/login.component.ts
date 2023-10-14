import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Observable, async, lastValueFrom, map, switchMap, timer } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/api/services/notification.service';
import { AuthService } from 'src/app/api/services/auth.service';
import { UserService } from 'src/app/api/services/user.service';
import { User } from 'src/app/api/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: User = new User();
  public userData: any = {};
  public token: string | null = '';

  loginForm!: FormGroup;
  passwordType = 'password';

  @ViewChild('loginImage') loginImage!: ElementRef;

  currentImage: string = "url('assets/image/login/1.png')";
  images: string[] = [
    'url(assets/image/login/2.png)',
    'url(assets/image/login/3.png)',
    'url(assets/image/login/4.png)',
    'url(assets/image/login/5.png)',
  ];

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.token = this.authService.getToken();
    if (this.token) {
      this.router.navigate(['dashboard']);
    }

    setInterval(() => {
      this.changeImage();
    }, 30000);
  }

  /**
   * Cambia la imagen de fondo cada 30 segundos
   */
  changeImage(): void {
    const nextImageIndex = this.images.indexOf(this.currentImage) + 1;
    const nextImage =
      nextImageIndex < this.images.length
        ? this.images[nextImageIndex]
        : this.images[0];
    const currentImageElement = document.getElementsByClassName(
      'login-image'
    )[0] as HTMLElement;
    if (currentImageElement) {
      currentImageElement.style.transition = 'opacity 2s';
      currentImageElement.style.opacity = '0';
      setTimeout(() => {
        currentImageElement.style.backgroundImage = nextImage;
        currentImageElement.style.opacity = '1';
        this.currentImage = nextImage;
      }, 2000);
    }
  }

  /**
   * Login del usuario
   * @param form
   */
  async login() {
    // Enviamos la peticion al backend
    let response = (await lastValueFrom(
      this.userService.loginUser({ body: this.user })
    ).catch((error) => {
      // Si se produce algun error enviamos un mensaje
      this.notificationService.showError(error.error.message);
    })) as any;
    // Si la respuesta es correcta almacenamos los datos en el localstorage
    if (response) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('id', response.user._id);
      this.notificationService.showSuccess('USER.LOGIN.OK');
      this.router.navigate(['dashboard']);
    }


  }

  togglePassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
  }
}
