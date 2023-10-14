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
import { Locality } from 'src/app/api/models/master/locality';
import { LocalityService } from 'src/app/api/services/master/locality.service';
import { Province } from 'src/app/api/models/master/province';

@Component({
  selector: 'app-localities-form',
  templateUrl: './localities-form.component.html',
  styleUrls: ['./localities-form.component.css'],
})
export class LocalityFormComponent implements OnInit {

  @Output() localityEvent = new EventEmitter<object>();
  @Input() provinces: Province[] = [];
  @Input() locality = new Locality();

  @Input() localityEdit: Locality = new Locality();

  // SELECT DE COMBOS
  submitted: boolean = false;

  constructor(
    public localityService: LocalityService,
    private notificationService: NotificationService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.localityEdit = Object.assign({}, this.locality);
  }

  /**
   * Guarda y actualiza un locality
   */
  async saveProvider(): Promise<void> {
    this.submitted = true;

    if (!this.localityEdit.nom) {
      return;
    }
    this.notificationService.showInfo('LOCALITY.SAVE.MESSAGE.INFO');
    const result = await lastValueFrom(
      this.localityService.createLocality({ body: this.localityEdit })
    ).catch((error) => {
      this.notificationService.showError(`LOCALITY.SAVE.MESSAGE.ERROR`);
    });
    if (result) {
      this.localityEvent.emit(this.localityEdit);
      this.notificationService.showSuccess(`LOCALITY.SAVE.MESSAGE.OK`);
    }
  }

  async updateProvider(): Promise<void> {
    // Actualiza un locality

    this.notificationService.showInfo('LOCALITY.UPDATE.MESSAGE.INFO');
    const result = await lastValueFrom(
      this.localityService.updateLocality({
        id: this.localityEdit._id,
        body: this.localityEdit,
      })
    ).catch((error) => {
      this.notificationService.showError(`LOCALITY.UPDATE.MESSAGE.ERROR`);
    });

    if (result) {
      this.localityEdit = result;
      this.localityEvent.emit(this.localityEdit);
      this.notificationService.showSuccess(`LOCALITY.UPDATE.MESSAGE.OK`);
    }
  }
}
