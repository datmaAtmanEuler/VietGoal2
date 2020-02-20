import { Component, OnInit, ViewChild } from '@angular/core';
import { Class } from '../../../models/manage/class';
import { ClassService } from '../../../services/manage/class.service';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';

import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ASCSort, SORD_DIRECTION } from 'app/models/sort';
import { ClassFilter } from 'app/models/filter/Classfilter';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { AreaService } from 'app/services/list/area.service';
import { HttpClient } from '@angular/common/http';
import { YardService } from 'app/services/list/yard.service';
import { YardFilter } from 'app/models/filter/yardfilter';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { ClassEditComponent } from './class-edit/class-edit.component';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'app-Class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {
  ClassList: any[] = [];
  Class: Class;
  searchTerm: string = '';
  pageSizesList: number[] = [5, 10, 20, 100];
  pageSize: number = this.pageSizesList[3];
  pageSizeFilter: number = 20;
  currentUser: any;
  Total: number;
  listarea: any;
  listyard: any;
  listTrainingGround: any;
  loading: boolean;
  searchareasCtrl = new FormControl();
  searchyardsCtrl = new FormControl();
  searchTrainingGroundsCtrl = new FormControl();

  isLoading = false;
  /**
  * BEGIN SORT SETTINGS
  */
  paginationSettings: any = {
    sort: new ASCSort(),
    sortToggles: [
      null,
      SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT,
      null
    ],
    columnsName: ['Order', 'ClassCode', 'ClassName', 'DisplayOrder', 'Total', 'Coach','YardName','Action'],
    columnsNameMapping: ['Id', 'ClassCode', 'ClassName', 'DisplayOrder', 'Total', 'Coach','YardName','Action'],
    sortAbles: [false, true, true, true, true,true,true, false],
    visibles: [true, true, true, true, true, true,true]
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

    this.searchareasCtrl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        tap(() => {
          this.listarea = [];
          this.isLoading = true;
        }),
        switchMap(value => this.areaService.getAreasList({ 'SearchTerm': value, 'PageIndex': 1, 'PageSize': 10, 'SortName': 'ID', 'SortDirection': 'ASC' })
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe(data => {
        if (data == undefined) {
          this.listarea = [{ notfound: 'Not Found' }];
        } else {
          this.listarea = data.length ? data : [{ notfound: 'Not Found' }];
        }

      });
    this.searchyardsCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      tap(() => {
        this.listyard = [];
        this.isLoading = true;
      }),
      switchMap(value => this.yardService.getYardsList(new YardFilter(value, 1, 100,0,0 ,this.areaIDfilted()))
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
      .subscribe(data => {
        if (data == undefined) {
          this.listyard = [{ notfound: 'Not Found' }];
        } else {
          this.listyard = data.length ? data : [{ notfound: 'Not Found' }];
        }

      });
    this.searchTrainingGroundsCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      tap(() => {
        this.listTrainingGround = [];
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
          this.listTrainingGround = [{ notfound: 'Not Found' }];
        } else {
          this.listTrainingGround = data.length ? data : [{ notfound: 'Not Found' }];
        }

      });
  }

  remove(Class: Class) {
    this.Class = Class;
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    modalRef.componentInstance.confirmObject = 'Class';
    modalRef.componentInstance.decide.subscribe(() => {
      _this.service.deleteClass(Class.Id, this.currentUser.UserId).subscribe(() => {
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
    this.service.getClasssList(this.filter).subscribe((list: any) => {
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

  edit(ClassId: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(ClassEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.ClassId = ClassId;
    modalRef.result.then(function (result) {
      _this.reload();
    });
  }

  displayareaFn(user): string {
    return user && user.areaName && !user.notfound ? user.areaName : '';
  }
  displayyardFn(user): string {
    return user && user.yardName && !user.notfound ? user.yardName : '';
  }
  displayTrainingGroundFn(user): string {
    return user && user.TrainingGroundName && !user.notfound ? user.TrainingGroundName : '';
  }
  changearea(areaID) {
    this.yardService.getYardsList(new YardFilter('', 1, 100,0,0, areaID)).subscribe((list) => {
      this.listyard = list;
      this.filter.AreaId = areaID;
      this.reload();
    });
  }
  changeyard(yardID) {
    this.http.get(`${environment.serverUrl}TrainingGrounds/?SearchTerm=&yardID=${yardID}&SortName=&SortDirection=&PageIndex=1&PageSize=20`).subscribe((list) => {
      this.listTrainingGround = list;
      this.filter.YardId = yardID;
      this.reload();
    });
  }
  changeTrainingGround(TrainingGroundID) {
    this.filter.TrainingGroundId = TrainingGroundID;
    this.reload();
  }

  areaIDfilted() {
    if (this.searchareasCtrl.value && this.searchareasCtrl.value.ID != undefined) {
      return this.searchareasCtrl.value.ID
    } else {
      return 0;
    }
  }
  TrainingGroundObservableFilter(value: any): Observable<any> {
    if (this.searchyardsCtrl.value && this.searchyardsCtrl.value.ID != undefined) {
      return this.http.get(`${environment.serverUrl}TrainingGrounds/?SearchTerm=${value}&yardID=${this.searchyardsCtrl.value.ID}&SortName=&SortDirection=&PageIndex=1&PageSize=100`)
    } else {
      return this.http.get(`${environment.serverUrl}TrainingGrounds/?SearchTerm=${value}&yardID=0&SortName=&SortDirection=&PageIndex=1&PageSize=100`)
    }
  }
}
