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
{ path: '/s1', title: 'Dashboard2',  icon: 'dashboard', class: '', childrens: [
{ path: '/s1_1', title: 'Dashboard3',  icon: '', class: '' },
{ path: '/s1_2', title: 'Dashboard4',  icon: '', class: '' }
  ] },
{ path: '/s2', title: 'Dashboard5',  icon: 'dashboard', class: '', childrens: [
{ path: '/s2_1', title: 'Dashboard6',  icon: '', class: '' },
{ path: '/s2_2', title: 'Dashboard7',  icon: '', class: '' }
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
	this.miniItemList();
	this.dropParent.forEach(function(dp: any){
	   dp = false;
	});
	this.dropParent[index] = !this.dropParent[index];
  }
  miniItemList() {
        for(let i = 0; i < this.dropParent.length; i++) {
		let dropItem = document.getElementById('dropItem_' + i);
		if(dropItem) {
			$(dropItem).removeClass('icon-lenxuong-down');
		}
		let danhSachItems = document.getElementById('danhSachItems_' + i);
		if(danhSachItems) {
			$(danhSachItems).addClass('children-menu-item-none');
		}
		
	}
  }
}
