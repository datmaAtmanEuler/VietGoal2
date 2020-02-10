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
import { NhomNguoiDungComponent } from '../../views/danhmuc/nhomnguoidung/nhomnguoidung.component';
import { NhomNguoiDungEditComponent } from '../../views/danhmuc/nhomnguoidung/nhomnguoidungedit/nhomnguoidungedit.component';
import { SanTapComponent } from '../../views/danhmuc/santap/santap.component';
import { SanTapEditComponent } from '../../views/danhmuc/santap/santapedit/santapedit.component';

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
      { path: 'nhomnguoidung',  children: [
        { path: '', component: NhomNguoiDungComponent },
        { path: 'add', component: NhomNguoiDungEditComponent },
        { path: 'edit', component: NhomNguoiDungEditComponent }
      ]},
      { path: 'santap',  children: [
        { path: '', component: SanTapComponent },
        { path: 'add', component: SanTapEditComponent },
        { path: 'edit', component: SanTapEditComponent }
      ]},
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
