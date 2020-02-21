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
@Component({
  selector: 'app-districts',
  templateUrl: './districts.component.html',
  styleUrls: ['./districts.component.scss']
})
export class DistrictsComponent implements OnInit {
  districtsList:District[] = [];
  district: District;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSizesList: number[] = [5, 10, 20, 100];
  pageSize:number = this.pageSizesList[1];
  currentUser: any;
  loading: boolean = true;
  Total: any;
  firstRowOnPage: any;
  /**
   * BEGIN SORT SETTINGS
   */
  sort: ASCSort = new ASCSort();
  sortToggles: SORD_DIRECTION[] = [null, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, null];
  columnsName: string[] = ['Order', 'DistrictCode', 'DistrictName', 'ProvinceName', 'Action'];
  columnsNameMapping: string[] = ['ID', 'DistrictCode', 'DistrictName', 'ProvinceName', 'Action'];
  sortAbles: boolean[] = [false, true, true, true, false];
  /**
   * END SORT SETTINGS
   */

  constructor(private translate: TranslateService, public util: UtilsService, private service: DistrictService, private router: Router, 
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
    const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
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
  const filter: DistrictFilter = new DistrictFilter( this.searchTerm,this.pageIndex, this.pageSize,null, 'Id','ASC');
  this.loading = true;
  _this.districtsList = [];
  this.service.getDistrictsList(filter).subscribe(
      (response: any) => {
        const list = response.results ? response.results : [];
        this.Total = (response && response.rowCount) ? response.rowCount : 0;
        this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
        setTimeout(() => {
          _this.districtsList = (list) ? list : [];
          _this.loading = false;
        }, 500);
      },
      (err: any) => {
        _this.districtsList = [];
        _this.loading = false;
      }
  );
}

  add() {
    this.edit(null);
  }

  edit(ID: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(DistrictEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    if (ID) {
      modalRef.componentInstance.ID = ID;
      modalRef.componentInstance.UserId = _this.currentUser.UserId;
    }
    modalRef.result.then(function(){
      _this.reload();
  });
  }

  deleteDistrict() {
    const _this = this;
    this.service.deleteDistrict(this.district.Id, this.currentUser.UserId).subscribe((res: any) => {
      _this.reload();
    });
  }
  
  toggleSort(columnIndex: number): void {
    let toggleState =  this.sortToggles[columnIndex];
    switch(toggleState) {
      case SORD_DIRECTION.DEFAULT: 
      {
        toggleState = SORD_DIRECTION.ASC;
        break;
      }
      case SORD_DIRECTION.ASC: 
      {
        toggleState = SORD_DIRECTION.DESC;
        break;
      }
      default:
      {
        toggleState = SORD_DIRECTION.DEFAULT;
        break;
      }
    }
    this.sortToggles.forEach((s: string, index: number) => {
      if(index == columnIndex) {
        this.sortToggles[index] = this.sort.SortDirection = toggleState;
      } else {
        this.sortToggles[index] = SORD_DIRECTION.DEFAULT;
      }
    });

    this.sort.SortName = (toggleState == SORD_DIRECTION.DEFAULT) ? 'ID' : this.columnsNameMapping[columnIndex];
    this.reload();
  }
  
  doNothing(): void {}
  
  openImport() {
    const _this = this;
    const modalRef = this.modalService.open(DistrictImportComponent, { size: 'lg' });
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
}
