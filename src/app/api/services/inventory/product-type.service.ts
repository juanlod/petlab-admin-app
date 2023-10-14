/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ApiConfiguration } from '../../api-configuration';
import { BaseService } from '../../base-service';
import { ProductType } from '../../models/inventory/product-type';
import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';



@Injectable({
  providedIn: 'root',
})
export class ProductTypeService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation createProductType
   */
  static readonly CreateProductTypePath = '/api/productType/save';

  /**
   * Create a new productType.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createProductType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  private createProductType$Response(params: {
    body: ProductType
  }): Observable<StrictHttpResponse<ProductType>> {

    const rb = new RequestBuilder(this.rootUrl, ProductTypeService.CreateProductTypePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductType>;
      })
    );
  }

  /**
   * Create a new productType.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createProductType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createProductType(params: {
    body: ProductType
  }): Observable<ProductType> {

    return this.createProductType$Response(params).pipe(
      map((r: StrictHttpResponse<ProductType>) => r.body as ProductType)
    );
  }

  /**
   * Path part for operation findAllProductType
   */
  static readonly FindAllProductTypePath = '/api/productType/find_all';

  /**
   * Retrieve a list of all productTypes.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllProductType()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findAllProductType$Response(params?: {
  }): Observable<StrictHttpResponse<Array<ProductType>>> {

    const rb = new RequestBuilder(this.rootUrl, ProductTypeService.FindAllProductTypePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ProductType>>;
      })
    );
  }

  /**
   * Retrieve a list of all productTypes.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllProductType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllProductType(params?: {
  }): Observable<Array<ProductType>> {

    return this.findAllProductType$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ProductType>>) => r.body as Array<ProductType>)
    );
  }

  /**
   * Path part for operation findOneProductType
   */
  static readonly FindOneProductTypePath = '/api/productType/find_one/{id}';

  /**
   * Retrieve a productType by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOneProductType()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findOneProductType$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<ProductType>> {

    const rb = new RequestBuilder(this.rootUrl, ProductTypeService.FindOneProductTypePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductType>;
      })
    );
  }

  /**
   * Retrieve a productType by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findOneProductType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOneProductType(params: {
    id: string;
  }): Observable<ProductType> {

    return this.findOneProductType$Response(params).pipe(
      map((r: StrictHttpResponse<ProductType>) => r.body as ProductType)
    );
  }

  /**
   * Path part for operation updateProductType
   */
  static readonly UpdateProductTypePath = '/api/productType/update/{id}';

  /**
   * Update a productType by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateProductType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  private updateProductType$Response(params: {
    id: string;
    body: ProductType
  }): Observable<StrictHttpResponse<ProductType>> {

    const rb = new RequestBuilder(this.rootUrl, ProductTypeService.UpdateProductTypePath, 'patch');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductType>;
      })
    );
  }

  /**
   * Update a productType by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateProductType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProductType(params: {
    id: string;
    body: ProductType
  }): Observable<ProductType> {

    return this.updateProductType$Response(params).pipe(
      map((r: StrictHttpResponse<ProductType>) => r.body as ProductType)
    );
  }

  /**
   * Path part for operation removeProductType
   */
  static readonly RemoveProductTypePath = '/api/productType/delete/{id}';

  /**
   * Remove a productType by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeProductType()` instead.
   *
   * This method doesn't expect any request body.
   */
  private removeProductType$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProductTypeService.RemoveProductTypePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Remove a productType by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeProductType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeProductType(params: {
    id: string;
  }): Observable<void> {

    return this.removeProductType$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation findAllPagingProductType
   */
  static readonly FindAllPagingProductTypePath = '/api/productType/find_all/paging';

  /**
   * Get all productTypes with pagination.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPagingProductType()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findAllPagingProductType$Response(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<StrictHttpResponse<Array<ProductType>>> {

    const rb = new RequestBuilder(this.rootUrl, ProductTypeService.FindAllPagingProductTypePath, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
      rb.query('page', params.page, {});
      rb.query('pageSize', params.pageSize, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ProductType>>;
      })
    );
  }

  /**
   * Get all productTypes with pagination.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllPagingProductType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPagingProductType(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<Array<ProductType>> {

    return this.findAllPagingProductType$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ProductType>>) => r.body as Array<ProductType>)
    );
  }

}
