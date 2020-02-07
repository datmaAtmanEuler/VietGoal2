import { Component, OnInit, ViewChild } from '@angular/core';
import { Filter } from '../../../models/filter';
import { Trungtam } from '../../../models/quanly/trungtam';
import { TrungtamService } from '../../../services/quanly/trungtam.service';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';

import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TrungtamaddoreditComponent } from './trungtamaddoredit/trungtamaddoredit.component';

@Component({
  selector: 'app-trungtam',
  templateUrl: './trungtam.component.html',
  styleUrls: ['./trungtam.component.scss']
})
export class TrungtamComponent implements OnInit {
  trungtamList:Trungtam[] = [];
  trungtam: Trungtam;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSize:number = 20;
  constructor(public util: UtilsService, config: NgbModalConfig, private service: TrungtamService, private router: Router, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
   }

  ngOnInit() {
    this.reload();
  }

  remove(trungtam: Trungtam) {
    this.trungtam = trungtam;
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    modalRef.componentInstance.confirmObject = 'Central';
    modalRef.componentInstance.decide.subscribe(() => {
	_this.service.deleteTrungtam(trungtam.Id);
        _this.reload();
    });
  }
  reload() {
    const filter: Filter = new Filter(this.searchTerm, this.pageIndex, this.pageSize);
    this.trungtamList = this.service.getTrungtamsList(filter);
  }
  add() {
    this.edit(null);
  }

  edit(TrungtamId: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(TrungtamaddoreditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.trungtamId = TrungtamId;
    modalRef.result.then(function(result) {
	_this.service.deleteTrungtam(TrungtamId);
        _this.reload();
    });
  }
}
