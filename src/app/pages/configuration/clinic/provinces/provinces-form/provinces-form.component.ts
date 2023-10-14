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
import { Province } from 'src/app/api/models/master/province';
import { ProvinceService } from 'src/app/api/services/master/province.service';

@Component({
  selector: 'app-provinces-form',
  templateUrl: './provinces-form.component.html',
  styleUrls: ['./provinces-form.component.css'],
})
export class ProvincesFormComponent implements OnInit {

  @Output() provinceEvent = new EventEmitter<object>();
  @Input() province = new Province();

  @Input() provinceEdit: Province = new Province();

  // SELECT DE COMBOS
  submitted: boolean = false;

  constructor(
    public provinceService: ProvinceService,
    private notificationService: NotificationService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.provinceEdit = Object.assign({}, this.province);
  }

  /**
   * Guarda y actualiza un province
   */
  async saveProvider(): Promise<void> {
    this.submitted = true;

    if (!this.provinceEdit.nom) {
      return;
    }
    this.notificationService.showInfo('PROVINCE.SAVE.MESSAGE.INFO');
    const result = await lastValueFrom(
      this.provinceService.createProvince({ body: this.provinceEdit })
    ).catch((error) => {
      this.notificationService.showError(`PROVINCE.SAVE.MESSAGE.ERROR`);
    });
    if (result) {
      this.provinceEvent.emit(this.provinceEdit);
      this.notificationService.showSuccess(`PROVINCE.SAVE.MESSAGE.OK`);
    }
  }

  async updateProvider(): Promise<void> {
    // Actualiza un province

    this.notificationService.showInfo('PROVINCE.UPDATE.MESSAGE.INFO');
    const result = await lastValueFrom(
      this.provinceService.updateProvince({
        id: this.provinceEdit._id,
        body: this.provinceEdit,
      })
    ).catch((error) => {
      this.notificationService.showError(`PROVINCE.UPDATE.MESSAGE.ERROR`);
    });

    if (result) {
      this.provinceEdit = result;
      this.provinceEvent.emit(this.provinceEdit);
      this.notificationService.showSuccess(`PROVINCE.UPDATE.MESSAGE.OK`);
    }
  }
}
