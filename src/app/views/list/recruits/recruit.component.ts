import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Filter } from '../../../models/filter/filter';
import { Router } from '@angular/router';
import { ASCSort, SORD_DIRECTION } from '../../../models/sort';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { RecruitService } from '../../../services/list/recruit.service';
import { RecruitEditComponent } from './recruit-edit/recruit-edit.component';
import { Recruit } from '../../../models/list/recruit';

import {TranslateService} from '@ngx-translate/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import PerfectScrollbar from 'perfect-scrollbar';
import { RecruitImportComponent } from './recruit-import/recruit-import.component';
import { UtilsService } from '../../../services/utils.service';
@Component({
  selector: 'app-recruit',
  templateUrl: './recruit.component.html',
  styleUrls: ['./recruit.component.scss']
})
export class RecruitComponent implements OnInit {
  recruitsList:any[] = [];
  recruit: any;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSizesList: number[] = [5, 10, 20, 100];
  pageSize:number = this.pageSizesList[1];
  currentUser: any;
  loading: boolean = true;
  Total: any;
  firstRowOnPage: any;
  isLoading: boolean;
  /**
   * BEGIN SORT SETTINGS
   */
  paginationSettings: any = {
    sort: new ASCSort(),
    sortToggles: [
      null,
      SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, 
      null
    ],
    columnsName: ['Order', 'RecruitsCode', 'RecruitsName','RecruitsColor', 'Action'],
    columnsNameMapping: ['id', 'recruitCode', 'recruitName','recruitColor', ''],
    sortAbles: [false, true, true, true, false],
    visibles:  [true, true, true, true, true]
  } 
 
  /**
   * END SORT SETTINGS
   */
  constructor(public utilsService: UtilsService,private translate: TranslateService, config: NgbModalConfig,  private matCus: MatPaginatorIntl, private service: RecruitService, 
    private router: Router,  private cdRef: ChangeDetectorRef,
    private modalService: NgbModal) { 
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
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.reload();
    const vgscroll = <HTMLElement>document.querySelector('.vg-scroll');
    new PerfectScrollbar(vgscroll);
  }
  pageEvent(variable: any){
    this.pageIndex = variable.pageIndex+1;
    this.pageSize = variable.pageSize;
    this.reload();
  }
    remove(recruit: Recruit) {
        this.recruit = recruit;
    	const _this = this;
    	const modalRef = this.modalService.open(ConfirmComponent, { windowClass: 'modal-confirm' });
    	modalRef.componentInstance.confirmObject = 'Recruit';
    	modalRef.componentInstance.decide.subscribe(() => {
        	_this.deleteRecruit();
    	});
    }
    reload() {
      const _this = this;
      const filter: Filter = new Filter( this.searchTerm,this.pageIndex, this.pageSize, 'id','ASC');
      this.loading = true;
      _this.recruitsList = [];
      this.service.getRecruitsList(filter).subscribe(
          (response: any) => {
            const list = response.results ? response.results : [];
            this.Total = (response && response.rowCount) ? response.rowCount : 0;
            this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
            setTimeout(() => {
              _this.recruitsList = (list) ? list : [];
              _this.loading = false;
            }, 500);
          },
          (err: any) => {
            _this.recruitsList = [];
            _this.loading = false;
          }
      );
    }
    add() {
      this.edit(null);
    }
  
    edit(ID: number) {
      const _this = this;
      const modalRef = this.modalService.open(RecruitEditComponent, { size: 'lg' });
      modalRef.componentInstance.popup = true;
      if (ID) {
        modalRef.componentInstance.id = ID;
      }
      modalRef.result.then(function(){
          _this.reload();
      });
    }
    deleteRecruit() {
      const _this = this;
      this.service.deleteRecruit(this.recruit.id).subscribe((rs: any) => {
        _this.reload();
      });
    }
  
    doNothing(): void {}
    openImport() {
      const _this = this;
      const modalRef = this.modalService.open(RecruitImportComponent, { size: 'lg' });
      modalRef.result.then(function(importModel: any){
      });
    }
  
    downloadTemplate() {
      var fileName = 'Recruits_Import.xlsx';
      var a = document.createElement('a');
      a.href = this.service.getTemplate(fileName);
      a.download = fileName;
      document.body.append(a);
      a.click();
      a.remove();
    }
  }
  