import { Component, OnInit } from '@angular/core';
import { Filter } from '../../../models/filter/filter';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { KhoanThu } from 'app/models/list/khoanthu';
import { KhoanThuService } from 'app/services/list/khoanthu.service';
import { KhoanthuEditComponent } from './khoanthu-edit/khoanthu-edit.component';

@Component({
  selector: 'app-khoanthu',
  templateUrl: './khoanthu.component.html',
  styleUrls: ['./khoanthu.component.scss']
})
export class KhoanthuComponent implements OnInit {

  KhoanThuList: KhoanThu[] = [];
  KhoanThu: KhoanThu;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSize:number = 20;
  constructor(public util: UtilsService, config: NgbModalConfig, private service: KhoanThuService, private router: Router, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
   }

  ngOnInit() {
    this.reload();
  }
  
  reload() {
    const filter: Filter = new Filter(this.searchTerm, this.pageIndex, this.pageSize);
    this.KhoanThuList = this.service.getKhoanThuList(filter);
  }
  add() {
    this.edit(null);
  }

  remove(KhoanThu: KhoanThu) {
    this.KhoanThu = KhoanThu;
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    modalRef.componentInstance.confirmObject = 'Collection';
    modalRef.componentInstance.decide.subscribe(() => {
	_this.service.deleteKhoanThu(KhoanThu.Id);
        _this.reload();
    });
  }
edit(khoanthuid: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(KhoanthuEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.KhoanThuId = khoanthuid;
    modalRef.result.then(function(result) {
        _this.reload();
    });
  }

}
