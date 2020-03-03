import { Component, OnInit} from '@angular/core';
import { DistrictService } from '../../../services/list/district.service';
import { ProvinceService } from '../../../services/list/province.service';
import { District } from '../../../models/list/districts';
import { DistrictFilter } from '../../../models/filter/districtfilter';
import { Router } from '@angular/router'; 
import { DistrictEditComponent } from './districtedit/districtedit.component';
import { UtilsService } from '../../../services/utils.service';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { Province } from 'app/models/list/province';
import { Filter } from 'app/models/filter/filter';
import { ASCSort, SORD_DIRECTION } from 'app/models/sort';
import { DistrictImportComponent } from './districts-import/district-import.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import PerfectScrollbar from 'perfect-scrollbar';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-districts',
  templateUrl: './districts.component.html',
  styleUrls: ['./districts.component.scss']
})
export class DistrictsComponent implements OnInit {
  districtsList:any[] = [];
  district: any;
  provincesList: any[]=[];
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSizesList: number[] = [5, 10, 20, 100];
  pageSize:number = this.pageSizesList[1];
  currentUser: any;
  loading: boolean = true;
  firstRowOnPage: any;
  searchProvincesCtrl = new FormControl();
  searchAdvanced: boolean = false;
  provinceFilter: Filter = new Filter( this.searchTerm,this.pageIndex, this.pageSize, 'id','ASC');
  filter: DistrictFilter = new DistrictFilter( this.searchTerm,this.pageIndex, this.pageSize,null, 'id','ASC');

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
  columnsName: ['Order', 'DistrictCode', 'DistrictName', 'ProvinceName', 'Action'],
  columnsNameMapping: ['id', 'districtCode', 'districtName', 'provinceId', ''],
  sortAbles: [false, true, true, true, false],
  visibles:  [true, true, true, true, true]
}
  /**
   * END SORT SETTINGS
   */

  isLoading: boolean  = true;

  constructor(private translate: TranslateService, public util: UtilsService,
    private provinceService: ProvinceService,
   private service: DistrictService, private router: Router, 
    private matCus: MatPaginatorIntl,config: NgbModalConfig,private modalService: NgbModal) { 
      config.backdrop = 'static';
      config.keyboard = false;
      config.scrollable = false;
      this.updateMatTableLabel();
      translate.onLangChange.subscribe((a: any) => {
        this.updateMatTableLabel();
        matCus.changes.next();
      });
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
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.reload();
    const vgscroll = <HTMLElement>document.querySelector('.vg-scroll');
    new PerfectScrollbar(vgscroll);
  }

  remove(district: District) {
    this.district = district;
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { windowClass: 'modal-confirm' });
    modalRef.componentInstance.confirmObject = 'District';
    modalRef.componentInstance.decide.subscribe(() => {
        _this.deleteDistrict();
    });
}

pageEvent(variable: any){
  this.pageIndex = variable.pageIndex+1;
  this.pageSize = variable.pageSize;
  this.reload();
}
reload() {
  const _this = this;
  _this.provincesList = [];
  this.isLoading = true;
  this.provinceService.getProvincesList(_this.provinceFilter).subscribe(
      (response: any) => {
        const list = response.results ? response.results : [];
        _this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
        setTimeout(() => {
          _this.provincesList = (list) ? list : [];
          _this.districtsList = [];
          _this.service.getDistrictsList(_this.filter).subscribe(
              (response: any) => {
                const list = response.results ? response.results : [];
                _this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
                setTimeout(() => {
                  _this.districtsList = (list) ? list : [];
                  _this.isLoading = false;
                }, 500);
              },
              (err: any) => {
                _this.districtsList = [];
                _this.isLoading = false;
              }
          );
        }, 500);
      },
      (err: any) => {
        _this.provincesList = [];
        _this.isLoading = false;
      }
  );
}

  add() {
    this.edit(null);
  }

  edit(id: number) {
    const _this = this;
    const modalRef = this.modalService.open(DistrictEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    if (id) {
      modalRef.componentInstance.id = id;
    }
    modalRef.result.then(function(){
        _this.reload();
    });
  }

  deleteDistrict() {
    const _this = this;
    _this.service.deleteDistrict(_this.district.id).subscribe((res: any) => {
      _this.reload();
    });
  }
  
  
  
  doNothing(): void {}
  
  openImport() {
    const _this = this;
    const modalRef = _this.modalService.open(DistrictImportComponent, { size: 'lg' });
    modalRef.result.then(function(importModel: any){
       
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

  changeProvince(provinceId) {
    this.service.getDistrictsList(new DistrictFilter('', 1, 100, provinceId, 'id', 'ASC')).subscribe((response) => {
      this.districtsList = response.results;
      this.filter.ProvinceId = provinceId;
      this.reload();
    });
  }
}
