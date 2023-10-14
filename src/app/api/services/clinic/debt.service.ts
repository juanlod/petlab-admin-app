/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Debt } from '../../models/clinic/debt';
import { ApiConfiguration } from '../../api-configuration';
import { BaseService } from '../../base-service';
import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';

@Injectable({
  providedIn: 'root',
})
export class DebtService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation createDebt
   */
  static readonly CreateDebtPath = '/api/debt/save';

  /**
   * Create a new debt.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createDebt()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  private createDebt$Response(params: {
    body: Debt
  }): Observable<StrictHttpResponse<Debt>> {

    const rb = new RequestBuilder(this.rootUrl, DebtService.CreateDebtPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Debt>;
      })
    );
  }

  /**
   * Create a new debt.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createDebt$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDebt(params: {
    body: Debt
  }): Observable<Debt> {

    return this.createDebt$Response(params).pipe(
      map((r: StrictHttpResponse<Debt>) => r.body as Debt)
    );
  }

  /**
   * Path part for operation findAllDebt
   */
  static readonly FindAllDebtPath = '/api/debt/find_all';

  /**
   * Retrieve a list of all debts.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllDebt()` instead.
   *
   * This method doesn't expect any request body.
   */
  private  findAllDebt$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Debt>>> {

    const rb = new RequestBuilder(this.rootUrl, DebtService.FindAllDebtPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Debt>>;
      })
    );
  }

  /**
   * Retrieve a list of all debts.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllDebt$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllDebt(params?: {
  }): Observable<Array<Debt>> {

    return this.findAllDebt$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Debt>>) => r.body as Array<Debt>)
    );
  }

  /**
   * Path part for operation findOneDebt
   */
  static readonly FindOneDebtPath = '/api/debt/find_one/{id}';

  /**
   * Retrieve a debt by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOneDebt()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findOneDebt$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<Debt>> {

    const rb = new RequestBuilder(this.rootUrl, DebtService.FindOneDebtPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Debt>;
      })
    );
  }

  /**
   * Retrieve a debt by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findOneDebt$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOneDebt(params: {
    id: string;
  }): Observable<Debt> {

    return this.findOneDebt$Response(params).pipe(
      map((r: StrictHttpResponse<Debt>) => r.body as Debt)
    );
  }

  /**
   * Path part for operation updateDebt
   */
  static readonly UpdateDebtPath = '/api/debt/update/{id}';

  /**
   * Update a debt by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateDebt()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  private updateDebt$Response(params: {
    id: string;
    body: Debt
  }): Observable<StrictHttpResponse<Debt>> {

    const rb = new RequestBuilder(this.rootUrl, DebtService.UpdateDebtPath, 'patch');
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
        return r as StrictHttpResponse<Debt>;
      })
    );
  }

  /**
   * Update a debt by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateDebt$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDebt(params: {
    id: string;
    body: Debt
  }): Observable<Debt> {

    return this.updateDebt$Response(params).pipe(
      map((r: StrictHttpResponse<Debt>) => r.body as Debt)
    );
  }

  /**
   * Path part for operation removeDebt
   */
  static readonly RemoveDebtPath = '/api/debt/delete/{id}';

  /**
   * Remove a debt by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeDebt()` instead.
   *
   * This method doesn't expect any request body.
   */
  private removeDebt$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, DebtService.RemoveDebtPath, 'delete');
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
   * Remove a debt by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeDebt$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeDebt(params: {
    id: string;
  }): Observable<void> {

    return this.removeDebt$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation findAllPagingDebt
   */
  static readonly FindAllPagingDebtPath = '/api/debt/find_all/paging';

  /**
   * Get all debts with pagination.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPagingDebt()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findAllPagingDebt$Response(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<StrictHttpResponse<Array<Debt>>> {

    const rb = new RequestBuilder(this.rootUrl, DebtService.FindAllPagingDebtPath, 'get');
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
        return r as StrictHttpResponse<Array<Debt>>;
      })
    );
  }

  /**
   * Get all debts with pagination.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllPagingDebt$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPagingDebt(params?: {
    filter?: string;
    page?: number;
    pageSize?: number;
  }): Observable<Array<Debt>> {

    return this.findAllPagingDebt$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Debt>>) => r.body as Array<Debt>)
    );
  }

}
