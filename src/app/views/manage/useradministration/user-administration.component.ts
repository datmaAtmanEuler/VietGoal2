import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';

import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ASCSort, SORD_DIRECTION } from 'app/models/sort';
import { UserFilter } from 'app/models/filter/userfilter';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { ProvinceService } from 'app/services/list/province.service';
import { HttpClient } from '@angular/common/http';
import { YardService } from 'app/services/list/yard.service';
import { Filter } from 'app/models/filter/filter';
import { User } from '../../../models/acl/user';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { UserAdministrationEditComponent } from './user-administration-edit/user-administration-edit.component';
import PerfectScrollbar from 'perfect-scrollbar';
import { AreaService } from 'app/services/list/area.service';
import { UserService } from 'app/services/acl/user.service';
import { TrainingGroundService } from 'app/services/list/training-ground.service';
import { TrainingGroundFilter } from 'app/models/filter/trainingroundfilter';
import { AreaFilter } from 'app/models/filter/areafilter';
import { MatPaginatorIntl, MatDatepickerInputEvent, DateAdapter } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ClassFilter } from 'app/models/filter/classfilter';
import { ClassService } from 'app/services/manage/class.service';
import { ClassField } from '@angular/compiler';
import { UserAdministrationImportComponent } from '../useradministration/user-administration-import/user-administration-import.component';
import { PositionService } from 'app/services/list/position.service';


@Component({
  selector: 'app-user-administration',
  templateUrl: './user-administration.component.html',
  styleUrls: ['./user-administration.component.scss']
})
export class UserAdministrationComponent implements OnInit {
  usersList: any[] = [];
  user: any;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSizesList: number[] = [5, 10, 20, 100];
  pageSize:number = this.pageSizesList[1];
  currentUser: any;
  isLoading: boolean = true;
  Total: any;
  firstRowOnPage: any;
  positionsList: any;
  yardsList: any;
  traininggroundsList: any;
  classList: any;
  toDate: Date;
  fromDate: Date;
  originMin: Date;
  originMax: Date;
  searchPositionsCtrl = new FormControl();
  loading : boolean;
  searchAdvanced: boolean = false;
  /**
  * BEGIN SORT SETTINGS
  */ 
  paginationSettings: any = {
    sort: new ASCSort(),
    sortToggles: [
      null,
      SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC,
      SORD_DIRECTION.ASC,SORD_DIRECTION.ASC, SORD_DIRECTION.ASC,
      null
    ],
    columnsName:  ['Order', 'UserName', 'FullName',  'Gender','DayofBirth','Email','Phone','Position','Action'],
    columnsNameMapping:  ['id', 'userName', 'fullName',  'gender','birthDay','email','phoneNumber','positionName',''],
    sortAbles:  [false, true, true, true, false,false,true,false, false,false],
    visibles: [true, true, true, true, true, true,true,true, true,true,true]
  }
  /**
   * END SORT SETTINGS
   */
  filter: UserFilter = new UserFilter('', this.pageIndex, this.pageSize,0,0,'id','ASC');
  constructor(private matCus: MatPaginatorIntl, private translate: TranslateService,public utilsService: UtilsService, config: NgbModalConfig, private service: UserService,private traininggroundservice: TrainingGroundService, private router: Router, private modalService: NgbModal,
    private positionService: PositionService, private http: HttpClient) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
    utilsService.loadPaginatorLabels();
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
    this.reload();
    this.filtersEventsBinding();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const vgscroll = <HTMLElement>document.querySelector('.vg-scroll');
    new PerfectScrollbar(vgscroll);
  }
  dateEvent(type: string, event: MatDatepickerInputEvent<Date>){
    const theDate = event.value;
    switch(type){
      case 'start':
        this.fromDate = theDate;
        break;
      case 'end':
        this.fromDate = event.value;
        break;
    }
  }
  displayPositionFn(position): string {
    return position && position.positionName && !position.notfound ? position.positionName : '';
  }
 
  changePosition(positionID) {
    this.filter.positionId = positionID;
    this.reload();
  }
  
  remove(registration: any) {
    this.user = registration;
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    modalRef.componentInstance.confirmObject = 'Users';
    modalRef.componentInstance.decide.subscribe(() => {
      _this.service.deleteNhom(registration.id).subscribe(() => {
        _this.reload();
      });
    });
  }
  pageEvent(variable: any) {
    this.filter = new UserFilter('', this.pageIndex, this.pageSize,0,0, 'id','ASC');
    this.filter.PageIndex = variable.pageIndex + 1;
    this.filter.PageSize = variable.pageSize;
    this.reload();
  }
  
  reload() {
    const _this = this;
    const filter: UserFilter = new UserFilter('', this.pageIndex, this.pageSize,0,0, 'id','ASC');
    this.isLoading = true;
    this.usersList = [];
    this.service.getUserAdministrationList(filter).subscribe(
        (response: any) => {
          const list = response.results ? response.results : [];
          this.Total = (response && response.rowCount) ? response.rowCount : 0;
          this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
          setTimeout(() => {
            _this.usersList = (list) ? list : [];
            _this.isLoading = false;
          }, 500);
        },
        (err: any) => {
          _this.usersList = [];
          _this.isLoading = false;
        }
    );
  }

  filtersEventsBinding() {
    this.searchPositionsCtrl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        tap(() => {
          this.positionsList = [];
          this.isLoading = true;
        }),
        switchMap(value => this.positionService.getPositionList(new Filter(value, 1, 100, 'id', 'ASC'))
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
          this.positionsList = [{ notfound: 'Not Found' }];
        } else {
          this.positionsList = data.length ? data : [{ notfound: 'Not Found' }];
        }

      });
  }

  add() {
    this.edit(null);
  }
  edit(UserAdministrationID: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(UserAdministrationEditComponent, { size: 'xl' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.id = UserAdministrationID;
    modalRef.result.then(function (result) {
      _this.reload();
    });
  }
  
  doNothing(): void {}

  openImport() {
    const _this = this;
    const modalRef = this.modalService.open(UserAdministrationImportComponent, { size: 'lg' });
    modalRef.result.then(function(importModel: any){
        console.log(importModel);
    });
  }
  downloadTemplate() {
    var fileName = 'UserAdministration_Import.xlsx';
    var a = document.createElement('a');
    a.href = this.service.getTemplate(fileName);
    a.download = fileName;
    document.body.append(a);
    a.click();
    a.remove();
  }
}

