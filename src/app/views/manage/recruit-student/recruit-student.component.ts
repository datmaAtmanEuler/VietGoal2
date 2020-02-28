import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';

import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ASCSort, SORD_DIRECTION } from 'app/models/sort';
import { RecruitStudentFilter } from 'app/models/filter/recruitstudentfilter';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { ProvinceService } from 'app/services/list/province.service';
import { HttpClient } from '@angular/common/http';
import { YardService } from 'app/services/list/yard.service';
import { YardFilter } from 'app/models/filter/yardfilter';
import { RecruitStudent } from '../../../models/manage/recruit-student';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { RecruitStudentEditComponent } from './recruit-student-edit/recruit-student-edit.component';
import PerfectScrollbar from 'perfect-scrollbar';
import { AreaService } from 'app/services/list/area.service';
import { RecruitStudentService } from 'app/services/manage/recruit-student.service';
import { TrainingGroundService } from 'app/services/list/training-ground.service';
import { TrainingGroundFilter } from 'app/models/filter/trainingroundfilter';
import { AreaFilter } from 'app/models/filter/areafilter';
import { MatPaginatorIntl, MatDatepickerInputEvent } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ClassFilter } from 'app/models/filter/classfilter';
import { ClassService } from 'app/services/manage/class.service';
import { ClassField } from '@angular/compiler';
import { RecruitStudentImportComponent } from '../recruit-student/recruit-student-import/recruit-student-import.component';


@Component({
  selector: 'app-recruit-student',
  templateUrl: './recruit-student.component.html',
  styleUrls: ['./recruit-student.component.scss']
})
export class RecruitStudentComponent implements OnInit {
  recruitstudentList: any[] = [];
  RecruitStudent: any;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSizesList: number[] = [5, 10, 20, 100];
  pageSize:number = this.pageSizesList[1];
  currentUser: any;
  loading: boolean = true;
  Total: any;
  firstRowOnPage: any;

  areasList: any;
  yardsList: any;
  traininggroundsList: any;
  classList: any;
  toDate: Date;
  fromDate: Date;
  originMin: Date;
  originMax: Date;
  searchAreasCtrl = new FormControl();
  searchYardsCtrl = new FormControl();
  searchTrainingGroundsCtrl = new FormControl();
  searchClassCtrl = new FormControl();
  isLoading = false;
  searchAdvanced: boolean = false;
  /**
  * BEGIN SORT SETTINGS
  */

 
  paginationSettings: any = {
    sort: new ASCSort(),
    sortToggles: [
      null,
      SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC,
      SORD_DIRECTION.ASC,SORD_DIRECTION.ASC, SORD_DIRECTION.ASC,SORD_DIRECTION.ASC,
      null
    ],
    columnsName:  ['Order', 'ParentsName', 'FaceBook', 'Email', 'Phone', 'FullName','DayofBirth','Address','Source','Recruit','Action'],
    columnsNameMapping:  ['id', 'parentFullName', 'parentFacebook', 'parentEmail', 'parentPhone', 'studentFullName','dob','address','source','recruitName','result',''],
    sortAbles:  [false, true, true, true, false,false,true,false, false,false],
    visibles: [true, true, true, true, true, true,true,true, true,true,true]
  }
  /**
   * END SORT SETTINGS
   */
  filter: RecruitStudentFilter = new RecruitStudentFilter('', this.pageIndex, this.pageSize, 0, 0,0,0,0,0,null, this.paginationSettings.sort.SortName,this.paginationSettings.sort.SortDirection,0);
  areafilter: AreaFilter = new AreaFilter('', this.pageIndex, this.pageSize, 0,  this.paginationSettings.sort.SortName,this.paginationSettings.sort.SortDirection);
  yardfilter: YardFilter = new YardFilter('', this.pageIndex, this.pageSize, 0,  this.paginationSettings.sort.SortName,this.paginationSettings.sort.SortDirection);
  classfilter: ClassFilter = new ClassFilter('', this.pageIndex, this.pageSize, 0,0,0,  this.paginationSettings.sort.SortName,this.paginationSettings.sort.SortDirection,0,0,0);
  traininggroundfilter: TrainingGroundFilter = new TrainingGroundFilter('', this.pageIndex, this.pageSize, 0,0,  this.paginationSettings.sort.SortName,this.paginationSettings.sort.SortDirection)
  constructor(private matCus: MatPaginatorIntl, private translate: TranslateService,public utilsService: UtilsService, config: NgbModalConfig, private service: RecruitStudentService,private traininggroundservice: TrainingGroundService, private router: Router, private modalService: NgbModal,
    private areaService: AreaService,private classService: ClassService, private yardService: YardService, private http: HttpClient) {
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
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.filtersEventsBinding();
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
  filtersEventsBinding() {

    this.searchAreasCtrl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        tap(() => {
          this.areasList = [];
          this.isLoading = true;
        }),
        switchMap(value => this.areaService.getAreasList(new AreaFilter(value, 1, 100, 0, this.paginationSettings.sort.SortName,this.paginationSettings.sort.SortDirection))
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((response: any) => {
        const data= response.result;
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
        this.yardsList = [];
        this.isLoading = true;
      }),
      switchMap(value => this.yardService.getYardsList(new YardFilter(value, 1, 100, null, this.paginationSettings.sort.SortName,this.paginationSettings.sort.SortDirection))
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
    .subscribe((response: any) => {
      const data= response.result;
        if (data == undefined) {
          this.yardsList = [{ notfound: 'Not Found' }];
        } else {
          this.yardsList = data.length ? data : [{ notfound: 'Not Found' }];
        }

      });
    this.searchTrainingGroundsCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      tap(() => {
        this.traininggroundsList = [];
        this.isLoading = true;
      }),
      switchMap(value => this.traininggroundservice.getTrainingGroundsList(new TrainingGroundFilter('', 1, 100, null,null, this.paginationSettings.sort.SortName,this.paginationSettings.sort.SortDirection))
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
    .subscribe((response: any) => {
      const data= response.result;
        if (data == undefined) {
          this.traininggroundsList = [{ notfound: 'Not Found' }];
        } else {
          this.traininggroundsList = data.length ? data : [{ notfound: 'Not Found' }];
        }

      });
      this.searchClassCtrl.valueChanges.pipe(
        startWith(''),
        debounceTime(500),
        tap(() => {
          this.classList = [];
          this.isLoading = true;
        }),
        switchMap(value => this.classService.getClassList(new ClassFilter('', this.pageIndex, this.pageSize, 0,0,0,  this.paginationSettings.sort.SortName,this.paginationSettings.sort.SortDirection,0,0,0))
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((response: any) => {
        const data= response.result;
          if (data == undefined) {
            this.classList = [{ notfound: 'Not Found' }];
          } else {
            this.classList = data.length ? data : [{ notfound: 'Not Found' }];
          }
  
        });
  }

  remove(aclass: any) {
    this.RecruitStudent = aclass;
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    modalRef.componentInstance.confirmObject = 'class';
    modalRef.componentInstance.decide.subscribe(() => {
      _this.service.deleteRecruitStudent(aclass.ID, this.currentUser.UserId).subscribe(() => {
        _this.reload();
      });
    });
  }
  pageEvent(variable: any) {
    this.filter = new RecruitStudentFilter('', this.pageIndex, this.pageSize, 0, 0,0,0,0,0,null, this.paginationSettings.sort.SortName,this.paginationSettings.sort.SortDirection,0);
    this.filter.PageIndex = variable.pageIndex + 1;
    this.filter.PageSize = variable.pageSize;
    this.reload();
  }
  reload() {
    const _this = this;
    const filter: RecruitStudentFilter = new RecruitStudentFilter( '', this.pageIndex, this.pageSize, 0, 0,0,0,0,0,null, 'id','ASC',0);
    this.loading = true;
    this.recruitstudentList = [];
    this.service.getRecruitStudentList(filter).subscribe(
        (response: any) => {
          const list = response.results ? response.results : [];
          this.Total = (response && response.rowCount) ? response.rowCount : 0;
          this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
          setTimeout(() => {
            _this.recruitstudentList = (list) ? list : [];
            _this.loading = false;
          }, 500);
        },
        (err: any) => {
          _this.recruitstudentList = [];
          _this.loading = false;
        }
    );
  }


  add() {
    this.edit(null);
  }

  edit(RecruitStudentID: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(RecruitStudentEditComponent, { size: 'xl' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.RecruitStudentID = RecruitStudentID;
    modalRef.result.then(function (result) {
      _this.reload();
    });
  }

  displayAreaFn(area): string {
    return area && area.areaName && !area.notfound ? area.areaName : '';
  }
  displayYardFn(yard): string {
    return yard && yard.yardName && !yard.notfound ? yard.yardName : '';
  }
  displayTrainingGroundFn(train): string {
    return train && train.traininggroundName && !train.notfound ? train.traininggroundName : '';
  }
  changeArea(areaID: number) {
    this.yardfilter.AreaId = areaID;
    this.yardService.getYardsList(this.yardfilter).subscribe((response:any) => {
      this.yardsList = response.result;
      this.reload();
     
    });
  }
 
  changeYard(yardID : number) {
    this.traininggroundfilter.YardId = yardID;
    this.traininggroundservice.getTrainingGroundsList(this.traininggroundfilter).subscribe((response: any) => {
      this.traininggroundsList = response.result;
      this.reload();
     
    });
  }

  changeTrainingGround(traininggroundID : number) {
    this.classfilter.TrainingGroundId = traininggroundID;
    this.classService.getClassList(this.classfilter).subscribe((response: any)=>{
      this.classList =  response.result;
      this.reload();
    }) 
  }
  changeClass(aclassId : number) {
      this.filter.classId = aclassId;
      this.reload();
  }
 
  doNothing(): void {}

  openImport() {
    const _this = this;
    const modalRef = this.modalService.open(RecruitStudentImportComponent, { size: 'lg' });
    modalRef.result.then(function(importModel: any){
        console.log(importModel);
    });
  }
  downloadTemplate() {
    var fileName = 'RecruitStudent_Import.xlsx';
    var a = document.createElement('a');
    a.href = this.service.getTemplate(fileName);
    a.download = fileName;
    document.body.append(a);
    a.click();
    a.remove();
  }
  

}

