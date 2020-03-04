import { Component, OnInit, ViewChild} from '@angular/core';
import { WardService } from '../../../services/list/ward.service';
import { DistrictService } from '../../../services/list/district.service';
import { ProvinceService } from '../../../services/list/province.service';
import { Ward } from '../../../models/list/wards';
import { WardFilter } from '../../../models/filter/wardfilter';
import { Filter } from '../../../models/filter/filter';
import { DistrictFilter } from '../../../models/filter/districtfilter';
import { Router } from '@angular/router'; 
import { WardEditComponent } from './wardedit/wardedit.component';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { ASCSort, SORD_DIRECTION } from 'app/models/sort';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { WardImportComponent } from './wards-import/ward-import.component';
import { Province } from 'app/models/list/province';
import { District } from 'app/models/list/districts';

import { FormControl } from '@angular/forms';
import { CommonFilter } from 'app/models/filter/commonfilter';
import { UtilsService } from 'app/services/utils.service';

@Component({
  selector: 'app-wards',
  templateUrl: './wards.component.html',
  styleUrls: ['./wards.component.scss']
})
export class WardsComponent implements OnInit {
  wardsList:any[] = [];
  provincesList:any[] = [];
  districtsList:any[] = [];
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSizesList: number[] = [5, 10, 20, 100];
  pageSize:number = this.pageSizesList[1];
  currentUser: any;
  isLoading: boolean = true;
  firstRowOnPage: any;
  provinceId: null | number ;
  districtId: null | number ;
  searchProvincesCtrl = new FormControl();
  searchDistrictsCtrl = new FormControl();
  searchAdvanced: boolean = false;
  mainFilter = new CommonFilter();
  /**
   * BEGIN SORT SETTINGS
   */
  paginationSettings: any = {
    sort: new ASCSort(),
    sortToggles: [
      null,
      SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC,
      null
    ],
    columnsName: ['Order', 'WardCode', 'WardName',  'DistrictName', 'Action'],
    columnsNameMapping:  ['id', 'wardCode', 'wardName',  'districtName', ''],
    sortAbles: [false, true, true, true, false],
    visibles: [true, true, true, true, true]
  }

  /**
   * END SORT SETTINGS
   */
   districtFilter: DistrictFilter = new DistrictFilter( this.searchTerm,this.pageIndex, this.pageSize,0, 'id','ASC');
   provinceFilter: Filter = new Filter( this.searchTerm,this.pageIndex, this.pageSize, 'id','ASC');
  Total: any;

  constructor(public utilsService: UtilsService ,private translate: TranslateService, private service: WardService, private provinceService: ProvinceService, private districtService: DistrictService, private router: Router,
    private matCus: MatPaginatorIntl,config: NgbModalConfig,
    private modalService: NgbModal) { 
      config.backdrop = 'static';
      config.keyboard = false;
      config.scrollable = false;
      this.updateMatTableLabel();
      translate.onLangChange.subscribe((a: any) => {
        this.updateMatTableLabel();
        matCus.changes.next();
      });
    }

    ngOnInit() {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.mainFilter.PageIndex = 1;
      this.mainFilter.PageSize = this.pageSizesList[1];
      
      this.provinceService.getProvincesList(this.provinceFilter).subscribe((response: any) => {
        this.provincesList = response.results;
      });
      this.districtService.getDistrictsList(this.districtFilter).subscribe((response: any) => {
        this.districtsList = response.results;
      });
      this.reload();
      const vgscroll = <HTMLElement>document.querySelector('.vg-scroll');
      new PerfectScrollbar(vgscroll);
    }
  updateMatTableLabel() {
    this.matCus.itemsPerPageLabel = this.translate.instant('MESSAGE.NameList.ItemsPerPage');
    this.matCus.getRangeLabel =  (page: number, pageSize: number, length: number): string => {
        if (length === 0 || pageSize === 0) {
          return this.translate.instant('MESSAGE.NameList.NoRecord');
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return this.translate.instant('MESSAGE.NameList.PageFromToOf', { startIndex: startIndex + 1, endIndex, length });
      }
  }
  remove(id: any) {
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { windowClass: 'modal-confirm' });
    modalRef.componentInstance.confirmObject = 'Wards';
    modalRef.componentInstance.decide.subscribe(() => {
        _this.service.deleteWard(id).subscribe(()=>{
          _this.reload()
        });
    });
}
pageEvent(variable: any){
  this.mainFilter.PageIndex = variable.pageIndex + 1;
  this.mainFilter.PageSize = variable.pageSize;
  this.reload();
}

search() {
  this.reload();
  this.mainFilter.SearchTerm = '';
}
reload() {
  const _this = this;
  this.isLoading = true;
  this.mainFilter.SortName = this.paginationSettings.sort.SortName;
  this.mainFilter.SortDirection = this.paginationSettings.sort.SortDirection;
  this.service.getWardsList(this.mainFilter).subscribe(
    (response: any) => {
      const list = response.results ? response.results : [];
  this.Total = (response && response.rowCount) ? response.rowCount : 0;
  this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
      setTimeout(() => {
        _this.wardsList = (list) ? list : [];
        _this.isLoading = false;
      }, 500);
    },
    (err: any) => {
      _this.wardsList = [];
      _this.isLoading = false;
    }
);
}
  add() {
    this.edit(null);
  }
  edit(id: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(WardEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    if (id) {
      modalRef.componentInstance.id = id;
    }
    modalRef.result.then(function(){
      _this.reload();
  });
  }

  doNothing(): void {}
  
  openImport() {
    const _this = this;
    const modalRef = this.modalService.open(WardImportComponent, { size: 'lg' });
    modalRef.result.then(function(importModel: any){
        console.log(importModel);
    });
  }

  downloadTemplate() {
    var fileName = 'Districts_Import.xlsx';
    var a = document.createElement('a');
    a.href = this.service.getTemplate(fileName);
    a.download = fileName;
    document.body.append(a);
    a.click();
    a.remove();
  }

displayProvinceFn(province: any) {
    return province && province.provinceName && !province.notfound ? province.provinceName : '';
  }

changeProvince(provinceId: number) {
    this.districtFilter.provinceId = provinceId;
    this.districtService.getDistrictsList(this.districtFilter).subscribe((response: any) => {
      this.districtsList = response.results;
    });
  }

  displayDistrictFn(district: any) {
    return district && district.districtName && !district.notfound ? district.districtName : '';
  }

changeDistrict(districtId: number) {
    this.mainFilter.DistrictId = districtId;
    this.reload();
  }
}
