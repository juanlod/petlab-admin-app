/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { User } from '../models/user';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';
import { LoginDto } from '../models/login-dto';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation loginUser
   */
  static readonly LoginUserPath = '/api/user/login';

  /**
   * Create an User.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  private loginUser$Response(params: {
    body: LoginDto;
  }): Observable<StrictHttpResponse<User>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      UserService.LoginUserPath,
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
          return r as StrictHttpResponse<User>;
        })
      );
  }

  /**
   * Create an User.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `loginUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  loginUser(params: { body: LoginDto }): Observable<User> {
    return this.loginUser$Response(params).pipe(
      map((r: StrictHttpResponse<User>) => r.body as User)
    );
  }

  /**
   * Path part for operation createUser
   */
  static readonly CreateUserPath = '/api/user/save';

  /**
   * Create an User.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  private createUser$Response(params?: {}): Observable<
    StrictHttpResponse<void>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      UserService.CreateUserPath,
      'post'
    );
    if (params) {
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
   * Create an User.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  createUser(params?: {}): Observable<void> {
    return this.createUser$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation findAllUser
   */
  static readonly FindAllUserPath = '/api/user/find_all';

  /**
   * Get all Users.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findAllUser$Response(params?: {}): Observable<
    StrictHttpResponse<Array<User>>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      UserService.FindAllUserPath,
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
          return r as StrictHttpResponse<Array<User>>;
        })
      );
  }

  /**
   * Get all Users.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllUser(params?: {}): Observable<Array<User>> {
    return this.findAllUser$Response(params).pipe(
      map((r: StrictHttpResponse<Array<User>>) => r.body as Array<User>)
    );
  }

  /**
   * Path part for operation findOneUser
   */
  static readonly FindOneUserPath = '/api/user/find_one/{id}';

  /**
   * Get an User by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOneUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  private findOneUser$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<User>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      UserService.FindOneUserPath,
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
          return r as StrictHttpResponse<User>;
        })
      );
  }

  /**
   * Get an User by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findOneUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOneUser(params: { id: string }): Observable<User> {
    return this.findOneUser$Response(params).pipe(
      map((r: StrictHttpResponse<User>) => r.body as User)
    );
  }

  /**
   * Path part for operation updateUser
   */
  static readonly UpdateUserPath = '/api/user/update/{id}';

  /**
   * Update an User by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  private updateUser$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<User>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      UserService.UpdateUserPath,
      'patch'
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
          return r as StrictHttpResponse<User>;
        })
      );
  }

  /**
   * Update an User by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateUser(params: { id: string }): Observable<User> {
    return this.updateUser$Response(params).pipe(
      map((r: StrictHttpResponse<User>) => r.body as User)
    );
  }

  /**
   * Path part for operation deleteUser
   */
  static readonly DeleteUserPath = '/api/user/delete/{id}';

  /**
   * Delete an User by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  private deleteUser$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      UserService.DeleteUserPath,
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
   * Delete an User by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser(params: { id: string }): Observable<void> {
    return this.deleteUser$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }
}
