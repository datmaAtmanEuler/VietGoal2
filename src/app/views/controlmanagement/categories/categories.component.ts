import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/controlmanagement/category.service';
import { Category } from '../../../models/controlmanagement/category';
import { CategoryEditComponent } from './categoryedit/categoryedit.component';
import { CategoryFilter } from '../../../models/filter/categoryfilter';
import { ASCSort, SORD_DIRECTION } from '../../../models/sort';
import { Router } from '@angular/router'; 
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginatorIntl } from '@angular/material/paginator';

import {TranslateService} from '@ngx-translate/core';
import { elementAt } from 'rxjs/operators';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {ModalDirective;
  categoriesList: any[] = [];
  category: any;
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
  columnsName: string[] = ['Order', 'CategoryCode', 'CategoryName', 'Action'];
  columnsNameMapping: string[] = ['ID', 'CategoryCode', 'CategoryName', 'Action'];
  sortAbles: boolean[] = [false, true, true, false];
  /**
   * END SORT SETTINGS
   */

  constructor(private translate: TranslateService, 
              private matCus: MatPaginatorIntl,
              config: NgbModalConfig,
              private service: CategoryService,
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
  }
  
  pageEvent(variable: any){
    console.log(variable);
    this.pageIndex = variable.pageIndex+1;
    this.pageSize = variable.pageSize;
    this.reload();
  }

    remove(category: Category) {
        this.category = category;
    	const _this = this;
    	const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    	modalRef.componentInstance.confirmObject = 'Category';
    	modalRef.componentInstance.decide.subscribe(() => {
        	_this.deleteCategory();
    	});
    }


    reload() {
      const _this = this;
      const filter: CategoryFilter = new CategoryFilter(_this.searchTerm, _this.currentUser.UserGroupID, _this.pageIndex, _this.pageSize, _this.sort.SortName, _this.sort.SortDirection);
      this.loading = true;
      _this.categoriesList = [];
      this.service.getCategoriesList(filter).subscribe(
          (list: any) => {
            setTimeout(() => {
              _this.categoriesList = (list) ? list : [];
              _this.loading = false;
            }, 500);
          },
          (err: any) => {
            _this.categoriesList = [];
            _this.loading = false;
          }
      );
    }

  add() {
    this.edit(null);
  }

  edit(ID: number) {
    const _this = this;
    const modalRef = this.modalService.open(CategoryEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    if (ID) {
      modalRef.componentInstance.ID = ID;
    }
    modalRef.result.then(function(){
        _this.reload();
    });
  }

  deleteCategory() {
    const _this = this;
    this.service.deleteCategory(this.category.ID, this.currentUser.UserId).subscribe((rs: any) => {
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
