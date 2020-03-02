import { Component, OnInit } from '@angular/core';
import { ProvinceService } from '../../../services/list/province.service';
import { Province } from '../../../models/list/province';
import { ProvinceEditComponent } from './provinceedit/provinceedit.component';
import { ProvinceImportComponent } from './province-import/province-import.component';
import { Filter } from '../../../models/filter/filter';
import { ASCSort, SORD_DIRECTION } from '../../../models/sort';
import { Router } from '@angular/router'; 
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginatorIntl } from '@angular/material/paginator';

import {TranslateService} from '@ngx-translate/core';
import { elementAt } from 'rxjs/operators';
import PerfectScrollbar from 'perfect-scrollbar';
import { UtilsService } from 'app/services/utils.service';

@Component({
  selector: 'app-provinces',
  templateUrl: './provinces.component.html',
  styleUrls: ['./provinces.component.scss']
})
export class ProvincesComponent implements OnInit {ModalDirective;
  provincesList:any[] = [];
  province: any;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSizesList: number[] = [5, 10, 20, 100];
  pageSize:number = this.pageSizesList[1];
  currentUser: any;
  loading: boolean = true;
  Total: number = 0;
  firstRowOnPage: any;
  color = '#ff00ff';
  date = '2017-10-19';
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
    columnsName:  ['Order', 'ProvinceCode', 'ProvinceName', 'Action'],
    columnsNameMapping: ['id', 'provinceCode', 'provinceName', ''],
    sortAbles: [false, true, true, false],
    columnsNameFilter: ['id', 'provinceCode', 'provinceName', ''],
    visibles: [true, true, true, true]
  };
  
  /**
   * END SORT SETTINGS
   */

  constructor(private translate: TranslateService, 
              private matCus: MatPaginatorIntl,
              config: NgbModalConfig,
              private service: ProvinceService,
              private router: Router,
              public utilsService: UtilsService, 
              private modalService: NgbModal) { 
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
    utilsService.loadPaginatorLabels();
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

    remove(province: Province) {
        this.province = province;
    	const _this = this;
    	const modalRef = this.modalService.open(ConfirmComponent, { windowClass: 'modal-confirm' });
    	modalRef.componentInstance.confirmObject = 'Province';
    	modalRef.componentInstance.decide.subscribe(() => {
        	_this.deleteProvince();
    	});
    }
    reload() {
      const _this = this;
      const filter = {
        searchTerm: _this.searchTerm,
        pageIndex: _this.pageIndex,
        pageSize: _this.pageSize,
        sortName: _this.paginationSettings.sort.SortName,
        sortDirection: _this.paginationSettings.sort.SortDirection
      };
      this.loading = true;
      _this.provincesList = [];
      this.service.getProvincesList(filter).subscribe(
          (response: any) => {
            const list = response.results ? response.results : [];
            this.Total = (response && response.rowCount) ? response.rowCount : 0;
            this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
            _this.provincesList = (list) ? list : [];
              _this.loading = false;
          },
          (err: any) => {
            _this.provincesList = [];
            _this.loading = false;
          }
      );
    }

  add() {
    this.edit(null);
  }

  edit(id: number) {
    const _this = this;
    const modalRef = this.modalService.open(ProvinceEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    if (id) {
      modalRef.componentInstance.id = id;
    }
    modalRef.result.then(function(){
        _this.reload();
    });
  }

  deleteProvince() {
    const _this = this;
    this.service.deleteProvince(this.province.id).subscribe((rs: any) => {
      _this.reload();
    });
  }

  sortToggles(colIndex: number) {
        const _this= this;
        if(this.paginationSettings.sortAbles[colIndex]) 
            this.utilsService.toggleSort(colIndex, this.paginationSettings.sortToggles ,this.paginationSettings.sort , this.paginationSettings.columnsNameMapping)
              .then(() => {
                _this.reload();
              });
        else 
          this.utilsService.doNothing();
    }
  
  doNothing(): void {}

  openImport() {
    const _this = this;
    const modalRef = this.modalService.open(ProvinceImportComponent, { size: 'lg' });
    modalRef.result.then(function(importModel: any){
    });
  }

  downloadTemplate() {
    var fileName = 'Provinces_Import.xlsx';
    var a = document.createElement('a');
    a.href = this.service.getTemplate(fileName);
    a.download = fileName;
    document.body.append(a);
    a.click();
    a.remove();
  }

  onDateUpdate(dateResult: string) {
    console.log(dateResult);
  }
}
