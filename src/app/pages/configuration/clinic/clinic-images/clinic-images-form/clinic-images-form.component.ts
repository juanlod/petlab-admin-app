import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { NotificationService } from 'src/app/api/services/notification.service';
import { lastValueFrom } from 'rxjs';
import { ClinicImage } from 'src/app/api/models/master/clinic-image';
import { ClinicImageService } from 'src/app/api/services/master/clinic-image.service';

@Component({
  selector: 'app-clinic-images-form',
  templateUrl: './clinic-images-form.component.html',
  styleUrls: ['./clinic-images-form.component.css'],
})
export class ClinicImagesFormComponent implements OnInit {
  @Output() imageEvent = new EventEmitter<object>();

  @Input() image = new ClinicImage();

  @Input() imageEdit: ClinicImage = new ClinicImage();

  // SELECT DE COMBOS
  submitted: boolean = false;

  constructor(
    public imageService: ClinicImageService,
    private notificationService: NotificationService
  ) {}

  async ngOnInit(): Promise<void> {
    this.imageEdit = Object.assign({}, this.image);
  }

  /**
   * Guarda y actualiza un image
   */
  async saveImage(): Promise<void> {
    this.submitted = true;

    if (!this.imageEdit.route) {
      return;
    }
    this.notificationService.showInfo('CLINIC_IMAGE.SAVE.MESSAGE.INFO');
    const result = await lastValueFrom(
      this.imageService.createClinicImage({ body: this.imageEdit })
    ).catch((error) => {
      this.notificationService.showError(`CLINIC_IMAGE.SAVE.MESSAGE.ERROR`);
    });
    if (result) {
      this.imageEvent.emit(this.imageEdit);
      this.notificationService.showSuccess(`CLINIC_IMAGE.SAVE.MESSAGE.OK`);
    }
  }

  async updateImage(): Promise<void> {
    // Actualiza un image

    this.notificationService.showInfo('CLINIC_IMAGE.UPDATE.MESSAGE.INFO');
    const result = await lastValueFrom(
      this.imageService.updateClinicImage({
        id: this.imageEdit._id,
        body: this.imageEdit,
      })
    ).catch((error) => {
      this.notificationService.showError(`CLINIC_IMAGE.UPDATE.MESSAGE.ERROR`);
    });

    if (result) {
      this.imageEdit = result;
      this.imageEvent.emit(this.imageEdit);
      this.notificationService.showSuccess(`CLINIC_IMAGE.UPDATE.MESSAGE.OK`);
    }
  }
}
