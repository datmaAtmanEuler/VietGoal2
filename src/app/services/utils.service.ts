import { Injectable } from '@angular/core';
@Injectable({  
  providedIn: 'root'  
})  
export class UtilsService {  
  constructor() { }  

  padLeft(text:string, padChar:string, size:number): string {
    return (String(padChar).repeat(size) + text).substr( (size * -1), size);
 }
 padIntegerLeftWithZeros(rawInteger: number, numberOfDigits: number): string {
  let paddedInteger: string = rawInteger + '';
  while (paddedInteger.length < numberOfDigits) {
      paddedInteger = '0' + paddedInteger;
  }
  return paddedInteger;
}
}  