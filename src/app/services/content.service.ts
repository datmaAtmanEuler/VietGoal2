import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
@Injectable({  
  providedIn: 'root'  
})  
export class ContentService {  
  url :any;  
  constructor(private http: HttpClient) { }  
AddUpdateContent(pagecontent: any) {  
    this.url = 'https://localhost:44349/Api/Contents/savecontent';  
    return this.http.post(this.url, pagecontent);  
}  
Getcontent() {  
  this.url = 'https://localhost:44349/Api/Contents/Getpagedata';  
  return this.http.get(this.url);  
}  
GetcontentById(Id: number) {  
  this.url = 'https://localhost:44349/Api/Contents/GetpagecontentBy?Id='+Id;  
  return this.http.get(this.url);  
}
DeleteContentById(Id: number) {  
  this.url = 'https://localhost:44349/Api/Contents/deleteContent?Id='+Id;  
  return this.http.delete(this.url);  
}  
}  