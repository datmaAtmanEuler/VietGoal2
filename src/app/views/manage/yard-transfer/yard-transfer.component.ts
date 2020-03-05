import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { AreaService } from 'app/services/list/area.service';
import { YardService } from 'app/services/list/yard.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { ASCSort, SORD_DIRECTION } from '../../../models/sort';
import { StudentService } from 'app/services/manage/student.service';
import PerfectScrollbar from 'perfect-scrollbar';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { FormControl } from '@angular/forms';
import { startWith, map, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  selectedSourceStudentsIdList: number[] = [];
  selectedTargetStudentsIdList: number[] = [];
  sourceIsAllChecked: boolean = false;
  sourceIsAnyChecked: boolean = false;
  targetIsAllChecked: boolean = false;
  targetIsAnyChecked: boolean = false;
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
  isLoading: boolean = false;

  sourcePaginationSettings: any = {
    sort: new ASCSort(),
    sortToggles: [
      null,
      SORD_DIRECTION.ASC, SORD_DIRECTION.ASC,
      null
    ],
    columnsName: ['', 'MESSAGE.NameList.Order', 'MESSAGE.NameList.StudentCode', 'MESSAGE.NameList.FirstName', 'MESSAGE.NameList.LastName', 'MESSAGE.NameList.Gender', 'MESSAGE.NameList.DayofBirth'],
    columnsNameMapping: ['', 'Id', 'studentCode', 'firstName', 'lastName', 'gender', 'dob'],
    sortAbles: [false, false, true, true, true, false, false],
    visibles: [true, true, true, true, true, true, true]
  };

  targetPaginationSettings: any = {
    sort: new ASCSort(),
    sortToggles: [
      null,
      SORD_DIRECTION.ASC, SORD_DIRECTION.ASC,
      null
    ],
    columnsName: ['', 'MESSAGE.NameList.Order', 'MESSAGE.NameList.StudentCode', 'MESSAGE.NameList.FirstName', 'MESSAGE.NameList.LastName', 'MESSAGE.NameList.Gender', 'MESSAGE.NameList.DayofBirth'],
    columnsNameMapping: ['', 'Id', 'studentCode', 'firstName', 'lastName', 'gender', 'dob'],
    sortAbles: [false, false, true, true, true, false, false],
    visibles: [true, true, true, true, true, true, true]
  };

  isSourceAll: boolean = false;
  isTargetAll: boolean = false;


  showMoreArea: boolean = false;
  showMoreYard: boolean = false;
  areaPageIndex: number = 1;
  yardPageIndex: number = 1; 
  areasList: any[] = [];
  yardsList: any[] = [];
  searchAreasCtrl = new FormControl();
  searchYardsCtrl = new FormControl();
  totalAreaPages: number = 0;
  totalYardPages: number = 0;
  
  constructor(public utilsService: UtilsService, config: NgbModalConfig, 
    private service: StudentService, private modalService: NgbModal, private route: ActivatedRoute, private http: HttpClient,
    private areaService: AreaService,
    private yardService: YardService) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    utilsService.loadPaginatorLabels();
  }

  ngOnInit() {
    
    const vgSourceScroll = <HTMLElement>document.querySelector('.vg-source-scroll');
    new PerfectScrollbar(vgSourceScroll);
    const vgTargetScroll = <HTMLElement>document.querySelector('.vg-target-scroll');
    new PerfectScrollbar(vgTargetScroll);
    this.searchAreasCtrl.valueChanges.pipe(
        startWith(''),
        debounceTime(500),
        tap(() => {
          this.areasList = this.areasList.concat([]);
          this.isLoading = true;
        }),
        switchMap(value => this.areaService.getAreasList({searchTerm: (value && Object.keys(value).length > 0) ? value.areaName : value, pageIndex: this.areaPageIndex, pageSize: 10})
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
    ).subscribe((response: any) => {
        const data = response.results;
        this.totalAreaPages = response.pageCount | 0;
        if (data == undefined) {
            this.totalAreaPages = 0;
            this.areasList = (this.areasList.length < 1) ? [{ notfound: 'Not Found' }] : this.areasList;
        } else {
            this.areasList = data && data.length ? this.areasList.concat(data) : this.areasList;
        }
    });
    this.searchYardsCtrl.valueChanges.pipe(
        startWith(''),
        debounceTime(500),
        tap(() => {
          this.yardsList = this.yardsList.concat([]);
          this.isLoading = true;
        }),
        switchMap(value => this.yardService.getYardsList({areaId: (this.searchAreasCtrl.value && this.searchAreasCtrl.value.id) ? this.searchAreasCtrl.value.id : 0, searchTerm: (value && Object.keys(value).length > 1) ? value.yardName : value, pageIndex: this.yardPageIndex, pageSize: 10})
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
    ).subscribe((response: any) => {
        const data = response.results;
        this.totalYardPages = response.pageCount | 0;
        if (data == undefined) {
            this.totalYardPages = 0;
            this.yardsList = (this.yardsList.length < 1) ? [{ notfound: 'Not Found' }] : this.yardsList;
        } else {
            this.yardsList = data && data.length ? this.yardsList.concat(data) : this.yardsList;
        }
    });

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
    const _this = this;
    this.service.getList(filter).subscribe((response: any) => {
      const list = response.results ? response.results : [];
      _this.sourceTotal = (response && response.rowCount) ? response.rowCount : 0;
      setTimeout(() => {
        _this.isLoadingSource = false;
        _this.sourceStudentsList = list || [];
        _this.selectedSourceStudentsList = [];
        list.forEach((item: any) => {
           _this.selectedSourceStudentsList.push({id: item.id, select: false});
        });
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
    const _this = this;
    this.service.getList(filter).subscribe((response: any) => {
      const list = response.results ? response.results : [];
      _this.targetTotal = (response && response.rowCount) ? response.rowCount : 0;
      setTimeout(() => {
        _this.isLoadingTarget = false;
        _this.targetStudentsList = list || [];
        _this.selectedTargetStudentsList = [];
        list.forEach((item: any) => {
           _this.selectedTargetStudentsList.push({id: item.id, select: false});
        });
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

  updateAllSourceCheckbox(): void {
    if(this.selectedSourceStudentsList.map((item: any) => item.select).filter((select: boolean) => select).length < 1) {
      this.sourceIsAllChecked = false;
      this.sourceIsAnyChecked = false;
    } else if(this.selectedSourceStudentsList.map((item: any) => item.select).filter((select: boolean) => select).length < this.selectedSourceStudentsList.length) {
      this.sourceIsAllChecked = false;
      this.sourceIsAnyChecked = true;
    } else {
      this.sourceIsAllChecked = true;
      this.sourceIsAnyChecked = false;
    }
    this.selectedSourceStudentsIdList = this.selectedSourceStudentsList.filter((item: any) => item.select).map((item: any) => item.id);
  }

  updateAllTargetCheckbox(): void {
    if(this.selectedTargetStudentsList.map((item: any) => item.select).filter((select: boolean) => select).length < 1) {
      this.targetIsAllChecked = false;
      this.targetIsAnyChecked = false;
    } else if(this.selectedTargetStudentsList.map((item: any) => item.select).filter((select: boolean) => select).length < this.selectedTargetStudentsList.length) {
      this.targetIsAllChecked = false;
      this.targetIsAnyChecked = true;
    } else {
      this.targetIsAllChecked = true;
      this.targetIsAnyChecked = false;
    }
    this.selectedTargetStudentsIdList = this.selectedTargetStudentsList.filter((item: any) => item.select).map((item: any) => item.id);
  }

  toggleAllSources(): void {
    let updateSelect: boolean = false;
    if(this.isSourceAll) {
      updateSelect = true;
      this.sourceIsAllChecked = true;
    } else {
      this.sourceIsAllChecked = false;
    }
    this.sourceIsAnyChecked = false;
    this.selectedSourceStudentsList.forEach((item: any) => {
      item.select = updateSelect;
    });
    this.selectedSourceStudentsIdList = this.selectedSourceStudentsList.filter((item: any) => item.select).map((item: any) => item.id);
  }

  toggleAllTargets(): void {
    let updateSelect: boolean = false;
    if(this.isTargetAll) {
      updateSelect = true;
      this.targetIsAllChecked = true;
    } else {
      this.targetIsAllChecked = false;
    }
    this.targetIsAnyChecked = false;
    this.selectedTargetStudentsList.forEach((item: any) => {
      item.select = updateSelect;
    });
    this.selectedTargetStudentsIdList = this.selectedTargetStudentsList.filter((item: any) => item.select).map((item: any) => item.id);
  }

  displayAreaFn(area: any): string {
    return area && area.areaName && !area.notfound ? area.areaName : '';
  }
  
  changeArea(areaId: number){
  }

  updateAreaShowMore() {
      this.showMoreArea = false;
      this.areaPageIndex++;
      this.searchAreasCtrl.enable({emitEvent: true});
  }

  displayYardFn(yard: any): string {
    return yard && yard.yardName && !yard.notfound ? yard.yardName : '';
  }
  
  changeYard(yardId: number){
  }

  updateYardShowMore() {
      this.showMoreYard = false;
      this.yardPageIndex++;
      this.searchYardsCtrl.enable({emitEvent: true});
  }
}
