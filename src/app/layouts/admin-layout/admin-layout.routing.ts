import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { Demo1Component } from '../../views/demo1/demo1.component';
import { ProvincesComponent } from '../../views/list/provinces/provinces.component';
import { ProvinceEditComponent } from '../../views/list/provinces/provinceedit/provinceedit.component';
import { CentralComponent } from '../../views/manage/central/central.component';
import { CentralEditComponent  } from '../../views/manage/central/central-edit/central-edit.component';
import { DistrictsComponent } from '../../views/list/districts/districts.component';
import { DistrictEditComponent } from '../../views/list/districts/districtedit/districtedit.component';
import { WardsComponent } from '../../views/list/wards/wards.component';
import { WardEditComponent } from '../../views/list/wards/wardedit/wardedit.component';
import { NhomNguoiDungComponent } from '../../views/list/nhomnguoidung/nhomnguoidung.component';
import { NhomNguoiDungEditComponent } from '../../views/list/nhomnguoidung/nhomnguoidungedit/nhomnguoidungedit.component';
import { YardComponent } from '../../views/list/yard/yards.component';
import { YardEditComponent } from '../../views/list/yard/yard-edit/yard-edit.component';
import { ChucvuComponent } from 'app/views/list/chucvu/chucvu.component';
import { ChucvuaddoreditComponent } from 'app/views/list/chucvu/chucvuaddoredit/chucvuaddoredit.component';
import { DotthuComponent } from 'app/views/list/dotthu/dotthu.component';
import { DotthuEditComponent } from 'app/views/list/dotthu/dotthu-edit/dotthu-edit.component';
import { KhoanthuComponent } from 'app/views/list/khoanthu/khoanthu.component';
import { KhoanthuEditComponent } from 'app/views/list/khoanthu/khoanthu-edit/khoanthu-edit.component';
import { LuatuoiComponent } from 'app/views/list/luatuoi/luatuoi.component';
import { LuatuoiEditComponent } from 'app/views/list/luatuoi/luatuoi-edit/luatuoi-edit.component';
import { TrangthaihlvComponent } from 'app/views/list/trangthaihlv/trangthaihlv.component';
import { TrangthaihlvEditComponent } from 'app/views/list/trangthaihlv/trangthaihlv-edit/trangthaihlv-edit.component';
import { TrangthaihocvienComponent } from 'app/views/list/trangthaihocvien/trangthaihocvien.component';
import { TrangthaihocvieneditComponent } from 'app/views/list/trangthaihocvien/trangthaihocvienedit/trangthaihocvienedit.component';
import { TrangthailophocComponent } from 'app/views/list/trangthailophoc/trangthailophoc.component';
import { TrangthailophoceditComponent } from 'app/views/list/trangthailophoc/trangthailophocedit/trangthailophocedit.component';
import { TrainingGroundsComponent } from '../../views/list/trainingground/traininggrounds.component';
import { TrainingGroundEditComponent } from '../../views/list/trainingground/trainningground-edit/trainingground-edit.component';
import { AreaComponent } from '../../views/list/area/areas.component';
import { AreaEditComponent } from '../../views/list/area/area-edit/area-edit.component';
import { CategoriesComponent } from '../../views/controlmanagement/categories/categories.component';
import { CategoryEditComponent } from '../../views/controlmanagement/categories/categoryedit/categoryedit.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'danhmuc', children:
    [
      { path: 'tinhthanh',  children: [
        { path: '', component: ProvincesComponent },
        { path: 'add', component: ProvinceEditComponent },
        { path: 'edit', component: ProvinceEditComponent }
      ]},
      { path: 'quanhuyen',  children: [
        { path: '', component: DistrictsComponent },
        { path: 'add', component: DistrictEditComponent },
        { path: 'edit', component: DistrictEditComponent }
      ]},
      { path: 'phuongxa',  children: [
        { path: '', component: WardsComponent },
        { path: 'add', component: WardEditComponent },
        { path: 'edit', component: WardEditComponent }
      ]},
      { path: 'nhomnguoidung',  children: [
        { path: '', component: NhomNguoiDungComponent },
        { path: 'add', component: NhomNguoiDungEditComponent },
        { path: 'edit', component: NhomNguoiDungEditComponent }
      ]},
      { path: 'santap',  children: [
        { path: '', component: YardComponent },
        { path: 'add', component: YardEditComponent },
        { path: 'edit', component: YardEditComponent }
      ]},
      { path: 'chucvu',  children:
      [
        { path: '', component: ChucvuComponent },
        { path: 'add', component: ChucvuaddoreditComponent },
        { path: 'edit', component: ChucvuaddoreditComponent }
      ] },
      { path: 'trangthailophoc',  children:
      [
        { path: '', component: TrangthailophocComponent },
        { path: 'add', component: TrangthailophoceditComponent },
        { path: 'edit', component: TrangthailophoceditComponent }
      ] },
      { path: 'trangthaihocvien',  children:
      [
        { path: '', component: TrangthaihocvienComponent },
        { path: 'add', component: TrangthaihocvieneditComponent },
        { path: 'edit', component: TrangthaihocvieneditComponent }
      ] },
      { path: 'trangthaihlv',  children:
      [
        { path: '', component: TrangthaihlvComponent },
        { path: 'add', component: TrangthaihlvEditComponent },
        { path: 'edit', component: TrangthaihlvEditComponent }
      ] },
      { path: 'dotthu',  children:
      [
        { path: '', component: DotthuComponent },
        { path: 'add', component: DotthuEditComponent },
        { path: 'edit', component: DotthuEditComponent }
      ] },
      { path: 'khoanthu',  children:
      [
        { path: '', component: KhoanthuComponent },
        { path: 'add', component: KhoanthuEditComponent },
        { path: 'edit', component: KhoanthuEditComponent }
      ] },
      { path: 'luatuoi',  children:
      [
        { path: '', component: LuatuoiComponent },
        { path: 'add', component: LuatuoiEditComponent },
        { path: 'edit', component: LuatuoiEditComponent }
      ] },
      { path: 'baitap',  children:
      [
        { path: '', component: TrainingGroundsComponent },
        { path: 'add', component: TrainingGroundEditComponent },
        { path: 'edit', component: TrainingGroundEditComponent }
      ] },
      { path: 'khuvuc',  children:
      [
        { path: '', component: AreaComponent },
        { path: 'add', component: AreaEditComponent },
        { path: 'edit', component: AreaEditComponent }
      ] },
    ]
},
{ 
    path: 'quanly',
    children:[
      { 
        path: 'trungtam',
        children: [
          { path: '', component: CentralComponent },
          { path: 'add', component: CentralEditComponent },
          { path: 'edit', component: CentralEditComponent }
        ] 
      }
    ]
},
{ 
    path: 'controlmanagement',
    children:[
      { 
        path: 'categories',
        children: [
          { path: '', component: CategoriesComponent },
          { path: 'add', component: CategoryEditComponent },
          { path: 'edit', component: CategoryEditComponent }
        ] 
      }
    ]
}
];
