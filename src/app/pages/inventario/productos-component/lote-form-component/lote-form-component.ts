import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {} from '@angular/forms';
import Swal from 'sweetalert2';

import { BatchService } from 'src/app/api/services/inventory/batch.service';
import { Product } from 'src/app/api/models/inventory/product';
import { NotificationService } from 'src/app/api/services/notification.service';
import { Batch } from 'src/app/api/models/inventory/batch';
import { lastValueFrom } from 'rxjs';
import { Utils } from 'src/app/utils';

@Component({
  selector: 'app-lote-form',
  templateUrl: './lote-form-component.html',
  styleUrls: ['./lote-form-component.css'],
})
export class LoteComponent implements OnInit {

  @Input() product!: Product;
  @Input() batch: Batch = new Batch();
  @Input() batchEdit: Batch = new Batch();

  @Output() batchEmmiter = new EventEmitter<Batch>();

  submitted: boolean = false;

  loading = true;
  filter: '';

  constructor(
    private batchService: BatchService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.batchEdit = Object.assign({}, this.batch)

    if (this.batchEdit._id) {
      this.batchEdit.entry_date = Utils.transformDate(
        this.batchEdit.entry_date,
        'yyyy-MM-dd',
        'en-US'
      );

      this.batchEdit.expiration_date = Utils.transformDate(
        this.batchEdit.expiration_date,
        'yyyy-MM-dd',
        'en-US'
      );
    }

  }

  /**
   * Captura un evento de teclado para establecer el filtro de búsqueda segun lo que se escriba
   * @param event
   */
  search(event: any) {
    this.filter = event.target.value;
  }

  async save(): Promise<void> {
    this.submitted = true;

    if (!this.batchEdit.number) {
      return;
    }

    this.notificationService.showInfo('BATCH.SAVE.MESSAGE.INFO');
    this.batchEdit.product_id = this.product.id;

    const result = await lastValueFrom(
      this.batchService.createBatch({ body: this.batchEdit })
    ).catch((error) => {
      this.notificationService.showError(`BATCH.SAVE.MESSAGE.ERROR`);
    });
    if (result) {
      this.batchEdit = result;
      this.onUpdateBatch()
      this.notificationService.showSuccess(`BATCH.SAVE.MESSAGE.OK`);
    }

  }


  async update() {
    this.notificationService.showInfo('BATCH.UPDATE.MESSAGE.INFO');

    const result = await lastValueFrom(
      this.batchService.updateBatch({ id: this.batchEdit._id ,  body: this.batchEdit })
    ).catch((error) => {
      this.notificationService.showError(`BATCH.UPDATE.MESSAGE.ERROR`);
    });
    if (result) {
      this.batchEdit = result;
      this.onUpdateBatch()
      this.notificationService.showSuccess(`BATCH.UPDATE.MESSAGE.OK`);
    }
  }

  calculateTotalQuantity() {
    const number = this.batchEdit.product_quantity && this.batchEdit.quantity_per_unity
    ? (this.batchEdit.product_quantity * this.batchEdit.quantity_per_unity)?.toFixed(2)
    : this.batchEdit.product_quantity * 1;
    this.batchEdit.total_quantity = +number;
  }


  onUpdateBatch() {
    this.batchEmmiter.emit(this.batchEdit);
  }
}



