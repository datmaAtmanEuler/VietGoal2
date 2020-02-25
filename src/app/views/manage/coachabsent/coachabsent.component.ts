import { Component, OnInit } from '@angular/core';
import { ASCSort, SORD_DIRECTION } from 'app/models/sort';
import { UtilsService } from 'app/services/utils.service';
import PerfectScrollbar from 'perfect-scrollbar';
import { CoachAbsentService } from 'app/services/manage/coachabsent.service';
import { CoachAbsentEditComponent } from './coachabsent-edit/coachabsent-edit.component';
import { CoachAbsentImportComponent } from './coachabsent-import/coachabsent-import.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from 'app/shared/modal/confirm/confirm.component';
import { CoachAbsentMapping } from 'app/models/manage/coachabsent';
import { FormControl } from '@angular/forms';

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
  duyet(coach){
    let obj: CoachAbsentMapping = new CoachAbsentMapping(0);
    if(coach){
      obj.id = coach.id;
      obj.coachId = coach.coachId;
      obj.coachAbsentDate = coach.coachAbsentDate;
      obj.shiftType = coach.shiftType;
      obj.coachAbsentReason = coach.coachAbsentReason;
      obj.coachAbsentStatus = 1;
      if(confirm('Duyệt Huấn luyện viên này')){
        console.log(JSON.stringify(obj));
        this.service.addOrUpdate(obj).subscribe(()=>{
          this.reload();
        });
      }
    }
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
  
  openImport() {
    const _this = this;
    const modalRef = this.modalService.open(CoachAbsentImportComponent, { size: 'lg' });
    modalRef.result.then(function(importModel: any){
        console.log(importModel);
    });
  }

  downloadTemplate() {
    var fileName = 'Yards_Import.xlsx';
    var a = document.createElement('a');
    a.href = this.service.getTemplate(fileName);
    a.download = fileName;
    document.body.append(a);
    a.click();
    a.remove();
  }

}
