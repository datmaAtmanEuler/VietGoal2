import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ASCSort, SORD_DIRECTION } from '../../../../models/sort';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../../../services/utils.service';
import PerfectScrollbar from 'perfect-scrollbar';
import { FormControl } from '@angular/forms';
import { environment } from 'environments/environment';
import { CommonFilter } from '../../../../models/filter/commonfilter';
import { finalize, switchMap, debounceTime, startWith, tap } from 'rxjs/operators';
import { MatDatepickerInputEvent } from '@angular/material/datepicker/typings/datepicker-input';
import { StudentAttendanceService } from '../../../../services/manage/studentattendance.service';
import { AreaService } from 'app/services/list/area.service';
import { YardService } from 'app/services/list/yard.service';
import { ClassService } from 'app/services/manage/class.service';
import { AreaFilter } from 'app/models/filter/areafilter';
import { YardFilter } from 'app/models/filter/yardfilter';
import { ClassFilter } from 'app/models/filter/classfilter';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.scss']
})
export class StudentListComponent implements OnInit {
 
  studentList: any[] = [];
  filter: CommonFilter = new CommonFilter();
  searchAdvanced: boolean = false;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSizesList: number[] = [5, 10, 20, 100];
  pageSize:number = this.pageSizesList[1];
  currentUser: any;
  loading: boolean = true;
  Total: any;
  firstRowOnPage: any;
  @Output('selectContact') selectContact: EventEmitter<any> = new EventEmitter();

  paginationSettings: any = {
    sort: new ASCSort(),
    sortToggles: [
      null,
      SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC,
      SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC
    ],
    // columnsName: ['Order', 'Mã học sinh', 'Họ đệm', 'Tên', 'Giới tính', 'Ngày sinh', 'Vắng', 'Lý do'],
    columnsName: ['Order', 'StudentCode', 'FirstName', 'LastName', 'Gender', 'DateOfBirth', 'AdmissionDay', 'EndDayTerm'],
    columnsNameMapping: ['id', 'studentCode', 'firstName', 'lastName', 'gender', 'dob', 'admissionDay', 'enddayTerm'],
    sortAbles: [false, true, true, true, true, true, true, false],
    visibles: [true, true, true, true, true, true, true, true]
  }
  constructor(public utilsService: UtilsService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private areaService: AreaService,
    private yardService: YardService,
    private classService: ClassService,
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
      this.loading = true;
      this.studentList = [];
      this.service.getList(this.filter).subscribe((response: any) => {
        const list = response.results ? response.results : [];
        this.Total = (response && response.rowCount) ? response.rowCount : 0;
        this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
        setTimeout(() => {
          this.loading = false;
          this.studentList = list || [];
        }, 500);
      });
      // }else if(!this.filter.absentDate){
      //   this.utilsService.showNotification('top','center','Vui lòng nhập <strong>ngày</strong>!',3);
    } else if (!this.filter.classId) {
      this.utilsService.showNotification('top', 'center', 'Vui lòng nhập <strong>lớp học</strong>!', 3);
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
        switchMap(value => this.areaService.getAreasList(new AreaFilter(value, 1,100,0,'id','ASC'))
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
        switchMap(value => this.yardService.getYardsList(new YardFilter(value , 1 , 100, 0,'id','ASC'))
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
        switchMap(value => this.classService.getClassList(new ClassFilter(value , 1 ,100,0,0,0,'id','ASC',0,0,0))
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
	closeMe() {
		this.activeModal.close();
	}
  sendData(data: any) {
    this.selectContact.emit(data);
    this.activeModal.close();
  }

}

