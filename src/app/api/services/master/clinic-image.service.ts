/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ApiConfiguration } from '../../api-configuration';
import { BaseService } from '../../base-service';
import { ClinicImage } from '../../models/master/clinic-image';
import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';

@Injectable({
  providedIn: 'root',
})
export class ClinicImageService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation createClinicImage
   */
  static readonly CreateClinicImagePath = '/api/clinic-image/save';

  /**
   * Create a new clinicImage.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createClinicImage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  private createClinicImage$Response(params: {
    body: ClinicImage;
  }): Observable<StrictHttpResponse<ClinicImage>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ClinicImageService.CreateClinicImagePath,
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
          return r as StrictHttpResponse<ClinicImage>;
        })
      );
  }

  /**
   * Create a new clinicImage.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createClinicImage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createClinicImage(params: { body: ClinicImage }): Observable<ClinicImage> {
    return this.createClinicImage$Response(params).pipe(
      map((r: StrictHttpResponse<ClinicImage>) => r.body as ClinicImage)
    );
  }

  /**
   * Path part for operation findAllClinicImage
   */
  static readonly FindAllClinicImagePath = '/api/clinic-image/find_all';

  /**
   * Retrieve a list of all clinicImages.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllClinicImage()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findAllClinicImage$Response(params?: {}): Observable<
    StrictHttpResponse<Array<ClinicImage>>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ClinicImageService.FindAllClinicImagePath,
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
          return r as StrictHttpResponse<Array<ClinicImage>>;
        })
      );
  }

  /**
   * Retrieve a list of all clinicImages.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllClinicImage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllClinicImage(params?: {}): Observable<Array<ClinicImage>> {
    return this.findAllClinicImage$Response(params).pipe(
      map(
        (r: StrictHttpResponse<Array<ClinicImage>>) =>
          r.body as Array<ClinicImage>
      )
    );
  }

  /**
   * Path part for operation findOneClinicImage
   */
  static readonly FindOneClinicImagePath = '/api/clinic-image/find_one/{id}';

  /**
   * Retrieve a clinicImage by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOneClinicImage()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findOneClinicImage$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<ClinicImage>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ClinicImageService.FindOneClinicImagePath,
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
          return r as StrictHttpResponse<ClinicImage>;
        })
      );
  }

  /**
   * Retrieve a clinicImage by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findOneClinicImage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOneClinicImage(params: { id: string }): Observable<ClinicImage> {
    return this.findOneClinicImage$Response(params).pipe(
      map((r: StrictHttpResponse<ClinicImage>) => r.body as ClinicImage)
    );
  }

  /**
   * Path part for operation updateClinicImage
   */
  static readonly UpdateClinicImagePath = '/api/clinic-image/update/{id}';

  /**
   * Update a clinicImage by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateClinicImage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  private updateClinicImage$Response(params: {
    id: string;
    body: ClinicImage;
  }): Observable<StrictHttpResponse<ClinicImage>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ClinicImageService.UpdateClinicImagePath,
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
          return r as StrictHttpResponse<ClinicImage>;
        })
      );
  }

  /**
   * Update a clinicImage by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateClinicImage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateClinicImage(params: {
    id: string;
    body: ClinicImage;
  }): Observable<ClinicImage> {
    return this.updateClinicImage$Response(params).pipe(
      map((r: StrictHttpResponse<ClinicImage>) => r.body as ClinicImage)
    );
  }

  /**
   * Path part for operation removeClinicImage
   */
  static readonly RemoveClinicImagePath = '/api/clinic-image/delete/{id}';

  /**
   * Remove a clinicImage by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeClinicImage()` instead.
   *
   * This method doesn't expect any request body.
   */
  private removeClinicImage$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ClinicImageService.RemoveClinicImagePath,
      'delete'
    );
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http
      .request(
        rb.build({
          responseType: 'json',
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
   * To access the full response (for headers, for example), `removeClinicImage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeClinicImage(params: { id: number }): Observable<void> {
    return this.removeClinicImage$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation findAllPagingClinicImage
   */
  static readonly FindAllPagingClinicImagePath =
    '/api/clinic-image/find_all/paging';

  /**
   * Get all clinicImages with pagination.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPagingClinicImage()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findAllPagingClinicImage$Response(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<StrictHttpResponse<Array<ClinicImage>>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ClinicImageService.FindAllPagingClinicImagePath,
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
          return r as StrictHttpResponse<Array<ClinicImage>>;
        })
      );
  }

  /**
   * Get all clinicImages with pagination.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllPagingClinicImage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPagingClinicImage(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<Array<ClinicImage>> {
    return this.findAllPagingClinicImage$Response(params).pipe(
      map(
        (r: StrictHttpResponse<Array<ClinicImage>>) =>
          r.body as Array<ClinicImage>
      )
    );
  }
}
