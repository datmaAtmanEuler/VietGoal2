import { Component, OnInit } from '@angular/core';
import { Filter } from '../../../models/filter/filter';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TrangThaiHocVien } from 'app/models/danhmuc/trangthaihocvien';
import { TrangThaiHocVienService } from 'app/services/danhmuc/trangthaihocvien.service';
import { TrangthaihocvieneditComponent } from './trangthaihocvienedit/trangthaihocvienedit.component';

@Component({
  selector: 'app-trangthaihocvien',
  templateUrl: './trangthaihocvien.component.html',
  styleUrls: ['./trangthaihocvien.component.scss']
})
export class TrangthaihocvienComponent implements OnInit {

  TrangThaiHocVienList: TrangThaiHocVien[] = [];
  TrangThaiHocVien: TrangThaiHocVien;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSize:number = 20;
  constructor(public util: UtilsService, config: NgbModalConfig, private service: TrangThaiHocVienService, private router: Router, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
   }

  ngOnInit() {
    this.reload();
  }
  
  reload() {
    const filter: Filter = new Filter(this.searchTerm, this.pageIndex, this.pageSize);
    this.TrangThaiHocVienList = this.service.getTrangThaiHocVienList(filter);
  }
  add() {
    this.edit(null);
  }

  remove(TrangThaiHocVien: TrangThaiHocVien) {
    this.TrangThaiHocVien = TrangThaiHocVien;
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    modalRef.componentInstance.confirmObject = 'Students State';
    modalRef.componentInstance.decide.subscribe(() => {
	_this.service.deleteTrangThaiHocVien(TrangThaiHocVien.Id);
        _this.reload();
    });
  }
edit(TrangThaiHocVienid: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(TrangthaihocvieneditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.trangthaihocvienId = TrangThaiHocVienid;
    modalRef.result.then(function(result) {
        _this.reload();
    });
  }
}
