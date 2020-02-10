import { Injectable } from '@angular/core';
import { Filter } from '../../models/filter';
import { TrangThaiHLV } from 'app/models/danhmuc/trangthaihlv';

@Injectable({
    providedIn: 'root'
  })
  export class TrangThaiHLVService {
      ttlhList: TrangThaiHLV[] = [
          {Id: 1, MaTrangThai: 'tthlv1', TenTrangThai: 'trang thai hlv 1'},
          {Id: 2, MaTrangThai: 'tthlv2', TenTrangThai: 'trang thai hlv 2'},
          {Id: 3, MaTrangThai: 'tthlv3', TenTrangThai: 'trang thai hlv 3'},
          {Id: 4, MaTrangThai: 'tthlv4', TenTrangThai: 'trang thai hlv 4'},
          {Id: 5, MaTrangThai: 'tthlv5', TenTrangThai: 'trang thai hlv 5'},
          {Id: 6, MaTrangThai: 'tthlv6', TenTrangThai: 'trang thai hlv 6'},
          {Id: 7, MaTrangThai: 'tthlv7', TenTrangThai: 'trang thai hlv 7'},
          {Id: 8, MaTrangThai: 'tthlv8', TenTrangThai: 'trang thai hlv 8'},
          {Id: 9, MaTrangThai: 'tthlv9', TenTrangThai: 'trang thai hlv 9'},
          {Id: 10, MaTrangThai: 'tthlv10', TenTrangThai: 'trang thai hlv 10'},
          {Id: 11, MaTrangThai: 'tthlv11', TenTrangThai: 'trang thai hlv 11'},
          {Id: 12, MaTrangThai: 'tthlv12', TenTrangThai: 'trang thai hlv 12'},
          {Id: 13, MaTrangThai: 'tthlv13', TenTrangThai: 'trang thai hlv 13'},
          {Id: 14, MaTrangThai: 'tthlv14', TenTrangThai: 'trang thai hlv 14'},
          {Id: 15, MaTrangThai: 'tthlv15', TenTrangThai: 'trang thai hlv 15'},
          {Id: 16, MaTrangThai: 'tthlv16', TenTrangThai: 'trang thai hlv 16'},
          {Id: 17, MaTrangThai: 'tthlv17', TenTrangThai: 'trang thai hlv 17'},
          {Id: 18, MaTrangThai: 'tthlv18', TenTrangThai: 'trang thai hlv 18'},
          {Id: 19, MaTrangThai: 'tthlv19', TenTrangThai: 'trang thai hlv 19'},
          {Id: 20, MaTrangThai: 'tthlv20', TenTrangThai: 'trang thai hlv 20'},
          {Id: 21, MaTrangThai: 'tthlv21', TenTrangThai: 'trang thai hlv 21'},
          {Id: 22, MaTrangThai: 'tthlv22', TenTrangThai: 'trang thai hlv 22'}
      ];
  
      constructor() {
      }
  
      getTrangThaiHLVList(filter: Filter) {
          const result:TrangThaiHLV[] = this.ttlhList.filter((trangThaiHLV: TrangThaiHLV) => filter.SearchTerm == '' || (filter.SearchTerm != '' && trangThaiHLV.TenTrangThai.toLowerCase().indexOf(filter.SearchTerm.toLowerCase()) != -1));
          return result;
      }
      
      getTrangThaiHLV(id: any): TrangThaiHLV {
          if(id) {
              const result: TrangThaiHLV[] = this.ttlhList.filter((TrangThaiHLV: TrangThaiHLV) => TrangThaiHLV.Id == id);
              return new TrangThaiHLV(result[0].Id, result[0].MaTrangThai, result[0].TenTrangThai);
          }
          return new TrangThaiHLV(0, '', '');
      }
  
      addOrUpdateTrangThaiHLV(trangThaiHLV: TrangThaiHLV): boolean {
          if(trangThaiHLV.Id == 0) {
              if (this.ttlhList.filter((cv: TrangThaiHLV) => cv.MaTrangThai == trangThaiHLV.MaTrangThai).length > 0) {
                  return false;
              }
              trangThaiHLV.Id = this.ttlhList.length + 1;
              this.ttlhList.push(trangThaiHLV);
          } else {
              if (this.ttlhList.filter((cv: TrangThaiHLV) => cv.MaTrangThai == trangThaiHLV.MaTrangThai && cv.Id != trangThaiHLV.Id).length > 0) {
                  return false;
              } else {
                  const tempTrangThaiHLV: TrangThaiHLV[] = this.ttlhList.filter((cv: TrangThaiHLV) => cv.Id == trangThaiHLV.Id);
                  tempTrangThaiHLV[0].MaTrangThai = trangThaiHLV.MaTrangThai;
                  tempTrangThaiHLV[0].TenTrangThai = trangThaiHLV.TenTrangThai;
              }
          }
          return true;
      }
  
      deleteTrangThaiHLV(trangThaiHLVId: number) {
          const id: number = this.ttlhList.map((cv: TrangThaiHLV) => cv.Id).indexOf(trangThaiHLVId);
          if(id != -1) {
              this.ttlhList.splice(id, 1);
          }
      }
  }