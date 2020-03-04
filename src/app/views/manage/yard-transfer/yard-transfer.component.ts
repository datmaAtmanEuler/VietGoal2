import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { ASCSort, SORD_DIRECTION } from '../../../models/sort';
import { StudentService } from 'app/services/manage/student.service';
import PerfectScrollbar from 'perfect-scrollbar';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-yard-transfer',
  templateUrl: './yard-transfer.component.html',
  styleUrls: ['./yard-transfer.component.scss']
})
export class YardTransferComponent implements OnInit {
  sourceStudentsList: any[] = [];
  targetStudentsList: any[] = [];
  selectedSourceStudentsList: any[] = [];
  selectedTargetStudentsList: any[] = [];
  sourcePageIndex: number = 1;
  targetPageIndex: number = 1;
  pageSizesList: number[] = [5, 10, 20, 100];
  sourcePageSize: number = this.pageSizesList[1];
  targetPageSize: number = this.pageSizesList[1];

  areaId: number = 0;
  yardId: number = 0;
  sourceTrainingGroundId: number = 0;
  targetTrainingGroundId: number = 0;
  sourceClassId: number = 0;
  targetClassId: number = 0;
  currentUser: any;
  sourceTotal:number = 0;
  targetTotal:number = 0;
  isLoadingSource: boolean = false;
  isLoadingTarget: boolean = false;

  sourcePaginationSettings: any = {
    sort: new ASCSort(),
    sortToggles: [
      null,
      SORD_DIRECTION.ASC, SORD_DIRECTION.ASC,
      null
    ],
    columnsName: ['Order', 'MESSAGE.NameList.StudentCode', 'MESSAGE.NameList.FirstName', 'MESSAGE.NameList.LastName', 'MESSAGE.NameList.Gender', 'MESSAGE.NameList.DayofBirth'],
    columnsNameMapping: ['Id', 'studentCode', 'firstName', 'lastName', 'gender', 'dob'],
    sortAbles: [false, true, true, true, false, false],
    visibles: [true, true, true, true, true, true]
  };

  targetPaginationSettings: any = {
    sort: new ASCSort(),
    sortToggles: [
      null,
      SORD_DIRECTION.ASC, SORD_DIRECTION.ASC,
      null
    ],
    columnsName: ['Order', 'MESSAGE.NameList.StudentCode', 'MESSAGE.NameList.FirstName', 'MESSAGE.NameList.LastName', 'MESSAGE.NameList.Gender', 'MESSAGE.NameList.DayofBirth'],
    columnsNameMapping: ['Id', 'studentCode', 'firstName', 'lastName', 'gender', 'dob'],
    sortAbles: [false, true, true, true, false, false],
    visibles: [true, true, true, true, true, true]
  };
  
  constructor(public utilsService: UtilsService, config: NgbModalConfig, private service: StudentService, private modalService: NgbModal, private route: ActivatedRoute, private http: HttpClient) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    utilsService.loadPaginatorLabels();
  }

  ngOnInit() {
    
    const vgscroll = <HTMLElement>document.querySelector('.vg-scroll');
    new PerfectScrollbar(vgscroll);
    this.reloadSource();
    this.reloadTarget();
  }

  sourcePageEvent(pageE: any) {
    this.sourcePageIndex = pageE.pageIndex + 1;
    this.sourcePageSize = pageE.pageSize;
    this.reloadSource();
  }
  targetPageEvent(pageE: any) {
    this.targetPageIndex = pageE.pageIndex + 1;
    this.targetPageSize = pageE.pageSize;
    this.reloadTarget();
  }
  reloadSource() {
    const filter = {
      areaId: this.areaId,
      yardId: this.yardId,
      trainingGroundId: this.sourceTrainingGroundId,
      classId: this.sourceClassId,
      pageIndex: this.sourcePageIndex,
      pageSize: this.sourcePageSize,
      sortName: this.sourcePaginationSettings.sort.SortName,
      sortDirection: this.sourcePaginationSettings.sort.SortDirection
    };
    this.isLoadingSource = true;
    this.sourceStudentsList = [];
    this.service.getList(filter).subscribe((response: any) => {
      const list = response.results ? response.results : [];
      this.sourceTotal = (response && response.rowCount) ? response.rowCount : 0;
      setTimeout(() => {
        this.isLoadingSource = false;
        this.sourceStudentsList = list || [];
      }, 500);
    });
  }
  reloadTarget() {
    const filter = {
      areaId: this.areaId,
      yardId: this.yardId,
      trainingGroundId: this.targetTrainingGroundId,
      classId: this.targetClassId,
      pageIndex: this.targetPageIndex,
      pageSize: this.targetPageSize,
      sortName: this.targetPaginationSettings.sort.SortName,
      sortDirection: this.targetPaginationSettings.sort.SortDirection
    };
    this.isLoadingTarget = true;
    this.targetStudentsList = [];
    this.service.getList(filter).subscribe((response: any) => {
      const list = response.results ? response.results : [];
      this.targetTotal = (response && response.rowCount) ? response.rowCount : 0;
      setTimeout(() => {
        this.isLoadingTarget = false;
        this.targetStudentsList = list || [];
      }, 500);
    });
  }

  sortSourceToggles(colIndex: number) {
    const _this= this;
        if(this.sourcePaginationSettings.sortAbles[colIndex]) 
            this.utilsService.toggleSort(colIndex, this.sourcePaginationSettings.sortToggles ,this.sourcePaginationSettings.sort , this.sourcePaginationSettings.columnsNameMapping)
              .then(() => {
                _this.reloadSource();
              });
        else 
          this.utilsService.doNothing();
    }

  sortTargetToggles(colIndex: number) {
    const _this= this;
        if(this.targetPaginationSettings.sortAbles[colIndex]) 
            this.utilsService.toggleSort(colIndex, this.targetPaginationSettings.sortToggles ,this.targetPaginationSettings.sort , this.targetPaginationSettings.columnsNameMapping)
              .then(() => {
                _this.reloadTarget();
              });
        else 
          this.utilsService.doNothing();
    }
}
