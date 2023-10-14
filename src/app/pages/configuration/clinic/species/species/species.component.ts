import { Component, OnInit, Provider } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { NotificationService } from 'src/app/api/services/notification.service';
import { lastValueFrom } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { InventoryCacheService } from 'src/app/api/cache/inventory-cache-service';

import { TranslateService } from '@ngx-translate/core';

import { MasterCacheService } from 'src/app/api/cache/master-cache-service';
import { SpeciesService } from 'src/app/api/services/master/species.service';
import { Species } from 'src/app/api/models/master/species';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css'],
})
export class SpeciesComponent implements OnInit {
  loading = true;
  filtro: string = '';
  pageIndex = 1;
  pageSize = 10;
  totalResults = 0;
  totalPages = 0;
  visible = false;
  expandSet = new Set<number>();
  isVisible = false;
  specie = new Species();
  selectedSpecies = new Species();

  species: Species[] = [];

  size: any;
  filter: any;

  constructor(
    private router: Router,
    private service: SpeciesService,
    private notificationService: NotificationService,
    private inventoryCache: InventoryCacheService,
    private translateService: TranslateService,
    private masterCacheService: MasterCacheService
  ) {}

  async ngOnInit(): Promise<void> {}


  /**
   * Obtiene la lista de species
   */
  async getSpecies() {
    this.loading = true;
    this.species = [];
    const response = (await lastValueFrom(
      this.service.findAllPagingSpecies({
        filter: this.filtro,
        page: this.pageIndex,
        pageSize: this.pageSize,
      })
    ).catch((error) => {
      this.species = [];
      this.totalResults = 0;
      this.totalPages = 0;
      this.loading = false;
    })) as any;

    if (response) {
      this.species = response.data;
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
    this.getSpecies();
  }

  showModal(specie?: Species) {
    this.isVisible = true;
    this.selectedSpecies = specie ? specie : new Species();
  }

  handleCancel() {
    this.isVisible = false;
  }

  search() {
    this.visible = false;
    this.pageIndex = 1;
    this.getSpecies();
  }

  reset() {
    this.filtro = '';
    this.search();
  }

  onUpdateSpecies(specie: any) {
    this.isVisible = false;
    this.getSpecies();
  }

  /**
   * Remove a registry
   * @param registro
   */
  async delete(element: Species): Promise<void> {
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
          this.getSpecies();
          this.notificationService.showSuccess(`DELETE.MESSAGE.OK`);
        }
      }
    });
  }

  /**
   *
   */
  private async save(element: Species) {
    return await lastValueFrom(
      this.service.updateSpecies({ id: element._id, body: element })
    ).catch((error) => {
      this.notificationService.showError(`DELETE.MESSAGE.ERROR`);
    });
  }

}
