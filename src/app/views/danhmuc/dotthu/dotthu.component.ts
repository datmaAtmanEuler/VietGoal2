import { Component, OnInit } from '@angular/core';
import { Filter } from '../../../models/filter';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { DotThuService } from 'app/services/danhmuc/dothu.service';
import { DotThu } from 'app/models/danhmuc/dotthu';
import { DotthuEditComponent } from './dotthu-edit/dotthu-edit.component';

@Component({
  selector: 'app-dotthu',
  templateUrl: './dotthu.component.html',
  styleUrls: ['./dotthu.component.scss']
})
export class DotthuComponent implements OnInit {


  dotthuList: DotThu[] = [];
  DotThu: DotThu;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSize:number = 20;
  constructor(public util: UtilsService, config: NgbModalConfig, private service: DotThuService, private router: Router, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
   }

  ngOnInit() {
    this.reload();
  }
  
  reload() {
    const filter: Filter = new Filter(this.searchTerm, this.pageIndex, this.pageSize);
    this.dotthuList = this.service.getDotThuList(filter);
  }
  add() {
    this.edit(null);
  }

  remove(dotthu: DotThu) {
    this.DotThu = dotthu;
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    modalRef.componentInstance.confirmObject = 'TermOfCollection';
    modalRef.componentInstance.decide.subscribe(() => {
	_this.service.deleteDotThu(dotthu.Id);
        _this.reload();
    });
  }
edit(dothuId: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(DotthuEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.DotThuId = dothuId;
    modalRef.result.then(function(result) {
        _this.reload();
    });
  }

}
