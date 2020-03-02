import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';

import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ASCSort, SORD_DIRECTION } from 'app/models/sort';
import { StudentReserveFilter } from 'app/models/filter/studentreservefilter';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { ProvinceService } from 'app/services/list/province.service';
import { HttpClient } from '@angular/common/http';
import { YardService } from 'app/services/list/yard.service';
import { YardFilter } from 'app/models/filter/yardfilter';
import { StudentReserve } from '../../../models/manage/studentreserve';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { StudentReserveEditComponent } from './studentreserve-edit/studentreserve-edit.component';
import PerfectScrollbar from 'perfect-scrollbar';
import { AreaService } from 'app/services/list/area.service';
import { StudentReserveService } from 'app/services/manage/studentreserve.service';
import { TrainingGroundService } from 'app/services/list/training-ground.service';
import { TrainingGroundFilter } from 'app/models/filter/trainingroundfilter';
import { AreaFilter } from 'app/models/filter/areafilter';
import { MatPaginatorIntl } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { StudentReserveImportComponent } from './studentreserve-import/studentreserve-import.component';
import { Yard } from 'app/models/list/yard';

@Component({
  selector: 'app-studentreserve',
  templateUrl: './studentreserve.component.html',
  styleUrls: ['./studentreserve.component.scss']
})
export class StudentReserveComponent implements OnInit {
  studentreservesList: any[] = [];
  StudentReserve: any;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSizesList: number[] = [5, 10, 20, 100];
  pageSize:number = this.pageSizesList[1];
  currentUser: any;
  loading: boolean = true;
  Total: any;
  firstRowOnPage: any;

  areasList: any[];
  yardsList: any[]= [];
  traininggroundsList: any[]= [];

  searchAreasCtrl = new FormControl();
  searchAdvanced: boolean = false;
  isLoading = false;
  /**
  * BEGIN SORT SETTINGS
  */
 paginationSettings: any = {
  sort: new ASCSort(),
  sortToggles: [
    null,
    SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC,
    SORD_DIRECTION.ASC, SORD_DIRECTION.ASC,
    null
  ],
  columnsName: ['Order', 'LastName', 'FirstName', 'Gender', 'DayofBirth', 'ReserveDay','RemainDays','Class','Action'],
  columnsNameMapping: ['id', 'lastName', 'firstName', 'gender', 'dayofBirth', 'reserveDay','remainDays','class',''],
  sortAbles: [false, true, true, true, false,false,true,false, false],
  visibles:  [true, true, true, true, true, true,true, true,true]
}


  /**
   * END SORT SETTINGS
   */
  filter: StudentReserveFilter = new StudentReserveFilter(this.searchTerm, 1, this.pageSize, null, null, null, 'id', 'ASC');

  constructor(private matCus: MatPaginatorIntl, private translate: TranslateService,public utilsService: UtilsService, config: NgbModalConfig, private service: StudentReserveService,private traininggroundservice: TrainingGroundService, private router: Router, private modalService: NgbModal,
    private areaService: AreaService, private yardService: YardService, private http: HttpClient) {
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
    const vgscroll = <HTMLElement>document.querySelector('.vg-scroll');
    new PerfectScrollbar(vgscroll);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  remove(aclass: any) {
    this.StudentReserve = aclass;
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { windowClass: 'modal-confirm' });
    modalRef.componentInstance.confirmObject = 'Class';
    modalRef.componentInstance.decide.subscribe(() => {
      _this.service.deleteStudentReserve(aclass.id, this.currentUser.UserId).subscribe(() => {
        _this.reload();
      });
    });
  }
  pageEvent(variable: any) {
    this.filter = new StudentReserveFilter(this.searchTerm, 1, this.pageSize, null, null, null, 'id','ASC');
    this.filter.PageIndex = variable.pageIndex + 1;
    this.filter.PageSize = variable.pageSize;
    this.reload();
  }
  reload() {
    const _this = this;
    const filter: StudentReserveFilter = new StudentReserveFilter( '',this.pageIndex, this.pageSize,0,0,0, 'id','ASC');
    this.loading = true;
    _this.studentreservesList = [];
    this.service.getStudentReserveList(filter).subscribe(
        (response: any) => {
          const list = response.results ? response.results : [];
          this.Total = (response && response.rowCount) ? response.rowCount : 0;
          this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
          setTimeout(() => {
            _this.studentreservesList = (list) ? list : [];
            _this.loading = false;
          }, 500);
        },
        (err: any) => {
          _this.studentreservesList = [];
          _this.loading = false;
        }
    );
  }
  add() {
    this.edit(null);
  }

  edit(StudentReserveID: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(StudentReserveEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.id = StudentReserveID;
    modalRef.result.then(function (result) {
      _this.reload();
    });
  }

  return(StudentReserveID: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.confirmObject = StudentReserveID;
    modalRef.result.then(function (result) {
      _this.reload();
    });
  }

  displayAreaFn(area): string {
    return area && area.areaName && !area.notfound ? area.areaName : '';
  }
 
  
  changeArea(areaID: number) {
      this.filter.AreaId = areaID;
      this.reload();  
  }
  

  doNothing(): void {}
  openImport() {
    const _this = this;
    const modalRef = this.modalService.open(StudentReserveImportComponent, { size: 'lg' });
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

