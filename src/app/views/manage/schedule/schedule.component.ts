import { UtilsService } from 'app/services/utils.service';
import { Schedule } from 'app/models/schedule';
import { ScheduleService } from 'app/services/manage/schedule.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AreaService } from '../../../services/list/area.service';
import { YardService } from '../../../services/list/yard.service';
import { ClassService } from '../../../services/manage/class.service';
import { CoachService } from '../../../services/manage/coach.service';
import { Area } from '../../../models/list/area';
import { Filter } from '../../../models/filter/filter';
import { Router } from '@angular/router'; 
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { ASCSort, SORD_DIRECTION } from 'app/models/sort';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { FormControl } from '@angular/forms';

import { startWith, map, debounceTime, tap, switchMap, finalize, filter } from 'rxjs/operators';
import { from } from 'rxjs';

declare var $: any;

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
    searchTerm: string = '';
    pageIndex: number = 1;
    pageSizesList: number[] = [5, 10, 20, 100];
    pageSize: number = this.pageSizesList[3];

    areaPageIndex: number = 1;
    yardPageIndex: number = 1;
    classPageIndex: number = 1;
    coachPageIndex: number = 1;

    Total: number;
    isLoading: boolean = true;
    searchAdvanced:boolean = false;
    showMoreArea: boolean = false;
    showMoreYard: boolean = false;
    showMoreClass: boolean = false;
    showMoreCoach: boolean = false;

    scheduleFilter: any = {
        areaId: null,
        yardId: null,
        coachId: null,
        shift: null,
        year: null,
        month: null,
        week: null
    };

    paginationSettings: any = {
        sort: new ASCSort(),
        sortToggles: [
            null,
            SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC,
            SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC,
            SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC
        ],
        columnsName: ['Order', 'Area', 'Yard', 'YardArea', 'Class', 'DayOrderInWeek', 'ClassTime', 'MainCoach', 'ViceCoach', 'MainCoachReal', 'ViceCoachReal'],
        columnsNameMapping: ['Id', 'Area', 'Yard', 'YardArea', 'Class', 'DayOrderInWeek', 'ClassTime', 'MainCoach', 'ViceCoach', 'MainCoachReal', 'ViceCoachReal'],
        sortAbles: [false, true, true, true, true, true, true, true, true, true, true, true, true],
        visibles: [true, true, true, true, true, true, true, true, true, true, true, true, true]
    }
    currentUser: any;

    schedulesList: any[];
    loading: boolean;

    areasList: any[] = [];
    yardsList: any[] = [];
    classList: any[] = [];
    coachsList: any[] = [];

    yearsList: any[] = [];
    monthsList: any[] = [];
    weeksList: any[] = [];

    searchAreasCtrl = new FormControl();
    searchYardsCtrl = new FormControl();
    searchClassCtrl = new FormControl();
    searchCoachsCtrl = new FormControl();

    searchYearsCtrl = new FormControl();
    searchMonthsCtrl = new FormControl();
    searchWeeksCtrl = new FormControl();

    totalAreaPages: number = 0;
    totalYardPages: number = 0;
    totalClassPages: number = 0;
    totalCoachPages: number = 0;
    
    constructor(public translate: TranslateService, private matCus: MatPaginatorIntl,config: NgbModalConfig,
        public utilsService: UtilsService,
        private areaService: AreaService,
        private yardService: YardService,
        private classService: ClassService,
        private coachService: CoachService,
        private service: ScheduleService, private modalService: NgbModal) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        config.backdrop = 'static';
        config.keyboard = false;
        config.scrollable = false;
        utilsService.loadPaginatorLabels();
    }

    reload = () => {
        const now = new Date();
        this.scheduleFilter.classTime = now.getHours() + ':' + now.getMinutes();
        this.scheduleFilter.month = now.getMonth() + 1;
        this.scheduleFilter.year = now.getFullYear();

        this.isLoading = true;
        this.schedulesList = [];
        setTimeout(() => {
         this.service.getSchedulesList(filter).subscribe();
          this.isLoading = false;
        }, 500);
    };

    add(){}

    ngOnInit() {
        this.reload();
        const vgscroll = <HTMLElement>document.querySelector('.vg-scroll');
        new PerfectScrollbar(vgscroll);
        this.searchAreasCtrl.valueChanges.pipe(
            startWith(''),
            debounceTime(500),
            tap(() => {
              this.areasList = this.areasList.concat([]);
              this.isLoading = true;
            }),
            switchMap(value => this.areaService.getAreasList({centralId: 0, searchTerm: (value && Object.keys(value).length > 0) ? value.areaName : value, pageIndex: this.areaPageIndex, pageSize: 10})
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
            switchMap(value => this.yardService.getYardsList({areaId: this.scheduleFilter.areaId, searchTerm: (value && Object.keys(value).length > 1) ? value.yardName : value, pageIndex: this.yardPageIndex, pageSize: 10})
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
        this.searchClassCtrl.valueChanges.pipe(
            startWith(''),
            debounceTime(500),
            tap(() => {
              this.classList = this.classList.concat([]);
              this.isLoading = true;
            }),
            switchMap(value => this.classService.getClassList({areaId: this.scheduleFilter.areaId, yardId: this.scheduleFilter.yardId, searchTerm: (value && Object.keys(value).length > 1) ? value.className : value, pageIndex: this.classPageIndex, pageSize: 10})
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
            }
        });

        this.searchCoachsCtrl.valueChanges.pipe(
            startWith(''),
            debounceTime(500),
            tap(() => {
              this.coachsList = this.coachsList.concat([]);
              this.isLoading = true;
            }),
            switchMap(value => this.coachService.getCoachsList({centralId: 0, searchTerm: (value && Object.keys(value).length > 0) ? value.firstName + ' ' + value.lastName : value, pageIndex: this.coachPageIndex, pageSize: 10})
              .pipe(
                finalize(() => {
                  this.isLoading = false
                }),
              )
            )
        ).subscribe((response: any) => {
            const data = response.results;
            this.totalCoachPages = response.pageCount | 0;
            if (data == undefined) {
                this.totalCoachPages = 0;
                this.coachsList = (this.coachsList.length < 1) ? [{ notfound: 'Not Found' }] : this.coachsList;
            } else {
                this.coachsList = data && data.length ? this.coachsList.concat(data) : this.coachsList;
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
        });

        this.searchWeeksCtrl.valueChanges.pipe(
            startWith(''),
            debounceTime(500),
            tap(() => {
              this.weeksList = [];
              this.isLoading = true;
            }),
            switchMap(value => this.utilsService.weekNumberList((value && Object.keys(value).length > 1) ? value.value : value, (value && Object.keys(value).length > 1) ? 2 : 1)
              .pipe(
                finalize(() => {
                  this.isLoading = false
                }),
              )
            )
        ).subscribe((response: any) => {
            if (response == undefined || response.length < 1) {
                this.weeksList = [{ notfound: 'Not Found' }];
            } else {
                this.weeksList = response && response.length ? response : [];
            }
        });
        const _this = this; 
        this.translate.onLangChange.subscribe((a: any) => {
            if(_this.searchMonthsCtrl && _this.searchMonthsCtrl.value && _this.searchMonthsCtrl.value.title) {
                _this.utilsService.monthList(_this.searchMonthsCtrl.value.value, 2).subscribe((r1: any) => {
                    _this.searchMonthsCtrl.setValue({ value: r1[0].value, title: _this.translate.instant(r1[0].title) });
                });
            }
            if(_this.searchYearsCtrl && _this.searchYearsCtrl.value && _this.searchYearsCtrl.value.title) {
                _this.utilsService.yearsList(_this.searchYearsCtrl.value.value, 2).subscribe((r2: any) => {
                    _this.searchYearsCtrl.setValue({ value: r2[0].value, title: _this.translate.instant('MESSAGE.NameList.Year') + ' ' + r2[0].title });
                });
            }
            
            if(_this.searchWeeksCtrl && _this.searchWeeksCtrl.value && _this.searchWeeksCtrl.value.title) {
                _this.utilsService.weekNumberList(_this.searchWeeksCtrl.value.value, 2).subscribe((r3: any) => {
                    _this.searchWeeksCtrl.setValue({ value: r3[0].value, title: _this.translate.instant(r3[0].title) });
                });
            }
          });
    } 
    sortToggles(colIndex: number) {
        const _this= this;
        if(this.paginationSettings.sortAbles[colIndex]) 
            this.utilsService.toggleSort(colIndex, this.paginationSettings.sortToggles ,this.paginationSettings.sort , this.paginationSettings.columnsNameMapping)
              .then(() => {
                _this.reload();
              });
        else 
          this.utilsService.doNothing();
    }
    
  openImport() {
    /*const _this = this;
    const modalRef = this.modalService.open(ScheduleImportComponent, { size: 'lg' });
    modalRef.result.then(function(importModel: any){
    });*/
  }

  openExport() {

  }

  downloadTemplate() {
    /*var fileName = 'Areas_Import.xlsx';
    var a = document.createElement('a');
    a.href = this.service.getTemplate(fileName);
    a.download = fileName;
    document.body.append(a);
    a.click();
    a.remove();*/
  }

  /**
  * For selects
  */
  displayAreaFn(area: any): string {
    return area && area.areaName && !area.notfound ? area.areaName : '';
  }
  
  changeArea(areaId: number){
    this.scheduleFilter.areaId = areaId;
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
    this.scheduleFilter.yardId = yardId;
  }

  updateYardShowMore() {
      this.showMoreYard = false;
      this.yardPageIndex++;
      this.searchYardsCtrl.enable({emitEvent: true});
  }

  displayClassFn(aclass: any): string {
    return aclass && aclass.className && !aclass.notfound ? aclass.className : '';
  }
  
  changeClass(classId: number){
    this.scheduleFilter.classId = classId;
  }

  updateClassShowMore() {
      this.showMoreClass = false;
      this.classPageIndex++;
      this.searchClassCtrl.enable({emitEvent: true});
  }

  displayCoachFn(coach: any): string {
    return coach && coach.firstName && coach.lastName && !coach.notfound ? coach.firstName + ' ' + coach.lastName : '';
  }
  
  changeCoach(coachId: number){
    this.scheduleFilter.coachId = coachId;
  }

  updatCoachShowMore() {
      this.showMoreCoach= false;
      this.coachPageIndex++;
      this.searchCoachsCtrl.enable({emitEvent: true});
  }

  displayYearFn(year: any): string {
    return (year && year.title && !year.notfound) ? year.title : '';
  }
  
  changeYear(yearValue: number){
    this.scheduleFilter.year = yearValue;
    this.searchYearsCtrl.setValue({ value: this.searchYearsCtrl.value.value, title: this.translate.instant('MESSAGE.NameList.Year') + ' ' + this.searchYearsCtrl.value.title });
  }

  displayWeekFn(week: any): string {
    return (week && week.title && !week.notfound) ? (week.title) : '';
  }
  
  changeWeek(weekValue: number){
    this.scheduleFilter.week = weekValue;
    this.searchWeeksCtrl.setValue({ value: this.searchWeeksCtrl.value.value, title: this.translate.instant(this.searchWeeksCtrl.value.title) });
  }

  displayMonthFn(month: any): string {
    return (month && month.title && !month.notfound) ? (month.title) : '';
  }
  
  changeMonth(monthValue: number){
    this.scheduleFilter.month = monthValue;
    this.searchMonthsCtrl.setValue({ value: this.searchMonthsCtrl.value.value, title: this.translate.instant(this.searchMonthsCtrl.value.title) });
  }
}
