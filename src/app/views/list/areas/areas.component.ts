import { Component, OnInit, ViewChild } from '@angular/core';
import { AreaService } from '../../../services/list/area.service';
import { CentralService } from '../../../services/manage/central.service';
import { Area } from '../../../models/list/area';
import { AreaEditComponent } from './area-edit/area-edit.component';
import { AreaFilter } from '../../../models/filter/areafilter';
import { CentralFilter } from '../../../models/filter/centralfilter';
import { Router } from '@angular/router'; 
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { ASCSort, SORD_DIRECTION } from 'app/models/sort';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { AreaImportComponent } from './area-import/area-import.component';
import { FormControl } from '@angular/forms';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {ModalDirective;
  areasList:any[] = [];
  area: any;
  centralsList: any[]=[];
  central: any;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSizesList: number[] = [5, 10, 20, 100];
  pageSize:number = this.pageSizesList[1];
  currentUser: any;
  isLoading: boolean = true;
  Total: any;
  firstRowOnPage: any;


  searchCentralsCtrl = new FormControl();

  filter: AreaFilter = new AreaFilter( this.searchTerm,this.pageIndex, this.pageSize,null, 'id','ASC');
  centralFilter: CentralFilter = new CentralFilter( this.searchTerm,this.pageIndex, this.pageSize,null, null, null, 'id','ASC');

  /**
   * BEGIN SORT SETTINGS
   */
  sort: ASCSort = new ASCSort();
  sortToggles: SORD_DIRECTION[] = [null, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, null];
  columnsName: string[] = ['Order', 'AreaCode', 'AreaName', 'Central', 'Action'];
  columnsNameMapping: string[] = ['id', 'AreaCode', 'AreaName', 'Central', 'Action'];
  sortAbles: boolean[] = [false, true, true, true, false];
  /**
   * END SORT SETTINGS
   */
  constructor(private translate: TranslateService, private matCus: MatPaginatorIntl,config: NgbModalConfig, public utilsService: UtilsService,
     private centralService: CentralService,private service: AreaService, private router: Router,
     private modalService: NgbModal) { 
      config.backdrop = 'static';
      config.keyboard = false;
      config.scrollable = false;
      this.updateMatTableLabel();
      translate.onLangChange.subscribe((a: any) => {
        this.updateMatTableLabel();
        matCus.changes.next();
      });
      utilsService.loadPaginatorLabels();
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
    
    this.reload();
    const vgscroll = <HTMLElement>document.querySelector('.vg-scroll');
    new PerfectScrollbar(vgscroll);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

    remove(area: Area) {
        this.area = area;
    	const _this = this;
    	const modalRef = this.modalService.open(ConfirmComponent, { windowClass: 'modal-confirm' });
    	modalRef.componentInstance.confirmObject = 'RegionsList';
    	modalRef.componentInstance.decide.subscribe(() => {
        	_this.deleteArea();
    	});
    }

    reload() {
      const _this = this;
      this.isLoading = true;
      _this.centralsList = [];
      this.centralService.getCentralsList(_this.centralFilter).subscribe(
          (response: any) => {
            const list = response.results ? response.results : [];
            _this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
            setTimeout(() => {
              _this.centralsList = (list) ? list : []; 
              _this.areasList = [];
              _this.service.getAreasList(_this.filter).subscribe(
                  (response: any) => {
                    const list = response.results ? response.results : [];
                    
                    _this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
                    setTimeout(() => {
                      _this.areasList = (list) ? list : [];
                      _this.isLoading = false;
                    }, 500);
                  },
                  (err: any) => {
                    _this.areasList = [];
                    _this.isLoading = false;
                  }
              );
            }, 500);
          },
          (err: any) => {
            _this.centralsList = [];
            _this.isLoading = false;
          }
      );
    }

  add() {
    this.edit(null);
  }

  edit(id: null | number) {
    const _this = this;
    const modalRef = _this.modalService.open(AreaEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    if (id) {
      modalRef.componentInstance.id = id;
      modalRef.componentInstance.UserId = _this.currentUser.UserId;
    }
    modalRef.result.then(function(){
      _this.reload();
  });
  }



  deleteArea() {
    const _this = this;
    this.service.deleteArea(this.area.id, this.currentUser.UserId).subscribe((res: any) => {
      _this.reload();
    });
  }
  pageEvent(variable: any){
    this.pageIndex = variable.pageIndex+1;
    this.pageSize = variable.pageSize;
    this.reload();
  }
  toggleSort(columnIndex: number): void {
    let toggleState =  this.sortToggles[columnIndex];
    switch(toggleState) {
      case SORD_DIRECTION.ASC: 
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
        toggleState = SORD_DIRECTION.ASC;
        break;
      }
    }
    this.sortToggles.forEach((s: string, index: number) => {
      if(index == columnIndex) {
        this.sortToggles[index] = this.sort.SortDirection = toggleState;
      } else {
        this.sortToggles[index] = SORD_DIRECTION.ASC;
      }
    });

    this.sort.SortName = (toggleState == SORD_DIRECTION.ASC) ? 'id' : this.columnsNameMapping[columnIndex];
    this.reload();
  }
  
  doNothing(): void {}

  displayCentralFn(central: any) {
    return central && central.CentralName && !central.notfound ? central.CentralName : '';
  }

changeCentral(centralId: number) {
    this.filter.CentralId = centralId;
    this.service.getAreasList(this.filter).subscribe((list) => {
      this.areasList = list;
      this.reload();
    });
  }

  openImport() {
    const _this = this;
    const modalRef = this.modalService.open(AreaImportComponent, { size: 'lg' });
    modalRef.result.then(function(importModel: any){
    });
  }

  downloadTemplate() {
    var fileName = 'Areas_Import.xlsx';
    var a = document.createElement('a');
    a.href = this.service.getTemplate(fileName);
    a.download = fileName;
    document.body.append(a);
    a.click();
    a.remove();
  }
}
