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
import { Class } from '../../../models/manage/class';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { ClassEditComponent } from './class-edit/class-edit.component';
import PerfectScrollbar from 'perfect-scrollbar';
import { AreaService } from 'app/services/list/area.service';
import { ClassService } from 'app/services/manage/class.service';
import { TrainingGroundService } from 'app/services/list/training-ground.service';
import { TrainingGroundFilter } from 'app/models/filter/trainingroundfilter';
import { AreaFilter } from 'app/models/filter/areafilter';
import { MatPaginatorIntl } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ClassImportComponent } from './class-import/class-import.component';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {
  classList: any[] = [];
  Class: any;
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
    SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC,
    SORD_DIRECTION.ASC, SORD_DIRECTION.ASC,
    null
  ],
  columnsName: ['Order', 'ClassCode', 'ClassName', 'DisplayOrder', 'StudentCounts', 'CoachsList','YardName','Action'],
  columnsNameMapping: ['id', 'classCode', 'className', 'displayOrder', 'studentCounts', 'coachsList','yardName',''],
  columnsNameFilter: ['id', 'classCode', 'className', 'displayOrder', 'studentCounts', 'coachsList','yardName',''],
  sortAbles: [false, true, true, true, false,false,true, false],
  visibles:  [true, true, true, true, true, true,true, true]
}


  /**
   * END SORT SETTINGS
   */
  filter: ClassFilter = new ClassFilter(this.searchTerm, 1, this.pageSize, null, null, null, 'id', 'ASC',null,null,null);

  constructor(private matCus: MatPaginatorIntl, private translate: TranslateService,public utilsService: UtilsService, config: NgbModalConfig, private service: ClassService,private traininggroundservice: TrainingGroundService, private router: Router, private modalService: NgbModal,
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
  
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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
        switchMap(value => this.areaService.getAreasList(new AreaFilter(value, 1, 100, null, 'id', 'ASC'))
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
        this.yardsList = [];
        this.isLoading = true;
      }),
      switchMap(value => this.yardService.getYardsList(new YardFilter(value, 1, 100, null, 'id', 'ASC'))
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
      .subscribe(data => {
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
      switchMap(value => this.traininggroundservice.getTrainingGroundsList(new TrainingGroundFilter('', 1, 100, null,null, 'id', 'ASC'))
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
    const modalRef = this.modalService.open(ConfirmComponent, { windowClass: 'modal-confirm' });
    modalRef.componentInstance.confirmObject = 'class';
    modalRef.componentInstance.decide.subscribe(() => {
      _this.service.deleteClass(aclass.id, this.currentUser.UserId).subscribe(() => {
        _this.reload();
      });
    });
  }
  pageEvent(variable: any) {
    this.filter = new ClassFilter(this.searchTerm, 1, this.pageSize, null, null, null, 'Id','ASC',null,null,null);
    this.filter.PageIndex = variable.pageIndex + 1;
    this.filter.PageSize = variable.pageSize;
    this.reload();
  }
  reload() {
    const _this = this;
    const filter: ClassFilter = new ClassFilter( '',this.pageIndex, this.pageSize,0,0,0, 'Id','ASC',0,0,0);
    this.loading = true;
    _this.classList = [];
    this.service.getClassList(filter).subscribe(
        (response: any) => {
          const list = response.results ? response.results : [];
          this.Total = (response && response.rowCount) ? response.rowCount : 0;
          this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
          setTimeout(() => {
            _this.classList = (list) ? list : [];
            _this.loading = false;
          }, 500);
        },
        (err: any) => {
          _this.classList = [];
          _this.loading = false;
        }
    );
  }
  add() {
    this.edit(null);
  }

  edit(ClassID: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(ClassEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.ClassId = ClassID;
    modalRef.result.then(function (result) {
      _this.reload();
    });
  }

  displayAreaFn(user): string {
    return user && user.AreaName && !user.notfound ? user.AreaName : '';
  }
  displayYardFn(user): string {
    return user && user.YardName && !user.notfound ? user.YardName : '';
  }
  displayTraininggroundFn(user): string {
    return user && user.TraininggroundName && !user.notfound ? user.TraininggroundName : '';
  }
  changeArea(areaID: number) {
    this.yardService.getYardsList(new YardFilter('', 1, 100, null, 'Id', 'ASC')).subscribe((list) => {
      this.yardsList = list;
      this.filter.AreaId = areaID;
      this.reload();
    });
  }
  changeYard(yardID) {
    this.traininggroundservice.getTrainingGroundsList(new TrainingGroundFilter('', 1, 100, null,null, 'Id', 'ASC')).subscribe((list) => {
      this.traininggroundsList = list;
      this.filter.YardId = yardID;
      this.reload();
    });
  }
  changeTrainingGround(traininggroundID) {
    this.filter.TrainingGroundId = traininggroundID;
    this.reload();
  }

  doNothing(): void {}
  openImport() {
    const _this = this;
    const modalRef = this.modalService.open(ClassImportComponent, { size: 'lg' });
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

  displayAresFn(area: any) {
    return area && area.AreaName && !area.notfound ? area.AreaName : '';
  }

  displayTrainingGroundFn(trainingground: any) {
    return trainingground && trainingground.TrainingGroundName && !trainingground.notfound ? trainingground.TrainingGroundName : '';
  }
}

