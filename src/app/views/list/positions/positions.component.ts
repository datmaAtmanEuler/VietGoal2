import { Component, OnInit } from '@angular/core';
import { Filter } from '../../../models/filter/filter';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { PositionService } from 'app/services/list/position.service';
import { Position } from '../../../models/list/position';
import { PositionEditComponent } from './position-edit/position-edit.component';
import { PositionImportComponent } from './position-import/position-import.component';
import { ASCSort, SORD_DIRECTION } from '../../../models/sort';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss']
})
export class PositionsComponent implements OnInit {
  positionList: Position[] = [];
  Position: Position;
  searchTerm: string = '';
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
    columnsName: ['Order', 'PositionCode', 'PositionName', 'Action'],
    columnsNameMapping: ['', 'positionCode', 'positionName', ''],
    sortAbles: [false, true, true, false],
    visibles: [true, true, true, true]
  }
  constructor(public utilsService: UtilsService, config: NgbModalConfig, private service: PositionService, private router: Router, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    utilsService.loadPaginatorLabels();
  }

  ngOnInit() {
    this.reload();
  }

  remove(id: any) {
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { windowClass: 'modal-confirm' });
    modalRef.componentInstance.confirmObject = 'Position';
    modalRef.componentInstance.decide.subscribe(() => {
      _this.service.deletePosition(id).subscribe(()=>{
        _this.reload();
      });
    });
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
    this.positionList = [];
    this.service.getPositionList(filter).subscribe((response: any) => {
      const list = response.results ? response.results : [];
      this.Total = (response && response.rowCount) ? response.rowCount : 0;
      this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
      setTimeout(() => {
        this.loading = false;
        this.positionList = list || [];
      }, 500);
    });
  }
  add() {
    this.edit(null);
  }

  edit(PositionId: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(PositionEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.PositionId = PositionId;
    modalRef.result.then(function (result) {
      _this.reload();
    });
  }
  
  openImport() {
    const _this = this;
    const modalRef = this.modalService.open(PositionImportComponent, { size: 'lg' });
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
