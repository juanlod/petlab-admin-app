import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/api/services/inventory/product.service';
import { Product } from 'src/app/api/models/inventory/product';
import { NotificationService } from 'src/app/api/services/notification.service';
import { lastValueFrom } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { InventoryCacheService } from 'src/app/api/cache/inventory-cache-service';
import { CommonComponent } from 'src/app/api/common/common.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent extends CommonComponent implements OnInit {

  loading = true;
  filtro: string = '';
  pageIndex = 1;
  pageSize = 10;
  totalResults = 0;
  totalPages = 0;
  visible = false;
  expandSet = new Set<number>();
  isVisible = false;
  product = new Product();

  products: Product[] = [];
  page: any;
  size: any;
  filter: any;

  productTypes = [];
  providers = [];
  unities = [];

  constructor(
    private router: Router,
    private service: ProductService,
    private notificationService: NotificationService,
    private inventoryCache: InventoryCacheService
  ) {
    super()
  }

  async ngOnInit(): Promise<void> {
    const [productTypes, providers, unities] = await Promise.all([
      this.inventoryCache.getProductTypes(),
      this.inventoryCache.getProviders(),
      this.inventoryCache.getUnities(),
    ]);

    this.productTypes = productTypes;
    this.providers = providers;
    this.unities = unities;

    if (this.window.innerWidth <= this.mobileWindowSize) {
      this.getProducts();
    }
  }

  /**
   * Obtiene la lista de products
   */
  async getProducts() {
    this.loading = true;
    this.products = [];
    const response = (await lastValueFrom(
      this.service.findAllPagingProduct({
        filter: this.filtro,
        page: this.pageIndex,
        pageSize: this.pageSize,
      })
    ).catch((error) => {
      this.products = [];
      this.totalResults = 0;
      this.totalPages = 0;
      this.loading = false;
    })) as any;


    if (response) {
      this.products = response.data;
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
    this.getProducts();
  }

  showModal() {
    this.isVisible = true;
  }

  productDetail(id: string) {
    this.router.navigate(['dashboard/inventory/products/detail', id])
  }

  handleCancel() {
    this.isVisible = false;
  }

  search() {
    this.visible = false;
    this.pageIndex = 1;
    this.getProducts();
  }

  reset() {
    this.filtro = '';
    this.search();
  }


  findProductType(id: number) {
    return this.productTypes.find((p) => p.id === id);
  }

  findProvider(id: number) {
    return this.providers.find((p) => p.id === id);
  }

  findUnity(id: number) {
    return this.unities.find((p) => p.id === id);
  }
}
