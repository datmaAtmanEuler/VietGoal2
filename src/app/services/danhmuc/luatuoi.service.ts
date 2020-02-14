import { Injectable } from '@angular/core';
import { Filter } from '../../models/filter/filter';
import { LuaTuoi } from 'app/models/danhmuc/luatuoi';

@Injectable({
    providedIn: 'root'
  })
  export class LuaTuoiService {
      ttlhList: LuaTuoi[] = [
          {Id: 1, MaLuaTuoi: 'lt1', TenLuaTuoi: 'lua tuoi 1'},
          {Id: 2, MaLuaTuoi: 'lt2', TenLuaTuoi: 'lua tuoi 2'},
          {Id: 3, MaLuaTuoi: 'lt3', TenLuaTuoi: 'lua tuoi 3'},
          {Id: 4, MaLuaTuoi: 'lt4', TenLuaTuoi: 'lua tuoi 4'},
          {Id: 5, MaLuaTuoi: 'lt5', TenLuaTuoi: 'lua tuoi 5'},
          {Id: 6, MaLuaTuoi: 'lt6', TenLuaTuoi: 'lua tuoi 6'},
          {Id: 7, MaLuaTuoi: 'lt7', TenLuaTuoi: 'lua tuoi 7'},
          {Id: 8, MaLuaTuoi: 'lt8', TenLuaTuoi: 'lua tuoi 8'},
          {Id: 9, MaLuaTuoi: 'lt9', TenLuaTuoi: 'lua tuoi 9'},
          {Id: 10, MaLuaTuoi: 'lt10', TenLuaTuoi: 'lua tuoi 10'},
          {Id: 11, MaLuaTuoi: 'lt11', TenLuaTuoi: 'lua tuoi 11'},
          {Id: 12, MaLuaTuoi: 'lt12', TenLuaTuoi: 'lua tuoi 12'},
          {Id: 13, MaLuaTuoi: 'lt13', TenLuaTuoi: 'lua tuoi 13'},
          {Id: 14, MaLuaTuoi: 'lt14', TenLuaTuoi: 'lua tuoi 14'},
          {Id: 15, MaLuaTuoi: 'lt15', TenLuaTuoi: 'lua tuoi 15'},
          {Id: 16, MaLuaTuoi: 'lt16', TenLuaTuoi: 'lua tuoi 16'},
          {Id: 17, MaLuaTuoi: 'lt17', TenLuaTuoi: 'lua tuoi 17'},
          {Id: 18, MaLuaTuoi: 'lt18', TenLuaTuoi: 'lua tuoi 18'},
          {Id: 19, MaLuaTuoi: 'lt19', TenLuaTuoi: 'lua tuoi 19'},
          {Id: 20, MaLuaTuoi: 'lt20', TenLuaTuoi: 'lua tuoi 20'},
          {Id: 21, MaLuaTuoi: 'lt21', TenLuaTuoi: 'lua tuoi 21'},
          {Id: 22, MaLuaTuoi: 'lt22', TenLuaTuoi: 'lua tuoi 22'}
      ];
  
      constructor() {
      }
  
      getLuaTuoiList(filter: Filter) {
          const result:LuaTuoi[] = this.ttlhList.filter((LuaTuoi: LuaTuoi) => filter.SearchTerm == '' || (filter.SearchTerm != '' && LuaTuoi.TenLuaTuoi.toLowerCase().indexOf(filter.SearchTerm.toLowerCase()) != -1));
          return result;
      }
      
      getLuaTuoi(id: any): LuaTuoi {
          if(id) {
              const result: LuaTuoi[] = this.ttlhList.filter((LuaTuoi: LuaTuoi) => LuaTuoi.Id == id);
              return new LuaTuoi(result[0].Id, result[0].MaLuaTuoi, result[0].TenLuaTuoi);
          }
          return new LuaTuoi(0, '', '');
      }
  
      addOrUpdateLuaTuoi(LuaTuoi: LuaTuoi): boolean {
          if(LuaTuoi.Id == 0) {
              if (this.ttlhList.filter((cv: LuaTuoi) => cv.MaLuaTuoi == LuaTuoi.MaLuaTuoi).length > 0) {
                  return false;
              }
              LuaTuoi.Id = this.ttlhList.length + 1;
              this.ttlhList.push(LuaTuoi);
          } else {
              if (this.ttlhList.filter((cv: LuaTuoi) => cv.MaLuaTuoi == LuaTuoi.MaLuaTuoi && cv.Id != LuaTuoi.Id).length > 0) {
                  return false;
              } else {
                  const tempLuaTuoi: LuaTuoi[] = this.ttlhList.filter((cv: LuaTuoi) => cv.Id == LuaTuoi.Id);
                  tempLuaTuoi[0].MaLuaTuoi = LuaTuoi.MaLuaTuoi;
                  tempLuaTuoi[0].TenLuaTuoi = LuaTuoi.TenLuaTuoi;
              }
          }
          return true;
      }
  
      deleteLuaTuoi(LuaTuoiId: number) {
          const id: number = this.ttlhList.map((cv: LuaTuoi) => cv.Id).indexOf(LuaTuoiId);
          if(id != -1) {
              this.ttlhList.splice(id, 1);
          }
      }
  }