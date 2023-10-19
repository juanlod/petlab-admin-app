import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private messageService: NzMessageService,
    private translate: TranslateService
  ) {}

  showSuccess(message: string, title?: string) {
    if (title) {
      this.translate.get(title).subscribe((res: string) => {
        const title = res;
        this.translate.get(message).subscribe((res: string) => {
          const message = res;
          this.messageService.success(message);
        });
      });
    } else {
      this.translate.get(message).subscribe((res: string) => {
        const message = res;
        this.messageService.success(message);
      });
    }
  }

  showError(message: string, title?: string) {
    if (title) {
      this.translate.get(title).subscribe((res: string) => {
        const title = res;
        this.translate.get(message).subscribe((res: string) => {
          const message = res;
          this.messageService.error(message);
        });
      });
    } else {
      if (message) {
        this.translate.get(message).subscribe((res: string) => {
          const message = res;
          this.messageService.error(message);
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
          this.messageService.info(message);
        });
      });
    } else {
      this.translate.get(message).subscribe((res: string) => {
        const message = res;
        this.messageService.info(message);
      });
    }
  }
}
