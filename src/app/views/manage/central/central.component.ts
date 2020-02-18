import { Component, OnInit, ViewChild } from '@angular/core';
import { Filter } from '../../../models/filter/filter';
import { Central } from '../../../models/manage/central';
import { CentralService } from '../../../services/manage/central.service';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';

import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ASCSort, SORD_DIRECTION } from 'app/models/sort';
import { CentralFilter } from 'app/models/filter/centralfilter';
import { MatPaginatorIntl } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { ProvinceService } from 'app/services/list/province.service';
import { HttpClient } from '@angular/common/http';
import { DistrictService } from 'app/services/list/district.service';
import { DistrictFilter } from 'app/models/filter/districtfilter';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { CentralEditComponent } from './central-edit/central-edit.component';

@Component({
  selector: 'app-Central',
  templateUrl: './Central.component.html',
  styleUrls: ['./Central.component.scss']
})
export class CentralComponent implements OnInit {
  CentralList: any[] = [];
  Central: Central;
  searchTerm: string = '';
  pageSizesList: number[] = [5, 10, 20, 100];
  pageSize: number = this.pageSizesList[3];
  pageSizeFilter: number = 20;
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
  errorMsg: string;
  /**
  * BEGIN SORT SETTINGS
  */
  paginationSettings: any = {
    sort: new ASCSort(),
    sortToggles: [
      null,
      SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT,
      null
    ],
    columnsName: ['Order', 'CentralName', 'Address', 'CampusArea', 'Note', 'Action'],
    columnsNameMapping: ['Id', 'CentralName', 'Address', 'CampusArea', 'Discription', 'Action'],
    sortAbles: [false, true, true, true, true, false],
    visibles: [true, true, true, true, true, true]
  }
  /**
   * END SORT SETTINGS
   */
  filter: CentralFilter = new CentralFilter(this.searchTerm, 1, this.pageSize, null, null, null, this.paginationSettings.sort.SortName, this.paginationSettings.sort.SortDirection);

  constructor(public utilsService: UtilsService, config: NgbModalConfig, private service: CentralService, private router: Router, private modalService: NgbModal,
    private provinceService: ProvinceService, private districtService: DistrictService, private http: HttpClient) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    utilsService.loadPaginatorLabels();
  }
  ngOnInit() {
    this.reload();
    this.filtersEventsBinding();
  }

  filtersEventsBinding() {

    this.searchProvincesCtrl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.listprovince = [];
          this.isLoading = true;
        }),
        switchMap(value => this.provinceService.getProvincesList({ 'SearchTerm': value, 'PageIndex': 1, 'PageSize': 10, 'SortName': 'ID', 'SortDirection': 'ASC' })
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe(data => {
        if (data == undefined) {
          this.errorMsg = 'error';
          this.listprovince = [{ notfound: 'Not Found' }];
        } else {
          this.errorMsg = "";
          this.listprovince = data.length ? data : [{ notfound: 'Not Found' }];
        }

      });
    this.searchDistrictsCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      tap(() => {
        this.errorMsg = "";
        this.listdistrict = [];
        this.isLoading = true;
      }),
      switchMap(value => this.districtService.getDistrictsList(new DistrictFilter(value, 1, 100, this.provinceIDfilted()))
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
      .subscribe(data => {
        if (data == undefined) {
          this.errorMsg = 'error';
          this.listdistrict = [{ notfound: 'Not Found' }];
        } else {
          this.errorMsg = "";
          this.listdistrict = data.length ? data : [{ notfound: 'Not Found' }];
        }

      });
    this.searchWardsCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      tap(() => {
        this.errorMsg = "";
        this.listward = [];
        this.isLoading = true;
      }),
      switchMap(value => this.wardObservableFilter(value)
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
      .subscribe(data => {
        if (data == undefined) {
          this.errorMsg = 'error';
          this.listward = [{ notfound: 'Not Found' }];
        } else {
          this.errorMsg = "";
          this.listward = data.length ? data : [{ notfound: 'Not Found' }];
        }

      });
  }

  remove(Central: Central) {
    this.Central = Central;
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    modalRef.componentInstance.confirmObject = 'Central';
    modalRef.componentInstance.decide.subscribe(() => {
      _this.service.deleteCentral(Central.Id, this.currentUser.UserId).subscribe(() => {
        _this.reload();
      });
    });
  }
  pageEvent(variable: any) {
    this.filter = new CentralFilter(this.searchTerm, 1, this.pageSize, null, null, null, this.paginationSettings.sort.SortName, this.paginationSettings.sort.SortDirection);
    this.filter.PageIndex = variable.pageIndex + 1;
    this.filter.PageSize = variable.pageSize;
    this.reload();
  }
  reload() {

    this.loading = true;
    this.CentralList = [];
    this.service.getCentralsList(this.filter).subscribe((list: any) => {
      this.Total = (list && list[0]) ? list[0].Total : 0;
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
    return user && user.ProvinceName && !user.notfound ? user.ProvinceName : '';
  }
  displayDistrictFn(user): string {
    return user && user.DistrictName && !user.notfound ? user.DistrictName : '';
  }
  displayWardFn(user): string {
    return user && user.WardName && !user.notfound ? user.WardName : '';
  }
  changeProvince(provinceID) {
    this.districtService.getDistrictsList(new DistrictFilter('', 1, 100, provinceID)).subscribe((list) => {
      this.listdistrict = list;
      this.filter.ProvinceId = provinceID;
      this.reload();
    });
  }
  changeDistrict(districtID) {
    this.http.get(`${environment.serverUrl}Wards/?SearchTerm=&DistrictID=${districtID}&SortName=&SortDirection=&PageIndex=1&PageSize=20`).subscribe((list) => {
      this.listward = list;
      this.filter.DistrictId = districtID;
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
}
