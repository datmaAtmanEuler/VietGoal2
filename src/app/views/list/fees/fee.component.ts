import { Component, OnInit } from '@angular/core';
import { Filter } from '../../../models/filter/filter';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Fee } from 'app/models/list/fee';
import { FeeService } from 'app/services/list/fee.service';
import { FeeEditComponent } from './fee-edit/fee-edit.component';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.scss']
})
export class FeeComponent implements OnInit {

  FeeList: Fee[] = [];
  Fee: Fee;
  searchTerm: string = '';
  pageIndex: number = 1;
  pageSize: number = 20;
  loading: boolean;
  Total: any;
  currentUser: any;
  constructor(public util: UtilsService, config: NgbModalConfig, private service: FeeService, private router: Router, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.reload();
  }

  reload() {
    const filter: Filter = new Filter(this.searchTerm, this.pageIndex, this.pageSize);
    this.loading = true;
    this.FeeList = [];
    this.service.getFeeList(filter).subscribe((list: any) => {
      this.Total = (list && list[0]) ? list[0].Total : 0;
      setTimeout(() => {
        this.loading = false;
        this.FeeList = list || [];
      }, 500);
    });
  }
  add() {
    this.edit(null);
  }

  remove(Fee: Fee) {
    this.Fee = Fee;
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { windowClass: 'modal-confirm' });
    modalRef.componentInstance.confirmObject = 'Collection';
    modalRef.componentInstance.decide.subscribe(() => {
      _this.service.deleteFee(Fee.Id, this.currentUser.UserId).subscribe(() => {
        _this.reload();
      });
    });
  }
  edit(Feeid: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(FeeEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.FeeId = Feeid;
    modalRef.result.then(function (result) {
      _this.reload();
    });
  }

}
