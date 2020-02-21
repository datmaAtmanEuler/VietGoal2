import { Component, OnInit } from '@angular/core';
import { Filter } from '../../../models/filter/filter';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ClassStatus } from 'app/models/list/classstatus';
import { ClassStatusService } from 'app/services/list/classstatus.service';
import { ClassStatusEditComponent } from './classstatus-edit/classstatus-edit.component';

@Component({
  selector: 'app-classstatus',
  templateUrl: './classstatus.component.html',
  styleUrls: ['./classstatus.component.scss']
})
export class ClassStatusComponent implements OnInit {

  ClassStatusList: ClassStatus[] = [];
  ClassStatus: ClassStatus;
  searchTerm: string = '';
  pageIndex: number = 1;
  pageSizesList: number[] = [5, 10, 20, 100];
  pageSize: number = this.pageSizesList[1];
  currentUser: any;
  loading: boolean;
  Total: any;
  firstRowOnPage: any;
  constructor(public util: UtilsService, config: NgbModalConfig, private service: ClassStatusService, private router: Router, private modalService: NgbModal) {
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
      sortName: 'classStatusName',
      sortDirection: 0
    };
    this.loading = true;
    this.ClassStatusList = [];
    this.service.getClassStatusList(filter).subscribe((response: any) => {
      const list = response.results ? response.results : [];
      this.Total = (response && response.rowCount) ? response.rowCount : 0;
      this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
      setTimeout(() => {
        this.loading = false;
        this.ClassStatusList = list || [];
      }, 500);
    });
  }
  add() {
    this.edit(null);
  }

  remove(id: any) {
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    modalRef.componentInstance.confirmObject = 'ClassStatus';
    modalRef.componentInstance.decide.subscribe(() => {
      _this.service.deleteClassStatus(id).subscribe(() => {
        _this.reload();
      });
    });
  }
  edit(ClassStatusid: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(ClassStatusEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.ClassStatusId = ClassStatusid;
    modalRef.result.then(function (result) {
      _this.reload();
    });
  }
}
