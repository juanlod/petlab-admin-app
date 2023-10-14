/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ApiConfiguration } from '../../api-configuration';
import { BaseService } from '../../base-service';
import { UnityType } from '../../models/inventory/unity-type';
import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';

@Injectable({
  providedIn: 'root',
})
export class UnityTypeService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation createUnityType
   */
  static readonly CreateUnityTypePath = '/api/unityType/save';

  /**
   * Create a new unityType.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createUnityType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  private createUnityType$Response(params: {
    body: UnityType;
  }): Observable<StrictHttpResponse<UnityType>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      UnityTypeService.CreateUnityTypePath,
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
          return r as StrictHttpResponse<UnityType>;
        })
      );
  }

  /**
   * Create a new unityType.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createUnityType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUnityType(params: { body: UnityType }): Observable<UnityType> {
    return this.createUnityType$Response(params).pipe(
      map((r: StrictHttpResponse<UnityType>) => r.body as UnityType)
    );
  }

  /**
   * Path part for operation findAllUnityType
   */
  static readonly FindAllUnityTypePath = '/api/unityType/find_all';

  /**
   * Retrieve a list of all unityTypes.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllUnityType()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findAllUnityType$Response(params?: {}): Observable<
    StrictHttpResponse<Array<UnityType>>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      UnityTypeService.FindAllUnityTypePath,
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
          return r as StrictHttpResponse<Array<UnityType>>;
        })
      );
  }

  /**
   * Retrieve a list of all unityTypes.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllUnityType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllUnityType(params?: {}): Observable<Array<UnityType>> {
    return this.findAllUnityType$Response(params).pipe(
      map(
        (r: StrictHttpResponse<Array<UnityType>>) => r.body as Array<UnityType>
      )
    );
  }

  /**
   * Path part for operation findOneUnityType
   */
  static readonly FindOneUnityTypePath = '/api/unityType/find_one/{id}';

  /**
   * Retrieve a unityType by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOneUnityType()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findOneUnityType$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<UnityType>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      UnityTypeService.FindOneUnityTypePath,
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
          return r as StrictHttpResponse<UnityType>;
        })
      );
  }

  /**
   * Retrieve a unityType by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findOneUnityType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOneUnityType(params: { id: string }): Observable<UnityType> {
    return this.findOneUnityType$Response(params).pipe(
      map((r: StrictHttpResponse<UnityType>) => r.body as UnityType)
    );
  }

  /**
   * Path part for operation updateUnityType
   */
  static readonly UpdateUnityTypePath = '/api/unityType/update/{id}';

  /**
   * Update a unityType by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUnityType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  private updateUnityType$Response(params: {
    id: string;
    body: UnityType;
  }): Observable<StrictHttpResponse<UnityType>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      UnityTypeService.UpdateUnityTypePath,
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
          return r as StrictHttpResponse<UnityType>;
        })
      );
  }

  /**
   * Update a unityType by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateUnityType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUnityType(params: {
    id: string;
    body: UnityType;
  }): Observable<UnityType> {
    return this.updateUnityType$Response(params).pipe(
      map((r: StrictHttpResponse<UnityType>) => r.body as UnityType)
    );
  }

  /**
   * Path part for operation removeUnityType
   */
  static readonly RemoveUnityTypePath = '/api/unityType/delete/{id}';

  /**
   * Remove a unityType by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeUnityType()` instead.
   *
   * This method doesn't expect any request body.
   */
  private removeUnityType$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      UnityTypeService.RemoveUnityTypePath,
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
   * Remove a unityType by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeUnityType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeUnityType(params: { id: string }): Observable<void> {
    return this.removeUnityType$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation findAllPagingUnityType
   */
  static readonly FindAllPagingUnityTypePath = '/api/unityType/find_all/paging';

  /**
   * Get all unity types with pagination.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPagingUnityType()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findAllPagingUnityType$Response(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<StrictHttpResponse<Array<UnityType>>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      UnityTypeService.FindAllPagingUnityTypePath,
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
          return r as StrictHttpResponse<Array<UnityType>>;
        })
      );
  }

  /**
   * Get all unity types with pagination.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllPagingUnityType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPagingUnityType(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<Array<UnityType>> {
    return this.findAllPagingUnityType$Response(params).pipe(
      map(
        (r: StrictHttpResponse<Array<UnityType>>) => r.body as Array<UnityType>
      )
    );
  }
}
