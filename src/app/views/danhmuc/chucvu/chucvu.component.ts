import { Component, OnInit } from '@angular/core';
import { Filter } from '../../../models/filter/filter';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { ChucvuService } from 'app/services/danhmuc/chucvu.service';
import { Chucvu } from 'app/models/danhmuc/Chucvu';
import { ChucvuaddoreditComponent } from './chucvuaddoredit/chucvuaddoredit.component';

@Component({
  selector: 'app-chucvu',
  templateUrl: './chucvu.component.html',
  styleUrls: ['./chucvu.component.scss']
})
export class ChucvuComponent implements OnInit {
  chucvuList: Chucvu[] = [];
  chucvu: Chucvu;
  searchTerm: string = '';
  pageIndex: number = 1;
  currentUser: any;
  pageSize: number = 20;
  Total:number;
  loading: boolean;
  constructor(public util: UtilsService, config: NgbModalConfig, private service: ChucvuService, private router: Router, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.reload();
  }

  remove(chucvu: Chucvu) {
    this.chucvu = chucvu;
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    modalRef.componentInstance.confirmObject = 'Position';
    modalRef.componentInstance.decide.subscribe(() => {
      _this.service.deleteChucvu(chucvu.ID, this.currentUser.UserId).subscribe(()=>{
        _this.reload();
      });
    });
  }
  reload() {
    const filter: Filter = new Filter(this.searchTerm, this.pageIndex, this.pageSize);
    // this.chucvuList = this.service.getChucvuList(filter);
    this.loading = true;
    this.chucvuList = [];
    this.service.getChucvuList(filter).subscribe((list: any) => {
      this.Total = (list && list[0]) ? list[0].Total : 0;
      setTimeout(() => {
        this.loading = false;
        this.chucvuList = list || [];
      }, 500);
    });
  }
  add() {
    this.edit(null);
  }

  edit(chucvuId: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(ChucvuaddoreditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.chucvuId = chucvuId;
    modalRef.result.then(function (result) {
      _this.reload();
    });
  }
}
