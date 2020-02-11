import { Injectable } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';

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

  md5Encode(str: number | string): string {
  	let s: string = (str) ? ('' + str) : '';
  	const md5 = new Md5();
  	let result: any = md5.appendStr(s).end();
    if(result instanceof Int32Array) {
      result = result.join('');
    }
    return result.toUpperCase();
  }
}  