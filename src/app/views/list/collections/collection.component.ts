import { Component, OnInit } from '@angular/core';
import { Filter } from '../../../models/filter/filter';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CollectionService } from 'app/services/list/collection.service';
import { Collection } from 'app/models/list/collection';
import { CollectionEditComponent } from './collection-edit/collection-edit.component';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {


  CollectionList: Collection[] = [];
  Collection: Collection;
  loading: boolean;
  currentUser: any;
  Total: any;
  searchTerm: string = '';
  pageIndex: number = 1;
  pageSize: number = 20;
  constructor(public util: UtilsService, config: NgbModalConfig, private service: CollectionService, private router: Router, private modalService: NgbModal) {
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
    // this.CollectionList = this.service.getCollectionList(filter);
    this.loading = true;
    this.CollectionList = [];
    this.service.getCollectionList(filter).subscribe((list: any) => {
      this.Total = (list && list[0]) ? list[0].Total : 0;
      setTimeout(() => {
        this.loading = false;
        this.CollectionList = list || [];
      }, 500);
    });
  }
  add() {
    this.edit(null);
  }

  remove(Collection: Collection) {
    this.Collection = Collection;
    const _this = this;
    const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
    modalRef.componentInstance.confirmObject = 'TermOfCollection';
    modalRef.componentInstance.decide.subscribe(() => {
      _this.service.deleteCollection(Collection.Id, this.currentUser.UserId).subscribe(() => {
        _this.reload();
      });
    });
  }
  edit(dothuId: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(CollectionEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    modalRef.componentInstance.CollectionId = dothuId;
    modalRef.result.then(function (result) {
      _this.reload();
    });
  }

}
