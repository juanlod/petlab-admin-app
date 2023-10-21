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
import { ClinicImageConfiguration } from 'src/app/api/models/master/clinic-image-configuration';
import { ClinicImageConfigurationService } from 'src/app/api/services/master/clinic-image-configuration.service';
import { CommonComponent } from 'src/app/api/common/common.component';

@Component({
  selector: 'app-clinic-images-form',
  templateUrl: './clinic-images-form.component.html',
  styleUrls: ['./clinic-images-form.component.css'],
})
export class ClinicImagesFormComponent
  extends CommonComponent
  implements OnInit
{
  @Output() imageEvent = new EventEmitter<object>();

  @Input() image = new ClinicImageConfiguration();

  @Input() imageEdit: ClinicImageConfiguration = new ClinicImageConfiguration();

  // SELECT DE COMBOS
  submitted: boolean = false;

  constructor(
    public imageService: ClinicImageConfigurationService,
    private notificationService: NotificationService
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {
    this.imageEdit = Object.assign({}, this.image);
  }

  /**
   * Guarda y actualiza un image
   */
  async saveImage(): Promise<void> {
    this.submitted = true;

    if (
      !this.imageEdit.clientEmail ||
      !this.imageEdit.clientX509CertUrl ||
      !this.imageEdit.privateKey ||
      !this.imageEdit.privateKeyId ||
      !this.imageEdit.type ||
      !this.imageEdit.universeDomain
    ) {
      return;
    }
    this.notificationService.showInfo('CLINIC_IMAGE.SAVE.MESSAGE.INFO');
    const encryptedImageEdit = this.encryptAllFields(this.imageEdit);
    const result = await lastValueFrom(
      this.imageService.createClinicImageConfiguration({ body: encryptedImageEdit })
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
    const encryptedImageEdit = this.encryptAllFields(this.imageEdit);
    const result = await lastValueFrom(
      this.imageService.updateClinicImageConfiguration({
        id: this.imageEdit._id,
        body: encryptedImageEdit,
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
