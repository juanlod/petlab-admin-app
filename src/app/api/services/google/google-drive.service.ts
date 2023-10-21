/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ApiConfiguration } from '../../api-configuration';
import { BaseService } from '../../base-service';
import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';

@Injectable({
  providedIn: 'root',
})
export class GoogleDriveService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation uploadFile
   */
  static readonly UploadFilePath = '/api/google-drive/upload';

  /**
   * Upload a file to Google Drive.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadFile()` instead.
   *
   * This method doesn't expect any request body.
   */
  private uploadFile$Response(params?: {}): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      GoogleDriveService.UploadFilePath,
      'post'
    );
    if (params) {
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
   * Upload a file to Google Drive.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `uploadFile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  uploadFile(params?: {}): Observable<void> {
    return this.uploadFile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation downloadFile
   */
  static readonly DownloadFilePath = '/api/google-drive/download/{fileId}';

  /**
   * Download a file from Google Drive.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadFile()` instead.
   *
   * This method doesn't expect any request body.
   */
  private downloadFile$Response(params: {
    /**
     * The ID of the file to download from Google Drive
     */
    fileId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      GoogleDriveService.DownloadFilePath,
      'get'
    );
    if (params) {
      rb.path('fileId', params.fileId, {});
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
   * Download a file from Google Drive.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `downloadFile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadFile(params: {
    /**
     * The ID of the file to download from Google Drive
     */
    fileId: string;
  }): Observable<void> {
    return this.downloadFile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteFile
   */
  static readonly DeleteFilePath = '/api/google-drive/delete/{fileName}';

  /**
   * Delete a file from Google Drive.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteFile()` instead.
   *
   * This method doesn't expect any request body.
   */
  private deleteFile$Response(params: {
    /**
     * The name of the file to delete from Google Drive
     */
    fileName: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      GoogleDriveService.DeleteFilePath,
      'delete'
    );
    if (params) {
      rb.path('fileName', params.fileName, {});
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
   * Delete a file from Google Drive.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteFile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFile(params: {
    /**
     * The name of the file to delete from Google Drive
     */
    fileName: string;
  }): Observable<void> {
    return this.deleteFile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getThumbnail
   */
  static readonly GetThumbnailPath = '/api/google-drive/thumbnail/{fileId}';

  /**
   * Get thumbnail link of a file from Google Drive.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getThumbnail()` instead.
   *
   * This method doesn't expect any request body.
   */
  private getThumbnail$Response(params: {
    /**
     * The ID of the file to get the thumbnail link from Google Drive
     */
    fileId: string;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      GoogleDriveService.GetThumbnailPath,
      'get'
    );
    if (params) {
      rb.path('fileId', params.fileId, {});
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
   * Get thumbnail link of a file from Google Drive.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getThumbnail$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getThumbnail(params: {
    /**
     * The ID of the file to get the thumbnail link from Google Drive
     */
    fileId: string;
  }): Observable<void> {
    return this.getThumbnail$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }


}
