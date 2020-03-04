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
import { CommonFilter } from 'app/models/filter/commonfilter';

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
  searchAdvanced : boolean = false;

  searchCentralsCtrl = new FormControl();

  mainfilter = new CommonFilter();
  centralFilter: CentralFilter = new CentralFilter( this.searchTerm,this.pageIndex, this.pageSize,0, 0, 0, 'id','ASC');

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
    columnsName: ['Order', 'AreaCode', 'AreaName', 'Central', 'Action'],
    columnsNameMapping: ['id', 'areaCode', 'areaName', 'centralName', ''],
    sortAbles: [false, true, true, true, false],
    visibles:  [true, true, true, true, true]
  }
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
    this.mainfilter.PageIndex = 1;
    this.mainfilter.PageSize = this.pageSizesList[1];
    this.centralService.getCentralsList(this.centralFilter).subscribe((response)=>{
      this.centralsList = response.results;
    });
    this.reload();
    const vgscroll = <HTMLElement>document.querySelector('.vg-scroll');

    new PerfectScrollbar(vgscroll);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

    remove(id : any) {
    	const _this = this;
    	const modalRef = this.modalService.open(ConfirmComponent, { windowClass: 'modal-confirm' });
    	modalRef.componentInstance.confirmObject = 'RegionsList';
    	modalRef.componentInstance.decide.subscribe(() => {
        this.service.deleteArea(id).subscribe(()=>{
          _this.reload()
        })
    	});
    }

    reload() {
      const _this = this;
      this.isLoading = true;
      this.mainfilter.SortName = this.paginationSettings.sort.SortName;
      this.mainfilter.SortDirection = this.paginationSettings.sort.SortDirection;
      this.centralService.getCentralsList(this.mainfilter).subscribe(
          (response: any) => {
            const list = response.results ? response.results : [];
            _this.Total = (response && response.rowCount) ? response.rowCount : 0;
            _this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
                    setTimeout(() => {
                      _this.centralsList = (list) ? list : [];
                      _this.isLoading = false;
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
    }
    modalRef.result.then(function(){
      _this.reload();
  });
  }



  pageEvent(variable: any){
    this.pageIndex = variable.pageIndex+1;
    this.pageSize = variable.pageSize;
    this.reload();
  }
  
  doNothing(): void {}
  displayCentralFn(central: any) {
    return central && central.centralName && !central.notfound ? central.centralName : '';
  }

changeCentral(centralId: number) {
  this.mainfilter.CentralId = centralId;
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
