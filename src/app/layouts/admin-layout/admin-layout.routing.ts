import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { CategoriesComponent } from '../../views/controlmanagement/categories/categories.component';
import { CategoryEditComponent } from '../../views/controlmanagement/categories/categoryedit/categoryedit.component';
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
import { ChucvuComponent } from 'app/views/danhmuc/chucvu/chucvu.component';
import { ChucvuaddoreditComponent } from 'app/views/danhmuc/chucvu/chucvuaddoredit/chucvuaddoredit.component';
import { DotthuComponent } from 'app/views/danhmuc/dotthu/dotthu.component';
import { DotthuEditComponent } from 'app/views/danhmuc/dotthu/dotthu-edit/dotthu-edit.component';
import { KhoanthuComponent } from 'app/views/danhmuc/khoanthu/khoanthu.component';
import { KhoanthuEditComponent } from 'app/views/danhmuc/khoanthu/khoanthu-edit/khoanthu-edit.component';
import { LuatuoiComponent } from 'app/views/danhmuc/luatuoi/luatuoi.component';
import { LuatuoiEditComponent } from 'app/views/danhmuc/luatuoi/luatuoi-edit/luatuoi-edit.component';
import { TrangthaihlvComponent } from 'app/views/danhmuc/trangthaihlv/trangthaihlv.component';
import { TrangthaihlvEditComponent } from 'app/views/danhmuc/trangthaihlv/trangthaihlv-edit/trangthaihlv-edit.component';
import { TrangthaihocvienComponent } from 'app/views/danhmuc/trangthaihocvien/trangthaihocvien.component';
import { TrangthaihocvieneditComponent } from 'app/views/danhmuc/trangthaihocvien/trangthaihocvienedit/trangthaihocvienedit.component';
import { TrangthailophocComponent } from 'app/views/danhmuc/trangthailophoc/trangthailophoc.component';
import { TrangthailophoceditComponent } from 'app/views/danhmuc/trangthailophoc/trangthailophocedit/trangthailophocedit.component';
import { BaiTapComponent } from '../../views/danhmuc/baitap/baitap.component';
import { BaiTapEditComponent } from '../../views/danhmuc/baitap/baitapedit/baitapedit.component';
import { KhuVucComponent } from '../../views/danhmuc/khuvuc/khuvuc.component';
import { KhuVucEditComponent } from '../../views/danhmuc/khuvuc/khuvucedit/khuvucedit.component';

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
        { path: '', component: SanTapComponent },
        { path: 'add', component: SanTapEditComponent },
        { path: 'edit', component: SanTapEditComponent }
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
        { path: '', component: BaiTapComponent },
        { path: 'add', component: BaiTapEditComponent },
        { path: 'edit', component: BaiTapEditComponent }
      ] },
      { path: 'khuvuc',  children:
      [
        { path: '', component: KhuVucComponent },
        { path: 'add', component: KhuVucEditComponent },
        { path: 'edit', component: KhuVucEditComponent }
      ] },
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
