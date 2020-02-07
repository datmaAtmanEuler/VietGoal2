import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaceRegconizeService {
    serverURL:string = 'https://localhost:44349/Api/';
    constructor(private http: HttpClient) {
    }

    ProcessImage(formData: FormData): Observable<any> {
	return this.http.post(this.serverURL + 'FaceRegconize/ProcessImage', formData);
    }
}