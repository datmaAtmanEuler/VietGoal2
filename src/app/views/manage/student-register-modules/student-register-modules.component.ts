import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import PerfectScrollbar from 'perfect-scrollbar';
import { UtilsService } from 'app/services/utils.service';
import { TranslateService } from '@ngx-translate/core';

import { ClassService } from '../../../services/manage/class.service';
import { AreaService } from '../../../services/list/area.service';
import { YardService } from '../../../services/list/yard.service';
import { TrainingGroundService } from '../../../services/list/training-ground.service';
import { Class } from '../../../models/manage/class';
import { ClassFilter } from '../../../models/filter/classfilter';
import { StudentRegisterModulesService } from '../../../services/manage/student-register-modules.service';
import { StudentRegisterModulesInfoComponent } from './student-register-modules-info/student-register-modules-info.component';

@Component({
  selector: 'app-student-register-modules',
  templateUrl: './student-register-modules.component.html',
  styleUrls: ['./student-register-modules.component.scss']
})
export class StudentRegisterModulesComponent implements OnInit {
  currentUser: any = {};
	selectedModule: any = {};
  totalAreaPages: number = 0;
  totalYardPages: number = 0;
  totalTrainingGroundPages: number = 0;
  totalClassPages: number = 0;

	areasList: any[] = [];
  	yardsList: any[] = [];
  	trainingGroundsList: any[] = [];
  	classList: any[] = [];
  	yearsList: any[] = [];
  	monthsList: any[] = [];	

	showMoreArea: boolean = false;
  	showMoreYard: boolean = false;
  	showMoreTrainingGround: boolean = false;
	showMoreClass: boolean = false;
  	areaPageIndex: number = 1;
  	yardPageIndex: number = 1;
    trainingGroundPageIndex: number = 1;
    classPageIndex: number = 1;
	searchAreasCtrl = new FormControl();
  	searchYardsCtrl = new FormControl();
  	searchTrainingGroundsCtrl = new FormControl();
	searchClassCtrl = new FormControl();
  	searchYearsCtrl = new FormControl();
  	searchMonthsCtrl = new FormControl();

	isLoading = false;
	errorMsg: string;

	filter: any = {
		classId: 0,
	  	year: new Date().getFullYear(),
  		month: new Date().getMonth() + 1
  	}; 
	data: any[] = []; 

  daysColumn: any[] = [];

  constructor(private translate: TranslateService, public utilsService: UtilsService, config: NgbModalConfig,
	private service: StudentRegisterModulesService, private router: Router, private modalService: NgbModal,
    	private areaService: AreaService, private yardService: YardService,
	private trainingGroundService: TrainingGroundService, private classService: ClassService) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
  }
  
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.reload();
    this.filtersEventsBinding();
    const vgscroll = <HTMLElement>document.querySelector('.vg-scroll');
    new PerfectScrollbar(vgscroll);
  }
  
  filtersEventsBinding() {
    const _this = this;
     this.searchAreasCtrl.valueChanges.pipe(
            startWith(''),
            debounceTime(500),
            tap(() => {
              _this.isLoading = true;
            }),
            switchMap(value => _this.areaService.getAreasList({ searchTerm: (value && Object.keys(value).length > 0) ? value.areaName : value, pageIndex: this.areaPageIndex, pageSize: 10})
              .pipe(
                finalize(() => {
                  _this.isLoading = false
                }),
              )
            )
        ).subscribe((response: any) => {
            const data = response.results;
            this.totalAreaPages = response.pageCount | 0;
            if (data == undefined) {
                _this.totalAreaPages = 0;
                _this.areasList = (_this.areasList.length < 1) ? [{ notfound: 'Not Found' }] : _this.areasList;
            } else {
                if(data && data.length > 0) {
                  data.forEach(function(item: any) {
                    if(_this.areasList.length < 1 || (_this.areasList.length > 0 && _this.areasList[0].id && _this.areasList.map((ar: any) => ar.id).indexOf(item.id) == -1)) {
                      _this.areasList.push(item);
                    }
                  });
                }
            }
        });
        this.searchYardsCtrl.valueChanges.pipe(
            startWith(''),
            debounceTime(500),
            tap(() => {
              _this.isLoading = true;
            }),
            switchMap(value => _this.yardService.getYardsList({ areaId: (_this.searchAreasCtrl.value && _this.searchAreasCtrl.value.id) ? _this.searchAreasCtrl.value.id : 0, searchTerm: (value && Object.keys(value).length > 1) ? value.yardName : value, pageIndex: _this.yardPageIndex, pageSize: 10})
              .pipe(
                finalize(() => {
                  _this.isLoading = false
                }),
              )
            )
        ).subscribe((response: any) => {
            const data = response.results;
            this.totalYardPages = response.pageCount | 0;
            if (data == undefined) {
                _this.totalYardPages = 0;
                _this.yardsList = (_this.yardsList.length < 1) ? [{ notfound: 'Not Found' }] : _this.yardsList;
            } else {
                if(data && data.length > 0) {
                  data.forEach(function(item: any) {
                    if(_this.yardsList.length < 1 || (_this.yardsList.length > 0 && _this.yardsList[0].id && _this.yardsList.map((ar: any) => ar.id).indexOf(item.id) == -1)) {
                      _this.yardsList.push(item);
                    }
                  });
                }
            }
        });
        this.searchTrainingGroundsCtrl.valueChanges.pipe(
            startWith(''),
            debounceTime(500),
            tap(() => {
              this.isLoading = true;
            }),
            switchMap(value => this.trainingGroundService.getTrainingGroundsList({yardId: (this.searchYardsCtrl.value && this.searchYardsCtrl.value.id) ? this.searchYardsCtrl.value.id : 0, searchTerm: (value && Object.keys(value).length > 1) ? value.trainingGroundName : value, pageIndex: this.trainingGroundPageIndex, pageSize: 10})
              .pipe(
                finalize(() => {
                  this.isLoading = false
                }),
              )
            )
        ).subscribe((response: any) => {
            const data = response.results;
            this.totalTrainingGroundPages = response.pageCount | 0;
            if (data == undefined) {
                this.totalTrainingGroundPages = 0;
                this.trainingGroundsList = (this.trainingGroundsList.length < 1) ? [{ notfound: 'Not Found' }] : this.trainingGroundsList;
            } else {
                if(data && data.length > 0) {
                  data.forEach(function(item: any) {
                    if(_this.trainingGroundsList.length < 1 || (_this.trainingGroundsList.length > 0 && _this.trainingGroundsList[0].id && _this.trainingGroundsList.map((ar: any) => ar.id).indexOf(item.id) == -1)) {
                      _this.trainingGroundsList.push(item);
                    }
                  });
                }
            }
        });
        this.searchClassCtrl.valueChanges.pipe(
            startWith(''),
            debounceTime(500),
            tap(() => {
              this.classList = this.classList.concat([]);
              this.isLoading = true;
            }),
            switchMap(value => this.classService.getClassList({trainingGroundId: (this.searchTrainingGroundsCtrl.value && this.searchTrainingGroundsCtrl.value.id) ? this.searchTrainingGroundsCtrl.value.id : 0, searchTerm: (value && Object.keys(value).length > 1) ? value.className : value, pageIndex: this.classPageIndex, pageSize: 10})
              .pipe(
                finalize(() => {
                  this.isLoading = false
                }),
              )
            )
        ).subscribe((response: any) => {
            const data = response.results;
            this.totalClassPages = response.pageCount | 0;
            if (data == undefined) {
                this.totalClassPages = 0;
                this.classList = (this.classList.length < 1) ? [{ notfound: 'Not Found' }] : this.classList;
            } else {
                this.classList = data && data.length ? this.classList.concat(data) : this.classList;
                this.reload();
            }
        });
      this.searchYearsCtrl.valueChanges.pipe(
            startWith(''),
            debounceTime(500),
            tap(() => {
              this.yearsList = [];
              this.isLoading = true;
            }),
            switchMap(value => this.utilsService.yearsList((value && Object.keys(value).length > 1) ? value.value : value, (value && Object.keys(value).length > 1) ? 2 : 1)
              .pipe(
                finalize(() => {
                  this.isLoading = false
                }),
              )
            )
        ).subscribe((response: any) => {
            if (response == undefined || response.length < 1) {
                this.yearsList = [{ notfound: 'Not Found' }];
            } else {
                this.yearsList = response && response.length ? response : [];
            }
            this.reload();
        });

        this.searchMonthsCtrl.valueChanges.pipe(
            startWith(''),
            debounceTime(500),
            tap(() => {
              this.monthsList = [];
              this.isLoading = true;
            }),
            switchMap(value => this.utilsService.monthList((value && Object.keys(value).length > 1) ? value.value : value, (value && Object.keys(value).length > 1) ? 2 : 1)
              .pipe(
                finalize(() => {
                  this.isLoading = false
                }),
              )
            )
        ).subscribe((response: any) => {
            if (response == undefined || response.length < 1) {
                this.monthsList = [{ notfound: 'Not Found' }];
            } else {
                this.monthsList = response && response.length ? response : [];
            }
            this.reload();
        });
  }

  remove(module: any) {
    this.selectedModule = module;
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    modalRef.componentInstance.confirmObject = 'StudentRegisterModule';
    modalRef.componentInstance.decide.subscribe(() => {
      _this.service.delete(module.id).subscribe(() => {
        _this.reload();
      });
    });
  }

  reload() { 
    const _this = this;
    this.isLoading = true;
    _this.data = [];
    this.service.getList(this.filter.classId, this.filter.year, this.filter.month).subscribe(
        (list: any[]) => {
          setTimeout(() => {
            _this.data = (list) ? list : [];
            _this.isLoading = false;
          }, 500);
        },
        (err: any) => {
          _this.data = [];
          _this.isLoading = false;
        }, 
        () => {
          _this.updateTableColumns();
        }
    );
  }
  add() {
  }

  info(moduleId: number) {
    const _this = this;
    const modalRef = this.modalService.open(StudentRegisterModulesInfoComponent, { size: 'xl' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.moduleId = moduleId;
  }

   displayAreaFn(area: any): string {
    return area && area.areaName && !area.notfound ? area.areaName : '';
  }
  
  changeArea(areaId: number){
    console.log(this.searchAreasCtrl.value);
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

  displayTrainingGroundFn(trainingGround: any): string {
    return trainingGround && trainingGround.trainingGroundName && !trainingGround.notfound ? trainingGround.trainingGroundName : '';
  }

  changeTrainingGround(trainingGroundId: number) {

  }

  updateTrainingGroundShowMore() {
      this.showMoreTrainingGround = false;
      this.trainingGroundPageIndex++;
      this.searchTrainingGroundsCtrl.enable({emitEvent: true});
  }

  displayClassFn(aclass: any): string {
    return aclass && aclass.className && !aclass.notfound ? aclass.className : '';
  }
  
  changeClass(classId: number){
    this.filter.classId = classId;
  }

  updateClassShowMore() {
    this.showMoreClass = false;
    this.classPageIndex++;
    this.searchClassCtrl.enable({emitEvent: true});
    this.reload();
  }

  displayYearFn(year: any): string {
    return (year && year.title && !year.notfound) ? year.title : '';
  }
  
  changeYear(yearValue: number){
    this.searchYearsCtrl.setValue({ value: this.searchYearsCtrl.value.value, title: this.translate.instant('MESSAGE.NameList.Year') + ' ' + this.searchYearsCtrl.value.title }); 

    this.filter.year = yearValue;
    this.reload();
  }

  displayMonthFn(month: any): string {
    return (month && month.title && !month.notfound) ? (month.title) : '';
  }
  
  changeMonth(monthValue: number){
    this.searchMonthsCtrl.setValue({ value: this.searchMonthsCtrl.value.value, title: this.translate.instant(this.searchMonthsCtrl.value.title) });
    this.filter.month = monthValue;
    this.reload();
  }
 
  doNothing(): void {}

  getDaysList(): number[] {
    const n = this.utilsService.daysInMonth(this.filter.year, this.filter.month);
    let result: number[] = [];
    for(let i = 1; i <= n; i++) {
      result.push(i);
    }
    return result;
  }

  updateTableColumns() {
    let n = this.utilsService.daysInMonth(this.filter.year, this.filter.month - 1);
    const list = this.utilsService.dayInWeekListStatic();
    const result: any[] = [];
    for(let day = 1; day <= n; day++) {
      var thu = this.utilsService.weekNumber(new Date(this.filter.year, this.filter.month - 1, day));
      result.push({day: day, thu: list[thu].title });
    }
    this.daysColumn = [];
    this.daysColumn = result;
  }

  getModuleDaysInfo(info: any): any {
    return {
      days: info.daysInModules.map((a: any) => a.day),
      isEnds: info.daysInModules.map((a: any) => a.isEndDateInModule),
      isStarts: info.daysInModules.map((a: any) => a.isStartDateInModule),
      red: info.daysInModules.map((a: any) => a.isStartDateInModule),
      green: info.daysInModules.map((a: any) => !a.isStartDateInModule),
      status: info.daysInModules.map((a: any) => (a.status == 0) ? 1 : 0),
      moduleId: info.daysInModules[0].studentRegisterModuleId
    };
  }

  getTotalInfo(info: any) {
    return {
      total: info.daysInModules.map((a: any) => a.day).length,
      v: info.daysInModules.map((a: any) => (a.status == 0) ? false : true).filter((s: boolean) => s).length
    };
  }
}