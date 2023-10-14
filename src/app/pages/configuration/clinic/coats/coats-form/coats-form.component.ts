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
import { CoatService } from 'src/app/api/services/master/coat.service';
import { Coat } from 'src/app/api/models/master/coat';



@Component({
  selector: 'app-coats-form',
  templateUrl: './coats-form.component.html',
  styleUrls: ['./coats-form.component.css'],
})
export class CoatsFormComponent implements OnInit {

  @Output() coatEvent = new EventEmitter<object>();

  @Input() coat = new Coat();

  @Input() coatEdit: Coat = new Coat();

  // SELECT DE COMBOS
  submitted: boolean = false;

  constructor(
    public coatService: CoatService,
    private notificationService: NotificationService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.coatEdit = Object.assign({}, this.coat);
  }

  /**
   * Guarda y actualiza un coat
   */
  async saveProvider(): Promise<void> {
    this.submitted = true;

    if (!this.coatEdit.nom) {
      return;
    }
    this.notificationService.showInfo('COAT.SAVE.MESSAGE.INFO');
    const result = await lastValueFrom(
      this.coatService.createCoat({ body: this.coatEdit })
    ).catch((error) => {
      this.notificationService.showError(`COAT.SAVE.MESSAGE.ERROR`);
    });
    if (result) {
      this.coatEvent.emit(this.coatEdit);
      this.notificationService.showSuccess(`COAT.SAVE.MESSAGE.OK`);
    }
  }

  async updateProvider(): Promise<void> {
    // Actualiza un coat

    this.notificationService.showInfo('COAT.UPDATE.MESSAGE.INFO');
    const result = await lastValueFrom(
      this.coatService.updateCoat({
        id: this.coatEdit._id,
        body: this.coatEdit,
      })
    ).catch((error) => {
      this.notificationService.showError(`COAT.UPDATE.MESSAGE.ERROR`);
    });

    if (result) {
      this.coatEdit = result;
      this.coatEvent.emit(this.coatEdit);
      this.notificationService.showSuccess(`COAT.UPDATE.MESSAGE.OK`);
    }
  }
}
