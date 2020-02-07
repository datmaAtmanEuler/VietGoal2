import { Injectable } from '@angular/core';
import { Filter } from '../../models/filter';
import { TrangThaiLopHoc } from '../../models/danhmuc/trangthailophoc';

@Injectable({
    providedIn: 'root'
  })
  export class TrangThaiLopHocService {
      ttlhList: TrangThaiLopHoc[] = [
          {Id: 1, MaTTLH: 'ttlh1', TenTTLH: 'trang thai lop hoc 1'},
          {Id: 2, MaTTLH: 'ttlh2', TenTTLH: 'trang thai lop hoc 2'},
          {Id: 3, MaTTLH: 'ttlh3', TenTTLH: 'trang thai lop hoc 3'},
          {Id: 4, MaTTLH: 'ttlh4', TenTTLH: 'trang thai lop hoc 4'},
          {Id: 5, MaTTLH: 'ttlh5', TenTTLH: 'trang thai lop hoc 5'},
          {Id: 6, MaTTLH: 'ttlh6', TenTTLH: 'trang thai lop hoc 6'},
          {Id: 7, MaTTLH: 'ttlh7', TenTTLH: 'trang thai lop hoc 7'},
          {Id: 8, MaTTLH: 'ttlh8', TenTTLH: 'trang thai lop hoc 8'},
          {Id: 9, MaTTLH: 'ttlh9', TenTTLH: 'trang thai lop hoc 9'},
          {Id: 10, MaTTLH: 'ttlh10', TenTTLH: 'trang thai lop hoc 10'},
          {Id: 11, MaTTLH: 'ttlh11', TenTTLH: 'trang thai lop hoc 11'},
          {Id: 12, MaTTLH: 'ttlh12', TenTTLH: 'trang thai lop hoc 12'},
          {Id: 13, MaTTLH: 'ttlh13', TenTTLH: 'trang thai lop hoc 13'},
          {Id: 14, MaTTLH: 'ttlh14', TenTTLH: 'trang thai lop hoc 14'},
          {Id: 15, MaTTLH: 'ttlh15', TenTTLH: 'trang thai lop hoc 15'},
          {Id: 16, MaTTLH: 'ttlh16', TenTTLH: 'trang thai lop hoc 16'},
          {Id: 17, MaTTLH: 'ttlh17', TenTTLH: 'trang thai lop hoc 17'},
          {Id: 18, MaTTLH: 'ttlh18', TenTTLH: 'trang thai lop hoc 18'},
          {Id: 19, MaTTLH: 'ttlh19', TenTTLH: 'trang thai lop hoc 19'},
          {Id: 20, MaTTLH: 'ttlh20', TenTTLH: 'trang thai lop hoc 20'},
          {Id: 21, MaTTLH: 'ttlh21', TenTTLH: 'trang thai lop hoc 21'},
          {Id: 22, MaTTLH: 'ttlh22', TenTTLH: 'trang thai lop hoc 22'}
      ];
  
      constructor() {
      }
  
      getTrangThaiLopHocList(filter: Filter) {
          const result:TrangThaiLopHoc[] = this.ttlhList.filter((trangThaiLopHoc: TrangThaiLopHoc) => filter.SearchTerm == '' || (filter.SearchTerm != '' && trangThaiLopHoc.TenTTLH.toLowerCase().indexOf(filter.SearchTerm.toLowerCase()) != -1));
          return result;
      }
      
      getTrangThaiLopHoc(id: any): TrangThaiLopHoc {
          if(id) {
              const result: TrangThaiLopHoc[] = this.ttlhList.filter((TrangThaiLopHoc: TrangThaiLopHoc) => TrangThaiLopHoc.Id == id);
              return new TrangThaiLopHoc(result[0].Id, result[0].MaTTLH, result[0].TenTTLH);
          }
          return new TrangThaiLopHoc(0, '', '');
      }
  
      addOrUpdateTrangThaiLopHoc(trangThaiLopHoc: TrangThaiLopHoc): boolean {
          if(trangThaiLopHoc.Id == 0) {
              if (this.ttlhList.filter((cv: TrangThaiLopHoc) => cv.MaTTLH == trangThaiLopHoc.MaTTLH).length > 0) {
                  return false;
              }
              trangThaiLopHoc.Id = this.ttlhList.length + 1;
              this.ttlhList.push(trangThaiLopHoc);
          } else {
              if (this.ttlhList.filter((cv: TrangThaiLopHoc) => cv.MaTTLH == trangThaiLopHoc.MaTTLH && cv.Id != trangThaiLopHoc.Id).length > 0) {
                  return false;
              } else {
                  const tempTrangThaiLopHoc: TrangThaiLopHoc[] = this.ttlhList.filter((cv: TrangThaiLopHoc) => cv.Id == trangThaiLopHoc.Id);
                  tempTrangThaiLopHoc[0].MaTTLH = trangThaiLopHoc.MaTTLH;
                  tempTrangThaiLopHoc[0].TenTTLH = trangThaiLopHoc.TenTTLH;
              }
          }
          return true;
      }
  
      deleteTrangThaiLopHoc(trangThaiLopHocId: number) {
          const id: number = this.ttlhList.map((cv: TrangThaiLopHoc) => cv.Id).indexOf(trangThaiLopHocId);
          if(id != -1) {
              this.ttlhList.splice(id, 1);
          }
      }
  }