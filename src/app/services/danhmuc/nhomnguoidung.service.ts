import { Injectable } from '@angular/core';
import { NhomNguoiDung } from '../../models/danhmuc/nhomnguoidung';
import { Filter } from '../../models/filter/filter';

@Injectable({
  providedIn: 'root'
})
export class NhomNguoiDungService {
    NhomNguoiDungList: any[] = [
    {IdNhom: 1,  TenNhom: 'Ban Giám Đốc'},
    {IdNhom: 2,  TenNhom: 'Quản Lý Chung'},
    {IdNhom: 3,  TenNhom: 'Quản Lý Chiêu Sinh'},
    {IdNhom: 4,  TenNhom: 'Huấn Luyện Viên'},
      ];

    constructor() {
    }

    getNhomList(filter: Filter) {
        const result:NhomNguoiDung[] = this.NhomNguoiDungList.filter((nhomnguoidung: NhomNguoiDung) => filter.SearchTerm == '' || (filter.SearchTerm != '' && nhomnguoidung.TenNhom.toLowerCase().indexOf(filter.SearchTerm.toLowerCase()) != -1));
	return result;
    }
    
    getNhom(id: any): NhomNguoiDung {
        if(id) {
            const result: NhomNguoiDung[] = this.NhomNguoiDungList.filter((nhomnguoidung: NhomNguoiDung) => nhomnguoidung.IdNhom == id);
            return new NhomNguoiDung(result[0].IdNhom,  result[0].TenNhom);
        }
        return new NhomNguoiDung(0, '');
    }

    addOrUpdateNhom(nhomnguoidung: NhomNguoiDung): boolean {
        if(nhomnguoidung && nhomnguoidung.IdNhom == 0) {
            if (this.NhomNguoiDungList.filter((n: NhomNguoiDung) => n.TenNhom == n.TenNhom).length > 0) {
                return false;
            }
            nhomnguoidung.IdNhom = Math.max.apply(Math, this.NhomNguoiDungList.map((n: NhomNguoiDung) => n.IdNhom)) + 1;
            
            this.NhomNguoiDungList.push(nhomnguoidung);
        } else {
            
            if (this.NhomNguoiDungList.filter((n: NhomNguoiDung) => n.TenNhom == nhomnguoidung.TenNhom && n.IdNhom != nhomnguoidung.IdNhom).length > 0) {
                return false;
            } else {
                const tempNhom: NhomNguoiDung[] = this.NhomNguoiDungList.filter((n: NhomNguoiDung) => n.IdNhom == nhomnguoidung.IdNhom);
                tempNhom[0].TenNhom = nhomnguoidung.TenNhom;
               
            }
        }
        return true;
    }

    deleteNhom(IdNhom: number) {
        const id: number = this.NhomNguoiDungList.map((nhomnguoidung: NhomNguoiDung) => nhomnguoidung.IdNhom).indexOf(IdNhom);
        if(id != -1) {
            this.NhomNguoiDungList.splice(id, 1);
        }
    }
}