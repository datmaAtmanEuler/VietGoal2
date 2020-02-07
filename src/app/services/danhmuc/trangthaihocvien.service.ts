import { Injectable } from '@angular/core';
import { Filter } from '../../models/filter';
import { TrangThaiHocVien } from '../../models/danhmuc/trangthaiHocVien';

@Injectable({
    providedIn: 'root'
  })
  export class TrangThaiHocVienService {
      tthv: TrangThaiHocVien[] = [
          {Id: 1, SoThuTu: 1, TenTrangThai: 'trang thai hov vien 1', MaTrangThai: 'tthv1', MaMau:'#fcbdbd'},
          {Id: 2, SoThuTu: 2, TenTrangThai: 'trang thai hov vien 2', MaTrangThai: 'tthv2', MaMau:'#e3b7eb'},
          {Id: 3, SoThuTu: 3, TenTrangThai: 'trang thai hov vien 3', MaTrangThai: 'tthv3', MaMau:'#e3b7eb'},
          {Id: 4, SoThuTu: 4, TenTrangThai: 'trang thai hov vien 4', MaTrangThai: 'tthv4', MaMau:'#e3b7eb'},
          {Id: 5, SoThuTu: 5, TenTrangThai: 'trang thai hov vien 5', MaTrangThai: 'tthv5', MaMau:'#e3b7eb'},
          {Id: 6, SoThuTu: 6, TenTrangThai: 'trang thai hov vien 6', MaTrangThai: 'tthv6', MaMau:'#e3b7eb'},
          {Id: 7, SoThuTu: 7, TenTrangThai: 'trang thai hov vien 7', MaTrangThai: 'tthv7', MaMau:'#e3b7eb'},
          {Id: 8, SoThuTu: 8, TenTrangThai: 'trang thai hov vien 8', MaTrangThai: 'tthv8', MaMau:'#e3b7eb'},
          {Id: 9, SoThuTu: 9, TenTrangThai: 'trang thai hov vien 9', MaTrangThai: 'tthv9', MaMau:'#e3b7eb'},
          {Id: 10, SoThuTu: 10, TenTrangThai: 'trang thai hov vien 10', MaTrangThai: 'tthv10', MaMau:'#e3b7eb'},
          {Id: 11, SoThuTu: 11, TenTrangThai: 'trang thai hov vien 11', MaTrangThai: 'tthv11', MaMau:'#e3b7eb'},
          {Id: 12, SoThuTu: 12, TenTrangThai: 'trang thai hov vien 12', MaTrangThai: 'tthv12', MaMau:'#e3b7eb'},
          {Id: 13, SoThuTu: 13, TenTrangThai: 'trang thai hov vien 13', MaTrangThai: 'tthv13', MaMau:'#e3b7eb'},
          {Id: 14, SoThuTu: 14, TenTrangThai: 'trang thai hov vien 14', MaTrangThai: 'tthv14', MaMau:'#e3b7eb'},
          {Id: 15, SoThuTu: 15, TenTrangThai: 'trang thai hov vien 15', MaTrangThai: 'tthv15', MaMau:'#e3b7eb'},
          {Id: 16, SoThuTu: 16, TenTrangThai: 'trang thai hov vien 16', MaTrangThai: 'tthv16', MaMau:'#e3b7eb'},
          {Id: 17, SoThuTu: 17, TenTrangThai: 'trang thai hov vien 17', MaTrangThai: 'tthv17', MaMau:'#e3b7eb'},
          {Id: 18, SoThuTu: 18, TenTrangThai: 'trang thai hov vien 18', MaTrangThai: 'tthv18', MaMau:'#e3b7eb'},
          {Id: 19, SoThuTu: 19, TenTrangThai: 'trang thai hov vien 19', MaTrangThai: 'tthv19', MaMau:'#e3b7eb'},
          {Id: 20, SoThuTu: 20, TenTrangThai: 'trang thai hov vien 20', MaTrangThai: 'tthv20', MaMau:'#e3b7eb'},
          {Id: 21, SoThuTu: 21, TenTrangThai: 'trang thai hov vien 21', MaTrangThai: 'tthv21', MaMau:'#e3b7eb'},
          {Id: 22, SoThuTu: 22, TenTrangThai: 'trang thai hov vien 22', MaTrangThai: 'tthv22', MaMau:'#e3b7eb'},
      ];
  
      constructor() {
      }
  
      getTrangThaiHocVienList(filter: Filter) {
          const result:TrangThaiHocVien[] = this.tthv.filter((trangThaiHocVien: TrangThaiHocVien) => filter.SearchTerm == '' || (filter.SearchTerm != '' && trangThaiHocVien.TenTrangThai.toLowerCase().indexOf(filter.SearchTerm.toLowerCase()) != -1));
          return result;
      }
      
      getTrangThaiHocVien(id: any): TrangThaiHocVien {
          if(id) {
              const result: TrangThaiHocVien[] = this.tthv.filter((TrangThaiHocVien: TrangThaiHocVien) => TrangThaiHocVien.Id == id);
              return new TrangThaiHocVien(result[0].Id, result[0].SoThuTu, result[0].TenTrangThai, result[0].MaTrangThai, result[0].MaMau);
          }
          return new TrangThaiHocVien(0, 0, '', '', '');
      }
  
      addOrUpdateTrangThaiHocVien(trangThaiHocVien: TrangThaiHocVien): boolean {
          if(trangThaiHocVien.Id == 0) {
              if (this.tthv.filter((cv: TrangThaiHocVien) => cv.MaTrangThai == trangThaiHocVien.MaTrangThai).length > 0) {
                  return false;
              }
              trangThaiHocVien.Id = this.tthv.length + 1;
              this.tthv.push(trangThaiHocVien);
          } else {
              if (this.tthv.filter((cv: TrangThaiHocVien) => cv.MaTrangThai == trangThaiHocVien.MaTrangThai && cv.Id != trangThaiHocVien.Id).length > 0) {
                  return false;
              } else {
                  const tempTrangThaiHocVien: TrangThaiHocVien[] = this.tthv.filter((cv: TrangThaiHocVien) => cv.Id == trangThaiHocVien.Id);
                  tempTrangThaiHocVien[0].SoThuTu = trangThaiHocVien.SoThuTu;
                  tempTrangThaiHocVien[0].TenTrangThai = trangThaiHocVien.TenTrangThai;
                  tempTrangThaiHocVien[0].MaTrangThai = trangThaiHocVien.MaTrangThai;
                  tempTrangThaiHocVien[0].MaMau = trangThaiHocVien.MaMau;
              }
          }
          return true;
      }
  
      deleteTrangThaiHocVien(trangThaiHocVienId: number) {
          const id: number = this.tthv.map((cv: TrangThaiHocVien) => cv.Id).indexOf(trangThaiHocVienId);
          if(id != -1) {
              this.tthv.splice(id, 1);
          }
      }
  }