import { Component, OnInit, Provider } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { NotificationService } from 'src/app/api/services/notification.service';
import { lastValueFrom } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { InventoryCacheService } from 'src/app/api/cache/inventory-cache-service';
import { ProductTypeService } from 'src/app/api/services/inventory/product-type.service';
import { ProductType } from 'src/app/api/models/inventory/product-type';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-types',
  templateUrl: './product-types.component.html',
  styleUrls: ['./product-types.component.css'],
})
export class ProductTypesComponent implements OnInit {
  loading = true;
  filtro: string = '';
  pageIndex = 1;
  pageSize = 10;
  totalResults = 0;
  totalPages = 0;
  visible = false;
  expandSet = new Set<number>();
  isVisible = false;
  productType = new ProductType();
  selectedProductType = new ProductType();

  productTypes: ProductType[] = [];
  page: any;
  size: any;
  filter: any;

  constructor(
    private router: Router,
    private service: ProductTypeService,
    private notificationService: NotificationService,
    private inventoryCache: InventoryCacheService,
    private translateService: TranslateService
  ) {}

  async ngOnInit(): Promise<void> {}

  /**
   * Obtiene la lista de productTypes
   */
  async geProductTypes() {
    this.loading = true;
    this.productTypes = [];
    const response = (await lastValueFrom(
      this.service.findAllPagingProductType({
        filter: this.filtro,
        page: this.pageIndex,
        pageSize: this.pageSize,
      })
    ).catch((error) => {
      this.productTypes = [];
      this.totalResults = 0;
      this.totalPages = 0;
      this.loading = false;
    })) as any;

    if (response) {
      this.productTypes = response.data;
      this.totalResults = response.total_resultados;
      this.totalPages = response.total_paginas > 0 ? response.total_paginas : 1;
      this.loading = false;
    }
  }

  /**
   * Se ejecuta con los cambios de la tabla
   * @param params
   */
  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.geProductTypes();
  }

  showModal(productType?: ProductType) {
    this.isVisible = true;
    this.selectedProductType = productType ? productType : new ProductType();
  }

  productTypeDetail(id: string) {
    this.router.navigate(['dashboard/inventory/productTypes/detail', id]);
  }

  handleCancel() {
    this.isVisible = false;
  }

  search() {
    this.visible = false;
    this.pageIndex = 1;
    this.geProductTypes();
  }

  reset() {
    this.filtro = '';
    this.search();
  }

  onUpdateProductType(productType: any) {
    this.isVisible = false;
    this.geProductTypes();
  }

  /**
   * Remove a registry
   * @param registro
   */
  async delete(element: ProductType): Promise<void> {
    const translationKeys = [
      'DELETE.CONFIRMATION_MESSAGE',
      'DELETE.CONFIRM_BUTTON',
      'DELETE.CANCEL_BUTTON',
    ];
    const translations = await this.translateService
      .get(translationKeys)
      .toPromise();

    Swal.fire({
      heightAuto: false,
      title: '',
      text: translations['DELETE.CONFIRMATION_MESSAGE'],
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: translations['DELETE.CONFIRM_BUTTON'],
      cancelButtonText: translations['DELETE.CANCEL_BUTTON'],
      confirmButtonColor: '#22bb33',
      cancelButtonColor: '#bb2124',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        element.deleted = true;
        const result = this.save(element);
        if (result) {
          this.pageIndex = 1;
          this.geProductTypes();
          this.notificationService.showSuccess(`DELETE.MESSAGE.OK`);
        }

        console.log(element);
      }
    });
  }


  /**
   * Remove a registry
   * @param registro
   */
  async restore(element: ProductType): Promise<void> {
    const translationKeys = [
      'RESTORE.CONFIRMATION_MESSAGE',
      'CONFIRM_BUTTON',
      'CANCEL_BUTTON',
    ];
    const translations = await this.translateService
      .get(translationKeys)
      .toPromise();

    Swal.fire({
      heightAuto: false,
      title: '',
      text: translations['RESTORE.CONFIRMATION_MESSAGE'],
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: translations['CONFIRM_BUTTON'],
      cancelButtonText: translations['CANCEL_BUTTON'],
      confirmButtonColor: '#22bb33',
      cancelButtonColor: '#bb2124',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        element.deleted = false;
        const result = this.save(element);
        if (result) {
          this.pageIndex = 1;
          this.geProductTypes();
          this.notificationService.showSuccess(`RESTORE.MESSAGE.OK`);
        }
      }
    });
  }

  /**
   *
   */
  private async save(element: ProductType) {
    return await lastValueFrom(
      this.service.updateProductType({ id: element._id, body: element })
    ).catch((error) => {
      this.notificationService.showError(`DELETE.MESSAGE.ERROR`);
    });
  }
}
