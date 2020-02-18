import { Injectable } from '@angular/core';
import { Filter } from '../../models/filter/filter';
import { DotThu } from 'app/models/list/dotthu';

@Injectable({
    providedIn: 'root'
  })
  export class DotThuService {
      ttlhList: DotThu[] = [
          {Id: 1, MaDotThu: 'dt1', TenDotThu: 'dot thu 1'},
          {Id: 2, MaDotThu: 'dt2', TenDotThu: 'dot thu 2'},
          {Id: 3, MaDotThu: 'dt3', TenDotThu: 'dot thu 3'},
          {Id: 4, MaDotThu: 'dt4', TenDotThu: 'dot thu 4'},
          {Id: 5, MaDotThu: 'dt5', TenDotThu: 'dot thu 5'},
          {Id: 6, MaDotThu: 'dt6', TenDotThu: 'dot thu 6'},
          {Id: 7, MaDotThu: 'dt7', TenDotThu: 'dot thu 7'},
          {Id: 8, MaDotThu: 'dt8', TenDotThu: 'dot thu 8'},
          {Id: 9, MaDotThu: 'dt9', TenDotThu: 'dot thu 9'},
          {Id: 10, MaDotThu: 'dt10', TenDotThu: 'dot thu 10'},
          {Id: 11, MaDotThu: 'dt11', TenDotThu: 'dot thu 11'},
          {Id: 12, MaDotThu: 'dt12', TenDotThu: 'dot thu 12'},
          {Id: 13, MaDotThu: 'dt13', TenDotThu: 'dot thu 13'},
          {Id: 14, MaDotThu: 'dt14', TenDotThu: 'dot thu 14'},
          {Id: 15, MaDotThu: 'dt15', TenDotThu: 'dot thu 15'},
          {Id: 16, MaDotThu: 'dt16', TenDotThu: 'dot thu 16'},
          {Id: 17, MaDotThu: 'dt17', TenDotThu: 'dot thu 17'},
          {Id: 18, MaDotThu: 'dt18', TenDotThu: 'dot thu 18'},
          {Id: 19, MaDotThu: 'dt19', TenDotThu: 'dot thu 19'},
          {Id: 20, MaDotThu: 'dt20', TenDotThu: 'dot thu 20'},
          {Id: 21, MaDotThu: 'dt21', TenDotThu: 'dot thu 21'},
          {Id: 22, MaDotThu: 'dt22', TenDotThu: 'dot thu 22'}
      ];
  
      constructor() {
      }
  
      getDotThuList(filter: Filter) {
          const result:DotThu[] = this.ttlhList.filter((DotThu: DotThu) => filter.SearchTerm == '' || (filter.SearchTerm != '' && DotThu.TenDotThu.toLowerCase().indexOf(filter.SearchTerm.toLowerCase()) != -1));
          return result;
      }
      
      getDotThu(id: any): DotThu {
          if(id) {
              const result: DotThu[] = this.ttlhList.filter((DotThu: DotThu) => DotThu.Id == id);
              return new DotThu(result[0].Id, result[0].MaDotThu, result[0].TenDotThu);
          }
          return new DotThu(0, '', '');
      }
  
      addOrUpdateDotThu(DotThu: DotThu): boolean {
          if(DotThu.Id == 0) {
              if (this.ttlhList.filter((cv: DotThu) => cv.MaDotThu == DotThu.MaDotThu).length > 0) {
                  return false;
              }
              DotThu.Id = this.ttlhList.length + 1;
              this.ttlhList.push(DotThu);
          } else {
              if (this.ttlhList.filter((cv: DotThu) => cv.MaDotThu == DotThu.MaDotThu && cv.Id != DotThu.Id).length > 0) {
                  return false;
              } else {
                  const tempDotThu: DotThu[] = this.ttlhList.filter((cv: DotThu) => cv.Id == DotThu.Id);
                  tempDotThu[0].MaDotThu = DotThu.MaDotThu;
                  tempDotThu[0].TenDotThu = DotThu.TenDotThu;
              }
          }
          return true;
      }
  
      deleteDotThu(DotThuId: number) {
          const id: number = this.ttlhList.map((cv: DotThu) => cv.Id).indexOf(DotThuId);
          if(id != -1) {
              this.ttlhList.splice(id, 1);
          }
      }
  }