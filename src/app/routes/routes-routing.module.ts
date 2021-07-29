import { AuthGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';
// layout
import { LayoutBasicComponent } from '../layout/basic/basic.component';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// single pages
import { CallbackComponent } from './passport/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutBasicComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, data: { title: '仪表盘' } },
      { path: 'exception', loadChildren: () => import('./exception/exception.module').then((m) => m.ExceptionModule) },
      // 业务子模块
      // { path: 'widgets', loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule) },
    ],
  },
  // 空白布局
  // {
  //     path: 'blank',
  //     component: LayoutBlankComponent,
  //     children: [
  //     ]
  // },
  // 单页不包裹Layout
  { path: 'passport/callback/:type', component: CallbackComponent },
  { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class RouteRoutingModule {}
