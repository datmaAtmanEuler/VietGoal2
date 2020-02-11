import { Component, OnInit, ViewChild } from '@angular/core';
import { KhuvucService } from '../../../services/danhmuc/khuvuc.service';
import { KhuVuc } from '../../../models/danhmuc/khuvuc';
import { KhuVucEditComponent } from './khuvucedit/khuvucedit.component';
import { Filter } from '../../../models/filter';
import { Router } from '@angular/router'; 
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-khuvuc',
  templateUrl: './khuvuc.component.html',
  styleUrls: ['./khuvuc.component.scss']
})
export class KhuVucComponent implements OnInit {ModalDirective;
  khuvucList:KhuVuc[] = [];
  khuvuc: KhuVuc;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSize:number = 20;
  constructor(config: NgbModalConfig, private service: KhuvucService, private router: Router, private modalService: NgbModal) { 
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
  }

  ngOnInit() {
	this.reload();
  }

    remove(khuvuc: KhuVuc) {
        this.khuvuc = khuvuc;
    	const _this = this;
    	const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    	modalRef.componentInstance.confirmObject = 'RegionsList';
    	modalRef.componentInstance.decide.subscribe(() => {
        	_this.deleteKhuVuc();
    	});
    }


    reload() {
    	const filter: Filter = new Filter(this.searchTerm, this.pageIndex, this.pageSize);
      this.khuvucList = this.service.getKhuVucList(filter);
    }

  add() {
    this.edit(null);
  }

  edit(Idkhuvuc: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(KhuVucEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    if (Idkhuvuc) {
      modalRef.componentInstance.Idkhuvuc = Idkhuvuc;
    }
    modalRef.result.then(function(){
        _this.reload();
    });
  }

  deleteKhuVuc() {
    this.service.deleteKhuVuc(this.khuvuc.IdKhuvuc);
    this.reload();
  }
}
