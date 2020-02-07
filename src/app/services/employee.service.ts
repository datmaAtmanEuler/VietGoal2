import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { EmployeeFilter } from '../models/employeefilter';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
    httpOptions = {  
          headers: new HttpHeaders({  
            'Content-Type': 'application/json; charset=utf-8'  
          })  
    }; 

    constructor(private http: HttpClient) {
    }

    getEmployeesList(filter: any): Observable<any> {
        let queryString =  Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl_employee + 'employees?' + queryString , this.httpOptions);
    }
    
    getEmployee(id: any): Observable<any> {
        return this.http.get(environment.serverUrl_employee + `employees/${id}` , this.httpOptions);
    }

    addOrUpdateEmployee(emp: any): Observable<any> {
        return this.http.post(environment.serverUrl_employee + `employees/save`, emp, this.httpOptions);
    }

    deleteEmployee(id: any): Observable<any> {
        return this.http.delete(environment.serverUrl_employee + `employees/${id}` , this.httpOptions);
    }
}