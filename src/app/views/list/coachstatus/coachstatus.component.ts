import { Component, OnInit } from '@angular/core';
import { Filter } from '../../../models/filter/filter';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CoachStatus } from 'app/models/list/coachstatus';
import { CoachStatusService } from 'app/services/list/coachstatus.service';
import { CoachStatusEditComponent } from './coachstatus-edit/coachstatus-edit.component';
@Component({
  selector: 'app-coachstatus',
  templateUrl: './coachstatus.component.html',
  styleUrls: ['./coachstatus.component.scss']
})
export class CoachStatusComponent implements OnInit {

  CoachStatusList: CoachStatus[] = [];
  CoachStatus: CoachStatus;
  searchTerm: string = '';
  pageIndex: number = 1;
  pageSizesList: number[] = [5, 10, 20, 100];
  pageSize: number = this.pageSizesList[1];
  currentUser: any;
  loading: boolean;
  Total: any;
  firstRowOnPage: any;
  constructor(public util: UtilsService, config: NgbModalConfig, private service: CoachStatusService, private router: Router, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.reload();
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
      sortName: 'ageName',
      sortDirection: 0
    };
    this.loading = true;
    this.CoachStatusList = [];
    this.service.getCoachStatusList(filter).subscribe((response: any) => {
      const list = response.results ? response.results : [];
      this.Total = (response && response.rowCount) ? response.rowCount : 0;
      this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
      setTimeout(() => {
        this.loading = false;
        this.CoachStatusList = list || [];
      }, 500);
    });
  }
  add() {
    this.edit(null);
  }

  remove(id: any) {
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    modalRef.componentInstance.confirmObject = 'Coach State';
    modalRef.componentInstance.decide.subscribe(() => {
      _this.service.deleteCoachStatus(id).subscribe(() => {
        _this.reload();
      });
    });
  }
  edit(CoachStatusid: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(CoachStatusEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.CoachStatusId = CoachStatusid;
    modalRef.result.then(function (result) {
      _this.reload();
    });
  }
}
