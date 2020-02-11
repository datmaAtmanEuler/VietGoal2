import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Filter } from '../../../models/filter';
import { Router } from '@angular/router';

import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { KQChieuSinhService } from '../../../services/danhmuc/kqchieusinh.service';
import { KQChieuSinhEditComponent } from './kqchieusinhedit/kqchieusinhedit.component';
import { KetQuaChieuSinh } from '../../../models/danhmuc/kqchieusinh';

@Component({
  selector: 'app-kqchieusinh',
  templateUrl: './kqchieusinh.component.html',
  styleUrls: ['./kqchieusinh.component.scss']
})
export class KQChieuSinhComponent implements OnInit {
  KQChieuSinhList:KetQuaChieuSinh[] = [];
  kqchieusinh: KetQuaChieuSinh;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSize:number = 20;
  constructor(config: NgbModalConfig,private service: KQChieuSinhService, private router: Router, private modalService: NgbModal, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.reload();
  }

  
  remove(kqchieusinh: KetQuaChieuSinh) {
    this.kqchieusinh = kqchieusinh;
  const _this = this;
  const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
  modalRef.componentInstance.confirmObject = 'NhomNguoiDung';
  modalRef.componentInstance.decide.subscribe(() => {
      _this.deleteKQ();
  });
}
  reload() {
    const filter: Filter = new Filter(this.searchTerm, this.pageIndex, this.pageSize);
    this.KQChieuSinhList = this.service.getKQChieuSinhList(filter);
  }
  add() {
    this.edit(null);
  }

  edit(KQChieuSinhId: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(KQChieuSinhEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    if (KQChieuSinhId) {
      modalRef.componentInstance.ketquachieusinhId = KQChieuSinhId;
    }
    modalRef.result.then(function(){
      _this.reload();
  });
  }
  deleteKQ() {
    this.service.deleteKetQuaChieuSinh(this.kqchieusinh.IdKQ);
    this.reload();
  }
}
