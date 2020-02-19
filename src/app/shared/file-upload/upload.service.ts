import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { FileUpload } from './file-upload';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  By: null | number = 0;

  constructor(private httpClient: HttpClient) {
    this._isUploading = false;
    this._currentlyUploading = new BehaviorSubject(this._isUploading);
    this._uploadQueue = new BehaviorSubject([]);
    this._done = new BehaviorSubject(null);
  }

  public UpdateBy(_By: null | number) {
    this.By = _By;
  }

  public get queue() {
    return this._uploadQueue.asObservable();
  }

  public get done() {
    return this._done.asObservable();
  }

  public addToQueue(file: File) {
    const queuedUploadFile = new FileUpload(file);
    this._files.push(queuedUploadFile);

    this._uploadQueue.next(this._files);

    this.checkAndUploadNextFile();
  }

  private checkAndUploadNextFile() {
    if (this._isUploading)
      return;

    let firstChoice = this._files.find(f => f.isWaitingForUpload);
    if (firstChoice)
      this.upload(firstChoice);
  }

  private upload(queuedUploadFile: FileUpload) {
    this.isUploading = true;
    queuedUploadFile.updateProgress(0);

    const request = this.createRequest(queuedUploadFile);
    this.httpClient.request(request)
      .pipe(
        finalize(() => {
          // Upload beendet. Egal ob erfolgreich oder fehlgeschlagen.
          this.isUploading = false;
          this.checkAndUploadNextFile();
        })
      )
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * event.loaded / event.total);
          queuedUploadFile.updateProgress(percentDone);
        } else if (event instanceof HttpResponse) {
          queuedUploadFile.completed();
          this._done.next(event.body)
        }

        this._uploadQueue.next(this._files);
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          queuedUploadFile.failed();
        } else {
          // The backend returned an unsuccessful response code.
          queuedUploadFile.failed();
        }

        this._uploadQueue.next(this._files);
      }, () => {
        
      });
  }

  private set isUploading(value: boolean) {
    this._isUploading = value;
    this._currentlyUploading.next(value);
  }

  private createRequest(queuedUploadFile: FileUpload) {
    const formData = new FormData();
    formData.append('by', this.By.toString());
    formData.append('files', queuedUploadFile.file, queuedUploadFile.file.name);
    const request = new HttpRequest('POST', this.getUrl(), formData, {
      reportProgress: true
    });
    return request;
  }

  private getUrl() {
    return `${environment.serverOriginUrl}api/DocFile/Upload`;
  }


  private _isUploading: boolean;
  private _currentlyUploading: BehaviorSubject<boolean>;
  private _files: FileUpload[] = [];
  private _uploadQueue: BehaviorSubject<FileUpload[]>;
  private _done: BehaviorSubject<any>;
}