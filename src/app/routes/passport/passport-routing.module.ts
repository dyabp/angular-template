import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPassportComponent } from '../../layout/passport/passport.component';
import { CallbackComponent } from './callback.component';
import { UserLockComponent } from './lock/lock.component';

const routes: Routes = [
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      {
        path: 'lock',
        component: UserLockComponent,
        data: { title: '锁屏', titleI18n: 'app.lock' },
      },
    ],
  },
  // 单页不包裹Layout
  { path: 'passport/callback/:type', component: CallbackComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassportRoutingModule {}
