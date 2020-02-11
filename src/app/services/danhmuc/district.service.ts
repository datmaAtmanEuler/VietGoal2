import { Injectable } from '@angular/core';
import { District } from '../../models/danhmuc/districts';
import { Filter } from '../../models/filter';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
    httpOptions = {  
          headers: new HttpHeaders({  
            'Content-Type': 'application/json; charset=utf-8'  
          })  
    }; 

    districtsList: any[] = [
{DistrictId: 1, MaDistrict: 55,DistrictName:'Hoàn Kiếm' ,ProvinceName: 'Thành phố Hà Nội',SoThuTu:0},
{DistrictId: 2, MaDistrict: 57,DistrictName:'Tây Hồ', ProvinceName: 'Thành phố Hà Nội',SoThuTu:0}
      ];

    constructor() {
    }

    getDistrictsList(filter: Filter) {
        const result:District[] = this.districtsList.filter((district: District) => filter.SearchTerm == '' || (filter.SearchTerm != '' && district.DistrictName.toLowerCase().indexOf(filter.SearchTerm.toLowerCase()) != -1));
	return result;
    }
    
    getDistrict(id: any): District {
        const result: District[] = this.districtsList.filter((district: District) => district.DistrictId == id);
	    return new District(result[0].DistrictId, result[0].MaDistrict, result[0].DistrictName, result[0].ProvinceName,result[0].SoThuTu);
    }

    addOrUpdateDistrict(district: District): boolean {
        if(district && district.DistrictId == 0) {
            if (this.districtsList.filter((pro: District) => pro.MaDistrict == district.MaDistrict).length > 0) {
                return false;
            }
            district.DistrictId = Math.max.apply(Math, this.districtsList.map((dis: District) => dis.DistrictId)) + 1;
            district.MaDistrict = Number.parseInt(district.MaDistrict + '');
            this.districtsList.push(district);
        } else {
            district.MaDistrict = Number.parseInt(district.MaDistrict + '');
            if (this.districtsList.filter((dis: District) => dis.MaDistrict == district.MaDistrict && dis.DistrictId != district.DistrictId).length > 0) {
                return false;
            } else {
                const tempDistrict: District[] = this.districtsList.filter((dis: District) => dis.DistrictId == district.DistrictId);
                tempDistrict[0].MaDistrict = district.MaDistrict;
                tempDistrict[0].DistrictName=district.DistrictName;
                tempDistrict[0].ProvinceName = district.ProvinceName;
                tempDistrict[0].SoThuTu = district.SoThuTu;
            }
        }
        return true;
    }

    deleteDistrict(DistrictId: number) {
        const id: number = this.districtsList.map((district: District) => district.DistrictId).indexOf(DistrictId);
        if(id != -1) {
            this.districtsList.splice(id, 1);
        }
    }
}