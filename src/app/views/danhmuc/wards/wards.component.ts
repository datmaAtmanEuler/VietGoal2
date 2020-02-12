import { Component, OnInit, ViewChild} from '@angular/core';
import { WardService } from '../../../services/danhmuc/ward.service';
import { Ward } from '../../../models/danhmuc/wards';
import { WardFilter } from '../../../models/filter/wardfilter';
import { Router } from '@angular/router'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WardEditComponent } from './wardedit/wardedit.component';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
@Component({
  selector: 'app-wards',
  templateUrl: './wards.component.html',
  styleUrls: ['./wards.component.scss']
})
export class WardsComponent implements OnInit {
  wardsList:Ward[] = [];
  ward: Ward;
  searchTerm:string = '';
  pageIndex:number = 1;
  pageSize:number = 20;
  currentUser: any;
  constructor(private modalService: NgbModal,private service: WardService, private router: Router) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
	  this.reload();
  }

  remove(ward: Ward) {
    this.ward = ward;
    const _this = this;
  const modalRef = this.modalService.open(ConfirmComponent, { size: 'lg' });
  modalRef.componentInstance.confirmObject = 'Ward';
  modalRef.componentInstance.decide.subscribe(() => {
      _this.deleteWard();
  });
}

  reload() {
    const _this = this
	const filter: WardFilter = new WardFilter(this.searchTerm, this.pageIndex, this.pageSize,null);
  this.service.getWardsList(filter).subscribe((list:any)=>{
    _this.wardsList = list;
  })
  }

  add() {
    this.edit(null);
  }

  edit(ID: null | number) {
    const _this = this;
    const modalRef = this.modalService.open(WardEditComponent, { size: 'lg' });
    modalRef.componentInstance.popup = true;
    if (ID) {
      modalRef.componentInstance.ID = ID;
      modalRef.componentInstance.UserId = _this.currentUser.UserId;
    }
    modalRef.result.then(function(){
      _this.reload();
  });
  }

  deleteWard() {
    const _this = this;
    this.service.deleteWard(this.ward.ID, this.currentUser.UserID).subscribe((rs:any)=>{
      this.reload();
    }); 
  }
}
