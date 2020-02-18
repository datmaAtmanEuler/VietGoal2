import { Component, OnInit, ViewChild } from '@angular/core';
import { AreaService } from '../../../services/list/area.service';
import { Area } from '../../../models/list/area';
import { AreaEditComponent } from './area-edit/area-edit.component';
import { AreaFilter } from '../../../models/filter/areafilter';
import { Router } from '@angular/router'; 
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ASCSort, SORD_DIRECTION } from 'app/models/sort';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreaComponent implements OnInit {ModalDirective;
  areasList:Area[] = [];
  area: Area;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSize:number = 20;
  currentUser: any;
  /**
   * BEGIN SORT SETTINGS
   */
  sort: ASCSort = new ASCSort();
  sortToggles: SORD_DIRECTION[] = [null, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, null];
  columnsName: string[] = ['Order', 'AreaCode', 'AreaName', 'CentralName', 'Action'];
  columnsNameMapping: string[] = ['ID', 'AreaCode', 'AreaName', 'CentralName', 'Action'];
  sortAbles: boolean[] = [false, true, true, true, false];
  /**
   * END SORT SETTINGS
   */
  constructor(config: NgbModalConfig, private service: AreaService, private router: Router, private modalService: NgbModal) { 
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
  }

  ngOnInit() {
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	this.reload();
  }

    remove(area: Area) {
        this.area = area;
    	const _this = this;
    	const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    	modalRef.componentInstance.confirmObject = 'RegionsList';
    	modalRef.componentInstance.decide.subscribe(() => {
        	_this.deleteArea();
    	});
    }


    reload() {
      const _this = this;
      const filter: AreaFilter = new AreaFilter(this.searchTerm, this.pageIndex, this.pageSize, null, this.sort.SortName, this.sort.SortDirection);
      _this.service.getAreasList(filter).subscribe((areaList: Area[]) => {
        _this.areasList = areaList;
      });
    }

  add() {
    this.edit(null);
  }

  edit(ID: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(AreaEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    if (ID) {
      modalRef.componentInstance.ID = ID;
      modalRef.componentInstance.UserId = _this.currentUser.UserId;
    }
    modalRef.result.then(function(){
      _this.reload();
  });
  }

  deleteArea() {
    const _this = this;
    this.service.deleteArea(this.area.Id, this.currentUser.UserId).subscribe((res: any) => {
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
}
