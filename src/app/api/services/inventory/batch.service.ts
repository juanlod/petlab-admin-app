/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Batch } from '../../models/inventory/batch';
import { ApiConfiguration } from '../../api-configuration';
import { BaseService } from '../../base-service';
import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';

@Injectable({
  providedIn: 'root',
})
export class BatchService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }


  /**
   * Path part for operation createBatch
   */
  static readonly CreateBatchPath = '/api/batch/save';

  /**
   * Create a new batch.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createBatch()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  private createBatch$Response(params: {
    body: Batch
  }): Observable<StrictHttpResponse<Batch>> {

    const rb = new RequestBuilder(this.rootUrl, BatchService.CreateBatchPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Batch>;
      })
    );
  }

  /**
   * Create a new batch.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createBatch$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createBatch(params: {
    body: Batch
  }): Observable<Batch> {

    return this.createBatch$Response(params).pipe(
      map((r: StrictHttpResponse<Batch>) => r.body as Batch)
    );
  }


  /**
   * Path part for operation findAllBatch
   */
  static readonly FindAllBatchPath = '/api/batch/find_all';

  /**
   * Retrieve a list of all batchs.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllBatch()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findAllBatch$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Batch>>> {

    const rb = new RequestBuilder(this.rootUrl, BatchService.FindAllBatchPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Batch>>;
      })
    );
  }

  /**
   * Retrieve a list of all batchs.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllBatch$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllBatch(params?: {
  }): Observable<Array<Batch>> {

    return this.findAllBatch$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Batch>>) => r.body as Array<Batch>)
    );
  }

  /**
   * Path part for operation findOneBatch
   */
  static readonly FindOneBatchPath = '/api/batch/find_one/{id}';

  /**
   * Retrieve a batch by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOneBatch()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findOneBatch$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<Batch>> {

    const rb = new RequestBuilder(this.rootUrl, BatchService.FindOneBatchPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Batch>;
      })
    );
  }

  /**
   * Retrieve a batch by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findOneBatch$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOneBatch(params: {
    id: string;
  }): Observable<Batch> {

    return this.findOneBatch$Response(params).pipe(
      map((r: StrictHttpResponse<Batch>) => r.body as Batch)
    );
  }

  /**
   * Path part for operation updateBatch
   */
  static readonly UpdateBatchPath = '/api/batch/update/{id}';

  /**
   * Update a batch by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateBatch()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  private updateBatch$Response(params: {
    id: string;
    body: Batch
  }): Observable<StrictHttpResponse<Batch>> {

    const rb = new RequestBuilder(this.rootUrl, BatchService.UpdateBatchPath, 'patch');
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
        return r as StrictHttpResponse<Batch>;
      })
    );
  }

  /**
   * Update a batch by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateBatch$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateBatch(params: {
    id: string;
    body: Batch
  }): Observable<Batch> {

    return this.updateBatch$Response(params).pipe(
      map((r: StrictHttpResponse<Batch>) => r.body as Batch)
    );
  }

  /**
   * Path part for operation removeBatch
   */
  static readonly RemoveBatchPath = '/api/batch/delete/{id}';

  /**
   * Remove a batch by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeBatch()` instead.
   *
   * This method doesn't expect any request body.
   */
  private removeBatch$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BatchService.RemoveBatchPath, 'delete');
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
   * Remove a batch by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeBatch$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeBatch(params: {
    id: string;
  }): Observable<void> {

    return this.removeBatch$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation findAllPagingBatch
   */
  static readonly FindAllPagingBatchPath = '/api/batch/find_all/paging';

  /**
   * Get all batchs with pagination.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPagingBatch()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findAllPagingBatch$Response(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<StrictHttpResponse<Array<Batch>>> {

    const rb = new RequestBuilder(this.rootUrl, BatchService.FindAllPagingBatchPath, 'get');
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
        return r as StrictHttpResponse<Array<Batch>>;
      })
    );
  }

  /**
   * Get all batchs with pagination.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllPagingBatch$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPagingBatch(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<Array<Batch>> {

    return this.findAllPagingBatch$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Batch>>) => r.body as Array<Batch>)
    );
  }

}
