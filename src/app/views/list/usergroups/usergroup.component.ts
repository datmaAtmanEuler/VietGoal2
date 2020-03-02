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
import { UserGroupImportComponent } from './usergroup-import/usergroup-import.component';
import { UtilsService } from '../../../services/utils.service';
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
  searchAdvanced: boolean = false;
    /**
   * BEGIN SORT SETTINGS
   */
  paginationSettings: any = {
    sort: new ASCSort(),
    sortToggles: [
      null,
      SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, 
      null
    ],
    columnsName:['Order', 'GroupCode', 'GroupName', 'Action'],
    columnsNameMapping: ['id', 'groupCode', 'groupName', ''],
    sortAbles: [false, true,true, false],
    visibles:  [true, true, true, true, ]
  }

  /**
   * END SORT SETTINGS
   */
  constructor(public utilsService: UtilsService, private translate: TranslateService,
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
  modalRef.componentInstance.confirmObject = 'Groups';
  modalRef.componentInstance.decide.subscribe(() => {
      _this.deleteNhom();
  });
}

reload() {
  const _this = this;
  const filter: Filter = new Filter('', this.pageIndex, this.pageSize, 'id', 'ASC');
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
      modalRef.componentInstance.id = Id;
    }
    modalRef.result.then(function(){
        _this.reload();
    });
  }
  deleteNhom() {
    const _this = this;
    this.service.deleteNhom(this.usergroup.id).subscribe((rs: any) => {
      _this.reload();
    });
  }
  
  doNothing(): void {}

  openImport() {
    const _this = this;
    const modalRef = this.modalService.open(UserGroupImportComponent, { size: 'lg' });
    modalRef.result.then(function(importModel: any){
    });
  }

  downloadTemplate() {
    var fileName = 'UserGroups_Import.xlsx';
    var a = document.createElement('a');
    a.href = this.service.getTemplate(fileName);
    a.download = fileName;
    document.body.append(a);
    a.click();
    a.remove();
  }
}

