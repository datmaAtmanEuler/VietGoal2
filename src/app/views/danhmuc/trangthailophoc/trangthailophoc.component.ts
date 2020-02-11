import { Component, OnInit } from '@angular/core';
import { Filter } from '../../../models/filter/filter';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TrangThaiLopHoc } from 'app/models/danhmuc/trangthailophoc';
import { TrangThaiLopHocService } from 'app/services/danhmuc/trangthailophoc.service';
import { TrangthailophoceditComponent } from './trangthailophocedit/trangthailophocedit.component';

@Component({
  selector: 'app-trangthailophoc',
  templateUrl: './trangthailophoc.component.html',
  styleUrls: ['./trangthailophoc.component.scss']
})
export class TrangthailophocComponent implements OnInit {

  TrangThaiLopHocList: TrangThaiLopHoc[] = [];
  TrangThaiLopHoc: TrangThaiLopHoc;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSize:number = 20;
  constructor(public util: UtilsService, config: NgbModalConfig, private service: TrangThaiLopHocService, private router: Router, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
   }

  ngOnInit() {
    this.reload();
  }
  
  reload() {
    const filter: Filter = new Filter(this.searchTerm, this.pageIndex, this.pageSize);
    this.TrangThaiLopHocList = this.service.getTrangThaiLopHocList(filter);
  }
  add() {
    this.edit(null);
  }

  remove(TrangThaiLopHoc: TrangThaiLopHoc) {
    this.TrangThaiLopHoc = TrangThaiLopHoc;
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    modalRef.componentInstance.confirmObject = 'ClassStatus';
    modalRef.componentInstance.decide.subscribe(() => {
	_this.service.deleteTrangThaiLopHoc(TrangThaiLopHoc.Id);
        _this.reload();
    });
  }
edit(TrangThaiLopHocid: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(TrangthailophoceditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.trangthailophocId = TrangThaiLopHocid;
    modalRef.result.then(function(result) {
        _this.reload();
    });
  }
}
