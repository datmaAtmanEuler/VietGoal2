import { Injectable } from '@angular/core';
import { Ward } from '../../models/danhmuc/wards';
import { Filter } from '../../models/filter';

@Injectable({
  providedIn: 'root'
})
export class WardService {
    wardsList: any[] = [
{WardId: 1, MaWard: 25,WardName:'Phường Ngọc Khánh' ,DistrictName: 'Quận Ba Đình'},
{WardId: 2, MaWard: 28,WardName:'Phường Kim Mã' ,DistrictName: 'Quận Ba Đình'},
      ];

    constructor() {
    }

    getWardsList(filter: Filter) {
        const result:Ward[] = this.wardsList.filter((ward: Ward) => filter.SearchTerm == '' || (filter.SearchTerm != '' && ward.WardName.toLowerCase().indexOf(filter.SearchTerm.toLowerCase()) != -1));
	return result;
    }
    
    getWard(id: any): Ward {
        const result: Ward[] = this.wardsList.filter((ward: Ward) => ward.WardId == id);
	    return new Ward(result[0].WardId, result[0].MaWard, result[0].WardName, result[0].DistrictName);
    }

    addOrUpdateWard(ward: Ward): boolean {
        if(ward.WardId == 0) {
            if (this.wardsList.filter((war: Ward) => war.MaWard == ward.MaWard).length > 0) {
                return false;
            }
            ward.WardId = this.wardsList.length + 1;
            this.wardsList.push(ward);
        } else {
            if (this.wardsList.filter((war: Ward) => war.MaWard == ward.MaWard && war.WardId != ward.WardId).length > 0) {
                return false;
            } else {
                const tempWard: Ward[] = this.wardsList.filter((war: Ward) => war.WardId == ward.WardId);
                tempWard[0].MaWard = ward.MaWard;
                tempWard[0].DistrictName=ward.DistrictName;
                tempWard[0].WardName = ward.WardName;
            }
        }
        return true;
    }

    deleteWard(WardId: number) {
        const id: number = this.wardsList.map((ward: Ward) => ward.WardId).indexOf(WardId);
        if(id != -1) {
            this.wardsList.splice(id, 1);
        }
    }
}