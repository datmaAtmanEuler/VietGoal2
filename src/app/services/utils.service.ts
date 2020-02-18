import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { SORD_DIRECTION } from 'app/models/sort';

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
  }

  toggleSort(columnIndex: number, sortToggles: any, sort: any, columnsNameMapping: any[], reload: () => any): void {
    let toggleState = sortToggles[columnIndex];
    switch (toggleState) {
      case SORD_DIRECTION.DEFAULT:
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
          toggleState = SORD_DIRECTION.DEFAULT;
          break;
        }
    }
    sortToggles.forEach((s: string, index: number) => {
      if (index == columnIndex) {
        sortToggles[index] = sort.SortDirection = toggleState;
      } else {
        sortToggles[index] = SORD_DIRECTION.DEFAULT;
      }
    });

    sort.SortName = (toggleState == SORD_DIRECTION.DEFAULT) ? 'ID' : columnsNameMapping[columnIndex];
    reload();
  }

  doNothing(): void { }

  getColumnValue(obj: any, colIndex: number, columnsNameVi: any[]): any {
    console.log('load');
    console.log(obj);
    console.log(colIndex);
    console.log(columnsNameVi);
    return obj[columnsNameVi[colIndex]];
  }
  loadPaginatorLabels(){
    this.updateMatTableLabel();
    this.translate.onLangChange.subscribe((a: any) => {
      this.updateMatTableLabel();
      this.matCus.changes.next();
    });
  }
}  