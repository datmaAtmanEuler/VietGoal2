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

  constructor(private translate: TranslateService, 
              private matCus: MatPaginatorIntl,
              config: NgbModalConfig,
              private service: ProvinceService,
              private router: Router,
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
      this.loading = true;
      _this.provincesList = [];
      this.service.getProvincesList(filter).subscribe(
          (list: any) => {
            setTimeout(() => {
              _this.provincesList = (list) ? list : [];
              _this.loading = false;
            }, 500);
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
    this.service.deleteProvince(this.province.Id, this.currentUser.UserId).subscribe((rs: any) => {
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
}
