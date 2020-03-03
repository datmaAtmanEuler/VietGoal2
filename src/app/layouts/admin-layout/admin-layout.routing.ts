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
import { PositionEditComponent } from '../../views/list/positions/position-edit/position-edit.component';
import { PositionsComponent } from '../../views/list/positions/positions.component';
import { ClassStatusEditComponent } from '../../views/list/classstatus/classstatus-edit/classstatus-edit.component';
import { ClassStatusComponent } from '../../views/list/classstatus/classstatus.component';
import { StudentStatusComponent } from '../../views/list/studentstatus/studentstatus.component';
import { StudentStatusEditComponent } from '../../views/list/studentstatus/studentstatus-edit/studentstatus-edit.component';
import { CoachStatusComponent } from '../../views/list/coachstatus/coachstatus.component';
import { CoachStatusEditComponent } from '../../views/list/coachstatus/coachstatus-edit/coachstatus-edit.component';

import { KpiConfigsComponent } from '../../views/manage/kpiconfigs/kpiconfigs.component';
import { KpiConfigEditComponent } from '../../views/manage/kpiconfigs/kpiconfig-edit/kpiconfig-edit.component';

import { CollectionComponent } from '../../views/list/collections/collection.component';
import { CollectionEditComponent } from '../../views/list/collections/collection-edit/collection-edit.component';
import { FeesComponent } from '../../views/list/fees/fees.component';
import { FeeEditComponent } from '../../views/list/fees/fee-edit/fee-edit.component';
import { AgesComponent } from '../../views/list/ages/ages.component';
import { AgeEditComponent } from '../../views/list/ages/age-edit/age-edit.component';
import { ClassComponent } from '../../views/manage/class/class.component';
import { ClassEditComponent } from '../../views/manage/class/class-edit/class-edit.component';
import { RecruitComponent } from '../../views/list/recruits/recruit.component';
import { RecruitEditComponent } from '../../views/list/recruits/recruit-edit/recruit-edit.component';
import { ScheduleComponent } from '../../views/manage/schedule/schedule.component';
import { CoachAbsentComponent } from '../../views/manage/coachabsent/coachabsent.component';
import { CoachAbsentEditComponent } from '../../views/manage/coachabsent/coachabsent-edit/coachabsent-edit.component';
import { CoachSchedulesComponent } from '../../views/manage/coachschedules/coachschedules.component';
import { RecruitStudentComponent } from '../../views/manage/recruit-student/recruit-student.component';
import { RecruitStudentEditComponent } from '../../views/manage/recruit-student/recruit-student-edit/recruit-student-edit.component';
import { StudentComponent } from '../../views/manage/student/student.component';
import { StudentEditComponent } from '../../views/manage/student/student-edit/student-edit.component';
import { StudentAttendanceOverRangeComponent } from '../../views/manage/studentattendanceoverrange/studentattendanceoverrange.component';
import { StudentAttendanceOverRangeAddComponent } from '../../views/manage/studentattendanceoverrange/studentattendanceoverrange-add/studentattendanceoverrange-add.component';
import { StudentAttendanceComponent } from '../../views/manage/studentattendance/studentattendance.component';
import { StudentRegistrationComponent } from '../../views/manage/student-registration/student-registration.component';
import { StudentRegistrationEditComponent } from '../../views/manage/student-registration/student-registration-edit/student-registration-edit.component';
import { StudentReserveComponent } from '../../views/manage/studentreserve/studentreserve.component';
import { StudentReserveEditComponent } from '../../views/manage/studentreserve/studentreserve-edit/studentreserve-edit.component';
import { UserAdministrationComponent } from '../../views/manage/useradministration/user-administration.component';
import { UserAdministrationEditComponent } from '../../views/manage/useradministration/user-administration-edit/user-administration-edit.component';

import { TextEditorComponent } from '../../views/manage/texteditor/texteditor.component';
import { NotificationComponent } from 'app/views/manage/notification/notification.component';
import { NotificationSeenComponent } from 'app/views/manage/notification/notification-seen/notification-seen.component';
import { NotificationEditComponent } from 'app/views/manage/notification/notification-edit/notification-edit.component';


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
    },
    {
        path:'texteditor',
        children: [
            {
                path: '', component: TextEditorComponent
            }
        ]

    },
    {
        path: 'thoikhoabieu',
        children: [ 
            {
                path: '', component: ScheduleComponent
            }
        ]
    },
    {
        path: 'coachschedules',
        children: [
            {
                path: '', component: CoachSchedulesComponent
            }
        ]
    },
    {
        path: 'kpiconfigs',
        children: [
            {
                path: '', component: KpiConfigsComponent
            },
            {
                path: 'add', component: KpiConfigEditComponent
            },
            {
                path: 'edit', component: KpiConfigEditComponent
            }
        ]
    },
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
    },
    {
        path: 'dangky-hocsinh',
        children: [ {
            path: '', component: StudentRegistrationComponent
        }
        ,
        {
            path: 'add', component: StudentRegistrationEditComponent
        }
        ,
        {
            path: 'edit', component: StudentRegistrationEditComponent
        }
        ]
    },
    {
        path: 'recruit-student',
        children: [ {
            path: '', component: RecruitStudentComponent
        }
        ,
        {
            path: 'add', component: RecruitStudentEditComponent
        }
        ,
        {
            path: 'edit', component: RecruitStudentEditComponent
        }
        ]
    }
    ,
    {
        path: 'student-reserve',
        children: [ {
            path: '', component: StudentReserveComponent
        }
        ,
        {
            path: 'add', component: StudentReserveEditComponent
        }
        ,
        {
            path: 'edit', component: StudentReserveEditComponent
        }
        ]
    }
    ,
    {
        path: 'useradministration',
        children: [ {
            path: '', component:  UserAdministrationComponent
        }
        ,
        {
            path: 'add', component: UserAdministrationEditComponent
        }
        ,
        {
            path: 'edit', component: UserAdministrationEditComponent
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
    },
    {
        path: 'hosohocsinhtheolop',
        children: [ {
            path: ':classID', component: StudentComponent
        }]
    },
    {
        path: 'thongbao',
        children: [ 
            {path: '', component: NotificationComponent},
            {path: 'edit', component: NotificationEditComponent},
            {path: 'seen', component: NotificationSeenComponent}
        ]
    },
    {
        path: 'diemdanhhocvienngoai',
        children: [ {
            path: '', component: StudentAttendanceOverRangeComponent
        }
        ,
        {
            path: 'add/:classID/:absentDate', component: StudentAttendanceOverRangeAddComponent
        }
        ]
    },{
        path: 'diemdanhhocvien', component: StudentAttendanceComponent
    }
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
},


];
