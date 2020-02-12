import { Component, OnInit, ViewChild} from '@angular/core';
import { WardService } from '../../../services/danhmuc/ward.service';
import { Ward } from '../../../models/danhmuc/wards';
import { WardFilter } from '../../../models/filter/wardfilter';
import { Router } from '@angular/router'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WardEditComponent } from './wardedit/wardedit.component';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { ASCSort, SORD_DIRECTION } from 'app/models/sort';
@Component({
  selector: 'app-wards',
  templateUrl: './wards.component.html',
  styleUrls: ['./wards.component.scss']
})
export class WardsComponent implements OnInit {
  wardsList:Ward[] = [];
  ward: Ward;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSize:number = 20;
  currentUser: any;
  provinceId: null | number = null;
  districtId: null | number = null;

  /**
   * BEGIN SORT SETTINGS
   */
  sort: ASCSort = new ASCSort();
  sortToggles: SORD_DIRECTION[] = [null, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, null];
  columnsName: string[] = ['Order', 'WardCode', 'WardName', 'ProvinceName', 'DistrictName', 'Action'];
  columnsNameMapping: string[] = ['Order', 'WardCode', 'WardName', 'ProvinceID', 'DistrictID', 'Action'];
  sortAbles: boolean[] = [false, true, true, true, true, false];
  /**
   * END SORT SETTINGS
   */

  constructor(private modalService: NgbModal,private service: WardService, private router: Router) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
	  this.reload();
  }

  remove(ward: Ward) {
    this.ward = ward;
    const _this = this;
  const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
  modalRef.componentInstance.confirmObject = 'Ward';
  modalRef.componentInstance.decide.subscribe(() => {
      _this.deleteWard();
  });
}

  reload() {
    const _this = this
	  const filter: WardFilter = new WardFilter(this.searchTerm, this.pageIndex, this.pageSize, this.provinceId, this.districtId, this.sort.SortName, this.sort.SortDirection);
    this.service.getWardsList(filter).subscribe((list:any)=>{
    _this.wardsList = list;
  })
  }

  add() {
    this.edit(null);
  }

  edit(ID: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(WardEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    if (ID) {
      modalRef.componentInstance.ID = ID;
      modalRef.componentInstance.UserId = _this.currentUser.UserId;
    }
    modalRef.result.then(function(){
      _this.reload();
  });
  }

  deleteWard() {
    const _this = this;
    this.service.deleteWard(this.ward.ID, this.currentUser.UserID).subscribe((rs:any)=>{
      this.reload();
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

  getColumnValue(ward: Ward, colIndex: number): any {
    let obj = Object.keys(ward);
    return ward[obj[colIndex]];
  }
}
