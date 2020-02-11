import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { ThongBao } from '../../models/quanly/thongbao';
import { Filter } from '../../models/filter/filter';
@Injectable({
  providedIn: 'root'
})
export class ThongBaoService {
    thongbaoList: ThongBao[] = [
        new ThongBao(1, 'Thông báo cúp điện tháng 2', '', new Date(2020, 2, 3), new Date(2020, 2, 4), 0, 5, 'Tháng 2 sẽ cúp điện diện rộng <br/><li>Phường 2</li>Phường 5</li>Phường 10</li>'),
        new ThongBao(1, 'Thông báo du lịch tháng 2', '', new Date(2020, 2, 4), new Date(2020, 2, 5), 0, 5, 'Công ty ASC sẽ đài thọ: <br/><li>100% chi phí du lịch (bao ăn, ở, tiêu dùng cơ bản) cho anh em đạt danh hiệu chiến sĩ thi đua</li><li>50% chi phí du lịch (bao ăn, ở, tiêu dùng cơ bản) cho anh em khác</li>'),
        new ThongBao(1, 'Thông báo đình chỉ công tác đối với ông Châu Dân Gian', '', new Date(2020, 2, 4), new Date(2020, 2, 11), 0, 5, 'Ngày 11/12/2019 vừa qua, ông Châu Dân Gian đã dính líu tới vụ bê bối cướp của giết người tại Vũ Hán. Vụ việc đang được lực lượng Công An Tp.Hồ Chí Minh điều tra')
    ];

    constructor() {
    }

    getThongBaoList(filter: Filter) {
        const result:ThongBao[] = this.thongbaoList.filter((thongbao: ThongBao) => filter.SearchTerm == '' || (filter.SearchTerm != '' && (thongbao.Title.toLowerCase().indexOf(filter.SearchTerm.toLowerCase()) != -1 || thongbao.Details.toLowerCase().indexOf(filter.SearchTerm.toLowerCase()) != -1)));
        return result;
    }
    
    getThongBao(id: any): ThongBao {
	   if(id) {
        const result: ThongBao[] = this.thongbaoList.filter((thongbao: ThongBao) => thongbao.ID == id);
        return new ThongBao(result[0].ID, result[0].Title, result[0].FileDinhKem, result[0].CreatedDate, result[0].ExpiredDate, result[0].ViewedCount, result[0].UnViewedCount, result[0].Details);
	   }
	return new ThongBao(0, '', '', null, null, 0, 0, '');
    }

    addOrUpdateThongBao(thongbao: ThongBao): boolean {
        if(thongbao.ID == 0) {
            thongbao.ID = Math.max.apply(this.thongbaoList.map((tb: ThongBao) => tb.ID)) + 1;
	        thongbao.ViewedCount = 0;
	        thongbao.UnViewedCount = 0;
            this.thongbaoList.push(thongbao);
        } else {
            const tempthongbao: ThongBao[] = this.thongbaoList.filter((tb: ThongBao) => tb.ID == thongbao.ID);
            tempthongbao[0].Title = thongbao.Title;
            tempthongbao[0].FileDinhKem = thongbao.FileDinhKem;
            tempthongbao[0].CreatedDate = thongbao.CreatedDate;
            tempthongbao[0].ExpiredDate = thongbao.ExpiredDate;
            tempthongbao[0].ViewedCount = thongbao.ViewedCount + 1;
            tempthongbao[0].UnViewedCount = thongbao.UnViewedCount - 1;
            tempthongbao[0].Details = thongbao.Details;

        }
        return true;
    }

    deleteThongBao(ID: number) {
        const idIndex: number = this.thongbaoList.map((tb: ThongBao) => tb.ID).indexOf(ID);
        if(idIndex != -1) {
            this.thongbaoList.splice(idIndex, 1);
        }
    }
}