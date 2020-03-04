import { Component, OnInit } from '@angular/core';
import { Filter } from '../../../models/filter/filter';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Fee } from 'app/models/list/fee';
import { FeeService } from 'app/services/list/fee.service';
import { FeeEditComponent } from './fee-edit/fee-edit.component';
import { FeeImportComponent } from './fee-import/fee-import.component';
import { CommonFilter } from 'app/models/filter/commonfilter';
import { ASCSort, SORD_DIRECTION } from 'app/models/sort';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.scss']
})
export class FeesComponent implements OnInit {

  FeeList: Fee[] = [];
  Fee: Fee;
  searchTerm: string = '';
  filter: CommonFilter = new CommonFilter();
  pageSizesList: number[] = [5, 10, 20, 100];
  loading: boolean;
  Total: number;
  firstRowOnPage: number;
  currentUser: any;
  
  paginationSettings: any = {
    sort: new ASCSort(),
    sortToggles: [
      null,
      SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, 
       null
    ],
    columnsName: ['Order', 'CollectionCode', 'CollectionName', 'Action'],
    columnsNameMapping: [null, 'feeCode', 'feeName', null],
    sortAbles: [false, true, true, false],
    visibles: [false, true, true, false]
  }
  constructor(public utilsService: UtilsService, config: NgbModalConfig, private service: FeeService, private router: Router, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    utilsService.loadPaginatorLabels();
  }

  ngOnInit() {
    this.filter.pageIndex = 1;
    this.filter.pageSize = this.pageSizesList[1];
    this.reload();
  }

  pageEvent(pageE: any) {
    this.filter.pageIndex = pageE.pageIndex + 1;
    this.filter.pageSize = pageE.pageSize;
    this.reload();
  }
  search(){
    this.reload();
    this.filter.searchTerm = '';
  }
  reload() {
    this.filter.sortName = this.paginationSettings.sort.SortName;
    this.filter.sortDirection = this.paginationSettings.sort.SortDirection; 
    this.loading = true;
    this.FeeList = [];
    this.service.getFeeList(this.filter).subscribe((response: any) => {
      const list = response.results ? response.results : [];
      this.Total = (response && response.rowCount) ? response.rowCount : 0;
      this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
      setTimeout(() => {
        this.loading = false;
        this.FeeList = list || [];
      }, 500);
    });
  }
  add() {
    this.edit(null);
  }

  remove(id: number) {
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { windowClass: 'modal-confirm' });
    modalRef.componentInstance.confirmObject = 'Collection';
    modalRef.componentInstance.decide.subscribe(() => {
      _this.service.deleteFee(id).subscribe(() => {
        _this.reload();
      });
    });
  }
  edit(Feeid: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(FeeEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.FeeId = Feeid;
    modalRef.result.then(function (result) {
      _this.reload();
    });
  }
  openImport() {
    const _this = this;
    const modalRef = this.modalService.open(FeeImportComponent, { size: 'lg' });
    modalRef.result.then(function(importModel: any){
    });
  }

  downloadTemplate() {
    var fileName = 'Fees_Import.xlsx';
    var a = document.createElement('a');
    a.href = this.service.getTemplate(fileName);
    a.download = fileName;
    document.body.append(a);
    a.click();
    a.remove();
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
