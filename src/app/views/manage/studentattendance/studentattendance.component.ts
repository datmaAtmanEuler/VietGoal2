import { Component, OnInit } from '@angular/core';
import { ASCSort, SORD_DIRECTION } from '../../../models/sort';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../../services/utils.service';
import PerfectScrollbar from 'perfect-scrollbar';
import { FormControl } from '@angular/forms';
import { environment } from 'environments/environment';
import { CommonFilter } from '../../../models/filter/commonfilter';
import { finalize, switchMap, debounceTime, startWith, tap } from 'rxjs/operators';
import { MatDatepickerInputEvent } from '@angular/material/datepicker/typings/datepicker-input';
import { StudentAttendanceService } from '../../../services/manage/studentattendance.service';
import { StudentAttendance } from 'app/models/manage/studentattendance';

@Component({
  selector: 'app-studentattendance',
  templateUrl: './studentattendance.component.html',
  styleUrls: ['./studentattendance.component.scss']
})
export class StudentAttendanceComponent implements OnInit {
  StudentAttendanceList: any[] = [];
  filter: CommonFilter = new CommonFilter();
  searchAdvanced: boolean = false;
  pageSizesList: number[] = [5, 10, 20, 100];
  currentUser: any;
  Total: number;
  firstRowOnPage: number;
  loading: boolean;


  paginationSettings: any = {
    sort: new ASCSort(),
    sortToggles: [
      null,
      SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC,
      SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC
    ],
    columnsName: ['Order', 'Mã học sinh', 'Họ đệm', 'Tên', 'Giới tính', 'Ngày sinh', 'Vắng', 'Lý do'],
    // columnsName: ['Order', 'StudentCode', 'FirstName', 'LastName', 'Gender', 'DateOfBirth', 'Absent', 'Reason'],
    columnsNameMapping: [null, 'studentCode', 'firstName', 'lastName', 'gender', 'dob', 'isAbsent', 'reason'],
    sortAbles: [false, true, true, true, true, true, true, false],
    visibles: [true, true, true, true, true, true, true, true]
  }
  constructor(public utilsService: UtilsService,
    private router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private service: StudentAttendanceService,
    private route: ActivatedRoute,
    private http: HttpClient) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    utilsService.loadPaginatorLabels();

  }

  ngOnInit() {

    const vgscroll = <HTMLElement>document.querySelector('.vg-scroll');
    new PerfectScrollbar(vgscroll);

    this.filter.pageIndex = 1;
    this.filter.pageSize = this.pageSizesList[1];
    // this.reload();
    this.filtersEventsBinding();
  }

  remove(id: any) {
    // const _this = this;
    // const modalRef = this.modalService.open(ConfirmComponent, { windowClass: 'modal-confirm' });
    // modalRef.componentInstance.confirmObject = 'StudentAttendance';
    // modalRef.componentInstance.decide.subscribe(() => {
    //   _this.service.delete(id).subscribe(() => {
    //     _this.reload();
    //   });
    // });
  }
  pageEvent(pageE: any) {
    this.filter.pageIndex = pageE.pageIndex + 1;
    this.filter.pageSize = pageE.pageSize;
    this.reload();
  }
  reload() {

    // if(this.filter.absentDate && this.filter.classId){
    if (this.filter.classId) {
      this.filter.sortName = this.paginationSettings.sort.SortName;
      this.filter.sortDirection = this.paginationSettings.sort.SortDirection;
      console.log('filter');
      console.log(this.filter);
      this.loading = true;
      this.StudentAttendanceList = [];
      this.service.getList(this.filter).subscribe((response: any) => {
        const list = response.results ? response.results : [];
        this.Total = (response && response.rowCount) ? response.rowCount : 0;
        this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
        setTimeout(() => {
          this.loading = false;
          this.StudentAttendanceList = list || [];
        }, 500);
      });
      // }else if(!this.filter.absentDate){
      //   this.utilsService.showNotification('top','center','Vui lòng nhập <strong>ngày</strong>!',3);
    } else if (!this.filter.classId) {
      this.utilsService.showNotification('top', 'center', 'Vui lòng nhập <strong>lớp học</strong>!', 3);
    }
  }
  save() {
    if(this.filter.absentDate){
      console.log(this.StudentAttendanceList);
      var listtoput = this.StudentAttendanceList.map(object => {
        return {
          id: object.id,
          studentId: object.studentId,
          classId: object.classId,
          date: this.filter.absentDate,
          isAbsent: object.isAbsent,
          reason: object.reason,
          attendanceType: object.attendanceType
        }
      });
      console.log(listtoput);
      this.service.put(listtoput,this.filter.classId,this.filter.absentDate).subscribe((response) => {
        if(response.message) {
          this.utilsService.showNotification('top', 'center', response.message, 4);
        }else{
          this.utilsService.showNotification('top', 'center', JSON.stringify(response), 1);
        }
      });
    } else{
      this.utilsService.showNotification('top', 'center', 'Chưa chọn ngày điểm danh', 3);
    }
  }

  sortToggles(colIndex: number) {
    const _this = this;
    if (this.paginationSettings.sortAbles[colIndex])
      this.utilsService.toggleSort(colIndex, this.paginationSettings.sortToggles, this.paginationSettings.sort, this.paginationSettings.columnsNameMapping)
        .then(() => {
          _this.reload();
        });
    else
      this.utilsService.doNothing();
  }
  //Date Events

  addedDateEvent(event: MatDatepickerInputEvent<Date>) {
    this.filter.absentDate = this.utilsService.stringDate(event.value);
  }
  //load Autocomplete

  listareaes: any;
  listyardes: any;
  listclasses: any;

  searchAreasCtrl = new FormControl();
  searchYardsCtrl = new FormControl();
  searchClassesCtrl = new FormControl();

  isLoading = false;

  displayAreaFn(object): string {
    return object && object.areaName && !object.notfound ? object.areaName : '';
  }
  displayYardFn(object): string {
    return object && object.yardName && !object.notfound ? object.yardName : '';
  }
  displayClassFn(object): string {
    return object && object.className && !object.notfound ? object.className : '';
  }
  changeArea(areaId) {
    // this.filter.areaId = areaId;
  }
  changeYard(yardId) {
    // this.filter.yardId = yardId;
  }
  changeClass(classId) {
    this.filter.classId = classId;
    this.reload();
  }
  filtersEventsBinding() {

    this.searchAreasCtrl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        tap(() => {
          this.listareaes = [];
          this.isLoading = true;
        }),
        switchMap(value => this.http.get(environment.serverUrl + 'Areas?pageIndex=1&pageSize=20&sortName=areaName&sortDirection=ASC')
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
          this.listareaes = [{ notfound: 'Not Found' }];
        } else {
          this.listareaes = data.length ? data : [{ notfound: 'Not Found' }];
        }

      });
    this.searchYardsCtrl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        tap(() => {
          this.listyardes = [];
          this.isLoading = true;
        }),
        switchMap(value => this.http.get(environment.serverUrl + 'Yards?pageIndex=1&pageSize=20&sortName=yardName&sortDirection=ASC')
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
          this.listyardes = [{ notfound: 'Not Found' }];
        } else {
          this.listyardes = data.length ? data : [{ notfound: 'Not Found' }];
        }

      });
    this.searchClassesCtrl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        tap(() => {
          this.listclasses = [];
          this.isLoading = true;
        }),
        switchMap(value => this.http.get(environment.serverUrl + 'Class?pageIndex=1&pageSize=20&sortName=className&sortDirection=ASC')
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
          this.listclasses = [{ notfound: 'Not Found' }];
        } else {
          this.listclasses = data.length ? data : [{ notfound: 'Not Found' }];
        }

      });
  }

}

