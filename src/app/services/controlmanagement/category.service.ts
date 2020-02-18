import { Injectable } from '@angular/core';
import { Category } from '../../models/controlmanagement/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    httpOptions = {  
          headers: new HttpHeaders({  
            'Content-Type': 'application/json; charset=utf-8'  
          })  
    }; 

    constructor(private http: HttpClient) {
    }

    getCategoriesList(filter: any): Observable<any> {
        console.log(filter);
        let queryString =  Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl_employee + 'Categories?' + queryString , this.httpOptions);
    }
    
    getCategory(id: any): Observable<any> {
        return this.http.get(environment.serverUrl_employee + `Categories/${id}` , this.httpOptions);
    }

    addOrUpdateCategory(category: Category, by: null | number): Observable<any> {
        if (category.ID != 0 && category.ID) {
            category.UpdatedBy = by;
        } else {
            category.CreatedBy = by;
        }
        return this.http.post(environment.serverUrl_employee + `Categories/save`, category, this.httpOptions);
    }

    deleteCategory(id: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.serverUrl_employee + `Categories/${id}?deletedBy=${deletedBy}` , this.httpOptions);
    }
}