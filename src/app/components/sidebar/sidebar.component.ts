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
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  {
    path: '/controlmanagement/categories', title: 'MESSAGE.NameList.ControlManagement', icon: 'view_list', class: '', childrens: [
      { path: '/controlmanagement/categories', title: 'MESSAGE.NameList.Catalogs', icon: '', class: '' }
    ]
  },
  {
    path: '/danhmuc/tinhthanh', title: 'MESSAGE.NameList.Catalogs', icon: 'view_list', class: '', childrens: [
      { path: '/danhmuc/tinhthanh', title: 'MESSAGE.NameList.ProvincesList', icon: '', class: '' },
      { path: '/danhmuc/quanhuyen', title: 'MESSAGE.NameList.DistrictsList', icon: '', class: '' },
      { path: '/danhmuc/phuongxa', title: 'MESSAGE.NameList.CommunesWardsList', icon: '', class: '' },
      { path: '/danhmuc/nhomnguoidung', title: 'MESSAGE.NameList.AdministrationOfUserGroups', icon: '', class: '' },
      { path: '/danhmuc/santap', title: 'MESSAGE.NameList.ManagingTrainingGround', icon: '', class: '' },
      { path: '/danhmuc/chucvu', title: 'MESSAGE.NameList.PositionsList', icon: '', class: '' },
      { path: '/danhmuc/trangthailophoc', title: 'MESSAGE.NameList.ClassStatusList', icon: '', class: '' },
      { path: '/danhmuc/trangthaihocvien', title: 'MESSAGE.NameList.StudentStatusList', icon: '', class: '' },
      { path: '/danhmuc/trangthaihlv', title: 'MESSAGE.NameList.CoachStatusList', icon: '', class: '' },
      { path: '/danhmuc/dotthu', title: 'MESSAGE.NameList.TermOfCollectionsList', icon: '', class: '' },
      { path: '/danhmuc/khoanthu', title: 'MESSAGE.NameList.CollectionsList', icon: '', class: '' },
      { path: '/danhmuc/luatuoi', title: 'MESSAGE.NameList.AgesList', icon: '', class: '' },
      { path: '/danhmuc/baitap', title: 'MESSAGE.NameList.YardArea', icon: '', class: '' },
      { path: '/danhmuc/khuvuc', title: 'MESSAGE.NameList.RegionsList', icon: '', class: '' },
      { path: '/danhmuc/kqchieusinh', title: 'MESSAGE.NameList.EnrollmentResultsList', icon: '', class: '' }
    ]
  },
  {
    path: '/quanly/trungtam', title: 'MESSAGE.NameList.Manage', icon: 'assignment_ind', class: '', childrens: [
      { path: '/quanly/trungtam', title: 'MESSAGE.NameList.CentralManagement', icon: '', class: '' },
      { path: '/quanly/thoikhoabieu', title: 'MESSAGE.NameList.Schedule', icon: '', class: '' },
      { path: '/quanly/class', title: 'MESSAGE.NameList.ClassManagement', icon: '', class: '' },
      { path: '/quanly/decentralize-user', title: 'MESSAGE.NameList.DecentralizeUser', icon: '', class: '' },
      { path: '/quanly/ngaynghi', title: 'MESSAGE.NameList.CoachAbsent', icon: '', class: '' },
      { path: '/quanly/recruit-student', title: 'Danh sách học sinh chiêu sinh', icon: '', class: '' },
      { path: '/quanly/decentralize-data', title: 'MESSAGE.NameList.DataDecentralization', icon: '', class: '' },
      { path: '/quanly/nghiphep', title: 'MESSAGE.NameList.CoachAbsent', icon: '', class: '' },
      { path: '/quanly/schedule', title: 'MESSAGE.NameList.Schedule', icon: '', class: '' },
      { path: '/quanly/coachschedules', title: 'MESSAGE.NameList.CoachSchedule', icon: '', class: '' },
      { path: '/quanly/hosohocsinh', title: 'MESSAGE.NameList.StudentProfile', icon: '', class: '' },
      { path: '/quanly/dangky-hocsinh', title: 'Danh sách học sinh đăng ký', icon: '', class: '' }
    ]
  },
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

  constructor() {
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.dropParent = [];
    const _this = this;
    this.menuItems.forEach(function (mn: any) {
      _this.dropParent.push(false);
    });

  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  toggle() {
    this.mini = !this.mini;
    this.sidebarUpdate.emit(this.mini);
  }

  xulyDropParents(index: number) {
    const _this = this;
    this.dropParent.forEach(function (dp: any, ind: number) {
      if (ind != index) {
        _this.dropParent[ind] = false;
      } else {
        _this.dropParent[ind] = !_this.dropParent[ind];
      }
    });
  }
}
