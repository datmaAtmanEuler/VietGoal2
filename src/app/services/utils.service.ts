import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { SORD_DIRECTION } from 'app/models/sort';
import { Observable, of } from 'rxjs';
declare var $: any;

@Injectable({
  providedIn: 'root'
})

export class UtilsService {
  constructor(private matCus: MatPaginatorIntl, private translate: TranslateService) { }

  padLeft(text: string, padChar: string, size: number): string {
    return (String(padChar).repeat(size) + text).substr((size * -1), size);
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
    if (result instanceof Int32Array) {
      result = result.join('');
    }
    return result.toUpperCase();
  }
  updateMatTableLabel() {
    this.matCus.itemsPerPageLabel = this.translate.instant('MESSAGE.NameList.ItemsPerPage');
    this.matCus.getRangeLabel = (page: number, pageSize: number, length: number): string => {
      if (length === 0 || pageSize === 0) {
        return this.translate.instant('MESSAGE.NameList.NoRecord');
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return this.translate.instant('MESSAGE.NameList.PageFromToOf', { startIndex: startIndex + 1, endIndex, length });
    }

    this.matCus.nextPageLabel = '';
    this.matCus.lastPageLabel = '';
    this.matCus.previousPageLabel = '';
    this.matCus.firstPageLabel = '';
  }

  async toggleSort(columnIndex: number, sortToggles: any, sort: any, columnsNameMapping: any[]) {
    let toggleState = sortToggles[columnIndex];
    switch (toggleState) {
      case SORD_DIRECTION.DESC:
        {
          toggleState = SORD_DIRECTION.ASC;
          break;
        }
      case SORD_DIRECTION.ASC:
        {
          toggleState = SORD_DIRECTION.DESC;
          break;
        }
      default:
        {
          toggleState = SORD_DIRECTION.ASC;
          break;
        }
    }
    sortToggles.forEach((s: string, index: number) => {
      if (index == columnIndex) {
        sortToggles[index] = sort.SortDirection = toggleState;
      } else {
        sortToggles[index] = SORD_DIRECTION.ASC;
      }
    });

    sort.SortName = columnsNameMapping[columnIndex];
  }

  doNothing(): void { }

  getColumnValue(obj: any, colIndex: number, columnsNameVi: any[]): any {
    return obj[columnsNameVi[colIndex]];
  }
  loadPaginatorLabels(){
    this.updateMatTableLabel();
    this.translate.onLangChange.subscribe((a: any) => {
      this.updateMatTableLabel();
      this.matCus.changes.next();
    });
  }
  
  stringDate(date: any, slash = false){
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return slash ? [d.getMonth() + 1, day, year].join('/') : [year, month, day].join('-');
  }

  weekNumber(inputDate: Date): number {
    return 0 | inputDate.getDate() / 7;
  }

  dayInWeekList(value?: any, type: number | null = 1): Observable<any[]> {
    if(type == 1) {
       return of([
          {value: 1, title: "DATEFORMAT.DAYORDERINWEEK.Monday"},
          {value: 2, title: "DATEFORMAT.DAYORDERINWEEK.Tuesday"},
          {value: 3, title: "DATEFORMAT.DAYORDERINWEEK.Wednesday"},
          {value: 4, title: "DATEFORMAT.DAYORDERINWEEK.Thursday"},
          {value: 5, title: "DATEFORMAT.DAYORDERINWEEK.Friday"},
          {value: 6, title: "DATEFORMAT.DAYORDERINWEEK.Saturday"},
          {value: 0, title: "DATEFORMAT.DAYORDERINWEEK.Sunday"}
        ].filter((day: any) => value == '' || value == undefined || day.title.toLowerCase().indexOf(value.toString()) != -1)); 
     } else {
        return of([
          {value: 1, title: "DATEFORMAT.DAYORDERINWEEK.Monday"},
          {value: 2, title: "DATEFORMAT.DAYORDERINWEEK.Tuesday"},
          {value: 3, title: "DATEFORMAT.DAYORDERINWEEK.Wednesday"},
          {value: 4, title: "DATEFORMAT.DAYORDERINWEEK.Thursday"},
          {value: 5, title: "DATEFORMAT.DAYORDERINWEEK.Friday"},
          {value: 6, title: "DATEFORMAT.DAYORDERINWEEK.Saturday"},
          {value: 0, title: "DATEFORMAT.DAYORDERINWEEK.Sunday"}
        ].filter((day: any) => value == '' || value == undefined || day.value.toString().toLowerCase() == value.toString())); 
     }
  }

  weekNumberList(value: any,type: number | null = 1): Observable<any[]> {
    if(type == 1) {
      return of([
        {value: 1, title: "DATEFORMAT.WEEK.First"},
        {value: 2, title: "DATEFORMAT.WEEK.Second"},
        {value: 3, title: "DATEFORMAT.WEEK.Third"},
        {value: 4, title: "DATEFORMAT.WEEK.Fourth"},
        {value: 5, title: "DATEFORMAT.WEEK.Fifth"}
      ].filter((week: any) => value == '' || value == undefined || week.title.toLowerCase().indexOf(value.toString()) != -1));
    } else {
      return of([
        {value: 1, title: "DATEFORMAT.WEEK.First"},
        {value: 2, title: "DATEFORMAT.WEEK.Second"},
        {value: 3, title: "DATEFORMAT.WEEK.Third"},
        {value: 4, title: "DATEFORMAT.WEEK.Fourth"},
        {value: 5, title: "DATEFORMAT.WEEK.Fifth"}
      ].filter((week: any) => value == '' || value == undefined || week.value.toString().toLowerCase() == value.toString())); 
    }
  }

  yearsList(value: any, type: number | null = 1): Observable<any[]> {
    let list: any[] = [];

    for(let i = 1975; i <= 2100; i++) {
      list.push({
        value: i, title: '' + i
      });
    }

    if(type == 1) {
     return of( list.filter((month: any) => value == '' || value == undefined || month.title.toLowerCase().indexOf(value.toString()) != -1)); 
    } else {
      return of(list.filter((month: any) => value == '' || value == undefined || month.value.toString().toLowerCase() == value.toString())); 
    }
  }

  monthList(value: any, type: number | null = 1): Observable<any[]> {
    if(type == 1) {
     return of( [
        {value: 1, title: "DATEFORMAT.Jan"},
        {value: 2, title: "DATEFORMAT.Feb"},
        {value: 3, title: "DATEFORMAT.Mar"},
        {value: 4, title: "DATEFORMAT.Apr"},
        {value: 5, title: "DATEFORMAT.May"},
        {value: 6, title: "DATEFORMAT.Jun"},
        {value: 7, title: "DATEFORMAT.Jul"},
        {value: 8, title: "DATEFORMAT.Aug"},
        {value: 9, title: "DATEFORMAT.Sep"},
        {value: 10, title: "DATEFORMAT.Oct"},
        {value: 11, title: "DATEFORMAT.Nov"},
        {value: 12, title: "DATEFORMAT.Dec"}
      ].filter((month: any) => value == '' || value == undefined || month.title.toLowerCase().indexOf(value.toString()) != -1)); 
    } else {
      return of( [
        {value: 1, title: "DATEFORMAT.Jan"},
        {value: 2, title: "DATEFORMAT.Feb"},
        {value: 3, title: "DATEFORMAT.Mar"},
        {value: 4, title: "DATEFORMAT.Apr"},
        {value: 5, title: "DATEFORMAT.May"},
        {value: 6, title: "DATEFORMAT.Jun"},
        {value: 7, title: "DATEFORMAT.Jul"},
        {value: 8, title: "DATEFORMAT.Aug"},
        {value: 9, title: "DATEFORMAT.Sep"},
        {value: 10, title: "DATEFORMAT.Oct"},
        {value: 11, title: "DATEFORMAT.Nov"},
        {value: 12, title: "DATEFORMAT.Dec"}
      ].filter((month: any) => value == '' || value == undefined || month.value.toString().toLowerCase() == value.toString())); 
    }
  }
  
  //notification
  
  showNotification(from, align, message, colorindex?){
    const type = ['','info','success','warning','danger'];

    const color = colorindex || Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: "notifications",
        message: message

    },{
        type: type[color],
        timer: 3000,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}
}  