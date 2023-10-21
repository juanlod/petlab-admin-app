/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ApiConfiguration } from '../../api-configuration';
import { BaseService } from '../../base-service';
import { ClinicImageConfiguration } from '../../models/master/clinic-image-configuration';
import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';


@Injectable({
  providedIn: 'root',
})
export class ClinicImageConfigurationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation createClinicImageConfiguration
   */
  static readonly CreateClinicImageConfigurationPath =
    '/api/clinic-image-configuarion/save';

  /**
   * Create a new clinicImage.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createClinicImageConfiguration()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createClinicImageConfiguration$Response(params: {
    body: ClinicImageConfiguration;
  }): Observable<StrictHttpResponse<ClinicImageConfiguration>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ClinicImageConfigurationService.CreateClinicImageConfigurationPath,
      'post'
    );
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/json',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<ClinicImageConfiguration>;
        })
      );
  }

  /**
   * Create a new clinicImage.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createClinicImageConfiguration$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createClinicImageConfiguration(params: {
    body: ClinicImageConfiguration;
  }): Observable<ClinicImageConfiguration> {
    return this.createClinicImageConfiguration$Response(params).pipe(
      map(
        (r: StrictHttpResponse<ClinicImageConfiguration>) =>
          r.body as ClinicImageConfiguration
      )
    );
  }

  /**
   * Path part for operation findAllClinicImageConfiguration
   */
  static readonly FindAllClinicImageConfigurationPath =
    '/api/clinic-image-configuarion/find_all';

  /**
   * Retrieve a list of all clinicImages.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllClinicImageConfiguration()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findAllClinicImageConfiguration$Response(params?: {}): Observable<
    StrictHttpResponse<Array<ClinicImageConfiguration>>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ClinicImageConfigurationService.FindAllClinicImageConfigurationPath,
      'get'
    );
    if (params) {
    }

    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/json',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<Array<ClinicImageConfiguration>>;
        })
      );
  }

  /**
   * Retrieve a list of all clinicImages.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllClinicImageConfiguration$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllClinicImageConfiguration(params?: {}): Observable<
    Array<ClinicImageConfiguration>
  > {
    return this.findAllClinicImageConfiguration$Response(params).pipe(
      map(
        (r: StrictHttpResponse<Array<ClinicImageConfiguration>>) =>
          r.body as Array<ClinicImageConfiguration>
      )
    );
  }

  /**
   * Path part for operation findOneClinicImageConfiguration
   */
  static readonly FindOneClinicImageConfigurationPath =
    '/api/clinic-image-configuarion/find_one/{id}';

  /**
   * Retrieve a clinicImage by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOneClinicImageConfiguration()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findOneClinicImageConfiguration$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<ClinicImageConfiguration>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ClinicImageConfigurationService.FindOneClinicImageConfigurationPath,
      'get'
    );
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/json',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<ClinicImageConfiguration>;
        })
      );
  }

  /**
   * Retrieve a clinicImage by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findOneClinicImageConfiguration$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOneClinicImageConfiguration(params: {
    id: string;
  }): Observable<ClinicImageConfiguration> {
    return this.findOneClinicImageConfiguration$Response(params).pipe(
      map(
        (r: StrictHttpResponse<ClinicImageConfiguration>) =>
          r.body as ClinicImageConfiguration
      )
    );
  }

  /**
   * Path part for operation updateClinicImageConfiguration
   */
  static readonly UpdateClinicImageConfigurationPath =
    '/api/clinic-image-configuarion/update/{id}';

  /**
   * Update a clinicImage by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateClinicImageConfiguration()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  private updateClinicImageConfiguration$Response(params: {
    id: string;
    body: ClinicImageConfiguration;
  }): Observable<StrictHttpResponse<ClinicImageConfiguration>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ClinicImageConfigurationService.UpdateClinicImageConfigurationPath,
      'patch'
    );
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/json',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<ClinicImageConfiguration>;
        })
      );
  }

  /**
   * Update a clinicImage by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateClinicImageConfiguration$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateClinicImageConfiguration(params: {
    id: string;
    body: ClinicImageConfiguration;
  }): Observable<ClinicImageConfiguration> {
    return this.updateClinicImageConfiguration$Response(params).pipe(
      map(
        (r: StrictHttpResponse<ClinicImageConfiguration>) =>
          r.body as ClinicImageConfiguration
      )
    );
  }

  /**
   * Path part for operation removeClinicImageConfiguration
   */
  static readonly RemoveClinicImageConfigurationPath =
    '/api/clinic-image-configuarion/delete/{id}';

  /**
   * Remove a clinicImage by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeClinicImageConfiguration()` instead.
   *
   * This method doesn't expect any request body.
   */
  private removeClinicImageConfiguration$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ClinicImageConfigurationService.RemoveClinicImageConfigurationPath,
      'delete'
    );
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http
      .request(
        rb.build({
          responseType: 'text',
          accept: '*/*',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return (r as HttpResponse<any>).clone({
            body: undefined,
          }) as StrictHttpResponse<void>;
        })
      );
  }

  /**
   * Remove a clinicImage by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeClinicImageConfiguration$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeClinicImageConfiguration(params: { id: number }): Observable<void> {
    return this.removeClinicImageConfiguration$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation findAllPagingClinicImageConfiguration
   */
  static readonly FindAllPagingClinicImageConfigurationPath =
    '/api/clinic-image-configuarion/find_all/paging';

  /**
   * Get all clinicImages with pagination.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPagingClinicImageConfiguration()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findAllPagingClinicImageConfiguration$Response(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<StrictHttpResponse<Array<ClinicImageConfiguration>>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ClinicImageConfigurationService.FindAllPagingClinicImageConfigurationPath,
      'get'
    );
    if (params) {
      rb.query('filter', params.filter, {});
      rb.query('page', params.page, {});
      rb.query('pageSize', params.pageSize, {});
    }

    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/json',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<Array<ClinicImageConfiguration>>;
        })
      );
  }

  /**
   * Get all clinicImages with pagination.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllPagingClinicImageConfiguration$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPagingClinicImageConfiguration(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<Array<ClinicImageConfiguration>> {
    return this.findAllPagingClinicImageConfiguration$Response(params).pipe(
      map(
        (r: StrictHttpResponse<Array<ClinicImageConfiguration>>) =>
          r.body as Array<ClinicImageConfiguration>
      )
    );
  }
}
