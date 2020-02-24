import { Component, OnInit} from '@angular/core';
import { UserGroupService } from '../../../services/acl/usergroup.service';
import { UserGroup } from '../../../models/acl/usergroup';
import { Filter } from '../../../models/filter/filter';
import { Router } from '@angular/router'; 
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserGroupEditComponent } from './usergroup-edit/usergroup-edit.component';
import { ASCSort, SORD_DIRECTION } from '../../../models/sort';
import { MatPaginatorIntl } from '@angular/material/paginator';
import {TranslateService} from '@ngx-translate/core';
import PerfectScrollbar from 'perfect-scrollbar';
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
  sortToggles: SORD_DIRECTION[] = [null, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, null];
  columnsName: string[] = ['Order', 'GroupCode', 'GroupName', 'Action'];
  columnsNameMapping: string[] = ['ID', 'GroupCode', 'GroupName', 'Action'];
  sortAbles: boolean[] = [false, true, true, false];
  /**
   * END SORT SETTINGS
   */
  constructor(private translate: TranslateService,
    private matCus: MatPaginatorIntl, config: NgbModalConfig, private service: UserGroupService, private router: Router, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
    this.updateMatTableLabel();
    translate.onLangChange.subscribe((a: any) => {
      this.updateMatTableLabel();
      matCus.changes.next();
    });
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
  pageEvent(variable: any){
    this.pageIndex = variable.pageIndex+1;
    this.pageSize = variable.pageSize;
    this.reload();
  }
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.reload();
    const vgscroll = <HTMLElement>document.querySelector('.vg-scroll');
    new PerfectScrollbar(vgscroll);
  }

  remove(usergroup: UserGroup) {
    this.usergroup = usergroup;
  const _this = this;
  const modalRef = this.modalService.open(ConfirmComponent, { windowClass: 'modal-confirm' });
  modalRef.componentInstance.confirmObject = 'Usergroup';
  modalRef.componentInstance.decide.subscribe(() => {
      _this.deleteNhom();
  });
}

reload() {
  const _this = this;
  const filter: Filter = new Filter(this.searchTerm, this.pageIndex, this.pageSize, 'Id', 'ASC');
  _this.usergroupList = [];
  this.service.getNhomList(filter).subscribe(
      (response: any) => {
        const list = response.results ? response.results : [];
        this.Total = (response && response.rowCount) ? response.rowCount : 0;
        this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
        setTimeout(() => {
          _this.usergroupList = (list) ? list : [];
          _this.loading = false;
        }, 500);
      },
      (err: any) => {
        _this.usergroupList = [];
        _this.loading = false;
      }
  );
}

  add() {
    this.edit(null);
  }

  edit(Id: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(UserGroupEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    if (Id) {
      modalRef.componentInstance.Idnhom = Id;
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

