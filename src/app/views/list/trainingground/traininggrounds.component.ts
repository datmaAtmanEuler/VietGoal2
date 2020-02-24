import { Component, OnInit, ViewChild } from '@angular/core';
import { TrainingGroundService } from '../../../services/list/training-ground.service';
import { TrainingGround } from '../../../models/list/training-ground';
import { TrainingGroundEditComponent } from './trainningground-edit/trainingground-edit.component';
import { TrainingGroundFilter } from '../../../models/filter/trainingroundfilter';
import { Router } from '@angular/router'; 
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ASCSort, SORD_DIRECTION } from 'app/models/sort';
import { MatPaginatorIntl } from '@angular/material/paginator';
import {TranslateService} from '@ngx-translate/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { TrainingGroundImportComponent } from './trainingground-import/trainingground-import.component';
@Component({
  selector: 'app-training-grounds',
  templateUrl: './traininggrounds.component.html',
  styleUrls: ['./traininggrounds.component.scss']
})
export class TrainingGroundsComponent implements OnInit {ModalDirective;
  trainingroundsList:TrainingGround[] = [];
  traininground: any;
  areasList:any[] = [];
  area: any;
  yardsList: any[]=[];
  yard: any;
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
  sortToggles: SORD_DIRECTION[] = [null, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT,SORD_DIRECTION.DEFAULT, null];
  columnsName: string[] = ['Order', 'TrainingGroundCode','TrainingGroundName', 'YardName','Address','Note','Action'];
  columnsNameMapping: string[] = ['ID', 'TrainingGroundCode','TrainingGroundName', 'YardName','Address','Note','Action'];
  sortAbles: boolean[] = [false, true, true, true,true,true, false];
  /**
   * END SORT SETTINGS
   */
  constructor(private matCus: MatPaginatorIntl,private translate: TranslateService,config: NgbModalConfig, private service: TrainingGroundService, 
    private router: Router, private modalService: NgbModal) { 
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

  remove(traininground: TrainingGround) {
    this.traininground = traininground;
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { windowClass: 'modal-confirm' });
    modalRef.componentInstance.confirmObject = 'TrainingGround';
    modalRef.componentInstance.decide.subscribe(() => {
        _this.deleteTraningGround();
    });
}

pageEvent(variable: any){
  this.pageIndex = variable.pageIndex+1;
  this.pageSize = variable.pageSize;
  this.reload();
}
reload() {
  const _this = this;
  const filter: TrainingGroundFilter = new TrainingGroundFilter( this.searchTerm,this.pageIndex, this.pageSize,null,null, 'Id','ASC');
  this.loading = true;
  _this.trainingroundsList = [];
  this.service.getTrainingGroundsList(filter).subscribe(
      (response: any) => {
        const list = response.results ? response.results : [];
        this.Total = (response && response.rowCount) ? response.rowCount : 0;
        this.firstRowOnPage = (response && response.firstRowOnPage) ? response.firstRowOnPage : 0;
        setTimeout(() => {
          _this.trainingroundsList = (list) ? list : [];
          _this.loading = false;
        }, 500);
      },
      (err: any) => {
        _this.trainingroundsList = [];
        _this.loading = false;
      }
  );
}


add() {
  this.edit(null);
}

edit(ID: null | number) {
  const _this = this;
  const modalRef = this.modalService.open(TrainingGroundEditComponent, { size: 'lg' });
  modalRef.componentInstance.popup = true;
  if (ID) {
    modalRef.componentInstance.ID = ID;
    modalRef.componentInstance.UserId = _this.currentUser.UserId;
  }
  modalRef.result.then(function(){
    _this.reload();
});
}

deleteTraningGround() {
  const _this = this;
  this.service.deleteTrainingGround(this.traininground.ID, this.currentUser.UserId).subscribe((res: any) => {
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
  const modalRef = this.modalService.open(TrainingGroundImportComponent, { size: 'lg' });
  modalRef.result.then(function(importModel: any){
     
  });
}

downloadTemplate() {
  var fileName = 'Districts_Import.xlsx';
  var a = document.createElement('a');
  a.href = this.service.getTemplate(fileName);
  a.download = fileName;
  document.body.append(a);
  a.click();
  a.remove();
}
}

