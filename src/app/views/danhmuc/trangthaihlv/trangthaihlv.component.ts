import { Component, OnInit } from '@angular/core';
import { Filter } from '../../../models/filter';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TrangThaiHLV } from 'app/models/danhmuc/trangthaihlv';
import { TrangThaiHLVService } from 'app/services/danhmuc/trangthaihlv.service';
import { TrangthaihlvEditComponent } from './trangthaihlv-edit/trangthaihlv-edit.component';
@Component({
  selector: 'app-trangthaihlv',
  templateUrl: './trangthaihlv.component.html',
  styleUrls: ['./trangthaihlv.component.scss']
})
export class TrangthaihlvComponent implements OnInit {

  TrangThaiHLVList: TrangThaiHLV[] = [];
  TrangThaiHLV: TrangThaiHLV;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSize:number = 20;
  constructor(public util: UtilsService, config: NgbModalConfig, private service: TrangThaiHLVService, private router: Router, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
   }

  ngOnInit() {
    this.reload();
  }
  
  reload() {
    const filter: Filter = new Filter(this.searchTerm, this.pageIndex, this.pageSize);
    this.TrangThaiHLVList = this.service.getTrangThaiHLVList(filter);
  }
  add() {
    this.edit(null);
  }

  remove(TrangThaiHLV: TrangThaiHLV) {
    this.TrangThaiHLV = TrangThaiHLV;
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    modalRef.componentInstance.confirmObject = 'Coach State';
    modalRef.componentInstance.decide.subscribe(() => {
	_this.service.deleteTrangThaiHLV(TrangThaiHLV.Id);
        _this.reload();
    });
  }
edit(TrangThaiHLVid: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(TrangthaihlvEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.trangthaiHLVId = TrangThaiHLVid;
    modalRef.result.then(function(result) {
        _this.reload();
    });
  }
}
