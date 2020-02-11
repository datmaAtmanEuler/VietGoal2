import { Injectable } from '@angular/core';
import { Filter } from '../../models/filter/filter';
import { KetQuaChieuSinh } from '../../models/danhmuc/kqchieusinh';

@Injectable({
    providedIn: 'root'
  })
  export class KQChieuSinhService {
      kq: KetQuaChieuSinh[] = [
          {IdKQ: 1, MaKQ: 1,SoThutu:1, KQChieuSinh: 'Đạt', MaMau:'#fcbdbd'},
          {IdKQ: 2, MaKQ: 2,SoThutu:2, KQChieuSinh: 'Chưa hoàn thành', MaMau:'#e3b7eb'},
          {IdKQ: 3, MaKQ: 3,SoThutu:3, KQChieuSinh: 'Chưa hoàn thành', MaMau:'#e3b7eb'},
          {IdKQ: 4, MaKQ: 4,SoThutu:4, KQChieuSinh: 'Chưa hoàn thành', MaMau:'#e3b7eb'},
          {IdKQ: 5, MaKQ: 5,SoThutu:5, KQChieuSinh: 'Chưa hoàn thành', MaMau:'#e3b7eb'},
          {IdKQ: 6, MaKQ: 6,SoThutu:6, KQChieuSinh: 'Chưa hoàn thành', MaMau:'#e3b7eb'},
          {IdKQ: 8, MaKQ: 7,SoThutu:7, KQChieuSinh: 'Chưa hoàn thành', MaMau:'#e3b7eb'},
          {IdKQ: 9, MaKQ: 8,SoThutu:8, KQChieuSinh: 'Chưa hoàn thành', MaMau:'#e3b7eb'},
          {IdKQ: 10, MaKQ: 9,SoThutu:9, KQChieuSinh: 'Chưa hoàn thành', MaMau:'#e3b7eb'},
          {IdKQ: 11, MaKQ: 10,SoThutu:10, KQChieuSinh: 'Chưa hoàn thành', MaMau:'#e3b7eb'},
          {IdKQ: 12, MaKQ: 11,SoThutu:11, KQChieuSinh: 'Chưa hoàn thành', MaMau:'#e3b7eb'},
          {IdKQ: 13, MaKQ: 12,SoThutu:12, KQChieuSinh: 'Chưa hoàn thành', MaMau:'#e3b7eb'},
          {IdKQ: 14, MaKQ: 13,SoThutu:13, KQChieuSinh: 'Chưa hoàn thành', MaMau:'#e3b7eb'},
          {IdKQ: 15, MaKQ: 14,SoThutu:14, KQChieuSinh: 'Chưa hoàn thành', MaMau:'#e3b7eb'},
          {IdKQ: 16, MaKQ: 15,SoThutu:15, KQChieuSinh: 'Chưa hoàn thành', MaMau:'#e3b7eb'},
          {IdKQ: 17, MaKQ: 16,SoThutu:16, KQChieuSinh: 'Chưa hoàn thành', MaMau:'#e3b7eb'},
      ];
  
      constructor() {
      }
  
      getKQChieuSinhList(filter: Filter) {
          const result:KetQuaChieuSinh[] = this.kq.filter((ketquachieusinh: KetQuaChieuSinh) => filter.SearchTerm == '' || (filter.SearchTerm != '' && ketquachieusinh.KQChieuSinh.toLowerCase().indexOf(filter.SearchTerm.toLowerCase()) != -1));
          return result;
      }
      
      getKQChieuSinh(idKQ: any): KetQuaChieuSinh {
          if(idKQ) {
              const result: KetQuaChieuSinh[] = this.kq.filter((KetQuaChieuSinh: KetQuaChieuSinh) => KetQuaChieuSinh.IdKQ == idKQ);
              return new KetQuaChieuSinh(result[0].IdKQ, result[0].MaKQ, result[0].KQChieuSinh, result[0].MaMau,result[0].SoThutu);
          }
          return new KetQuaChieuSinh(0, 0, '', '',0);
      }
  
      addOrUpdateKetQuaChieuSinh(KQChieuSinh: KetQuaChieuSinh): boolean {
          if(KQChieuSinh.IdKQ == 0) {
              if (this.kq.filter((kq: KetQuaChieuSinh) => kq.MaKQ == KQChieuSinh.MaKQ).length > 0) {
                  return false;
              }
              KQChieuSinh.IdKQ = this.kq.length + 1;
              this.kq.push(KQChieuSinh);
          } else {
              if (this.kq.filter((kq: KetQuaChieuSinh) => kq.MaKQ == KQChieuSinh.MaKQ && kq.IdKQ != KQChieuSinh.IdKQ).length > 0) {
                  return false;
              } else {
                  const tempKQChieuSinh: KetQuaChieuSinh[] = this.kq.filter((kq: KetQuaChieuSinh) => kq.IdKQ == KQChieuSinh.IdKQ);
                  tempKQChieuSinh[0].MaKQ = KQChieuSinh.MaKQ;
                  tempKQChieuSinh[0].KQChieuSinh = KQChieuSinh.KQChieuSinh;
                  tempKQChieuSinh[0].MaMau = KQChieuSinh.MaMau;
                  tempKQChieuSinh[0].SoThutu = KQChieuSinh.SoThutu;
              }
          }
          return true;
      }
  
      deleteKetQuaChieuSinh(IDKQChieuSinh: number) {
          const id: number = this.kq.map((kq: KetQuaChieuSinh) => kq.IdKQ).indexOf(IDKQChieuSinh);
          if(id != -1) {
              this.kq.splice(id, 1);
          }
      }
  }