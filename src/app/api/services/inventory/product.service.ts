/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ApiConfiguration } from '../../api-configuration';
import { BaseService } from '../../base-service';
import { Product } from '../../models/inventory/product';
import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation createProduct
   */
  static readonly CreateProductPath = '/api/product/save';

  /**
   * Create a new product.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createProduct()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  private createProduct$Response(params: {
    body: Product
  }): Observable<StrictHttpResponse<Product>> {

    const rb = new RequestBuilder(this.rootUrl, ProductService.CreateProductPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Product>;
      })
    );
  }

  /**
   * Create a new product.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createProduct$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createProduct(params: {
    body: Product
  }): Observable<Product> {

    return this.createProduct$Response(params).pipe(
      map((r: StrictHttpResponse<Product>) => r.body as Product)
    );
  }

  /**
   * Path part for operation findAllProduct
   */
  static readonly FindAllProductPath = '/api/product/find_all';

  /**
   * Retrieve a list of all products.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllProduct()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findAllProduct$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Product>>> {

    const rb = new RequestBuilder(this.rootUrl, ProductService.FindAllProductPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Product>>;
      })
    );
  }

  /**
   * Retrieve a list of all products.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllProduct$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllProduct(params?: {
  }): Observable<Array<Product>> {

    return this.findAllProduct$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Product>>) => r.body as Array<Product>)
    );
  }

  /**
   * Path part for operation findOneProduct
   */
  static readonly FindOneProductPath = '/api/product/find_one/{id}';

  /**
   * Retrieve a product by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOneProduct()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findOneProduct$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<Product>> {

    const rb = new RequestBuilder(this.rootUrl, ProductService.FindOneProductPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Product>;
      })
    );
  }

  /**
   * Retrieve a product by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findOneProduct$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOneProduct(params: {
    id: string;
  }): Observable<Product> {

    return this.findOneProduct$Response(params).pipe(
      map((r: StrictHttpResponse<Product>) => r.body as Product)
    );
  }

  /**
   * Path part for operation updateProduct
   */
  static readonly UpdateProductPath = '/api/product/update/{id}';

  /**
   * Update a product by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateProduct()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  private updateProduct$Response(params: {
    id: string;
    body: Product
  }): Observable<StrictHttpResponse<Product>> {

    const rb = new RequestBuilder(this.rootUrl, ProductService.UpdateProductPath, 'patch');
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
        return r as StrictHttpResponse<Product>;
      })
    );
  }

  /**
   * Update a product by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateProduct$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProduct(params: {
    id: string;
    body: Product
  }): Observable<Product> {

    return this.updateProduct$Response(params).pipe(
      map((r: StrictHttpResponse<Product>) => r.body as Product)
    );
  }

  /**
   * Path part for operation removeProduct
   */
  static readonly RemoveProductPath = '/api/product/delete/{id}';

  /**
   * Remove a product by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeProduct()` instead.
   *
   * This method doesn't expect any request body.
   */
  private removeProduct$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProductService.RemoveProductPath, 'delete');
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
   * Remove a product by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeProduct$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeProduct(params: {
    id: string;
  }): Observable<void> {

    return this.removeProduct$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation findAllPagingProduct
   */
  static readonly FindAllPagingProductPath = '/api/product/find_all/paging';

  /**
   * Get all products with pagination.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPagingProduct()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findAllPagingProduct$Response(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<StrictHttpResponse<Array<Product>>> {

    const rb = new RequestBuilder(this.rootUrl, ProductService.FindAllPagingProductPath, 'get');
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
        return r as StrictHttpResponse<Array<Product>>;
      })
    );
  }

  /**
   * Get all products with pagination.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllPagingProduct$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPagingProduct(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<Array<Product>> {

    return this.findAllPagingProduct$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Product>>) => r.body as Array<Product>)
    );
  }

}
