import { Injectable } from '@angular/core';
@Injectable({  
  providedIn: 'root'  
})  
export class UtilsService {  
  constructor() { }  

  padLeft(text:string, padChar:string, size:number): string {
    return (String(padChar).repeat(size) + text).substr( (size * -1), size);
 }
}  