import { Component, OnInit, Provider } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { NotificationService } from 'src/app/api/services/notification.service';
import { lastValueFrom } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { InventoryCacheService } from 'src/app/api/cache/inventory-cache-service';
import { UnityType } from 'src/app/api/models/inventory/unity-type';
import { UnityTypeService } from 'src/app/api/services/inventory/unity-type.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-unity-types',
  templateUrl: './unity-types.component.html',
  styleUrls: ['./unity-types.component.css'],
})
export class UnityTypesComponent implements OnInit {
  loading = true;
  filtro: string = '';
  pageIndex = 1;
  pageSize = 10;
  totalResults = 0;
  totalPages = 0;
  visible = false;
  expandSet = new Set<number>();
  isVisible = false;
  unityType = new UnityType();
  selectedUnityType = new UnityType();

  unityTypes: UnityType[] = [];

  size: any;
  filter: any;

  constructor(
    private router: Router,
    private service: UnityTypeService,
    private notificationService: NotificationService,
    private inventoryCache: InventoryCacheService,
    private translateService: TranslateService
  ) {}

  async ngOnInit(): Promise<void> {}

  /**
   * Obtiene la lista de unityTypes
   */
  async getUnityTypes() {
    this.loading = true;
    this.unityTypes = [];
    const response = (await lastValueFrom(
      this.service.findAllPagingUnityType({
        filter: this.filtro,
        page: this.pageIndex,
        pageSize: this.pageSize,
      })
    ).catch((error) => {
      this.unityTypes = [];
      this.totalResults = 0;
      this.totalPages = 0;
      this.loading = false;
    })) as any;

    if (response) {
      this.unityTypes = response.data;
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
    this.getUnityTypes();
  }

  showModal(unityType?: UnityType) {
    this.isVisible = true;
    this.selectedUnityType = unityType ? unityType : new UnityType();
  }

  handleCancel() {
    this.isVisible = false;
  }

  search() {
    this.visible = false;
    this.pageIndex = 1;
    this.getUnityTypes();
  }

  reset() {
    this.filtro = '';
    this.search();
  }

  onUpdateUnityType(unityType: any) {
    this.isVisible = false;
    this.getUnityTypes();
  }

  /**
   * Remove a registry
   * @param registro
   */
  async delete(element: UnityType): Promise<void> {

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
          this.getUnityTypes();
          this.notificationService.showSuccess(`DELETE.MESSAGE.OK`);
        }

        console.log(element)
      }
    });
  }

  /**
   *
   */
  private async save(element: UnityType) {
    return await lastValueFrom(
      this.service.updateUnityType({ id: element._id, body: element })
    ).catch((error) => {
      this.notificationService.showError(`DELETE.MESSAGE.ERROR`);
    });
  }
}
