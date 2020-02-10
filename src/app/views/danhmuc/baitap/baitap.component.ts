import { Component, OnInit, ViewChild } from '@angular/core';
import { BaiTapService } from '../../../services/danhmuc/baitap.service';
import { BaiTap } from '../../../models/danhmuc/baitap';
import { BaiTapEditComponent } from './baitapedit/baitapedit.component';
import { Filter } from '../../../models/filter';
import { Router } from '@angular/router'; 
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-baitap',
  templateUrl: './baitap.component.html',
  styleUrls: ['./baitap.component.scss']
})
export class BaiTapComponent implements OnInit {ModalDirective;
  baitapList:BaiTap[] = [];
  baitap: BaiTap;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSize:number = 20;
  constructor(config: NgbModalConfig, private service: BaiTapService, private router: Router, private modalService: NgbModal) { 
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
  }

  ngOnInit() {
	this.reload();
  }

    remove(baitap: BaiTap) {
        this.baitap = baitap;
    	const _this = this;
    	const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    	modalRef.componentInstance.confirmObject = 'BaiTap';
    	modalRef.componentInstance.decide.subscribe(() => {
        	_this.deleteBaiTap();
    	});
    }


    reload() {
    	const filter: Filter = new Filter(this.searchTerm, this.pageIndex, this.pageSize);
      this.baitapList = this.service.getBaiTapList(filter);
    }

  add() {
    this.edit(null);
  }

  edit(IdBaiTap: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(BaiTapEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    if (IdBaiTap) {
      modalRef.componentInstance.Idbaitap = IdBaiTap;
    }
    modalRef.result.then(function(){
        _this.reload();
    });
  }

  deleteBaiTap() {
    this.service.deleteBaiTap(this.baitap.IdBaiTap);
    this.reload();
  }
}
