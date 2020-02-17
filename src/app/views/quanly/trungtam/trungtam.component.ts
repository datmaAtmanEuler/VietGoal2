import { Component, OnInit, ViewChild } from '@angular/core';
import { Filter } from '../../../models/filter/filter';
import { Trungtam } from '../../../models/quanly/trungtam';
import { TrungtamService } from '../../../services/quanly/trungtam.service';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';

import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TrungtamaddoreditComponent } from './trungtamaddoredit/trungtamaddoredit.component';
import { ASCSort, SORD_DIRECTION } from 'app/models/sort';
import { CentralFilter } from 'app/models/filter/centralfilter';
import { MatPaginatorIntl } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-trungtam',
  templateUrl: './trungtam.component.html',
  styleUrls: ['./trungtam.component.scss']
})
export class TrungtamComponent implements OnInit {
  trungtamList: any[] = [];
  trungtam: Trungtam;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSizesList: number[] = [5, 10, 20, 100];
  pageSize:number = this.pageSizesList[3];
  currentUser: any;
  provinceId: null | number = null;
  districtId: null | number = null;
  wardId: null | number = null;
  Total:number;
  loading: boolean;

  /**
  * BEGIN SORT SETTINGS
  */
 sort: ASCSort = new ASCSort();
 sortToggles: SORD_DIRECTION[] = [
   null,
   SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT,
   null
  ];
 columnsName: string[] = ['Order', 'CentralName', 'Address', 'CampusArea', 'Note', 'Action'];
 columnsNameMapping: string[] = ['ID', 'CentralName', 'Address', 'CampusArea', 'Discription', 'Action'];
 columnsNameVi = ['','CentralName','Address','CampusArea','Discription','']
 sortAbles: boolean[] = [false, true, true, true, true, false];
 visibles: boolean[] = [true, true, true, true, true, true];
 /**
  * END SORT SETTINGS
  */
 
  constructor(private translate: TranslateService, private matCus: MatPaginatorIntl, public util: UtilsService, config: NgbModalConfig, private service: TrungtamService, private router: Router, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    this.updateMatTableLabel();
    translate.onLangChange.subscribe((a: any) => {
      this.updateMatTableLabel();
      matCus.changes.next();
    });
   }
  ngOnInit() {
    this.reload();
  }
  updateMatTableLabel() {
    this.matCus.itemsPerPageLabel = this.translate.instant('MESSAGE.NameList.ItemsPerPage');
    this.matCus.getRangeLabel =  (page: number, pageSize: number, length: number): string => {
        if (length === 0 || pageSize === 0) {
          return this.translate.instant('MESSAGE.NameList.NoRecord');
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return this.translate.instant('MESSAGE.NameList.PageFromToOf', { startIndex: startIndex + 1, endIndex, length });
      }
  }

  remove(trungtam: Trungtam) {
    this.trungtam = trungtam;
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    modalRef.componentInstance.confirmObject = 'Central';
    modalRef.componentInstance.decide.subscribe(() => {
      _this.service.deleteTrungtam(trungtam.Id, this.currentUser.UserId).subscribe(()=>{
        _this.reload();
      });
    });
  }
  pageEvent(variable: any){
    this.pageIndex = variable.pageIndex+1;
    this.pageSize = variable.pageSize;
    this.reload();
  }
  reload() {
    const filter: CentralFilter = new CentralFilter(this.searchTerm, this.pageIndex, this.pageSize, this.provinceId, this.districtId, this.wardId, this.sort.SortName, this.sort.SortDirection);
    this.loading = true;
    this.trungtamList = [];
    this.service.getTrungtamsList(filter).subscribe((list: any) => {
      this.Total = (list && list[0]) ? list[0].Total : 0;
      setTimeout(() => {
        this.loading = false;
        this.trungtamList = list || [];
      }, 500);
    });
  }
  add() {
    this.edit(null);
  }

  edit(TrungtamId: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(TrungtamaddoreditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.trungtamId = TrungtamId;
    modalRef.result.then(function(result) {
        _this.reload();
    });
  }
  
  toggleSort(columnIndex: number): void {
    let toggleState =  this.sortToggles[columnIndex];
    switch(toggleState) {
      case SORD_DIRECTION.DEFAULT: 
      {
        toggleState = SORD_DIRECTION.ASC;
        break;
      }
      case SORD_DIRECTION.ASC: 
      {
        toggleState = SORD_DIRECTION.DESC;
        break;
      }
      default:
      {
        toggleState = SORD_DIRECTION.DEFAULT;
        break;
      }
    }
    this.sortToggles.forEach((s: string, index: number) => {
      if(index == columnIndex) {
        this.sortToggles[index] = this.sort.SortDirection = toggleState;
      } else {
        this.sortToggles[index] = SORD_DIRECTION.DEFAULT;
      }
    });

    this.sort.SortName = (toggleState == SORD_DIRECTION.DEFAULT) ? 'ID' : this.columnsNameMapping[columnIndex];
    this.reload();
  }
  
  doNothing(): void {}

  getColumnValue(tt: Trungtam, colIndex: number): any {
    // let obj = Object.keys(tt);
    // return tt[obj[colIndex]];
    return tt[this.columnsNameVi[colIndex]];
  }
}
