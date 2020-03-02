import { Component, OnInit, ViewChild } from '@angular/core';
import { Central } from '../../../models/manage/central';
import { CentralService } from '../../../services/manage/central.service';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';

import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ASCSort, SORD_DIRECTION } from 'app/models/sort';
import { CentralFilter } from 'app/models/filter/centralfilter';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { ProvinceService } from 'app/services/list/province.service';
import { HttpClient } from '@angular/common/http';
import { DistrictService } from 'app/services/list/district.service';
import { DistrictFilter } from 'app/models/filter/districtfilter';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { CentralEditComponent } from './central-edit/central-edit.component';
import PerfectScrollbar from 'perfect-scrollbar';
import { CentralImportComponent } from './central-import/central-import.component';
import { CommonFilter } from 'app/models/filter/commonfilter';

@Component({
  selector: 'app-Central',
  templateUrl: './central.component.html',
  styleUrls: ['./central.component.scss']
})
export class CentralComponent implements OnInit {
  CentralList: any[] = [];
  Central: Central;
  searchTerm: string = '';
  pageSizesList: number[] = [5, 10, 20, 100];
  filter: CommonFilter = new CommonFilter();
  pageSizeFilter: number = 20;
  searchAdvanced = false;
  currentUser: any;
  Total: number;
  listprovince: any;
  listdistrict: any;
  listward: any;
  loading: boolean;
  searchProvincesCtrl = new FormControl();
  searchDistrictsCtrl = new FormControl();
  searchWardsCtrl = new FormControl();

  isLoading = false;
  /**
  * BEGIN SORT SETTINGS
  */
  paginationSettings: any = {
    sort: new ASCSort(),
    sortToggles: [
      null,
      SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC,
      null
    ],
    columnsName: ['Order', 'CentralName', 'Address', 'CampusArea', 'Note', 'Action'],
    columnsNameMapping: ['id', 'centralName', 'address', 'area', 'description', 'Action'],
    sortAbles: [false, true, true, true, true, false],
    visibles: [true, true, true, true, true, true]
  }
  /**
   * END SORT SETTINGS
   */
  firstRowOnPage: any;

  constructor(public utilsService: UtilsService, config: NgbModalConfig, private service: CentralService, private router: Router, private modalService: NgbModal,
    private provinceService: ProvinceService, private districtService: DistrictService, private http: HttpClient) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    utilsService.loadPaginatorLabels();
  }
  ngOnInit() {
    
    this.filter.SearchTerm = '';
    this.filter.PageIndex = 1;
    this.filter.PageSize = this.pageSizesList[1];
    this.reload();
    this.filtersEventsBinding();
    const vgscroll = <HTMLElement>document.querySelector('.vg-scroll');
    new PerfectScrollbar(vgscroll);
  }

  filtersEventsBinding() {

    this.searchProvincesCtrl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        tap(() => {
          this.listprovince = [];
          this.isLoading = true;
        }),
        switchMap(value => this.provinceService.getProvincesList({ 'searchTerm': value, 'pageIndex': 1, 'pageSize': 20, 'sortName': 'id', 'sortDirection': 'ASC' })
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((response: any) => {
				const data = response.results;
        if (data == undefined) {
          this.listprovince = [{ notfound: 'Not Found' }];
        } else {
          this.listprovince = data.length ? data : [{ notfound: 'Not Found' }];
        }

      });
    this.searchDistrictsCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      tap(() => {
        this.listdistrict = [];
        this.isLoading = true;
      }),
      switchMap(value => this.districtService.getDistrictsList({ 'searchTerm': value, 'pageIndex': 1, 'pageSize': 20, 'sortName': 'id', 'sortDirection': 'ASC' })
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
      .subscribe((response: any) => {
				const data = response.results;
        if (data == undefined) {
          this.listdistrict = [{ notfound: 'Not Found' }];
        } else {
          this.listdistrict = data.length ? data : [{ notfound: 'Not Found' }];
        }

      });
    this.searchWardsCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      tap(() => {
        this.listward = [];
        this.isLoading = true;
      }),
      switchMap(value => this.http.get(`${environment.serverUrl}Wards?pageIndex=1&pageSize=20&sortName=id&sortDirection=ASC`)
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
      .subscribe((response: any) => {
				const data = response.results;
        if (data == undefined) {
          this.listward = [{ notfound: 'Not Found' }];
        } else {
          this.listward = data.length ? data : [{ notfound: 'Not Found' }];
        }

      });
  }

  remove(id) {
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { windowClass: 'modal-confirm' });
    modalRef.componentInstance.confirmObject = 'Central';
    modalRef.componentInstance.decide.subscribe(() => {
      _this.service.deleteCentral(id).subscribe(() => {
        _this.reload();
      });
    });
  }
  pageEvent(variable: any) {
    this.filter.PageIndex = variable.pageIndex + 1;
    this.filter.PageSize = variable.pageSize;
    this.reload();
  }
  reload() {
    this.filter.SearchTerm = this.searchTerm;
    this.filter.sortName = this.paginationSettings.sort.SortName;
    this.filter.sortDirection = this.paginationSettings.sort.SortDirection; 

    this.loading = true;
    this.CentralList = [];
    this.service.getCentralsList(this.filter).subscribe((response: any) => {
      const list = response.results ? response.results : [];
      this.Total = (response && response.rowCount) ? response.rowCount : 0;
      this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
      setTimeout(() => {
        this.loading = false;
        this.CentralList = list || [];
      }, 500);
    });
  }
  add() {
    this.edit(null);
  }

  edit(CentralId: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(CentralEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.CentralId = CentralId;
    modalRef.result.then(function (result) {
      _this.reload();
    });
  }

  displayProvinceFn(user): string {
    return user && user.provinceName && !user.notfound ? user.provinceName : '';
  }
  displayDistrictFn(user): string {
    return user && user.districtName && !user.notfound ? user.districtName : '';
  }
  displayWardFn(user): string {
    return user && user.wardName && !user.notfound ? user.wardName : '';
  }
  changeProvince(provinceID) {
    this.districtService.getDistrictsList(new DistrictFilter('', 1, 100,null, provinceID)).subscribe((list) => {
      this.listdistrict = list;
      // this.filter.ProvinceId = provinceID;
      this.reload();
    });
  }
  changeDistrict(districtID) {
    this.http.get(`${environment.serverUrl}Wards/?SearchTerm=&DistrictID=${districtID}&SortName=&SortDirection=&PageIndex=1&PageSize=20`).subscribe((list) => {
      this.listward = list;
      // this.filter.DistrictId = districtID;
      this.reload();
    });
  }
  changeWard(wardID) {
    this.filter.WardId = wardID;
    this.reload();
  }

  provinceIDfilted() {
    if (this.searchProvincesCtrl.value && this.searchProvincesCtrl.value.ID != undefined) {
      return this.searchProvincesCtrl.value.ID
    } else {
      return 0;
    }
  }
  wardObservableFilter(value: any): Observable<any> {
    if (this.searchDistrictsCtrl.value && this.searchDistrictsCtrl.value.ID != undefined) {
      return this.http.get(`${environment.serverUrl}Wards/?SearchTerm=${value}&DistrictID=${this.searchDistrictsCtrl.value.ID}&SortName=&SortDirection=&PageIndex=1&PageSize=100`)
    } else {
      return this.http.get(`${environment.serverUrl}Wards/?SearchTerm=${value}&DistrictID=0&SortName=&SortDirection=&PageIndex=1&PageSize=100`)
    }
  }
  
  openImport() {
    const _this = this;
    const modalRef = this.modalService.open(CentralImportComponent, { size: 'lg' });
    modalRef.result.then(function(importModel: any){
        console.log(importModel);
    });
  }

  downloadTemplate() {
    var fileName = 'Yards_Import.xlsx';
    var a = document.createElement('a');
    a.href = this.service.getTemplate(fileName);
    a.download = fileName;
    document.body.append(a);
    a.click();
    a.remove();
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
