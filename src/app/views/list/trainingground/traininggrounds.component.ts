import { Component, OnInit, ViewChild } from '@angular/core';
import { TrainingGroundService } from '../../../services/list/training-ground.service';
import { TrainingGround } from '../../../models/list/training-ground';
import { TrainingGroundEditComponent } from './trainningground-edit/trainingground-edit.component';
import { TrainingGroundFilter } from '../../../models/filter/trainingroundfilter';
import { Router } from '@angular/router'; 
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ASCSort, SORD_DIRECTION } from 'app/models/sort';

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
  pageSize:number = 20;
  currentUser: any;

  /**
   * BEGIN SORT SETTINGS
   */
  sort: ASCSort = new ASCSort();
  sortToggles: SORD_DIRECTION[] = [null, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT, SORD_DIRECTION.DEFAULT,SORD_DIRECTION.DEFAULT, null];
  columnsName: string[] = ['Order', 'YardAreaCode','TrainingGroundName', 'YardName', 'AreaName','Address','Note','Action'];
  columnsNameMapping: string[] = ['ID', 'YardAreaCode','TrainingGroundName', 'YardName', 'AreaName','Address','Note','Action'];
  sortAbles: boolean[] = [false, true, true, true,true,true,true, false];
  /**
   * END SORT SETTINGS
   */
  constructor(config: NgbModalConfig, private service: TrainingGroundService, private router: Router, private modalService: NgbModal) { 
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  this.reload();
  
  }

  remove(traininground: TrainingGround) {
    this.traininground = traininground;
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    modalRef.componentInstance.confirmObject = 'TrainingGround';
    modalRef.componentInstance.decide.subscribe(() => {
        _this.deleteTraningGround();
    });
}

reload() {
  const _this = this;
  const filter: TrainingGroundFilter = new TrainingGroundFilter('', this.pageIndex, this.pageSize, null,null,'YardAreaCode','ASC');
  _this.service.getTrainingGroundsList(filter).subscribe((traininground: TrainingGround[]) => {
    _this.traininground = traininground;
  });
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
}

