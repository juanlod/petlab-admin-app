import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { ActivatedRoute, Params, Route, Router } from '@angular/router';

import { NotificationService } from 'src/app/api/services/notification.service';
import { lastValueFrom } from 'rxjs';
import { UnityType } from 'src/app/api/models/inventory/unity-type';
import { UnityTypeService } from 'src/app/api/services/inventory/unity-type.service';

@Component({
  selector: 'app-unity-types-form',
  templateUrl: './unity-types-form.component.html',
  styleUrls: ['./unity-types-form.component.css'],
})
export class UnityTypesFormComponent implements OnInit {

  @Output() unityTypeEvent = new EventEmitter<object>();
  @Input() unityType = new UnityType();

  @Input() unityTypeEdit: UnityType = new UnityType();

  // SELECT DE COMBOS
  submitted: boolean = false;

  constructor(
    public unityTypeService: UnityTypeService,
    private notificationService: NotificationService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.unityTypeEdit = Object.assign({}, this.unityType);
  }

  /**
   * Guarda y actualiza un unityType
   */
  async saveProvider(): Promise<void> {
    this.submitted = true;

    if (!this.unityTypeEdit.name) {
      return;
    }
    this.notificationService.showInfo('UNITY_TYPES.SAVE.MESSAGE.INFO');
    const result = await lastValueFrom(
      this.unityTypeService.createUnityType({ body: this.unityTypeEdit })
    ).catch((error) => {
      this.notificationService.showError(`UNITY_TYPES.SAVE.MESSAGE.ERROR`);
    });
    if (result) {
      this.unityTypeEvent.emit(this.unityTypeEdit);
      this.notificationService.showSuccess(`UNITY_TYPES.SAVE.MESSAGE.OK`);
    }
  }

  async updateProvider(): Promise<void> {
    // Actualiza un unityType

    this.notificationService.showInfo('UNITY_TYPES.UPDATE.MESSAGE.INFO');
    const result = await lastValueFrom(
      this.unityTypeService.updateUnityType({
        id: this.unityTypeEdit._id,
        body: this.unityTypeEdit,
      })
    ).catch((error) => {
      this.notificationService.showError(`UNITY_TYPES.UPDATE.MESSAGE.ERROR`);
    });

    if (result) {
      this.unityTypeEdit = result;
      this.unityTypeEvent.emit(this.unityTypeEdit);
      this.notificationService.showSuccess(`UNITY_TYPES.UPDATE.MESSAGE.OK`);
    }
  }
}
