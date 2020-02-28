import { Component, OnInit, ViewChild } from '@angular/core';
import { KpiConfigService } from '../../../services/manage/kpiconfig.service';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';

import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ASCSort, SORD_DIRECTION } from 'app/models/sort';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { KpiConfigEditComponent } from './kpiconfig-edit/kpiconfig-edit.component';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'app-kpiconfigs',
  templateUrl: './kpiconfigs.component.html',
  styleUrls: ['./kpiconfigs.component.scss']
})
export class KpiConfigsComponent implements OnInit {
  kpiConfigsList: any[] = [];
  kpiConfig: any = {};
  searchTerm: string = '';
  pageSizesList: number[] = [5, 10, 20, 100];
  pageSize: number = this.pageSizesList[2];
  pageSizeFilter: number = this.pageSizesList[2];
  currentUser: any;
  Total: number;
  isLoading = false;
  /**
  * BEGIN SORT SETTINGS
  */
  paginationSettings: any = {
    sort: new ASCSort(),
    sortToggles: [
      null,
      SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC, SORD_DIRECTION.ASC,
      null
    ],
    columnsName: ['Order', 'CoachAmount', 'StudentAmountMin', 'StudentAmountMax', 'Kpi', 'Action'],
    columnsNameMapping: ['id', 'coachAmount', 'studentAmountMin', 'studentAmountMax', 'kpi', ''],
    sortAbles: [false, true, true, true, true, false],
    visibles: [true, true, true, true, true, true]
  };
  /**
   * END SORT SETTINGS
   */
  filter: any = {
	searchTerm: '',
	pageIndex: 1,
	pageSize: 20,
	sortName: this.paginationSettings.sort.SortName,
	sortDirection: this.paginationSettings.sort.SortDirection
  };

  constructor(public utilsService: UtilsService, config: NgbModalConfig, private service: KpiConfigService, private router: Router, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    utilsService.loadPaginatorLabels();
  }
  ngOnInit() {
    this.reload();
    const vgscroll = <HTMLElement>document.querySelector('.vg-scroll');
    new PerfectScrollbar(vgscroll);
  }

  remove(kpiConfig: any) {
    this.kpiConfig = kpiConfig;
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { windowClass: 'modal-confirm' });
    modalRef.componentInstance.confirmObject = 'KpiConfig';
    modalRef.componentInstance.decide.subscribe(() => {
      _this.service.deleteKpiConfig(kpiConfig.id).subscribe(() => {
        _this.reload();
      });
    });
  }
  pageEvent(variable: any) {
    this.reload();
  }
  
  reload() {
    this.isLoading = true;
    this.kpiConfigsList = [];
    this.service.getKpiConfigsList(this.filter).subscribe((list: any) => {
      this.Total = (list && list.rowCount) ? list.rowCount : 0;
      setTimeout(() => {
        this.isLoading = false;
        this.kpiConfigsList = list.results || [];
      }, 500);
    });
  }
  add() {
    this.edit(0);
  }

  edit(kpiConfigId: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(KpiConfigEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.KpiConfigId = kpiConfigId;
    modalRef.result.then(function (result) {
      _this.reload();
    });
  }
}
