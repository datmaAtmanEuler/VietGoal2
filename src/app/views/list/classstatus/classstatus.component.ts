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
  pageSize: number = 20;
  currentUser: any;
  loading: boolean;
  Total: any;
  constructor(public util: UtilsService, config: NgbModalConfig, private service: ClassStatusService, private router: Router, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.reload();
  }

  reload() {
    const filter: Filter = new Filter(this.searchTerm, this.pageIndex, this.pageSize);
    this.loading = true;
    this.ClassStatusList = [];
    this.service.getClassStatusList(filter).subscribe((list: any) => {
      this.Total = (list && list[0]) ? list[0].Total : 0;
      setTimeout(() => {
        this.loading = false;
        this.ClassStatusList = list || [];
      }, 500);
    });
  }
  add() {
    this.edit(null);
  }

  remove(ClassStatus: ClassStatus) {
    this.ClassStatus = ClassStatus;
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    modalRef.componentInstance.confirmObject = 'ClassStatus';
    modalRef.componentInstance.decide.subscribe(() => {
      _this.service.deleteClassStatus(ClassStatus.Id, this.currentUser.UserId).subscribe(() => {
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
