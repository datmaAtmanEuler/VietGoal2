import { Component, OnInit, ViewChild } from '@angular/core';
import { SanTapService } from '../../../services/danhmuc/santap.service';
import { UtilsService } from '../../../services/utils.service';
import { SanTap } from '../../../models/danhmuc/santap';
import { Filter } from '../../../models/filter/filter';
import { Router } from '@angular/router'; 
import { NgbModal,NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { SanTapEditComponent } from './santapedit/santapedit.component';
@Component({
  selector: 'app-santap',
  templateUrl: './santap.component.html',
  styleUrls: ['./santap.component.scss']
})
export class SanTapComponent implements OnInit {
  santapList:SanTap[] = [];
  santap: SanTap;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSize:number = 20;

  constructor(config: NgbModalConfig,public util: UtilsService, private service: SanTapService, private modalService: NgbModal, private router: Router) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
   }

  ngOnInit() {
	this.reload();
  }

  remove(santap: SanTap) {
    this.santap = santap;
  const _this = this;
  const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
  modalRef.componentInstance.confirmObject = 'SanTap';
  modalRef.componentInstance.decide.subscribe(() => {
      _this.deleteSanTap();
  });
}
  reload() {
	const filter: Filter = new Filter(this.searchTerm, this.pageIndex, this.pageSize);
  this.santapList = this.service.getSanTapList(filter);
   
  }

  add() {
    this.edit(null);
  }

  edit(IdSanTap: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(SanTapEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    if (IdSanTap) {
      modalRef.componentInstance.IdSanTap = IdSanTap;
    }
    modalRef.result.then(function(){
      _this.reload();
  });
  }

  deleteSanTap() {
    this.service.deleteSanTap(this.santap.IdSanTap);
    this.reload();
  }
}
