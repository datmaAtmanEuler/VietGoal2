import { Component, OnInit } from '@angular/core';
import { Filter } from '../../../models/filter/filter';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CollectionService } from 'app/services/list/collection.service';
import { Collection } from 'app/models/list/collection';
import { CollectionEditComponent } from './collection-edit/collection-edit.component';
import { CollectionImportComponent } from './collection-import/collection-import.component';
import { CommonFilter } from 'app/models/filter/commonfilter';
import { ASCSort, SORD_DIRECTION } from 'app/models/sort';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {


  CollectionList: Collection[] = [];
  Collection: Collection;
  loading: boolean;
  currentUser: any;
  filter: CommonFilter = new CommonFilter();
  pageSizesList: number[] = [5, 10, 20, 100];
  Total: any;
  firstRowOnPage: any;
  
  paginationSettings: any = {
    sort: new ASCSort(),
    sortToggles: [
      null,
      SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, 
       null
    ],
    columnsName: ['Order', 'TermOfCollectionCode', 'TermOfCollectionName', 'Action'],
    columnsNameMapping: [null, 'collectionCode', 'collectionName', null],
    sortAbles: [false, true, true, false],
    visibles: [false, true, true, false]
  }
  constructor(public utilsService: UtilsService, config: NgbModalConfig, private service: CollectionService, private router: Router, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    utilsService.loadPaginatorLabels();
  }

  ngOnInit() {
    this.filter.searchTerm = '';
    this.filter.pageIndex = 1;
    this.filter.pageSize = this.pageSizesList[1];
    this.reload();
  }

  reload() {
    this.filter.sortName = this.paginationSettings.sort.SortName;
    this.filter.sortDirection = this.paginationSettings.sort.SortDirection; 
    this.loading = true;
    this.CollectionList = [];
    this.service.getCollectionList(this.filter).subscribe((response: any) => {
      const list = response.results ? response.results : [];
      this.Total = (response && response.rowCount) ? response.rowCount : 0;
      this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
      setTimeout(() => {
        this.loading = false;
        this.CollectionList = list || [];
      }, 500);
    });
  }
  add() {
    this.edit(null);
  }

  remove(id) {
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { windowClass: 'modal-confirm' });
    modalRef.componentInstance.confirmObject = 'TermOfCollection';
    modalRef.componentInstance.decide.subscribe(() => {
      _this.service.deleteCollection(id).subscribe(() => {
        _this.reload();
      });
    });
  }
  edit(dothuId: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(CollectionEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.CollectionId = dothuId;
    modalRef.result.then(function (result) {
      _this.reload();
    });
  }
  
  openImport() {
    const _this = this;
    const modalRef = this.modalService.open(CollectionImportComponent, { size: 'lg' });
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
