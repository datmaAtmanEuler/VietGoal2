import { Component, OnInit } from '@angular/core';
import { ASCSort, SORD_DIRECTION } from 'app/models/sort';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from 'app/services/utils.service';
import PerfectScrollbar from 'perfect-scrollbar';
import { FormControl } from '@angular/forms';
import { environment } from 'environments/environment';
import { CommonFilter } from 'app/models/filter/commonfilter';
import { finalize, switchMap, debounceTime, startWith, tap } from 'rxjs/operators';
import { MatDatepickerInputEvent } from '@angular/material/datepicker/typings/datepicker-input';

@Component({
  selector: 'app-studentatendanceoverrange-add',
  templateUrl: './studentatendanceoverrange-add.component.html',
  styleUrls: ['./studentatendanceoverrange-add.component.scss']
})
export class StudentAtendanceOverRangeAddComponent implements OnInit {
  StudentAtendanceOverRangeAddList: any[] = [];
  filter: CommonFilter = new CommonFilter();
  searchAdvanced: boolean = false;
  pageSizesList: number[] = [5, 10, 20, 100];
  currentUser: any;
  Total: number;
  firstRowOnPage: number;
  loading: boolean;

  intoClassId: number;

  paginationSettings: any = {
    sort: new ASCSort(),
    sortToggles: [
      null,
      SORD_DIRECTION.ASC, SORD_DIRECTION.ASC,SORD_DIRECTION.ASC,SORD_DIRECTION.ASC,
      SORD_DIRECTION.ASC, SORD_DIRECTION.ASC,SORD_DIRECTION.ASC,SORD_DIRECTION.ASC,
      null
    ],
    columnsName: ['Order', 'Mã học sinh', 'Họ đệm', 'Tên', 'Giới tính', 'Ngày sinh', 'Số thứ tự', 'Ngày nhập học', 'Ngày kết thúc học phần', 'Action'],
    // columnsName: ['Order', 'StudentCode', 'FirstName', 'LastName', 'Gender', 'DateOfBirth', 'DisplayOrder', 'AdmissionDate', 'EndTermDate', 'Action'],
    columnsNameMapping: [null, 'field1', 'field2', 'field3', 'field4', 'field5', 'field6', 'field7', 'field8', null],
    sortAbles: [false, true, true, true, true, true, true, true, true, false],
    visibles: [true, true, true, true, true, true, true, true, true, true]
  }
  constructor(public utilsService: UtilsService,
    private router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal,
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
    this.reload();
    this.filtersEventsBinding();
  }

  pageEvent(pageE: any) {
    this.filter.pageIndex = pageE.pageIndex + 1;
    this.filter.pageSize = pageE.pageSize;
    this.reload();
  }
  reload() {
    this.StudentAtendanceOverRangeAddList = [
      {
        id: 1,
        field1: 1,
        field2: 1,
        field3: 1,
        field4: 1,
        field5: 1,
        field6: 1,
        field7: 1,
        field8: 1
      },
      {
        id: 2,
        field1: 2,
        field2: 2,
        field3: 2,
        field4: 2,
        field5: 2,
        field6: 2,
        field7: 2,
        field8: 2
      },
      {
        id: 3,
        field1: 3,
        field2: 3,
        field3: 3,
        field4: 3,
        field5: 3,
        field6: 3,
        field7: 3,
        field8: 3
      },
      {
        id: 4,
        field1: 4,
        field2: 4,
        field3: 4,
        field4: 4,
        field5: 4,
        field6: 4,
        field7: 4,
        field8: 4
      },
      {
        id: 5,
        field1: 5,
        field2: 5,
        field3: 5,
        field4: 5,
        field5: 5,
        field6: 5,
        field7: 5,
        field8: 5
      }
    ];
    this.Total = 10;
    this.firstRowOnPage = 1;

    this.filter.sortName = this.paginationSettings.sort.SortName;
    this.filter.sortDirection = this.paginationSettings.sort.SortDirection;
    console.log('filter');
    console.log(this.filter);
    // this.loading = true;
    // this.StudentAtendanceOverRangeAddList = [];
    // this.service.getList(this.filter).subscribe((response: any) => {
    //   const list = response.results ? response.results : [];
    //   this.Total = (response && response.rowCount) ? response.rowCount : 0;
    //   this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
    //   setTimeout(() => {
    //     this.loading = false;
    //     this.StudentAtendanceOverRangeAddList = list || [];
    //   }, 500);
    // });
  }
  select(id){
    alert(`chọn học viên id:${id} qua lớp id:${this.intoClassId}`)
    this.router.navigate(['quanly/diemdanhhocvienngoai']);
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
  changeArea(areaId){
    // this.filter.areaId = areaId;
  }
  changeYard(yardId){
    // this.filter.yardId = yardId;
  }
  changeClass(classId){
    this.intoClassId = classId;
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

