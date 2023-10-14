/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ApiConfiguration } from '../../api-configuration';
import { BaseService } from '../../base-service';
import { Race } from '../../models/master/race';
import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';


@Injectable({
  providedIn: 'root',
})
export class RaceService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation createRace
   */
  static readonly CreateRacePath = '/api/race/save';

  /**
   * Create a new race.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createRace()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  private createRace$Response(params: {
    body: Race
  }): Observable<StrictHttpResponse<Race>> {

    const rb = new RequestBuilder(this.rootUrl, RaceService.CreateRacePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Race>;
      })
    );
  }

  /**
   * Create a new race.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createRace$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createRace(params: {
    body: Race
  }): Observable<Race> {

    return this.createRace$Response(params).pipe(
      map((r: StrictHttpResponse<Race>) => r.body as Race)
    );
  }

  /**
   * Path part for operation findAllRace
   */
  static readonly FindAllRacePath = '/api/race/find_all';

  /**
   * Retrieve a list of all races.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllRace()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllRace$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Race>>> {

    const rb = new RequestBuilder(this.rootUrl, RaceService.FindAllRacePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Race>>;
      })
    );
  }

  /**
   * Retrieve a list of all races.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllRace$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllRace(params?: {
  }): Observable<Array<Race>> {

    return this.findAllRace$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Race>>) => r.body as Array<Race>)
    );
  }

  /**
   * Path part for operation findOneRace
   */
  static readonly FindOneRacePath = '/api/race/find_one/{id}';

  /**
   * Retrieve a race by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOneRace()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOneRace$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<Race>> {

    const rb = new RequestBuilder(this.rootUrl, RaceService.FindOneRacePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Race>;
      })
    );
  }

  /**
   * Retrieve a race by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findOneRace$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOneRace(params: {
    id: string;
  }): Observable<Race> {

    return this.findOneRace$Response(params).pipe(
      map((r: StrictHttpResponse<Race>) => r.body as Race)
    );
  }

  /**
   * Path part for operation updateRace
   */
  static readonly UpdateRacePath = '/api/race/update/{id}';

  /**
   * Update a race by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateRace()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateRace$Response(params: {
    id: string;
    body: Race
  }): Observable<StrictHttpResponse<Race>> {

    const rb = new RequestBuilder(this.rootUrl, RaceService.UpdateRacePath, 'patch');
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
        return r as StrictHttpResponse<Race>;
      })
    );
  }

  /**
   * Update a race by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateRace$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateRace(params: {
    id: string;
    body: Race
  }): Observable<Race> {

    return this.updateRace$Response(params).pipe(
      map((r: StrictHttpResponse<Race>) => r.body as Race)
    );
  }

  /**
   * Path part for operation removeRace
   */
  static readonly RemoveRacePath = '/api/race/delete/{id}';

  /**
   * Remove a race by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeRace()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeRace$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RaceService.RemoveRacePath, 'delete');
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
   * Remove a race by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeRace$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeRace(params: {
    id: string;
  }): Observable<void> {

    return this.removeRace$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation findAllPagingRace
   */
  static readonly FindAllPagingRacePath = '/api/race/find_all/paging';

  /**
   * Get all races with pagination.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPagingRace()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPagingRace$Response(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<StrictHttpResponse<Array<Race>>> {

    const rb = new RequestBuilder(this.rootUrl, RaceService.FindAllPagingRacePath, 'get');
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
        return r as StrictHttpResponse<Array<Race>>;
      })
    );
  }

  /**
   * Get all races with pagination.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllPagingRace$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPagingRace(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<Array<Race>> {

    return this.findAllPagingRace$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Race>>) => r.body as Array<Race>)
    );
  }

}
