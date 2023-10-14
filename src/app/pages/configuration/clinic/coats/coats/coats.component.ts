import { Component, OnInit, Provider } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { NotificationService } from 'src/app/api/services/notification.service';
import { lastValueFrom } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { InventoryCacheService } from 'src/app/api/cache/inventory-cache-service';

import { TranslateService } from '@ngx-translate/core';

import { MasterCacheService } from 'src/app/api/cache/master-cache-service';
import { CoatService } from 'src/app/api/services/master/coat.service';
import { Coat } from 'src/app/api/models/master/coat';
import { Race } from 'src/app/api/models/master/race';

@Component({
  selector: 'app-coats',
  templateUrl: './coats.component.html',
  styleUrls: ['./coats.component.css'],
})
export class CoatComponent implements OnInit {
  loading = true;
  filtro: string = '';
  pageIndex = 1;
  pageSize = 10;
  totalResults = 0;
  totalPages = 0;
  visible = false;
  expandSet = new Set<number>();
  isVisible = false;
  coat = new Coat();
  selectedCoat = new Coat();
  coats: Coat[] = [];

  size: any;
  filter: any;

  constructor(
    private router: Router,
    private service: CoatService,
    private notificationService: NotificationService,
    private inventoryCache: InventoryCacheService,
    private translateService: TranslateService,
    private masterCacheService: MasterCacheService
  ) {}

  async ngOnInit(): Promise<void> {

  }


  /**
   * Obtiene la lista de coats
   */
  async getCoat() {
    this.loading = true;
    this.coats = [];
    const response = (await lastValueFrom(
      this.service.findAllPagingCoat({
        filter: this.filtro,
        page: this.pageIndex,
        pageSize: this.pageSize,
      })
    ).catch((error) => {
      this.coats = [];
      this.totalResults = 0;
      this.totalPages = 0;
      this.loading = false;
    })) as any;

    if (response) {
      this.coats = response.data;
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
    this.getCoat();
  }

  showModal(coat?: Coat) {
    this.isVisible = true;
    this.selectedCoat = coat ? coat : new Coat();
  }

  handleCancel() {
    this.isVisible = false;
  }

  search() {
    this.visible = false;
    this.pageIndex = 1;
    this.getCoat();
  }

  reset() {
    this.filtro = '';
    this.search();
  }

  onUpdateCoat(coat: any) {
    this.isVisible = false;
    this.getCoat();
  }

  /**
   * Remove a registry
   * @param registro
   */
  async delete(element: Coat): Promise<void> {
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
          this.getCoat();
          this.notificationService.showSuccess(`DELETE.MESSAGE.OK`);
        }
      }
    });
  }

  /**
   *
   */
  private async save(element: Coat) {
    return await lastValueFrom(
      this.service.updateCoat({ id: element._id, body: element })
    ).catch((error) => {
      this.notificationService.showError(`DELETE.MESSAGE.ERROR`);
    });
  }

}
