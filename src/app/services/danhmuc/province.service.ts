import { Injectable } from '@angular/core';
import { Province } from '../../models/danhmuc/province';
import { Filter } from '../../models/filter';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
    provincesList: any[] = [
    {ProvinceId: 1, MaProvince: 55, ProvinceName: 'Khanh Hoa'},
    {ProvinceId: 2, MaProvince: 57, ProvinceName: 'Quy nhon'}
      ];

    constructor() {
    }

    getProvincesList(filter: Filter) {
        const result:Province[] = this.provincesList.filter((province: Province) => filter.SearchTerm == '' || (filter.SearchTerm != '' && province.ProvinceName.toLowerCase().indexOf(filter.SearchTerm.toLowerCase()) != -1));
	return result;
    }
    
    getProvince(id: any): Province {
        if(id) {
            const result: Province[] = this.provincesList.filter((province: Province) => province.ProvinceId == id);
            return new Province(result[0].ProvinceId, result[0].MaProvince, result[0].ProvinceName);
        }
        return new Province(0, 0, '');
    }

    addOrUpdateProvince(province: Province): boolean {
        if(province && province.ProvinceId == 0) {
            if (this.provincesList.filter((pro: Province) => pro.MaProvince == province.MaProvince).length > 0) {
                return false;
            }
            province.ProvinceId = Math.max.apply(Math, this.provincesList.map((prov: Province) => prov.ProvinceId)) + 1;
            province.MaProvince = Number.parseInt(province.MaProvince + '');
            this.provincesList.push(province);
        } else {
            province.MaProvince = Number.parseInt(province.MaProvince + '');
            if (this.provincesList.filter((pro: Province) => pro.MaProvince == province.MaProvince && pro.ProvinceId != province.ProvinceId).length > 0) {
                return false;
            } else {
                const tempProvince: Province[] = this.provincesList.filter((pro: Province) => pro.ProvinceId == province.ProvinceId);
                tempProvince[0].MaProvince = province.MaProvince;
                tempProvince[0].ProvinceName = province.ProvinceName;
            }
        }
        return true;
    }

    deleteProvince(ProvinceId: number) {
        const id: number = this.provincesList.map((province: Province) => province.ProvinceId).indexOf(ProvinceId);
        if(id != -1) {
            this.provincesList.splice(id, 1);
        }
    }
}