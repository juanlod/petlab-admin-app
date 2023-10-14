import { Component, OnInit, Provider } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { NotificationService } from 'src/app/api/services/notification.service';
import { lastValueFrom } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { InventoryCacheService } from 'src/app/api/cache/inventory-cache-service';

import { TranslateService } from '@ngx-translate/core';
import { LocalityService } from 'src/app/api/services/master/locality.service';
import { Locality } from 'src/app/api/models/master/locality';
import { Province } from 'src/app/api/models/master/province';
import { MasterCacheService } from 'src/app/api/cache/master-cache-service';

@Component({
  selector: 'app-localities',
  templateUrl: './localities.component.html',
  styleUrls: ['./localities.component.css'],
})
export class LocalityComponent implements OnInit {
  loading = true;
  filtro: string = '';
  pageIndex = 1;
  pageSize = 10;
  totalResults = 0;
  totalPages = 0;
  visible = false;
  expandSet = new Set<number>();
  isVisible = false;
  locality = new Locality();
  selectedLocality = new Locality();

  localities: Locality[] = [];
  provinces: Province[] = [];

  size: any;
  filter: any;

  constructor(
    private router: Router,
    private service: LocalityService,
    private notificationService: NotificationService,
    private inventoryCache: InventoryCacheService,
    private translateService: TranslateService,
    private masterCacheService: MasterCacheService
  ) {}

  async ngOnInit(): Promise<void> {
    // Load master data
    const [provinces] = await Promise.all([
      this.masterCacheService.getProvinces(),
    ]);
    this.provinces = provinces;
  }

  /**
   * Obtiene la lista de localities
   */
  async getLocality() {
    this.loading = true;
    this.localities = [];
    const response = (await lastValueFrom(
      this.service.findAllPagingLocality({
        filter: this.filtro,
        page: this.pageIndex,
        pageSize: this.pageSize,
      })
    ).catch((error) => {
      this.localities = [];
      this.totalResults = 0;
      this.totalPages = 0;
      this.loading = false;
    })) as any;

    if (response) {
      this.localities = response.data;
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
    this.getLocality();
  }

  showModal(locality?: Locality) {
    this.isVisible = true;
    this.selectedLocality = locality ? locality : new Locality();
  }

  handleCancel() {
    this.isVisible = false;
  }

  search() {
    this.visible = false;
    this.pageIndex = 1;
    this.getLocality();
  }

  reset() {
    this.filtro = '';
    this.search();
  }

  onUpdateLocality(locality: any) {
    this.isVisible = false;
    this.getLocality();
  }

  /**
   * Remove a registry
   * @param registro
   */
  async delete(element: Locality): Promise<void> {
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
          this.getLocality();
          this.notificationService.showSuccess(`DELETE.MESSAGE.OK`);
        }
      }
    });
  }

  /**
   *
   */
  private async save(element: Locality) {
    return await lastValueFrom(
      this.service.updateLocality({ id: element._id, body: element })
    ).catch((error) => {
      this.notificationService.showError(`DELETE.MESSAGE.ERROR`);
    });
  }

    /**
   * Gets the province name
   * @param provinceId
   * @returns
   */
    getProvinceName(provinceId: number): string {
      if (provinceId) {
        const province = this.provinces.find((p) => p.id === provinceId);
        return province ? province.nom : '';
      }
      return null;
    }
}
