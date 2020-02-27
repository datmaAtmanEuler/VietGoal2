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
  selector: 'app-studentatendanceoverrange',
  templateUrl: './studentatendanceoverrange.component.html',
  styleUrls: ['./studentatendanceoverrange.component.scss']
})
export class StudentAtendanceOverRangeComponent implements OnInit {
  StudentAtendanceOverRangeList: any[] = [];
  filter: CommonFilter = new CommonFilter();
  searchTerm: string = '';
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
      SORD_DIRECTION.ASC, SORD_DIRECTION.ASC,SORD_DIRECTION.ASC,SORD_DIRECTION.ASC,
      null
    ],
    columnsName: ['Order', 'Họ tên', 'Ngày sinh', 'Từ lớp', 'Sang lớp', 'Action'],
    // columnsName: ['Order', 'FullName', 'DateOfBirth', 'FromClass', 'ToClass', 'Action'],
    columnsNameMapping: [null, 'field1', 'field2', 'field3', 'field4', null],
    sortAbles: [false, true, true, true, true, false],
    visibles: [true, true, true, true, true, true]
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

  remove(id: any) {
    // const _this = this;
    // const modalRef = this.modalService.open(ConfirmComponent, { windowClass: 'modal-confirm' });
    // modalRef.componentInstance.confirmObject = 'StudentAtendanceOverRange';
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
    this.StudentAtendanceOverRangeList = [
      {
        id: 1,
        field1: 1,
        field2: 1,
        field3: 1,
        field4: 1
      },
      {
        id: 2,
        field1: 2,
        field2: 2,
        field3: 2,
        field4: 2
      },
      {
        id: 3,
        field1: 3,
        field2: 3,
        field3: 3,
        field4: 3
      },
      {
        id: 4,
        field1: 4,
        field2: 4,
        field3: 4,
        field4: 4
      },
      {
        id: 5,
        field1: 5,
        field2: 5,
        field3: 5,
        field4: 5
      }
    ];
    this.Total = 10;
    this.firstRowOnPage = 1;

    this.filter.searchTerm = this.searchTerm;
    this.filter.sortName = this.paginationSettings.sort.SortName;
    this.filter.sortDirection = this.paginationSettings.sort.SortDirection;
    console.log('filter');
    console.log(this.filter);
    // this.loading = true;
    // this.StudentAtendanceOverRangeList = [];
    // this.service.getList(this.filter).subscribe((response: any) => {
    //   const list = response.results ? response.results : [];
    //   this.Total = (response && response.rowCount) ? response.rowCount : 0;
    //   this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
    //   setTimeout(() => {
    //     this.loading = false;
    //     this.StudentAtendanceOverRangeList = list || [];
    //   }, 500);
    // });
  }
  add() {
    this.router.navigate(['quanly/diemdanhhocvienngoai/add']);
  }

  edit(StudentAtendanceOverRangeId: null | number) {
    // const _this = this;
    // const modalRef = this.modalService.open(StudentAtendanceOverRangeEditComponent, { size: 'xl' });
    // modalRef.componentInstance.popup = true;
    // modalRef.componentInstance.StudentAtendanceOverRangeId = StudentAtendanceOverRangeId;
    // modalRef.componentInstance.classID = this.classID;
    // modalRef.result.then(function (result) {
    //   _this.reload();
    // });
  }

  openImport() {
    // const _this = this;
    // const modalRef = this.modalService.open(StudentAtendanceOverRangeImportComponent, { size: 'lg' });
    // modalRef.result.then(function(importModel: any){
    //     console.log(importModel);
    // });
  }

  downloadTemplate() {
    // var fileName = 'Yards_Import.xlsx';
    // var a = document.createElement('a');
    // a.href = this.service.getTemplate(fileName);
    // a.download = fileName;
    // document.body.append(a);
    // a.click();
    // a.remove();
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
		this.filter.addedDate = this.utilsService.stringDate(event.value);
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
    this.filter.areaId = areaId;
  }
  changeYard(yardId){
    this.filter.yardId = yardId;
  }
  changeClass(classId){
    this.filter.classId = classId;
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

