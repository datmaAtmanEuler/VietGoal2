import { Injectable } from '@angular/core';
import { District } from '../../models/danhmuc/districts';
import { Filter } from '../../models/filter';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
    districtsList: any[] = [
{DistrictId: 1, MaDistrict: 55,DistrictName:'Hoàn Kiếm' ,ProvinceName: 'Thành phố Hà Nội'},
{DistrictId: 2, MaDistrict: 57,DistrictName:'Tây Hồ', ProvinceName: 'Thành phố Hà Nội'}
      ];

    constructor() {
    }

    getDistrictsList(filter: Filter) {
        const result:District[] = this.districtsList.filter((district: District) => filter.SearchTerm == '' || (filter.SearchTerm != '' && district.DistrictName.toLowerCase().indexOf(filter.SearchTerm.toLowerCase()) != -1));
	return result;
    }
    
    getDistrict(id: any): District {
        const result: District[] = this.districtsList.filter((district: District) => district.DistrictId == id);
	    return new District(result[0].DistrictId, result[0].MaDistrict, result[0].DistrictName, result[0].ProvinceName);
    }

    addOrUpdateDistrict(district: District): boolean {
        if(district.DistrictId == 0) {
            if (this.districtsList.filter((pro: District) => pro.MaDistrict == district.MaDistrict).length > 0) {
                return false;
            }
            district.DistrictId = this.districtsList.length + 1;
            this.districtsList.push(district);
        } else {
            if (this.districtsList.filter((pro: District) => pro.MaDistrict == district.MaDistrict && pro.DistrictId != district.DistrictId).length > 0) {
                return false;
            } else {
                const tempDistrict: District[] = this.districtsList.filter((pro: District) => pro.DistrictId == district.DistrictId);
                tempDistrict[0].MaDistrict = district.MaDistrict;
                tempDistrict[0].DistrictName=district.DistrictName;
                tempDistrict[0].ProvinceName = district.ProvinceName;
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