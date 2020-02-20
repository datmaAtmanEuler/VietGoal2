import { Component, OnInit} from '@angular/core';
import { UserGroupService } from '../../../services/acl/usergroup.service';
import { UserGroup } from '../../../models/acl/usergroup';
import { Filter } from '../../../models/filter/filter';
import { Router } from '@angular/router'; 
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserGroupEditComponent } from './usergroup-edit/usergroup-edit.component';
import { ASCSort, SORD_DIRECTION } from '../../../models/sort';

@Component({
  selector: 'app-usergroup',
  templateUrl: './usergroup.component.html',
  styleUrls: ['./usergroup.component.scss']
})
export class UserGroupComponent implements OnInit {

  usergroupList:UserGroup[] = [];
  usergroup: UserGroup;
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
  columnsNameMapping: string[] = ['ID', 'ProvinceCode', 'ProvinceName', 'Action'];
  sortAbles: boolean[] = [false, true, true, false];
  /**
   * END SORT SETTINGS
   */
  constructor(config: NgbModalConfig, private service: UserGroupService, private router: Router, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
   }

  ngOnInit() {
	this.reload();
  }

  remove(usergroup: UserGroup) {
    this.usergroup = usergroup;
  const _this = this;
  const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
  modalRef.componentInstance.confirmObject = 'Usergroup';
  modalRef.componentInstance.decide.subscribe(() => {
      _this.deleteNhom();
  });
}

reload() {
  const _this = this;
  const filter: Filter = new Filter(this.searchTerm, this.pageIndex, this.pageSize, this.sort.SortName, this.sort.SortDirection);
  this.service.getNhomList(filter).subscribe((list: any) => {
    _this.usergroup = list;
  });
}

  add() {
    this.edit(null);
  }

  edit(IdNhom: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(UserGroupEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    if (IdNhom) {
      modalRef.componentInstance.Idnhom = IdNhom;
    }
    modalRef.result.then(function(){
        _this.reload();
    });
  }


  deleteNhom() {
    const _this = this;
    this.service.deleteNhom(this.usergroup.Id, this.currentUser.UserId).subscribe((rs: any) => {
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
