import { Injectable } from '@angular/core';
import { Filter } from '../../models/filter/filter';
import { KhoanThu } from 'app/models/danhmuc/khoanthu';


@Injectable({
    providedIn: 'root'
  })
  export class KhoanThuService {
      ttlhList: KhoanThu[] = [
          {Id: 1, MaKhoanThu: 'kt1', TenKhoanThu: 'khoan thu 1'},
          {Id: 2, MaKhoanThu: 'kt2', TenKhoanThu: 'khoan thu 2'},
          {Id: 3, MaKhoanThu: 'kt3', TenKhoanThu: 'khoan thu 3'},
          {Id: 4, MaKhoanThu: 'kt4', TenKhoanThu: 'khoan thu 4'},
          {Id: 5, MaKhoanThu: 'kt5', TenKhoanThu: 'khoan thu 5'},
          {Id: 6, MaKhoanThu: 'kt6', TenKhoanThu: 'khoan thu 6'},
          {Id: 7, MaKhoanThu: 'kt7', TenKhoanThu: 'khoan thu 7'},
          {Id: 8, MaKhoanThu: 'kt8', TenKhoanThu: 'khoan thu 8'},
          {Id: 9, MaKhoanThu: 'kt9', TenKhoanThu: 'khoan thu 9'},
          {Id: 10, MaKhoanThu: 'kt10', TenKhoanThu: 'khoan thu 10'},
          {Id: 11, MaKhoanThu: 'kt11', TenKhoanThu: 'khoan thu 11'},
          {Id: 12, MaKhoanThu: 'kt12', TenKhoanThu: 'khoan thu 12'},
          {Id: 13, MaKhoanThu: 'kt13', TenKhoanThu: 'khoan thu 13'},
          {Id: 14, MaKhoanThu: 'kt14', TenKhoanThu: 'khoan thu 14'},
          {Id: 15, MaKhoanThu: 'kt15', TenKhoanThu: 'khoan thu 15'},
          {Id: 16, MaKhoanThu: 'kt16', TenKhoanThu: 'khoan thu 16'},
          {Id: 17, MaKhoanThu: 'kt17', TenKhoanThu: 'khoan thu 17'},
          {Id: 18, MaKhoanThu: 'kt18', TenKhoanThu: 'khoan thu 18'},
          {Id: 19, MaKhoanThu: 'kt19', TenKhoanThu: 'khoan thu 19'},
          {Id: 20, MaKhoanThu: 'kt20', TenKhoanThu: 'khoan thu 20'},
          {Id: 21, MaKhoanThu: 'kt21', TenKhoanThu: 'khoan thu 21'},
          {Id: 22, MaKhoanThu: 'kt22', TenKhoanThu: 'khoan thu 22'}
      ];
  
      constructor() {
      }
  
      getKhoanThuList(filter: Filter) {
          const result:KhoanThu[] = this.ttlhList.filter((KhoanThu: KhoanThu) => filter.SearchTerm == '' || (filter.SearchTerm != '' && KhoanThu.TenKhoanThu.toLowerCase().indexOf(filter.SearchTerm.toLowerCase()) != -1));
          return result;
      }
      
      getKhoanThu(id: any): KhoanThu {
          if(id) {
              const result: KhoanThu[] = this.ttlhList.filter((KhoanThu: KhoanThu) => KhoanThu.Id == id);
              return new KhoanThu(result[0].Id, result[0].MaKhoanThu, result[0].TenKhoanThu);
          }
          return new KhoanThu(0, '', '');
      }
  
      addOrUpdateKhoanThu(KhoanThu: KhoanThu): boolean {
          if(KhoanThu.Id == 0) {
              if (this.ttlhList.filter((cv: KhoanThu) => cv.MaKhoanThu == KhoanThu.MaKhoanThu).length > 0) {
                  return false;
              }
              KhoanThu.Id = this.ttlhList.length + 1;
              this.ttlhList.push(KhoanThu);
          } else {
              if (this.ttlhList.filter((cv: KhoanThu) => cv.MaKhoanThu == KhoanThu.MaKhoanThu && cv.Id != KhoanThu.Id).length > 0) {
                  return false;
              } else {
                  const tempKhoanThu: KhoanThu[] = this.ttlhList.filter((cv: KhoanThu) => cv.Id == KhoanThu.Id);
                  tempKhoanThu[0].MaKhoanThu = KhoanThu.MaKhoanThu;
                  tempKhoanThu[0].TenKhoanThu = KhoanThu.TenKhoanThu;
              }
          }
          return true;
      }
  
      deleteKhoanThu(KhoanThuId: number) {
          const id: number = this.ttlhList.map((cv: KhoanThu) => cv.Id).indexOf(KhoanThuId);
          if(id != -1) {
              this.ttlhList.splice(id, 1);
          }
      }
  }