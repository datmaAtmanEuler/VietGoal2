import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable()
export class CustomTranslateLoader implements TranslateLoader {
contentHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });

constructor(private http: HttpClient) { }
getTranslation(lang: string): Observable<any> {
    const apiAddress = './assets/i18n/' + lang + '.json';
    return Observable.create((observer: any) => {
        this.http.get(apiAddress, { headers: this.contentHeader }).subscribe((res: any) => {
            observer.next(res);
            observer.complete();
        },
            () => {
                //  failed to retrieve from api, switch to local
                this.http.get('./assets/i18n/en-US.json').subscribe((res: any) => {
                    observer.next(res);
                    observer.complete();
                });
            }
        );
    });
}
}