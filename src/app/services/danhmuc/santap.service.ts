import { Injectable } from '@angular/core';
import { SanTap } from '../../models/danhmuc/santap';
import { Filter } from '../../models/filter';

@Injectable({
  providedIn: 'root'
})
export class SanTapService {
    santapList: any[] = [
    {IdSanTap: 1,MaSan:15, TenSan: 'Sân Ba Đình', TrungTam: 1,KhuVuc: 'Ba Đình',DiaChi:'Ba Đình, Hà Nội',DTKhuonVien:500,GhiChu:''},
    {IdSanTap: 2,MaSan:17, TenSan: 'Sân Mỹ Đình', TrungTam: 2,KhuVuc: 'Mỹ Đình',DiaChi:'Mỹ Đình',DTKhuonVien:1000,GhiChu:''},
      ];

    constructor() {
    }

    getSanTapList(filter: Filter) {
        const result:SanTap[] = this.santapList.filter((santap: SanTap) => filter.SearchTerm == '' || (filter.SearchTerm != '' && santap.TenSan.toLowerCase().indexOf(filter.SearchTerm.toLowerCase()) != -1));
	return result;
    }
    
    getSanTap(id: any): SanTap {
        if(id) {
            const result: SanTap[] = this.santapList.filter((santap: SanTap) => santap.IdSanTap == id);
            return new SanTap(result[0].IdSanTap,result[0].MaSan, result[0].TenSan, result[0].TrungTam,result[0].KhuVuc, result[0].DiaChi, result[0].DTKhuonVien, result[0].GhiChu);
        }
        return new SanTap(0,0, '', 0,'','',0,'');
    }

    addOrUpdateSanTap(santap: SanTap): boolean {
        if(santap && santap.IdSanTap == 0) {
            if (this.santapList.filter((st: SanTap) => st.MaSan == santap.MaSan).length > 0) {
                return false;
            }
            santap.IdSanTap = Math.max.apply(Math, this.santapList.map((st: SanTap) => st.IdSanTap)) + 1;
            santap.MaSan = Number.parseInt(santap.MaSan + '');
            this.santapList.push(santap);
        } else {
            santap.MaSan = Number.parseInt(santap.MaSan + '');
            if (this.santapList.filter((st: SanTap) => st.MaSan == santap.MaSan && st.IdSanTap != santap.IdSanTap).length > 0) {
                return false;
            } else {
                const tempSanTap: SanTap[] = this.santapList.filter((st: SanTap) => st.IdSanTap == santap.IdSanTap);
                tempSanTap[0].TenSan = santap.TenSan;
                tempSanTap[0].MaSan = santap.MaSan;
                tempSanTap[0].KhuVuc = santap.KhuVuc;
                tempSanTap[0].TrungTam = santap.TrungTam;
                tempSanTap[0].DiaChi = santap.DiaChi;
                tempSanTap[0].DTKhuonVien = santap.DTKhuonVien;
                tempSanTap[0].GhiChu = santap.GhiChu;

            }
        }
        return true;
    }

    deleteSanTap(IdSanTap: number) {
        const id: number = this.santapList.map((santap: SanTap) => santap.IdSanTap).indexOf(IdSanTap);
        if(id != -1) {
            this.santapList.splice(id, 1);
        }
    }
}