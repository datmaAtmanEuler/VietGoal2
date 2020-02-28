import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'app/services/utils.service';
import PerfectScrollbar from 'perfect-scrollbar';
import { CoachService } from 'app/services/manage/coach.service';
import { AreaService } from 'app/services/list/area.service';
import { YardService } from 'app/services/list/yard.service';
import { FormControl } from '@angular/forms';
import { startWith, map, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-coachschedules',
  templateUrl: './coachschedules.component.html',
  styleUrls: ['./coachschedules.component.scss']
})
export class CoachSchedulesComponent implements OnInit {
  Total: number;
  totalAreaPages: number = 0;
  totalYardPages: number = 0;
  currentUser: any;
  coachSchedulesList: any[] = [];
  dayInWeeksList: any[] = [];

  searchAreasCtrl = new FormControl();
  searchYardsCtrl = new FormControl();
  searchYearsCtrl = new FormControl();
  searchMonthsCtrl = new FormControl();
  searchWeeksCtrl = new FormControl();

  areasList: any[] = [];
  yardsList: any[] = [];
  yearsList: any[] = [];
  monthsList: any[] = [];
  weeksList: any[] = [];
  
  showMoreArea: boolean = false;
  showMoreYard: boolean = false;
  areaPageIndex: number = 1;
  yardPageIndex: number = 1;  

  isLoading: boolean;

  filter: any = {
  	areaId: 0,
  	yardId: 0,
  	year: 0,
  	month: 0,
  	week: 0
  };

  color: string = '#ffffff';

  constructor(  public translate: TranslateService,
		public utilsService: UtilsService, 
		private service: CoachService,
		private areaService: AreaService,
		private yardService: YardService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.filter.year = new Date().getFullYear();
      this.filter.month = new Date().getMonth() + 1;
      this.filter.week = utilsService.weekNumber(new Date());
      const _this = this;

      utilsService.dayInWeekList('', 1).subscribe((ls: any[]) => {
          _this.dayInWeeksList = ls;
          _this.utilsService.yearsList(_this.filter.year, 2).subscribe((r1: any) => {
            _this.searchYearsCtrl.setValue({ value: r1[0].value, title: _this.translate.instant('MESSAGE.NameList.Year') + ' ' + r1[0].title });  
            _this.utilsService.monthList(_this.filter.month, 2).subscribe((r2: any) => {
              _this.searchMonthsCtrl.setValue({ value: r2[0].value, title: _this.translate.instant(r2[0].title) });
              _this.utilsService.weekNumberList(_this.filter.week, 2).subscribe((r3: any) => {
                _this.searchWeeksCtrl.setValue({ value: r3[0].value, title: _this.translate.instant(r3[0].title) });
                _this.reload();
              });
            });
          });
      });
  }

  reload = function() {
    const _this= this;
    this.isLoading = true;
    this.coachSchedulesList = [];
    this.service.getCoachSchedulesList(this.filter).subscribe((response: any) => {
      const list = response.results ? response.results : [{'notfound': 'Not found'}];
      _this.Total = (response && response.rowCount) ? response.rowCount : 0;
      setTimeout(() => {
    	  _this.isLoading = false;
        _this.coachSchedulesList = list || [{'notfound': 'Not found'}];
      });
    });
  }
  
  ngOnInit() {
      const vgscroll = <HTMLElement>document.querySelector('.vg-scroll');
      new PerfectScrollbar(vgscroll);
      this.searchAreasCtrl.valueChanges.pipe(
            startWith(''),
            debounceTime(500),
            tap(() => {
              this.areasList = this.areasList.concat([]);
              this.isLoading = true;
            }),
            switchMap(value => this.areaService.getAreasList({centralId: null, searchTerm: (value && Object.keys(value).length > 0) ? value.areaName : value, pageIndex: this.areaPageIndex, pageSize: 10})
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
            this.reload();
        });
        this.searchYardsCtrl.valueChanges.pipe(
            startWith(''),
            debounceTime(500),
            tap(() => {
              this.yardsList = this.yardsList.concat([]);
              this.isLoading = true;
            }),
            switchMap(value => this.yardService.getYardsList({areaId: this.filter.areaId, searchTerm: (value && Object.keys(value).length > 1) ? value.yardName : value, pageIndex: this.yardPageIndex, pageSize: 10})
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
            this.reload();
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
            this.reload();
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
   
  displayAreaFn(area: any): string {
    return area && area.areaName && !area.notfound ? area.areaName : '';
  }
  
  changeArea(areaId: number){
    this.filter.areaId = areaId;
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
    this.filter.yardId = yardId;
  }

  updateYardShowMore() {
      this.showMoreYard = false;
      this.yardPageIndex++;
      this.searchYardsCtrl.enable({emitEvent: true});
  }

  displayYearFn(year: any): string {
    return (year && year.title && !year.notfound) ? year.title : '';
  }
  
  changeYear(yearValue: number){
    this.filter.year = yearValue;
    this.searchYearsCtrl.setValue({ value: this.searchYearsCtrl.value.value, title: this.translate.instant('MESSAGE.NameList.Year') + ' ' + this.searchYearsCtrl.value.title }); 
  }

  displayMonthFn(month: any): string {
    return (month && month.title && !month.notfound) ? (month.title) : '';
  }
  
  changeMonth(monthValue: number){
    this.filter.month = monthValue;
    this.searchMonthsCtrl.setValue({ value: this.searchMonthsCtrl.value.value, title: this.translate.instant(this.searchMonthsCtrl.value.title) });
  }

  displayWeekFn(week: any): string {
    return (week && week.title && !week.notfound) ? (week.title) : '';
  }
  
  changeWeek(weekValue: number){
    this.filter.week = weekValue;
    this.searchWeeksCtrl.setValue({ value: this.searchWeeksCtrl.value.value, title: this.translate.instant(this.searchWeeksCtrl.value.title) });
  }
}
