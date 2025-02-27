import { Component, OnInit, Provider } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { NotificationService } from 'src/app/api/services/notification.service';
import { lastValueFrom } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { TranslateService } from '@ngx-translate/core';
import { ClinicImageConfigurationService } from 'src/app/api/services/master/clinic-image-configuration.service';
import { ClinicImageConfiguration } from 'src/app/api/models/master/clinic-image-configuration';
import { CommonComponent } from 'src/app/api/common/common.component';


@Component({
  selector: 'app-clinic-images',
  templateUrl: './clinic-images.component.html',
  styleUrls: ['./clinic-images.component.css'],
})
export class ClinicImagesComponent extends CommonComponent implements OnInit {
  loading = true;
  filtro: string = '';
  pageIndex = 1;
  pageSize = 10;
  totalResults = 0;
  totalPages = 0;
  visible = false;
  expandSet = new Set<number>();
  isVisible = false;
  image = new ClinicImageConfiguration();
  selectedClinicImage = new ClinicImageConfiguration();

  images: ClinicImageConfiguration[] = [];

  size: any;
  filter: any;

  constructor(
    private router: Router,
    private service: ClinicImageConfigurationService,
    private notificationService: NotificationService,
    private translateService: TranslateService,
  ) {
    super()
  }

  async ngOnInit(): Promise<void> {}


  /**
   * Obtiene la lista de images
   */
  async getClinicImage() {
    this.loading = true;
    this.images = [];
    const response = (await lastValueFrom(
      this.service.findAllPagingClinicImageConfiguration({
        filter: this.filtro,
        page: this.pageIndex,
        pageSize: this.pageSize,
      })
    ).catch((error) => {
      this.images = [];
      this.totalResults = 0;
      this.totalPages = 0;
      this.loading = false;
    })) as any;

    if (response) {
      this.images = response.data;
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
    this.getClinicImage();
  }

  showModal(image?: ClinicImageConfiguration) {
    this.isVisible = true;
    this.selectedClinicImage = image ?  this.decryptAllFields(image) : new ClinicImageConfiguration();
  }

  handleCancel() {
    this.isVisible = false;
  }

  search() {
    this.visible = false;
    this.pageIndex = 1;
    this.getClinicImage();
  }

  reset() {
    this.filtro = '';
    this.search();
  }

  onUpdateClinicImage(image: any) {
    this.isVisible = false;
    this.getClinicImage();
  }

  /**
   * Remove a registry
   * @param registro
   */
  async delete(element: ClinicImageConfiguration): Promise<void> {
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
         this.service.removeClinicImageConfiguration({id : element.id}).subscribe({
          next: () => {
            this.pageIndex = 1;
            this.getClinicImage();
            this.notificationService.showSuccess(`DELETE.MESSAGE.OK`);
          },
          error: (error) => {
            this.notificationService.showSuccess(`DELETE.MESSAGE.KO`);
          }
        }

        );
      }
    });
  }


}
