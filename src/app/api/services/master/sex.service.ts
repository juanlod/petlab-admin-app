/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiConfiguration } from '../../api-configuration';
import { BaseService } from '../../base-service';
import { Sex } from '../../models/master/sex';
import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';


@Injectable({
  providedIn: 'root',
})
export class SexService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation createSex
   */
  static readonly CreateSexPath = '/api/sex/save';

  /**
   * Create a new sex.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createSex()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createSex$Response(params: {
    body: Sex
  }): Observable<StrictHttpResponse<Sex>> {

    const rb = new RequestBuilder(this.rootUrl, SexService.CreateSexPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Sex>;
      })
    );
  }

  /**
   * Create a new sex.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createSex$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createSex(params: {
    body: Sex
  }): Observable<Sex> {

    return this.createSex$Response(params).pipe(
      map((r: StrictHttpResponse<Sex>) => r.body as Sex)
    );
  }

  /**
   * Path part for operation findAllSex
   */
  static readonly FindAllSexPath = '/api/sex/find_all';

  /**
   * Retrieve a list of all sexs.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllSex()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllSex$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Sex>>> {

    const rb = new RequestBuilder(this.rootUrl, SexService.FindAllSexPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Sex>>;
      })
    );
  }

  /**
   * Retrieve a list of all sexs.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllSex$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllSex(params?: {
  }): Observable<Array<Sex>> {

    return this.findAllSex$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Sex>>) => r.body as Array<Sex>)
    );
  }

  /**
   * Path part for operation findOneSex
   */
  static readonly FindOneSexPath = '/api/sex/find_one/{id}';

  /**
   * Retrieve a sex by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOneSex()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOneSex$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<Sex>> {

    const rb = new RequestBuilder(this.rootUrl, SexService.FindOneSexPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Sex>;
      })
    );
  }

  /**
   * Retrieve a sex by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findOneSex$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOneSex(params: {
    id: string;
  }): Observable<Sex> {

    return this.findOneSex$Response(params).pipe(
      map((r: StrictHttpResponse<Sex>) => r.body as Sex)
    );
  }

  /**
   * Path part for operation updateSex
   */
  static readonly UpdateSexPath = '/api/sex/update/{id}';

  /**
   * Update a sex by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateSex()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSex$Response(params: {
    id: string;
    body: Sex
  }): Observable<StrictHttpResponse<Sex>> {

    const rb = new RequestBuilder(this.rootUrl, SexService.UpdateSexPath, 'patch');
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
        return r as StrictHttpResponse<Sex>;
      })
    );
  }

  /**
   * Update a sex by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateSex$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSex(params: {
    id: string;
    body: Sex
  }): Observable<Sex> {

    return this.updateSex$Response(params).pipe(
      map((r: StrictHttpResponse<Sex>) => r.body as Sex)
    );
  }

  /**
   * Path part for operation removeSex
   */
  static readonly RemoveSexPath = '/api/sex/delete/{id}';

  /**
   * Remove a sex by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeSex()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeSex$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SexService.RemoveSexPath, 'delete');
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
   * Remove a sex by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeSex$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeSex(params: {
    id: string;
  }): Observable<void> {

    return this.removeSex$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation findAllPagingSex
   */
  static readonly FindAllPagingSexPath = '/api/sex/find_all/paging';

  /**
   * Get all sexs with pagination.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPagingSex()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPagingSex$Response(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<StrictHttpResponse<Array<Sex>>> {

    const rb = new RequestBuilder(this.rootUrl, SexService.FindAllPagingSexPath, 'get');
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
        return r as StrictHttpResponse<Array<Sex>>;
      })
    );
  }

  /**
   * Get all sexs with pagination.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllPagingSex$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPagingSex(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<Array<Sex>> {

    return this.findAllPagingSex$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Sex>>) => r.body as Array<Sex>)
    );
  }

}
