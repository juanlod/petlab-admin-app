/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ApiConfiguration } from '../../api-configuration';
import { BaseService } from '../../base-service';
import { StoreProvider } from '../../models/inventory/store-provider';
import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';


@Injectable({
  providedIn: 'root',
})
export class StoreProviderService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation createStoreProvider
   */
  static readonly CreateStoreProviderPath = '/api/storeProvider/save';

  /**
   * Create a new storeProvider.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createStoreProvider()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  private createStoreProvider$Response(params: {
    body: StoreProvider
  }): Observable<StrictHttpResponse<StoreProvider>> {

    const rb = new RequestBuilder(this.rootUrl, StoreProviderService.CreateStoreProviderPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<StoreProvider>;
      })
    );
  }

  /**
   * Create a new storeProvider.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createStoreProvider$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createStoreProvider(params: {
    body: StoreProvider
  }): Observable<StoreProvider> {

    return this.createStoreProvider$Response(params).pipe(
      map((r: StrictHttpResponse<StoreProvider>) => r.body as StoreProvider)
    );
  }

  /**
   * Path part for operation findAllStoreProvider
   */
  static readonly FindAllStoreProviderPath = '/api/storeProvider/find_all';

  /**
   * Retrieve a list of all storeProviders.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllStoreProvider()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findAllStoreProvider$Response(params?: {
  }): Observable<StrictHttpResponse<Array<StoreProvider>>> {

    const rb = new RequestBuilder(this.rootUrl, StoreProviderService.FindAllStoreProviderPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<StoreProvider>>;
      })
    );
  }

  /**
   * Retrieve a list of all storeProviders.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllStoreProvider$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllStoreProvider(params?: {
  }): Observable<Array<StoreProvider>> {

    return this.findAllStoreProvider$Response(params).pipe(
      map((r: StrictHttpResponse<Array<StoreProvider>>) => r.body as Array<StoreProvider>)
    );
  }

  /**
   * Path part for operation findOneStoreProvider
   */
  static readonly FindOneStoreProviderPath = '/api/storeProvider/find_one/{id}';

  /**
   * Retrieve a storeProvider by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOneStoreProvider()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findOneStoreProvider$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<StoreProvider>> {

    const rb = new RequestBuilder(this.rootUrl, StoreProviderService.FindOneStoreProviderPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<StoreProvider>;
      })
    );
  }

  /**
   * Retrieve a storeProvider by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findOneStoreProvider$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOneStoreProvider(params: {
    id: string;
  }): Observable<StoreProvider> {

    return this.findOneStoreProvider$Response(params).pipe(
      map((r: StrictHttpResponse<StoreProvider>) => r.body as StoreProvider)
    );
  }

  /**
   * Path part for operation updateStoreProvider
   */
  static readonly UpdateStoreProviderPath = '/api/storeProvider/update/{id}';

  /**
   * Update a storeProvider by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateStoreProvider()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  private updateStoreProvider$Response(params: {
    id: string;
    body: StoreProvider
  }): Observable<StrictHttpResponse<StoreProvider>> {

    const rb = new RequestBuilder(this.rootUrl, StoreProviderService.UpdateStoreProviderPath, 'patch');
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
        return r as StrictHttpResponse<StoreProvider>;
      })
    );
  }

  /**
   * Update a storeProvider by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateStoreProvider$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateStoreProvider(params: {
    id: string;
    body: StoreProvider
  }): Observable<StoreProvider> {

    return this.updateStoreProvider$Response(params).pipe(
      map((r: StrictHttpResponse<StoreProvider>) => r.body as StoreProvider)
    );
  }

  /**
   * Path part for operation removeStoreProvider
   */
  static readonly RemoveStoreProviderPath = '/api/storeProvider/delete/{id}';

  /**
   * Remove a storeProvider by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeStoreProvider()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeStoreProvider$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, StoreProviderService.RemoveStoreProviderPath, 'delete');
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
   * Remove a storeProvider by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeStoreProvider$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeStoreProvider(params: {
    id: string;
  }): Observable<void> {

    return this.removeStoreProvider$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation findAllPagingStoreProvider
   */
  static readonly FindAllPagingStoreProviderPath = '/api/storeProvider/find_all/paging';

  /**
   * Get all storeProviders with pagination.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPagingStoreProvider()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findAllPagingStoreProvider$Response(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<StrictHttpResponse<Array<StoreProvider>>> {

    const rb = new RequestBuilder(this.rootUrl, StoreProviderService.FindAllPagingStoreProviderPath, 'get');
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
        return r as StrictHttpResponse<Array<StoreProvider>>;
      })
    );
  }

  /**
   * Get all storeProviders with pagination.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllPagingStoreProvider$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPagingStoreProvider(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<Array<StoreProvider>> {

    return this.findAllPagingStoreProvider$Response(params).pipe(
      map((r: StrictHttpResponse<Array<StoreProvider>>) => r.body as Array<StoreProvider>)
    );
  }

}
