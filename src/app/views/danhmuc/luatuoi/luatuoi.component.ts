import { Component, OnInit } from '@angular/core';
import { Filter } from '../../../models/filter/filter';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { LuaTuoi } from 'app/models/danhmuc/luatuoi';
import { LuaTuoiService } from 'app/services/danhmuc/luatuoi.service';
import { LuatuoiEditComponent } from './luatuoi-edit/luatuoi-edit.component';

@Component({
  selector: 'app-luatuoi',
  templateUrl: './luatuoi.component.html',
  styleUrls: ['./luatuoi.component.scss']
})
export class LuatuoiComponent implements OnInit {

  LuaTuoiList: LuaTuoi[] = [];
  LuaTuoi: LuaTuoi;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSize:number = 20;
  constructor(public util: UtilsService, config: NgbModalConfig, private service: LuaTuoiService, private router: Router, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
   }

  ngOnInit() {
    this.reload();
  }
  
  reload() {
    const filter: Filter = new Filter(this.searchTerm, this.pageIndex, this.pageSize);
    this.LuaTuoiList = this.service.getLuaTuoiList(filter);
  }
  add() {
    this.edit(null);
  }

  remove(LuaTuoi: LuaTuoi) {
    this.LuaTuoi = LuaTuoi;
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    modalRef.componentInstance.confirmObject = 'Age';
    modalRef.componentInstance.decide.subscribe(() => {
	_this.service.deleteLuaTuoi(LuaTuoi.Id);
        _this.reload();
    });
  }
edit(LuaTuoiid: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(LuatuoiEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.LuaTuoiId = LuaTuoiid;
    modalRef.result.then(function(result) {
        _this.reload();
    });
  }
}
