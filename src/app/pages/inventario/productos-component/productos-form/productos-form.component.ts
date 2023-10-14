import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { ProductService } from 'src/app/api/services/inventory/product.service';
import { StoreProviderService } from 'src/app/api/services/inventory/store-provider.service';
import { ProductTypeService } from 'src/app/api/services/inventory/product-type.service';
import { UnityTypeService } from 'src/app/api/services/inventory/unity-type.service';
import { Product } from 'src/app/api/models/inventory/product';
import { ProductType } from 'src/app/api/models/inventory/product-type';
import { StoreProvider } from 'src/app/api/models/inventory/store-provider';
import { UnityType } from 'src/app/api/models/inventory/unity-type';
import { NotificationService } from 'src/app/api/services/notification.service';
import { InventoryCacheService } from 'src/app/api/cache/inventory-cache-service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './productos-form.component.html',
  styleUrls: ['./productos-form.component.css'],
})
export class ProductosFormComponent implements OnInit {
  @Output() productoEvent = new EventEmitter<object>();
  @Input() product = new Product();

  titulo: string = 'Nuevo producto';

  // SELECT DE COMBOS
  providers: Array<StoreProvider> = [];
  unities: Array<UnityType> = [];
  productTypes: Array<ProductType> = [];

  form: any;
  submitted: boolean = false;

  constructor(
    public productoService: ProductService,
    public proveedorService: StoreProviderService,
    public tipoProductService: ProductTypeService,
    public tipoUnidadService: UnityTypeService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private inventoryCache: InventoryCacheService
  ) {}

  async ngOnInit(): Promise<void> {
    const [productTypes, providers, unities] = await Promise.all([
      this.inventoryCache.getProductTypes(),
      this.inventoryCache.getProviders(),
      this.inventoryCache.getUnities(),
    ]);

    this.productTypes = productTypes;
    this.providers = providers;
    this.unities = unities;
  }

  /**
   * Guarda y actualiza un producto
   */
  async save(): Promise<void> {
    this.submitted = true;

    if (!this.product.name) {
      return;
    }

    this.notificationService.showInfo('PRODUCTS.UPDATE.MESSAGE.INFO');
    const result = await lastValueFrom(
      this.productoService.createProduct({ body: this.product })
    ).catch((error) => {
      this.notificationService.showError(`PRODUCTS.SAVE.MESSAGE.ERROR`);
    });
    if (result) {
      this.notificationService.showSuccess(`PRODUCTS.SAVE.MESSAGE.OK`);
      this.router.navigate(['dashboard/inventory/products/detail', result._id]);
    }
  }

  async update(): Promise<void> {
    // Actualiza un producto

    this.notificationService.showInfo('PRODUCTS.UPDATE.MESSAGE.INFO');
    const result = await lastValueFrom(
      this.productoService.updateProduct({
        id: this.product._id,
        body: this.product,
      })
    ).catch((error) => {
      this.notificationService.showError(`PRODUCTS.UPDATE.MESSAGE.ERROR`);
    });

    if (result) {
      this.product = result;
      this.productoEvent.emit(this.product);
      this.notificationService.showSuccess(`PRODUCTS.UPDATE.MESSAGE.OK`);
    }
  }
}
