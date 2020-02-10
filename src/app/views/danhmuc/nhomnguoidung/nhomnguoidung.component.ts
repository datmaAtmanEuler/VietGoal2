import { Component, OnInit} from '@angular/core';
import { NhomNguoiDungService } from '../../../services/danhmuc/nhomnguoidung.service';
import { NhomNguoiDung } from '../../../models/danhmuc/nhomnguoidung';
import { Filter } from '../../../models/filter';
import { Router } from '@angular/router'; 
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NhomNguoiDungEditComponent } from './nhomnguoidungedit/nhomnguoidungedit.component';

@Component({
  selector: 'app-nhomnguoidung',
  templateUrl: './nhomnguoidung.component.html',
  styleUrls: ['./nhomnguoidung.component.scss']
})
export class NhomNguoiDungComponent implements OnInit {

  NhomNguoiDungList:NhomNguoiDung[] = [];
  nhomnguoidung: NhomNguoiDung;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSize:number = 20;
  constructor(config: NgbModalConfig, private service: NhomNguoiDungService, private router: Router, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
   }

  ngOnInit() {
	this.reload();
  }

  remove(nhomnguoidung: NhomNguoiDung) {
    this.nhomnguoidung = nhomnguoidung;
  const _this = this;
  const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
  modalRef.componentInstance.confirmObject = 'NhomNguoiDung';
  modalRef.componentInstance.decide.subscribe(() => {
      _this.deleteNhom();
  });
}

  reload() {
	const filter: Filter = new Filter(this.searchTerm, this.pageIndex, this.pageSize);
  this.NhomNguoiDungList = this.service.getNhomList(filter);
  }

  add() {
    this.edit(null);
  }

  edit(IdNhom: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(NhomNguoiDungEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    if (IdNhom) {
      modalRef.componentInstance.Idnhom = IdNhom;
    }
    modalRef.result.then(function(){
        _this.reload();
    });
  }


  deleteNhom() {
    this.service.deleteNhom(this.nhomnguoidung.IdNhom);
    this.reload();
  }
}
