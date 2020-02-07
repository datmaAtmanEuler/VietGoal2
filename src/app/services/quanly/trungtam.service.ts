import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { Trungtam } from '../../models/quanly/trungtam';
import { Filter } from '../../models/filter';
@Injectable({
  providedIn: 'root'
})
export class TrungtamService {
    // httpOptions = { 
    //       headers: new HttpHeaders({  
    //         'Content-Type': 'application/json; charset=utf-8'  
    //       })  
    // }; 

    trungtamlist: Trungtam[] = [
        {Id: 1, MaTrungTam: 'TTv1', TenTrungTam: 'TT1', DiaChi: '189', DTKhuonVien: 123, GhiChu: 'dkfk', TinhThanh: 'tinh1', QuanHuyen: 'quan1', PhuongXa: 'xa1', NgayThanhLap: '2020-02-02', DienThoai: '0988488584', isHienThi: true},
        {Id: 2, MaTrungTam: 'TTv2', TenTrungTam: 'TT2', DiaChi: '189', DTKhuonVien: 123, GhiChu: 'dkfk', TinhThanh: 'tinh1', QuanHuyen: 'quan1', PhuongXa: 'xa1', NgayThanhLap: '2020-02-02', DienThoai: '0988488584', isHienThi: true},
        {Id: 3, MaTrungTam: 'TTv3', TenTrungTam: 'TT3', DiaChi: '189', DTKhuonVien: 123, GhiChu: 'dkfk', TinhThanh: 'tinh1', QuanHuyen: 'quan1', PhuongXa: 'xa1', NgayThanhLap: '2020-02-02', DienThoai: '0988488584', isHienThi: true},
        {Id: 4, MaTrungTam: 'TTv4', TenTrungTam: 'TT4', DiaChi: '189', DTKhuonVien: 123, GhiChu: 'dkfk', TinhThanh: 'tinh1', QuanHuyen: 'quan1', PhuongXa: 'xa1', NgayThanhLap: '2020-02-02', DienThoai: '0988488584', isHienThi: true},
        {Id: 5, MaTrungTam: 'TTv5', TenTrungTam: 'TT5', DiaChi: '189', DTKhuonVien: 123, GhiChu: 'dkfk', TinhThanh: 'tinh1', QuanHuyen: 'quan1', PhuongXa: 'xa1', NgayThanhLap: '2020-02-02', DienThoai: '0988488584', isHienThi: true},
        {Id: 6, MaTrungTam: 'TTv6', TenTrungTam: 'TT6', DiaChi: '189', DTKhuonVien: 123, GhiChu: 'dkfk', TinhThanh: 'tinh1', QuanHuyen: 'quan1', PhuongXa: 'xa1', NgayThanhLap: '2020-02-02', DienThoai: '0988488584', isHienThi: true},
        {Id: 7, MaTrungTam: 'TTv7', TenTrungTam: 'TT7', DiaChi: '189', DTKhuonVien: 123, GhiChu: 'dkfk', TinhThanh: 'tinh1', QuanHuyen: 'quan1', PhuongXa: 'xa1', NgayThanhLap: '2020-02-02', DienThoai: '0988488584', isHienThi: true},
        {Id: 8, MaTrungTam: 'TTv8', TenTrungTam: 'TT8', DiaChi: '189', DTKhuonVien: 123, GhiChu: 'dkfk', TinhThanh: 'tinh1', QuanHuyen: 'quan1', PhuongXa: 'xa1', NgayThanhLap: '2020-02-02', DienThoai: '0988488584', isHienThi: true},
        {Id: 9, MaTrungTam: 'TTv9', TenTrungTam: 'TT9', DiaChi: '189', DTKhuonVien: 123, GhiChu: 'dkfk', TinhThanh: 'tinh1', QuanHuyen: 'quan1', PhuongXa: 'xa1', NgayThanhLap: '2020-02-02', DienThoai: '0988488584', isHienThi: true},
        {Id: 10, MaTrungTam: 'TTv10', TenTrungTam: 'TT10', DiaChi: '189', DTKhuonVien: 123, GhiChu: 'dkfk', TinhThanh: 'tinh1', QuanHuyen: 'quan1', PhuongXa: 'xa1', NgayThanhLap: '2020-02-02', DienThoai: '0988488584', isHienThi: true},
        {Id: 11, MaTrungTam: 'TTv11', TenTrungTam: 'TT11', DiaChi: '189', DTKhuonVien: 123, GhiChu: 'dkfk', TinhThanh: 'tinh1', QuanHuyen: 'quan1', PhuongXa: 'xa1', NgayThanhLap: '2020-02-02', DienThoai: '0988488584', isHienThi: true},
        {Id: 12, MaTrungTam: 'TTv12', TenTrungTam: 'TT12', DiaChi: '189', DTKhuonVien: 123, GhiChu: 'dkfk', TinhThanh: 'tinh1', QuanHuyen: 'quan1', PhuongXa: 'xa1', NgayThanhLap: '2020-02-02', DienThoai: '0988488584', isHienThi: true},
        {Id: 13, MaTrungTam: 'TTv13', TenTrungTam: 'TT13', DiaChi: '189', DTKhuonVien: 123, GhiChu: 'dkfk', TinhThanh: 'tinh1', QuanHuyen: 'quan1', PhuongXa: 'xa1', NgayThanhLap: '2020-02-02', DienThoai: '0988488584', isHienThi: true},
        {Id: 14, MaTrungTam: 'TTv14', TenTrungTam: 'TT14', DiaChi: '189', DTKhuonVien: 123, GhiChu: 'dkfk', TinhThanh: 'tinh1', QuanHuyen: 'quan1', PhuongXa: 'xa1', NgayThanhLap: '2020-02-02', DienThoai: '0988488584', isHienThi: true},
        {Id: 15, MaTrungTam: 'TTv15', TenTrungTam: 'TT15', DiaChi: '189', DTKhuonVien: 123, GhiChu: 'dkfk', TinhThanh: 'tinh1', QuanHuyen: 'quan1', PhuongXa: 'xa1', NgayThanhLap: '2020-02-02', DienThoai: '0988488584', isHienThi: true},
        {Id: 16, MaTrungTam: 'TTv16', TenTrungTam: 'TT16', DiaChi: '189', DTKhuonVien: 123, GhiChu: 'dkfk', TinhThanh: 'tinh1', QuanHuyen: 'quan1', PhuongXa: 'xa1', NgayThanhLap: '2020-02-02', DienThoai: '0988488584', isHienThi: true},
        {Id: 17, MaTrungTam: 'TTv17', TenTrungTam: 'TT17', DiaChi: '189', DTKhuonVien: 123, GhiChu: 'dkfk', TinhThanh: 'tinh1', QuanHuyen: 'quan1', PhuongXa: 'xa1', NgayThanhLap: '2020-02-02', DienThoai: '0988488584', isHienThi: true},
        {Id: 18, MaTrungTam: 'TTv18', TenTrungTam: 'TT18', DiaChi: '189', DTKhuonVien: 123, GhiChu: 'dkfk', TinhThanh: 'tinh1', QuanHuyen: 'quan1', PhuongXa: 'xa1', NgayThanhLap: '2020-02-02', DienThoai: '0988488584', isHienThi: true},
        {Id: 19, MaTrungTam: 'TTv19', TenTrungTam: 'TT19', DiaChi: '189', DTKhuonVien: 123, GhiChu: 'dkfk', TinhThanh: 'tinh1', QuanHuyen: 'quan1', PhuongXa: 'xa1', NgayThanhLap: '2020-02-02', DienThoai: '0988488584', isHienThi: true},
        {Id: 20, MaTrungTam: 'TTv20', TenTrungTam: 'TT20', DiaChi: '189', DTKhuonVien: 123, GhiChu: 'dkfk', TinhThanh: 'tinh1', QuanHuyen: 'quan1', PhuongXa: 'xa1', NgayThanhLap: '2020-02-02', DienThoai: '0988488584', isHienThi: true},
        {Id: 21, MaTrungTam: 'TTv21', TenTrungTam: 'TT21', DiaChi: '189', DTKhuonVien: 123, GhiChu: 'dkfk', TinhThanh: 'tinh1', QuanHuyen: 'quan1', PhuongXa: 'xa1', NgayThanhLap: '2020-02-02', DienThoai: '0988488584', isHienThi: true},
        {Id: 22, MaTrungTam: 'TTv22', TenTrungTam: 'TT22', DiaChi: '189', DTKhuonVien: 123, GhiChu: 'dkfk', TinhThanh: 'tinh1', QuanHuyen: 'quan1', PhuongXa: 'xa1', NgayThanhLap: '2020-02-02', DienThoai: '0988488584', isHienThi: true},
        {Id: 23, MaTrungTam: 'TTv23', TenTrungTam: 'TT23', DiaChi: '189', DTKhuonVien: 123, GhiChu: 'dkfk', TinhThanh: 'tinh1', QuanHuyen: 'quan1', PhuongXa: 'xa1', NgayThanhLap: '2020-02-02', DienThoai: '0988488584', isHienThi: true},
        {Id: 24, MaTrungTam: 'TTv24', TenTrungTam: 'TT24', DiaChi: '189', DTKhuonVien: 123, GhiChu: 'dkfk', TinhThanh: 'tinh1', QuanHuyen: 'quan1', PhuongXa: 'xa1', NgayThanhLap: '2020-02-02', DienThoai: '0988488584', isHienThi: true},
        {Id: 25, MaTrungTam: 'TTv25', TenTrungTam: 'TT25', DiaChi: '189', DTKhuonVien: 123, GhiChu: 'dkfk', TinhThanh: 'tinh1', QuanHuyen: 'quan1', PhuongXa: 'xa1', NgayThanhLap: '2020-02-02', DienThoai: '0988488584', isHienThi: true},
        {Id: 26, MaTrungTam: 'TTv26', TenTrungTam: 'TT26', DiaChi: '189', DTKhuonVien: 123, GhiChu: 'dkfk', TinhThanh: 'tinh1', QuanHuyen: 'quan1', PhuongXa: 'xa1', NgayThanhLap: '2020-02-02', DienThoai: '0988488584', isHienThi: true},
        {Id: 27, MaTrungTam: 'TTv27', TenTrungTam: 'TT27', DiaChi: '189', DTKhuonVien: 123, GhiChu: 'dkfk', TinhThanh: 'tinh1', QuanHuyen: 'quan1', PhuongXa: 'xa1', NgayThanhLap: '2020-02-02', DienThoai: '0988488584', isHienThi: true}
    ];

    constructor() {
    }

    getTrungtamsList(filter: Filter) {
        const result:Trungtam[] = this.trungtamlist.filter((trungtam: Trungtam) => filter.SearchTerm == '' || (filter.SearchTerm != '' && trungtam.TenTrungTam.toLowerCase().indexOf(filter.SearchTerm.toLowerCase()) != -1));
        return result;
    }
    
    getTrungtam(id: any): Trungtam {
        const result: Trungtam[] = this.trungtamlist.filter((trungtam: Trungtam) => trungtam.Id == id);
        return new Trungtam(result[0].Id, result[0].MaTrungTam, result[0].TenTrungTam, result[0].DiaChi, result[0].DTKhuonVien
            , result[0].TinhThanh, result[0].QuanHuyen, result[0].PhuongXa, result[0].DienThoai, result[0].NgayThanhLap, result[0].GhiChu, result[0].isHienThi);
    }

    addOrUpdateTrungtam(trungtam: Trungtam): boolean {
        if(trungtam.Id == 0) {
            if (this.trungtamlist.filter((tt: Trungtam) => tt.MaTrungTam == trungtam.MaTrungTam).length > 0) {
                return false;
            }
            trungtam.Id = this.trungtamlist.length + 1;
            this.trungtamlist.push(trungtam);
        } else {
            if (this.trungtamlist.filter((tt: Trungtam) => tt.MaTrungTam == trungtam.MaTrungTam && tt.Id != trungtam.Id).length > 0) {
                return false;
            } else {
                const temptrungtam: Trungtam[] = this.trungtamlist.filter((tt: Trungtam) => tt.Id == trungtam.Id);
                temptrungtam[0].MaTrungTam = trungtam.MaTrungTam;
                temptrungtam[0].TenTrungTam = trungtam.TenTrungTam;
                temptrungtam[0].DiaChi = trungtam.DiaChi;
                temptrungtam[0].DTKhuonVien = trungtam.DTKhuonVien;
                temptrungtam[0].TinhThanh = trungtam.TinhThanh;
                temptrungtam[0].QuanHuyen = trungtam.QuanHuyen;
                temptrungtam[0].PhuongXa = trungtam.PhuongXa;
                temptrungtam[0].DienThoai = trungtam.DienThoai;
                temptrungtam[0].NgayThanhLap = trungtam.NgayThanhLap;
                temptrungtam[0].GhiChu = trungtam.GhiChu;
                temptrungtam[0].isHienThi = trungtam.isHienThi;
                console.log(this.trungtamlist);
            }
        }
        return true;
    }

    deleteTrungtam(trungtamId: number) {
        const id: number = this.trungtamlist.map((trungtam: Trungtam) => trungtam.Id).indexOf(trungtamId);
        if(id != -1) {
            this.trungtamlist.splice(id, 1);
        }
    }
}