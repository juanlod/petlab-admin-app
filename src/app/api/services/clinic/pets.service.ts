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

import { Pet } from '../../models/clinic/pet';

@Injectable({
  providedIn: 'root',
})
export class PetsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation createPet
   */
  static readonly CreatePetPath = '/api/pets/save';

  /**
   * Create a new pet.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  private createPet$Response(params: {
    body: Pet
  }): Observable<StrictHttpResponse<Pet>> {

    const rb = new RequestBuilder(this.rootUrl, PetsService.CreatePetPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Pet>;
      })
    );
  }

  /**
   * Create a new pet.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createPet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPet(params: {
    body: Pet
  }): Observable<Pet> {

    return this.createPet$Response(params).pipe(
      map((r: StrictHttpResponse<Pet>) => r.body as Pet)
    );
  }

  /**
   * Path part for operation findAllPet
   */
  static readonly FindAllPetPath = '/api/pets/find_all';

  /**
   * Obtener todos los petes.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPet()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findAllPet$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Pet>>> {

    const rb = new RequestBuilder(this.rootUrl, PetsService.FindAllPetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Pet>>;
      })
    );
  }

  /**
   * Obtener todos los petes.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllPet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPet(params?: {
  }): Observable<Array<Pet>> {

    return this.findAllPet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Pet>>) => r.body as Array<Pet>)
    );
  }

  /**
   * Path part for operation findAllPagingPet
   */
  static readonly FindAllPagingPetPath = '/api/pets/find_all/paging';

  /**
   * Obtener petes paginados.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPagingPet()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findAllPagingPet$Response(params?: {

    /**
     * Filtro para buscar petes
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
  }): Observable<StrictHttpResponse<Array<Pet>>> {

    const rb = new RequestBuilder(this.rootUrl, PetsService.FindAllPagingPetPath, 'get');
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
        return r as StrictHttpResponse<Array<Pet>>;
      })
    );
  }

  /**
   * Obtener petes paginados.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllPagingPet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPagingPet(params?: {

    /**
     * Filtro para buscar petes
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
  }): Observable<Array<Pet>> {

    return this.findAllPagingPet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Pet>>) => r.body as Array<Pet>)
    );
  }

  /**
   * Path part for operation findOnePet
   */
  static readonly FindOnePetPath = '/api/pets/find_one/{id}';

  /**
   * Obtener un pete por id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOnePet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  private findOnePet$Response(params: {

    /**
     * El ID del pete a buscar
     */
    id: string;
  }): Observable<StrictHttpResponse<Pet>> {

    const rb = new RequestBuilder(this.rootUrl, PetsService.FindOnePetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Pet>;
      })
    );
  }

  /**
   * Obtener un pete por id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findOnePet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  findOnePet(params: {

    /**
     * El ID del pete a buscar
     */
    id: string;
  }): Observable<Pet> {

    return this.findOnePet$Response(params).pipe(
      map((r: StrictHttpResponse<Pet>) => r.body as Pet)
    );
  }

  /**
   * Path part for operation updatePet
   */
  static readonly UpdatePetPath = '/api/pets/update/{id}';

  /**
   * Actualizar un pete por id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  private updatePet$Response(params: {

    /**
     * El ID del pete a actualizar
     */
    id: string;
    body: Pet
  }): Observable<StrictHttpResponse<Pet>> {

    const rb = new RequestBuilder(this.rootUrl, PetsService.UpdatePetPath, 'patch');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<Pet>;
      })
    );
  }

  /**
   * Actualizar un pete por id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePet(params: {

    /**
     * El ID del pete a actualizar
     */
    id: string;
    body: Pet
  }): Observable<Pet> {

    return this.updatePet$Response(params).pipe(
      map((r: StrictHttpResponse<Pet>) => r.body as Pet)
    );
  }

  /**
   * Path part for operation removePet
   */
  static readonly RemovePetPath = '/api/pets/delete/{id}';

  /**
   * Eliminar un pete por id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removePet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  private removePet$Response(params: {

    /**
     * El ID del pete a eliminar
     */
    id: string;
    body: string
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PetsService.RemovePetPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
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
   * Eliminar un pete por id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removePet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  removePet(params: {

    /**
     * El ID del pete a eliminar
     */
    id: string;
    body: string
  }): Observable<void> {

    return this.removePet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
