import { Component, OnInit } from '@angular/core';
import { Filter } from '../../../models/filter/filter';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { StudentStatus } from 'app/models/list/studentstatus';
import { StudentStatusService } from 'app/services/list/studentstatus.service';
import { StudentStatusEditComponent } from './studentstatus-edit/studentstatus-edit.component';


@Component({
  selector: 'app-studentstatus',
  templateUrl: './studentstatus.component.html',
  styleUrls: ['./studentstatus.component.scss']
})
export class StudentStatusComponent implements OnInit {

  StudentStatusList: StudentStatus[] = [];
  StudentStatus: StudentStatus;
  searchTerm: string = '';
  pageIndex: number = 1;
  pageSize: number = 20;
  currentUser: any;
  loading: boolean;
  Total: any;
  constructor(public util: UtilsService, config: NgbModalConfig, private service: StudentStatusService, private router: Router, private modalService: NgbModal) {
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
    this.StudentStatusList = [];
    this.service.getStudentStatusList(filter).subscribe((list: any) => {
      this.Total = (list && list[0]) ? list[0].Total : 0;
      setTimeout(() => {
        this.loading = false;
        this.StudentStatusList = list || [];
      }, 500);
    });
  }
  add() {
    this.edit(null);
  }

  remove(StudentStatus: StudentStatus) {
    this.StudentStatus = StudentStatus;
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    modalRef.componentInstance.confirmObject = 'Students State';
    modalRef.componentInstance.decide.subscribe(() => {
      _this.service.deleteStudentStatus(StudentStatus.Id, this.currentUser.UserId).subscribe(() => {
        _this.reload();
      });
    });
  }
  edit(StudentStatusid: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(StudentStatusEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.StudentStatusId = StudentStatusid;
    modalRef.result.then(function (result) {
      _this.reload();
    });
  }
}
