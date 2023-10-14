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
import { StoreProviderService } from 'src/app/api/services/inventory/store-provider.service';
import { StoreProvider } from 'src/app/api/models/inventory/store-provider';
import { UnityType } from 'src/app/api/models/inventory/unity-type';
import { NotificationService } from 'src/app/api/services/notification.service';
import { InventoryCacheService } from 'src/app/api/cache/inventory-cache-service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-proveedor-form',
  templateUrl: './proveedores-form.component.html',
  styleUrls: ['./proveedores-form.component.css'],
})
export class ProveedoresFormComponent implements OnInit {

  @Output() providerEvent = new EventEmitter<object>();
  @Input() provider = new StoreProvider();

  @Input() providerEdit: StoreProvider = new StoreProvider();

  // SELECT DE COMBOS
  submitted: boolean = false;

  constructor(
    public providerService: StoreProviderService,
    public proveedorService: StoreProviderService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private inventoryCache: InventoryCacheService
  ) {}

  async ngOnInit(): Promise<void> {

    this.providerEdit = Object.assign({}, this.provider)


  }

  /**
   * Guarda y actualiza un provider
   */
  async saveProvider(): Promise<void> {
    this.submitted = true;

    if (!this.providerEdit.name) {
      return;
    }
    this.notificationService.showInfo('PROVIDERS.SAVE.MESSAGE.INFO');
    const result = await lastValueFrom(
      this.providerService.createStoreProvider({ body: this.providerEdit })
    ).catch((error) => {
      this.notificationService.showError(`PROVIDERS.SAVE.MESSAGE.ERROR`);

    });
    if (result) {
      this.providerEvent.emit(this.providerEdit);
      this.notificationService.showSuccess(`PROVIDERS.SAVE.MESSAGE.OK`);
    }
  }

  async updateProvider(): Promise<void> {
    // Actualiza un provider

    this.notificationService.showInfo('PROVIDERS.UPDATE.MESSAGE.INFO');
    const result = await lastValueFrom(
      this.providerService.updateStoreProvider({
        id: this.providerEdit._id,
        body: this.providerEdit,
      })
    ).catch((error) => {
      this.notificationService.showError(`PROVIDERS.UPDATE.MESSAGE.ERROR`);
    });

    if (result) {
      this.providerEdit = result;
      this.providerEvent.emit(this.providerEdit);
      this.notificationService.showSuccess(`PROVIDERS.UPDATE.MESSAGE.OK`);
    }
  }
}
