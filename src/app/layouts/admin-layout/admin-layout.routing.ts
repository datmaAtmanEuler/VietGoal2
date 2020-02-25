import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ProvincesComponent } from '../../views/list/provinces/provinces.component';
import { ProvinceEditComponent } from '../../views/list/provinces/provinceedit/provinceedit.component';
import { CentralComponent } from '../../views/manage/central/central.component';
import { CentralEditComponent  } from '../../views/manage/central/central-edit/central-edit.component';
import { DecentralizeUserComponent } from '../../views/manage/decentralize-user/decentralize-user.component';
import { DecentralizeDataComponent } from '../../views/manage/decentralize-data/decentralize-data.component';
import { DistrictsComponent } from '../../views/list/districts/districts.component';
import { DistrictEditComponent } from '../../views/list/districts/districtedit/districtedit.component';
import { WardsComponent } from '../../views/list/wards/wards.component';
import { WardEditComponent } from '../../views/list/wards/wardedit/wardedit.component';
import { UserGroupComponent } from '../../views/list/usergroups/usergroup.component';
import { UserGroupEditComponent } from '../../views/list/usergroups/usergroup-edit/usergroup-edit.component';
import { YardComponent } from '../../views/list/yard/yards.component';
import { YardEditComponent } from '../../views/list/yard/yard-edit/yard-edit.component';
import { TrainingGroundsComponent } from '../../views/list/trainingground/traininggrounds.component';
import { TrainingGroundEditComponent } from '../../views/list/trainingground/trainningground-edit/trainingground-edit.component';
import { AreasComponent } from '../../views/list/areas/areas.component';
import { AreaEditComponent } from '../../views/list/areas/area-edit/area-edit.component';
import { CategoriesComponent } from '../../views/controlmanagement/categories/categories.component';
import { CategoryEditComponent } from '../../views/controlmanagement/categories/categoryedit/categoryedit.component';
import { PositionEditComponent } from 'app/views/list/positions/position-edit/position-edit.component';
import { PositionsComponent } from 'app/views/list/positions/positions.component';
import { ClassStatusEditComponent } from 'app/views/list/classstatus/classstatus-edit/classstatus-edit.component';
import { ClassStatusComponent } from 'app/views/list/classstatus/classstatus.component';
import { StudentStatusComponent } from 'app/views/list/studentstatus/studentstatus.component';
import { StudentStatusEditComponent } from 'app/views/list/studentstatus/studentstatus-edit/studentstatus-edit.component';
import { CoachStatusComponent } from 'app/views/list/coachstatus/coachstatus.component';
import { CoachStatusEditComponent } from 'app/views/list/coachstatus/coachstatus-edit/coachstatus-edit.component';
import { CollectionComponent } from 'app/views/list/collections/collection.component';
import { CollectionEditComponent } from 'app/views/list/collections/collection-edit/collection-edit.component';
import { FeesComponent } from 'app/views/list/fees/fees.component';
import { FeeEditComponent } from 'app/views/list/fees/fee-edit/fee-edit.component';
import { AgesComponent } from 'app/views/list/ages/ages.component';
import { AgeEditComponent } from 'app/views/list/ages/age-edit/age-edit.component';
import { ScheduleComponent } from 'app/views/manage/schedule/schedule.component';
import { ClassComponent } from '../../views/manage/class/class.component';
import { ClassEditComponent } from '../../views/manage/class/class-edit/class-edit.component';
import { RecruitComponent } from '../../views/list/recruits/recruit.component';
import { RecruitEditComponent } from '../../views/list/recruits/recruit-edit/recruit-edit.component';
import { CoachAbsentComponent } from 'app/views/manage/coachabsent/coachabsent.component';
import { CoachAbsentEditComponent } from 'app/views/manage/coachabsent/coachabsent-edit/coachabsent-edit.component';


export const AdminLayoutRoutes: Routes = [
 {
    path: 'dashboard', component: DashboardComponent
 },
 {
    path: 'danhmuc',
    children: [
	{
        path: 'tinhthanh',
        children: [ {
            path: '', component: ProvincesComponent
        }
        ,
        {
            path: 'add', component: ProvinceEditComponent
        }
        ,
        {
            path: 'edit', component: ProvinceEditComponent
        }
        ]
    }
    ,
    {
        path: 'quanhuyen',
        children: [ {
            path: '', component: DistrictsComponent
        }
        ,
        {
            path: 'add', component: DistrictEditComponent
        }
        ,
        {
            path: 'edit', component: DistrictEditComponent
        }
        ]
    }
    ,
    {
        path: 'phuongxa',
        children: [ {
            path: '', component: WardsComponent
        }
        ,
        {
            path: 'add', component: WardEditComponent
        }
        ,
        {
            path: 'edit', component: WardEditComponent
        }
        ]
    }
    ,
    {
        path: 'nhomnguoidung',
        children: [ {
            path: '', component: UserGroupComponent
        }
        ,
        {
            path: 'add', component: UserGroupEditComponent
        }
        ,
        {
            path: 'edit', component: UserGroupEditComponent
        }
        ]
    }
    ,
    {
        path: 'santap',
        children: [ {
            path: '', component: YardComponent
        }
        ,
        {
            path: 'add', component: YardEditComponent
        }
        ,
        {
            path: 'edit', component: YardEditComponent
        }
        ]
    }
    ,
    {
        path: 'chucvu',
        children: [ {
            path: '', component: PositionsComponent
        }
        ,
        {
            path: 'add', component: PositionEditComponent
        }
        ,
        {
            path: 'edit', component: PositionEditComponent
        }
        ]
    }
    ,
    {
        path: 'trangthailophoc',
        children: [ {
            path: '', component: ClassStatusComponent
        }
        ,
        {
            path: 'add', component: ClassStatusEditComponent
        }
        ,
        {
            path: 'edit', component: ClassStatusEditComponent
        }
        ]
    }
    ,
    {
        path: 'trangthaihocvien',
        children: [ {
            path: '', component: StudentStatusComponent
        }
        ,
        {
            path: 'add', component: StudentStatusEditComponent
        }
        ,
        {
            path: 'edit', component: StudentStatusEditComponent
        }
        ]
    }
    ,
    {
        path: 'trangthaihlv',
        children: [ {
            path: '', component: CoachStatusComponent
        }
        ,
        {
            path: 'add', component: CoachStatusEditComponent
        }
        ,
        {
            path: 'edit', component: CoachStatusEditComponent
        }
        ]
    }
    ,
    {
        path: 'dotthu',
        children: [ {
            path: '', component: CollectionComponent
        }
        ,
        {
            path: 'add', component: CollectionEditComponent
        }
        ,
        {
            path: 'edit', component: CollectionEditComponent
        }
        ]
    }
    ,
    {
        path: 'khoanthu',
        children: [ {
            path: '', component: FeesComponent
        }
        ,
        {
            path: 'add', component: FeeEditComponent
        }
        ,
        {
            path: 'edit', component: FeeEditComponent
        }
        ]
    }
    ,
    {
        path: 'luatuoi',
        children: [ {
            path: '', component: AgesComponent
        }
        ,
        {
            path: 'add', component: AgeEditComponent
        }
        ,
        {
            path: 'edit', component: AgeEditComponent
        }
        ]
    }
    ,
    {
        path: 'baitap',
        children: [ {
            path: '', component: TrainingGroundsComponent
        }
        ,
        {
            path: 'add', component: TrainingGroundEditComponent
        }
        ,
        {
            path: 'edit', component: TrainingGroundEditComponent
        }
        ]
    }
    ,
    {
        path: 'khuvuc',
        children: [ {
            path: '', component: AreasComponent
        }
        ,
        {
            path: 'add', component: AreaEditComponent
        }
        ,
        {
            path: 'edit', component: AreaEditComponent
        }
        ]
    }
    ,
    {
        path: 'kqchieusinh',
        children: [ 
            {
                path: '', component: RecruitComponent
            }
            ,
            {
                path: 'add', component: RecruitEditComponent
            }
            ,
            {
                path: 'edit', component: RecruitEditComponent
            }
        ]
    },
  ]
},
{
    path: 'quanly',
    children:[ {
        path: 'trungtam',
        children: [ {
            path: '', component: CentralComponent
        }
        ,
        {
            path: 'add', component: CentralEditComponent
        }
        ,
        {
            path: 'edit', component: CentralEditComponent
        }
        ]
    }
    ,
    {
        path: 'thoikhoabieu',
        children: [ {
            path: '', component: ScheduleComponent
        }
        , // { path: 'add', component: CentralEditComponent },
        // { path: 'edit', component: CentralEditComponent }
        ]
    }
    ,
    {
        path: 'class',
        children: [ {
            path: '', component: ClassComponent
        }
        ,
        {
            path: 'add', component: ClassEditComponent
        }
        ,
        {
            path: 'edit', component: ClassEditComponent
        }
        ]
    }
    ,
    {
        path: 'decentralize-user', component: DecentralizeUserComponent
    },
    {
        path: 'decentralize-data', component: DecentralizeDataComponent
    },
    {
        path: 'nghiphep',
        children: [ {
            path: '', component: CoachAbsentComponent
        }
        ,
        {
            path: 'add', component: CoachAbsentEditComponent
        }
        ,
        {
            path: 'edit', component: CoachAbsentEditComponent
        }
        ]
    }
    ,
    ]
}

,
{
    path: 'controlmanagement',
    children:[ {
        path: 'categories',
        children: [ {
            path: '', component: CategoriesComponent
        }
        ,
        {
            path: 'add', component: CategoryEditComponent
        }
        ,
        {
            path: 'edit', component: CategoryEditComponent
        }
        ]
    }
    ]
}

];
