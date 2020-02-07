import { Injectable } from '@angular/core';
import { Chucvu } from '../../models/danhmuc/Chucvu';
import { Filter } from '../../models/filter';

@Injectable({
  providedIn: 'root'
})
export class ChucvuService {
    chucvuList: Chucvu[] = [
        {Id: 1, MaChucVu: 'cv1', TenChucVu: 'chuc vu 1', SoThuTu: 1},
        {Id: 2, MaChucVu: 'cv2', TenChucVu: 'chuc vu 2', SoThuTu: 2},
        {Id: 3, MaChucVu: 'cv3', TenChucVu: 'chuc vu 3', SoThuTu: 3},
        {Id: 4, MaChucVu: 'cv4', TenChucVu: 'chuc vu 4', SoThuTu: 4},
        {Id: 5, MaChucVu: 'cv5', TenChucVu: 'chuc vu 5', SoThuTu: 5},
        {Id: 6, MaChucVu: 'cv6', TenChucVu: 'chuc vu 6', SoThuTu: 6},
        {Id: 7, MaChucVu: 'cv7', TenChucVu: 'chuc vu 7', SoThuTu: 7},
        {Id: 8, MaChucVu: 'cv8', TenChucVu: 'chuc vu 8', SoThuTu: 8},
        {Id: 9, MaChucVu: 'cv9', TenChucVu: 'chuc vu 9', SoThuTu: 9},
        {Id: 11, MaChucVu: 'cv11', TenChucVu: 'chuc vu 11', SoThuTu: 11},
        {Id: 10, MaChucVu: 'cv10', TenChucVu: 'chuc vu 10', SoThuTu: 10},
        {Id: 12, MaChucVu: 'cv12', TenChucVu: 'chuc vu 12', SoThuTu: 12},
        {Id: 13, MaChucVu: 'cv13', TenChucVu: 'chuc vu 13', SoThuTu: 13},
        {Id: 14, MaChucVu: 'cv14', TenChucVu: 'chuc vu 14', SoThuTu: 14},
        {Id: 15, MaChucVu: 'cv15', TenChucVu: 'chuc vu 15', SoThuTu: 15},
        {Id: 16, MaChucVu: 'cv16', TenChucVu: 'chuc vu 16', SoThuTu: 16},
        {Id: 17, MaChucVu: 'cv17', TenChucVu: 'chuc vu 17', SoThuTu: 17},
        {Id: 18, MaChucVu: 'cv18', TenChucVu: 'chuc vu 18', SoThuTu: 18},
        {Id: 19, MaChucVu: 'cv19', TenChucVu: 'chuc vu 19', SoThuTu: 19},
        {Id: 20, MaChucVu: 'cv20', TenChucVu: 'chuc vu 20', SoThuTu: 20},
        {Id: 21, MaChucVu: 'cv21', TenChucVu: 'chuc vu 21', SoThuTu: 21}
    ];

    constructor() {
    }

    getChucvuList(filter: Filter) {
        const result:Chucvu[] = this.chucvuList.filter((chucvu: Chucvu) => filter.SearchTerm == '' || (filter.SearchTerm != '' && chucvu.TenChucVu.toLowerCase().indexOf(filter.SearchTerm.toLowerCase()) != -1));
	    return result;
    }
    
    getChucvu(id: any): Chucvu {
        if(id) {
            const result: Chucvu[] = this.chucvuList.filter((Chucvu: Chucvu) => Chucvu.Id == id);
            return new Chucvu(result[0].Id, result[0].MaChucVu, result[0].TenChucVu, result[0].SoThuTu);
        }
        return new Chucvu(0, '', '', 0);
    }

    addOrUpdateChucvu(chucvu: Chucvu): boolean {
        if(chucvu.Id == 0) {
            if (this.chucvuList.filter((cv: Chucvu) => cv.MaChucVu == chucvu.MaChucVu).length > 0) {
                return false;
            }
            chucvu.Id = this.chucvuList.length + 1;
            this.chucvuList.push(chucvu);
        } else {
            if (this.chucvuList.filter((cv: Chucvu) => cv.MaChucVu == chucvu.MaChucVu && cv.Id != chucvu.Id).length > 0) {
                return false;
            } else {
                const tempchucvu: Chucvu[] = this.chucvuList.filter((cv: Chucvu) => cv.Id == chucvu.Id);
                tempchucvu[0].MaChucVu = chucvu.MaChucVu;
                tempchucvu[0].TenChucVu = chucvu.TenChucVu;
                tempchucvu[0].SoThuTu = chucvu.SoThuTu;
            }
        }
        return true;
    }

    deleteChucvu(chucvuId: number) {
        const id: number = this.chucvuList.map((cv: Chucvu) => cv.Id).indexOf(chucvuId);
        if(id != -1) {
            this.chucvuList.splice(id, 1);
        }
    }
}