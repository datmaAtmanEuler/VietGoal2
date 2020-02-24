import { Component, OnInit } from '@angular/core';
import { ASCSort, SORD_DIRECTION } from 'app/models/sort';
import { UtilsService } from 'app/services/utils.service';
import PerfectScrollbar from 'perfect-scrollbar';
import { CoachAbsentService } from 'app/services/manage/coachabsent.service';
import { CoachAbsentEditComponent } from './coachabsent-edit/coachabsent-edit.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from 'app/shared/modal/confirm/confirm.component';

@Component({
  selector: 'app-coachabsent',
  templateUrl: './coachabsent.component.html',
  styleUrls: ['./coachabsent.component.scss']
})
export class CoachAbsentComponent implements OnInit {
  searchTerm: string = '';
  pageIndex: number = 1;
  pageSizesList: number[] = [5, 10, 20, 100];
  pageSize: number = this.pageSizesList[3];
  Total: number;

  paginationSettings: any = {
    sort: new ASCSort(),
    sortToggles: [
      null,
      SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT,
      SORD_DIRECTION.DEFAULT,
      null
    ],
    columnsName: ['Order', 'CoachRegistried', 'AbsentDate', 'ShiftType', 'Status', 'Reason', 'Action'],
    columnsNameMapping: ['id', 'coachFullName', 'coachAbsentDate', 'shiftTypeName', 'coachAbsentStatusName', 'coachAbsentReason', ''],
    columnsNameFilter: ['id', 'coachId', 'coachAbsentDate', 'shiftTypeName', 'coachAbsentStatus', 'coachAbsentReason', ''],
    sortAbles: [false, true, true, true, true, true, false],
    visibles: [true, true, true, true, true, true, true]
  }
  // chưa dịch
  
  currentUser: any;

  coachabsentsList: any[];
  loading: boolean;
  firstRowOnPage: any;
  constructor(public utilsService: UtilsService, private service: CoachAbsentService, private modalService: NgbModal) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

      utilsService.loadPaginatorLabels();
  }
  pageEvent(pageE: any) {
    this.pageIndex = pageE.pageIndex + 1;
    this.pageSize = pageE.pageSize;
    this.reload();
  }
  reload() {
    const filter = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      sortName: this.paginationSettings.sort.SortName,
      sortDirection: this.paginationSettings.sort.SortDirection
    };
    this.loading = true;
    this.coachabsentsList = [];
    this.service.getList(filter).subscribe((response: any) => {
      const list = response.results ? response.results : [];
      this.Total = (response && response.rowCount) ? response.rowCount : 0;
      this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
      setTimeout(() => {
        this.loading = false;
        this.coachabsentsList = list || [];
      }, 500);
    });
  }
  add() {
    this.edit(null);
  }
  
  edit(coachabsentId: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(CoachAbsentEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.coachabsentId = coachabsentId;
    modalRef.result.then(function (result) {
      _this.reload();
    });
  }
  ngOnInit() {
      this.reload();
      const vgscroll = <HTMLElement>document.querySelector('.vg-scroll');
      new PerfectScrollbar(vgscroll);
  }
  remove(id: any) {
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { windowClass: 'modal-confirm' });
    modalRef.componentInstance.confirmObject = 'CoachAbsent';
    modalRef.componentInstance.decide.subscribe(() => {
      _this.service.delete(id).subscribe(()=>{
        _this.reload();
      });
    });
  }


}
