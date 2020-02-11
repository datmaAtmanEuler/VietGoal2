import { Injectable } from '@angular/core';
import { BaiTap } from '../../models/danhmuc/baitap';
import { Filter } from '../../models/filter/filter';

@Injectable({
  providedIn: 'root'
})
export class BaiTapService {
    baitapList: any[] = [
    {IdBaiTap: 1,MaBaiTap:15, TenBaiTap: 'Sân Vĩnh Tuy',KhuVuc: 'Vĩnh Tuy',DiaChi:'Số 25 ngõ 122 Vĩnh Tuy',GhiChu:''},
    {IdBaiTap: 2,MaBaiTap:17, TenBaiTap: 'Sân VinSchool',KhuVuc: 'Park Hill',DiaChi:'Sân Bóng trong khuôn viên trường TH',GhiChu:''},
      ];

    constructor() {
    }

    getBaiTapList(filter: Filter) {
        const result:BaiTap[] = this.baitapList.filter((baitap: BaiTap) => filter.SearchTerm == '' || (filter.SearchTerm != '' && baitap.TenBaiTap.toLowerCase().indexOf(filter.SearchTerm.toLowerCase()) != -1));
	return result;
    }
    
    getBaiTap(id: any): BaiTap {
        if(id) {
            const result: BaiTap[] = this.baitapList.filter((baitap: BaiTap) => baitap.IdBaiTap == id);
            return new BaiTap(result[0].IdBaiTap,result[0].MaBaiTap, result[0].TenBaiTap,result[0].KhuVuc, result[0].DiaChi,result[0].GhiChu);
        }
        return new BaiTap(0,0, '', '','','');
    }

    addOrUpdateBaiTap(baitap: BaiTap): boolean {
        if(baitap && baitap.IdBaiTap == 0) {
            if (this.baitapList.filter((bt: BaiTap) => bt.MaBaiTap == baitap.MaBaiTap).length > 0) {
                return false;
            }
            baitap.IdBaiTap = Math.max.apply(Math, this.baitapList.map((bt: BaiTap) => bt.IdBaiTap)) + 1;
            baitap.MaBaiTap = Number.parseInt(baitap.MaBaiTap + '');
            this.baitapList.push(baitap);
        } else {
            baitap.MaBaiTap = Number.parseInt(baitap.MaBaiTap + '');
            if (this.baitapList.filter((bt: BaiTap) => bt.MaBaiTap == baitap.MaBaiTap && bt.IdBaiTap != baitap.IdBaiTap).length > 0) {
                return false;
            } else {
                const tempBaiTap: BaiTap[] = this.baitapList.filter((bt: BaiTap) => bt.IdBaiTap == baitap.IdBaiTap);
                tempBaiTap[0].TenBaiTap = baitap.TenBaiTap;
                tempBaiTap[0].MaBaiTap = baitap.MaBaiTap;
                tempBaiTap[0].KhuVuc = baitap.KhuVuc;
                tempBaiTap[0].DiaChi = baitap.DiaChi;
                tempBaiTap[0].GhiChu = baitap.GhiChu;

            }
        }
        return true;
    }

    deleteBaiTap(IdBaiTap: number) {
        const id: number = this.baitapList.map((baitap: BaiTap) => baitap.IdBaiTap).indexOf(IdBaiTap);
        if(id != -1) {
            this.baitapList.splice(id, 1);
        }
    }
}