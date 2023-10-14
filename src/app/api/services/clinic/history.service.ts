/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../../base-service';
import { ApiConfiguration } from '../../api-configuration';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { PetHistory } from '../../models/clinic/history';


@Injectable({
  providedIn: 'root',
})
export class PetHistoryService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation createPetHistory
   */
  static readonly CreatePetHistoryPath = '/api/pet-history/save';

  /**
   * Create a new PetHistory.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPetHistory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  private createPetHistory$Response(params: {
    body: PetHistory
  }): Observable<StrictHttpResponse<PetHistory>> {

    const rb = new RequestBuilder(this.rootUrl, PetHistoryService.CreatePetHistoryPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PetHistory>;
      })
    );
  }

  /**
   * Create a new PetHistory.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createPetHistory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPetHistory(params: {
    body: PetHistory
  }): Observable<PetHistory> {

    return this.createPetHistory$Response(params).pipe(
      map((r: StrictHttpResponse<PetHistory>) => r.body as PetHistory)
    );
  }

  /**
   * Path part for operation findAllPetHistory
   */
  static readonly FindAllPetHistoryPath = '/api/pet-history/find_all';

  /**
   * Retrieve a list of all PetHistorys.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPetHistory()` instead.
   *
   * This method doesn't expect any request body.
   */
  private  findAllPetHistory$Response(params?: {
  }): Observable<StrictHttpResponse<Array<PetHistory>>> {

    const rb = new RequestBuilder(this.rootUrl, PetHistoryService.FindAllPetHistoryPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PetHistory>>;
      })
    );
  }

  /**
   * Retrieve a list of all PetHistorys.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllPetHistory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPetHistory(params?: {
  }): Observable<Array<PetHistory>> {

    return this.findAllPetHistory$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PetHistory>>) => r.body as Array<PetHistory>)
    );
  }

  /**
   * Path part for operation findOnePetHistory
   */
  static readonly FindOnePetHistoryPath = '/api/pet-history/find_one/{id}';

  /**
   * Retrieve a PetHistory by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOnePetHistory()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findOnePetHistory$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<PetHistory>> {

    const rb = new RequestBuilder(this.rootUrl, PetHistoryService.FindOnePetHistoryPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PetHistory>;
      })
    );
  }

  /**
   * Retrieve a PetHistory by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findOnePetHistory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOnePetHistory(params: {
    id: string;
  }): Observable<PetHistory> {

    return this.findOnePetHistory$Response(params).pipe(
      map((r: StrictHttpResponse<PetHistory>) => r.body as PetHistory)
    );
  }

/**
   * Path part for operation findByIdm
   */
static readonly FindByIdmPath = '/api/pet-history/find_by_idm/{id}';

/**
 * Retrieve a history list by idm.
 *
 *
 *
 * This method provides access to the full `HttpResponse`, allowing access to response headers.
 * To access only the response body, use `findByIdm()` instead.
 *
 * This method doesn't expect any request body.
 */
findByIdm$Response(params: {
  id: number;
  skip: number;
  loadedCount: number;
}): Observable<StrictHttpResponse<PetHistory>> {

  const rb = new RequestBuilder(this.rootUrl, PetHistoryService.FindByIdmPath, 'get');
  if (params) {
    rb.path('id', params.id, {});
    rb.query('skip', params.skip, {});
    rb.query('loadedCount', params.loadedCount, {});
  }

  return this.http.request(rb.build({
    responseType: 'json',
    accept: 'application/json'
  })).pipe(
    filter((r: any) => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PetHistory>;
    })
  );
}

/**
 * Retrieve a history list by idm.
 *
 *
 *
 * This method provides access to only to the response body.
 * To access the full response (for headers, for example), `findByIdm$Response()` instead.
 *
 * This method doesn't expect any request body.
 */
findByIdm(params: {
  id: number;
  skip: number;
  loadedCount: number;
}): Observable<PetHistory> {

  return this.findByIdm$Response(params).pipe(
    map((r: StrictHttpResponse<PetHistory>) => r.body as PetHistory)
  );
}

  /**
   * Path part for operation updatePetHistory
   */
  static readonly UpdatePetHistoryPath = '/api/pet-history/update/{id}';

  /**
   * Update a PetHistory by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePetHistory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  private updatePetHistory$Response(params: {
    id: string;
    body: PetHistory
  }): Observable<StrictHttpResponse<PetHistory>> {

    const rb = new RequestBuilder(this.rootUrl, PetHistoryService.UpdatePetHistoryPath, 'patch');
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
        return r as StrictHttpResponse<PetHistory>;
      })
    );
  }

  /**
   * Update a PetHistory by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePetHistory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePetHistory(params: {
    id: string;
    body: PetHistory
  }): Observable<PetHistory> {

    return this.updatePetHistory$Response(params).pipe(
      map((r: StrictHttpResponse<PetHistory>) => r.body as PetHistory)
    );
  }

  /**
   * Path part for operation removePetHistory
   */
  static readonly RemovePetHistoryPath = '/api/pet-history/delete/{id}';

  /**
   * Remove a PetHistory by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removePetHistory()` instead.
   *
   * This method doesn't expect any request body.
   */
  private removePetHistory$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PetHistoryService.RemovePetHistoryPath, 'delete');
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
   * Remove a PetHistory by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removePetHistory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removePetHistory(params: {
    id: string;
  }): Observable<void> {

    return this.removePetHistory$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation findAllPagingPetHistory
   */
  static readonly FindAllPagingPetHistoryPath = '/api/pet-history/find_all/paging';

  /**
   * Get all PetHistorys with pagination.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPagingPetHistory()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findAllPagingPetHistory$Response(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<StrictHttpResponse<Array<PetHistory>>> {

    const rb = new RequestBuilder(this.rootUrl, PetHistoryService.FindAllPagingPetHistoryPath, 'get');
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
        return r as StrictHttpResponse<Array<PetHistory>>;
      })
    );
  }

  /**
   * Get all PetHistorys with pagination.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllPagingPetHistory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPagingPetHistory(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<Array<PetHistory>> {

    return this.findAllPagingPetHistory$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PetHistory>>) => r.body as Array<PetHistory>)
    );
  }

}
