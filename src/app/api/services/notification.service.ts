import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  showSuccess(message: string, title?: string) {
    if (title) {
      this.translate.get(title).subscribe((res: string) => {
        const title = res;
        this.translate.get(message).subscribe((res: string) => {
          const message = res;
          this.toastr.success(message, title != null ? title : '');
        });
      });
    } else {
      this.translate.get(message).subscribe((res: string) => {
        const message = res;
        this.toastr.success(message, title != null ? title : '');
      });
    }
  }

  showError(message: string, title?: string) {
    if (title) {
      this.translate.get(title).subscribe((res: string) => {
        const title = res;
        this.translate.get(message).subscribe((res: string) => {
          const message = res;
          this.toastr.error(message, title != null ? title : '');
        });
      });
    } else {
      if (message) {
        this.translate.get(message).subscribe((res: string) => {
          const message = res;
          this.toastr.error(message, title != null ? title : '');
        });
      }

    }
  }

  showInfo(message: string, title?: string) {
    if (title) {
      this.translate.get(title).subscribe((res: string) => {
        const title = res;
        this.translate.get(message).subscribe((res: string) => {
          const message = res;
          this.toastr.info(message, title != null ? title : '');
        });
      });
    } else {
      this.translate.get(message).subscribe((res: string) => {
        const message = res;
        this.toastr.info(message, title != null ? title : '');
      });
    }
  }
}
