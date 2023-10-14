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

import { UnityType } from 'src/app/api/models/inventory/unity-type';
import { NotificationService } from 'src/app/api/services/notification.service';
import { InventoryCacheService } from 'src/app/api/cache/inventory-cache-service';
import { lastValueFrom } from 'rxjs';
import { ProductType } from 'src/app/api/models/inventory/product-type';
import { ProductTypeService } from 'src/app/api/services/inventory/product-type.service';

@Component({
  selector: 'app-product-types-form',
  templateUrl: './product-types-form.component.html',
  styleUrls: ['./product-types-form.component.css'],
})
export class ProductTypesFormComponent implements OnInit {

  @Output() productTypeEvent = new EventEmitter<object>();
  @Input() productType = new ProductType();

  @Input() productTypeEdit: ProductType = new ProductType();

  // SELECT DE COMBOS
  submitted: boolean = false;

  constructor(
    public productTypeService: ProductTypeService,
    private notificationService: NotificationService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.productTypeEdit = Object.assign({}, this.productType);
  }

  /**
   * Guarda y actualiza un productType
   */
  async save(): Promise<void> {
    this.submitted = true;

    if (!this.productTypeEdit.name) {
      return;
    }
    this.notificationService.showInfo('PRODUCT_TYPES.SAVE.MESSAGE.INFO');
    const result = await lastValueFrom(
      this.productTypeService.createProductType({ body: this.productTypeEdit })
    ).catch((error) => {
      this.notificationService.showError(`PRODUCT_TYPES.SAVE.MESSAGE.ERROR`);
    });
    if (result) {
      this.productTypeEvent.emit(this.productTypeEdit);
      this.notificationService.showSuccess(`PRODUCT_TYPES.SAVE.MESSAGE.OK`);
    }
  }

  async update(): Promise<void> {
    // Actualiza un productType

    this.notificationService.showInfo('PRODUCT_TYPES.UPDATE.MESSAGE.INFO');
    const result = await lastValueFrom(
      this.productTypeService.updateProductType({
        id: this.productTypeEdit._id,
        body: this.productTypeEdit,
      })
    ).catch((error) => {
      this.notificationService.showError(`PRODUCT_TYPES.UPDATE.MESSAGE.ERROR`);
    });

    if (result) {
      this.productTypeEdit = result;
      this.productTypeEvent.emit(this.productTypeEdit);
      this.notificationService.showSuccess(`PRODUCT_TYPES.UPDATE.MESSAGE.OK`);
    }
  }
}
