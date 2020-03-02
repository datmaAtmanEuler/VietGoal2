import { Component, OnInit } from '@angular/core';
import { ASCSort, SORD_DIRECTION } from '../../../models/sort';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../../services/utils.service';
import PerfectScrollbar from 'perfect-scrollbar';
import { CommonFilter } from '../../../models/filter/commonfilter';
import { NotificationSeenComponent } from './notification-seen/notification-seen.component';
import { NotificationEditComponent } from './notification-edit/notification-edit.component';
import { NotificationService } from 'app/services/manage/notification.service';
import { ConfirmComponent } from 'app/shared/modal/confirm/confirm.component';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  NotificationList: any[] = [];
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
    columnsName: ['Order', 'Tiêu đề', 'Ngày hết hạn', 'Đã xem', 'Chưa xem', 'Action'],
    // columnsName: ['Order', 'StudentCode', 'FirstName', 'LastName', 'Gender', 'DateOfBirth', 'Absent', 'Reason'],
    columnsNameMapping: [null, 'title', 'expirationDate', 'viewedCount', 'unViewedCount',null],
    sortAbles: [false, true, true, false, false, false],
    visibles: [false, true, false, false, false, false]
  }
  constructor(public utilsService: UtilsService,
    private router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private service: NotificationService,
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
    this.filter.searchTerm = '';
    // this.reload();
  }

  pageEvent(pageE: any) { 
    this.filter.pageIndex = pageE.pageIndex + 1;
    this.filter.pageSize = pageE.pageSize;
    this.reload();
  }
  search(){
    if((<HTMLInputElement>event.target).value.length){
      this.reload();
      this.filter.searchTerm = '';
    }
  }
  reload() {

    // if(this.filter.absentDate && this.filter.classId){
      this.filter.sortName = this.paginationSettings.sort.SortName;
      this.filter.sortDirection = this.paginationSettings.sort.SortDirection;
      console.log('filter');
      console.log(this.filter);
      this.loading = true;
      this.service.getList(this.filter).subscribe((response: any) => {
        const list = response.results ? response.results : [];
        this.Total = (response && response.rowCount) ? response.rowCount : 0;
        this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
        setTimeout(() => {
          this.loading = false;
          this.NotificationList = list || [];
        }, 500);
      });
      // }else if(!this.filter.absentDate){
      //   this.utilsService.showNotification('top','center','Vui lòng nhập <strong>ngày</strong>!',3);
  }
  add(){
    this.edit(null);
  }
  edit(notifyID: null | number){
    const _this = this;
    const modalRef = this.modalService.open(NotificationEditComponent, { size: 'xl' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.id = notifyID;
    modalRef.result.then(function (result) {
      _this.reload();
    });
  } 
  remove(id: any) {
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { windowClass: 'modal-confirm' });
    modalRef.componentInstance.confirmObject = 'Notification';
    modalRef.componentInstance.decide.subscribe(() => {
      _this.service.delete(id).subscribe(() => {
        _this.reload();
      });
    });
  }
  seenlist(notifyID: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(NotificationSeenComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.id = notifyID;
    modalRef.result.then(function (result) {
      _this.reload();
    });
  }
  openImport() {
    // const _this = this;
    // const modalRef = this.modalService.open(FeeImportComponent, { size: 'lg' });
    // modalRef.result.then(function(importModel: any){
    // });
  }
  downloadTemplate() {
    // var fileName = 'Fees_Import.xlsx';
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
  
}

