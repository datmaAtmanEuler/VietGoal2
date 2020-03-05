import { Component, OnInit, ViewChild } from '@angular/core';
import { AreaService } from '../../../services/list/area.service';
import { YardService } from '../../../services/list/yard.service';
import { TrainingGroundService } from '../../../services/list/training-ground.service';
import { TrainingGround } from '../../../models/list/training-ground';
import { TrainingGroundEditComponent } from './trainningground-edit/trainingground-edit.component';
import { TrainingGroundFilter } from '../../../models/filter/trainingroundfilter';
import { Router } from '@angular/router'; 
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ASCSort, SORD_DIRECTION } from 'app/models/sort';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { TrainingGroundImportComponent } from './trainingground-import/trainingground-import.component';
import { FormControl } from '@angular/forms';

import { AreaFilter } from '../../../models/filter/areafilter';
import { YardFilter } from '../../../models/filter/yardfilter';
import { UtilsService } from '../../../services/utils.service';
import { startWith, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { CommonFilter } from '../../../models/filter/commonfilter';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-training-grounds',
  templateUrl: './traininggrounds.component.html',
  styleUrls: ['./traininggrounds.component.scss']
})
export class TrainingGroundsComponent implements OnInit {ModalDirective;
  trainingroundsList:any[] = [];
  areasList:any[] = [];
  area: any;
  yardsList: any[]=[];
  yard: any;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSizesList: number[] = [5, 10, 20, 100];
  pageSize:number = this.pageSizesList[1];
  currentUser: any;
  isLoading: boolean = true;
  Total: number = 0;
  firstRowOnPage: any;
  searchAreasCtrl = new FormControl();
  searchYardsCtrl = new FormControl();
  searchAdvanced: boolean = false;
  areaFilter: AreaFilter = new AreaFilter( this.searchTerm,this.pageIndex, this.pageSize,0,'id','ASC');
  yardFilter: YardFilter = new YardFilter( this.searchTerm,this.pageIndex, this.pageSize,0,'id','ASC');
  mainfilter = new CommonFilter()

  /**
   * BEGIN SORT SETTINGS
   */
  paginationSettings: any = {
    sort: new ASCSort(),
    sortToggles: [
      null,
      SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC,
      SORD_DIRECTION.ASC,
      null
    ],
    columnsName: ['Order', 'TrainingGroundCode','TrainingGroundName', 'YardName','Address','Note','Action'],
    columnsNameMapping: ['id', 'trainingGroundCode','trainingGroundName', 'yardId','address','description',''],
    sortAbles: [false, true, true, true, false,false, false],
    visibles:  [true, true, true, true, true, true,true]
  }
  /**
   * END SORT SETTINGS
   */
  constructor(public utilsService: UtilsService,private matCus: MatPaginatorIntl,private translate: TranslateService,config: NgbModalConfig, 
    private areaService: AreaService, private yardService: YardService, private service: TrainingGroundService, 
    private router: Router, private modalService: NgbModal) { 
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
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  this.mainfilter.pageIndex = 1;
  this.mainfilter.pageSize = this.pageSizesList[1];
  this.areaService.getAreasList(this.areaFilter).subscribe((response : any)=>{
    this.areasList = response.results;
  });
  this.yardService.getYardsList(this.yardFilter).subscribe((response)=>{
    this.yardsList = response.results;
  });
  this.filtersEventsBinding();
  this.reload();
  const vgscroll = <HTMLElement>document.querySelector('.vg-scroll');
  new PerfectScrollbar(vgscroll);
  }

  remove(id: any) {
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { windowClass: 'modal-confirm' });
    modalRef.componentInstance.confirmObject = 'TrainingGround';
    modalRef.componentInstance.decide.subscribe(() => {
        _this.service.deleteTrainingGround(id).subscribe(()=>{
          _this.reload();
        })
    });
}

pageEvent(variable: any){
  this.mainfilter.PageIndex = variable.pageIndex + 1;
  this.mainfilter.PageSize = variable.pageSize;
  this.reload();
}
reload() {
  const _this = this;
  this.isLoading = true;
 this.mainfilter.SortName = this.paginationSettings.sort.SortName;
 this.mainfilter.SortDirection = this.paginationSettings.sort.SortDirection;
  this.service.getTrainingGroundsList(this.mainfilter).subscribe(
      (response: any) => {
        const list = response.results ? response.results : [];
        this.Total = (response && response.rowCount) ? response.rowCount : 0;
        this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
        setTimeout(() => {
                          _this.trainingroundsList = (list) ? list : [];
                          _this.isLoading = false;
                        }, 500);
                      },
                      (err: any) => {
                        _this.trainingroundsList = [];
                        _this.isLoading = false;
      });
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
      switchMap(value => this.areaService.getAreasList(new AreaFilter(this.utilsService.objectToString(value),1,100,0,'id','ASC'))
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
    switchMap(value => this.yardService.getYardsList(new YardFilter(this.utilsService.objectToString(value), this.pageIndex,this.pageSize,0,'id','ASC'))
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
        this.yardsList = [{ notfound: 'Not Found' }];
      } else {
        this.yardsList = data.length ? data : [{ notfound: 'Not Found' }];
      }

    });
}

add() {
  this.edit(null);
}

edit(ID: null | number) {
  const _this = this;
  const modalRef = this.modalService.open(TrainingGroundEditComponent, { size: 'lg' });
  modalRef.componentInstance.popup = true;
  if (ID) {
    modalRef.componentInstance.id = ID;
  }
  modalRef.result.then(function(){
    _this.reload();
});
}
doNothing(): void {}

displayAreaFn(area: any) {
    return area && area.areaName && !area.notfound ? area.areaName : '';
  }

changeArea(areaId: number) {
    this.yardFilter.AreaId = areaId;
    this.yardService.getYardsList(this.yardFilter).subscribe((response : any) => {
      this.yardsList = response.results;
      
    });
  }

  displayYardFn(yard: any) {
    return yard && yard.yardName && !yard.notfound ? yard.yardName : '';
  }

changeYard(yardId: number) {
   this.mainfilter.yardId = yardId;
   this.reload();
  }
  
openImport() {
  const _this = this;
  const modalRef = this.modalService.open(TrainingGroundImportComponent, { size: 'lg' });
  modalRef.result.then(function(importModel: any){
     
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
}

