import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { Demo1Component } from '../../views/demo1/demo1.component';
import { ProvincesComponent } from '../../views/danhmuc/provinces/provinces.component';
import { ProvinceEditComponent } from '../../views/danhmuc/provinces/provinceedit/provinceedit.component';
import { TrungtamComponent } from '../../views/quanly/trungtam/trungtam.component';
import { TrungtamaddoreditComponent  } from '../../views/quanly/trungtam/trungtamaddoredit/trungtamaddoredit.component';
import { DistrictsComponent } from '../../views/danhmuc/districts/districts.component';
import { DistrictEditComponent } from '../../views/danhmuc/districts/districtedit/districtedit.component';
import { WardsComponent } from '../../views/danhmuc/wards/wards.component';
import { WardEditComponent } from '../../views/danhmuc/wards/wardedit/wardedit.component';
import { ChucvuComponent } from 'app/views/danhmuc/chucvu/chucvu.component';
import { ChucvuaddoreditComponent } from 'app/views/danhmuc/chucvu/chucvuaddoredit/chucvuaddoredit.component';
import { DotthuComponent } from 'app/views/danhmuc/dotthu/dotthu.component';
import { DotthuEditComponent } from 'app/views/danhmuc/dotthu/dotthu-edit/dotthu-edit.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'demo1',      component: Demo1Component },
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
      { path: 'chucvu',  children:
      [
        { path: '', component: ChucvuComponent },
        { path: 'add', component: ChucvuaddoreditComponent },
        { path: 'edit', component: ChucvuaddoreditComponent }
      ] },
      // { path: 'trangthailophoc',  children:
      // [
      //   { path: '', component: TrangthailophocComponent },
      //   { path: 'add', component: TrangthailophoceditComponent },
      //   { path: 'edit', component: TrangthailophoceditComponent }
      // ] },
      // { path: 'trangthaihocvien',  children:
      // [
      //   { path: '', component: TrangthaihocvienComponent },
      //   { path: 'add', component: TrangthaihocvieneditComponent },
      //   { path: 'edit', component: TrangthaihocvieneditComponent }
      // ] },
      // { path: 'trangthaihlv',  children:
      // [
      //   { path: '', component: TrangthaihlvComponent },
      //   { path: 'add', component: TrangthaihlvEditComponent },
      //   { path: 'edit', component: TrangthaihlvEditComponent }
      // ] },
      { path: 'dotthu',  children:
      [
        { path: '', component: DotthuComponent },
        { path: 'add', component: DotthuEditComponent },
        { path: 'edit', component: DotthuEditComponent }
      ] },
      // { path: 'khoanthu',  children:
      // [
      //   { path: '', component: KhoanthuComponent },
      //   { path: 'add', component: KhoanthuEditComponent },
      //   { path: 'edit', component: KhoanthuEditComponent }
      // ] },
      // { path: 'luatuoi',  children:
      // [
      //   { path: '', component: LuatuoiComponent },
      //   { path: 'add', component: LuatuoiEditComponent },
      //   { path: 'edit', component: LuatuoiEditComponent }
      // ] },
    ]
},
{ 
    path: 'quanly',
    children:[
      { 
        path: 'trungtam',
        children: [
          { path: '', component: TrungtamComponent },
          { path: 'add', component: TrungtamaddoreditComponent },
          { path: 'edit', component: TrungtamaddoreditComponent }
        ] 
      }
    ]
}
];
