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
import { SexService } from 'src/app/api/services/master/sex.service';
import { Sex } from 'src/app/api/models/master/sex';



@Component({
  selector: 'app-sexes-form',
  templateUrl: './sexes-form.component.html',
  styleUrls: ['./sexes-form.component.css'],
})
export class SexFormComponent implements OnInit {

  @Output() sexEvent = new EventEmitter<object>();

  @Input() sex = new Sex();

  @Input() sexEdit: Sex = new Sex();

  // SELECT DE COMBOS
  submitted: boolean = false;

  constructor(
    public sexService: SexService,
    private notificationService: NotificationService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.sexEdit = Object.assign({}, this.sex);
  }

  /**
   * Guarda y actualiza un sex
   */
  async saveProvider(): Promise<void> {
    this.submitted = true;

    if (!this.sexEdit.value) {
      return;
    }
    this.notificationService.showInfo('SEX.SAVE.MESSAGE.INFO');
    const result = await lastValueFrom(
      this.sexService.createSex({ body: this.sexEdit })
    ).catch((error) => {
      this.notificationService.showError(`SEX.SAVE.MESSAGE.ERROR`);
    });
    if (result) {
      this.sexEvent.emit(this.sexEdit);
      this.notificationService.showSuccess(`SEX.SAVE.MESSAGE.OK`);
    }
  }

  async updateProvider(): Promise<void> {
    // Actualiza un sex

    this.notificationService.showInfo('SEX.UPDATE.MESSAGE.INFO');
    const result = await lastValueFrom(
      this.sexService.updateSex({
        id: this.sexEdit._id,
        body: this.sexEdit,
      })
    ).catch((error) => {
      this.notificationService.showError(`SEX.UPDATE.MESSAGE.ERROR`);
    });

    if (result) {
      this.sexEdit = result;
      this.sexEvent.emit(this.sexEdit);
      this.notificationService.showSuccess(`SEX.UPDATE.MESSAGE.OK`);
    }
  }
}
