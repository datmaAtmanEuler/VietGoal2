import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import PerfectScrollbar from 'perfect-scrollbar';
import { CommonFilter } from '../../../../models/filter/commonfilter';
import { NotificationService } from '../../../../services/manage/notification.service';
import { ASCSort, SORD_DIRECTION } from 'app/models/sort';
import { UtilsService } from 'app/services/utils.service';


@Component({
  selector: 'app-notification-seen',
  templateUrl: './notification-seen.component.html',
  styleUrls: ['./notification-seen.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationSeenComponent implements OnInit {
  @Input('popup') popup: boolean;
  @Input('id') id: number;
  @Output() capNhatThanhCong: EventEmitter<any> = new EventEmitter();

  pageSizesList: number[] = [5, 10, 20, 100];
  filter: CommonFilter = new CommonFilter();
  Total: number;
  loading: boolean;
  ViewedList: any[];


  paginationSettings: any = {
    sort: new ASCSort(),
    sortToggles: [
      SORD_DIRECTION.ASC, SORD_DIRECTION.ASC
    ],
    columnsName: ['Order', 'Name'],
    columnsNameMapping: ['id', 'title'],
    sortAbles: [true, true],
    visibles: [true, true]
  }
  firstRowOnPage: any;
  constructor(public activeModal: NgbActiveModal,
    config: NgbModalConfig,
    private router: Router,
    private service: NotificationService,
    public utilsService: UtilsService) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
  }

  ngOnInit() {
    const vgscroll = <HTMLElement>document.querySelector('.vg-scroll');
    new PerfectScrollbar(vgscroll);
    this.filter.pageSize = this.pageSizesList[1];
    this.filter.pageIndex = 1;
    this.filter.searchTerm = '';

  }

  ReturnList() {
    this.router.navigate(['quanly/thongbao']);
  }
  closeMe() {
    this.activeModal.close();
  }
  pageEvent(pageE: any) {
    this.filter.pageIndex = pageE.pageIndex + 1;
    this.filter.pageSize = pageE.pageSize;
    this.reload()
  }
  reload(){
    this.filter.sortName = this.paginationSettings.sort.SortName;
    this.filter.sortDirection = this.paginationSettings.sort.SortDirection;
    console.log('filter');
    console.log(this.filter);
    this.loading = true;
    this.service.getViewedList(this.filter).subscribe((response: any) => {
      const list = response.results ? response.results : [];
      this.Total = (response && response.rowCount) ? response.rowCount : 0;
      this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
      setTimeout(() => {
        this.loading = false;
        this.ViewedList = list || [];
      }, 500);
    });
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

