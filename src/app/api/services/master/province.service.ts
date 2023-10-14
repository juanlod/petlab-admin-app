/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ApiConfiguration } from '../../api-configuration';
import { BaseService } from '../../base-service';
import { Province } from '../../models/master/province';
import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';



@Injectable({
  providedIn: 'root',
})
export class ProvinceService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation createProvince
   */
  static readonly CreateProvincePath = '/api/province/save';

  /**
   * Create a new province.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createProvince()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createProvince$Response(params: {
    body: Province
  }): Observable<StrictHttpResponse<Province>> {

    const rb = new RequestBuilder(this.rootUrl, ProvinceService.CreateProvincePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Province>;
      })
    );
  }

  /**
   * Create a new province.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createProvince$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createProvince(params: {
    body: Province
  }): Observable<Province> {

    return this.createProvince$Response(params).pipe(
      map((r: StrictHttpResponse<Province>) => r.body as Province)
    );
  }

  /**
   * Path part for operation findAllProvince
   */
  static readonly FindAllProvincePath = '/api/province/find_all';

  /**
   * Retrieve a list of all provinces.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllProvince()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllProvince$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Province>>> {

    const rb = new RequestBuilder(this.rootUrl, ProvinceService.FindAllProvincePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Province>>;
      })
    );
  }

  /**
   * Retrieve a list of all provinces.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllProvince$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllProvince(params?: {
  }): Observable<Array<Province>> {

    return this.findAllProvince$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Province>>) => r.body as Array<Province>)
    );
  }

  /**
   * Path part for operation findOneProvince
   */
  static readonly FindOneProvincePath = '/api/province/find_one/{id}';

  /**
   * Retrieve a province by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOneProvince()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOneProvince$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<Province>> {

    const rb = new RequestBuilder(this.rootUrl, ProvinceService.FindOneProvincePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Province>;
      })
    );
  }

  /**
   * Retrieve a province by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findOneProvince$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOneProvince(params: {
    id: string;
  }): Observable<Province> {

    return this.findOneProvince$Response(params).pipe(
      map((r: StrictHttpResponse<Province>) => r.body as Province)
    );
  }

  /**
   * Path part for operation updateProvince
   */
  static readonly UpdateProvincePath = '/api/province/update/{id}';

  /**
   * Update a province by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateProvince()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProvince$Response(params: {
    id: string;
    body: Province
  }): Observable<StrictHttpResponse<Province>> {

    const rb = new RequestBuilder(this.rootUrl, ProvinceService.UpdateProvincePath, 'patch');
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
        return r as StrictHttpResponse<Province>;
      })
    );
  }

  /**
   * Update a province by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateProvince$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProvince(params: {
    id: string;
    body: Province
  }): Observable<Province> {

    return this.updateProvince$Response(params).pipe(
      map((r: StrictHttpResponse<Province>) => r.body as Province)
    );
  }

  /**
   * Path part for operation removeProvince
   */
  static readonly RemoveProvincePath = '/api/province/delete/{id}';

  /**
   * Remove a province by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeProvince()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeProvince$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProvinceService.RemoveProvincePath, 'delete');
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
   * Remove a province by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeProvince$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeProvince(params: {
    id: string;
  }): Observable<void> {

    return this.removeProvince$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation findAllPagingProvince
   */
  static readonly FindAllPagingProvincePath = '/api/province/find_all/paging';

  /**
   * Get all provinces with pagination.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPagingProvince()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPagingProvince$Response(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<StrictHttpResponse<Array<Province>>> {

    const rb = new RequestBuilder(this.rootUrl, ProvinceService.FindAllPagingProvincePath, 'get');
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
        return r as StrictHttpResponse<Array<Province>>;
      })
    );
  }

  /**
   * Get all provinces with pagination.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllPagingProvince$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPagingProvince(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<Array<Province>> {

    return this.findAllPagingProvince$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Province>>) => r.body as Array<Province>)
    );
  }

}
