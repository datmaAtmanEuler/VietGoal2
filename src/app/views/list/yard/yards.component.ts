import { Component, OnInit, ViewChild } from '@angular/core';
import { YardService } from '../../../services/list/yard.service';
import { UtilsService } from '../../../services/utils.service';
import { Yard } from '../../../models/list/yard';
import { YardFilter } from '../../../models/filter/yardfilter';
import { Router } from '@angular/router'; 
import { NgbModal,NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { YardEditComponent } from './yard-edit/yard-edit.component';
import { ASCSort, SORD_DIRECTION } from 'app/models/sort';
import { MatPaginatorIntl } from '@angular/material/paginator';
import {TranslateService} from '@ngx-translate/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { Area } from 'app/models/list/area';
import { YardImportComponent } from './yard-import/yard-import.component';
@Component({
  selector: 'app-yards',
  templateUrl: './yards.component.html',
  styleUrls: ['./yards.component.scss']
})
export class YardComponent implements OnInit {
  yardsList:Yard[] = [];
  areasList:Area[] = [];
  yard: Yard;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSizesList: number[] = [5, 10, 20, 100];
  pageSize:number = this.pageSizesList[1];
  currentUser: any;
  loading: boolean = true;
  Total: any;
  firstRowOnPage: any;

  /**
   * BEGIN SORT SETTINGS
   */
  sort: ASCSort = new ASCSort();
  sortToggles: SORD_DIRECTION[] = [null, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, null];
  columnsName: string[] = ['Order', 'YardCode', 'YardName','Area','Address','CampusArea','Note', 'Action'];
  columnsNameMapping: string[] = ['Id', 'YardCode', 'YardName','Area','Address','CampusArea','Note', 'Action'];
  sortAbles: boolean[] = [false, true, true, true,true,true, false];
  /**
   * END SORT SETTINGS
   */

  constructor(private translate: TranslateService,
    private matCus: MatPaginatorIntl, config: NgbModalConfig,public util: UtilsService, private service: YardService, private modalService: NgbModal, private router: Router) {
    config.backdrop = 'static';
      config.keyboard = false;
      config.scrollable = false;
      this.updateMatTableLabel();
      translate.onLangChange.subscribe((a: any) => {
        this.updateMatTableLabel();
        matCus.changes.next();
      });
   }

  ngOnInit() {
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  this.reload();
  const vgscroll = <HTMLElement>document.querySelector('.vg-scroll');
  new PerfectScrollbar(vgscroll);
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
  remove(yard: Yard) {
    this.yard = yard;
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { windowClass: 'modal-confirm' });
    modalRef.componentInstance.confirmObject = 'Yard';
    modalRef.componentInstance.decide.subscribe(() => {
        _this.deleteYard();
    });
}
pageEvent(variable: any){
  this.pageIndex = variable.pageIndex+1;
  this.pageSize = variable.pageSize;
  this.reload();
}
reload() {
  const _this = this;
  const filter: YardFilter = new YardFilter( this.searchTerm,this.pageIndex, this.pageSize,null, 'Id','ASC');
  this.loading = true;
  _this.yardsList = [];
  this.service.getYardsList(filter).subscribe(
      (response: any) => {
        const list = response.results ? response.results : [];
        this.Total = (response && response.rowCount) ? response.rowCount : 0;
        this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
        setTimeout(() => {
          _this.yardsList = (list) ? list : [];
          _this.loading = false;
        }, 500);
      },
      (err: any) => {
        _this.yardsList = [];
        _this.loading = false;
      }
  );
}

add() {
  this.edit(null);
}

edit(Id: null | number) {
  const _this = this;
  const modalRef = this.modalService.open(YardEditComponent, { size: 'lg' });
  modalRef.componentInstance.popup = true;
  if (Id) {
    modalRef.componentInstance.Id = Id;
    modalRef.componentInstance.UserId = _this.currentUser.UserId;
  }
  modalRef.result.then(function(){
    _this.reload();
});
}

deleteYard() {
  const _this = this;
  this.service.deleteYard(this.yard.Id, this.currentUser.UserId).subscribe((res: any) => {
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

  this.sort.SortName = (toggleState == SORD_DIRECTION.DEFAULT) ? 'Id' : this.columnsNameMapping[columnIndex];
  this.reload();
}

doNothing(): void {}
openImport() {
  const _this = this;
  const modalRef = this.modalService.open(YardImportComponent, { size: 'lg' });
  modalRef.result.then(function(importModel: any){
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

