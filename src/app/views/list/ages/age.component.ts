import { Component, OnInit } from '@angular/core';
import { Filter } from '../../../models/filter/filter';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Age } from 'app/models/list/age';
import { AgeService } from 'app/services/list/age.service';
import { AgeEditComponent } from './age-edit/age-edit.component';

@Component({
  selector: 'app-age',
  templateUrl: './age.component.html',
  styleUrls: ['./age.component.scss']
})
export class AgeComponent implements OnInit {

  AgeList: Age[] = [];
  Age: Age;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSize:number = 20;
  currentUser: any;
  loading: boolean;
  Total: any;
  constructor(public util: UtilsService, config: NgbModalConfig, private service: AgeService, private router: Router, private modalService: NgbModal) {
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
    this.AgeList = [];
    this.service.getAgeList(filter).subscribe((list: any) => {
      this.Total = (list && list[0]) ? list[0].Total : 0;
      setTimeout(() => {
        this.loading = false;
        this.AgeList = list || [];
      }, 500);
    });
  }
  add() {
    this.edit(null);
  }

  remove(Age: Age) {
    this.Age = Age;
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    modalRef.componentInstance.confirmObject = 'Age';
    modalRef.componentInstance.decide.subscribe(() => {
      _this.service.deleteAge(Age.Id, this.currentUser.UserId).subscribe(() => {
        _this.reload();
      });
    });
  }
edit(Ageid: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(AgeEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.AgeId = Ageid;
    modalRef.result.then(function(result) {
        _this.reload();
    });
  }
}
