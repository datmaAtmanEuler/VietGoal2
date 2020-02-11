import { Injectable } from '@angular/core';
import { KhuVuc } from '../../models/danhmuc/khuvuc';
import { Filter } from '../../models/filter';

@Injectable({
  providedIn: 'root'
})
export class KhuvucService {
    khuvucList: any[] = [
    {IdKhuVuc: 1, MaKhuVuc: 55, TenKhuVuc: 'Khu vực 1',Trungtam:'Trung tâm số 1'},
    {IdKhuVuc: 2, MaKhuVuc: 57, TenKhuVuc: 'Khu vực 2',Trungtam:'Trung tâm số 2'}
      ];

    constructor() {
    }

    getKhuVucList(filter: Filter) {
        const result:KhuVuc[] = this.khuvucList.filter((khuvuc: KhuVuc) => filter.SearchTerm == '' || (filter.SearchTerm != '' && khuvuc.TenKhuVuc.toLowerCase().indexOf(filter.SearchTerm.toLowerCase()) != -1));
	return result;
    }
    
    getKhuVuc(id: any): KhuVuc {
        if(id) {
            const result: KhuVuc[] = this.khuvucList.filter((khuvuc: KhuVuc) => khuvuc.IdKhuvuc == id);
            return new KhuVuc(result[0].IdKhuvuc, result[0].MaKhuVuc, result[0].TenKhuVuc,result[0].TrungTam);
        }
        return new KhuVuc(0, 0, '','');
    }

    addOrUpdateKhuVuc(khuvuc: KhuVuc): boolean {
        if(khuvuc && khuvuc.IdKhuvuc == 0) {
            if (this.khuvucList.filter((kv: KhuVuc) => kv.MaKhuVuc == khuvuc.MaKhuVuc).length > 0) {
                return false;
            }
            khuvuc.IdKhuvuc = Math.max.apply(Math, this.khuvucList.map((kv: KhuVuc) => kv.IdKhuvuc)) + 1;
            khuvuc.MaKhuVuc = Number.parseInt(khuvuc.MaKhuVuc + '');
            this.khuvucList.push(khuvuc);
        } else {
            khuvuc.MaKhuVuc = Number.parseInt(khuvuc.MaKhuVuc + '');
            if (this.khuvucList.filter((kv: KhuVuc) => kv.MaKhuVuc == khuvuc.MaKhuVuc && kv.IdKhuvuc != khuvuc.IdKhuvuc).length > 0) {
                return false;
            } else {
                const tempKhuVuc: KhuVuc[] = this.khuvucList.filter((kv: KhuVuc) => kv.IdKhuvuc == khuvuc.IdKhuvuc);
                tempKhuVuc[0].MaKhuVuc = khuvuc.MaKhuVuc;
                tempKhuVuc[0].TenKhuVuc = khuvuc.TenKhuVuc;
                tempKhuVuc[0].TrungTam = khuvuc.TrungTam;
            }
        }
        return true;
    }

    deleteKhuVuc(IdKhuVuc: number) {
        const id: number = this.khuvucList.map((khuvuc: KhuVuc) => khuvuc.IdKhuvuc).indexOf(IdKhuVuc);
        if(id != -1) {
            this.khuvucList.splice(id, 1);
        }
    }
}