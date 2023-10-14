/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BaseService } from '../../base-service';
import { ApiConfiguration } from '../../api-configuration';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Client } from '../../models/clinic/client';

@Injectable({
  providedIn: 'root',
})
export class ClientsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation createClient
   */
  static readonly CreateClientPath = '/api/clients/save';

  /**
   * Create a new client.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createClient()` instead.
   *
   * This method doesn't expect any request body.
   */
  private createClient$Response(params?: {
    body: Client;
  }): Observable<StrictHttpResponse<Client>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ClientsService.CreateClientPath,
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
          return r as StrictHttpResponse<Client>;
        })
      );
  }

  /**
   * Create a new client.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createClient$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  createClient(params: { body: Client }): Observable<Client> {
    return this.createClient$Response(params).pipe(
      map((r: StrictHttpResponse<Client>) => r.body as Client)
    );
  }

  /**
   * Path part for operation findAllClient
   */
  static readonly FindAllClientPath = '/api/clients/find_all';

  /**
   * Obtener todos los clientes.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllClient()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findAllClient$Response(params?: {}): Observable<
    StrictHttpResponse<Array<Client>>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ClientsService.FindAllClientPath,
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
          return r as StrictHttpResponse<Array<Client>>;
        })
      );
  }

  /**
   * Obtener todos los clientes.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllClient$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllClient(params?: {}): Observable<Array<Client>> {
    return this.findAllClient$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Client>>) => r.body as Array<Client>)
    );
  }

  /**
   * Path part for operation findAllPagingClient
   */
  static readonly FindAllPagingClientPath = '/api/clients/find_all/paging';

  /**
   * Obtener clientes paginados.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPagingClient()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findAllPagingClient$Response(params?: {
    /**
     * Filtro para buscar clientes
     */
    filter?: string;

    /**
     * Número de página
     */
    page?: number;

    /**
     * Número de elementos por página
     */
    pageSize?: number;
  }): Observable<StrictHttpResponse<Array<Client>>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ClientsService.FindAllPagingClientPath,
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
          return r as StrictHttpResponse<Array<Client>>;
        })
      );
  }

  /**
   * Obtener clientes paginados.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllPagingClient$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPagingClient(params?: {
    /**
     * Filtro para buscar clientes
     */
    filter?: string;

    /**
     * Número de página
     */
    page?: number;

    /**
     * Número de elementos por página
     */
    pageSize?: number;
  }): Observable<Array<Client>> {
    return this.findAllPagingClient$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Client>>) => r.body as Array<Client>)
    );
  }

  /**
   * Path part for operation findOneClient
   */
  static readonly FindOneClientPath = '/api/clients/find_one/{id}';

  /**
   * Obtener un cliente por id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOneClient()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findOneClient$Response(params: {
    /**
     * El ID del cliente a buscar
     */
    id: string;
  }): Observable<StrictHttpResponse<Client>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ClientsService.FindOneClientPath,
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
          return r as StrictHttpResponse<Client>;
        })
      );
  }

  /**
   * Obtener un cliente por id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findOneClient$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOneClient(params: {
    /**
     * El ID del cliente a buscar
     */
    id: string;
  }): Observable<Client> {
    return this.findOneClient$Response(params).pipe(
      map((r: StrictHttpResponse<Client>) => r.body as Client)
    );
  }

  /**
   * Path part for operation updateClient
   */
  static readonly UpdateClientPath = '/api/clients/update/{id}';

  /**
   * Actualizar un cliente por id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateClient()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  private updateClient$Response(params: {
    /**
     * El ID del cliente a actualizar
     */
    id: string;
    body: Client;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ClientsService.UpdateClientPath,
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
   * Actualizar un cliente por id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateClient$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateClient(params: {
    /**
     * El ID del cliente a actualizar
     */
    id: string;
    body: Client;
  }): Observable<void> {
    return this.updateClient$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation removeClient
   */
  static readonly RemoveClientPath = '/api/clients/delete/{id}';

  /**
   * Eliminar un cliente por id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeClient()` instead.
   *
   * This method doesn't expect any request body.
   */
  private removeClient$Response(params: {
    /**
     * El ID del cliente a eliminar
     */
    id: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ClientsService.RemoveClientPath,
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
   * Eliminar un cliente por id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeClient$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeClient(params: {
    /**
     * El ID del cliente a eliminar
     */
    id: string;
  }): Observable<void> {
    return this.removeClient$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation findByIdentifClient
   */
  static readonly FindByIdentifClientPath =
    '/api/clients/find_by_identif/{identif}';

  /**
   * Find client by identif.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findByIdentifClient()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findByIdentifClient$Response(params: {
    /**
     * Client identification number
     */
    identif: string;
  }): Observable<StrictHttpResponse<boolean>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ClientsService.FindByIdentifClientPath,
      'get'
    );
    if (params) {
      rb.path('identif', params.identif, {});
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
          return (r as HttpResponse<any>).clone({
            body: String((r as HttpResponse<any>).body) === 'true',
          }) as StrictHttpResponse<boolean>;
        })
      );
  }

  /**
   * Find client by identif.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findByIdentifClient$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByIdentifClient(params: {
    /**
     * Client identification number
     */
    identif: string;
  }): Observable<boolean> {
    return this.findByIdentifClient$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation findByEmailClient
   */
  static readonly FindByEmailClientPath = '/api/clients/find_by_email/{email}';

  /**
   * Find client by email.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findByEmailClient()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findByEmailClient$Response(params: {
    /**
     * Client email
     */
    email: string;
  }): Observable<StrictHttpResponse<boolean>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ClientsService.FindByEmailClientPath,
      'get'
    );
    if (params) {
      rb.path('email', params.email, {});
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
          return (r as HttpResponse<any>).clone({
            body: String((r as HttpResponse<any>).body) === 'true',
          }) as StrictHttpResponse<boolean>;
        })
      );
  }

  /**
   * Find client by email.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findByEmailClient$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByEmailClient(params: {
    /**
     * Client email
     */
    email: string;
  }): Observable<boolean> {
    return this.findByEmailClient$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }


  /**
   * Path part for operation findOneByIdcClient
   */
  static readonly FindOneByIdcClientPath = '/api/clients/find_one_by_idc/{id}';

  /**
   * Obtener un cliente por id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOneByIdcClient()` instead.
   *
   * This method doesn't expect any request body.
   */
    private findOneByIdcClient$Response(params: {

      /**
       * El ID del cliente a buscar
       */
      id: number;
    }): Observable<StrictHttpResponse<Client>> {

      const rb = new RequestBuilder(this.rootUrl, ClientsService.FindOneByIdcClientPath, 'get');
      if (params) {
        rb.path('id', params.id, {});
      }

      return this.http.request(rb.build({
        responseType: 'json',
        accept: 'application/json'
      })).pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<Client>;
        })
      );
    }

    /**
     * Obtener un cliente por id.
     *
     *
     *
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `findOneByIdcClient$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    findOneByIdcClient(params: {

      /**
       * El ID del cliente a buscar
       */
      id: number;
    }): Observable<Client> {

      return this.findOneByIdcClient$Response(params).pipe(
        map((r: StrictHttpResponse<Client>) => r.body as Client)
      );
    }
}
