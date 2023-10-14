/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ApiConfiguration } from '../../api-configuration';
import { BaseService } from '../../base-service';
import { Locality } from '../../models/master/locality';
import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';



@Injectable({
  providedIn: 'root',
})
export class LocalityService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation createLocality
   */
  static readonly CreateLocalityPath = '/api/locality/save';

  /**
   * Create a new locality.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createLocality()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createLocality$Response(params: {
    body: Locality
  }): Observable<StrictHttpResponse<Locality>> {

    const rb = new RequestBuilder(this.rootUrl, LocalityService.CreateLocalityPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Locality>;
      })
    );
  }

  /**
   * Create a new locality.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createLocality$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createLocality(params: {
    body: Locality
  }): Observable<Locality> {

    return this.createLocality$Response(params).pipe(
      map((r: StrictHttpResponse<Locality>) => r.body as Locality)
    );
  }

  /**
   * Path part for operation findAllLocality
   */
  static readonly FindAllLocalityPath = '/api/locality/find_all';

  /**
   * Retrieve a list of all localities.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllLocality()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllLocality$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Locality>>> {

    const rb = new RequestBuilder(this.rootUrl, LocalityService.FindAllLocalityPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Locality>>;
      })
    );
  }

  /**
   * Retrieve a list of all localities.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllLocality$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllLocality(params?: {
  }): Observable<Array<Locality>> {

    return this.findAllLocality$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Locality>>) => r.body as Array<Locality>)
    );
  }

  /**
   * Path part for operation findOneLocality
   */
  static readonly FindOneLocalityPath = '/api/locality/find_one/{id}';

  /**
   * Retrieve a locality by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOneLocality()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOneLocality$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<Locality>> {

    const rb = new RequestBuilder(this.rootUrl, LocalityService.FindOneLocalityPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Locality>;
      })
    );
  }

  /**
   * Retrieve a locality by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findOneLocality$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOneLocality(params: {
    id: string;
  }): Observable<Locality> {

    return this.findOneLocality$Response(params).pipe(
      map((r: StrictHttpResponse<Locality>) => r.body as Locality)
    );
  }

  /**
   * Path part for operation updateLocality
   */
  static readonly UpdateLocalityPath = '/api/locality/update/{id}';

  /**
   * Update a locality by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateLocality()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateLocality$Response(params: {
    id: string;
    body: Locality
  }): Observable<StrictHttpResponse<Locality>> {

    const rb = new RequestBuilder(this.rootUrl, LocalityService.UpdateLocalityPath, 'patch');
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
        return r as StrictHttpResponse<Locality>;
      })
    );
  }

  /**
   * Update a locality by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateLocality$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateLocality(params: {
    id: string;
    body: Locality
  }): Observable<Locality> {

    return this.updateLocality$Response(params).pipe(
      map((r: StrictHttpResponse<Locality>) => r.body as Locality)
    );
  }

  /**
   * Path part for operation removeLocality
   */
  static readonly RemoveLocalityPath = '/api/locality/delete/{id}';

  /**
   * Remove a locality by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeLocality()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeLocality$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, LocalityService.RemoveLocalityPath, 'delete');
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
   * Remove a locality by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeLocality$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeLocality(params: {
    id: string;
  }): Observable<void> {

    return this.removeLocality$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation findAllPagingLocality
   */
  static readonly FindAllPagingLocalityPath = '/api/locality/find_all/paging';

  /**
   * Get all localities with pagination.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPagingLocality()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPagingLocality$Response(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<StrictHttpResponse<Array<Locality>>> {

    const rb = new RequestBuilder(this.rootUrl, LocalityService.FindAllPagingLocalityPath, 'get');
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
        return r as StrictHttpResponse<Array<Locality>>;
      })
    );
  }

  /**
   * Get all localities with pagination.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllPagingLocality$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPagingLocality(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<Array<Locality>> {

    return this.findAllPagingLocality$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Locality>>) => r.body as Array<Locality>)
    );
  }
}
