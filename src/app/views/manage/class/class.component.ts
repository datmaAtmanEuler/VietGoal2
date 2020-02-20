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
import { ClassEditComponent } from './class-edit/class-edit.component';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'app-Central',
  templateUrl: './Central.component.html',
  styleUrls: ['./Central.component.scss']
})
<<<<<<< Updated upstream
export class CentralComponent implements OnInit {
  CentralList: any[] = [];
  Central: Central;
=======
export class ClassComponent implements OnInit {
  ClassList: any[] = [];
  Class: any;
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  searchProvincesCtrl = new FormControl();
  searchDistrictsCtrl = new FormControl();
  searchWardsCtrl = new FormControl();
=======
  searchAreasCtrl = new FormControl();
  searchYardsCtrl = new FormControl();
  searchTrainingGroundsCtrl = new FormControl();
>>>>>>> Stashed changes

  isLoading = false;
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
<<<<<<< Updated upstream
    columnsName: ['Order', 'CentralName', 'Address', 'CampusArea', 'Note', 'Action'],
    columnsNameMapping: ['Id', 'CentralName', 'Address', 'CampusArea', 'Discription', 'Action'],
    sortAbles: [false, true, true, true, true, false],
    visibles: [true, true, true, true, true, true]
=======
    columnsName: ['Order', 'ClassCode', 'ClassName', 'DisplayOrder', 'StudentCounts', 'CoachsList','YardName','Action'],
    columnsNameMapping: ['Id', 'ClassCode', 'ClassName', 'DisplayOrder', 'StudentCounts', 'CoachsList','YardName','Action'],
    sortAbles: [false, true, true, true, false,false,true, false],
    visibles: [true, true, true, true, true, true,true, true]
>>>>>>> Stashed changes
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
    const vgscroll = <HTMLElement>document.querySelector('.vg-scroll');
    new PerfectScrollbar(vgscroll);
  }

  filtersEventsBinding() {

<<<<<<< Updated upstream
    this.searchProvincesCtrl.valueChanges
=======
    this.searchAreasCtrl.valueChanges
>>>>>>> Stashed changes
      .pipe(
        startWith(''),
        debounceTime(500),
        tap(() => {
          this.listprovince = [];
          this.isLoading = true;
        }),
<<<<<<< Updated upstream
        switchMap(value => this.provinceService.getProvincesList({ 'SearchTerm': value, 'PageIndex': 1, 'PageSize': 10, 'SortName': 'ID', 'SortDirection': 'ASC' })
=======
        switchMap(value => this.areaService.getAreasList({ 'SearchTerm': value, 'PageIndex': 1, 'PageSize': 100, 'SortName': 'AreaCode', 'SortDirection': 'ASC' })
>>>>>>> Stashed changes
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe(data => {
        if (data == undefined) {
          this.listprovince = [{ notfound: 'Not Found' }];
        } else {
          this.listprovince = data.length ? data : [{ notfound: 'Not Found' }];
        }

      });
<<<<<<< Updated upstream
    this.searchDistrictsCtrl.valueChanges.pipe(
=======
    this.searchYardsCtrl.valueChanges.pipe(
>>>>>>> Stashed changes
      startWith(''),
      debounceTime(500),
      tap(() => {
        this.listdistrict = [];
        this.isLoading = true;
      }),
<<<<<<< Updated upstream
      switchMap(value => this.districtService.getDistrictsList(new DistrictFilter(value, 1, 100, this.provinceIDfilted()))
=======
      switchMap(value => this.yardService.getYardsList(new YardFilter(value, 1, 100, null, 'YardCode', 'ASC'))
>>>>>>> Stashed changes
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
      .subscribe(data => {
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
          this.listward = [{ notfound: 'Not Found' }];
        } else {
          this.listward = data.length ? data : [{ notfound: 'Not Found' }];
        }

      });
  }

<<<<<<< Updated upstream
  remove(Central: Central) {
    this.Central = Central;
=======
  remove(aclass: any) {
    this.Class = aclass;
>>>>>>> Stashed changes
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    modalRef.componentInstance.confirmObject = 'Central';
    modalRef.componentInstance.decide.subscribe(() => {
<<<<<<< Updated upstream
      _this.service.deleteCentral(Central.Id, this.currentUser.UserId).subscribe(() => {
=======
      _this.service.deleteClass(aclass.ID, this.currentUser.UserId).subscribe(() => {
>>>>>>> Stashed changes
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
    this.filter.SearchTerm = this.searchTerm;
    this.loading = true;
<<<<<<< Updated upstream
    this.CentralList = [];
    this.service.getCentralsList(this.filter).subscribe((list: any) => {
=======
    this.ClassList = [];
    this.service.getClassList(this.filter).subscribe((list: any) => {
>>>>>>> Stashed changes
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
    const modalRef = this.modalService.open(ClassEditComponent, { size: 'lg' });
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
<<<<<<< Updated upstream
  changeProvince(provinceID) {
    this.districtService.getDistrictsList(new DistrictFilter('', 1, 100, provinceID)).subscribe((list) => {
      this.listdistrict = list;
      this.filter.ProvinceId = provinceID;
=======
  changearea(areaID: number) {
    this.yardService.getYardsList(new YardFilter('', 1, 100, areaID, 'YardCode', 'ASC')).subscribe((list) => {
      this.listyard = list;
      this.filter.AreaId = areaID;
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
  provinceIDfilted() {
    if (this.searchProvincesCtrl.value && this.searchProvincesCtrl.value.ID != undefined) {
      return this.searchProvincesCtrl.value.ID
=======
  areaIDfilted() {
    if (this.searchAreasCtrl.value && this.searchAreasCtrl.value.ID != undefined) {
      return this.searchAreasCtrl.value.ID
>>>>>>> Stashed changes
    } else {
      return 0;
    }
  }
<<<<<<< Updated upstream
  wardObservableFilter(value: any): Observable<any> {
    if (this.searchDistrictsCtrl.value && this.searchDistrictsCtrl.value.ID != undefined) {
      return this.http.get(`${environment.serverUrl}Wards/?SearchTerm=${value}&DistrictID=${this.searchDistrictsCtrl.value.ID}&SortName=&SortDirection=&PageIndex=1&PageSize=100`)
=======
  TrainingGroundObservableFilter(value: any): Observable<any> {
    if (this.searchYardsCtrl.value && this.searchYardsCtrl.value.ID != undefined) {
      return this.http.get(`${environment.serverUrl}TrainingGrounds/?SearchTerm=${value}&yardID=${this.searchYardsCtrl.value.ID}&SortName=&SortDirection=&PageIndex=1&PageSize=100`)
>>>>>>> Stashed changes
    } else {
      return this.http.get(`${environment.serverUrl}Wards/?SearchTerm=${value}&DistrictID=0&SortName=&SortDirection=&PageIndex=1&PageSize=100`)
    }
  }
}
