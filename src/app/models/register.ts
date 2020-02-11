import { Claim } from './claim';

export class Register {  
    UserName:string = '';  
    LoginName:string = '';  
    Password:string = '';  
    Email:string = '';  
    ContactNo:string = '';  
    Address:string = '';
    Avatar:string = '';
    Claims: Claim[] = [];
    constructor() {}
}