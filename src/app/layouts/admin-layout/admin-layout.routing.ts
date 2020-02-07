import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { Demo1Component } from '../../views/demo1/demo1.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent},
    { path: 'demo1',      component: Demo1Component}
];
