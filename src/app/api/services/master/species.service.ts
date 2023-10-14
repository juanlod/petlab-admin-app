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

import { Species } from '../../models/master/species';

@Injectable({
  providedIn: 'root',
})
export class SpeciesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }
/**
   * Path part for operation createSpecies
   */
static readonly CreateSpeciesPath = '/api/species/save';

/**
 * Create a new species.
 *
 *
 *
 * This method provides access to the full `HttpResponse`, allowing access to response headers.
 * To access only the response body, use `createSpecies()` instead.
 *
 * This method sends `application/json` and handles request body of type `application/json`.
 */
private createSpecies$Response(params: {
  body: Species
}): Observable<StrictHttpResponse<Species>> {

  const rb = new RequestBuilder(this.rootUrl, SpeciesService.CreateSpeciesPath, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return this.http.request(rb.build({
    responseType: 'json',
    accept: 'application/json'
  })).pipe(
    filter((r: any) => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Species>;
    })
  );
}

/**
 * Create a new species.
 *
 *
 *
 * This method provides access to only to the response body.
 * To access the full response (for headers, for example), `createSpecies$Response()` instead.
 *
 * This method sends `application/json` and handles request body of type `application/json`.
 */
createSpecies(params: {
  body: Species
}): Observable<Species> {

  return this.createSpecies$Response(params).pipe(
    map((r: StrictHttpResponse<Species>) => r.body as Species)
  );
}

  /**
   * Path part for operation findAllSpecies
   */
  static readonly FindAllSpeciesPath = '/api/species/find_all';

  /**
   * Retrieve a list of all speciess.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllSpecies()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllSpecies$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Species>>> {

    const rb = new RequestBuilder(this.rootUrl, SpeciesService.FindAllSpeciesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Species>>;
      })
    );
  }

  /**
   * Retrieve a list of all speciess.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllSpecies$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllSpecies(params?: {
  }): Observable<Array<Species>> {

    return this.findAllSpecies$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Species>>) => r.body as Array<Species>)
    );
  }

  /**
   * Path part for operation findOneSpecies
   */
  static readonly FindOneSpeciesPath = '/api/species/find_one/{id}';

  /**
   * Retrieve a species by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOneSpecies()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOneSpecies$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<Species>> {

    const rb = new RequestBuilder(this.rootUrl, SpeciesService.FindOneSpeciesPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Species>;
      })
    );
  }

  /**
   * Retrieve a species by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findOneSpecies$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOneSpecies(params: {
    id: string;
  }): Observable<Species> {

    return this.findOneSpecies$Response(params).pipe(
      map((r: StrictHttpResponse<Species>) => r.body as Species)
    );
  }

  /**
   * Path part for operation updateSpecies
   */
  static readonly UpdateSpeciesPath = '/api/species/update/{id}';

  /**
   * Update a species by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateSpecies()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSpecies$Response(params: {
    id: string;
    body: Species
  }): Observable<StrictHttpResponse<Species>> {

    const rb = new RequestBuilder(this.rootUrl, SpeciesService.UpdateSpeciesPath, 'patch');
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
        return r as StrictHttpResponse<Species>;
      })
    );
  }

  /**
   * Update a species by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateSpecies$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSpecies(params: {
    id: string;
    body: Species
  }): Observable<Species> {

    return this.updateSpecies$Response(params).pipe(
      map((r: StrictHttpResponse<Species>) => r.body as Species)
    );
  }

  /**
   * Path part for operation removeSpecies
   */
  static readonly RemoveSpeciesPath = '/api/species/delete/{id}';

  /**
   * Remove a species by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeSpecies()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeSpecies$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SpeciesService.RemoveSpeciesPath, 'delete');
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
   * Remove a species by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeSpecies$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeSpecies(params: {
    id: string;
  }): Observable<void> {

    return this.removeSpecies$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation findAllPagingSpecies
   */
  static readonly FindAllPagingSpeciesPath = '/api/species/find_all/paging';

  /**
   * Get all speciess with pagination.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPagingSpecies()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPagingSpecies$Response(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<StrictHttpResponse<Array<Species>>> {

    const rb = new RequestBuilder(this.rootUrl, SpeciesService.FindAllPagingSpeciesPath, 'get');
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
        return r as StrictHttpResponse<Array<Species>>;
      })
    );
  }

  /**
   * Get all speciess with pagination.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllPagingSpecies$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPagingSpecies(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<Array<Species>> {

    return this.findAllPagingSpecies$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Species>>) => r.body as Array<Species>)
    );
  }

}
