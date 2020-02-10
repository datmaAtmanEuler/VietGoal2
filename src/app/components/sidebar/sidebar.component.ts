import { Component, OnInit, Output, EventEmitter } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    childrens?: RouteInfo[];
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
{ path: '/demo1', title: 'Demo 1',  icon: 'dashboard', class: ''},
{ path: '/nopath', title: 'MESSAGE.NameList.Catalogs',  icon: 'dashboard', class: '', childrens: [
{ path: '/danhmuc/tinhthanh', title: 'MESSAGE.NameList.ProvincesList',  icon: '', class: '' }
  ] },
{ path: '/nopath', title: 'MESSAGE.NameList.Manage',  icon: 'dashboard', class: '', childrens: [
{ path: '/quanly/trungtam', title: 'MESSAGE.NameList.CentralManagement',  icon: '', class: '' }
  ] }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  mini: boolean = false;
  dropParent: boolean[] = [];
  @Output('sidebarUpdate') sidebarUpdate = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.dropParent = [];
    const _this = this;
    this.menuItems.forEach(function(mn: any){
	_this.dropParent.push(false);
    });

  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  toggle(){
	this.mini = !this.mini;
        this.sidebarUpdate.emit(this.mini);
  }
  xulyDropParents(index: number) {
	const _this = this;
	this.dropParent.forEach(function(dp: any, ind: number){
	   if(ind != index) {   	
	   	_this.dropParent[ind] = false;
	   } else {
	   	_this.dropParent[ind] = !_this.dropParent[ind];
	   }
	});	
  }
}
