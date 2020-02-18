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
@Component({
  selector: 'app-yards',
  templateUrl: './yards.component.html',
  styleUrls: ['./yards.component.scss']
})
export class YardComponent implements OnInit {
  yardsList:Yard[] = [];
  yard: Yard;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSize:number = 20;
  currentUser: any;

  /**
   * BEGIN SORT SETTINGS
   */
  sort: ASCSort = new ASCSort();
  sortToggles: SORD_DIRECTION[] = [null, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, null];
  columnsName: string[] = ['Order', 'YardCode', 'YardName', 'CentralName','AreaName','Address', 'Action'];
  columnsNameMapping: string[] = ['Id', 'YardCode', 'YardName', 'CentralName','AreaName','Address', 'Action'];
  sortAbles: boolean[] = [false, true, true, true,true,true, false];
  /**
   * END SORT SETTINGS
   */

  constructor(config: NgbModalConfig,public util: UtilsService, private service: YardService, private modalService: NgbModal, private router: Router) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
   }

  ngOnInit() {
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	this.reload();
  }

  remove(yard: Yard) {
    this.yard = yard;
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    modalRef.componentInstance.confirmObject = 'Yard';
    modalRef.componentInstance.decide.subscribe(() => {
        _this.deleteYard();
    });
}

reload() {
  const _this = this;
  const filter: YardFilter = new YardFilter(this.searchTerm, this.pageIndex, this.pageSize, null,null, this.sort.SortName, this.sort.SortDirection);
  _this.service.getYardsList(filter).subscribe((yardList: Yard[]) => {
    _this.yardsList = yardList;
  });
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
}

