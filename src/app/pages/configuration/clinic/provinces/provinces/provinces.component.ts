import { Component, OnInit, Provider } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { NotificationService } from 'src/app/api/services/notification.service';
import { lastValueFrom } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { InventoryCacheService } from 'src/app/api/cache/inventory-cache-service';

import { TranslateService } from '@ngx-translate/core';
import { ProvinceService } from 'src/app/api/services/master/province.service';
import { Province } from 'src/app/api/models/master/province';

@Component({
  selector: 'app-provinces',
  templateUrl: './provinces.component.html',
  styleUrls: ['./provinces.component.css'],
})
export class ProvinceComponent implements OnInit {
  loading = true;
  filtro: string = '';
  pageIndex = 1;
  pageSize = 10;
  totalResults = 0;
  totalPages = 0;
  visible = false;
  expandSet = new Set<number>();
  isVisible = false;
  province = new Province();
  selectedProvince = new Province();

  provinces: Province[] = [];

  size: any;
  filter: any;

  constructor(
    private router: Router,
    private service: ProvinceService,
    private notificationService: NotificationService,
    private inventoryCache: InventoryCacheService,
    private translateService: TranslateService
  ) {}

  async ngOnInit(): Promise<void> {}

  /**
   * Obtiene la lista de provinces
   */
  async getProvince() {
    this.loading = true;
    this.provinces = [];
    const response = (await lastValueFrom(
      this.service.findAllPagingProvince({
        filter: this.filtro,
        page: this.pageIndex,
        pageSize: this.pageSize,
      })
    ).catch((error) => {
      this.provinces = [];
      this.totalResults = 0;
      this.totalPages = 0;
      this.loading = false;
    })) as any;

    if (response) {
      this.provinces = response.data;
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
    this.getProvince();
  }

  showModal(province?: Province) {
    this.isVisible = true;
    this.selectedProvince = province ? province : new Province();
  }

  handleCancel() {
    this.isVisible = false;
  }

  search() {
    this.visible = false;
    this.pageIndex = 1;
    this.getProvince();
  }

  reset() {
    this.filtro = '';
    this.search();
  }

  onUpdateProvince(province: any) {
    this.isVisible = false;
    this.getProvince();
  }

  /**
   * Remove a registry
   * @param registro
   */
  async delete(element: Province): Promise<void> {

    const translationKeys = [
      'DELETE.CONFIRMATION_MESSAGE',
      'DELETE.CONFIRM_BUTTON',
      'DELETE.CANCEL_BUTTON'
    ];
    const translations = await this.translateService.get(translationKeys).toPromise();

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
          this.getProvince();
          this.notificationService.showSuccess(`DELETE.MESSAGE.OK`);
        }
      }
    });
  }

  /**
   *
   */
  private async save(element: Province) {
    return await lastValueFrom(
      this.service.updateProvince({ id: element._id, body: element })
    ).catch((error) => {
      this.notificationService.showError(`DELETE.MESSAGE.ERROR`);
    });
  }
}
