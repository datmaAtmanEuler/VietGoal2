import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';

import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ASCSort, SORD_DIRECTION } from 'app/models/sort';
import { ClassFilter } from 'app/models/filter/classfilter';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { ProvinceService } from 'app/services/list/province.service';
import { HttpClient } from '@angular/common/http';
import { YardService } from 'app/services/list/yard.service';
import { YardFilter } from 'app/models/filter/yardfilter';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { ClassEditComponent } from './class-edit/class-edit.component';
import PerfectScrollbar from 'perfect-scrollbar';
import { AreaService } from 'app/services/list/area.service';
import { ClassService } from 'app/services/manage/class.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {
  ClassList: any[] = [];
  Class: any;
  searchTerm: string = '';
  pageSizesList: number[] = [5, 10, 20, 100];
  pageSize: number = this.pageSizesList[3];
  pageSizeFilter: number = 20;
  currentUser: any;
  Total: number;
  areasList: any;
  yarddsList: any;
  traininggroundsList: any;
  loading: boolean;
  searchAreasCtrl = new FormControl();
  searchYardsCtrl = new FormControl();
  searchTrainingGroundsCtrl = new FormControl();

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
    columnsName: ['Order', 'ClassCode', 'ClassName', 'DisplayOrder', 'StudentCounts', 'CoachsList','YardName','Action'],
    columnsNameMapping: ['Id', 'ClassCode', 'ClassName', 'DisplayOrder', 'StudentCounts', 'CoachsList','YardName','Action'],
    sortAbles: [false, true, true, true, false,false,true, false],
    visibles: [true, true, true, true, true, true,true, true]
  }
  /**
   * END SORT SETTINGS
   */
  filter: ClassFilter = new ClassFilter(this.searchTerm, 1, this.pageSize, null, null, null, this.paginationSettings.sort.SortName, this.paginationSettings.sort.SortDirection,null,null,null);

  constructor(public utilsService: UtilsService, config: NgbModalConfig, private service: ClassService, private router: Router, private modalService: NgbModal,
    private areaService: AreaService, private yardService: YardService, private http: HttpClient) {
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

    this.searchAreasCtrl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        tap(() => {
          this.areasList = [];
          this.isLoading = true;
        }),
        switchMap(value => this.areaService.getAreasList({ 'SearchTerm': value, 'PageIndex': 1, 'PageSize': 100, 'SortName': 'AreaCode', 'SortDirection': 'ASC' })
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe(data => {
        if (data == undefined) {
          this.areasList = [{ notfound: 'Not Found' }];
        } else {
          this.areasList = data.length ? data : [{ notfound: 'Not Found' }];
        }

      });
    this.searchYardsCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      tap(() => {
        this.yarddsList = [];
        this.isLoading = true;
      }),
      switchMap(value => this.yardService.getYardsList(new YardFilter(value, 1, 100, null, 'Id', 'ASC'))
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
      .subscribe(data => {
        if (data == undefined) {
          this.yarddsList = [{ notfound: 'Not Found' }];
        } else {
          this.yarddsList = data.length ? data : [{ notfound: 'Not Found' }];
        }

      });
    this.searchTrainingGroundsCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      tap(() => {
        this.traininggroundsList = [];
        this.isLoading = true;
      }),
      switchMap(value => this.TrainingGroundObservableFilter(value)
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
      .subscribe(data => {
        if (data == undefined) {
          this.traininggroundsList = [{ notfound: 'Not Found' }];
        } else {
          this.traininggroundsList = data.length ? data : [{ notfound: 'Not Found' }];
        }

      });
  }

  remove(aclass: any) {
    this.Class = aclass;
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    modalRef.componentInstance.confirmObject = 'class';
    modalRef.componentInstance.decide.subscribe(() => {
      _this.service.deleteClass(aclass.ID, this.currentUser.UserId).subscribe(() => {
        _this.reload();
      });
    });
  }
  pageEvent(variable: any) {
    this.filter = new ClassFilter(this.searchTerm, 1, this.pageSize, null, null, null, this.paginationSettings.sort.SortName, this.paginationSettings.sort.SortDirection,null,null,null);
    this.filter.PageIndex = variable.pageIndex + 1;
    this.filter.PageSize = variable.pageSize;
    this.reload();
  }
  reload() {
    this.filter.SearchTerm = this.searchTerm;
    this.loading = true;
    this.ClassList = [];
    this.service.getClassList(this.filter).subscribe((list: any) => {
      this.Total = (list && list[0]) ? list[0].Total : 0;
      setTimeout(() => {
        this.loading = false;
        this.ClassList = list || [];
      }, 500);
    });
  }
  add() {
    this.edit(null);
  }

  edit(ClassID: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(ClassEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.ClassID = ClassID;
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
  changearea(areaID: number) {
    this.yardService.getYardsList(new YardFilter('', 1, 100, null, 'Id', 'ASC')).subscribe((list) => {
      this.yarddsList = list;
      this.filter.AreaId = areaID;
      this.reload();
    });
  }
  changeDistrict(yardID) {
    this.http.get(`${environment.serverUrl}Wards/?SearchTerm=&DistrictID=${yardID}&SortName=&SortDirection=&PageIndex=1&PageSize=20`).subscribe((list) => {
      this.yarddsList = list;
      this.filter.YardId = yardID;
      this.reload();
    });
  }
  changeWard(wardID) {
    this.filter.TrainingGroundId = wardID;
    this.reload();
  }

  areaIDfilted() {
    if (this.searchAreasCtrl.value && this.searchAreasCtrl.value.ID != undefined) {
      return this.searchAreasCtrl.value.ID
    } else {
      return 0;
    }
  }
  TrainingGroundObservableFilter(value: any): Observable<any> {
    if (this.searchYardsCtrl.value && this.searchYardsCtrl.value.ID != undefined) {
      return this.http.get(`${environment.serverUrl}TrainingGrounds/?SearchTerm=${value}&yardID=${this.searchYardsCtrl.value.ID}&SortName=&SortDirection=&PageIndex=1&PageSize=100`)
    } else {
      return this.http.get(`${environment.serverUrl}Wards/?SearchTerm=${value}&DistrictID=0&SortName=&SortDirection=&PageIndex=1&PageSize=100`)
    }
  }
}
