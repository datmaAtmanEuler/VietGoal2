import { Component, OnInit } from '@angular/core';
import { Filter } from '../../../models/filter/filter';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Age } from 'app/models/list/age';
import { AgeService } from 'app/services/list/age.service';
import { AgeEditComponent } from './age-edit/age-edit.component';
import { AgeImportComponent } from './age-import/age-import.component';
import { SORD_DIRECTION, ASCSort } from 'app/models/sort';

@Component({
  selector: 'app-ages',
  templateUrl: './ages.component.html',
  styleUrls: ['./ages.component.scss']
})
export class AgesComponent implements OnInit {

  AgeList: Age[] = [];
  Age: Age;
  searchTerm: string = '';
  pageIndex: number = 1;
  pageSizesList: number[] = [5, 10, 20, 100];
  pageSize: number = this.pageSizesList[1];
  currentUser: any;
  loading: boolean;
  Total: any;
  firstRowOnPage: any;

  paginationSettings: any = {
    sort: new ASCSort(),
    sortToggles: [
      null,
      SORD_DIRECTION.ASC, SORD_DIRECTION.ASC,
      null
    ],
    columnsName: ['Order', 'AgeCode', 'AgeName', 'Action'],
    columnsNameMapping: ['', 'ageCode', 'ageName', ''],
    sortAbles: [false, true, true, false],
    visibles: [true, true, true, true]
  }
  constructor(public utilsService: UtilsService, config: NgbModalConfig, private service: AgeService, private router: Router, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    utilsService.loadPaginatorLabels();
  }

  ngOnInit() {
    this.reload();
  }
  pageEvent(pageE: any) {
    this.pageIndex = pageE.pageIndex + 1;
    this.pageSize = pageE.pageSize;
    this.reload();
  }
  search(){
      this.reload();
      this.searchTerm = '';
  }
  reload() {
    const filter = {
      searchTerm: this.searchTerm,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      sortName: this.paginationSettings.sort.SortName,
      sortDirection: this.paginationSettings.sort.SortDirection
    };
    this.loading = true;
    this.AgeList = [];
    this.service.getAgeList(filter).subscribe((response: any) => {
      const list = response.results ? response.results : [];
      this.Total = (response && response.rowCount) ? response.rowCount : 0;
      this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
      setTimeout(() => {
        this.loading = false;
        this.AgeList = list || [];
      }, 500);
    });
  }
  add() {
    this.edit(null);
  }

  remove(id) {
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { windowClass: 'modal-confirm'});
    modalRef.componentInstance.confirmObject = 'Age';
    modalRef.componentInstance.decide.subscribe(() => {
      _this.service.deleteAge(id).subscribe(() => {
        _this.reload();
      });
    });
  }
  edit(Ageid: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(AgeEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.AgeId = Ageid;
    modalRef.result.then(function (result) {
      _this.reload();
    });
  }
  openImport() {
    const _this = this;
    const modalRef = this.modalService.open(AgeImportComponent, { size: 'lg' });
    modalRef.result.then(function(importModel: any){
    });
  }

  downloadTemplate() {
    var fileName = 'Areas_Import.xlsx';
    var a = document.createElement('a');
    a.href = this.service.getTemplate(fileName);
    a.download = fileName;
    document.body.append(a);
    a.click();
    a.remove();
  }
}
