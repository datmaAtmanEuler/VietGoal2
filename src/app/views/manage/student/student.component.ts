import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { ASCSort, SORD_DIRECTION } from '../../../models/sort';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { Student } from 'app/models/manage/student';
import { StudentService } from 'app/services/manage/student.service';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  StudentList: Student[] = [];
  Student: Student;
  searchTerm: string = '';
  searchAdvanced: boolean = false;
  pageIndex: number = 1;
  pageSizesList: number[] = [5, 10, 20, 100];
  pageSize: number = this.pageSizesList[1];
  currentUser: any;
  Total:number;
  firstRowOnPage:number;
  loading: boolean;
  paginationSettings: any = {
    sort: new ASCSort(),
    sortToggles: [
      null,
      SORD_DIRECTION.ASC, SORD_DIRECTION.ASC,
      null
    ],
    columnsName: ['Order', 'Mã học viên', 'Họ đệm', 'Tên', 'Giới tính', 'Ngày sinh', 'Số thứ tự', 'Ngày nhập học', 'Ngày kết thúc học phần', 'Action'],
    columnsNameMapping: ['', 'studentCode', 'firstName', 'lastName', 'gender', 'dob', 'displayOrder', 'admissionDate', 'admissionDate', ''],
    sortAbles: [false, true, true, true, true, true, true, true, true, false, false],
    visibles: [true, true, true, true, true, true, true, true, true, true, true]
  }
  constructor(public utilsService: UtilsService, config: NgbModalConfig, private service: StudentService, private router: Router, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    utilsService.loadPaginatorLabels();
  }

  ngOnInit() {
    
    const vgscroll = <HTMLElement>document.querySelector('.vg-scroll');
    new PerfectScrollbar(vgscroll);
    this.reload();
  }

  remove(id: any) {
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { windowClass: 'modal-confirm' });
    modalRef.componentInstance.confirmObject = 'Student';
    modalRef.componentInstance.decide.subscribe(() => {
      _this.service.delete(id).subscribe(()=>{
        _this.reload();
      });
    });
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
    this.StudentList = [];
    this.service.getList(filter).subscribe((response: any) => {
      const list = response.results ? response.results : [];
      this.Total = (response && response.rowCount) ? response.rowCount : 0;
      this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
      setTimeout(() => {
        this.loading = false;
        this.StudentList = list || [];
      }, 500);
    });
  }
  add() {
    this.edit(null);
  }

  edit(StudentId: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(StudentEditComponent, { size: 'xl'  });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.StudentId = StudentId;
    modalRef.result.then(function (result) {
      _this.reload();
    });
  }
  
  openImport() {
    // const _this = this;
    // const modalRef = this.modalService.open(StudentImportComponent, { size: 'lg' });
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
}
