import { Component, OnInit } from '@angular/core';
import { DistrictService } from '../../../services/list/district.service';
import { ProvinceService } from '../../../services/list/province.service';
import { District } from '../../../models/list/districts';
import { DistrictFilter } from '../../../models/filter/districtfilter';
import { Router } from '@angular/router';
import { DistrictEditComponent } from './districtedit/districtedit.component';
import { UtilsService } from '../../../services/utils.service';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { Province } from '../../../models/list/province';
import { Filter } from '../../../models/filter/filter';
import { ASCSort, SORD_DIRECTION } from '../../../models/sort';
import { DistrictImportComponent } from './districts-import/district-import.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import PerfectScrollbar from 'perfect-scrollbar';

import { FormControl } from '@angular/forms';
import { CommonFilter } from '../../../models/filter/commonfilter';

@Component({
  selector: 'app-districts',
  templateUrl: './districts.component.html',
  styleUrls: ['./districts.component.scss']
})
export class DistrictsComponent implements OnInit {
  districtsList: any[] = [];
  district: District;
  provincesList: any[] = [];
  searchTerm: string = '';
  pageIndex: number = 1;
  pageSizesList: number[] = [5, 10, 20, 100];
  pageSize: number = this.pageSizesList[1];
  currentUser: any;
  loading: boolean = true;
  firstRowOnPage: any;
  searchProvincesCtrl = new FormControl();
  searchAdvanced: boolean = false;
  provinceFilter: Filter = new Filter(this.searchTerm, this.pageIndex, this.pageSize, 'id', 'ASC');
  districtFilter: CommonFilter = new CommonFilter();

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
    columnsNameMapping: ['id', 'districtCode', 'districtName', 'provinceName', ''],
    sortAbles: [false, true, true, true, false],
    visibles: [true, true, true, true, true]
  }
  /**
   * END SORT SETTINGS
   */

  isLoading: boolean = true;
  Total: any;

  constructor(private translate: TranslateService, public utilsService: UtilsService,
    private provinceService: ProvinceService,
    private service: DistrictService, private router: Router,
    private matCus: MatPaginatorIntl, config: NgbModalConfig, private modalService: NgbModal) {
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
    this.matCus.getRangeLabel = (page: number, pageSize: number, length: number): string => {
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
    
    this.provincesList = [];
    this.provinceService.getProvincesList(this.provinceFilter).subscribe(
      (response: any) => {
        const data = response.results;
        if (data != undefined) {
          this.provincesList = data.length ? data : [];
        }
      },
      (err: any) => {
        this.provincesList = [];
        // _this.isLoading = false;
      }
    );
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.districtFilter.PageIndex = 1;
    this.districtFilter.PageSize = this.pageSizesList[1];
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

  pageEvent(variable: any) {
    this.districtFilter.PageIndex = variable.pageIndex + 1;
    this.districtFilter.PageSize = variable.pageSize;
    this.reload();
  }
  search() {
    this.reload();
    this.districtFilter.SearchTerm = '';
  }

  reload() {
    this.districtFilter.SortName = this.paginationSettings.sort.SortName;
    this.districtFilter.SortDirection = this.paginationSettings.sort.SortDirection;
    this.service.getDistrictsList(this.districtFilter).subscribe(
      (response: any) => {
        const list = response.results ? response.results : [];
        
        this.Total = (response && response.rowCount) ? response.rowCount : 0;
        this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
        setTimeout(() => {
          this.districtsList = (list) ? list : [];
          this.isLoading = false;
        }, 500);
      },
      (err: any) => {
        this.districtsList = [];
        this.isLoading = false;
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
    modalRef.result.then(function () {
      _this.reload();
    });
  }

  deleteDistrict() {
    const _this = this;
    _this.service.deleteDistrict(_this.district.id).subscribe((res: any) => {
      _this.reload();
    });
  }

  doNothing(): void { }

  openImport() {
    const _this = this;
    const modalRef = _this.modalService.open(DistrictImportComponent, { size: 'lg' });
    modalRef.result.then(function (importModel: any) {

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
    this.districtFilter.ProvinceId = provinceId;
    this.reload();
  }

  sortToggles(colIndex: number) {
    const _this = this;
    if (this.paginationSettings.sortAbles[colIndex])
      this.utilsService.toggleSort(colIndex, this.paginationSettings.sortToggles, this.paginationSettings.sort, this.paginationSettings.columnsNameMapping)
        .then(() => {
          _this.reload();
        });
    else
      this.utilsService.doNothing();
  }
}
