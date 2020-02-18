import { Component, OnInit } from '@angular/core';
import { Filter } from '../../../models/filter/filter';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { PositionService } from 'app/services/list/position.service';
import { Position } from 'app/models/list/position';
import { PositionEditComponent } from './position-edit/position-edit.component';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {
  positionList: Position[] = [];
  Position: Position;
  searchTerm: string = '';
  pageIndex: number = 1;
  currentUser: any;
  pageSize: number = 20;
  Total:number;
  loading: boolean;
  constructor(public util: UtilsService, config: NgbModalConfig, private service: PositionService, private router: Router, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.reload();
  }

  remove(Position: Position) {
    this.Position = Position;
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    modalRef.componentInstance.confirmObject = 'Position';
    modalRef.componentInstance.decide.subscribe(() => {
      _this.service.deletePosition(Position.Id, this.currentUser.UserId).subscribe(()=>{
        _this.reload();
      });
    });
  }
  reload() {
    const filter: Filter = new Filter(this.searchTerm, this.pageIndex, this.pageSize);
    // this.PositionList = this.service.getPositionList(filter);
    this.loading = true;
    this.positionList = [];
    this.service.getPositionList(filter).subscribe((list: any) => {
      this.Total = (list && list[0]) ? list[0].Total : 0;
      setTimeout(() => {
        this.loading = false;
        this.positionList = list || [];
      }, 500);
    });
  }
  add() {
    this.edit(null);
  }

  edit(PositionId: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(PositionEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.PositionId = PositionId;
    modalRef.result.then(function (result) {
      _this.reload();
    });
  }
}
