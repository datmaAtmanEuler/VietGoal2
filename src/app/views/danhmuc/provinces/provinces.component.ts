import { Component, OnInit } from '@angular/core';
import { ProvinceService } from '../../../services/danhmuc/province.service';
import { Province } from '../../../models/danhmuc/province';
import { ProvinceEditComponent } from './provinceedit/provinceedit.component';
import { Filter } from '../../../models/filter/filter';
import { ASCSort, SORD_DIRECTION } from '../../../models/sort';
import { Router } from '@angular/router'; 
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-provinces',
  templateUrl: './provinces.component.html',
  styleUrls: ['./provinces.component.scss']
})
export class ProvincesComponent implements OnInit {ModalDirective;
  provincesList:Province[] = [];
  province: Province;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSize:number = 20;
  currentUser: any;
  
  /**
   * BEGIN SORT SETTINGS
   */
  sort: ASCSort = new ASCSort();
  sortToggles: SORD_DIRECTION[] = [null, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, null];
  columnsName: string[] = ['Order', 'ProvinceCode', 'ProvinceName', 'Action'];
  columnsNameMapping: string[] = this.columnsName;
  sortAbles: boolean[] = [false, true, true, false];
  /**
   * END SORT SETTINGS
   */

  constructor(config: NgbModalConfig, private service: ProvinceService, private router: Router, private modalService: NgbModal) { 
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	  this.reload();
  }

    remove(province: Province) {
        this.province = province;
    	const _this = this;
    	const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    	modalRef.componentInstance.confirmObject = 'Province';
    	modalRef.componentInstance.decide.subscribe(() => {
        	_this.deleteProvince();
    	});
    }


    reload() {
      const _this = this;
    	const filter: Filter = new Filter(this.searchTerm, this.pageIndex, this.pageSize, this.sort.SortName, this.sort.SortDirection);
      this.service.getProvincesList(filter).subscribe((list: any) => {
        _this.provincesList = list;
      });
    }

  add() {
    this.edit(null);
  }

  edit(ID: number) {
    const _this = this;
    const modalRef = this.modalService.open(ProvinceEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    if (ID) {
      modalRef.componentInstance.ID = ID;
    }
    modalRef.result.then(function(){
        _this.reload();
    });
  }

  deleteProvince() {
    const _this = this;
    this.service.deleteProvince(this.province.ID, this.currentUser.UserId).subscribe((rs: any) => {
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
