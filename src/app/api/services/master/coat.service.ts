/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ApiConfiguration } from '../../api-configuration';
import { BaseService } from '../../base-service';
import { Coat } from '../../models/master/coat';
import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';


@Injectable({
  providedIn: 'root',
})
export class CoatService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation createCoat
   */
  static readonly CreateCoatPath = '/api/coat/save';

  /**
   * Create a new coat.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createCoat()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  private createCoat$Response(params: {
    body: Coat
  }): Observable<StrictHttpResponse<Coat>> {

    const rb = new RequestBuilder(this.rootUrl, CoatService.CreateCoatPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Coat>;
      })
    );
  }

  /**
   * Create a new coat.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createCoat$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCoat(params: {
    body: Coat
  }): Observable<Coat> {

    return this.createCoat$Response(params).pipe(
      map((r: StrictHttpResponse<Coat>) => r.body as Coat)
    );
  }

  /**
   * Path part for operation findAllCoat
   */
  static readonly FindAllCoatPath = '/api/coat/find_all';

  /**
   * Retrieve a list of all coats.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllCoat()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllCoat$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Coat>>> {

    const rb = new RequestBuilder(this.rootUrl, CoatService.FindAllCoatPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Coat>>;
      })
    );
  }

  /**
   * Retrieve a list of all coats.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllCoat$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllCoat(params?: {
  }): Observable<Array<Coat>> {

    return this.findAllCoat$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Coat>>) => r.body as Array<Coat>)
    );
  }

  /**
   * Path part for operation findOneCoat
   */
  static readonly FindOneCoatPath = '/api/coat/find_one/{id}';

  /**
   * Retrieve a coat by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOneCoat()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOneCoat$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<Coat>> {

    const rb = new RequestBuilder(this.rootUrl, CoatService.FindOneCoatPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Coat>;
      })
    );
  }

  /**
   * Retrieve a coat by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findOneCoat$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOneCoat(params: {
    id: string;
  }): Observable<Coat> {

    return this.findOneCoat$Response(params).pipe(
      map((r: StrictHttpResponse<Coat>) => r.body as Coat)
    );
  }

  /**
   * Path part for operation updateCoat
   */
  static readonly UpdateCoatPath = '/api/coat/update/{id}';

  /**
   * Update a coat by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCoat()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCoat$Response(params: {
    id: string;
    body: Coat
  }): Observable<StrictHttpResponse<Coat>> {

    const rb = new RequestBuilder(this.rootUrl, CoatService.UpdateCoatPath, 'patch');
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
        return r as StrictHttpResponse<Coat>;
      })
    );
  }

  /**
   * Update a coat by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateCoat$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCoat(params: {
    id: string;
    body: Coat
  }): Observable<Coat> {

    return this.updateCoat$Response(params).pipe(
      map((r: StrictHttpResponse<Coat>) => r.body as Coat)
    );
  }

  /**
   * Path part for operation removeCoat
   */
  static readonly RemoveCoatPath = '/api/coat/delete/{id}';

  /**
   * Remove a coat by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeCoat()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeCoat$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CoatService.RemoveCoatPath, 'delete');
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
   * Remove a coat by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeCoat$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeCoat(params: {
    id: string;
  }): Observable<void> {

    return this.removeCoat$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation findAllPagingCoat
   */
  static readonly FindAllPagingCoatPath = '/api/coat/find_all/paging';

  /**
   * Get all coats with pagination.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPagingCoat()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPagingCoat$Response(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<StrictHttpResponse<Array<Coat>>> {

    const rb = new RequestBuilder(this.rootUrl, CoatService.FindAllPagingCoatPath, 'get');
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
        return r as StrictHttpResponse<Array<Coat>>;
      })
    );
  }

  /**
   * Get all coats with pagination.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllPagingCoat$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPagingCoat(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<Array<Coat>> {

    return this.findAllPagingCoat$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Coat>>) => r.body as Array<Coat>)
    );
  }

}
